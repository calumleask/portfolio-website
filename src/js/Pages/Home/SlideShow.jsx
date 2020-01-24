import React from "react";
import styled from "styled-components";

import { firstSlideIndexFromGroupIndex, slides } from "~/Pages/Home/SlideShowData";

import SlideShowImage from "~/Pages/Home/SlideShowImage.jsx";
import SlideShowDots from "~/Pages/Home/SlideShowDots.jsx";

const SlideShowContainer = styled.div`
    margin-bottom: 40px;
    position: relative;
    text-align: center;
    width: 100%;
`;

const ImageContainer = styled.div`
    display: inline-block;
    margin: 0 auto;
    position: relative;
	width: 640px;
	height: 360px;
`;

const ArrowButton = styled.button`
    background-color: #f00;
    border: 0;
    cursor: pointer;
    display: inline-block;
    line-height: 0;
    margin: auto 10px;
    outline: 0;
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    z-index: 11;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
`;

const PrevArrow = styled(ArrowButton)`
    left: 0;
`;

const NextArrow = styled(ArrowButton)`
    right: 0;
`;

export default class SlideShow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            prevIndex: 0,
            activeIndex: 0
        };

        this._canTransition = true;
        this._cycleImageInterval = null;

        this._cycleImage = this._cycleImage.bind(this);
        this._onSlideTransitionEnd = this._onSlideTransitionEnd.bind(this);
        this._onDotClick = this._onDotClick.bind(this);
    }

    componentDidMount() {
        this._cycleImageInterval = setInterval(this._cycleImage, 3000);
    }

    componentWillUnmount() {
        clearInterval(this._cycleImageInterval);
    }

    _cycleImage() {
        this._transitionToSlide(this.state.activeIndex + 1);
    }

    _onSlideTransitionEnd(isActive) {
        if (isActive) {
            this._canTransition = true;
        }
    }

    _transitionToSlide(newIndex) {
        const oldIndex = this.state.activeIndex;
        const numImages = slides.length;
        if (newIndex >= numImages) newIndex -= numImages;
        if (newIndex < 0) newIndex += numImages;
        this.setState({
            prevIndex: oldIndex,
            activeIndex: newIndex
        });

        this._canTransition = false;
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

    _getImagesToRender() {
        return slides.map((slide, index) => {
            const isActive = index === this.state.activeIndex;
            return <SlideShowImage
                        key={index}
                        isActive={isActive}
                        src={slide.imgSrc}
                        onTransitionEnd={this._onSlideTransitionEnd}
                        />;
        });
    }

    render() {
        const activeGroupIndex = slides[this.state.activeIndex].groupIndex;
        const groupCount = slides[slides.length - 1].groupIndex + 1;

        return (
            <SlideShowContainer>
                <ImageContainer>
                    {this._getImagesToRender()}
                </ImageContainer>
                <PrevArrow onClick={() => this._onArrowClick(-1)}/>
                <NextArrow onClick={() => this._onArrowClick(1)}/>
                <SlideShowDots active={activeGroupIndex} count={groupCount} onClick={this._onDotClick}/>
            </SlideShowContainer>
        );
    }
}