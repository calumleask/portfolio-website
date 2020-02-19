import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CarouselCardImage from "src/components/Carousel/CarouselCardImage.jsx";

const CardContainer = styled.div`
    bottom: 0;
    left: 0;
    opacity: 1;
    position: absolute;
    top: 0;
    transition-duration: 1s;
    transition-property: bottom, left, top;
    transition-timing-function: ease;
    width: 100%;
`;

class CarouselCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cycle: props.cycle,
            activeIndex: 0
        };

        this._cycleImageInterval = null;

        this._cycleImage = this._cycleImage.bind(this);
    }

    componentDidMount() {
        this._cycleImageInterval = setInterval(this._cycleImage, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this._cycleImageInterval);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.cycle !== prevState.cycle) {
            return { cycle: nextProps.cycle };
        }
        return null;
    }

    _cycleImage() {
        this._transitionToSlide(this.state.activeIndex + 1);
    }

    _transitionToSlide(newIndex) {
        if (!this.props.cycle) return;
        const imageCount = this.props.images.length;
        if (newIndex >= imageCount) newIndex -= imageCount;
        if (newIndex < 0) newIndex += imageCount;
        this.setState({ activeIndex: newIndex });

        this._canTransition = false;
    }

    _getImages() {
        const { images } = this.props;
        return images.map((image, index) => {
            const active = this.state.activeIndex === index;
            return (
                <CarouselCardImage key={index} src={image} active={active}/>
            );
        });
    }
    
    render() {
        const { indexOffset } = this.props;

        const activeCardStyle = {
            zIndex: 2
        };

        const neighbourCardStyle = {
            bottom: "10%",
            left: indexOffset * 102 + "%",
            top: "10%",
            zIndex: 1
        };

        const offScreenCardStyle = {
            bottom: "20%",
            left: indexOffset * 102 + "%",
            opacity: 0,
            top: "20%",
            transitionProperty: "bottom, left, top, opacity, z-index",
            zIndex: 0
        };

        let containerStyle = {};
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
            <CardContainer style={containerStyle}>
                {this._getImages()}
            </CardContainer>
        );
    }
}

CarouselCard.propTypes = {
    cycle: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    indexOffset: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired
};

export default CarouselCard;