import { FC } from "react";
import styles from "../../../styles/entry/form.module.scss"

type Props = {
  active?: boolean,
  toggleState?: () => void
}

const Register: FC<Props> = ({ active, toggleState }) => {
  return <div className={`${styles.container} ${!active ? styles.inactive : ""} ${styles.register}`}>
    <div className={styles.content}>
      <input placeholder="Email"></input>
      <input placeholder="Username"></input>
      <input placeholder="Retype Password" type="password"></input>
      <input placeholder="Password" type="password"></input>
      <button>Register</button>
      <div className={styles.seperator}><div/><p>or</p><div/></div>
      <button onClick={toggleState}>Sign In</button>
    </div>
  </div>
}

export default Register;
