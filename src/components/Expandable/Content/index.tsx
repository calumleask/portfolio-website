import React from "react";
import styled from "styled-components";

import Expandable from "@components/Expandable";

const ContentContainer = styled.div`
    overflow: hidden;
    transition-duration: 0.25s;
    transition-property: opacity;
    transition-timing-function: ease;
`;

type ExpandableContentProps = {
    title: string;
    render: ({ expanded }: { expanded: boolean }) => React.ReactElement;
};

const ExpandableContent: React.FC<ExpandableContentProps> = (props: ExpandableContentProps) => {
    const { title, render } = props;

    return (
        <Expandable
            title={title}
            render={({ expanded }): React.ReactElement => {
                const style = {
                    height: expanded ? "auto" : 0,
                    opacity: expanded ? 1 : 0
                };
                return(
                    <ContentContainer style={style}>{render({ expanded })}</ContentContainer>
                );
            }}
        />
    );
};

export default ExpandableContent;
