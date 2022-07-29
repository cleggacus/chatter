import { FC, useState } from "react";
import styles from "../../../styles/entry/form.module.scss"

type Props = {
  active: boolean,
  toggleState?: () => void
}

const LoginForm: FC<Props> = ({ active, toggleState }) => {
  const [ error, setError ] = useState("");

  return <div className={`${styles.container} ${!active ? styles.inactive : ""} ${styles.login}`}>
    <div className={styles.content}>
      <input type="text" placeholder="Username / Email"></input>
      <input type="password" placeholder="Password"></input>
      <p>{error}</p>
      <button>Sign in</button>
      <div className={styles.seperator}><div/><p>or</p><div/></div>
      <button onClick={toggleState}>Create Account</button>
    </div>
  </div>
}

export default LoginForm;
