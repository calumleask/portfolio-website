import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProjectLink from "src/Pages/Projects/Components/ProjectLink.jsx";

const Ul = styled.ul`
    list-style: none;
    margin: auto;
    max-width: 720px;
    padding: 0;
`;

class ProjectList extends React.Component {

    render() {
        return (
            <Ul>
                {this.props.projects.map(project => <ProjectLink key={project.id} project={project}/>)}
            </Ul>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
    }))
};

export default ProjectList;