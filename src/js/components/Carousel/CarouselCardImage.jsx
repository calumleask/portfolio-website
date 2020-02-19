import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition-property: opacity;
    transition-timing-function: ease-in;
    width: 100%;
`;

class CarouselCardImage extends React.Component {
    
    render() {
        const { active, src } = this.props;

        const style = {
            opacity: active ? 1 : 0,
            transitionDelay: active ? "0s" : "1.0s",
            transitionDuration: active ? "1.0s" : "0s",
            zIndex: active ? 1 : 0
        };

        return (
            <Image src={src} style={style}/>
        );
    }
}

CarouselCardImage.propTypes = {
    active: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired
};

export default CarouselCardImage;