import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
    background-color: #fff;
    border: 0;
    box-shadow: 1px 1px 2px 0 #888;
    cursor: pointer;
    display: inline-block;
    font-sizing: 1em;
    margin: 10px;
    outline: 0;
    padding: 10px;

    &:hover {
        background-color: #f0f0f0;
    }

    &:active {
        background-color: #e0e0e0;
    }
`;

class ProjectFilterButton extends React.Component {

    render() {
        const { active, onClick, tag } = this.props;

        const style = active ? {
            backgroundColor: "#e0e0e0", 
            color: "#404040" 
        } : {};

        return (
            <Button style={style} onClick={() => { onClick(tag); }}>{tag}</Button>
        );
    }
}

ProjectFilterButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    tag: PropTypes.string.isRequired
};

export default ProjectFilterButton;