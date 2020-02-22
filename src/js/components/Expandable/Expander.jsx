import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { color } from "css/colors.js";

const ExpandTab = styled.div`
    background: ${color.expander.default};
    border-bottom: 1px solid ${color.expander.border};
    color: ${color.expander.text};
    cursor: pointer;
    font-family: monospace;
    font-size: 1.2em;
    font-weight: bold;
    height: 100%;
    line-height: 28px;
    padding: 4px;
    width: 100%;
    span {
        border-color: ${color.expander.text};
    }

    &:hover {
        background: ${color.expander.hover};
        color: ${color.expander.textHover};
        span {
            border-color: ${color.expander.textHover};
        }
    }

    &:active {
        background: ${color.expander.active};
        color: ${color.expander.textActive};
        span {
            border-color: ${color.expander.textActive};
        }
    }

    &.expanded {
        background: ${color.expander.expanded};
        color: ${color.expander.textExpanded};
        span {
            border-color: ${color.expander.textExpanded};
        }

        &:hover {
            background: ${color.expander.expandedHover};
            color: ${color.expander.textExpandedHover};
            span {
                border-color: ${color.expander.textExpandedHover};
            }
        }
    
        &:active {
            background: ${color.expander.expandedActive};
            color: ${color.expander.textExpandedActive};
            span {
                border-color: ${color.expander.textExpandedActive};
            }
        }
    }
`;

const ArrowIcon = styled.span`
    border-color: ${color.expander.text};
    border-style: solid;
    border-width: 0 3px 3px 0;
    float: right;
    margin: 9px;
    padding: 4px;
    transition-duration: 0.25s;
    transition-property: transform;
    transition-timing-function: ease;
`;

class Expander extends React.Component {

    render() {
        const { expanded, title, onClick } = this.props;

        const arrowIconStyle = expanded ? {
            transform: "rotate(45deg)",
            WebkitTransform: "rotate(45deg)"
        } : {
            transform: "rotate(135deg)",
            WebkitTransform: "rotate(135deg)"
        };

        const className = expanded ? "expanded" : null;

        return (
            <ExpandTab className={className} onClick={() => { onClick({ expanded: !this.props.expanded }); }}>
                {title}
                <ArrowIcon style={arrowIconStyle}/>
            </ExpandTab>
        );
    }
}

Expander.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default Expander;