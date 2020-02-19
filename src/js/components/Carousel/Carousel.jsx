import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { groupSlides } from "src/Pages/Home/SlideShowData";

import CarouselCard from "src/components/Carousel/CarouselCard.jsx";

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

    constructor(props) {
        super(props);

        this.state = {
            activeGroupIndex: 0
        };

        this._canTransition = true;
        this._cycleImageInterval = null;

        this._cycleImage = this._cycleImage.bind(this);
        this._onSlideTransitionEnd = this._onSlideTransitionEnd.bind(this);
    }

    componentDidMount() {
        this._cycleImageInterval = setInterval(this._cycleImage, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this._cycleImageInterval);
    }

    _cycleImage() {
        this._transitionToSlide(this.state.activeGroupIndex + 1);
    }

    _onSlideTransitionEnd(isActive) {
        if (isActive) {
            this._canTransition = true;
        }
    }

    _transitionToSlide(newIndex) {
        const groupCount = groupSlides.length;
        if (newIndex >= groupCount) newIndex -= groupCount;
        if (newIndex < 0) newIndex += groupCount;
        this.setState({ activeGroupIndex: newIndex });

        this._canTransition = false;
    }

    render () {
        const { activeGroupIndex } = this.state;
        const groupCount = groupSlides.length;

        return (
            <ImageContainer>
                {
                    groupSlides.map((group, groupIndex) => {
                        let indexOffset = 0
                        if (groupIndex < activeGroupIndex) {
                            const wrapAroundActiveIndex = activeGroupIndex - groupCount;
                            let wrapAroundIndexOffset = groupIndex - wrapAroundActiveIndex;
                            indexOffset = closestToZero(wrapAroundIndexOffset, groupIndex - activeGroupIndex);
                        }
                        else if (groupIndex > activeGroupIndex) {
                            const wrapAroundActiveIndex = groupCount + activeGroupIndex;
                            let wrapAroundIndexOffset = groupIndex - wrapAroundActiveIndex;
                            indexOffset = closestToZero(wrapAroundIndexOffset, groupIndex - activeGroupIndex);
                        }
                        const isActive = indexOffset === 0;
                        return <CarouselCard key={groupIndex} indexOffset={indexOffset} images={group.images} interval={2000} cycle={isActive}/>;
                    })
                }
            </ImageContainer>
        );
    }
}

Carousel.propTypes = {
    interval: PropTypes.number.isRequired
};

export default Carousel;