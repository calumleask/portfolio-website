import React from "react";
import Markdown from "markdown-to-jsx";

import content from "src/Pages/About/index.md";

export default class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Markdown>{content}</Markdown>
        );
    }
}