import React from "react";
import { Link } from "gatsby";
import { projects } from "src/Pages/ProjectList/projects.js";

export default class ProjectListPage extends React.Component {

    render() {
        return (
            <ul>
                {projects.map((project, id) => (
                    <li key={id}>
                        <Link to={"/projects/"+project.slug}>{project.title}</Link>
                    </li>
                ))}
            </ul>
        );
    }
}