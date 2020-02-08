import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

class ProjectLink extends React.Component {
    
    render() {
        const { project } = this.props;
        return (
            <li>
                <Link to={project.frontmatter.path}>
                    {project.frontmatter.title} ({project.frontmatter.date})
                </Link>
            </li>
        );
    }
}

ProjectLink.propTypes = {
    project: PropTypes.shape({
        frontmatter: PropTypes.shape({
            date: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    })
};

export default ProjectLink;