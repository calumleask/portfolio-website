import React from "react";
import styled from "styled-components";

import { firstSlideIndexFromGroupIndex, slides } from "~/Pages/Home/SlideShowData";

import SlideShowImage from "~/Pages/Home/SlideShowImage.jsx";
import CircleButton from "~/Pages/Home/CircleButton.jsx";
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
            return <SlideShowImage key={index} isActive={isActive} src={slide.imgSrc} onTransitionEnd={this._onSlideTransitionEnd}/>;
        });
    }

    render() {
        const activeGroupIndex = slides[this.state.activeIndex].groupIndex;
        const groupCount = slides[slides.length - 1].groupIndex + 1;
        const left = "\u2b9c";
        const right = "\u2b9e";

        return (
            <SlideShowContainer>
                <ImageContainer>
                    {this._getImagesToRender()}
                </ImageContainer>
                <CircleButton onClick={() => this._onArrowClick(-1)} style={{left: 0}}>{left}</CircleButton>
                <CircleButton onClick={() => this._onArrowClick(1)} style={{right: 0}}>{right}</CircleButton>
                <SlideShowDots active={activeGroupIndex} count={groupCount} onClick={this._onDotClick}/>
            </SlideShowContainer>
        );
    }
}