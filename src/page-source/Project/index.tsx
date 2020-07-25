import React from "react";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { device } from "@helpers/devices";

const ProjectTitle = styled.h1`
    text-align: left;
    margin-bottom: 10px;

    @media ${device.mobileL} {
        text-align: center;
    }
`;

const DateSubheading = styled.h3`
    text-align: left;
    margin: 10px 0 40px 0;
    font-style: italic;

    @media ${device.mobileL} {
        text-align: center;
    }
`;

type ProjectPageProps = {
    data: {
        mdx: {
            body: string;
            frontmatter: {
                date: string;
                title: string;
            };
        };
    };
};

const ProjectPage: React.FC<ProjectPageProps> = (props: ProjectPageProps) => {
    const { body, frontmatter } = props.data.mdx;
    const { date, title } = frontmatter;

    return (
        <>
            <ProjectTitle>{title}</ProjectTitle>
            <DateSubheading>({date})</DateSubheading>
            <MDXRenderer>{body}</MDXRenderer>
        </>
    );
};

export default ProjectPage;
