import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
    display: inline-block;
	vertical-align: middle;
`;

type SvgIconProps = {
    color: string;
    path: string;
    style: React.CSSProperties;
    viewBox: string;
};

const SvgIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
    const { viewBox, color, path, style } = props;

    return (
        <Svg viewBox={viewBox} style={style}>
            <path fill={color} d={path}/>
        </Svg>
    );
};

export default SvgIcon;
