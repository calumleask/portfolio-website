import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

class ResponsiveIFrame extends React.Component {

    _getAspectRatio(aspect) {
        const widthHeight = aspect.split(":");
        const width = parseInt(widthHeight[0]);
        const height = parseInt(widthHeight[1]);
        return 100 * height / width;
    }

    render() {
        const { maxWidth, aspect, src } = this.props;

        const maxBoundsstyle = {
            maxWidth: maxWidth + "px"
        };

        const responsiveStyle = {
            paddingTop: this._getAspectRatio(aspect) + "%"
        };

        return (
            <MaxBounds style={maxBoundsstyle}>
                <ResponsiveContainer style={responsiveStyle}>
                    <IFrame src={src} frameBorder="0" allowFullScreen/>
                </ResponsiveContainer>
            </MaxBounds>
        );
    }
}

ResponsiveIFrame.defaultProps = {
    aspect: "16:9",
    maxWidth: "560"
};

ResponsiveIFrame.propTypes = {
    maxWidth: PropTypes.string.isRequired,
    aspect: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
};

export default ResponsiveIFrame;