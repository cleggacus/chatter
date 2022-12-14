import styles from "../styles/userCreated.module.scss";
import {BsPersonCheckFill} from "react-icons/bs";
import Link from "next/link";
import { Page } from "../../types/page";

const userCreated: Page = () => {
  return <div className={styles.container}>
    <div className={styles.content}>
      <BsPersonCheckFill className={styles.icon}></BsPersonCheckFill>
      <h1>User Created Successfully</h1>
      <Link href="/login">
        <button>Goto Login</button>
      </Link>
    </div>
  </div>
}

export default userCreated;
