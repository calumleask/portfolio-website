import React, { useState } from "react";
import styled from "styled-components";

// TODO: pass in as props
import { carouselProjectCards } from "./SlideShowData";

import SlideShowDots from "./SlideShowDots";
import SlideShowText from "./SlideShowText";
import Carousel from "@components/Carousel";

import { device } from "@helpers/devices";
import { color } from "@style/colors";

const CarouselContainer = styled.div`
    margin: 0 auto;
    position: relative;
    text-align: center;
    width: 90%;

    @media ${device.tablet} {
        overflow-x: hidden;
        padding: 0 100px;
        width: 100%;
    }
`;

const MaxBoundsContainer = styled.div`
    margin: 0 auto;
    max-width: 640px;
`;

const EdgeFadeOverlay = styled.div`
    background: linear-gradient(
        90deg,
        ${color.pageBackground} 0%,
        rgba(255, 255, 255, 0) 2%,
        rgba(255, 255, 255, 0) 98%,
        ${color.pageBackground} 100%
    );

    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: none;
    
    @media ${device.tablet} {
        display: block;
    }
`;

const projectCount = carouselProjectCards.length;

const SlideShow: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const tryTransitionOnInteraction = (index: number): void => {
        setActiveIndex(index);
    };

    const onDotClick = (index: number): void => {
        tryTransitionOnInteraction(index);
    };

    const onCarouselCycle = (index: number): void => {
        setActiveIndex(index);
    };

    const { title, description } = carouselProjectCards[activeIndex];

    return (
        <>
            <CarouselContainer>
                <MaxBoundsContainer>
                    <Carousel activeIndex={activeIndex} interval={4000} onCycle={onCarouselCycle} data={carouselProjectCards}/>
                </MaxBoundsContainer>
                <EdgeFadeOverlay/>
            </CarouselContainer>
            <SlideShowDots activeIndex={activeIndex} count={projectCount} onClick={onDotClick}/>
            <SlideShowText title={title} description={description}/>
        </>
    );
};

export default SlideShow;
