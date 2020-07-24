import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { color } from "css/colors.js";

const rowHeight = 32;

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

class ExpandableListItems extends React.Component {

    _getListItems() {
        const { expanded, onOptionSelect, options } = this.props;

        const style = {
            borderBottomWidth: expanded ? "1px"  : 0,
            height: expanded ? rowHeight + "px"  : 0
        };

        return options.map((option, i) => {
            let className = (i % 2 === 0) ? "odd" : "even";
            if (option.selected) className += " selected";
            const { context } = option;
            return <ListItem key={i} className={className} style={style} onClick={(event) => { onOptionSelect({ event, context }); }}>{option.text}</ListItem>;
        });
    }

    render() {
        return (
            <ListItemContainer>
                {this._getListItems()}
            </ListItemContainer>
        );
    }
}

ExpandableListItems.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onOptionSelect: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        context: PropTypes.any,
        selected: PropTypes.bool,
        text: PropTypes.string.isRequired
    })),
};

export default ExpandableListItems;