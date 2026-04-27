import mongoose, { Schema, Document, Types } from "mongoose";

export interface IActivity extends Document {
    userId: Types.ObjectId;
    quizTitle: string;
    questionCount: number;
    studyMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        quizTitle: { type: String, required: true },
        questionCount: { type: Number, required: true },
        studyMethod: { type: String, required: true },
    },
    { timestamps: true }
);

export const Activity = mongoose.model<IActivity>("Activity", activitySchema);
