import React, {useState} from 'react';
import {beforeGame, GameState, Goal} from "../../App";
import "./ButtonBar.css";
import {useTransition, animated} from "react-spring";


type ButtonBarProps = {
    startNewGame: () => void,
    setGameState: (state: GameState) => void,
    goal: Goal | null,
    gameState: GameState,
    newGame: boolean,
    showGoal: boolean,
    setShowGoal: (show: boolean) => void,
}

const ButtonBar: React.FC<ButtonBarProps> = ({startNewGame, setGameState, gameState, newGame, showGoal, setShowGoal, goal}) => {

    /***************
     * HOOKS
     ***************/

    const [showBar, setShowBar] = useState<boolean>(false);

    const transitions = useTransition(showBar, null, {
        from: { height: 0},
        enter: { height: 200},
        leave: { height: 0 },
    })

    /***************
     * FUNCTIONS
     ***************/

    /***************
     * RENDERING
     ***************/
    return (
        <div>
            <div className="w3-bar wikiplaydia-green">
                <button
                    className="w3-button w3-bar-item"
                    onClick={() => setShowBar(!showBar)}>
                    <i className="fa fa-bars"/>
                </button>
                <span className="w3-bar-item w3-right">
                    WikiPlaydia
                </span>
                <button
                    className="w3-bar-item w3-button"
                    onClick={() => setShowGoal(!showGoal)}>
                    Aktuelles Ziel: {goal?.title}
                </button>
                {!newGame &&
                    <span
                        className="w3-bar-item">
                            Klicks: {gameState.clicks}
                    </span>
                }
            </div>

            {transitions.map(({ item, key, props }) =>
                item &&
                    <animated.div className="wikiplaydia-green w3-sidebar" style={props}>
                        {!newGame &&
                        <button
                            onClick={() => {startNewGame(); setShowBar(!showBar);}}
                            className="w3-bar-item w3-button">
                            <i className="fa fa-redo"/>&nbsp;Neustarten
                        </button>
                        }
                        <button
                            className="w3-bar-item w3-button"
                            onClick={() => {setGameState(beforeGame); setShowBar(!showBar);}}>
                            <i className="fa fa-window-close"/>&nbsp;Zur Übersicht
                        </button>
                    </animated.div>
            )}

            {newGame &&
            <button
                className="letsgo-button w3-button w3-xlarge w3-round w3-card-4 w3-blue"
                onClick={startNewGame}>
                Starten! <i className="fa fa-arrow-circle-right"/>
            </button>}
        </div>
    )
};

export default ButtonBar;
