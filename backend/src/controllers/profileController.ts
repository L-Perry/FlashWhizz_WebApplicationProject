import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Activity } from "../models/activityModel";
import "../models/quizModel";

const RECENT_ACTIVITY_LIMIT = 4;

interface UpdateProfileBody {
    username?: string;
    aboutMe?: string;
    favoriteSubjects?: string[];
}

interface UpdateQuizPrivacyBody {
    isPrivate: boolean;
}

export const getProfile = async (_req: Request, res: Response) => {
    try {
        const user = await User.findOne().populate("quizzes.quizId");

        if (!user) {
            return res.status(404).json({ error: "No profile user found. Run the seed script." });
        }

        const quizzes = user.quizzes
            .filter((entry: any) => entry.quizId)
            .map((entry: any) => ({
                _id: entry.quizId._id,
                title: entry.quizId.title,
                subject: entry.quizId.subject,
                questions: entry.quizId.questions,
                isPrivate: entry.isPrivate,
                icon: entry.icon,
                badge: entry.badge,
            }));

        const activity = await Activity.find({ userId: user._id })
            .sort({ createdAt: -1 })
            .limit(RECENT_ACTIVITY_LIMIT);

        return res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
                profileImage: user.profileImage,
                aboutMe: user.aboutMe,
                favoriteSubjects: user.favoriteSubjects,
                createdAt: user.createdAt,
            },
            quizzes,
            activity,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateProfile = async (
    req: Request<{}, {}, UpdateProfileBody>,
    res: Response
) => {
    try {
        const { username, aboutMe, favoriteSubjects } = req.body;

        if (
            username === undefined &&
            aboutMe === undefined &&
            favoriteSubjects === undefined
        ) {
            return res.status(400).json({
                error: "No editable fields provided. Allowed: username, aboutMe, favoriteSubjects.",
            });
        }

        if (username !== undefined && (typeof username !== "string" || username.trim() === "")) {
            return res.status(400).json({ error: "username must be a non-empty string" });
        }

        if (aboutMe !== undefined && typeof aboutMe !== "string") {
            return res.status(400).json({ error: "aboutMe must be a string" });
        }

        if (
            favoriteSubjects !== undefined &&
            (!Array.isArray(favoriteSubjects) ||
                favoriteSubjects.some((s) => typeof s !== "string"))
        ) {
            return res.status(400).json({ error: "favoriteSubjects must be an array of strings" });
        }

        const update: Record<string, unknown> = {};
        if (username !== undefined) update.username = username.trim();
        if (aboutMe !== undefined) update.aboutMe = aboutMe;
        if (favoriteSubjects !== undefined) update.favoriteSubjects = favoriteSubjects;

        const user = await User.findOneAndUpdate({}, { $set: update }, { new: true });

        if (!user) {
            return res.status(404).json({ error: "No profile user found. Run the seed script." });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                profileImage: user.profileImage,
                aboutMe: user.aboutMe,
                favoriteSubjects: user.favoriteSubjects,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateQuizPrivacy = async (
    req: Request<{ quizId: string }, {}, UpdateQuizPrivacyBody>,
    res: Response
) => {
    try {
        const { quizId } = req.params;
        const { isPrivate } = req.body;

        if (typeof isPrivate !== "boolean") {
            return res.status(400).json({ error: "isPrivate must be a boolean" });
        }

        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ error: "No profile user found. Run the seed script." });
        }

        const updated = await User.findOneAndUpdate(
            { _id: user._id, "quizzes.quizId": quizId },
            { $set: { "quizzes.$.isPrivate": isPrivate } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Quiz not found in this user's collection" });
        }

        return res.status(200).json({ message: "Quiz privacy updated", quizId, isPrivate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteActivity = async (
    req: Request<{ activityId: string }>,
    res: Response
) => {
    try {
        const { activityId } = req.params;

        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ error: "No profile user found. Run the seed script." });
        }

        const deleted = await Activity.findOneAndDelete({
            _id: activityId,
            userId: user._id,
        });

        if (!deleted) {
            return res.status(404).json({ error: "Activity not found" });
        }

        return res.status(200).json({ message: "Activity deleted", activityId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
