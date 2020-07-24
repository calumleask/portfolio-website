import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import NavLinkText from "./NavLinkText";
import SvgIcon from "@components/SvgIcon";

import { color } from "@style/colors";

const StlyedLink = styled(Link)`
    text-decoration: none;
    
    &:hover {
        text-decoration: none;
        svg {
            transform: scale(1.1, 1.1);
            transform-origin: center;
        }
    }
`;

type NavLinkProps = {
    active: boolean;
    svg?: {
        path: string;
        viewBox: string;
    };
    text?: string;
    to: string;
};

const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
    const { active, text, to, svg } = props;

    const textColor = active ? color.navTextSelected : color.navText;
    const svgStyle: React.CSSProperties = {
        height: "30px",
        width: "30px"
    };
    if (active) {
        svgStyle.transform = "none";
    }
    
    const svgElement = svg ? <SvgIcon viewBox={svg.viewBox} color={textColor} path={svg.path} style={svgStyle}/> : null;
    const textElement = text ? <NavLinkText active={active} color={textColor}>{text}</NavLinkText> : null;

    return (
        <StlyedLink to={to}>
            {svgElement}
            {textElement}
        </StlyedLink>
    );
};

export default NavLink;
