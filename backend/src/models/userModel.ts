import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserQuiz {
    quizId: Types.ObjectId;
    isPrivate: boolean;
    icon: string;
    badge: string;
}

export interface IUser extends Document {
    username: string;
    profileImage: string;
    aboutMe: string;
    favoriteSubjects: string[];
    quizzes: IUserQuiz[];
    createdAt: Date;
    updatedAt: Date;
}

const userQuizSchema = new Schema<IUserQuiz>(
    {
        quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
        isPrivate: { type: Boolean, default: false },
        icon: { type: String, default: "BookOpen" },
        badge: { type: String, default: "practice" },
    },
    { _id: false }
);

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        profileImage: { type: String, default: "" },
        aboutMe: { type: String, default: "" },
        favoriteSubjects: { type: [String], default: [] },
        quizzes: { type: [userQuizSchema], default: [] },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
