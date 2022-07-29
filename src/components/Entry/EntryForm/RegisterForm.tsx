import { FC, useState } from "react";
import styles from "../../../styles/entry/form.module.scss"

type Props = {
  active?: boolean,
  toggleState?: () => void
}

const Register: FC<Props> = ({ active, toggleState }) => {
  const [ errors, setErrors ] = useState({
    email: "",
    username: "",
    password: "",
    repassword: ""
  });

  return <div className={`${styles.container} ${!active ? styles.inactive : ""} ${styles.register}`}>
    <div className={styles.content}>
      <input className={errors.email ? styles.err : ""} type="email" placeholder="Email"></input>
      <p>{errors.email}</p>
      <input className={errors.username ? styles.err : ""} type="text" placeholder="Username"></input>
      <p>{errors.username}</p>
      <input className={errors.password ? styles.err : ""} type="password" placeholder="Password"></input>
      <p>{errors.password}</p>
      <input className={errors.repassword ? styles.err : ""} type="password" placeholder="Retype Password"></input>
      <p>{errors.repassword}</p>
      <button>Create Account</button>
      <div className={styles.seperator}><div/><p>or</p><div/></div>
      <button onClick={toggleState}>Sign In</button>
    </div>
  </div>
}

export default Register;
