import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ResponsiveLayout from "src/components/ResponsiveLayout";
import ExpandableList from "src/components/Expandable/ExpandableList.jsx";
import Button from "src/components/Button.jsx";
import ProjectList from "src/components/ProjectList.jsx";

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
            selectedOperator: "OR",
            selectedTags: [],
            filteredProjects: props.projects
        };

        this._filterOperatorOptions = [
            {
                symbol: "&&",
                context: "AND",
                text: "AND",
                selected: false
            },
            {
                symbol: "!",
                context: "NOT",
                text: "NOT",
                selected: false
            },
            {
                symbol: "||",
                context: "OR",
                text: "OR",
                selected: true
            }
        ];

        const { projects } = props;
        this._tagFilterListOptions = [];
        this._tagsToProjectMap = {};
        projects.forEach(project => {
            project.frontmatter.tags
                .split(" ")
                .forEach((tag) => {
                const formattedTag = tag.replace(/_/g, " ");
                if (this._tagsToProjectMap[formattedTag] === undefined) {
                    this._tagsToProjectMap[formattedTag] = [];
                    this._tagFilterListOptions.push({
                        context: formattedTag,
                        selected: false,
                        text: formattedTag
                    });
                }
                this._tagsToProjectMap[formattedTag].push(project);
            });
        });
    }

    _selectOperatorFilter(operator) {
        if (this.state.selectedOperator !== operator) {
            this.setState({ selectedOperator: operator });
            this._filterProjects(operator, this.state.selectedTags);
            this._filterOperatorOptions.forEach((option, i, array) => {
                array[i].selected = (option.context === operator);
            });
        }
    }

    _selectTagsFilter(tag) {
        const { selectedOperator, selectedTags } = this.state;
        let newSelectedTags = [];
        if (selectedTags.indexOf(tag) < 0) {
            newSelectedTags = [ ...selectedTags,  tag ];
            this._tagFilterListOptions.some((option, i, array) => {
                if (option.context === tag) {
                    array[i].selected = true;
                    return true;
                }
            });
        }
        else {
            const indexToRemove = selectedTags.indexOf(tag);
            newSelectedTags = selectedTags.filter((_, index) => index !== indexToRemove);
            this._tagFilterListOptions.some((option, i, array) => {
                if (option.context === tag) {
                    array[i].selected = false;
                    return true;
                }
            });
        }
        this._filterProjects(selectedOperator, newSelectedTags);
    }

    _getOperatorFilterButtons() {
        return this._filterOperatorOptions.map((operator, index) => {
            const isActive = this.state.selectedOperator === operator.text;
            return <Button key={index} active={isActive}  context={operator.context} onClick={({ context }) => { this._selectOperatorFilter(context); }} text={operator.text}/>;
        });
    }

    _getTagsFilterButtons() {
        return Object.keys(this._tagsToProjectMap).map((tag, index) => {
            const isActive = this.state.selectedTags.indexOf(tag) > -1;
            return <Button key={index} active={isActive}  context={tag} onClick={({ context }) => { this._selectTagsFilter(context); }} text={tag}/>;
        });
    }

    _filterProjects(selectedOperator, selectedTags) {
        const { projects } = this.props;
        let filteredProjects = projects;

        if (selectedTags.length > 0) {
            filteredProjects = [];

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
                        filteredProjects.push(project);
                    }
                });
            }
            else if (selectedOperator === "NOT") {
                filteredProjects = projects.slice();
                selectedTags.forEach(tag => {
                    this._tagsToProjectMap[tag].forEach(project => {
                        const index = filteredProjects.indexOf(project);
                        if (index > -1) {
                            filteredProjects.splice(index, 1);
                        }
                    });
                });
            }
            else if (selectedOperator === "OR") {
                selectedTags.forEach(tag => {
                    this._tagsToProjectMap[tag].forEach(project => {
                        if (filteredProjects.indexOf(project) < 0) {
                            filteredProjects.push(project);
                        }
                    });
                });
            }

        }

        this.setState({
            filteredProjects: filteredProjects,
            selectedOperator: selectedOperator,
            selectedTags: selectedTags
        });
    }

    render() {
        return (
            <>
                <ResponsiveLayout
                    breakpoint={device.size.tablet}
                    renderDesktop={() => {
                        return (
                            <>
                                <div>
                                    {this._getOperatorFilterButtons()}
                                </div>
                                <div>
                                    {this._getTagsFilterButtons()}
                                </div>
                            </>
                        );
                    }}
                    renderMobile={() => {
                        return (
                            <FilterBounds>
                                <ExpandableList title="Filter Mode" options={this._filterOperatorOptions} onOptionSelect={({ context }) => { this._selectOperatorFilter(context); }}/>
                                <ExpandableList title="Filter" options={this._tagFilterListOptions} onOptionSelect={({ context }) => { this._selectTagsFilter(context); }}/>
                            </FilterBounds>
                        );
                    }}
                />
                <ProjectList projects={this.state.filteredProjects}/>;
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