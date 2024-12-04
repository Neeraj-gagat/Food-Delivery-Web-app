import { Router } from "express";
import { prismaClient } from "../db/db";
import { orderCreateSchema } from "../types/types";
import { authMiddleWare } from "../middleware";

const router = Router();

router.post("/create-order",authMiddleWare, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = orderCreateSchema.safeParse(body)

    if (!parsedData.success) {
        return res.status(411).json({
            message: "incorrect inputs"
        })
    }

    try {
        const orderId = await prismaClient.order.create({
            data:{
                userId: id,
                merchantId: parsedData.data.merchantId
                items:{
                    create:parsedData.data.items.map((x) => ({
                        name:x.item
                    }))
                }
            }
        }) 
        
        return res.json({
            orderId
        }).status(200)

    } catch (error) {
        console.log(error)
    }
    
})

router.get("/", authMiddleWare, async (req, res) => {
    // @ts-ignore
    const id = req.id

    const orders = await prismaClient.order.findMany({
        where:{
            userId:id
        },
        include:{
            items:true
        }
    });

    return res.json({
        orders
    })
})

router.get("/:orderId", authMiddleWare, async (req, res) => {
    // @ts-ignore
    const id = req.id
    const orderId = req.params.orderId
    const order = await prismaClient.order.findFirst({
        where:{
            id:orderId,
            userId:id
        },
        include:{
            items:true
        }
    }) 

    return res.json({
        order
    })
})

export const orderRouter = router;