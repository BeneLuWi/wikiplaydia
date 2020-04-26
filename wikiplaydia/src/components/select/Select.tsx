import React from 'react';
import {GameState, Goal, startGame} from "../App";

type SelectProps = {
    goal: Goal | null,
    setGoal: (goal: Goal) => void,
    gameState: GameState,
    setGameState: (state: GameState) => void
}

const goals = [
    {title: "Trier", level: 1},
    {title: "Universität Trier", level: 2},
    {title: "Erdnuss", level: 3},
]

const Select: React.FC<SelectProps> = ({goal, setGoal, setGameState, gameState}) => {

    /***************
     * HOOKS
     ***************/

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
                {goals.map(g =>
                    <li
                        onClick={() => handleClick(g)}
                        key={g.title}>
                        {g.title}
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Select;
