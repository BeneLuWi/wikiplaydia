import React from "react";
import {Section} from "../../App";

const html2json = require('html2json').html2json;

export type HtmlNode = {
    node: "element" | "text",
    tag: "p" | "a" | "text" | "figure" | "ul" | "li" |
        "table" | "td" | "tr" | "tbody" | "th" |
        "h1" | "h2" | "h3" | "h4" | "style",
    text: string,
    child: HtmlNode[],
    link?: string,
    attr?: {href: string}
}

export const article2sections = (article: any) : Section[] => {
    return [
        {
            title: article.lead.normalizedtitle,
            content: parse_section(article.lead.sections[0].text)
        },
        ...article.remaining.sections
            .map((section: any) => ({
                title: section.line,
                content: parse_section(section.text)
            }))
            .filter((section: Section) => section.content.length)
    ]
}

export const parse_section = (art : string) => {
    let html = document.createElement("div");
    html.innerHTML = art;
    return html2json(html.innerHTML)
        .child
        .flat()
        .filter((elem : any) => elem.text ? !elem.text.includes("\n") : true)
        .map((part:HtmlNode) => parse_node(part))
        .flat();
}

export const parse_node = (node: HtmlNode): HtmlNode[] => {
    if (!node) return [];
    if (node.child) node.child = node.child.filter((elem : any) => elem.text ? !elem.text.includes("\n") : true);
    if (node.node === "text") return [{...node, tag: "text"}];

    switch (node.tag) {
        case "a":
            if (!node.attr?.href.startsWith("/wiki") ||
                node.attr?.href.startsWith("/wiki/Datei") ||
                node.attr?.href.startsWith("/wiki/Special:")
            ) return [{...node, tag: "text", node: "text"}];
            if (!node.child[0].text) return [];
            return [{
                tag: "a",
                node: "element",
                text: node.child[0].text,
                child: [],
                link: node.attr?.href.substr(6)
            }]
        case "figure":
            return [];

        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "ul":
        case "li":
        case "td":
        case "tr":
        case "th":
            return [{
                ...node,
                child: node.child ? node.child.map(ch => parse_node(ch)).flat() : []
            }];
        case "table":
            return [{
                ...node,
                child: parse_node(node.child[0])
            }];
        //Special case error handling
        case "style":
            return [];
        default:
            return node.child ? node.child.map(ch => parse_node(ch)).flat() : [];
    }
}

export const createElement = (node: HtmlNode, onClick: (link: string | undefined) => void) => {
    switch (node.tag) {
        case "a":
            if (!node.link) return <span dangerouslySetInnerHTML={{__html: node.text}}/>
            return (
                <button
                    className="w3-btn-small w3-green w3-round w3-small"
                    onClick={() => onClick(node.link)}>
                    <span dangerouslySetInnerHTML={{__html: node.text}}/>
                </button>
            )
        case "text":
            return <span dangerouslySetInnerHTML={{__html: node.text}}/>
        case "ul":
            return (
                <ul className="">
                    {node.child.filter(c => c.child.length).map(child => createElement(child, onClick))}
                </ul>
            )
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "li":
        case "td":
        case "tr":
        case "th":
        case "tbody":
            return (
                <node.tag>
                    {node.child.map(child => createElement(child, onClick))}
                </node.tag>
            )
        case "table":
            return (
                <table className="w3-table-all">
                    {node.child.map(child => createElement(child, onClick))}
                </table>
            )
    }
};