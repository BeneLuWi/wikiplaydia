import React, {useState} from 'react';
import './App.css';
import DisplayArticle from "./play/displayarticle/DisplayArticle";
import {HtmlNode} from "./play/displayarticle/Parsers";

export type Section = {
    title: string,
    content: HtmlNode[]
}

const App = () => {

    const [article, setArticle] = useState<Section[]>([]);

    const [page, set_page] = useState(null);

    return(
        <div>
            <DisplayArticle article={article} setArticle={setArticle}/>
        </div>
    )

}

export default App;
