import { FC } from "react";
import styles from "../../styles/chat/chatComponent.module.scss";
import {FiSend} from "react-icons/fi";
import {IoMdAttach} from "react-icons/io";
import { useUser } from "../../context/UserContext";

const Chat: FC = () => {
  const { user } = useUser();

  const messages = [
    {
      text: "Hey",
      from: user?.username
    },
    {
      text: "Hi",
      from: "them"
    },
    {
      text: "Whats up",
      from: "them"
    },
    {
      text: "nm you",
      from: user?.username
    },
  ]

  return <div className={styles.container}>
    <div className={styles.top}>
      <div>
        <button className={styles.outline}>Report user</button>
        <button className={styles.outline}>Remove Friend</button>
        <button>Goto Profile</button>
      </div>
    </div>

    <div className={styles.main}>
      <div>
        <div className={styles.content}>
          {
            messages.map(mes => {
              return <div className={`${mes.from == user?.username ? styles.me : ""} ${styles.message}`}>
                <div className={styles.messageContent}>
                  <p>{mes.text}</p>
                </div>
              </div>
            })
          }
        </div>

        <div className={styles.input}>
          <div className={styles.inputInner}>
            <input placeholder="Message"></input>

            <button className={styles.noback}>
              <IoMdAttach></IoMdAttach>
            </button>

            <button>
              <FiSend></FiSend>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Chat;
