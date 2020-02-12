import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Svg = styled.svg`
    display: inline-block;
	vertical-align: middle;
`;

class SvgIcon extends React.Component {

    render() {
        const { viewBox, color, path, style } = this.props;

        return (
            <Svg viewBox={viewBox} style={style}>
                <path fill={color} d={path}/>
            </Svg>
        );
    }
}

SvgIcon.defaultProps = {
    style: {}
};

SvgIcon.propTypes = {
    color: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    viewBox: PropTypes.string.isRequired
};

export default SvgIcon;