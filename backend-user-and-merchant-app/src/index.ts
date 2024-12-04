import  express  from "express";
import cors from "cors"
import { userRouter } from "./routes/user";
import { orderRouter } from "./routes/order";
import { searchRouter } from "./routes/search";
import { MerchantRouter } from "./routes/merchant";

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/user", userRouter);

app.use("/api/v1/order", orderRouter);

app.use("/api/v1/restaurants", searchRouter);

app.use("/api/v1/merchant", MerchantRouter);


app.listen(port, () => {
    console.log(`server running on Port:${port}`)
})
