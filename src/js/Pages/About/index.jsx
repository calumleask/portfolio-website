import React from "react";
import Markdown from "react-markdown/with-html";
import { StaticQuery, graphql } from "gatsby";

import Image from "src/components/Image.jsx";

import content from "markdown/about.md";
import profileImg from "src/../images/profile.png";

export default class About extends React.Component {

    render() {
        return (
            <StaticQuery
                query={graphql`
                    query {
                        site {
                            siteMetadata {
                                title
                            }
                        }
                    }
                `}
                render={(data) => render(data)}
            />
        );
    }
}

const render = (data) => {
    const { title } = data.site.siteMetadata;

    const style = {
        borderRadius: "50%",
        boxShadow: "5px 5px 10px 0 #888",
        width: "50%",
        maxWidth: "240px"
    };

    return (
        <>
            <Image alt={title} style={style} src={profileImg}/>
            <Markdown source={content} escapeHtml={false}/>
        </>
    );
};