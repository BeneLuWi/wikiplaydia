import React, {useState} from 'react';
import './App.css';
import DisplayArticle from "./play/displayarticle/DisplayArticle";
import {HtmlNode} from "./play/displayarticle/Parsers";
import Play from "./play/Play";
import Select from "./select/Select";
import Win from "./win/Win";

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

    return(
        <div>
            {gameState.win &&
                <Win
                    goal={goal} gameState={gameState}
                    setGameState={setGameState}
                />
            }
            {gameState.playing ?
                <Play
                    goal={goal} gameState={gameState}
                    setGameState={setGameState}
                /> :
                <Select
                    goal={goal} setGoal={setGoal}
                    gameState={gameState} setGameState={setGameState}
                />
            }

        </div>
    )

}

export default App;
