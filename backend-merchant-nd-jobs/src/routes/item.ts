import { Router } from "express";
import { authMiddleWare } from "../middleware";
import { ItemSchema } from "../types/type";
import { prismaClient } from "../db/db";

const router = Router();
// @ts-ignore
router.post("/",authMiddleWare,(req,res) => {

})