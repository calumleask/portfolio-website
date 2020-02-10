import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    margin: 20px auto;
`;

const Caption = styled.figcaption`
    margin: 10px auto;
`;

class Image extends React.Component {

    _getImages() {
        const { alt, src, width, maxWidth } = this.props;

        const style = {
            margin: "5px",
            width: width,
            maxWidth: maxWidth
        };

        if (Array.isArray(src)) {
            return src.map((imgSrc, index) => {
                return <img key={index} alt={alt} style={style} src={imgSrc}/>;
            });
        }
        return <img alt={alt} style={style} src={src}/>;
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
    maxWidth: null,
    width: null
};

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    caption: PropTypes.oneOfType([
        null,
        PropTypes.string
    ]).isRequired,
    width: PropTypes.oneOfType([
        null,
        PropTypes.string
    ]).isRequired,
    maxWidth: PropTypes.oneOfType([
        null,
        PropTypes.string
    ]).isRequired,
    src: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired
};

export default Image;