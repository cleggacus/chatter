import { FC, useEffect, useRef, useState } from "react";
import styles from "../../styles/chat/chatComponent.module.scss";
import {FiSend} from "react-icons/fi";
import {IoMdAttach} from "react-icons/io";
import { useUser } from "../../context/UserContext";
import defaultPic from "../../assets/default.jpg"
import Image from "next/image";

const Chat: FC = () => {
  const { user } = useUser();

  const [messages, setMessages] = useState([
      {
        text: "Hey",
        from: user?.username,
        image: defaultPic
      },
      {
        text: "Hi",
        from: "them",
        image: defaultPic
      },
      {
        text: "Whats up",
        from: "them",
        image: defaultPic
      },
      {
        text: "nm you",
        from: user?.username,
        image: defaultPic
      },
    ]
  )

  const ref = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if(!ref.current) return;

    setMessages([
      ...messages,
      {
        text: ref.current.value,
        from: user?.username,
        image: defaultPic
      }
    ]);

    ref.current.value = "";
  }

  useEffect(() => {
    if(!mainRef.current) return;
    mainRef.current.scrollTo(0, mainRef.current.scrollHeight);
  }, [messages])

  return <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.messages}>
          <div ref={mainRef}>
          {
            messages.map(mes => {
              return <div className={`${mes.from == user?.username ? styles.me : ""} ${styles.message}`}>
                <div className={styles.picture}>
                  <Image src={mes.image} layout="fill" ></Image>
                </div>

                <div className={styles.messageContent}>
                  <p>{mes.text}</p>
                </div>
              </div>
            })
          }
          </div>
        </div>

        <div className={styles.input}>
          <div className={styles.inputInner}>
            <input onKeyDown={e => {if(e.key == "Enter") sendMessage() }} ref={ref} placeholder="Message"></input>

            <button className={styles.noback}>
              <IoMdAttach></IoMdAttach>
            </button>

            <button onClick={sendMessage}>
              <FiSend></FiSend>
            </button>
          </div>
        </div>
    </div>
  </div>
}

export default Chat;
