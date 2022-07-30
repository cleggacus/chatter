import { RefinementCtx } from "zod"

const passwordEqualsRetype = (data: {
  password: string,
  repassword?: string
}, ctx: RefinementCtx) => {
  if(data.repassword && data.repassword != data.password){
    ctx.addIssue({
      code: "custom",
      message: "Passwords dont match.",
      path: ["repassword"]
    })
  }
}

export default passwordEqualsRetype;