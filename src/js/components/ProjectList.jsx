import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProjectFilterButton from "src/components/ProjectFilterButton.jsx";
import ProjectLink from "src/components/ProjectLink.jsx";

const Ul = styled.ul`
    list-style: none;
    margin: auto;
    padding: 0;
    width: 80%;
`;

class ProjectList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTags: []
        };

        const { projects } = props;
        this._tagsToProjectMap = {};
        projects.forEach(project => {
            project.frontmatter.tags
                .split(" ")
                .forEach((tag) => {
                const formattedTag = tag.replace(/_/g, " ");
                if (this._tagsToProjectMap[formattedTag] === undefined) {
                    this._tagsToProjectMap[formattedTag] = [];
                }
                this._tagsToProjectMap[formattedTag].push(project);
            });
        });

        this._selectFilter = this._selectFilter.bind(this);
    }

    _selectFilter(tag) {
        if (this.state.selectedTags.indexOf(tag) < 0) {
            this.setState({ selectedTags: [ ...this.state.selectedTags,  tag ] });
        }
        else {
            const tagToRemove = this.state.selectedTags.indexOf(tag);
            this.setState({ selectedTags: this.state.selectedTags.filter((_, index) => index !== tagToRemove) });
        }
    }

    _getTagsButtons() {
        return Object.keys(this._tagsToProjectMap).map((tag, index) => {
            const isActive = this.state.selectedTags.indexOf(tag) > -1;
            return <ProjectFilterButton key={index} active={isActive} onClick={this._selectFilter} tag={tag}/>;
        });
    }

    _getFilteredProjectLinks() {
        const { projects } = this.props;
        const { selectedTags } = this.state;

        const projectsToDisplay = [];
        this.state.selectedTags.forEach(tag => {
            this._tagsToProjectMap[tag].forEach(project => {
                if (projectsToDisplay.indexOf(project) < 0) {
                    projectsToDisplay.push(project);
                }
            });
        });

        const ProjectLinks = selectedTags.length === 0 ? 
            projects.map(project => <ProjectLink key={project.id} project={project}/>)
            : projectsToDisplay.map(project => <ProjectLink key={project.id} project={project}/>);

        return (
            <Ul>
                {ProjectLinks}
            </Ul>
        );
    }

    render() {
        return (
            <>
                {this._getTagsButtons()}
                {this._getFilteredProjectLinks()}
            </>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired
    }))
};

export default ProjectList;