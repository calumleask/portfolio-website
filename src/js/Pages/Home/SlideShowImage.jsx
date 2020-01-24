import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
    position: absolute;
    transition-property: opacity;
    transition-timing-function: ease-in;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

class SlideShowImage extends React.Component {
    
    render() {
        const { isActive, src, onTransitionEnd } = this.props;

        const style = {
            opacity: isActive ? 1 : 0,
            transitionDelay: isActive ? "0s" : "0.5s",
            transitionDuration: isActive ? "0.5s" : "0s",
            zIndex: isActive ? 1 : 0
        };

        return (
            <Image src={src} style={style} onTransitionEnd={() => onTransitionEnd(isActive)}/>
        );
    }
}

SlideShowImage.propTypes = {
    isActive: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onTransitionEnd: PropTypes.func
};

export default SlideShowImage;