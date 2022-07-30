import { FC, ReactNode, useEffect } from "react";
import styles from "../../../styles/layout/appLayout.module.scss";

type Props = {
  children: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  return <div className={styles.container}>
    { children }
  </div>
}

export default AppLayout;