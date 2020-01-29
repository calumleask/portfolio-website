import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import NavLinkText from "src/NavBar/Components/NavLinkText.jsx";

const ListItem = styled.li`
    display: inline;
    font-size: 1.4em;
    line-height: 1.4em;
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
        const { to, text, location } = this.props;

        const active = location.pathname === to;

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
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
};

export default withRouter(NavLink);