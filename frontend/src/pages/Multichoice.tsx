import React, { useState } from 'react'
import { Link } from "react-router-dom";


export default function Multichoice(): React.ReactElement {
    function Choices({ wrongAnswers, rightAnswer }: { wrongAnswers: string[], rightAnswer: string }) {
        const choices = [...wrongAnswers, rightAnswer].sort(() => Math.random() - 0.5);

        return (
            <div className="grid grid-cols-2 grid-rows-2 gap-6">
                {choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(choice, rightAnswer)}
                        className="jersey-25-regular text-3xl bg-[#7E52A0]/50 rounded-[10px] border-2 border-black shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#7E52A0]/75"
                    >
                        {choice}
                    </button>
                ))}
            </div>
        )
    }

    const [points, setPoints] = useState(0);
    const [answer, setAnswer] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false);
    const [showFinish, setShowFinish] = useState(true);
    function handleAnswer(selected: string, correct: string) {
        if (selected === correct) {
            console.log("Correct!");
            setPoints(points + 1);
            setAnswer(true);
        } else {
            console.log("Wrong!");
            if (points > 0) {
                setPoints(points + 1);
                setAnswer(false);
            }
        }
        setShowAnswer(true);
    }

    return (
        <div className="flex flex-col justify-center items-center m-10">
            <div className="flex justify-between items-end max-w-3xl w-full">
                <h1 className="jersey-25-regular text-5xl">Quiz Title</h1>
                <h2 className="jersey-25-regular text-4xl">Points: {points}</h2>
            </div>

            <div className="grid grid-rows-[2fr_3fr] gap-6 max-w-3xl w-full bg-[#ECFEE8] min-h-[60vh] max-h-[80vh] overflow-y-auto box-border p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <div className="flex justify-center items-center bg-[#7E52A0]/50 rounded-[10px] border-2 border-black shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <h2 className="jersey-25-regular text-4xl">What color is the sky?</h2>
                </div>
                <Choices
                    rightAnswer={'Blue'}
                    wrongAnswers={['Green', 'Orange', 'Pink']}
                />
            </div>
            {showAnswer && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="jersey-25-regular text-2xl bg-white rounded-lg p-6 shadow-xl w-full max-w-md relative">
                        <button className="text-3xl absolute top-2 right-3" onClick={() => setShowAnswer(false)}>X</button>
                        <h3>You got it {answer ? "right" : "wrong"}!</h3>
                        <h3>{answer ? "Plus" : "Minus"} one point</h3>
                    </div>
                </div>
            )}
            {showFinish && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="jersey-25-regular text-3xl bg-white rounded-lg p-6 shadow-xl w-full max-w-md relative">
                        <h3>You've finished the quiz with a score of {points}</h3>
                        <div className="flex justify-around mt-3">
                            <Link to="/multichoice/1" className="jersey-25-regular bg-[#7E52A0]/50 rounded-[10px] border-2 border-black box-border p-3 hover:bg-[#7E52A0]/75">Play Again?</Link>
                            <Link to="/" className="jersey-25-regular bg-[#7E52A0]/50 rounded-[10px] border-2 border-black box-border p-3 hover:bg-[#7E52A0]/75">Go Home</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
}

