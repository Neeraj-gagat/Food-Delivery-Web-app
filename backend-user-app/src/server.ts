import http from "http"
import app from "./index"
import { Server } from "socket.io";

const port = 3000;

const server = http.createServer(app)
// initializeSocket(server)
//  const io = new Server(server)   

server.listen(port ,() => {
    console.log("Server is running on 3000")
})