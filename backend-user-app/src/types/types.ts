import { z } from "zod";

export const SignupSchema = z.object({
    email:z.string().min(6),
    password:z.string().min(5),
    name:z.string().min(3)
})

export const SigninSchema = z.object({
    email:z.string(),
    password:z.string(),
})

export const orderCreateSchema = z.object({
    items: z.array(z.object({
        item: z.string()
    }))
})