import React, {useState} from 'react';
import './App.css';
import LoadArticle from "./loadarticle/LoadArticle";
import DisplayArticle from "./displayarticle/DisplayArticle";
import {HtmlNode} from "./displayarticle/Parsers";

export type Section = {
    title: string,
    content: HtmlNode[]
}

const App = () => {

    const [article, set_article] = useState<Section[]>([]);

    const [page, set_page] = useState(null);




    return(
        <div>
            <LoadArticle set_article={set_article}/>
            <DisplayArticle article={article} set_article={set_article}/>
        </div>
    )

}

export default App;
