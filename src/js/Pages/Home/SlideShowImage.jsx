import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
    position: absolute;
    transition-property: opacity;
    transition-timing-function: ease-in;
    left: 0;
    top: 0;
    width: 100%
`;

class SlideShowImage extends React.Component {
    
    render() {
        const { style, isActive, src, onTransitionEnd } = this.props;

        const defaultStyle = {
            opacity: isActive ? 1 : 0,
            position: isActive ? "relative" : "absolute",
            transitionDelay: isActive ? "0s" : "0.5s",
            transitionDuration: isActive ? "0.5s" : "0s",
            zIndex: isActive ? 1 : 0
        };

        return (
            <Image src={src} style={{ ...defaultStyle, ...style }} onTransitionEnd={() => onTransitionEnd(isActive)}/>
        );
    }
}

SlideShowImage.defaultProps = {
    style: {}
};

SlideShowImage.propTypes = {
    isActive: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onTransitionEnd: PropTypes.func
};

export default SlideShowImage;