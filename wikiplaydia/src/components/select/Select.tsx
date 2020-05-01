import React, {useEffect, useState} from 'react';
import {GameState, Goal, startGame} from "../App";
import cl from "classnames";

type SelectProps = {
    goal: Goal | null,
    setGoal: (goal: Goal) => void,
    gameState: GameState,
    setGameState: (state: GameState) => void
}

export type Score = {
    title: string,
    level: number,
    score: number
}

const goals = [
    {title: "Trier", level: 1, score: 0},
    {title: "Universität Trier", level: 2, score: 0},
    {title: "Erdnuss", level: 3, score: 0},
];

const getScore = (goal: Goal, score: Goal[]) => {
    return score.find(g => g.title === goal.title);
}

const Select: React.FC<SelectProps> = ({goal, setGoal, setGameState, gameState}) => {

    /***************
     * HOOKS
     ***************/

    const [score, setScore] = useState<Score[]>([]);

    // Reload score from local storage and create a data set, if not yet created
    useEffect(() => {
        const scoreString = localStorage.getItem("score");
        if (!scoreString){
            localStorage.setItem("score", JSON.stringify(goals));
            setScore(goals);
        } else
            setScore(JSON.parse(localStorage.getItem("score") as string));
    },[gameState.playing]);

    /***************
     * FUNCTIONS
     ***************/

    const handleClick = (g: Goal) => {
        setGoal(g);
        setGameState(startGame);
    };

    /***************
     * RENDERING
     ***************/
    return (
        <div>
            <h2>Levelauswahl</h2>
            {score.map(g =>
                <p key={g.title}>
                    <div
                        className=" w3-btn w3-round w3-border w3-border-green"
                        onClick={() => handleClick(g)}>
                        <span className={cl("w3-badge", {"w3-green": g.score})}>{g.level}</span>&nbsp;
                        {g.title} {g.score ? `----geschafft: ${g.score} Klicks`: ""}
                    </div>
                </p>
            )}
        </div>
    )
};

export default Select;
