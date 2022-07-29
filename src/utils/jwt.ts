import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET || 'TmpPass'

const signJwt = (data: object) => {
  return jwt.sign(data, SECRET)
}

const verifyJwt = <T>(token: string) => {
  return jwt.verify(token, SECRET) as T
}

export {
  signJwt,
  verifyJwt
}