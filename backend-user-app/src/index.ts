import  express  from "express";
import cors from "cors"
import { userRouter } from "./routes/user";
import { orderRouter } from "./routes/order";
import { searchRouter } from "./routes/search";


const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/user", userRouter);

app.use("/api/v1/order", orderRouter);

app.use("/api/v1/restaurants", searchRouter);

app.listen(3000)
