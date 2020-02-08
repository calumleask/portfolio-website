import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import NavLink from "src/NavBar/Components/NavLink.jsx";

const Nav = styled.nav`
    border-bottom: 1px solid #d5d5d5;
    margin: 0 auto;
    width: 70%;
`;

const Ul = styled.ul`
    font-weight: bold;
    list-style: none;
    margin: 0;
    padding: 30px 0;
`;

class NavBar extends React.Component {


    render() {

        // TODO: move out of here
        const navLinks = [
            {
                to: "/",
                text: "Home"
            },
            {
                to: "/projects",
                text: "Projects"
            },
            {
                to: "/about",
                text: "About"
            }
        ];

        const navLinkElements = navLinks.map(({ to, text } , index) => {
            const active = this.props.location.pathname === to;
            return <NavLink key={index} to={to} text={text} active={active}/>;
        });

        return (
            <Nav>
                <Ul>
                    {navLinkElements}
                </Ul>
            </Nav>
        );
    }
}

NavBar.propTypes = {
    location: PropTypes.object.isRequired
};

export default  NavBar;