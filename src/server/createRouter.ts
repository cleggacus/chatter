import { router } from "@trpc/server";
import { Context } from "./createContext";

const createRouter = () => {
  return router<Context>();
}

export default createRouter;