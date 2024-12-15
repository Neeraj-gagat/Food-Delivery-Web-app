import  express from "express";
import { Express } from "express";
import cors from "cors";
import http from "http"
import { Server } from "socket.io";
import { Riderrouter } from "./routes/rider";

const app:Express = express();
const server = http.createServer(app)
const io = new Server(server)
app.use(express.json());
app.use(cors());



app.use("/api/v1/rider",Riderrouter)

const deliveries:String[] = []
const activeDeliveries: Record<
  string,
  { riderSocketId: string; userSocketId?: string; status: string }
> = {};

// WebSocket Connection
io.on("connection", (Socket) => {
    console.log("connected")

    // Triggers when Client Request dilevery-updates
    Socket.on("/track-dilevery", (orderId) => {
        console.log(`Tracking dilevery for orderId: ${orderId}`)
        
        if (!deliveries[orderId]) {
            Socket.emit("",{message: "Dilevery Not Found"})
            return;
        }
        
        Socket.on("update-location", (data) => {
            const { orderId, location } = data;
        
            if (!activeDeliveries[orderId]) {
              console.log("Invalid delivery update");
              return;
            }
        
            const delivery = activeDeliveries[orderId];
        
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
    })
})

app.listen(3001)