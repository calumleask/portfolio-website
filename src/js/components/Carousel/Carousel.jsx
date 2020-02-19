import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
            activeIndex: props.activeIndex
        };

        this._cycleTimeout = null;

        this._cycleCard = this._cycleCard.bind(this);
    }

    componentDidMount() {
        this._cycleTimeout = setTimeout(this._cycleCard, this.props.interval);
    }

    componentWillUnmount() {
        clearTimeout(this._cycleTimeout);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.activeIndex !== prevState.activeIndex) {
            return { activeIndex: nextProps.activeIndex };
        }
        return null;
    }

    componentDidUpdate(nextProps, prevState) {
        if (prevState.activeIndex !== this.state.activeIndex) {
            clearTimeout(this._cycleTimeout);
            this._cycleTimeout = setTimeout(this._cycleCard, this.props.interval);
        }
    }

    _cycleCard() {
        this._transitionToSlide(this.state.activeIndex + 1);
    }

    _transitionToSlide(newIndex) {
        const { data, onCycle } = this.props;
        const cardCount = data.length;
        if (newIndex >= cardCount) newIndex -= cardCount;
        if (newIndex < 0) newIndex += cardCount;
        onCycle(newIndex);
    }

    render () {
        const { data } = this.props;
        const { activeIndex } = this.state;
        const cardCount = data.length;

        return (
            <ImageContainer>
                {
                    data.map((card, cardIndex) => {
                        let indexOffset = 0;
                        if (cardIndex < activeIndex) {
                            const wrapAroundActiveIndex = activeIndex - cardCount;
                            let wrapAroundIndexOffset = cardIndex - wrapAroundActiveIndex;
                            indexOffset = closestToZero(wrapAroundIndexOffset, cardIndex - activeIndex);
                        }
                        else if (cardIndex > activeIndex) {
                            const wrapAroundActiveIndex = cardCount + activeIndex;
                            let wrapAroundIndexOffset = cardIndex - wrapAroundActiveIndex;
                            indexOffset = closestToZero(wrapAroundIndexOffset, cardIndex - activeIndex);
                        }
                        const isActive = indexOffset === 0;
                        return <CarouselCard key={cardIndex} indexOffset={indexOffset} images={card.images} interval={2000} cycle={isActive}/>;
                    })
                }
            </ImageContainer>
        );
    }
}

Carousel.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,
    interval: PropTypes.number.isRequired,
    onCycle: PropTypes.func.isRequired
};

export default Carousel;