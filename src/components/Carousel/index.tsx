import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CarouselCard from "./components/CarouselCard";

const ImageContainer = styled.div`
    display: inline-block;
    margin: 0 auto;
    max-width: 640px;
    padding-top: 56.25%;
    position: relative;
    width: 100%;
`;

const closestToZero = (a: number, b: number): number => {
    const absA = Math.abs(a);
    const absB = Math.abs(b);
    if (absB < absA) {
        return b;
    }
    return a;
};

type CarouselProps = {
    activeIndex: number;
    data: {
        images: string[];
    }[];
    interval: number;
    onCycle: (newIndex: number) => void;
};

const Carousel: React.FC<CarouselProps> = ({ activeIndex, data, interval, onCycle }: CarouselProps) => {
    const [timeoutId, setTimeoutId] = useState(-1);

    useEffect(() => {
        return (): void => {
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        clearTimeout(timeoutId);
        const id = setTimeout(cycleCard, interval);
        setTimeoutId(id);
    }, [activeIndex]);

    const cycleCard = (): void => {
        transitionToSlide(activeIndex + 1);
    };

    const transitionToSlide = (newIndex: number): void => {
        const cardCount = data.length;
        if (newIndex >= cardCount) newIndex -= cardCount;
        if (newIndex < 0) newIndex += cardCount;
        onCycle(newIndex);
    };

    const onCardClick = (index: number): void => {
        transitionToSlide(index);
    };

    const getCarouselCards = (): React.ReactElement[] => {
        const cardCount = data.length;

        return data.map((card, index) => {
            let indexOffset = 0;
            if (index < activeIndex) {
                const wrapAroundActiveIndex = activeIndex - cardCount;
                const wrapAroundIndexOffset = index - wrapAroundActiveIndex;
                indexOffset = closestToZero(wrapAroundIndexOffset, index - activeIndex);
            }
            else if (index > activeIndex) {
                const wrapAroundActiveIndex = cardCount + activeIndex;
                const wrapAroundIndexOffset = index - wrapAroundActiveIndex;
                indexOffset = closestToZero(wrapAroundIndexOffset, index - activeIndex);
            }
            const isActive = indexOffset === 0;
            return <CarouselCard key={index} indexOffset={indexOffset} images={card.images} interval={2000} cycle={isActive} onClick={(): void => { onCardClick(index); }}/>;
        });
    };

    return (
        <ImageContainer>
            {getCarouselCards()}
        </ImageContainer>
    );
};

export default Carousel;
