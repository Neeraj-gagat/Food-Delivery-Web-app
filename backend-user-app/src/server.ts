import http from "http"
import app from "./index"
import { Server } from "socket.io";

const port = 3000;

const server = http.createServer(app)
 const io = new Server(server)   

//  WebSocket Connection
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

server.listen(port ,() => {
    console.log("Server is running on 3000")
})