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
    merchantId: z.string().min(1),
    items: z.array(z.object({
        item: z.string()
    }))
})
export const MerchantSignupschema = z.object({
    email:z.string().min(6),
    password:z.string().min(6),
    name:z.string().min(3)
})

export const MerchantSigninSchema = z.object({
    email:z.string(),
    password:z.string()
})

export const ItemSchema = z.object({
    name: z.string().min(3),
    image:z.string().min(5),
    merchantId:z.number()
})