import React from "react";
import PropTypes from "prop-types";
import Markdown from "react-markdown/with-html";
import { withRouter } from "react-router-dom";

import { projects } from "src/Pages/ProjectList/projects.js";

class ProjectPage extends React.Component {

    render() {
        console.log(this.props);
        const project = projects.find(({ slug }) => slug === this.props.match.params.slug);

        return (
            <>
                <Markdown source={project.markdown} escapeHtml={false}/>
            </>
        );
    }
}

ProjectPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string.isRequired
        })
    })
};

export default withRouter(ProjectPage);