import "./src/css/index.css";

import React from "react";

import Layout from "src/components/layout";
import WindowDimensionsProvider from "src/components/WindowDimensionsProvider";
import ThemeProvider from "src/components/ThemeContext.jsx";

export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
    return (
        <WindowDimensionsProvider>
            <ThemeProvider>
                {element}
            </ThemeProvider>
        </WindowDimensionsProvider>
    );
};