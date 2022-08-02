import { DetailedHTMLProps, FC, HTMLAttributes, useContext, useState } from "react";
import styles from "../../../styles/layout/navbar.module.scss"
import { IconType } from "react-icons";
import { AiOutlineMenu } from "react-icons/ai";
import { FiLogOut, FiUser, FiMoon } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";
import { useUser } from "../../../context/UserContext";
import trpc from "../../../utils/trpc";
import { useRouter } from "next/router";
import Link from "next/link";

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type ItemProps = DivProps & {
  href?: string,
  Icon: IconType
}

const NavbarItem: FC<ItemProps> = ({ Icon, href = "#", children, className, ...props }) => {
  const router = useRouter();

  const isActive = () => 
    href != "#" && href == router.pathname;

  return <Link href={href}>
    <div {...props} className={`${styles.item} ${isActive() ? styles.active : ""} ${className || ""}`}>
      <div className={styles.itemSelect} >
        <div className={styles.itemInner} >
          <div className={styles.icon}>
            <Icon className={styles.reactIcon}/>
          </div>

          <div className={styles.content}>
            { 
              typeof children == "string" ?
                <a>{children}</a> : children
            }
          </div>
        </div>
      </div>
    </div>
  </Link>
}

const Navbar: FC = () => {
  const { user, refetch } = useUser();
  const [open, setOpen] = useState(false);
  const toggleNavbar = () => setOpen(!open);

  const { mutate } = trpc.useMutation(["users.logout"], {
    onSuccess(){
      refetch();
    }
  })

  const logout = () => {
    mutate();
  }

  return <div className={`${styles.container} ${open ? styles.open : ""}`}>
    <div className={styles.section}>
      <NavbarItem onClick={toggleNavbar} Icon={AiOutlineMenu}>Menu</NavbarItem>
    </div>

    <div className={styles.section}>
      <NavbarItem href="/" Icon={MdOutlineSpaceDashboard}>Home</NavbarItem>
      <NavbarItem href="/chat" Icon={BiMessageSquareDetail}>Messages</NavbarItem>
      <NavbarItem href="/user" Icon={FiUser}>{user?.username}</NavbarItem>
      <NavbarItem href="/settings" Icon={RiSettings2Line}>Settings</NavbarItem>
    </div>

    <div className={styles.section}>
      <NavbarItem Icon={FiMoon}>Toggle theme</NavbarItem>
      <NavbarItem onClick={logout} Icon={FiLogOut}>Log out</NavbarItem>
    </div>
  </div>
}

export default Navbar;
