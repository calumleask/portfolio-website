import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";

import NavLinkText from "src/NavBar/Components/NavLinkText.jsx";

const ListItem = styled.li`
    display: inline;
    margin-right: 60px;
`;

const StlyedLink = styled(Link)`
    padding: 0.25em;
    color: #333333;
    text-decoration: none;
    
    &:hover {
        color: #333333;
        text-decoration: none;
    }
`;

class NavLink extends React.Component {

    render() {
        const { to, text, active } = this.props;
        return (
            <ListItem>
                <StlyedLink to={to}>
                    <NavLinkText active={active}>{text}</NavLinkText>
                </StlyedLink>
            </ListItem>
        );
    }
}

NavLink.propTypes = {
    active: PropTypes.bool.isRequired,
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default NavLink;