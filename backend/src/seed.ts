import mongoose from "mongoose";
import connectDB from "./db";
import { User } from "./models/userModel";
import { Quiz } from "./models/quizModel";
import { Activity } from "./models/activityModel";

type DemoQuiz = {
    title: string;
    subject: string;
    questions: { question: string; answer: string }[];
    icon: string;
    badge: "mastered" | "good" | "practice" | "suck";
};

const DEMO_QUIZZES: DemoQuiz[] = [
    {
        title: "Feats of the Roman Empire",
        subject: "History",
        icon: "Toilet",
        badge: "mastered",
        questions: [
            { question: "Who was the first Roman emperor?", answer: "Augustus" },
            { question: "In what year did Rome fall?", answer: "476 AD" },
            { question: "What were Roman toilets called?", answer: "Foricae" },
        ],
    },
    {
        title: "French Vocab Chapter 3",
        subject: "Languages",
        icon: "Croissant",
        badge: "good",
        questions: [
            { question: "Bonjour", answer: "Hello" },
            { question: "Merci", answer: "Thank you" },
            { question: "Fromage", answer: "Cheese" },
        ],
    },
    {
        title: "Javascript Objects and Methods",
        subject: "Computer Science",
        icon: "SquareCode",
        badge: "suck",
        questions: [
            { question: "What does Object.keys() return?", answer: "An array of a given object's own enumerable property names" },
            { question: "What is the typeof null?", answer: "'object'" },
            { question: "What does Object.values() return?", answer: "An array of a given object's own enumerable property values" },
            { question: "What does Object.entries() return?", answer: "An array of [key, value] pairs of an object's own enumerable properties" },
            { question: "How do you create a shallow copy of an object?", answer: "Object.assign({}, obj) or { ...obj }" },
            { question: "What does Object.freeze() do?", answer: "Prevents new properties from being added and existing properties from being changed or removed" },
            { question: "How do you check if an object has a given property as its own (not inherited)?", answer: "Object.hasOwn(obj, key) or obj.hasOwnProperty(key)" },
            { question: "What is the difference between == and ===?", answer: "== compares values with type coercion; === compares values and types without coercion" },
            { question: "What does Array.prototype.map() do?", answer: "Returns a new array with the results of calling a function on every element" },
            { question: "What does Array.prototype.filter() do?", answer: "Returns a new array containing only elements that pass the provided test" },
            { question: "What does Array.prototype.reduce() do?", answer: "Reduces an array to a single value by applying an accumulator function to each element" },
            { question: "What is a JavaScript closure?", answer: "A function that retains access to variables from its lexical scope even after that scope has exited" },
            { question: "What is the difference between let, const, and var?", answer: "var is function-scoped and hoisted; let and const are block-scoped; const can't be reassigned" },
            { question: "What does JSON.stringify() do?", answer: "Converts a JavaScript value to a JSON string" },
            { question: "What does JSON.parse() do?", answer: "Parses a JSON string and returns the corresponding JavaScript value" },
        ],
    },
    {
        title: "Names of Famous Cartoon Ducks",
        subject: "Entertainment",
        icon: "Origami",
        badge: "practice",
        questions: [
            { question: "Disney's most famous duck?", answer: "Donald Duck" },
            { question: "Warner Bros' duck?", answer: "Daffy Duck" },
            { question: "A wealthy, miserly old duck?", answer: "Scrooge McDuck" },
        ],
    },
];

const DEMO_ACTIVITIES = [
    { quizTitle: "Greek Alphabet", questionCount: 24, studyMethod: "flashcards" },
    { quizTitle: "Legendary Memes", questionCount: 42, studyMethod: "asteroids" },
    { quizTitle: "Pokémon", questionCount: 151, studyMethod: "matching" },
    { quizTitle: "Pokémon (Updated)", questionCount: 1025, studyMethod: "matching" },
];

async function run() {
    await connectDB();

    let user = await User.findOne();
    if (!user) {
        user = await User.create({
            username: "Whizzler69",
            profileImage: "",
            aboutMe:
                "In West Philadelphia, born and raised...",
            favoriteSubjects: ["Computer Science", "History", "Entertainment"],
            quizzes: [],
        });
        console.log("Seeded demo user");
    } else {
        console.log("User already exists, reusing");
    }

    const linked: {
        quizId: mongoose.Types.ObjectId;
        isPrivate: boolean;
        icon: string;
        badge: string;
    }[] = [];

    for (const dq of DEMO_QUIZZES) {
        let quizDoc = await Quiz.findOne({ title: dq.title });
        if (!quizDoc) {
            quizDoc = await Quiz.create({
                title: dq.title,
                subject: dq.subject,
                questions: dq.questions,
            });
            console.log(`Created demo quiz: ${dq.title}`);
        } else {
            console.log(`Demo quiz already exists: ${dq.title}`);
        }

        // Preserve existing isPrivate flag for this quiz if previously linked
        const existing = user.quizzes.find(
            (uq) =>
                uq.quizId?.toString() ===
                (quizDoc!._id as mongoose.Types.ObjectId).toString()
        );

        linked.push({
            quizId: quizDoc._id as mongoose.Types.ObjectId,
            isPrivate: existing?.isPrivate ?? false,
            icon: dq.icon,
            badge: dq.badge,
        });
    }

    // Normalize the user's linked quizzes to exactly the demo set
    user.quizzes = linked as any;
    await user.save();
    console.log(`Normalized user.quizzes to ${linked.length} demo quizzes`);

    const existingActivityCount = await Activity.countDocuments({ userId: user._id });
    if (existingActivityCount === 0) {
        await Activity.insertMany(
            DEMO_ACTIVITIES.map((a) => ({ ...a, userId: user!._id }))
        );
        console.log(`Seeded ${DEMO_ACTIVITIES.length} demo activities`);
    } else {
        console.log(`Activities already exist (${existingActivityCount}), skipping`);
    }

    await mongoose.disconnect();
    console.log("Seed complete");
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
