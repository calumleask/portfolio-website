import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import ProjectList from "src/components/ProjectList.jsx";

const ProjectsPage = ({
    data: {
        allMdx: { edges }
    }
}) => {
    const projects = edges.map(edge => edge.node);
    return <ProjectList projects={projects}/>;
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

ProjectsPage.displayName = "ProjectsPage";

ProjectsPage.propTypes = {
    data: PropTypes.shape({
        allMdx: PropTypes.shape({
            edges: PropTypes.arrayOf(PropTypes.shape({
                node: PropTypes.object.isRequired
            }))
        })
    })
};

export default ProjectsPage;