import React from "react";
import { graphql } from "gatsby";

import Projects from "@pages/Projects";
import { Project } from "@pages/Project/types";

type ProjectPageProps = {
    data: {
        allMdx: {
            edges: {
                node: Project
            }[]
        }
    }
};

const ProjectsPage = (props: ProjectPageProps): React.ReactElement => {
    const projects = props.data.allMdx.edges.map(edge => edge.node);
    return <Projects projects={projects}/>;
};

export const pageQuery = graphql`
    query {
        allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM YYYY")
                        title
                        tags
                    }
                }
            }
        }
    }
`;

export default ProjectsPage;
