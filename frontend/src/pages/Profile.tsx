import { useCallback, useEffect, useState } from "react";
import About from "@/components/profile/AboutMeSection";
import MyQuizzes from "@/components/profile/MyQuizzesSection";
import RecentActivityContainer from "@/components/profile/RecentActivitySection";

export type ProfileUser = {
    _id: string;
    username: string;
    profileImage: string;
    aboutMe: string;
    favoriteSubjects: string[];
    createdAt: string;
};

export type ProfileQuiz = {
    _id: string;
    title: string;
    subject: string;
    questions: { question: string; answer: string }[];
    isPrivate: boolean;
    icon: string;
    badge: string;
};

export type ProfileActivity = {
    _id: string;
    quizTitle: string;
    questionCount: number;
    studyMethod: string;
    createdAt: string;
};

type ProfileResponse = {
    user: ProfileUser;
    quizzes: ProfileQuiz[];
    activity: ProfileActivity[];
};

const API_BASE = "http://localhost:3000/api";

export default function Profile() {
    const [data, setData] = useState<ProfileResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/profile`);
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error ?? `Request failed: ${res.status}`);
            }
            const json: ProfileResponse = await res.json();
            setData(json);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load profile");
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    if (error) {
        return (
            <div className="p-4 text-center text-red-600">
                <p>Failed to load profile: {error}</p>
            </div>
        );
    }

    if (!data) {
        return <div className="p-4 text-center">Loading profile...</div>;
    }

    return (
        <div
            id="profile-page"
            className="p-4 flex justify-center columns-2 gap-2"
        >
            <div id="left-column" className="p-4 space-y-10 columns-1">
                <About user={data.user} onSaved={refresh} />
                <MyQuizzes quizzes={data.quizzes} onChanged={refresh} />
            </div>
            <div id="right-column" className="p-4">
                <RecentActivityContainer activity={data.activity} onChanged={refresh} />
            </div>
        </div>
    );
}
