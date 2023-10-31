import express from "express";
import {createConversation,getConversations,getSingleConversation,updateConversation} from "../Controllers/ConversationController.js"
import {verifyToken} from "../Middleware/Jwt.js"
const router = express.Router();

router.get("/",verifyToken,getConversations)
router.post("/",verifyToken,createConversation)
router.get("/single/:id",verifyToken,getSingleConversation)
router.put("/:id",verifyToken,updateConversation)

export default router;