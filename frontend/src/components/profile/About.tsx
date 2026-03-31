import React from "react";
import styles from "./ProfileStyles.module.css";
import profileImg from "./Whizzler69.jpg";

export default function About() {

  return (
    <div id="about-section" className={styles.about}>
      <h2 className="text-lg font-semibold mb-2">About Me</h2>
      <img src={profileImg} id="profile-img" style={{ width: '40%'}}/>
    </div>
  );
}
