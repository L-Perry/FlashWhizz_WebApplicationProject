import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Pencil,
  Play,
  Share2,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

const demoQuizName = "Quiz";

const pageShellClass =
  "min-h-[calc(100vh-9rem)] bg-[linear-gradient(180deg,var(--quiz-surface)_0%,#ffffff_18%,#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-10";

const frameClass =
  "mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-[3px] border-[var(--palette-3)] bg-[var(--quiz-panel)] shadow-[0_22px_60px_rgba(126,82,160,0.18)]";

const controlChipClass =
  "border-[3px] border-[var(--quiz-control-border)] bg-[var(--quiz-control)] text-[var(--palette-4)] shadow-[0_8px_18px_rgba(60,73,63,0.25)] hover:bg-[var(--quiz-control-hover)]";

const cellCardClass =
  "min-h-[4.6rem] justify-center rounded-[1.15rem] border border-[var(--quiz-border-soft)] bg-white px-4 py-4 text-center text-lg font-semibold text-[var(--quiz-ink-strong)] shadow-[0_6px_14px_rgba(73,77,68,0.18)]";

const editInputClass =
  "h-auto min-h-[3.3rem] border-0 bg-transparent px-0 py-0 text-center text-lg font-semibold text-[var(--quiz-ink-strong)] shadow-none focus-visible:ring-0";

type ViewMode = "view" | "edit" | "delete";

export default function ViewQuiz() {
  const { id } = useParams<{ id: string }>();

  const [mode, setMode] = useState<ViewMode>("view");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM DB
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/multichoice/${id}`);
        if (!res.ok) throw new Error("Failed to fetch quiz");

        const data = await res.json();
        console.log(data);
        setFlashcards(
          (data.questions || []).map((card: any, index: number) => ({
            id: card.id || card._id || `card-${index}`,
            question: card.question,
            answer: card.answer,
          }))
        );
      } catch (err) {
        console.error(err);
        setFlashcards([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchQuiz();
  }, [id]);

  // ✅ UPDATE LOCAL FIELD
  const setFieldValue = (
    flashcardId: string,
    field: "question" | "answer",
    value: string
  ) => {
    setFlashcards((prev) =>
      prev.map((c) =>
        c.id === flashcardId ? { ...c, [field]: value } : c
      )
    );
  };

  // ✅ DELETE LOCAL CARD
  const removeFlashcard = (flashcardId: string) => {
    setFlashcards((prev) =>
      prev.filter((c) => c.id !== flashcardId)
    );
  };

  // ✅ LOADING
  if (loading) {
    return (
      <main className={pageShellClass}>
        <section className={frameClass}>
          <div className="p-10 text-center font-semibold">
            Loading quiz...
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={pageShellClass}>
      <section className={frameClass}>
        {/* HEADER */}
        <div className="border-b-[3px] border-[var(--palette-3)] bg-[var(--palette-3)] px-4 py-4 text-center text-white font-bold">
          {demoQuizName}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between border-b-[3px] border-[var(--palette-3)] bg-[var(--palette-1)] px-4 py-4">
          <Button className={controlChipClass}>
            <Play className="size-5" />
          </Button>

          <div className="flex gap-2">
            <Button onClick={() => setMode(mode === "edit" ? "view" : "edit")}>
              <Pencil className="size-5" />
            </Button>

            <Button>
              <Share2 className="size-5" />
            </Button>

            <Button onClick={() => setMode(mode === "delete" ? "view" : "delete")}>
              <Trash2 className="size-5" />
            </Button>
          </div>
        </div>

        {/* MODE */}
        <div className="border-b-[3px] border-[var(--palette-3)] px-4 py-2 text-sm">
          {mode === "edit" && "Edit mode"}
          {mode === "delete" && "Delete mode"}
          {mode === "view" && "View mode"}
        </div>

        {/* FLASHCARDS */}
        {flashcards.length === 0 ? (
          <div className="p-10 text-center font-semibold">
            No flashcards found
          </div>
        ) : (
          <div>
            {flashcards.map((card, i) => (
              <div
                key={card.id}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2",
                  i < flashcards.length - 1 &&
                  "border-b-[3px] border-[var(--palette-3)]"
                )}
              >
                <FlashcardCell
                  mode={mode}
                  value={card.question}
                  field="question"
                  onChange={(v: string) =>
                    setFieldValue(card.id, "question", v)
                  }
                  onDelete={() => removeFlashcard(card.id)}
                />

                <FlashcardCell
                  mode={mode}
                  value={card.answer}
                  field="answer"
                  onChange={(v: string) =>
                    setFieldValue(card.id, "answer", v)
                  }
                  onDelete={() => removeFlashcard(card.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-between border-t-[3px] border-[var(--palette-3)] px-4 py-3 text-sm">
          <span>Quiz ID: {id}</span>
          <span>{flashcards.length} cards</span>
        </div>
      </section>
    </main>
  );
}

// ✅ CELL COMPONENT (unchanged logic)
function FlashcardCell({
  value,
  field,
  mode,
  onChange,
  onDelete,
}: any) {
  const isDelete = mode === "delete";
  const isEdit = mode === "edit";

  return (
    <div className="px-4 py-3">
      <Card
        className={cn(
          cellCardClass,
          isDelete && "cursor-pointer hover:border-red-500"
        )}
        onClick={isDelete ? onDelete : undefined}
      >
        {isEdit ? (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={editInputClass}
          />
        ) : (
          value
        )}
      </Card>
    </div>
  );
}