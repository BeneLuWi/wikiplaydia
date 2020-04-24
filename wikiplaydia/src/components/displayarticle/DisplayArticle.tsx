import React from 'react';
import {Section} from "../App";
import {createElement, HtmlNode, parse_section} from "./Parsers";
import axios from "axios";

type DisplayArticleProps = {
    article: Section[],
    set_article: (sections: Section[]) => void,
}

const DisplayArticle: React.FC<DisplayArticleProps> = ({article, set_article}) => {

    /***************
     * HOOKS
     ***************/

    /***************
     * FUNCTIONS
     ***************/

    const load_new = (link: string|undefined) => {

        axios.get("https://de.wikipedia.org/api/rest_v1/page/mobile-sections/" + link)
            .then(res =>{
                set_article(
                    res.data.remaining.sections
                        .slice(0,4)
                        .map((section: any) => ({
                            title: section.line,
                            content: parse_section(section.text)
                        }))
                )
            })


    }

    /***************
     * RENDERING
     ***************/
    return (
        <div>
            {article.map(section =>
                <div>
                    <h3>{section.title}</h3>
                    {section.content.map(node =>
                        <span>
                            {createElement(node, load_new)}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
};

export default DisplayArticle;
