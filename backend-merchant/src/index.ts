import express from "express"
import cors from "cors"
import http from "http"
import { MerchantRouter } from "./routes/merchant";
import { ItemRouter } from "./routes/item";
import { Server } from "socket.io";
import consumeMessages from "./consumer";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3002;
app.use(express.json());
app.use(cors())

app.use("/api/v1/merchant",MerchantRouter)

app.use("api/v1/item",ItemRouter)

// Map to store restaurant (merchant) socket connections
const merchantSockets: Record<number, string> = {};

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("Restaurant connected:", socket.id);

  // Register merchant ID when they connect
  socket.on("register-merchant", (merchantId: number) => {
    console.log(`Merchant ${merchantId} connected with socket ID ${socket.id}`);
    merchantSockets[merchantId] = socket.id;
  });

  socket.on("disconnect", () => {
    const merchantId = Object.keys(merchantSockets).find(
      (key) => merchantSockets[parseInt(key)] === socket.id
    );
    if (merchantId) {
      delete merchantSockets[parseInt(merchantId)];
      console.log(`Merchant ${merchantId} disconnected.`);
    }
  });
});

const processOrder = () => {
  const restaurantQueue = "restaurantQueue"; // RabbitMQ queue for restaurants

  consumeMessages(restaurantQueue, (ordermessage: any) => {
    console.log(`Received order message from RabbitMQ:`, ordermessage);

    const { merchantId, orderId, userId, items } = ordermessage;

    // Check if the merchant is connected
    const socketId = merchantSockets[merchantId];
    if (socketId) {
      io.to(socketId).emit("new-order", {
        orderId,
        userId,
        items,
      });
      console.log(`Order ${orderId} sent to Merchant ${merchantId}`);
    } else {
      console.log(`Merchant ${merchantId} is offline.`);
    }
  }).catch((error) => {
    console.error("Failed to consume order messages from RabbitMQ:", error);
  });
};

server.listen(port ,() => {
    console.log(`server is running on port:${port}`)
})

processOrder();