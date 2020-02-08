import React from "react";
import PropTypes from "prop-types";

class ProjectPage extends React.Component {

    render() {
        const { html } = this.props.data.markdownRemark;
        return (
            <div dangerouslySetInnerHTML={{ __html: html }}/>
        );
    }
}

ProjectPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            html: PropTypes.string.isRequired
        })
    })
};

export default ProjectPage;