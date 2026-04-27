import { Request, Response } from 'express';
import { Quiz } from '../models/quizModel';

export const searchBySubject = async (req: Request, res: Response) => {
    try {
        const { subject } = req.query;

        if (!subject || typeof subject !== 'string') {
            return res.status(400).json({ error: 'Subject parameter is required' });
        }

        const quizzes = await Quiz.find({ subject: { $regex: subject, $options: 'i' } });

        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search quizzes by subject' });
    }
};
