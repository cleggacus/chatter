import { useRouter } from "next/router";
import { FC, useState } from "react";
import styles from "../../../styles/entry/form.module.scss"
import isEmail from "../../../utils/isEmail";
import trpc from "../../../utils/trpc";

type Props = {
  active: boolean,
  toggleState?: () => void
}

const LoginForm: FC<Props> = ({ active, toggleState }) => {
  const [ error, setError ] = useState("");

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutate } = trpc.useMutation(["users.login"], {
    onSuccess() {
      router.push("/");
    }, 
    onError(err) {
      setError(err.message);
    }
  })

  const submit = () => {
    if(isEmail(user))
      mutate({
        email: user,
        password
      })
    else
      mutate({
        username: user,
        password
      })
  }

  return <div className={`${styles.container} ${!active ? styles.inactive : ""} ${styles.login}`}>
    <div className={styles.content}>
      <input onChange={e => setUser(e.target.value)} type="text" placeholder="Username / Email"></input>
      <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"></input>
      <p>{error}</p>
      <button onClick={submit}>Sign in</button>
      <div className={styles.seperator}><div/><p>or</p><div/></div>
      <button onClick={toggleState}>Create Account</button>
    </div>
  </div>
}

export default LoginForm;
