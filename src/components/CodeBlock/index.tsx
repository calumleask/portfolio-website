import React from "react";
import styled from "styled-components";

import { device } from "@helpers/devices";

const Div = styled.div`
    border: solid gray;
    border-width: 0.1em;
    margin: 20px auto;
    max-width: 100%;
    overflow-x: auto;
    padding: 10px;
    text-align: left;
`;

const Pre = styled.pre`
    font-family: monospace;
    font-size: 0.8em;
    line-height: 125%;
    margin: 0;
    
    @media ${device.tablet} {
        font-size: 0.9em;
    }
`;

type CodeBlockProps = {
    code: string;
};

const CodeBlock: React.FC<CodeBlockProps> = (props: CodeBlockProps) => {
    return (
        <Div>
            <Pre>
                {props.code}
            </Pre>
        </Div>
    );
};

export default CodeBlock;
