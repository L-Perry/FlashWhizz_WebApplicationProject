import { Request, Response } from "express";
import { Quiz } from "../models/quizModel";

export const multichoice = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;

        const quiz = await Quiz.findById(id);

        // Error catch for quiz not existing
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        return res.status(200).json(quiz);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }

};