import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { device } from "src/helpers/devices.js";

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

class SlideShowText extends React.Component {
    
    render() {
        const { title, description } = this.props;

        return (
            <>
                <H1>{title}</H1>
                <P>{description}</P>
            </>
        );
    }
}

SlideShowText.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default SlideShowText;