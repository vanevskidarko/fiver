import express from "express";
import {deleteUser,getUser} from "../Controllers/UserController.js";
import { verifyToken } from "../Middleware/Jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", verifyToken, getUser)

export default router;