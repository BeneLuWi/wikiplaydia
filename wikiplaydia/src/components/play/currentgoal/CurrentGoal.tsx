import React from 'react';
import {Goal, Section} from "../../App";
import {createElement} from "../displayarticle/Parsers";
import SectionAccordion from "../../../assets/components/section/SectionAccordion";

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

    if (!goal ||!article.length) return null;

    if (!show) return null;

    return (
        <div className="w3-modal">
            <div className="w3-modal-content w3-container w3-round w3-animate-opacity">
                <div
                    onClick={() => setShowGoal(false)}
                    className="w3-red w3-button w3-round w3-card"
                    style={{position: "fixed", top: 20, right: 20}}>
                    Schließen <i className="fas fa-window-close"/>
                </div>
                <div>
                    <h1>
                        {article[0].title}
                    </h1>
                    {article[0].content.map(node =>
                        <span>
                            {createElement(node, () => {}, true)}
                        </span>
                    )}
                    </div>
                    {article.slice(1).map(section =>
                        <SectionAccordion loadNew={() => {}} section={section} disabled={true}/>
                    )}
                </div>
        </div>
    )
};

export default CurrentGoal;
