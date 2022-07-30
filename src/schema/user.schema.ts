import z from "zod"
import passwordEqualsRetype from "../utils/zod/superRefine/passwordEqualsRetype";
import uniqueEmail from "../utils/zod/superRefine/uniqueEmail";
import uniqueUsername from "../utils/zod/superRefine/uniqueUsername";

const createUserInputSchema = z.object({
  username: z.string()
    .min(1, "Can't be empty.")
    .max(30, "Maximum of 30 character.")
    .superRefine(uniqueUsername),

  email: z.string()
    .email("Invalid email.")
    .superRefine(uniqueEmail),

  password: z.string()
    .min(8, "Minimum of 8 character.")
    .regex(/[0-9@$!%*?&]/, "Must contain number or special character."),

  repassword: z.string().optional()

}).superRefine(passwordEqualsRetype);

const createUserOutputSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
})

const loginInputSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string()
}).refine(data => data.username || data.email, "Must include email or username.");

const loginOutputSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  token: z.string()
})

export {
  createUserInputSchema,
  createUserOutputSchema,
  loginInputSchema,
  loginOutputSchema
}

export type CreateUserInput = z.TypeOf<typeof createUserInputSchema>;
export type LoginUserInput = z.TypeOf<typeof loginInputSchema>;

