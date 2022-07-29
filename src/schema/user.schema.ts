import z from "zod"

const createUserSchema = z.object({
  username: z.string().min(1, "Can't be empty.").max(30, "Maximum of 30 character."),
  email: z.string().email("Invalid email."),
  password: z.string().min(8, "Minimum of 8 character.").regex(/[0-9@$!%*?&]/, "Must contain number or special character.")
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

