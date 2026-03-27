import { useParams } from "react-router-dom";

export default function ViewQuiz() {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>View Quiz Page: {id}</h1>
        </div>
    );
}