import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Letter = styled.div`
    color: #888;
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
        const { hover, offset, active } = this.props;
        const style = {};
        const emOffset = (active ? 0.1 : -0.1) * offset + "em";
        style.top = active || hover ? emOffset : 0;
        style.color = active ? "#444" : "#888";
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
    hover: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
    children: PropTypes.string
};

export default MovingLetter;