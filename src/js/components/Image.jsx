import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    margin: 30px auto;
`;

const Caption = styled.figcaption`
    margin: 5px auto;
`;

class Image extends React.Component {

    _getImages() {
        const { alt, className, src, width, maxWidth, style } = this.props;

        const defaultStyle = {
            margin: "5px",
            width: width,
            maxWidth: maxWidth
        };

        const actualStyle = { ...defaultStyle, ...style };

        if (Array.isArray(src)) {
            return src.map((imgSrc, index) => {
                return <img key={index} className={className} alt={alt} style={actualStyle} src={imgSrc}/>;
            });
        }
        return <img className={className} alt={alt} style={actualStyle} src={src}/>;
    }

    _getCaption() {
        return this.props.caption === null ? null : <Caption>{this.props.caption}</Caption>;
    }

    render() {
        return (
            <Container>
                {this._getImages()}
                {this._getCaption()}
            </Container>
        );
    }
}

Image.defaultProps = {
    alt: "",
    caption: null,
    className: null,
    maxWidth: null,
    width: null,
    style: {}
};

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    caption: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.string,
    maxWidth: PropTypes.string,
    src: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    style: PropTypes.object.isRequired
};

export default Image;