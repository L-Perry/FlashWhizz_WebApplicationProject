import About from "@/components/profile/About";
import MyQuizzes from "@/components/profile/MyQuizzes";
import Recent from "@/components/profile/Recent";
import styles from "../components/profile/ProfileStyles.module.css";

export default function Profile() {
    return (
        <div
            id="profile-page"
            className="p-4 flex justify-center columns-2"
            style={{ gap: '50px', maxWidth: 1050, width: '100%', margin: '0 auto' }}
        >
            <div id="left-column" className="p-4 space-y-10 columns-1">
                <About />
                <MyQuizzes />
            </div>
            <div id="right-column" className="p-4" style={{ width: 640 }}>
                <Recent />
            </div>
        </div>
    );
}
