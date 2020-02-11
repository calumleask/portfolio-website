import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";

const ProjectTitle = styled.h1`
    margin-bottom: 10px;
`;

const DateSubheading = styled.h3`
    margin: 10px 0 40px 0;
    font-style: italic
`;

class ProjectPage extends React.Component {

    render() {
        const { mdx } = this.props.data;
        const { date, title } = mdx.frontmatter;
        return (
            <>
                <ProjectTitle>{title}</ProjectTitle>
                <DateSubheading>({date})</DateSubheading>
                <div>
                    <MDXRenderer>{mdx.body}</MDXRenderer>
                </div>
            </>
        );
    }
}

ProjectPage.propTypes = {
    data: PropTypes.shape({
        mdx: PropTypes.shape({
            body: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
                date: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired
            })
        })
    })
};

export default ProjectPage;