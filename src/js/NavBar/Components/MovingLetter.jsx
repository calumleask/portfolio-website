import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Letter = styled.div`
    display: inline;
    font-family: monospace;
    font-size: 1.4em;
    position: relative;
    text-decoration: none;
    top: 0;
    transition: top 0.25s;
`;

class MovingLetter extends React.Component {

    getStyle() {
        const { hover, offset, active, color } = this.props;
        const style = {
            color: color
        };
        const emOffset = (active ? 0.1 : -0.1) * offset + "em";
        style.top = active || hover ? emOffset : 0;
        style.color = color;
        return style;
    }

    render() {
        const { children } = this.props;
        if (typeof children === "string" || children instanceof String) {
            return (<Letter style={this.getStyle()}>{children}</Letter>);
        }
    }
}

MovingLetter.propTypes = {
    children: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    hover: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
};

export default MovingLetter;