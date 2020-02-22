import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "src/components/Button.jsx";
import ProjectLink from "src/components/ProjectLink.jsx";

const Ul = styled.ul`
    list-style: none;
    margin: auto;
    max-width: 720px;
    padding: 0;
`;

class ProjectList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOperator: "OR",
            selectedTags: []
        };

        this._filterOperators = [
            {
                symbol: "&&",
                name: "AND",
                text: "AND"
            },
            {
                symbol: "!",
                name: "NOT",
                text: "NOT"
            },
            {
                symbol: "||",
                name: "OR",
                text: "OR"
            }
        ];

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
    }

    _selectOperatorFilter(operatorName) {
        if (this.state.selectedOperator !== operatorName) {
            this.setState({ selectedOperator: operatorName });
        }
    }

    _selectTagsFilter(tag) {
        if (this.state.selectedTags.indexOf(tag) < 0) {
            this.setState({ selectedTags: [ ...this.state.selectedTags,  tag ] });
        }
        else {
            const tagToRemove = this.state.selectedTags.indexOf(tag);
            this.setState({ selectedTags: this.state.selectedTags.filter((_, index) => index !== tagToRemove) });
        }
    }

    _getOperatorFilterButtons() {
        return this._filterOperators.map((operator, index) => {
            const isActive = this.state.selectedOperator === operator.name;
            return <Button key={index} active={isActive}  context={{ operator }} onClick={({ context }) => { this._selectOperatorFilter(context.operator.name); }} text={operator.name}/>;
        });
    }

    _getTagsFilterButtons() {
        return Object.keys(this._tagsToProjectMap).map((tag, index) => {
            const isActive = this.state.selectedTags.indexOf(tag) > -1;
            return <Button key={index} active={isActive}  context={{ tag }} onClick={({ context }) => { this._selectTagsFilter(context.tag); }} text={tag}/>;
        });
    }

    _getFilteredProjectLinks() {
        const { projects } = this.props;
        const { selectedOperator, selectedTags } = this.state;
        let projectsToDisplay = [];

        if (selectedOperator === "AND") {
            const projectReferencesBySelectedTags = {};
            selectedTags.forEach(tag => {
                this._tagsToProjectMap[tag].forEach(project => {
                    if (projectReferencesBySelectedTags[project.id] === undefined) {
                        projectReferencesBySelectedTags[project.id] = 0;
                    }
                    projectReferencesBySelectedTags[project.id]++;
                });
            });
            projects.forEach(project => {
                if (projectReferencesBySelectedTags[project.id] === selectedTags.length) {
                    projectsToDisplay.push(project);
                }
            });
        }
        else if (selectedOperator === "NOT") {
            projectsToDisplay = projects.slice();
            selectedTags.forEach(tag => {
                this._tagsToProjectMap[tag].forEach(project => {
                    const index = projectsToDisplay.indexOf(project);
                    if (index > -1) {
                        projectsToDisplay.splice(index, 1);
                    }
                });
            });
        }
        else if (selectedOperator === "OR") {
            selectedTags.forEach(tag => {
                this._tagsToProjectMap[tag].forEach(project => {
                    if (projectsToDisplay.indexOf(project) < 0) {
                        projectsToDisplay.push(project);
                    }
                });
            });
        }

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
                <div>
                    {this._getOperatorFilterButtons()}
                </div>
                <div>
                    {this._getTagsFilterButtons()}
                </div>
                {this._getFilteredProjectLinks()}
            </>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        frontmatter: PropTypes.shape({
            tags: PropTypes.string.isRequired
        })
    }))
};

export default ProjectList;