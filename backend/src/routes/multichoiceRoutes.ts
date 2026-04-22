import express from "express";
import { multichoice } from "../controllers/multichoice";

const router = express.Router();

// GET /api/multichoice
router.get("/multichoice/:id", multichoice);

export default router;