import React, { useState } from "react";

import { Project } from "@pages/Project/types";
import ProjectFilters, { OnFilterChange, Operator, OperatorType, Tag } from "./components/ProjectFilters";
import ProjectList from "./components/ProjectList";

type ProjectsProps = {
    projects: Project[];
};

const Projects: React.FC<ProjectsProps> = (props: ProjectsProps) => {
    const [filteredProjects, setFilteredProjects] = useState(props.projects);

    const operatorTypes: {
        [operator: string]: OperatorType
    } = {
        "OR": { symbol: "||", text: "OR" },
        "AND": { symbol: "&&", text: "AND" },
        "NOT": { symbol: "!", text: "NOT" }
    };

    const operatorOptions: Operator[] = Object.keys(operatorTypes).map((operator, i) => (
        { ...operatorTypes[operator], context: operatorTypes[operator], selected: (i === 0) }
    ));

    // TODO: make nicer
    const { projects } = props;
    const tags: Tag[] = [];
    const tagsToProjectMap: {
        [tag: string]: Project[]
    } = {};
    projects.forEach(project => {
        project.frontmatter.tags
            .split(" ")
            .forEach(tag => {
                const formattedTag = tag.replace(/_/g, " ");
                if (tagsToProjectMap[formattedTag] === undefined) {
                    tagsToProjectMap[formattedTag] = [];
                    tags.push({
                        context: formattedTag,
                        text: formattedTag,
                        selected: false
                    });
                }
                tagsToProjectMap[formattedTag].push(project);
            });
    });

    const onFilterChange: OnFilterChange = ({ operators, tags }) => {
        const { projects } = props;
        if (tags.length === 0) {
            setFilteredProjects(projects);
            return;
        }

        let filteredProjects: Project[] = [];
        const operator = operators[0].context;

        if (operator === operatorTypes.OR) {
            tags.forEach(tag => {
                tagsToProjectMap[tag.context].forEach(project => {
                    if (filteredProjects.indexOf(project) < 0) {
                        filteredProjects.push(project);
                    }
                });
            });
        }
        else if (operator === operatorTypes.AND) {
            const projectReferencesBySelectedTags: {
                [projectId: string]: number;
            } = {};
            tags.forEach(tag => {
                tagsToProjectMap[tag.context].forEach(project => {
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
        else if (operator === operatorTypes.NOT) {
            filteredProjects = projects.slice();
            tags.forEach(tag => {
                tagsToProjectMap[tag.context].forEach(project => {
                    const index = filteredProjects.indexOf(project);
                    if (index > -1) {
                        filteredProjects.splice(index, 1);
                    }
                });
            });
        }

        setFilteredProjects(filteredProjects);
    };

    return (
        <>
            <ProjectFilters operators={operatorOptions} tags={tags} onFilterChange={onFilterChange}/>
            <ProjectList projects={filteredProjects}/>
        </>
    );
};

export default Projects;
