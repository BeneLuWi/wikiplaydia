import React, {useEffect, useState} from 'react';
import {GameState, Goal, startGame} from "../App";

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
]

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
        if (!scoreString)
            localStorage.setItem("score", JSON.stringify(goals));
        else
            setScore(JSON.parse(localStorage.getItem("score") as string));
    },[gameState.playing]);

    /***************
     * FUNCTIONS
     ***************/

    const handleClick = (g: Goal) => {
        setGoal(g);
        setGameState(startGame);
    }

    /***************
     * RENDERING
     ***************/
    return (
        <div>
            <ul>
                {score.map(g =>
                    <li
                        onClick={() => handleClick(g)}
                        key={g.title}>
                        {g.title} {g.score ? `----geschafft: ${g.score} Klicks`: ""}
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Select;
