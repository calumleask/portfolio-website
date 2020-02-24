import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ResponsiveLayout from "src/components/ResponsiveLayout";
import ExpandableList from "src/components/Expandable/ExpandableList.jsx";
import Button from "src/components/Button.jsx";
import ProjectFilters from "src/Pages/Projects/Components/ProjectFilters.jsx";
import ProjectList from "src/Pages/Projects/Components/ProjectList.jsx";

import { device } from "src/helpers/devices.js";

const FilterBounds = styled.div`
    margin: 0;
    width: 100%;

    @media ${device.mobileL} {
        margin: 0 auto;
        max-width: ${device.size.mobileM}px;
    }

    @media ${device.laptop} {
        width: 100%;
    }
`;

class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filteredProjects: props.projects
        };

        this._operators = {
            OR: { symbol: "||", text: "OR" },
            AND: { symbol: "&&", text: "AND" },
            NOT: { symbol: "!", text: "NOT" }
        }

        this._operatorOptions = Object.keys(this._operators).map((operator, i) => (
            { ...this._operators[operator], context: this._operators[operator], selected: (i === 0) }
        ));

        const { projects } = props;
        this._tags = [];
        this._tagsToProjectMap = {};
        projects.forEach(project => {
            project.frontmatter.tags
                .split(" ")
                .forEach((tag) => {
                const formattedTag = tag.replace(/_/g, " ");
                if (this._tagsToProjectMap[formattedTag] === undefined) {
                    this._tagsToProjectMap[formattedTag] = [];
                    this._tags.push({
                        context: formattedTag,
                        text: formattedTag,
                        selected: false
                    });
                }
                this._tagsToProjectMap[formattedTag].push(project);
            });
        });
    }

    _filterProjects({ operators, tags }) {
        const { projects } = this.props;
        if (tags.length === 0) {
            this.setState({ filteredProjects: projects });
            return;
        }

        let filteredProjects = [];
        const operator = operators[0].context;

        if (operator === this._operators.OR) {
            tags.forEach(tag => {
                this._tagsToProjectMap[tag.context].forEach(project => {
                    if (filteredProjects.indexOf(project) < 0) {
                        filteredProjects.push(project);
                    }
                });
            });
        }
        else if (operator === this._operators.AND) {
            const projectReferencesBySelectedTags = {};
            tags.forEach(tag => {
                this._tagsToProjectMap[tag.context].forEach(project => {
                    if (projectReferencesBySelectedTags[project.id] === undefined) {
                        projectReferencesBySelectedTags[project.id] = 0;
                    }
                    projectReferencesBySelectedTags[project.id]++;
                });
            });
            projects.forEach(project => {
                if (projectReferencesBySelectedTags[project.id] === tags.length) {
                    filteredProjects.push(project);
                }
            });
        }
        else if (operator === this._operators.NOT) {
            filteredProjects = projects.slice();
            tags.forEach(tag => {
                this._tagsToProjectMap[tag.context].forEach(project => {
                    const index = filteredProjects.indexOf(project);
                    if (index > -1) {
                        filteredProjects.splice(index, 1);
                    }
                });
            });
        }

        this.setState({ filteredProjects: filteredProjects });
    }

    render() {
        return (
            <>
                <ProjectFilters operators={this._operatorOptions} tags={this._tags} onFilterChange={this._filterProjects.bind(this)}/>
                <ProjectList projects={this.state.filteredProjects}/>
            </>
        );
    }
}

Projects.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        frontmatter: PropTypes.shape({
            tags: PropTypes.string.isRequired
        })
    }))
};

export default Projects;