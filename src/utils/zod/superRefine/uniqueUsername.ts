import { RefinementCtx } from "zod"
import prisma from "../../prisma"

const uniqueUsername = async (username: string, ctx: RefinementCtx) => {
  if(!!await prisma.users.findUnique({ where: { username } })){
    ctx.addIssue({
      code: "custom",
      message: "Username already exists."
    })
  }
}

export default uniqueUsername;