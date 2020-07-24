import React, { useState } from "react";

import { Project } from "src/Pages/Project/types";
import ProjectFilters from "src/Pages/Projects/Components/ProjectFilters";
import ProjectList from "src/Pages/Projects/Components/ProjectList";

type Operator = {
    symbol: string;
    text: string;
}

type ProjectsProps = {
    projects: Project[];
};

const Projects: React.FC<ProjectsProps> = (props: ProjectsProps) => {
    const [filteredProjects, setFilteredProjects] = useState(props.projects);

    const operators = {
        "OR": { symbol: "||", text: "OR" },
        "AND": { symbol: "&&", text: "AND" },
        "NOT": { symbol: "!", text: "NOT" }
    };

    const operatorOptions = Object.keys(operators).map((operator, i) => (
        { ...operators[operator], context: operators[operator], selected: (i === 0) }
    ));

    // TODO: make nicer
    const { projects } = props;
    const tags = [];
    const tagsToProjectMap = {};
    projects.forEach(project => {
        project.frontmatter.tags
            .split(" ")
            .forEach((tag) => {
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

    const onFilterChange = ({ operators, tags }: { operator: Operator, tags:  }) => {
        const { projects } = props;
        if (tags.length === 0) {
            setFilteredProjects(projects);
            return;
        }

        let filteredProjects = [];
        const operator = operators[0].context;

        if (operator === _operators.OR) {
            tags.forEach(tag => {
                _tagsToProjectMap[tag.context].forEach(project => {
                    if (filteredProjects.indexOf(project) < 0) {
                        filteredProjects.push(project);
                    }
                });
            });
        }
        else if (operator === _operators.AND) {
            const projectReferencesBySelectedTags = {};
            tags.forEach(tag => {
                _tagsToProjectMap[tag.context].forEach(project => {
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
        else if (operator === _operators.NOT) {
            filteredProjects = projects.slice();
            tags.forEach(tag => {
                _tagsToProjectMap[tag.context].forEach(project => {
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
}

export default Projects;
