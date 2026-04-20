import express from "express";
import { createQuiz } from "../controllers/createQuiz";

const router = express.Router();

// POST /api/create-quiz
router.post("/create-quiz", createQuiz);

export default router;