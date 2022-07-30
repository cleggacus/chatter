import { FC } from "react"
import Form from "./EntryForm";

import styles from "../../styles/entry/entry.module.scss";
import NotAuth from "../NotAuth";

type EntryState = "login" | "register"

type Props = {
  entryState: EntryState
}

const Entry: FC<Props> = ({ entryState }) => {
  return <NotAuth>
    <div className={styles.container}>
      <Form entryState={entryState}></Form>
    </div>
  </NotAuth>
}

export default Entry

export type {
  EntryState
}
