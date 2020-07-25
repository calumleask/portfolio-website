import React from "react";
import styled from "styled-components";

import { device } from "@helpers/devices";

const H1 = styled.h1`
    font-size: 1.5em;
    margin: 20px 0;

    @media ${device.mobileL} {
        font-size: 1.75em;
    }

    @media ${device.tablet} {
        font-size: 2em;
    }
`;

const P = styled.p`
    text-align: center;

    @media ${device.mobileL} {
        font-size: 1.2em;
    }

    @media ${device.tablet} {
        font-size: 1.3em;
    }
`;

type SlideShowTextProps = {
    description: string;
    title: string;
};

const SlideShowText: React.FC<SlideShowTextProps> = (props: SlideShowTextProps) => {
    const { title, description } = props;

    return (
        <>
            <H1>{title}</H1>
            <P>{description}</P>
        </>
    );
};

export default SlideShowText;
