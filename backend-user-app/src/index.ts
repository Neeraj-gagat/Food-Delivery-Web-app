import  express  from "express";
import cors from "cors"
import { userRouter } from "./routes/user";
import { orderRouter } from "./routes/order";


const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/user", userRouter);

app.use("/api/v1/order", orderRouter);
