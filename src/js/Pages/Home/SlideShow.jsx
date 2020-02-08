import React from "react";
import styled from "styled-components";

import { firstSlideIndexFromGroupIndex, slides } from "src/Pages/Home/SlideShowData";

import SlideShowImage from "src/Pages/Home/SlideShowImage.jsx";
import CircleButton from "src/Pages/Home/CircleButton.jsx";
import SlideShowDots from "src/Pages/Home/SlideShowDots.jsx";
import SlideShowText from "src/Pages/Home/SlideShowText.jsx";

const SlideShowContainer = styled.div`
    position: relative;
    text-align: center;
    width: 100%;
`;

const ImageContainer = styled.div`
    display: inline-block;
    margin: 0 auto;
    position: relative;
    max-width: 640px;
    width: 80%;
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
        const { activeIndex } = this.state;
        const { title, description, groupIndex } = slides[activeIndex];
        const groupCount = slides[slides.length - 1].groupIndex + 1;
        const left = "\u2b9c";
        const right = "\u2b9e";

        return (
            <SlideShowContainer>
                <ImageContainer>
                    {this._getImagesToRender()}
                    <CircleButton onClick={() => this._onArrowClick(-1)} style={{left: "-45px"}}>{left}</CircleButton>
                    <CircleButton onClick={() => this._onArrowClick(1)} style={{right: "-45px"}}>{right}</CircleButton>
                </ImageContainer>
                <SlideShowDots active={groupIndex} count={groupCount} onClick={this._onDotClick}/>
                <SlideShowText title={title} description={description}/>
            </SlideShowContainer>
        );
    }
}