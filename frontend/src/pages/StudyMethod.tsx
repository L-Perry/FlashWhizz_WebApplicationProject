import React from 'react'
import "./StudyMethod.css"
import { useParams, Link } from 'react-router-dom';


function GameOption({ name, position, link }: { name: string, position: string, link: string }) {
    return (
        <Link to={link || "#"} className={`OptionBtn ${position} ${!link ? "disabled" : ""}`}>{name}</Link>
    )
}

export default function StudyMethod(): React.ReactElement {
    const { id } = useParams()

    return (
        <div className="jersey-25-regular">
            <div className="StudyMethodTitle">
                <button>←</button>
                <h1>Quiz Name</h1>
            </div>
            <div className="OptionsContainer">
                <GameOption link="" name="Matching" position="" />
                <GameOption link="" name="Flashcards" position="top-10 left-150" />
                <GameOption link={`/multichoice/${id}`} name="Quiz" position="top-90 left-60" />
                <GameOption link="" name="Asteroids" position="top-190 left-25" />
                <GameOption link="" name="Crossword" position="top-150 left-150" />
            </div>

        </div>
    );
}

