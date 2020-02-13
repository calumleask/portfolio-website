import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { withThemeContext } from "src/components/ThemeContext.jsx";

import NavLink from "src/NavBar/Components/NavLink.jsx";

const Nav = styled.nav`
    border-bottom: 1px solid #d5d5d5;
    font-weight: bold;
    margin: 0;
`;

const Ul = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const getNavStyle = (layout, colors) => {
    if (layout === "narrow") {
        return {
            background: colors.mobileNavBackground,
            height: "60px",
            lineHeight: "60px"
        };
    }
    return {
        background: colors.pageBackground,
        height: "80px",
        lineHeight: "80px",
    };
};

const getUlStyle = (layout) => {
    if (layout === "narrow") {
        return {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: "0 auto",
            width: "95%"
        };
    }
    return {};
};

const getLiStyle = (layout) => {
    if (layout === "narrow") {
        return {
            display: "inline-block",
            float: "left",
            margin: "0 auto",
            padding: "0 10px"
        };
    }
    else {
        return {
            display: "inline",
            margin: "0 30px"
        };
    }
};

class NavBar extends React.Component {


    render() {
        const { layout, styles } = this.props.theme;

        // TODO: move out of here
        const navLinks = [
            {
                to: "/",
                text: "HOME",
                svg: {
                    viewBox: "0 0 24 24",
                    path: "M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"
                }
            },
            {
                to: "/projects",
                text: "PROJECTS",
                svg: null
            },
            {
                to: "/about",
                text: "ABOUT",
                svg: null
            }
        ];

        const navLinkElements = navLinks.map(({ to, text, svg } , index) => {
            const active = this.props.location.pathname === to;
            let navLink = (layout === "narrow"&& svg) ?
            <NavLink to={to} svg={svg} active={active}/>
            : <NavLink to={to} text={text} active={active}/>;

            return (
                <li key={index} style={getLiStyle(layout)}>
                    {navLink}
                </li>
            );
        });

        return (
            <Nav style={getNavStyle(layout, styles.color)}>
                <Ul style={getUlStyle(layout)}>
                    {navLinkElements}
                </Ul>
            </Nav>
        );
    }
}

NavBar.propTypes = {
    location: PropTypes.object.isRequired,
    theme: PropTypes.shape({
        layout: PropTypes.string.isRequired,
        styles: PropTypes.shape({
            color: PropTypes.object.isRequired
        }).isRequired
    }).isRequired
};

export default withThemeContext(NavBar);