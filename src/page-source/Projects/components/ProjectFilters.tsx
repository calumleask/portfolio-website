import React, { useEffect, useState } from "react";

import ResponsiveLayout from "@components/ResponsiveLayout";
import ExpandableContent from "@components/Expandable/Content";
import ExpandableListItems from "@components/Expandable/ListItems";
import Button from "@components/Button";

import { device } from "@helpers/devices";

type OnSelectHandler = ({ context, event }: {
    context: unknown;
    event:  React.MouseEvent<HTMLElement, MouseEvent>;
}) => void;

export type OperatorType = {
    symbol: string;
    text: string;
};

export type Operator = {
    context: OperatorType;
    selected: boolean;
    text: string;
};

export type Tag = {
    context: string;
    selected: boolean;
    text: string;
};

export type OnFilterChange = ({
    operators, tags
}: {
    operators: Operator[];
    tags: Tag[];
}) => void;

type ProjectFiltersProps = {
    operators: Operator[];
    tags: Tag[];
    onFilterChange: OnFilterChange;
};

const ProjectFilters: React.FC<ProjectFiltersProps> = (props: ProjectFiltersProps) => {
    const [operators, setOperators] = useState(props.operators.map(operator => ({ ...operator, ...{ selected: operator.selected }})));
    const [tags, setTags] = useState(props.tags.map(tag => ({ ...tag, ...{ selected: tag.selected }})));

    useEffect(() => {
        onFilterChange();
    }, [operators, tags]);

    const onFilterChange = (): void => {
        props.onFilterChange({
            operators: operators.filter(operator => (operator.selected)),
            tags: tags.filter(tag => (tag.selected))
        });
    };

    const selectOperatorFilter: OnSelectHandler = ({ context }): void => {
        const isSelected = operators.some(operator => (operator.context === context && operator.selected));
        if (!isSelected) {
            setOperators(operators.map(operator => (
                { ...operator, selected: operator.context === context }
            )));
        }
    };

    const selectTagsFilter: OnSelectHandler = ({ context }): void => {
        setTags(tags.map(tag => (
            { ...tag, selected: (tag.context === context && !tag.selected) || (tag.context !== context && tag.selected) }
        )));
    };

    const getOperatorFilterButtons = (): React.ReactElement => (
        <>
            {operators.map((operator, index) => {
                return <Button key={index} active={operator.selected}  context={operator.context} onClick={selectOperatorFilter} text={operator.text}/>;
            })}
        </>
    );

    const getTagsFilterButtons = (): React.ReactElement => (
        <>
            {tags.map((tag, index) => {
                return <Button key={index} active={tag.selected}  context={tag.context} onClick={selectTagsFilter} text={tag.text}/>;
            })}
        </>
    );

    return (
        <>
            <ExpandableContent
                title="Filter Mode"
                render={({ expanded }): React.ReactElement => (
                    <ResponsiveLayout
                        breakpoint={device.size.mobileL}
                        renderDesktop={(): React.ReactElement => getOperatorFilterButtons()}
                        renderMobile={(): React.ReactElement => (
                            <ExpandableListItems
                                expanded={expanded}
                                options={operators}
                                onOptionSelect={selectOperatorFilter}/>
                        )}
                    />
                )}
            />
            <ExpandableContent
                title="Filter"
                render={({ expanded }): React.ReactElement => (
                    <ResponsiveLayout
                        breakpoint={device.size.mobileL}
                        renderDesktop={(): React.ReactElement => getTagsFilterButtons()}
                        renderMobile={(): React.ReactElement => (
                            <ExpandableListItems
                                expanded={expanded}
                                options={tags}
                                onOptionSelect={selectTagsFilter}/>
                        )}
                    />
                )}
            />
        </>
    );
};

export default ProjectFilters;
