import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
    height: 100%;
    left: 0;
    opacity: 1;
    position: absolute;
    top: 0;
    width: 100%;
`;

class CarouselCardContainer extends React.Component {
    
    render() {
        const { indexOffset, src, onTransitionEnd } = this.props;
        const isActive = indexOffset === 0;

        const activeStyle = {
            transitionDuration: "1s",
            transitionProperty: "top, left, height",
            transitionTimingFunction: "ease",
            zIndex: 2
        };

        const neighbourStyle = {
            height: "80%",
            left: indexOffset * 102 + "%",
            top: "10%",
            transitionDuration: "1s",
            transitionProperty: "top, left, height",
            transitionTimingFunction: "ease",
            zIndex: 1
        };

        const offScreenStyle = {
            left: indexOffset * 102 + "%",
            height: "60%",
            opacity: 0,
            top: "20%",
            transitionDuration: "1s",
            transitionProperty: "opacity, top, left, height",
            transitionTimingFunction: "ease",
            zIndex: 0
        };

        let actualStyle = {};
        if (indexOffset === 0) {
            actualStyle = activeStyle;
        }
        else if (Math.abs(indexOffset) === 1) {
            actualStyle = neighbourStyle;
        }
        else {
            actualStyle = offScreenStyle;
        }


        return (
            <Image src={src} style={actualStyle} onTransitionEnd={() => onTransitionEnd(isActive)}/>
        );
    }
}

CarouselCardContainer.propTypes = {
    indexOffset: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    onTransitionEnd: PropTypes.func
};

export default CarouselCardContainer;