import express from "express";
import {verifyToken} from "../Middleware/Jwt.js";
import {getOrders, intent} from "../Controllers/OrderController.js"

const router = express.Router();

// router.post("/:gigId",verifyToken,createOrder)
router.get("/",verifyToken,getOrders)
router.post("/create-payment-intent/:id",verifyToken,intent)

export default router;