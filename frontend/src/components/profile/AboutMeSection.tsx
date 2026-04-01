import React from "react";
import styles from "./ProfileStyles.module.css";
import profileImg from "./Whizzler69.jpg";

export default function About() {

  return (
    <div id="about-section" className={styles.about}>
      <div id="top-row" className="flex items-center justify-between w-full mb-4 mt-4">
        <h2 className="text-3xl font-semibold jersey-25-regular">Whizzler69's Profile</h2>
        <h4 className="text-sm text-black jersey-25-regular">Member since 1970-01-01</h4>
      </div>
      <div id="avatar-and-info-row" className="flex flex-row gap-4 w-full">
        <img src={profileImg} id="profile-img" style={{ width: '250px', height: '250px' }} />

        <div id="info-column" className="flex flex-col gap-2  w-full">
          <p className="text-xl text-black mb-2 jersey-25-regular">Favorite Subjects:
            <ul className="list-disc list pl-2 list-inside text-sm mb-8">
              <li>Computer Science</li>
              <li>History</li>
              <li>Entertainment</li>
            </ul>
          </p>
          <p className="text-xl text-black mb-2 jersey-25-regular">About Me:
            <p className="text-sm mt-2 text-black jersey-25-regular">
              In West Philadelphia, born and raised...
            </p>
          </p>
        </div>
      </div>
    </div>

  );
}
