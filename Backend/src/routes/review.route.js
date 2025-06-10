import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { submitReview } from "../controllers/review.controller.js";

const router = express.Router();

// Auth-protected routes
router.use(protectRoute);

// POST a review
router.post("/", submitReview);

// Optional: GET all reviews
// router.get("/", getAllReviews);

export default router;
 