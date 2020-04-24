import React from "react";

const html2json = require('html2json').html2json;

export type HtmlNode = {
    node: "element" | "text",
    tag: "p" | "a" | "text" | "figure" | "ul" | "li" | "table" | "td" | "tr" | "tbody" | "th",
    text: string,
    child: HtmlNode[],
    link?: string,
    attr?: {href: string}
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
            if (!node.attr?.href.startsWith("/wiki") || node.attr?.href.startsWith("/wiki/Datei")) return [];
            return [{
                tag: "a",
                node: "element",
                text: node.child[0].text,
                child: [],
                link: node.attr?.href.substr(6)
            }]
        case "figure":
            return [];

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
                child: parse_node(node.child[1])
            }];
        default:
            return node.child ? node.child.map(ch => parse_node(ch)).flat() : [];
    }
}

export const createElement = (node: HtmlNode, onClick: (link: string | undefined) => void) => {
    switch (node.tag) {
        case "a":
            return (
                <button onClick={() => onClick(node.link)}>
                    {node.text}
                </button>
            )
        case "text":
            return <span>{node.text}</span>
        case "ul":
            return (
                null
            )
        case "li":
            return (
                null
            )
        case "table":
            return (
                null
            )
        case "td":
            return (
                null
            )
        case "tr":
            return (
                null
            )
        case "tbody":
            return (
                null
            )
        case "th":
            return (
                null
            )
    }
};