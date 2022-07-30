import { NextApiRequest, NextApiResponse } from 'next'
import { verifyJwt } from '../utils/jwt'

export type CtxUser = {
  id: string,
  email: string,
  username: string,
  iat: string
}

const getUserFromRequest = (req: NextApiRequest) => {
  const token = req.cookies.token

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token)
      return verified;
    } catch (e) {
      return null;
    }
  }

  return null;
}

const createContext = ({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) => {
  const user = getUserFromRequest(req)
  return { req, res, user }
}

export {
  getUserFromRequest
}

export default createContext;

export type Context = ReturnType<typeof createContext>
