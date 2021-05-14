import React from "react";
import styled from "styled-components";

import { withDefaultProps } from "@helpers/withDefaultProps";

const MaxBounds = styled.div`
    margin: 40px auto;
`;

const ResponsiveContainer = styled.div`
    overflow: hidden;
    position: relative;
`;

const IFrame = styled.iframe`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

const getAspectRatioPercent = (aspect: string): number => {
    const widthHeight = aspect.split(":");
    const width = parseInt(widthHeight[0]);
    const height = parseInt(widthHeight[1]);
    return 100 * height / width;
};

type ResponsiveIFrameProps = {
    aspect: string;
    maxWidth: string;
    src: string;
};

const ResponsiveIFrame: React.FC<ResponsiveIFrameProps> = (props: ResponsiveIFrameProps) => {
    const { maxWidth, aspect , src } = props;

    const maxBoundsStyle: React.CSSProperties = {
        maxWidth: maxWidth + "px"
    };

    const responsiveStyle: React.CSSProperties = {
        paddingTop: getAspectRatioPercent(aspect) + "%"
    };

    return (
        <MaxBounds style={maxBoundsStyle}>
            <ResponsiveContainer style={responsiveStyle}>
                <IFrame src={src} frameBorder="0" allowFullScreen/>
            </ResponsiveContainer>
        </MaxBounds>
    );
};

const defaultProps = {
    aspect: "16:9",
    maxWidth: "560"
};

export default withDefaultProps(defaultProps, ResponsiveIFrame);
