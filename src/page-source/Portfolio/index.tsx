import React, { useState } from "react";

import ProjectFilters, { OnFilterChange, Operator, OperatorType, Tag } from "./components/ProjectFilters";
import ProjectList from "./components/ProjectList";

type PortfolioPageProps = {
    projects: Pages.ProjectInfo[];
};

const PortfolioPage: React.FC<PortfolioPageProps> = ({ projects }: PortfolioPageProps) => {
    const [filteredProjects, setFilteredProjects] = useState(projects);

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

    const tags: Tag[] = [];
    const tagsToProjectMap: {
        [tag: string]: Pages.ProjectInfo[]
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
        if (tags.length === 0) {
            setFilteredProjects([...projects]);
            return;
        }

        let filteredProjects: Pages.ProjectInfo[] = [];
        const operator = operators[0].context;

        switch (operator.symbol) {
        case operatorTypes.OR.symbol: {
            tags.forEach(tag => {
                tagsToProjectMap[tag.context].forEach(project => {
                    if (filteredProjects.indexOf(project) < 0) {
                        filteredProjects.push(project);
                    }
                });
            });
            break;
        }
        case operatorTypes.AND.symbol: {
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
            break;
        }
        case operatorTypes.NOT.symbol: {
            filteredProjects = projects.slice();
            tags.forEach(tag => {
                tagsToProjectMap[tag.context].forEach(project => {
                    const index = filteredProjects.indexOf(project);
                    if (index > -1) {
                        filteredProjects.splice(index, 1);
                    }
                });
            });
            break;
        }
        default: {
            filteredProjects = [...projects];
        }
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

export default PortfolioPage;
