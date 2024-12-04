import { Router } from "express";
import { RiderSignupSchema, Ridersigninschema } from "../types/type";
import { prismaClient } from "../db/db";
import jwt from "jsonwebtoken";
import { authMiddleWare } from "../middleware";
import { JWT_PASSWORDRIDER } from "../config";

const router = Router();

router.post("/signup",async(req, res):Promise<any> => {
    const body = req.body;
    const parsedData = RiderSignupSchema.safeParse(body);

    if (!parsedData.success) {
        console.log(parsedData.error)
        return res.status(400).json({
            message: "Incorrect Inputs"
        })
    }

    const riderExist = await prismaClient.rider.findFirst({
        where:{
            email:parsedData.data.email
        }
    })

    if (riderExist) {
        return res.status(409).json({
            message: "User with This Email Already Exist"
        })
    }

    await prismaClient.rider.create({
        data:{
            email:parsedData.data.email,
            name:parsedData.data.name,
            password:parsedData.data.password,
            status:true
        }
    })

    return res.json({
        message: "Rider Created"
    })
})

router.post("/signin",async(req, res):Promise<any> => {
    const body  = req.body;
    const parsedData = Ridersigninschema.safeParse(body);

    if (!parsedData.success) {
        return res.status(400).json({
            message:"Incorrect Inputs"
        })
    }

    const Rider = await prismaClient.rider.findUnique({
        where:{
            email:parsedData.data.email,
            password:parsedData.data.password
        }
    })

    if (!Rider) {
        return res.status(409).json({
            message:"Wrong Credentials"
        })
    }

    await prismaClient.rider.update({
        where:{email:Rider.email},
        data:{status:true}
    })

    const token = jwt.sign({
        id: Rider.id,
        email:Rider.email
    },JWT_PASSWORDRIDER)

    res.json({
        token:token
    })

})

router.get("/",authMiddleWare,async(req,res):Promise<any> => {
    // @ts-ignore
    const id = req.id;
    const rider = await prismaClient.rider.findFirst({
        where:{
            id
        },
        select:{
            name:true,
            email:true,
            status:true
        }
    })

    return res.json({
        rider
    })
})

export const Riderrouter = router;