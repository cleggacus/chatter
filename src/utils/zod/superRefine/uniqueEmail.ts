import { RefinementCtx } from "zod"
import prisma from "../../prisma"

const uniqueEmail = async (email: string, ctx: RefinementCtx) => {
  if(!!await prisma.users.findUnique({ where: { email } })){
    ctx.addIssue({
      code: "custom",
      message: "Email already exists."
    })
  }
}

export default uniqueEmail;