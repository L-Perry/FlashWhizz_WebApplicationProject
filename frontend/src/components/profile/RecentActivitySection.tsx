import styles from "./ProfileStyles.module.css";
import RecentActivityTile from "./RecentActivityTile";
import type { ProfileActivity } from "@/pages/Profile";

const API_BASE = "http://localhost:3000/api";

type BadgeVariant = "flashcards" | "asteroids" | "matching";
const KNOWN_BADGES: BadgeVariant[] = ["flashcards", "asteroids", "matching"];

function toBadge(method: string): BadgeVariant {
  return (KNOWN_BADGES as string[]).includes(method)
    ? (method as BadgeVariant)
    : "flashcards";
}

type RecentActivityProps = {
  activity: ProfileActivity[];
  onChanged: () => void;
};

export default function RecentActivityContainer({
  activity,
  onChanged,
}: RecentActivityProps) {
  async function deleteActivity(activityId: string) {
    try {
      const res = await fetch(`${API_BASE}/profile/activity/${activityId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Delete failed: ${res.status}`);
      }
      onChanged();
    } catch (err) {
      console.error("Failed to delete activity:", err);
    }
  }

  return (
    <div className={styles.recentActivity}>
      <div id="top-row" className="flex items-center w-full">
        <h2 className="text-2xl jersey-25-regular font-semibold mb-0 w-full">Recent Activity</h2>
      </div>
      <div id="quizzes-taken" className="w-full gap-3 flex flex-col">
        {activity.length === 0 ? (
          <p className="text-sm opacity-70 mt-2">No recent activity.</p>
        ) : (
          activity.map((a) => (
            <RecentActivityTile
              key={a._id}
              title={a.quizTitle}
              subtitle={`${a.questionCount} Questions`}
              badge={toBadge(a.studyMethod)}
              activityId={a._id}
              onDelete={deleteActivity}
            />
          ))
        )}
      </div>
    </div>
  );
}
