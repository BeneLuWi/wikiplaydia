import React from 'react';
import {beforeGame, GameState} from "../../App";

type ButtonBarProps = {
    startNewGame: () => void,
    setGameState: (state: GameState) => void,
    gameState: GameState,
    newGame: boolean
}

const ButtonBar: React.FC<ButtonBarProps> = ({startNewGame, setGameState, gameState, newGame}) => {

    /***************
     * HOOKS
     ***************/

    /***************
     * FUNCTIONS
     ***************/

    /***************
     * RENDERING
     ***************/
    return (
        <div className="w3-bar">
            {newGame ?
                <button
                    className="w3-bar-item w3-button"
                    onClick={startNewGame}>
                    Los geht's!
                </button>:
                <button
                    onClick={startNewGame}
                    className="w3-bar-item">
                        Neustarten
                </button>
            }
            <button
                className="w3-bar-item"
                onClick={() => setGameState(beforeGame)}>
                zur Übersicht
            </button>
            <span
                className="w3-bar-item">
                {gameState.clicks}
            </span>
        </div>
    )
};

export default ButtonBar;
