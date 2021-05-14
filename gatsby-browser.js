import React from "react";

import Layout from "@layouts/Default";
import WindowDimensionsProvider from "@providers/WindowDimensionsProvider";

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
