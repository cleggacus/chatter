import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode
}

const DefaultLayout: FC<Props> = ({ children }) => {
  return <>
    {children}
  </>;
}

export default DefaultLayout;