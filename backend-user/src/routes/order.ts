import { Router } from "express";
import { prismaClient } from "../db/db";
import { orderCreateSchema } from "../types/types";
import { authMiddleWare } from "../middleware";
import RabbitMQ from "../rabbitMq/rabbitmq";
// interface OrderDetails{
//     id:number;
//     userId: number;
//     merchantId: number;
//     items: string[];
//     createdAt:Date;
//     updatedAt:Date;
// }
const router = Router();

const merchantQueue = "Merchantqueue"
const riderQueue = "riderqueue"

const publishOrder = async (queue:string, OrderMessage:object ) => {
    
    try {
        const rabbitMq = RabbitMQ.getInstance();
        await rabbitMq.connect();
        const channel  = rabbitMq.getChannel();

        await channel.assertQueue(queue,{durable:true});

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(OrderMessage)), {persistent:true})

        console.log(`message sent to ${queue}:`, OrderMessage)
    } catch (error) {
        console.log(`message not sent because of error:`,error)
    }
} 

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
                merchantId: parsedData.data.merchantId,
                items:{
                    create:parsedData.data.items.map((x) => ({
                        name:x.item
                    }))
                }
            }
        }) 

        publishOrder(merchantQueue,orderId)
        
        return res.json({
            orderId
        }).status(200)

    } catch (error) {
        console.log(error)
        return res.status(500)
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
            id:Number(orderId),
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