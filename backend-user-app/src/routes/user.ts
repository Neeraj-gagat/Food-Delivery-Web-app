import { Router } from "express";
import { SigninSchema, SignupSchema } from "../types/types";
import { prismaClient } from "../db/db";
import  Jwt  from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();

router.post("/signup", async(req, res) => {
    const body =  req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        return res.json({
            message:"Incorrect inputs"
        }).status(411)
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    })

    if (userExists) {
        return res.status(403).json({
            message:"User already exist"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.email,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    })

    return res.json({
        message:"user created"
    })

})

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const user =  await prismaClient.user.findFirst({
        where:{
            email:parsedData.data.email,
            password:parsedData.data.password
        }
    })

    if (!user) {
        return res.status(403).json({
            message: "Sorry wrong credentials"
        })
    }

    const token = Jwt.sign({
        id: user.id
    },JWT_PASSWORD)

    res.json({
        token: token
    })

})

router.get("/", async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where:{
            id
        },
        select:{
            name:true,
            email:true
        }
    });

    return res.json({
        user
    });
})

export const userRouter = router;