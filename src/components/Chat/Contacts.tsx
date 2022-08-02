import Image from "next/image";
import { FC } from "react";
import defaultPic from "../../assets/default.jpg"
import styles from "../../styles/chat/contacts.module.scss";

type User = {
  badge: "online" | "away" | "offline",
  unread: number,
  name: string,
  image: string 
}

type Props = {
  user: User
}

const user3: User = {
  badge: "online",
  name: "Jeff Winger",
  image: defaultPic.src,
  unread: 0
}

const user2: User = {
  badge: "offline",
  name: "Jeff Winger",
  image: defaultPic.src,
  unread: 0
}

const user1: User = {
  badge: "online",
  name: "Jeff Winger",
  image: defaultPic.src,
  unread: 4
}

const Profile: FC<Props> = ({ user }) => {
  return <div className={styles.profile}>
    <div className={styles.picture}>
      <Image 
        className={styles.image}
        src={defaultPic}
        layout="fill"
      ></Image>
      <div className={`${styles.badge} ${styles[user.badge]}`}></div>
    </div>

    <div className={styles.userInfo}>
      <h3>{user.name}</h3>
      <p>Hi there, How are you?</p>
    </div>

    <div className={styles.chatInfo}>
      <h4>09:00</h4>

      {
        user.unread ?
          <div className={styles.unread}><h4>{user.unread}</h4></div> :
          <></>
      }
    </div>
  </div>
}

const Contacts: FC = () => {
  return <div className={styles.container}>
    <div className={`${styles.section} ${styles.search}`}>
      <div>
        <input placeholder="Search"></input>
      </div>
    </div>

    <div className={styles.scrollerOuter}>
      <div className={styles.scroller}>
        <div className={`${styles.section} ${styles.online}`}>
          <div className={styles.inner}>
            <Profile user={user1}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user3}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user1}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user3}></Profile>
          </div>
        </div>

        <div className={`${styles.section} ${styles.others}`}>
          <div className={styles.inner}>
            <Profile user={user2}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user2}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user2}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user2}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user2}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user2}></Profile>
            <div className={styles.profileSeperator}><div></div></div>
            <Profile user={user2}></Profile>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Contacts;

