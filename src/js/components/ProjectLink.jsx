import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

class ProjectLink extends React.Component {
    
    render() {
        const { path, title, date, tags } = this.props.project.frontmatter;
        const tagsArray = tags.split(" ");
        tagsArray.forEach((tag, index, tagsArray) => {
            tagsArray[index] = tag.replace(/_/g, " ");
        });

        return (
            <li>
                <Link to={path}>
                    {title} ({date})
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
            title: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired
        })
    })
};

export default ProjectLink;