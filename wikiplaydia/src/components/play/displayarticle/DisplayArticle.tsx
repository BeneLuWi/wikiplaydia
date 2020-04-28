import React from 'react';
import {Section} from "../../App";
import {article2sections, createElement, parse_section} from "./Parsers";
import axios from "axios";

type DisplayArticleProps = {
    article: Section[],
    setArticle: (sections: Section[]) => void,
}

const DisplayArticle: React.FC<DisplayArticleProps> = ({article, setArticle}) => {

    /***************
     * HOOKS
     ***************/

    /***************
     * FUNCTIONS
     ***************/
    const loadNew = (link: string|undefined) => {
        axios.get("https://de.wikipedia.org/api/rest_v1/page/mobile-sections/" + link, {
            onDownloadProgress: p => console.log(p.loaded / 100000)
        })
            .then(res =>{
                setArticle(article2sections(res.data))
            }).catch(err => console.log(err))
    }
    /***************
     * RENDERING
     ***************/

    if (!article.length) return null;

    return (
        <div>
            <div>
                <h1>{article[0].title}</h1>
                {article[0].content.map(node =>
                    <span>
                            {createElement(node, loadNew)}
                        </span>
                )}
            </div>
            {article.slice(1).map(section =>
                <div>
                    <h3>{section.title}</h3>
                    {section.content.map(node =>
                        <span>
                            {createElement(node, loadNew)}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
};

export default DisplayArticle;
