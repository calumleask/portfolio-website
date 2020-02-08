import React from "react";
import PropTypes from "prop-types";

import ProjectLink from "src/components/ProjectLink.jsx";

class ProjectList extends React.Component {

    render() {
        const { projects } = this.props;
        const ProjectLinks = projects.map(project => <ProjectLink key={project.id} project={project}/>);
        return (
            <ul>
                {ProjectLinks}
            </ul>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
    }))
};

export default ProjectList;