import React, {useEffect, useState} from 'react';
import './App.css';
import DisplayArticle from "./play/displayarticle/DisplayArticle";
import {HtmlNode} from "./play/displayarticle/Parsers";
import Play from "./play/Play";
import Select from "./select/Select";
import Win from "./win/Win";
import ProgressBar from "../assets/components/progressbar/ProgressBar";
import smoothscroll from "smoothscroll-polyfill";

export type Section = {
    title: string,
    content: HtmlNode[]
}

export type Goal = {
    title: string,
    level: number
}

export type GameState = {
    playing: boolean,
    clicks: number,
    win: boolean
}

export const startGame =  {playing: true, clicks: 0, win: false}
export const beforeGame =  {playing: false, clicks: 0, win: false}

const App = () => {

    const [goal, setGoal] = useState<Goal | null>(null);
    const [gameState, setGameState] = useState<GameState>({playing: false, clicks: 0, win: false})
    const [progress, setProgress] = useState(1);


    return(
        <div>
            <ProgressBar progress={progress}/>
            {gameState.win &&
                <Win
                    goal={goal} gameState={gameState}
                    setGameState={setGameState}
                />
            }
            <div className="w3-card w3-round w3-container wrapper">
                {gameState.playing ?
                    <Play
                        goal={goal} gameState={gameState}
                        setGameState={setGameState}
                        setProgress={setProgress}
                    /> :
                    <Select
                        goal={goal} setGoal={setGoal}
                        gameState={gameState} setGameState={setGameState}
                    />
                }
            </div>
        </div>
    )

}

export default App;
