import React, {useEffect, useState} from 'react';
import {GameState, Goal, startGame} from "../App";
import cl from "classnames";
import {Trail} from "react-spring/renderprops-universal";

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
    {title: "Auderath", level: 3, score: 0},
    {title: "Bon Jovi", level: 3, score: 0},
    {title: "Frank Sinatra", level: 3, score: 0},
    {title: "Poker", level: 3, score: 0},
    {title: "Dirty Dancing", level: 3, score: 0},
    {title: "Gordon Ramsay", level: 3, score: 0},
    {title: "Star Trek", level: 3, score: 0},
];


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
        } else {
            let newScore = JSON.parse(localStorage.getItem("score") as string);
            if (newScore.length < goals.length) {
                newScore= goals.map(g => {
                    const s = newScore.find((sc: Goal) => sc.title === g.title)
                    return ({
                        ...g,
                        score: s ? s.score : 0,
                    })
                })
            }

            setScore(newScore);
        }
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
            <div className="w3-bar wikiplaydia-green w3-padding"> <span className="w3-right">Wikiplaydia</span></div>
            <div className="w3-container w3-animate-opacity">
                <h2>Levelauswahl</h2>
                {score.map(item =>
                    <div
                        key={item.title}
                        className=" w3-btn w3-round w3-border w3-border-green w3-margin"
                        onClick={() => handleClick(item)}>
                        {item.title} {item.score ? <span> <i className="far fa-check-circle w3-text-green"/> {item.score} Klicks </span>: ""}
                    </div>
                )}
            </div>
            <div className="w3-container w3-animate-opacity">
                <h2>Wie funktionierts?</h2>
                <ul className="w3-ul">
                    <li><i className="fa fa-list"/> Level/Artikel auswählen</li>
                    <li><i className="fa fa-glasses"/> Kurz überfliegen und wichtige Punkte merken</li>
                    <li><i className="fa fa-rocket"/> Starten</li>
                    <li><i className="far fa-check-circle"/> Den Zielartikel über die Verlinkungen in den neuen Artikeln finden</li>
                </ul>
            </div>
        </div>
    )
};

export default Select;
