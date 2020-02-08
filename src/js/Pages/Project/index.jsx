import React from "react";
import PropTypes from "prop-types";

class ProjectPage extends React.Component {

    render() {
        const { markdownRemark } = this.props.data;
        const { html, frontmatter } = markdownRemark;
        const { date, title } = frontmatter;
        return (
            <>
                <h1>{title}</h1>
                <h3><i>({date})</i></h3>
                <div dangerouslySetInnerHTML={{ __html: html }}/>
            </>
        );
    }
}

ProjectPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
                date: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired
            })
        })
    })
};

export default ProjectPage;