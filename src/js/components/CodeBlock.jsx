import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { device } from "src/helpers/devices.js";

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

class CodeBlock extends React.Component {

    render() {
        return (
            <Div>
                <Pre>
                    {this.props.code}
                </Pre>
            </Div>
        );
    }
}

CodeBlock.propTypes = {
    code: PropTypes.string.isRequired
};

export default CodeBlock;