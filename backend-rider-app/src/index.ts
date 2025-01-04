import  express from "express";
import { Express } from "express";
import cors from "cors";
import http from "http"
import { Server } from "socket.io";
import { Riderrouter } from "./routes/rider";
import consumeMessages from "./consumer";
import { prismaClient } from "./db/db";

const app:Express = express();
const server = http.createServer(app)
const io = new Server(server)
app.use(express.json());
app.use(cors());



app.use("/api/v1/rider",Riderrouter)

const RIDER_Queue = "riderqueue"
const deliveries: any[] = [];
const activeDeliveries: Record<
  number,
  { riderSocketId: string; userSocketId?: string; status: string }
> = {};

const processOrder = () => {
  consumeMessages(RIDER_Queue,(message:any) =>{
  
    console.log(`Received order_message from RabbitMQ:${JSON.stringify(message)}`);

    deliveries.push(message.orderId)

    io.emit("new-order",message);

  }).catch((error) => {
    console.error(`Failed to catch order_message from RabbitMQ`,error)
  });
  };

// WebSocket Connection
io.on("connection", (Socket) => {
    console.log("connected")

    Socket.on("Accepting-order", async (riderId: string,orderId: number) => {

      try {
        await prismaClient.order.update({
            where:{
              id:orderId
            },
            data:{
              riderId:parseInt(riderId)
            }
        }),
        activeDeliveries[orderId] ={
          riderSocketId:Socket.id,
          status:"accepted", 
          userSocketId:undefined}

          console.log(`ridder ${riderId} accepted order ${orderId}`);
      } catch (error) {
        console.error(`error updating order:${error}`);
        Socket.emit("order:error", {message:"Error updating order"});
      }

    })
    Socket.on("update-location", (data) => {
      const { orderId, location } = data;
      
      const delivery = activeDeliveries[orderId];

      if (!delivery) {
        console.log("Invalid delivery update");
        return;
      }
  
      // Notify the specific user tracking this delivery
      if (delivery.userSocketId) {
        io.to(delivery.userSocketId).emit("delivery-update", {
          orderId,
          location,
          status: delivery.status,
        });
        console.log(`Location update sent to user ${delivery.userSocketId} for orderId: ${orderId}`);
      }
    });

    // Triggers when Client Request dilevery-updates
    Socket.on("/track-dilevery", (orderId) => {
        console.log(`Tracking dilevery for orderId: ${orderId}`)
        
        const delivery = activeDeliveries[orderId];

        if (!delivery) {
          Socket.emit("dilevery:error",{message: "Dilevery Not Found"})
          return;
      }
       delivery.userSocketId = Socket.id;
    })

    Socket.on("disconnect", () => {
      console.log(`socket disconnectsd: ${Socket.id}`)
      for (const orderId in activeDeliveries) {
        const delivery = activeDeliveries[orderId];
        if (delivery.riderSocketId === Socket.id || delivery.userSocketId === Socket.id) {
            delete activeDeliveries[orderId];
            console.log(`Cleaned up delivery for order ${orderId}`);
        }
    }
    })
})

server.listen(3001)

processOrder()