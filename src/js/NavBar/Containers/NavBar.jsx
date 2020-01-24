import React from "react";
import styled from "styled-components";

import NavLink from "~/NavBar/Components/NavLink.jsx";

const Nav = styled.nav`
    border-bottom: 1px solid #d5d5d5;
    margin: 0 auto;
    width: 70%;
`;

const Ul = styled.ul`
    font-weight: bold;
    list-style: none;
    padding: 0px;
`;

export default class Routes extends React.Component {

    render() {
        return (
            <Nav>
                <Ul>
                    <NavLink to="/" text="Home"/>
                    <NavLink to="/about" text="About"/>
                </Ul>
            </Nav>
        );
    }
}