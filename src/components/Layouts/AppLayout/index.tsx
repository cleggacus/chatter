import { FC, ReactNode } from "react";
import styles from "../../../styles/layout/appLayout.module.scss";
import Auth from "../../Auth";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  return <Auth>
    <div className={styles.container}>
      <Navbar></Navbar>

      <div className={styles.content}>
        { children }
      </div>
    </div>
  </Auth>
}

export default AppLayout;