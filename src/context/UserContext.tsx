import { inferProcedureOutput } from "@trpc/server";
import { createContext, FC, ReactNode, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type QueryType = keyof AppRouter['_def']['queries'];

type InferQueryOutput<T extends QueryType> = inferProcedureOutput<AppRouter['_def']['queries'][T]>

type UserContextValue = {
  user: InferQueryOutput<'users.auth'>,
  refetch: () => void
}

type Props = {
  children: ReactNode,
  value?: UserContextValue
}

const UserContext = createContext<UserContextValue>({
  user: null,
  refetch(){}
});

const UserProvider: FC<Props> = ({ children, value = null }) => {
  return <UserContext.Provider value={value}>
    { children }
  </UserContext.Provider>
}

const useUser = () => useContext(UserContext);

export {
  useUser, UserProvider
}
