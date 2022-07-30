import { createUserOutputSchema, createUserInputSchema, loginInputSchema, loginOutputSchema } from "../../schema/user.schema";
import argon2 from "argon2"
import createRouter from "../createRouter";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "../../utils/prisma";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";

const userRouter = createRouter()
  .mutation("create-user", {
    input: createUserInputSchema,
    output: createUserOutputSchema,
    resolve: async ({ input }) => {
      const { email, username, password } = input;

      let hash = "";

      try {
        hash = await argon2.hash(password);
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong."
        });
      }

      try {
        const user = await prisma.users.create({
          data: {
            email, 
            username, 
            password: hash
          }
        })

        return user;
      } catch(e) {
        if(e instanceof PrismaClientKnownRequestError) {
          if(e.code == "P2002"){
            throw new TRPCError({
              code: "CONFLICT",
              message: "User already exists."
            })
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong."
        })
      }
    },
  })
  .mutation("login", {
    input: loginInputSchema,
    output: loginOutputSchema,
    resolve: async ({ ctx, input }) => {
      const { password, ...identity } = input;

      const unauthErr = new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect credentials."
      });

      const user = await prisma.users.findFirst({
        where: identity
      })

      if(!user) throw unauthErr;

      const passwordMatch = await argon2.verify(user.password, password);

      if(!passwordMatch) throw unauthErr;

      const token = signJwt({
        id: user.id,
        username: user.id,
        email: user.id
      })

      ctx.res.setHeader("Set-Cookie", serialize("token", token, {
        httpOnly: true
      }));

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        token
      }
    }
  })
  .middleware(({ ctx, next }) => {
    if(!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not authorized for this route.',
      }); 
    }
    return next();
  })
  .query("auth", {
    resolve: async ({ ctx }) => {
      return ctx.user;
    }
  })
  .query("logout", {
    resolve: async ({ ctx }) => {
      ctx.res.setHeader("Set-Cookie", serialize("token", "", {
        httpOnly: true
      }));

      return {}
    }
  });

export default userRouter;

export type UserRouter = typeof userRouter;