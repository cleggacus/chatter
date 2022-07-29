import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../server/route/app.router";

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;
