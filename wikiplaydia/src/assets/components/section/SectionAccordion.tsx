import React, {useEffect, useState} from 'react';
import {Section} from "../../../components/App";
import {createElement} from "../../../components/play/displayarticle/Parsers";
import "./SectionAccordion.css"
import {useSpring} from "react-spring";


type SectionProps = {
    section: Section,
    loadNew: (link: string|undefined) => void,
    disabled?: boolean,
}


const SectionAccordion: React.FC<SectionProps> = ({section,loadNew, disabled= false}) => {

    /***************
     * HOOKS
     ***************/

    const [expand, setExpand] = useState<boolean>(false);

    useEffect(() => {setExpand(false)}, [section]);

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
                <span dangerouslySetInnerHTML={{__html: section.title}}/>
            </div>
            {expand &&
                <div>
                    {section.content.map(node =>
                        <span>
                            {createElement(node, loadNew, disabled)}
                        </span>
                    )}
                </div>
            }
        </div>
    )
};

export default SectionAccordion;
