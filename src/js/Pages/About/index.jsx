import React from "react";
import Markdown from "react-markdown/with-html";

import content from "markdown/about.md";

export default class About extends React.Component {

    render() {
        return (
            <Markdown source={content} escapeHtml={false}/>
        );
    }
}