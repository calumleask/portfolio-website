import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
        const { to, text } = this.props;

        return (
            <ListItem>
                <StlyedLink to={to}>{text}</StlyedLink>
            </ListItem>
        );
    }
}

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default NavLink;