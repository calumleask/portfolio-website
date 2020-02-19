import React from "react";
import styled from "styled-components";

import { firstSlideIndexFromGroupIndex, slides } from "src/Pages/Home/SlideShowData";

import SlideShowDots from "src/Pages/Home/SlideShowDots.jsx";
import SlideShowText from "src/Pages/Home/SlideShowText.jsx";
import Carousel from "src/components/Carousel/Carousel.jsx";

import { device } from "src/helpers/devices.js";
import { color } from "css/colors.js";

const SlideShowContainer = styled.div`
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

const CarouselContainer = styled.div`
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
    }

    _tryTransitionOnInteraction(newIndex) {
        if (!this._canTransition) return;
        clearInterval(this._cycleImageInterval);
        this._transitionToSlide(newIndex);
        this._cycleImageInterval = setInterval(this._cycleImage, 3000);
    }

    _onArrowClick(delta) {
        this._tryTransitionOnInteraction(this.state.activeIndex + delta);
    }

    _onDotClick(groupIndex) {
        const newIndex = firstSlideIndexFromGroupIndex(groupIndex);
        this._tryTransitionOnInteraction(newIndex);
    }

    render() {
        const { activeIndex } = this.state;
        const { title, description, groupIndex } = slides[activeIndex];
        const groupCount = slides[slides.length - 1].groupIndex + 1;

        return (
            <SlideShowContainer>
                <CarouselContainer>
                    <Carousel interval={8000}/>
                    <EdgeFadeOverlay/>
                </CarouselContainer>
                <SlideShowDots active={groupIndex} count={groupCount} onClick={this._onDotClick}/>
                <SlideShowText title={title} description={description}/>
            </SlideShowContainer>
        );
    }
}