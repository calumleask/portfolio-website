import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Ul = styled.ul`
    bottom: -40px;
    display: block;
    list-style: circle;
    margin: 0;
    padding: 5px 0;
    text-align: center;
    width: 100%;
`;

const Li = styled.li`
    color: #888;
    cursor: pointer;
    display: inline-block;
    font-size: 1.25em;
    margin: 0 5px;
    padding: 0;
    position: relative;
    width: 30px;
    height: 30px;

    &:hover {
        color: #444;
    }
`;

class SlideShowDots extends React.Component {

    _getDots() {
        const { active, count } = this.props;
        const circle = "\u25CF";

        const activeStyle = {
            color: "#444"
        };

        const dotElements = [];
        for (let i = 0; i < count; ++i) {
            dotElements.push(
                <Li
                    key={i}
                    style={(active === i) ? activeStyle : {}}
                    onClick={() => this.props.onClick(i)}
                    >
                    {circle}
                </Li>
            );
            }

        return dotElements;
    }

    render() {
        return (
            <Ul>
                {this._getDots()}
            </Ul>
        );
    }
}

SlideShowDots.propTypes = {
    active: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

export default SlideShowDots;