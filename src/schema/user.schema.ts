import z from "zod"

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string()
})

const createUserOutputSchema = z.object({
  username: z.string(),
  email: z.string().email(),
})

export {
  createUserSchema,
  createUserOutputSchema
}

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

