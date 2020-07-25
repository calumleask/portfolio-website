import React from "react";
import styled from "styled-components";

import { color } from "@style/colors";

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
        color: ${color.expander.rowTextSelected};
    }
`;

export type Option = {
    context: unknown;
    selected: boolean;
    text: string;
};

export type OnOptionSelect = ({ context, event }: {
    context: unknown;
    event: React.MouseEvent<HTMLDivElement, MouseEvent>;
}) => void;

type ExpandableListItemsProps = {
    expanded: boolean;
    options: Option[];
    onOptionSelect: OnOptionSelect;
};

const ExpandableListItems: React.FC<ExpandableListItemsProps> = (props: ExpandableListItemsProps) => {

    const getListItems = (): React.ReactElement[] => {
        const { expanded, options, onOptionSelect } = props;

        const style = {
            borderBottomWidth: expanded ? "1px"  : 0,
            height: expanded ? rowHeight + "px"  : 0
        };

        return options.map((option, i) => {
            let className = (i % 2 === 0) ? "odd" : "even";
            if (option.selected) className += " selected";
            const { context } = option;
            return <ListItem key={i} className={className} style={style} onClick={(event): void => { onOptionSelect({ context, event }); }}>{option.text}</ListItem>;
        });
    };

    return (
        <ListItemContainer>
            {getListItems()}
        </ListItemContainer>
    );
};

export default ExpandableListItems;
