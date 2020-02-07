import React from "react";

import Layout from "src/components/layout";
import Home from "src/Pages/Home/index.jsx";

const HomePage = () => (
    <Layout content={<Home/>}/>
);

HomePage.displayName = "HomePage";

export default HomePage;