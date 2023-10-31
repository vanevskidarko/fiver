import express from "express";
import {verifyToken} from "../Middleware/Jwt.js";
import {createOrder,getOrders} from "../Controllers/OrderController.js"

const router = express.Router();

router.post("/:gigId",verifyToken,createOrder)
router.get("/",verifyToken,getOrders)

export default router;