import React from "react";
import PropTypes from "prop-types";
import { MDXRenderer } from "gatsby-plugin-mdx";

class ProjectPage extends React.Component {

    render() {
        const { mdx } = this.props.data;
        const { date, title } = mdx.frontmatter;
        return (
            <>
                <h1>{title}</h1>
                <h3><i>({date})</i></h3>
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
                path: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired
            })
        })
    })
};

export default ProjectPage;