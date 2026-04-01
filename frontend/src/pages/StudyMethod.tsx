import React from 'react'
import "./StudyMethod.css"


function GameOption({ name, position }: { name: string, position: string }) {
    return (
        <button className={`OptionBtn ${position}`}>{name}</button>
    )
}

export default function StudyMethod(): React.ReactElement {
    return (
        <div className="jersey-25-regular">
            <div className="StudyMethodTitle">
                <button>←</button>
                <h1>Quiz Name</h1>
            </div>
            <div className="OptionsContainer">
                <GameOption name="Matching" position="" />
                <GameOption name="Flashcards" position="top-10 left-150" />
                <GameOption name="Quiz" position="top-90 left-60" />
                <GameOption name="Asteroids" position="top-190 left-25" />
                <GameOption name="Crossword" position="top-150 left-150" />
            </div>

        </div>
    );
}

