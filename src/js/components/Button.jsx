import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { color } from "css/colors.js";

const StyledButton = styled.button`
    background-color: ${color.button};
    border: 0;
    box-shadow: 1px 1px 2px 0 ${color.buttonShadow};
    color: ${color.buttonText};
    cursor: pointer;
    display: inline-block;
    font-family: monospace;
    font-size: 1em;
    margin: 10px;
    outline: 0;
    padding: 10px;
    transition-duration: 0.25s;
    transition-property: background color;
    transition-timing-function: ease;

    &:hover {
        background-color: ${color.buttonHover};
        color: ${color.buttonTextHover};
    }

    &:active {
        background-color: ${color.buttonActive};
        color: ${color.buttonTextActive};
    }

    &.active {
        background-color: ${color.buttonSelected};
        color: ${color.buttonTextSelected};

        &:hover {
            background-color: ${color.buttonSelectedHover};
            color: ${color.buttonTextSelectedHover};
        }
    
        &:active {
            background-color: ${color.buttonSelectedActive};
            color: ${color.buttonTextSelectedActive};
        }
    }
`;

class Button extends React.Component {

    render() {
        const { active, context, onClick, text } = this.props;

        const className = active ? "active" : null;

        return (
            <StyledButton className={className} onClick={(event) => { onClick({ event, context }); }}>{text}</StyledButton>
        );
    }
}

Button.defaultProps = {
    active: false,
    context: {},
    text: null
};

Button.propTypes = {
    active: PropTypes.bool.isRequired,
    context: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string
};

export default Button;