import { z } from "zod";
import createRouter from "../createRouter";
import userRouter from "./user.router";

const appRouter = createRouter()
  .query("hello", {
    resolve: () => {
      return "Hey there!";
    }
  })
  .merge("users.", userRouter)
  // .merge("chat.", chat)

export default appRouter;

export type AppRouter = typeof appRouter;