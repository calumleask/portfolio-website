import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
    background-color: #fff;
    border: 0;
    border-radius: 10px;
    box-shadow: 1px 1px 2px 0 #888;
    cursor: pointer;
    display: inline-block;
    font-sizing: 1em;
    line-height: 0;
    margin: auto 10px;
    outline: 0;
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    z-index: 11;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);

    &:hover {
        background-color: #f0f0f0;
    }

    &:active {
        background-color: #e0e0e0;
    }
`;

class CircleButton extends React.Component {

    render() {
        const { children, onClick, style } = this.props;

        return (
            <Button onClick={onClick} style={style}>
                {children}
            </Button>
        );
    }
}

CircleButton.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.obj
};

export default CircleButton;