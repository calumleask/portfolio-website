import React from "react";
import styled from "styled-components";

import { withDefaultProps } from "@helpers/withDefaultProps";

const Caption = styled.figcaption`
    margin: 5px auto 0 auto;
`;

type ImageProps = {
    alt?: string;
    caption?: string;
    maxWidth?: string;
    src: string;
    style: React.CSSProperties;
    width: string;
};

const Image: React.FC<ImageProps> = (props: ImageProps) => {
    const { alt, caption, maxWidth, src, style, width } = props;

    const imgStyle: React.CSSProperties = {
        width,
        maxWidth,
        ...style
    };

    return (
        <>
            <img alt={alt} style={imgStyle} src={src}/>
            {caption ? <Caption>{caption}</Caption> : null}
        </>
    );
};

const defaultProps = {
    style: {},
    width: "100%"
};

export default withDefaultProps(defaultProps, Image);
