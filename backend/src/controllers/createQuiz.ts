import { Request, Response } from "express";
import { Quiz } from "../models/quizModel";

interface CreateQuizBody {
    title: string;
    subject: string;
    questions: {
        question: string;
        answer: string;
    }[];
}

export const createQuiz = async (
    req: Request<{}, {}, CreateQuizBody>,
    res: Response
) => {
    try {
        const { title, subject, questions } = req.body;

        // 1. Basic validation
        if (!title || !subject || !questions || questions.length === 0) {
            return res.status(400).json({
                error: "Title, subject, and at least one question are required",
            });
        }

        // 2. Validate each question
        const invalidQuestion = questions.find(
            (q) => !q.question || !q.answer
        );

        if (invalidQuestion) {
            return res.status(400).json({
                error: "Each question must have a question and an answer",
            });
        }

        // 3. Create quiz in DB
        const quiz = await Quiz.create({
            title,
            subject,
            questions,
        });

        // 4. Return response
        return res.status(201).json({
            message: "Quiz created successfully",
            quiz,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};