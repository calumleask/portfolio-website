import React from "react";
import { PageProps } from "gatsby";

const Error404Page: React.FC<PageProps> = (_props: PageProps) => {
    return (
        <>
            <h1>{"There's nothing here"}</h1>
        </>
    );
};

export default Error404Page;
