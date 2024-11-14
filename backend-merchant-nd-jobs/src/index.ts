import  express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/merchant",)

app.use("/api/v1/rider",)

app.listen(3001)