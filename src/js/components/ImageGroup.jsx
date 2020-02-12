import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Image from "src/components/Image.jsx";

const Container = styled.div`
    margin: 0 auto;
`;

const Caption = styled.figcaption`
    margin: 5px auto 0 auto;
`;

class ImageGroup extends React.Component {

    getImages() {
        const { alt, src, width, maxWidth, style } = this.props;

        const defaultStyle = {
            margin: "0 5px",
            width: width,
            maxWidth: maxWidth
        };

        const actualStyle = { ...defaultStyle, ...style };

        return src.map((imgSrc, index) => {
            return <Image key={index} alt={alt} style={actualStyle} src={imgSrc}/>;
        });
    }

    render() {
        const { caption } = this.props;

        const captionOrNull = caption ? <Caption>{caption}</Caption> : null;
        return (
            <Container>
                {this.getImages()}
                {captionOrNull}
            </Container>
        );
    }
}

ImageGroup.defaultProps = {
    alt: "",
    caption: null,
    maxWidth: null,
    width: null,
    style: {}
};

ImageGroup.propTypes = {
    alt: PropTypes.string.isRequired,
    caption: PropTypes.string,
    width: PropTypes.string,
    maxWidth: PropTypes.string,
    src: PropTypes.arrayOf(PropTypes.string).isRequired,
    style: PropTypes.object.isRequired
};

export default ImageGroup;