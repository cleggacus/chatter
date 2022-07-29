import { FC } from "react"
import Form from "./EntryForm";

import styles from "../../styles/entry/entry.module.scss";

type EntryState = "login" | "register"

type Props = {
  entryState: EntryState
}

const Entry: FC<Props> = ({ entryState }) => {
  return <div className={styles.container}>
    <Form entryState={entryState}></Form>
  </div>
}

export default Entry

export type {
  EntryState
}
