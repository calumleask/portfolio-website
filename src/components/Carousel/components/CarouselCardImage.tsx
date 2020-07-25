import React from "react";
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

type CarouselCardImageProps = {
    active: boolean;
    src: string;
};

const CarouselCardImage: React.FC<CarouselCardImageProps> = (props: CarouselCardImageProps) => {
    const { active, src } = props;

    const style: React.CSSProperties = {
        opacity: active ? 1 : 0,
        transitionDelay: active ? "0s" : "1.0s",
        transitionDuration: active ? "1.0s" : "0s",
        zIndex: active ? 1 : 0
    };

    return (
        <Image src={src} style={style}/>
    );
};

export default CarouselCardImage;
