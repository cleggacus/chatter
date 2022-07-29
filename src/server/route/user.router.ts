import { createUserOutputSchema, createUserSchema } from "../../schema/user.schema";
import argon2 from "argon2"
import createRouter from "../createRouter";
import { TRPCError } from "@trpc/server";
import trpc from "../../utils/trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const userRouter = createRouter()
  .mutation("create-user", {
    input: createUserSchema,
    output: createUserOutputSchema,
    resolve: async ({ ctx, input }) => {
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
        const user = await ctx.prisma.user.create({
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
    }
  });

export default userRouter;

export type UserRouter = typeof userRouter;