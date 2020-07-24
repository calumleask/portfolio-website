import React from "react";

import Layout from "@components/layout";
import WindowDimensionsProvider from "@components/WindowDimensionsProvider";

export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
    return (
        <WindowDimensionsProvider>
            {element}
        </WindowDimensionsProvider>
    );
};
