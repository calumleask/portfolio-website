import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import ProjectList from "src/components/ProjectList.jsx";

const ProjectsPage = ({
    data: {
        allMarkdownRemark: { edges }
    }
}) => {
    const projects = edges.map(edge => edge.node);
    return <ProjectList projects={projects}/>;
};

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM YYYY")
                        path
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
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.arrayOf(PropTypes.shape({
                node: PropTypes.object.isRequired
            }))
        })
    })
};

export default ProjectsPage;