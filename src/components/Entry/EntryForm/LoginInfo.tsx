import { FC } from "react";
import styles from "../../../styles/entry/info.module.scss";

const LoginInfo: FC = () => {
  return <div className={`${styles.container} ${styles.login}`}>
    <div className={styles.content}>
      <h1>Sign in</h1>
      <p>Welcome back! Login to your account and start chatting.</p>
    </div>
  </div>
}

export default LoginInfo;
