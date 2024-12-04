import { z } from "zod"

export const RiderSignupSchema = z.object({
    email:z.string().min(6),
    password:z.string().min(6),
    name:z.string().min(3)
})

export const Ridersigninschema = z.object({
    email:z.string(),
    password:z.string()
})