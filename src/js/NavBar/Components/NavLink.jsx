import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";

import { withThemeContext } from "src/components/ThemeContext.jsx";
import SvgIcon from "src/components/SvgIcon.jsx";
import NavLinkText from "src/NavBar/Components/NavLinkText.jsx";

const StlyedLink = styled(Link)`
    color: #333333;
    text-decoration: none;
    
    &:hover {
        color: #333333;
        text-decoration: none;
    }
`;

class NavLink extends React.Component {

    render() {
        const { to, text, active, svg, theme } = this.props;

        const color = active ? theme.styles.color.navTextActive : theme.styles.color.navText;

        const svgElement = svg ? <SvgIcon viewBox={svg.viewBox} color={color} path={svg.path} style={{
            height: "30px",
            width: "30px",
        }}/> : null;
        const textElement = text ? <NavLinkText active={active} color={color}>{text}</NavLinkText> : null;

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
    theme: PropTypes.shape({
        styles: PropTypes.shape({
            color: PropTypes.object.isRequired
        })
    }),
    to: PropTypes.string.isRequired
};

export default withThemeContext(NavLink);