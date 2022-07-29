import { FC } from "react";
import styles from "../../../styles/entry/info.module.scss";

const RegisterInfo: FC = () => {
  return <div className={`${styles.container} ${styles.register}`}>
    <div className={styles.content}>
      <h1>Create an account</h1>
      <p>Register for a new account and get access to the platform.</p>
    </div>
  </div>
}

export default RegisterInfo;
