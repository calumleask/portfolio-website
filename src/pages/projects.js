import React from "react";

import Layout from "src/components/layout";
import Projects from "src/Pages/ProjectList/index.jsx";

const ProjectsPage = () => (
    <Layout content={<Projects/>}/>
);

ProjectsPage.displayName = "ProjectsPage";

export default ProjectsPage;