import mongoose, { Schema, Document } from "mongoose";

interface IQuestion {
    question: string;
    answer: string;
}

export interface IQuiz extends Document {
    title: string;
    subject: string;
    questions: IQuestion[];
    createdAt: Date;
    updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

const quizSchema = new Schema<IQuiz>(
    {
        title: { type: String, required: true },
        subject: { type: String, required: true },
        questions: { type: [questionSchema], required: true },
    },
    { timestamps: true }
);

export const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);