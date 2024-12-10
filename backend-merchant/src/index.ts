import express from "express"
import cors from "cors"
import { MerchantRouter } from "./routes/merchant";
import { ItemRouter } from "./routes/item";

const app = express();
const port = 3002;
app.use(express.json());
app.use(cors())

app.use("/api/v1/merchant",MerchantRouter)

app.use("api/v1/item",ItemRouter)

app.listen(port ,() => {
    console.log(`server is running on port:${port}`)
})