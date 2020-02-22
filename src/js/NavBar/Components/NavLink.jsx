import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";

import SvgIcon from "src/components/SvgIcon.jsx";
import NavLinkText from "src/NavBar/Components/NavLinkText.jsx";

import { color } from "css/colors.js";

const StlyedLink = styled(Link)`
    color: ${color.navText};
    text-decoration: none;
    
    &:hover {
        color: ${color.navTextHover};
        text-decoration: none;

        path {
            fill: ${color.navTextHover};
            transform: scale(1.1, 1.1);
            transform-origin: center;
        }
    }

    path {
        fill: ${color.navText};
    }
`;

class NavLink extends React.Component {

    render() {
        const { to, text, active, svg } = this.props;

        const textColor = active ? color.navTextActive : null;

        const svgElement = svg ? <SvgIcon viewBox={svg.viewBox} color={textColor} path={svg.path} style={{
            height: "30px",
            width: "30px",
        }}/> : null;
        const textElement = text ? <NavLinkText active={active} color={textColor}>{text}</NavLinkText> : null;

        return (
            <StlyedLink to={to}>
                {svgElement}
                {textElement}
            </StlyedLink>
        );
    }
}

NavLink.defaultProps = {
    svg: null,
    text: null
};

NavLink.propTypes = {
    active: PropTypes.bool.isRequired,
    svg: PropTypes.shape({
        path: PropTypes.string.isRequired,
        viewBox: PropTypes.string.isRequired
    }),
    text: PropTypes.string,
    to: PropTypes.string.isRequired
};

export default NavLink;