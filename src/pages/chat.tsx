import { Page } from '../../types/page'
import ChatComponent from '../components/Chat/ChatComponent';
import Contacts from '../components/Chat/Contacts';
import AppLayout from '../components/Layouts/AppLayout'
import styles from '../styles/chat/chat.module.scss';

const Chat: Page = () => {
  return <div className={styles.container}>
    <div className={`${styles.section} ${styles.section1}`}>
      <Contacts></Contacts>
    </div>

    <div className={`${styles.section} ${styles.section2}`}>
      <ChatComponent></ChatComponent>
    </div>
  </div>
}

Chat.Layout = AppLayout;

export default Chat
