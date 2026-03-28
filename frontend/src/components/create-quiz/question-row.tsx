import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Trash } from "lucide-react";

interface Question {
    question: string;
    answer: string;
}

interface QuestionRowProps {
    q: Question;
    index: number;
    updateQuestion: (index: number, key: keyof Question, value: string) => void;
    removeQuestion: (index: number) => void;
}

export function QuestionRow({ q, index, updateQuestion, removeQuestion }: QuestionRowProps) {
    return (
        <div className="flex flex-row gap-4 w-full border-b border-[#7E52A0] pb-4">
            <Field>
                <InputGroup className="bg-white/50">
                    <InputGroupTextarea
                        placeholder={`Enter question ${index + 1}...`}
                        value={q.question}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            updateQuestion(index, "question", e.target.value)
                        }
                    />
                </InputGroup>
            </Field>

            <div className="flex items-center">
                <button
                    onClick={() => removeQuestion(index)}
                    className="h-9 w-9 flex items-center justify-center rounded-md"
                >
                    <Trash className="h-4 w-4" />
                </button>
            </div>
            <Field>
                <InputGroup className="bg-white/50">
                    <InputGroupTextarea
                        placeholder={`Enter answer ${index + 1}...`}
                        value={q.answer}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            updateQuestion(index, "answer", e.target.value)
                        }
                    />
                </InputGroup>
            </Field>
        </div>
    );
}