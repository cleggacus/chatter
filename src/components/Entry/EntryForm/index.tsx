import { FC, useEffect, useState } from "react"
import { EntryState } from "..";

import ShapeTileImage from "../../../assets/shape_tile.png";
import styles from "../../../styles/entry/entry.module.scss";
import LoginForm from "./LoginForm";
import LoginInfo from "./LoginInfo";
import RegisterForm from "./RegisterForm";
import RegisterInfo from "./RegisterInfo";

type Props = {
  entryState: EntryState
}

const Form: FC<Props> = ({ entryState }) => {
  const [ currentEntryState, setCurrentEntryState ] = useState<EntryState>(entryState);
  const [ transition, setTransition ] = useState(false);

  const toggleState = () => setCurrentEntryState(currentEntryState == "login" ? "register" : "login");

  useEffect(() => {
    setTransition(true);
  }, [currentEntryState])

  useEffect(() => {
    if(transition)
      setTimeout(() => setTransition(false), 500);
  }, [transition])

  return <div className={styles.formContainer}>
    <div className={styles.forms}>
      <LoginForm 
        active={currentEntryState == "login"}
        toggleState={toggleState}
      ></LoginForm>

      <RegisterForm 
        active={currentEntryState == "register"}
        toggleState={toggleState}
      ></RegisterForm>
    </div>

    <div className={`${styles.infos} ${currentEntryState == "login" ? styles.login : styles.register} ${transition ? styles.transition : ""}`}>
      <div className={styles.infosContent}>
        <div style={{backgroundImage: `url("${ShapeTileImage.src}")`}} className={styles.bg}></div>
        <RegisterInfo></RegisterInfo>
        <LoginInfo></LoginInfo>
      </div>
    </div>
  </div>
}

export default Form
