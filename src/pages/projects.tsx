import React from "react";
import { graphql } from "gatsby";

import Projects from "src/Pages/Projects";

type Mdx = {
    node:
};

type ProjectPageProps = {
    data: {
        allMdx: {
            edges: unknown[]
        }
    }
};

const ProjectsPage = (props: ProjectPageProps): React.ReactNode => {
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
