import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Svg = styled.svg`
    display: inline-block;
    margin: 0 5px 0 5px;
	width: 16px;
    height: 16px;
	vertical-align: middle;
`;

class Icon extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { viewBox, fill, path } = this.props;

        return (
            <span>
                <Svg viewBox={viewBox}>
                    <path fill={fill} d={path}/>
                </Svg>
            </span>
        );
    }
}

Icon.propTypes = {
    viewBox: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

export default Icon;