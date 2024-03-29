import React, {useEffect} from 'react';
import {Section} from "../../App";
import {article2sections, createElement, parse_section} from "./Parsers";
import axios from "axios";
import SectionAccordion from "../../../assets/components/section/SectionAccordion";
import logo from "../../../assets/img/logo-noback-256.png";
import "./DisplayArticle.css";
type DisplayArticleProps = {
    article: Section[],
    setArticle: (sections: Section[]) => void,
    setProgress: (progress: number) => void
}

const DisplayArticle: React.FC<DisplayArticleProps> = ({article, setArticle, setProgress}) => {

    /***************
     * HOOKS
     ***************/

    useEffect(() => {
        setProgress(1);
        window.scrollTo({
            top: 0,
            left: 0,
        });
    }, [article]);

    /***************
     * FUNCTIONS
     ***************/
    const loadNew = (link: string|undefined) => {
        setProgress(0);
        window.scrollTo({
            top: 0,
            left: 0,
        });
        axios.get("https://de.wikipedia.org/api/rest_v1/page/mobile-sections/" + link, {
            onDownloadProgress: p => setProgress(p.loaded / 100000)
        })
            .then(res =>{
                setArticle(article2sections(res.data));
            }).catch(err => console.log(err))
    };
    /***************
     * RENDERING
     ***************/

    if (!article.length) return (
        <div className="load-logo-container">
            <img className="w3-image w3-opacity" width={150} height={150} src={logo} alt="Wikiplaydia Logo"/>
        </div>
    );

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
                <SectionAccordion loadNew={loadNew} section={section}/>
            )}
        </div>
    )
};

export default DisplayArticle;
