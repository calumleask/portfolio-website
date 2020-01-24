import React from "react";
import styled from "styled-components";

import { slideShowImages } from "~/Pages/Home/SlideShowImages";

const Image = styled.img`
    width: 50%;
`;

export default class SlideShow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image src={slideShowImages.AMPS_0}/>
        );
    }
}