import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { slides, groupSlides } from "src/Pages/Home/SlideShowData";

import CarouselCardContainer from "src/components/Carousel/CarouselCardContainer.jsx";

const GroupDiv = styled.div`
    height: 100%;
`;

const ImageContainer = styled.div`
    display: inline-block;
    margin: 0 auto;
    max-width: 640px;
    padding-top: 56.25%;
    position: relative;
    width: 100%;
`;

const closestToZero = (a, b) => {
    const absA = Math.abs(a);
    const absB = Math.abs(b);
    if (absB < absA) {
        return b;
    }
    return a;
};

class Carousel extends React.Component {

    getSlides

    render () {
        const { activeIndex, onTransitionEnd } = this.props;
        const activeSlide = slides[activeIndex];
        const slideCount = slides.length;

        const activeGroupIndex = activeSlide.groupIndex;
        const groupCount = groupSlides.length;

        let nextGroupIndex = activeGroupIndex + 1;
        if (nextGroupIndex >= groupCount) nextGroupIndex = 0;

        let prevGroupIndex = activeGroupIndex - 1;
        if (prevGroupIndex < 0) prevGroupIndex = groupCount - 1;

        let nextSlideIndex = activeIndex + 1;
        if (nextSlideIndex >= groupCount) nextSlideIndex = 0;

        let prevSlideIndex = activeIndex - 1;
        if (prevSlideIndex < 0) prevSlideIndex = slideCount - 1;

        return (
            <ImageContainer>
                {
                    slides.map((slide, slideIndex) => {
                        let indexOffset = 0
                        if (slideIndex < activeIndex) {
                            const wrapAroundActiveIndex = activeIndex - slideCount;
                            let wrapAroundIndexOffset = slideIndex - wrapAroundActiveIndex;
                            indexOffset = closestToZero(wrapAroundIndexOffset, slideIndex - activeIndex);
                        }
                        else if (slideIndex > activeIndex) {
                            const wrapAroundActiveIndex = slideCount + activeIndex;
                            let wrapAroundIndexOffset = slideIndex - wrapAroundActiveIndex;
                            indexOffset = closestToZero(wrapAroundIndexOffset, slideIndex - activeIndex);
                        }
                        return <CarouselCardContainer key={slideIndex} indexOffset={indexOffset} src={slide.imgSrc} onTransitionEnd={onTransitionEnd}/>;
                    })
                }
            </ImageContainer>
        );
    }
}

Carousel.defaultProps = {
};

Carousel.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onTransitionEnd: PropTypes.func
};

export default Carousel;