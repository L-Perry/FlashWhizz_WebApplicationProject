import styles from "./ProfileStyles.module.css";
import MyQuizTile from "./MyQuizTile";
import { Toilet, Croissant, SquareCode, Origami, BookOpen } from "lucide-react";
import type { ProfileQuiz } from "@/pages/Profile";

const API_BASE = "http://localhost:3000/api";

// Icon registry — extend this as new selectable icons are added.
const ICON_MAP: Record<string, React.ReactNode> = {
  Toilet: <Toilet />,
  Croissant: <Croissant />,
  SquareCode: <SquareCode />,
  Origami: <Origami />,
  BookOpen: <BookOpen />,
};

function resolveIcon(name: string): React.ReactNode {
  return ICON_MAP[name] ?? <BookOpen />;
}

type BadgeVariant = "mastered" | "good" | "practice" | "suck";
const BADGE_VARIANTS: BadgeVariant[] = ["mastered", "good", "practice", "suck"];
function resolveBadge(name: string): BadgeVariant {
  return (BADGE_VARIANTS as string[]).includes(name)
    ? (name as BadgeVariant)
    : "practice";
}

type MyQuizzesProps = {
  quizzes: ProfileQuiz[];
  onChanged: () => void;
};

export default function MyQuizzes({ quizzes, onChanged }: MyQuizzesProps) {
  async function setQuizPrivacy(quizId: string, isPrivate: boolean) {
    try {
      const res = await fetch(
        `${API_BASE}/profile/quizzes/${quizId}/privacy`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isPrivate }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Update failed: ${res.status}`);
      }
      onChanged();
    } catch (err) {
      console.error("Failed to update quiz privacy:", err);
    }
  }

  return (
    <div id="myquizzes-section" className={styles.myQuizzes}>
      <div id="top-row" className="flex items-center w-full">
        <h2 className="text-2xl jersey-25-regular font-semibold mb-0 w-full">My Quizzes</h2>
      </div>
      <div id="quizzes-created" className="flex flex-col gap-3 w-full">
        {quizzes.length === 0 ? (
          <p className="text-sm opacity-70 mt-2">No quizzes yet.</p>
        ) : (
          quizzes.map((q) => (
            <MyQuizTile
              key={q._id}
              icon={resolveIcon(q.icon)}
              title={q.title}
              subtitle={`${q.questions.length} Questions`}
              badge={resolveBadge(q.badge)}
              quizId={q._id}
              isPrivate={q.isPrivate}
              onPrivacyChange={(next) => setQuizPrivacy(q._id, next)}
            />
          ))
        )}
      </div>
    </div>
  );
}
