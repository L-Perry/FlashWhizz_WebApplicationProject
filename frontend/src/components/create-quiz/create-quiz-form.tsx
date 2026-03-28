import {
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { CirclePlus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { QuestionRow } from "@/components/create-quiz/question-row";
import { TitleSubject } from "@/components/create-quiz/title-subject";

export function CreateQuizForm() {
    const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");

    const addQuestion = () => {
        setQuestions([...questions, { question: "", answer: "" }]);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    // Send to backend when we have it up
    const createQuiz = () => {
        if (!title || !subject) {
            alert("Title and subject are required");
            return;
        }

        if (questions.some(q => !q.question || !q.answer)) {
            alert("All questions must have a question and answer");
            return;
        }

        console.log("Quiz Created:", { title, subject, questions });
    };

    return (
        <Card className="max-w-2xl w-full bg-[#ECFEE8]">
            <CardHeader className="border-b">
                <TitleSubject
                    title={title}
                    subject={subject}
                    setTitle={setTitle}
                    setSubject={setSubject}
                />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <FieldLabel className="mx-auto w-fit">
                        Questions
                    </FieldLabel>

                    <FieldGroup className="flex-col gap-4">
                        {questions.map((q, index) => (
                            <QuestionRow
                                key={index}
                                q={q}
                                index={index}
                                updateQuestion={(index, key, value) => {
                                    const updatedQuestions = questions.map((q, i) => {
                                        if (i === index) {
                                            return { ...q, [key]: value };
                                        }
                                        return q;
                                    });
                                    setQuestions(updatedQuestions);
                                }}
                                removeQuestion={removeQuestion}
                            />
                        ))}
                    </FieldGroup>

                    <div className="flex justify-center">
                        <button
                            onClick={addQuestion}
                            className="h-9 w-9 flex items-center justify-center rounded-md"
                        >
                            <CirclePlus className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-center">
                <Button
                    className="bg-[#E0B0D5] text-black px-4 py-2 rounded-md"
                    onClick={createQuiz}
                >
                    Create Quiz
                </Button>
            </CardFooter>
        </Card>
    );
}

