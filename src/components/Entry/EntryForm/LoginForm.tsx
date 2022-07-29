import { FC } from "react";
import styles from "../../../styles/entry/form.module.scss"

type Props = {
  active: boolean,
  toggleState?: () => void
}

const LoginForm: FC<Props> = ({ active, toggleState }) => {
  return <div className={`${styles.container} ${!active ? styles.inactive : ""} ${styles.login}`}>
    <div className={styles.content}>
      <input placeholder="Username"></input>
      <input placeholder="Password" type="password"></input>
      <button>Login</button>
      <button onClick={toggleState}>Create Account</button>
    </div>
  </div>
}

export default LoginForm;
