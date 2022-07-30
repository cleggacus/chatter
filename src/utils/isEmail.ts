import { z } from "zod";

const isEmail = (email: string) => {
  try {
    z.string().email().parse(email);
    return true;
  } catch {
    return false;
  }
}

export default isEmail;