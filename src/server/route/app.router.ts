import { z } from "zod";
import createRouter from "../createRouter";
import userRouter from "./user.router";

const appRouter = createRouter()
  .merge("users.", userRouter)
  // .merge("chat.", chat)

export default appRouter;

export type AppRouter = typeof appRouter;