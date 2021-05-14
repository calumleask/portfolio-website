import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { IconType } from "react-icons";

import NavLinkText from "./NavLinkText";

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
    text: string;
    to: string;
    Icon?: IconType;
};

const NavLink: React.FC<NavLinkProps> = ({ active, text, to, Icon }: NavLinkProps) => {
    const textColor = active ? color.navTextSelected : color.navText;
    const svgStyle: React.CSSProperties = {
        display: "inline-block",
        verticalAlign: "middle",
        height: "30px",
        width: "30px"
    };
    if (active) {
        svgStyle.transform = "none";
    }
    
    return (
        <StlyedLink to={to}>
            {Icon
                ? <Icon color={textColor} style={svgStyle}/>
                : <NavLinkText active={active} color={textColor}>{text}</NavLinkText>
            }
        </StlyedLink>
    );
};

export default NavLink;
