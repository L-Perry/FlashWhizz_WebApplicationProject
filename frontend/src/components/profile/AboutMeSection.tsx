import { useState } from "react";
import styles from "./ProfileStyles.module.css";
import profileImg from "./Whizzler69.jpg";
import type { ProfileUser } from "@/pages/Profile";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const API_BASE = "http://localhost:3000/api";

// Predefined favorite-subject options (extend as desired)
const SUBJECT_OPTIONS = [
  "Computer Science",
  "History",
  "Entertainment",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "Geography",
  "Literature",
  "Art",
  "Music",
  "Languages",
  "Philosophy",
  "Economics",
  "Psychology",
];

type AboutProps = {
  user: ProfileUser;
  onSaved: () => void;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 10);
}

export default function About({ user, onSaved }: AboutProps) {
  const [editing, setEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState(user.aboutMe);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    user.favoriteSubjects
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Merge any subjects the user already has but that aren't in the predefined
  // list, so nothing gets silently dropped on save.
  const displayedOptions = Array.from(
    new Set([...SUBJECT_OPTIONS, ...user.favoriteSubjects])
  );

  function startEdit() {
    setAboutMe(user.aboutMe);
    setSelectedSubjects(user.favoriteSubjects);
    setError(null);
    setEditing(true);
  }

  function cancel() {
    setEditing(false);
    setError(null);
  }

  function toggleSubject(subject: string, checked: boolean) {
    setSelectedSubjects((prev) =>
      checked ? [...prev, subject] : prev.filter((s) => s !== subject)
    );
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aboutMe, favoriteSubjects: selectedSubjects }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Save failed: ${res.status}`);
      }
      setEditing(false);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div id="about-section" className={styles.about}>
      <div id="top-row" className="flex items-center justify-between w-full mb-4 mt-4">
        <h2 className="text-3xl font-semibold jersey-25-regular">{user.username}'s Profile</h2>
        <div className="flex items-center gap-3">
          <h4 className="text-sm text-black jersey-25-regular">Member since {formatDate(user.createdAt)}</h4>
          {editing ? (
            <>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="px-2 py-1 text-sm bg-green-600 text-white rounded cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={cancel}
                disabled={saving}
                className="px-2 py-1 text-sm bg-gray-300 text-black rounded cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={startEdit}
              className="px-2 py-1 text-sm bg-blue-600 text-white rounded cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      {error ? <p className="text-sm text-red-600 mb-2">{error}</p> : null}
      <div id="avatar-and-info-row" className="flex flex-row gap-4 w-full">
        <img src={profileImg} id="profile-img" style={{ width: '250px', height: '250px' }} />

        <div id="info-column" className="flex flex-col gap-2  w-full">
          <p className="text-xl text-black mb-2 jersey-25-regular">Favorite Subjects:
            {editing ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 mb-4">
                {displayedOptions.map((subject) => {
                  const id = `subject-${subject.replace(/\s+/g, "-").toLowerCase()}`;
                  const checked = selectedSubjects.includes(subject);
                  return (
                    <div key={subject} className="flex items-center gap-2">
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={(value) => toggleSubject(subject, value === true)}
                      />
                      <Label htmlFor={id} className="text-sm jersey-25-regular cursor-pointer">
                        {subject}
                      </Label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <ul className="list-disc list pl-2 list-inside text-sm mb-8">
                {user.favoriteSubjects.length === 0 ? (
                  <li className="opacity-60">None listed</li>
                ) : (
                  user.favoriteSubjects.map((s) => <li key={s}>{s}</li>)
                )}
              </ul>
            )}
          </p>
          <p className="text-xl text-black mb-2 jersey-25-regular">About Me:
            {editing ? (
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                rows={4}
                className="block w-full mt-2 text-sm bg-white px-2 py-1 rounded ring-1 ring-foreground/20 jersey-25-regular"
              />
            ) : (
              <p className="text-sm mt-2 text-black jersey-25-regular">
                {user.aboutMe || <span className="opacity-60">No about me yet.</span>}
              </p>
            )}
          </p>
        </div>
      </div>
    </div>

  );
}
