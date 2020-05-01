import React, {useEffect, useState} from 'react';
import {beforeGame, GameState, Goal} from "../App";

type WinProps = {
    goal: Goal | null,
    gameState: GameState,
    setGameState: (state: GameState) => void
}

const Win: React.FC<WinProps> = ({goal, setGameState, gameState}) => {

    /***************
     * HOOKS
     ***************/

    const [score, setScore] = useState<Goal[]>([]);

    // Reload score from local storage and create a data set, if not yet created
    useEffect(() => {
        setScore(JSON.parse(localStorage.getItem("score") as string));
    },[gameState.playing]);

    /***************
     * FUNCTIONS
     ***************/

    const handleClick = () => {
        const score = JSON.parse(localStorage.getItem("score") as string);
        localStorage.setItem("score", JSON.stringify(
            score.map((g: Goal) => g.title === goal?.title ?
                ({...g, score: gameState.clicks}): g)
        ));
        setGameState(beforeGame);
    }

    /***************
     * RENDERING
     ***************/
    return (
        <div className="w3-modal">
            <div className="w3-modal-content w3-round w3-padding w3-animate-top">
                <h1>Gewonnen!</h1>
                <ul>
                    <li>{goal?.title} gefunden!</li>
                    <li>{gameState.clicks} Klicks wurden benötigt</li>
                </ul>
                <div onClick={handleClick} className="w3-button wikiplaydia-green">
                    Speichern und zur Übersicht
                </div>
            </div>
        </div>
    )
};

export default Win;
