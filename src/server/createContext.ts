import { NextApiRequest, NextApiResponse } from 'next'
import { verifyJwt } from '../utils/jwt'
import prisma from "../utils/prisma"

type CtxUser = {
  id: string
  email: string
  name: string
  iat: string
  exp: number
}

const getUserFromRequest = (req: NextApiRequest) => {
  const token = req.cookies.token

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token)
      return verified
    } catch (e) {
      return null
    }
  }

  return null
}

const createContext = ({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) => {
  const user = getUserFromRequest(req)
  return { req, res, prisma, user }
}

export {
  getUserFromRequest
}

export default createContext;

export type Context = ReturnType<typeof createContext>
