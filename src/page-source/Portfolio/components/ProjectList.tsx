import React from "react";
import styled from "styled-components";

import ProjectLink from "./ProjectLink";

const Ul = styled.ul`
    list-style: none;
    margin: auto;
    max-width: 720px;
    padding: 0;
    width: 100%;
`;

type ProjectListProps = {
    projects: Pages.ProjectInfo[];
};

const ProjectList: React.FC<ProjectListProps> = (props: ProjectListProps) => {
    return (
        <Ul>
            {props.projects.map(project => <ProjectLink key={project.id} project={project}/>)}
        </Ul>
    );
};

export default ProjectList;
