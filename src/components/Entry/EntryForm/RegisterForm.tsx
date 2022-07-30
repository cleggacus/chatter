import { useRouter } from "next/router";
import { FC, useState } from "react";
import { ZodError } from "zod";
import { CreateUserInput } from "../../../schema/user.schema";
import styles from "../../../styles/entry/form.module.scss"
import trpc from "../../../utils/trpc";

type Props = {
  active?: boolean,
  toggleState?: () => void
}

type Errors = {
  email: string[],
  username: string[],
  password: string[],
  repassword: string[],
}

const getInitialErrors = (): Errors => {
  return {
    email: [],
    username: [],
    password: [],
    repassword: [],
  }
}

const Register: FC<Props> = ({ active, toggleState }) => {
  const [ errors, setErrors ] = useState<Errors>(getInitialErrors());

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const router = useRouter();

  const { mutate } = trpc.useMutation(["users.create-user"], {
    onSuccess() {
      router.push("/userCreated");
    },
    onError(error) {
      const err = new ZodError(JSON.parse(error.message))
      const errors = parseZodError(err);
      setErrors(errors);
    }
  });

  const parseZodError = (err: ZodError<CreateUserInput>) => {
    console.log(err)
    let tempErrors = getInitialErrors();

    for(const issue of err.issues)
      for(const p of issue.path)
        tempErrors[p as keyof Errors].push(issue.message);

    return tempErrors;
  }

  const submit = () => {
    mutate({
      email, username, password, repassword
    })
  }

  return <div className={`${styles.container} ${!active ? styles.inactive : ""} ${styles.register}`}>
    <div className={styles.content}>
      <input onChange={e => setEmail(e.target.value)} className={errors.email.length ? styles.err : ""} type="email" placeholder="Email"></input>
      <p>{errors.email.join(" ")}</p>
      <input onChange={e => setUsername(e.target.value)} className={errors.username.length ? styles.err : ""} type="text" placeholder="Username"></input>
      <p>{errors.username.join(" ")}</p>
      <input onChange={e => setPassword(e.target.value)} className={errors.password.length ? styles.err : ""} type="password" placeholder="Password"></input>
      <p>{errors.password.join(" ")}</p>
      <input onChange={e => setRepassword(e.target.value)} className={errors.repassword.length ? styles.err : ""} type="password" placeholder="Retype Password"></input>
      <p>{errors.repassword.join(" ")}</p>
      <button onClick={submit}>Create Account</button>
      <div className={styles.seperator}><div/><p>or</p><div/></div>
      <button onClick={toggleState}>Sign In</button>
    </div>
  </div>
}

export default Register;
