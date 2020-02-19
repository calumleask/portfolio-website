import React from "react";
import styled from "styled-components";

import { carouselProjectCards } from "src/Pages/Home/SlideShowData";

import SlideShowDots from "src/Pages/Home/SlideShowDots.jsx";
import SlideShowText from "src/Pages/Home/SlideShowText.jsx";
import Carousel from "src/components/Carousel/Carousel.jsx";

import { device } from "src/helpers/devices.js";
import { color } from "css/colors.js";

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

export default class SlideShow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        };

        this._canTransition = true;

        this._onDotClick = this._onDotClick.bind(this);
        this._onCarouselCycle = this._onCarouselCycle.bind(this);
    }

    _tryTransitionOnInteraction(index) {
        this.setState({ activeIndex: index });
    }

    _onDotClick(index) {
        this._tryTransitionOnInteraction(index);
    }

    _onCarouselCycle(newIndex) {
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        const projectCount = carouselProjectCards.length;
        const { title, description } = carouselProjectCards[activeIndex];

        return (
            <>
                <CarouselContainer>
                    <MaxBoundsContainer>
                        <Carousel activeIndex={activeIndex} interval={4000} onCycle={this._onCarouselCycle} data={carouselProjectCards}/>
                    </MaxBoundsContainer>
                    <EdgeFadeOverlay/>
                </CarouselContainer>
                <SlideShowDots active={activeIndex} count={projectCount} onClick={this._onDotClick}/>
                <SlideShowText title={title} description={description}/>
            </>
        );
    }
}