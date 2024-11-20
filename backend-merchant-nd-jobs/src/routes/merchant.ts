import { Router } from "express";
import { MerchantSigninSchema, MerchantSignupschema } from "../types/type";
import { prismaClient } from "../db/db";
import  Jwt  from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { authMiddleWare } from "../middleware";

const router = Router();
// TODO FOR LATER 
// @ts-ignore
router.post("/signup",async(req, res) => {
    const body = req.body;
    const parsedData = MerchantSignupschema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const merchantExists = await prismaClient.merchant.findFirst({
        where:{
            email:parsedData.data.email
        }
    })

    if(merchantExists){
        return res.status(403).json({
            message:"User already Exists"
        })
    }

    await prismaClient.merchant.create({
        data:{
            email:parsedData.data.email,
            password:parsedData.data.password,
            name:parsedData.data.name
        }
    })

    return res.json({
        messgae: "Merchant Created"
    })

})
// TODO FOR LATER 
// @ts-ignore
router.post("/signin",async(req,res) => {
    const body = req.body;
    const parsedData = MerchantSigninSchema.safeParse(body);

    if (!parsedData.success) {
        return  res.json({
            message: "Incorrect Inputs"
        })
    }

    const merchant = await prismaClient.merchant.findFirst({
        where: {
            email:parsedData.data.email,
            password: parsedData.data.password
        }
    })

    if (!merchant) {
        return res.json({
            message: "sorry wrong credential"
        }).status(403)
    }

    const token = Jwt.sign({
        id: merchant.id
    },JWT_PASSWORD)

    res.json({
        token:token
    })
})
// @ts-ignore
router.get("/",authMiddleWare, async(req,res) => {
    // @ts-ignore
    const id = req.id;
    const merchant = await prismaClient.merchant.findFirst({
        where:{
            id
        },
        select:{
            email:true,
            name:true, 
            menu:true
        }
    })
})

export const MerchantRouter = router;