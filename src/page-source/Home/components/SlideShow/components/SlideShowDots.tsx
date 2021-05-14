import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
    bottom: -40px;
    display: block;
    list-style: circle;
    margin: 0;
    padding: 10px 0;
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

type SlideShowDotsProps = {
    activeIndex: number;
    count: number;
    onClick: (index: number) => void;
};

const SlideShowDots: React.FC<SlideShowDotsProps> = (props: SlideShowDotsProps) => {

    const getDots = (): React.ReactElement[] => {
        const { activeIndex, count, onClick } = props;
        const circle = "\u25CF";

        const activeStyle = {
            color: "#444"
        };

        const dotElements = [];
        for (let i = 0; i < count; ++i) {
            dotElements.push(
                <Li
                    key={i}
                    style={(activeIndex === i) ? activeStyle : {}}
                    onClick={(): void => onClick(i)}>
                    {circle}
                </Li>
            );
        }

        return dotElements;
    };

    return (
        <Ul>
            {getDots()}
        </Ul>
    );
};

export default SlideShowDots;
