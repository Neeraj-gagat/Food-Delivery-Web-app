import { string, z } from "zod"

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
    name: string().min(3),
    image:string().min(5)
})