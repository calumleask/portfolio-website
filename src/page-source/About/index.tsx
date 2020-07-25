import React from "react";
import Markdown from "react-markdown/with-html";
import { StaticQuery, graphql } from "gatsby";

import Image from "@components/Image";

import content from "@markdown/about.md";
import profileImg from "@images/profile.png";

type Query = {
    site: {
        siteMetadata: {
            title: string;
        };
    };
};

const About: React.FC = () => {
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
            render={(data): React.ReactElement => render(data)}
        />
    );
};

export default About;

const render = (data: Query): React.ReactElement => {
    const { title } = data.site.siteMetadata;

    const style = {
        borderRadius: "50%",
        boxShadow: "5px 5px 10px 0 #888",
        margin: "0 auto",
        maxWidth: "240px",
        width: "50%"
    };

    return (
        <>
            <div style={{
                margin: "40px 0",
                textAlign: "center",
                width: "100%"
            }}>
                <Image alt={title} style={style} src={profileImg}/>
            </div>
            <Markdown source={content} escapeHtml={false}/>
        </>
    );
};
