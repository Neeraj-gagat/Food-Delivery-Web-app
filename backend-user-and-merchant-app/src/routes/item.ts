import { Router } from "express";
import { authMiddleWare } from "../middleware";
import { ItemSchema } from "../types/types";
import { prismaClient } from "../db/db";

const router = Router();

router.post("/create-item",authMiddleWare, async (req,res) => {
    const body = req.body;
    const parsedData = ItemSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    try {
        const itemid = await prismaClient.item.create({
            data:({
                name:parsedData.data.name,
                image:parsedData.data.image,
                merchantId:parsedData.data.merchantId
            })
        })

        return res.json({
            itemid
        }).status(200)

    } catch (error) {
        console.log(error)
    }
    

    res.json({ 
        message: "Item created "
    })
})