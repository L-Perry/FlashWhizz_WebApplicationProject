import About from "@/components/profile/AboutMeSection";
import MyQuizzes from "@/components/profile/MyQuizzesSection";
import RecentActivityContainer from "@/components/profile/RecentActivitySection";
import styles from "../components/profile/ProfileStyles.module.css";

export default function Profile() {
    return (
        <div
            id="profile-page"
            className="p-4 flex justify-center columns-2 gap-2"
        >
            <div id="left-column" className="p-4 space-y-10 columns-1">
                <About />
                <MyQuizzes />
            </div>
            <div id="right-column" className="p-4">
                <RecentActivityContainer />
            </div>
        </div>
    );
}
