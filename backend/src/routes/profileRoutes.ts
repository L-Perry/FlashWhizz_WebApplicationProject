import express from "express";
import {
    getProfile,
    updateProfile,
    updateQuizPrivacy,
    deleteActivity,
} from "../controllers/profileController";

const router = express.Router();

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.patch("/profile/quizzes/:quizId/privacy", updateQuizPrivacy);
router.delete("/profile/activity/:activityId", deleteActivity);

export default router;
