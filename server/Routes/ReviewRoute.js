import express from "express";
import { verifyToken } from "../Middleware/Jwt.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../Controllers/ReviewController.js";

const router = express.Router();

router.post("/", verifyToken, createReview )
router.get("/:gigId", getReviews )
router.delete("/:id", deleteReview)

export default router;