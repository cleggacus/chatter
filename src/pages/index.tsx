import { Page } from '../../types/page'
import ChatComponent from '../components/Chat/ChatComponent'
import AppLayout from '../components/Layouts/AppLayout'
import styles from '../styles/home.module.scss'

const Home: Page = () => {
  return <div className={styles.container}>
    <div className={`${styles.section}`}>
      <ChatComponent></ChatComponent>
    </div>
  </div>
}

Home.Layout = AppLayout;

export default Home
