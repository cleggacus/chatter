import { useRouter } from "next/router"
import { FC, ReactNode, useEffect } from "react"
import { useUser } from "../context/UserContext"

type Props = {
  children: ReactNode,
  redirect?: string
}

const NotAuth: FC<Props> = ({ children, redirect = "/" }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if(user)
      router.push(redirect)
  }, [user])

  if(user)
    return <></>

  return <>
    { children }
  </>
}

export default NotAuth;
