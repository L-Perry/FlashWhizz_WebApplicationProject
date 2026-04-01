import React from "react";
import styles from "./ProfileStyles.module.css";
import profileImg from "./Whizzler69.jpg";
import RecentActivityTile from "./RecentActivityTile";
import PrivateToggle from "./PrivateToggle";

export default function RecentActivityContainer() {

  return (
    <div className={styles.recentActivity}>
      <div id="top-row" className="flex justify-space-between items-center w-full">
        <h2 className="text-2xl jersey-25-regular font-semibold mb-0 w-full">Recent Activity</h2>
        <PrivateToggle variant="right" />
      </div>
      <div id="quizzes-taken" className="w-full gap-3 flex flex-col">
        <RecentActivityTile
          title={"Greek Alphabet"}
          subtitle={"24 Questions"}
          badge={"flashcards"}
        />
        <RecentActivityTile
          title={"Legendary Memes"}
          subtitle={"42 Questions"}
          badge={"asteroids"}
        />
        <RecentActivityTile
          title={"Pokémon"}
          subtitle={"151 Questions"}
          badge={"matching"}
        />
        <RecentActivityTile
          title={"Pokémon (Updated)"}
          subtitle={"1025 Questions"}
          badge={"matching"}
        />
      </div>
    </div>
  );
}
