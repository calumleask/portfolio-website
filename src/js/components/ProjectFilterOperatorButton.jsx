import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
    background-color: #fff;
    border: 0;
    box-shadow: 1px 1px 2px 0 #888;
    cursor: pointer;
    display: inline-block;
    font-size: 1em;
    margin: 10px;
    outline: 0;
    padding: 10px;
    width: 60px;

    &:hover {
        background-color: #f0f0f0;
    }

    &:active {
        background-color: #e0e0e0;
    }
`;

class ProjectFilterOperatorButton extends React.Component {

    render() {
        const { active, onClick, operator } = this.props;

        const style = active ? {
            backgroundColor: "#e0e0e0", 
            color: "#404040" 
        } : {};

        const text = active ? operator.name : operator.symbol;

        return (
            <Button style={style} onClick={() => { onClick(operator.name); }}>{text}</Button>
        );
    }
}

ProjectFilterOperatorButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    operator: PropTypes.shape({
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired
    }).isRequired
};

export default ProjectFilterOperatorButton;