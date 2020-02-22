import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { color } from "css/colors.js";

const rowHeight = 32;
const tabHeight = 40;

const Container = styled.div`
    margin-bottom: 10px;
    min-height: ${tabHeight}px;
    position: relative;
    width: 100%;
`;

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
        border-bottom: none;
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

const ListItemContainer = styled.div`
    background-color: ${color.button};
    top: 100%;
    width: 100%;
`;

const ListItem = styled.div`
    border-bottom: 1px solid ${color.expander.rowBorder};
    color: ${color.buttonText};
    cursor: pointer;
    font-family: monospace;
    font-size: 1em;
    font-weight: normal;
    height: ${rowHeight}px;
    line-height: ${rowHeight}px;
    overflow: hidden;
    transition-duration: 0.25s;
    transition-property: background height;
    transition-timing-function: ease;
    width: 100%;

    &.odd {
        background: ${color.expander.rowOdd};
        color: ${color.expander.rowOddText};
    }

    &.even {
        background: ${color.expander.rowEven};
        color: ${color.expander.rowEvenText};
    }

    &:hover {
        background: ${color.expander.rowHover};
        color: ${color.buttonTextHover};
    }

    &.selected {
        background: ${color.expander.rowSelected};
        color: ${color.rowTextSelected};
    }
`;

class ExpandableList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    _onExpand() {
        this.setState({ expanded: !this.state.expanded });
    }

    _onOptionSelect({ event, context }) {
        const { collapseOnSelect, onOptionSelect } = this.props;
        onOptionSelect({ event, context });
        if (collapseOnSelect) {
            this.setState({ expanded: false });
        }
    }

    _getListItems() {
        const { options } = this.props;
        const { expanded } = this.state;

        const style = {
            borderBottomWidth: expanded ? "1px"  : 0,
            height: expanded ? rowHeight + "px"  : 0
        };

        const listItems = options.map((option, i) => {
            let className = (i % 2 === 0) ? "odd" : "even";
            if (option.selected) className += " selected";
            const { context } = option;
            return <ListItem key={i} className={className} style={style} onClick={(event) => { this._onOptionSelect({ event, context }); }}>{option.text}</ListItem>;
        });

        return (
            <ListItemContainer>
                {listItems}
            </ListItemContainer>
        );
    }

    render() {
        const { expanded } = this.state;

        const arrowIconStyle = expanded ? {
            transform: "rotate(45deg)",
            WebkitTransform: "rotate(45deg)"
        } : {
            transform: "rotate(135deg)",
            WebkitTransform: "rotate(135deg)"
        };

        const className = expanded ? "expanded" : null;

        return (
            <Container>
                <ExpandTab className={className} onClick={this._onExpand.bind(this)}>
                    {this.props.title}
                    <ArrowIcon style={arrowIconStyle}/>
                </ExpandTab>
                {this._getListItems()}
            </Container>
        );
    }
}

ExpandableList.defaultProps = {
    collapseOnSelect: true
};

ExpandableList.propTypes = {
    collapseOnSelect: PropTypes.bool.isRequired,
    onOptionSelect: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        context: PropTypes.any,
        selected: PropTypes.bool,
        text: PropTypes.string.isRequired
    })),
    title: PropTypes.string.isRequired
};

export default ExpandableList;