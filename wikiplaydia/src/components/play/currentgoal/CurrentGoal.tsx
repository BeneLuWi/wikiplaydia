import React from 'react';
import {Goal, Section} from "../../App";
import {createElement} from "../displayarticle/Parsers";

type CurrentGoalProps = {
    show: boolean,
    setShowGoal: (show: boolean) => void,
    article: Section[],
    goal: Goal | null,
}

const CurrentGoal: React.FC<CurrentGoalProps> = ({show, setShowGoal, article, goal}) => {

    /***************
     * HOOKS
     ***************/

    /***************
     * FUNCTIONS
     ***************/

    /***************
     * RENDERING
     ***************/

    if (!goal) return null;

    if (!show) return (
        <div onClick={() => setShowGoal(true)}>
            {goal?.title}
        </div>
    )

    return (
        <div>
            <div>
                <h1 onClick={() => setShowGoal(false)}>
                    {article[0].title}
                </h1>
                {article[0].content.map(node =>
                    <span>
                            {createElement(node, () => {})}
                        </span>
                )}
            </div>
            {article.slice(1).map(section =>
                <div>
                    <h3>{section.title}</h3>
                    {section.content.map(node =>
                        <span>
                            {createElement(node, () => {})}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
};

export default CurrentGoal;
