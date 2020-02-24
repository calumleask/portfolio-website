import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Caption = styled.figcaption`
    margin: 5px auto 0 auto;
`;

class Image extends React.Component {

    render() {
        const { alt, caption, src, width, maxWidth, style } = this.props;

        const defaultImgStyle = {
            width: width,
            maxWidth: maxWidth
        };

        const imgStyle = { ...defaultImgStyle, ...style };

        const captionOrNull = caption ? <Caption>{caption}</Caption> : null;
        return (
            <>
                <img alt={alt} style={imgStyle} src={src}/>
                {captionOrNull}
            </>
        );
    }
}

Image.defaultProps = {
    alt: "",
    caption: null,
    maxWidth: null,
    width: "100%",
    style: {}
};

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    caption: PropTypes.string,
    width: PropTypes.string,
    maxWidth: PropTypes.string,
    src: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
};

export default Image;