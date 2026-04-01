import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Pencil,
  Play,
  Search,
  Share2,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

const sampleFlashcards: Flashcard[] = [
  { id: "card-1", question: "Example Question", answer: "Question Answer" },
  { id: "card-2", question: "Example Question", answer: "Question Answer" },
  { id: "card-3", question: "Example Question", answer: "Question Answer" },
  { id: "card-4", question: "Example Question", answer: "Question Answer" },
  { id: "card-5", question: "Example Question", answer: "Question Answer" },
  { id: "card-6", question: "Example Question", answer: "Question Answer" },
  { id: "card-7", question: "Example Question", answer: "Question Answer" },
];

const demoQuizName = "Biology Midterm Review";
const emptyStateClass =
  "px-6 py-10 text-center text-base font-semibold text-[var(--quiz-ink)]";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<ViewMode>("view");
  const [flashcards, setFlashcards] = useState(sampleFlashcards);

  const filteredFlashcards = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return flashcards;
    }

    return flashcards.filter((flashcard) =>
      `${flashcard.question} ${flashcard.answer}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [flashcards, searchQuery]);

  const setFieldValue = (
    flashcardId: string,
    field: "question" | "answer",
    value: string
  ) => {
    setFlashcards((currentFlashcards) =>
      currentFlashcards.map((flashcard) =>
        flashcard.id === flashcardId
          ? { ...flashcard, [field]: value }
          : flashcard
      )
    );
  };

  const removeFlashcard = (flashcardId: string) => {
    setFlashcards((currentFlashcards) =>
      currentFlashcards.filter((flashcard) => flashcard.id !== flashcardId)
    );
  };

  return (
    <main className={pageShellClass}>
      <section className={frameClass}>
        <div className="border-b-[3px] border-[var(--palette-3)] bg-[var(--palette-3)] px-4 pb-5 pt-3 sm:px-8">
          <div className="flex min-h-11 items-center rounded-full border-2 border-[rgba(60,73,63,0.45)] bg-[var(--quiz-header-accent)] px-6 text-center text-lg font-semibold tracking-[0.08em] text-white sm:text-xl">
            <span className="w-full truncate">{demoQuizName}</span>
          </div>
        </div>

        <div className="border-b-[3px] border-[var(--palette-3)] bg-[var(--palette-1)] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="icon-lg"
                className={cn("size-14 rounded-full", controlChipClass)}
                aria-label="Study flashcards"
              >
                <Play className="size-6 fill-current" />
              </Button>

              <Badge className={cn("h-14 rounded-full px-7 text-lg font-semibold", controlChipClass)}>
                Flashcards
              </Badge>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <div className="relative min-w-0 flex-1 sm:w-[18rem] lg:w-[21rem]">
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search Quiz"
                  className="h-12 rounded-full border-[3px] border-[var(--quiz-control-border)] bg-white px-5 pr-14 text-base font-semibold text-[var(--quiz-ink)] shadow-[0_8px_18px_rgba(60,73,63,0.16)] placeholder:text-[var(--quiz-ink)] focus-visible:ring-[var(--palette-4)]"
                />
                <Search className="pointer-events-none absolute right-4 top-1/2 size-7 -translate-y-1/2 text-[var(--palette-4)]" />
              </div>

              <div className="flex items-center gap-2">
                <ActionButton
                  label={mode === "edit" ? "Done" : "Edit"}
                  icon={Pencil}
                  wide
                  active={mode === "edit"}
                  onClick={() =>
                    setMode((currentMode) =>
                      currentMode === "edit" ? "view" : "edit"
                    )
                  }
                />
                <ActionButton label="Share" icon={Share2} />
                <ActionButton
                  label="Delete"
                  icon={Trash2}
                  destructive
                  active={mode === "delete"}
                  onClick={() =>
                    setMode((currentMode) =>
                      currentMode === "delete" ? "view" : "delete"
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b-[3px] border-[var(--palette-3)] bg-[var(--quiz-panel)] px-4 py-2 text-sm font-semibold text-[var(--quiz-ink)] sm:px-6">
          {mode === "edit" && "Edit mode: click into any card and type to update it locally."}
          {mode === "delete" && "Delete mode: hover a question or answer card, then click it to remove that entry locally."}
          {mode === "view" && "View mode: search cards, study them, or switch into edit/delete mode."}
        </div>

        {filteredFlashcards.length === 0 ? (
          <div className={emptyStateClass}>
            No flashcards match your search.
          </div>
        ) : (
          <div className="space-y-0">
            {filteredFlashcards.map((flashcard, index) => (
              <div
                key={flashcard.id}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2",
                  index < filteredFlashcards.length - 1
                    ? "border-b-[3px] border-[var(--palette-3)]"
                    : ""
                )}
              >
                <FlashcardCell
                  mode={mode}
                  className="md:border-r-[3px] md:border-r-[var(--palette-3)]"
                  value={flashcard.question}
                  field="question"
                  onChange={(value) =>
                    setFieldValue(flashcard.id, "question", value)
                  }
                  onDelete={() => removeFlashcard(flashcard.id)}
                />
                <FlashcardCell
                  mode={mode}
                  value={flashcard.answer}
                  field="answer"
                  onChange={(value) =>
                    setFieldValue(flashcard.id, "answer", value)
                  }
                  onDelete={() => removeFlashcard(flashcard.id)}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t-[3px] border-[var(--palette-3)] bg-[var(--quiz-footer)] px-4 py-3 text-sm font-medium text-[var(--quiz-ink)] sm:px-6">
          <span>Quiz ID: {id ?? "demo-quiz"}</span>
          <span>{filteredFlashcards.length} cards</span>
        </div>
      </section>
    </main>
  );
}

function FlashcardCell({
  value,
  field,
  mode,
  onChange,
  onDelete,
  className,
}: {
  value: string;
  field: "question" | "answer";
  mode: ViewMode;
  onChange: (value: string) => void;
  onDelete: () => void;
  className?: string;
}) {
  const isDeleteMode = mode === "delete";
  const isEditMode = mode === "edit";
  const isQuestion = field === "question";

  return (
    <div className={cn("px-4 py-3 sm:px-6 sm:py-4", className)}>
      <Card
        className={cn(
          cellCardClass,
          isEditMode &&
            (isQuestion
              ? "border-[var(--quiz-edit-question-border)] bg-[var(--quiz-edit-question-bg)]"
              : "border-[var(--quiz-edit-answer-border)] bg-[var(--quiz-edit-answer-bg)]"),
          isDeleteMode &&
            "cursor-pointer transition-[box-shadow,border-color,transform] duration-150 hover:border-[var(--quiz-action-danger)] hover:shadow-[0_0_0_4px_rgba(216,100,103,0.24),0_10px_22px_rgba(216,100,103,0.22)]",
          isEditMode && "px-5"
        )}
        onClick={isDeleteMode ? onDelete : undefined}
        role={isDeleteMode ? "button" : undefined}
        tabIndex={isDeleteMode ? 0 : undefined}
        onKeyDown={
          isDeleteMode
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onDelete();
                }
              }
            : undefined
        }
      >
        {isEditMode ? (
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={editInputClass}
            aria-label={`Edit ${field}`}
          />
        ) : (
          value
        )}
      </Card>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  wide = false,
  destructive = false,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  wide?: boolean;
  destructive?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      className={cn(
        "h-12 rounded-[1.05rem] border-2 border-transparent px-4 text-base font-semibold shadow-[0_8px_18px_rgba(60,73,63,0.16)]",
        wide ? "min-w-[5.75rem]" : "w-12 px-0",
        destructive
          ? "bg-[var(--quiz-action-danger)] text-[var(--quiz-action-danger-ink)] hover:bg-[var(--quiz-action-danger-hover)]"
          : "bg-[var(--palette-4)] text-[var(--quiz-ink)] hover:bg-[var(--quiz-action-hover)]",
        active && "ring-4 ring-white/65"
      )}
      aria-label={label}
      onClick={onClick}
    >
      {wide ? label : <Icon className="size-5" />}
    </Button>
  );
}
