import React from "react";
import { graphql } from "gatsby";

import ProjectsPage from "@pages/Projects";

type ProjectRouteProps = {
    data: {
        allMdx: {
            edges: {
                node: Pages.ProjectInfo
            }[]
        }
    }
};

const ProjectsRoute = (props: ProjectRouteProps): React.ReactElement => {
    const projects = props.data.allMdx.edges.map(edge => edge.node);
    return <ProjectsPage projects={projects}/>;
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

export default ProjectsRoute;
