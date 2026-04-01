import React from "react";
import styles from "./ProfileStyles.module.css";
import MyQuizTile from "./MyQuizTile";
import { Toilet, Croissant, SquareCode, Origami } from "lucide-react";
import PrivateToggle from "./PrivateToggle";

export default function MyQuizzes() {

  return (
    <div id="myquizzes-section" className={styles.myQuizzes}>
      <div id="top-row" className="flex justify-space-between items-center w-full">
        <h2 className="text-2xl jersey-25-regular font-semibold mb-0 w-full">My Quizzes</h2>
        <PrivateToggle variant="left" />
      </div>
      <div id="quizzes-created" className="flex flex-col gap-3 w-full">
        <MyQuizTile icon={<Toilet />} title={"Feats of the Roman Empire"} subtitle={"22 Questions"} badge={"mastered"} />
        <MyQuizTile icon={<Croissant />} title={"French Vocab Chapter 3"} subtitle={"30 Questions"} badge={"good"} />
        <MyQuizTile icon={<SquareCode />} title={"Javascript Objects and Methods"} subtitle={"4185 Questions"} badge={"suck"} />
        <MyQuizTile icon={<Origami />} title={"Names of Famous Cartoon Ducks"} subtitle={"3 Questions"} badge={"practice"} />
      </div>
    </div>
  );
}
