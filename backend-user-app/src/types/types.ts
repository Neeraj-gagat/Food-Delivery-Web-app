import { z } from "zod";

export const userSignup = z.object({
    email:z.string().min(6),
    password:z.string().min(5),
    name:z.string().min(3)
})

export const userSignin = z.object({
    email:z.string(),
    password:z.string(),
})