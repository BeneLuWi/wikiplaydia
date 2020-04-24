import React, {useState} from "react";
import {exampleTable} from "./example";
import {parse_section} from "../displayarticle/Parsers";

const html2json = require('html2json').html2json;
const json2html = require('html2json').json2html;

type LoadArticleProps = {
    set_article: any
}



const LoadArticle: React.FC<LoadArticleProps> = ({set_article}) => {

    /***************
     * HOOKS
     ***************/

    /***************
     * FUNCTIONS
     ***************/

    const load_new = () => {
        set_article(
            exampleTable.remaining.sections
                .slice(0, 4)
                .map((section: any) => ({
                    title: section.line,
                    content: parse_section(section.text)
                }))
        );

    }

    /***************
     * RENDERING
     ***************/
    return (
        <div>
            <button
                onClick={load_new}
            >
                Artikel laden
            </button>
        </div>
    )
};

export default LoadArticle;
