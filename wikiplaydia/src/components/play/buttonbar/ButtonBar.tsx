import React, {useState} from 'react';
import {beforeGame, GameState, Goal} from "../../App";
import "./ButtonBar.css";
import {useTransition, animated} from "react-spring";
import logo from "../../../assets/img/logo-noback-256.png";

type ButtonBarProps = {
    startNewGame: () => void,
    setGameState: (state: GameState) => void,
    goal: Goal | null,
    gameState: GameState,
    newGame: boolean,
    showGoal: boolean,
    setShowGoal: (show: boolean) => void,
}

export const shareApp = () => {
    // @ts-ignore
    if (navigator.share) {
        // @ts-ignore
        navigator.share({
            title: 'Wikiplaydia',
            text: "Guck dir mal dieses Spiel an.",
            url: 'https://beneluwi.github.io/wikiplaydia/',
        })
            .then(() => console.log('Successful share'))
            .catch((error: any) => console.log('Error sharing', error));
    } else {
        navigator.clipboard.writeText("https://beneluwi.github.io/wikiplaydia/");
    }
};

const ButtonBar: React.FC<ButtonBarProps> = ({startNewGame, setGameState, gameState, newGame, showGoal, setShowGoal, goal}) => {

    /***************
     * HOOKS
     ***************/

    const [showBar, setShowBar] = useState<boolean>(false);

    const transitions = useTransition(showBar, null, {
        from: { height: 0, width: 200},
        enter: { height: 200},
        leave: { height: 0 },
    });


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
                    <i className="fa fa-ellipsis-h"/>
                </button>
                <span
                    onClick={shareApp}
                    className="w3-bar-item w3-right">
                    Wikiplaydia
                </span>
                <button
                    className="w3-bar-item w3-button"
                    onClick={() => setShowGoal(!showGoal)}>
                    <i className="fa fa-info-circle"/> {goal?.title}
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
                    <animated.div className="wikiplaydia-green sidebar" style={props}>
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
                        <button
                            className="w3-bar-item w3-button"
                            onClick={shareApp}>
                            <i className="fa fa-share"/>&nbsp;App teilen
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
