import React from "react";
import Markdown from "react-markdown/with-html";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";

import content from "markdown/about.md";
import profileImg from "src/../images/profile.png";

const Img = styled.img`
    border-radius: 30px;
    box-shadow: 5px 5px 10px 0 #888;
    max-width: 200px;
    width: 50%;
`;

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
    return (
        <>
            <Img alt={title} title={title} src={profileImg}/>
            <Markdown source={content} escapeHtml={false}/>
        </>
    );
};