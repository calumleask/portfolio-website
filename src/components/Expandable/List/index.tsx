import React from "react";

import { withDefaultProps } from "@helpers/withDefaultProps";
import Expandable from "@components/Expandable";
import ExpandableListItems, { Option, OnOptionSelect } from "@components/Expandable/ListItems";

type ExpandableListProps = {
    collapseOnSelect: boolean;
    options: Option[];
    title: string;
    onOptionSelect: OnOptionSelect;
};

const ExpandableList: React.FC<ExpandableListProps> = (props: ExpandableListProps) => {

    const { title, options, collapseOnSelect, onOptionSelect } = props;

    return (
        <Expandable
            title={title}
            render={({ expanded }): React.ReactElement => (
                <ExpandableListItems expanded={expanded} options={options} collapseOnSelect={collapseOnSelect} onOptionSelect={onOptionSelect}/>
            )}
        />
    );
};

const defaultProps = {
    collapseOnSelect: false
};

export default withDefaultProps(defaultProps, ExpandableList);
