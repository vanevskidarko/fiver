import express from "express";
import {createGig, deleteGig,getGig,getGigs} from "../Controllers/GigController.js"
import {verifyToken} from "../Middleware/Jwt.js"


const router = express.Router();

router.post("/", verifyToken, createGig)
router.delete("/:id", verifyToken, deleteGig)
router.get("/single/:id", verifyToken, getGig)
router.get("/", getGigs)

export default router;