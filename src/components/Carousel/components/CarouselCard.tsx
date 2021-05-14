import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { withDefaultProps } from "@helpers/withDefaultProps";
import CarouselCardImage from "./CarouselCardImage";

const CardContainer = styled.div`
    bottom: 0;
    cursor: pointer;
    left: 0;
    opacity: 1;
    position: absolute;
    top: 0;
    transition-duration: 1s;
    transition-property: bottom, left, top;
    transition-timing-function: ease;
    width: 100%;
`;

type CarouselCard = {
    cycle: boolean;
    images: string[];
    indexOffset: number;
    interval: number;
    onClick: () => void;
};

const CarouselCard: React.FC<CarouselCard> = ({ cycle, images, indexOffset, interval, onClick }: CarouselCard) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (!cycle && intervalId) {
            clearInterval(intervalId);
        }
        else {
            const id = setInterval(cycleImage, interval);
            setIntervalId(id);
        }
    }, [cycle]);

    const cycleImage = (): void => {
        transitionToSlide(activeIndex + 1);
    };

    const transitionToSlide = (newIndex: number): void => {
        if (!cycle) return;
        const imageCount = images.length;
        if (newIndex >= imageCount) newIndex -= imageCount;
        if (newIndex < 0) newIndex += imageCount;
        setActiveIndex(newIndex);
    };

    const getImages = (): React.ReactElement[] => {
        return images.map((image, index) => {
            const active = activeIndex === index;
            return (
                <CarouselCardImage key={index} src={image} active={active}/>
            );
        });
    };
    
    const activeCardStyle: React.CSSProperties = {
        zIndex: 2
    };

    const neighbourCardStyle: React.CSSProperties = {
        bottom: "10%",
        left: indexOffset * 102 + "%",
        top: "10%",
        zIndex: 1
    };

    const offScreenCardStyle: React.CSSProperties = {
        bottom: "20%",
        left: indexOffset * 102 + "%",
        opacity: 0,
        top: "20%",
        transitionProperty: "bottom, left, top, opacity, z-index",
        zIndex: 0
    };

    let containerStyle: React.CSSProperties;
    if (indexOffset === 0) {
        containerStyle = activeCardStyle;
    }
    else if (Math.abs(indexOffset) === 1) {
        containerStyle = neighbourCardStyle;
    }
    else {
        containerStyle = offScreenCardStyle;
    }

    return (
        <CardContainer style={containerStyle} onClick={onClick}>
            {getImages()}
        </CardContainer>
    );
};

const defaultProps = {
    onClick: (): void => { return; }
};

export default withDefaultProps(defaultProps, CarouselCard);
