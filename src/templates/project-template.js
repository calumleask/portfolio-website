import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import ProjectPage from "src/Pages/Project/index.jsx";

const ProjectTemplate = ({ data }) => {	
	return <ProjectPage data={data}/>;
};

export const pageQuery = graphql`
	query($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			body
			frontmatter {
				date(formatString: "MMMM YYYY")
				title
			}
		}
	}
`;

ProjectTemplate.propTypes = {
    data: PropTypes.object.isRequired
};

export default ProjectTemplate;