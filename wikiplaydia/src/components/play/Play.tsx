import React, {useState, useEffect} from 'react';
import {beforeGame, GameState, Goal, Section} from "../App";
import DisplayArticle from "./displayarticle/DisplayArticle";
import axios from "axios";
import {article2sections} from "./displayarticle/Parsers";
import CurrentGoal from "./currentgoal/CurrentGoal";
import ButtonBar from "./buttonbar/ButtonBar";

type PlayProps = {
    goal: Goal | null,
    gameState: GameState,
    setGameState: (state: GameState) => void,
    setProgress: (progress: number) => void
}

const Play: React.FC<PlayProps> = ({goal, setGameState, gameState,setProgress}) => {

    /***************
     * HOOKS
     ***************/

    const [article, setArticle] = useState<Section[]>([]);
    const [goalArticle, setGoalArticle] = useState<Section[]>([]);
    const [showGoal, setShowGoal] = useState(false);
    const [newGame, setNewGame] = useState(true);

    useEffect(() => {
        setProgress(1);
    }, [goalArticle])

    // Effect to load the goal article
    useEffect(() => {
        setProgress(0);
        axios.get("https://de.wikipedia.org/api/rest_v1/page/mobile-sections/" + goal?.title.replace(" ", "_"), {
            onDownloadProgress: p => setProgress(p.loaded / 100000)
        })
            .then(res =>{
                setGoalArticle(article2sections(res.data))
            }).catch(err => console.log(err))
        setShowGoal(true);
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
        setGameState({...gameState, clicks: gameState.clicks + 1})
        setArticle(sections);
    }

    const startNewGame = () => {
        setProgress(0);

        setNewGame(false);
        setGameState({...gameState, clicks: 0, win: false});
        setShowGoal(false);
        axios.get("https://de.wikipedia.org/api/rest_v1/page/random/mobile-sections", {
            onDownloadProgress: p => setProgress(p.loaded / 100000)
        })
            .then(res =>{
                setArticle(article2sections(res.data))
            }).catch(err => console.log(err))
    }

    /***************
     * RENDERING
     ***************/
    return (
        <div>
            <ButtonBar
                gameState={gameState}
                newGame={newGame}
                setGameState={setGameState}
                startNewGame={startNewGame}
                showGoal={showGoal} setShowGoal={setShowGoal}
                goal={goal}
            />
            <div className="w3-container">
            <DisplayArticle article={article} setArticle={loadNextArticle} setProgress={setProgress}/>
            <CurrentGoal show={showGoal} setShowGoal={setShowGoal} article={goalArticle} goal={goal}/>
            </div>
        </div>
    )
};

export default Play;
