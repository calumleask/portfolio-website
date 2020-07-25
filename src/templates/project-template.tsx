import React from "react";
import { graphql } from "gatsby";

import ProjectPage from "@pages/Project";

type ProjectTemplateProps = {
	data: {
        mdx: {
            body: string;
            frontmatter: {
                date: string;
                title: string;
            };
        };
    };
};

const ProjectTemplate: React.FC<ProjectTemplateProps> = (props: ProjectTemplateProps) => {	
    return <ProjectPage data={props.data}/>;
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

export default ProjectTemplate;
