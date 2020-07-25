import React, { useState } from "react";
import styled from "styled-components";

import Expander from "./components/Expander";

const expanderHeight = 40;

const Container = styled.div`
    margin-bottom: 10px;
    min-height: ${expanderHeight}px;
    position: relative;
    width: 100%;
`;

type ExpandableProps = {
    title: string;
    render: ({ expanded }: { expanded: boolean }) => React.ReactElement;
};

const Expandable: React.FC<ExpandableProps> = (props: ExpandableProps) => {
    const [expanded, setExpanded] = useState(false);

    const onExpanderClick = (): void => {
        setExpanded(!expanded);
    };

    const { title, render } = props;

    return (
        <Container>
            <Expander expanded={expanded} title={title} onClick={onExpanderClick}/>
            {render({ expanded })}
        </Container>
    );
};

export default Expandable;
