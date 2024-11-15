import  express from "express";
import cors from "cors";
import { MerchantRouter } from "./routes/merchant";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/merchant",MerchantRouter)

// app.use("/api/v1/rider",)

app.listen(3001)