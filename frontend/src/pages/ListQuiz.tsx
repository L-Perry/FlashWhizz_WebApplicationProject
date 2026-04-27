import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import QuizTile from "@/components/quiz-list/QuizTile"

type Quiz = {
    _id: string
    title: string
    subtitle?: string
    subject: string
    questions: { _id: string; question: string; options: string[]; answer: string }[]
}

export default function SubjectQuizzesPage() {
    const { subject } = useParams()
    const navigate = useNavigate()

    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true)

                const res = await fetch(
                    `/api/search?subject=${encodeURIComponent(subject || "")}`
                )

                if (!res.ok) throw new Error("Failed to fetch quizzes")

                const data = await res.json()
                setQuizzes(data)
            } catch (err) {
                console.error(err)
                setQuizzes([])
            } finally {
                setLoading(false)
            }
        }

        if (subject) fetchQuizzes()
    }, [subject])

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold capitalize">
                {subject} quizzes
            </h1>

            {loading ? (
                <div className="text-muted-foreground">Loading quizzes...</div>
            ) : quizzes.length === 0 ? (
                <div className="text-muted-foreground">
                    No quizzes found for this subject.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {quizzes.map((quiz) => (
                        <QuizTile
                            key={quiz._id}
                            title={quiz.title}
                            subtitle={quiz.subtitle || quiz.subject}
                            questionCount={quiz.questions.length}
                            onClick={() => navigate(`/quiz/${quiz._id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}