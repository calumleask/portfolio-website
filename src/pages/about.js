import React from "react";

import Layout from "src/components/layout";
import About from "src/Pages/About/index.jsx";

const AboutPage = () => (
    <Layout content={<About/>}/>
);

AboutPage.displayName = "AboutPage";

export default AboutPage;