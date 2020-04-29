import React, { useState} from 'react';
import {Section} from "../../../components/App";
import {createElement} from "../../../components/play/displayarticle/Parsers";
import "./SectionAccordion.css"
import {useSpring} from "react-spring";


type SectionProps = {
    section: Section,
    loadNew: (link: string|undefined) => void
}

const defaultHeight = 0;

const SectionAccordion: React.FC<SectionProps> = ({section,loadNew}) => {

    /***************
     * HOOKS
     ***************/

    const [expand, setExpand] = useState<boolean>(false);

    /***************
     * FUNCTIONS
     ***************/

    /***************
     * RENDERING
     ***************/
    return (
        <div className="section">
            <div
                className="w3-button section-header w3-border w3-margin-top"
                onClick={() => setExpand(!expand)}>
                {section.title}
            </div>
            {expand &&
                <div>
                    {section.content.map(node =>
                        <span>
                            {createElement(node, loadNew)}
                        </span>
                    )}
                </div>
            }
        </div>
    )
};

export default SectionAccordion;
