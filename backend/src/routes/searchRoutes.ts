import express from "express";
import { searchBySubject } from "../controllers/searchController";

const router = express.Router();

// GET /api/search
router.get("/search", searchBySubject);

export default router;