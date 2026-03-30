import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router";

export function Navbar() {
    return (
        <div className="flex w-full justify-center bg-[#E0B0D5]">
            <NavigationMenu className="flex-row gap-4 justify-center">
                <NavigationMenuLink>
                    <Link to="/profile">Profile</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                    <Link to="/create-quiz">Create Quiz</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                    <Link to="/study-method">Study Method</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                    <Link to="/quiz/temp">View Quiz</Link>
                </NavigationMenuLink>
            </NavigationMenu>
        </div>
    );
}