import React, { useEffect } from "react";
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

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
    const { activeIndex, interval } = props;

    let cycleTimeout: number;

    useEffect(() => {
        cycleTimeout = setTimeout(cycleCard, interval);
        return (): void => {
            clearTimeout(cycleTimeout);
        };
    }, []);

    useEffect(() => {
        clearTimeout(cycleTimeout);
        cycleTimeout = setTimeout(cycleCard, interval);
    }, [activeIndex]);

    const cycleCard = (): void => {
        transitionToSlide(activeIndex + 1);
    };

    const transitionToSlide = (newIndex: number): void => {
        const { data, onCycle } = props;
        const cardCount = data.length;
        if (newIndex >= cardCount) newIndex -= cardCount;
        if (newIndex < 0) newIndex += cardCount;
        onCycle(newIndex);
    };

    const onCardClick = (index: number): void => {
        transitionToSlide(index);
    };

    const getCarouselCards = (): React.ReactElement[] => {
        const { data } = props;
        const cardCount = data.length;

        return data.map((card, cardIndex) => {
            let indexOffset = 0;
            if (cardIndex < activeIndex) {
                const wrapAroundActiveIndex = activeIndex - cardCount;
                const wrapAroundIndexOffset = cardIndex - wrapAroundActiveIndex;
                indexOffset = closestToZero(wrapAroundIndexOffset, cardIndex - activeIndex);
            }
            else if (cardIndex > activeIndex) {
                const wrapAroundActiveIndex = cardCount + activeIndex;
                const wrapAroundIndexOffset = cardIndex - wrapAroundActiveIndex;
                indexOffset = closestToZero(wrapAroundIndexOffset, cardIndex - activeIndex);
            }
            const isActive = indexOffset === 0;
            return <CarouselCard key={cardIndex} indexOffset={indexOffset} images={card.images} interval={2000} cycle={isActive} onClick={(): void => { onCardClick(cardIndex); }}/>;
        });
    };

    return (
        <ImageContainer>
            {getCarouselCards()}
        </ImageContainer>
    );
};

export default Carousel;
