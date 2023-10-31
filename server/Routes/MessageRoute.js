import express from "express";
import { verifyToken } from "../Middleware/Jwt.js";
import {createMessage,getMessages} from "../Controllers/MessageController.js"
const router = express.Router();

router.post("/",verifyToken, createMessage)
router.get("/:id",verifyToken, getMessages)

export default router;