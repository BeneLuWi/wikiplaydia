import React, {useState, useEffect} from 'react';
import {GameState, Goal, Section} from "../App";
import DisplayArticle from "./displayarticle/DisplayArticle";
import axios from "axios";
import {article2sections} from "./displayarticle/Parsers";
import CurrentGoal from "./currentgoal/CurrentGoal";

type PlayProps = {
    goal: Goal | null,
    gameState: GameState,
    setGameState: (state: GameState) => void
}

const Play: React.FC<PlayProps> = ({goal, setGameState, gameState}) => {

    /***************
     * HOOKS
     ***************/

    const [article, setArticle] = useState<Section[]>([]);
    const [goalArticle, setGoalArticle] = useState<Section[]>([]);
    const [showGoal, setShowGoal] = useState(false);
    const [newGame, setNewGame] = useState(true);


    // Effect to load the goal article
    useEffect(() => {
        axios.get("https://de.wikipedia.org/api/rest_v1/page/mobile-sections/" + goal?.title.replace(" ", "_"))
            .then(res =>{
                setGoalArticle(article2sections(res.data))
            }).catch(err => console.log(err))
    }, [goal])

    // Check for win after new Article is loaded
    useEffect(() => {
        if (article.length && article[0].title === goal?.title)
            setGameState({...gameState, win: true})
    }, [article]);

    /***************
     * FUNCTIONS
     ***************/

    const loadNextArticle = (sections: Section[]) => {
        setArticle(sections);
        setGameState({...gameState, clicks: gameState.clicks + 1})
    }

    const startNewGame = () => {
        setNewGame(false);
        axios.get("https://de.wikipedia.org/api/rest_v1/page/random/mobile-sections")
            .then(res =>{
                setArticle(article2sections(res.data))
            }).catch(err => console.log(err))
    }

    /***************
     * RENDERING
     ***************/
    return (
        <div>
            {newGame &&
                <div onClick={startNewGame}>
                    Los geht's!
                </div>
            }
            <span>{gameState.clicks}</span>
            <DisplayArticle article={article} setArticle={loadNextArticle}/>
            <CurrentGoal show={showGoal} setShowGoal={setShowGoal} article={goalArticle} goal={goal}/>
        </div>
    )
};

export default Play;