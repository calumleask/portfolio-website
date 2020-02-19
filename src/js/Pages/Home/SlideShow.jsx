import React from "react";
import styled from "styled-components";

import { firstSlideIndexFromGroupIndex, slides, groupSlides } from "src/Pages/Home/SlideShowData";

import SlideShowImage from "src/Pages/Home/SlideShowImage.jsx";
import CircleButton from "src/Pages/Home/CircleButton.jsx";
import SlideShowDots from "src/Pages/Home/SlideShowDots.jsx";
import SlideShowText from "src/Pages/Home/SlideShowText.jsx";

import ResponsiveLayout from "src/components/ResponsiveLayout";

import { device } from "src/helpers/devices.js";

const SlideShowContainer = styled.div`
    margin: 0 auto;
    position: relative;
    text-align: center;
    width: 90%;

    @media ${device.tablet} {
        width: 100%;
    }
`;

const ImageContainer = styled.div`
    display: inline-block;
    margin: 0 auto;
    position: relative;
    max-width: 640px;
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
                <ResponsiveLayout
                        breakpoint={device.size.tablet}
                        renderDesktop={() => (
                            <ImageContainer>
                                {this._getImagesToRender()}
                                <CircleButton onClick={() => this._onArrowClick(-1)} style={{left: "-45px"}}>{left}</CircleButton>
                                <CircleButton onClick={() => this._onArrowClick(1)} style={{right: "-45px"}}>{right}</CircleButton>
                            </ImageContainer>
                        )}
                        renderMobile={() => (
                            <MobileCarousel activeIndex={activeIndex} onTransitionEnd={this._onSlideTransitionEnd}/>
                        )}
                    />
                <SlideShowDots active={groupIndex} count={groupCount} onClick={this._onDotClick}/>
                <SlideShowText title={title} description={description}/>
            </SlideShowContainer>
        );
    }
}

class MobileCarousel extends React.Component {

    render () {
        const { activeIndex, onTransitionEnd } = this.props;
        const activeSlide = slides[activeIndex];

        const activeGroupIndex = activeSlide.groupIndex;
        const groupCount = groupSlides.length;

        let nextGroupIndex = activeGroupIndex + 1;
        if (nextGroupIndex >= groupCount) nextGroupIndex = 0;

        let prevGroupIndex = activeGroupIndex - 1;
        if (prevGroupIndex < 0) prevGroupIndex = groupCount - 1;

        const prevStyle = {
            height: "80%",
            left: "-102%",
            opacity: 1,
            top: "10%"
        };
        
        const nextStyle = {
            height: "80%",
            left: "102%",
            opacity: 1,
            top: "10%"
        };

        return (
            <ImageContainer>
                
                {
                    groupSlides.map((group, groupIndex) => {
                        let style = {};
                        if (groupIndex === prevGroupIndex) style = prevStyle;
                        if (groupIndex === nextGroupIndex) style = nextStyle;
                        return (
                            <GroupDiv key={groupIndex}>
                            {
                                group.slides.map((slide, index) => {
                                    const isActive = slide.slideId === this.props.activeIndex;
                                    return <SlideShowImage style={style} key={index} isActive={isActive} src={slide.imgSrc} onTransitionEnd={onTransitionEnd}/>;
                                })
                            }
                            </GroupDiv>
                        )
                    })
                }
            </ImageContainer>
        );
    }
}

const GroupDiv = styled.div`
    height: 100%;
`;