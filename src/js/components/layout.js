import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { withThemeContext } from "src/components/ThemeContext.jsx";
import NavBar from "src/NavBar/Containers/NavBar.jsx";
import Footer from "src/Footer/Containers/Footer.jsx";

const RootContainer = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
    padding: 0;
    position: fixed;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    max-width: 1000px;
`;

const ContentContainer = styled.div`
    flex-grow: 1;
    padding: 0 30px;
    text-align: center;
`;

const getFlexContainerStyle = (layout) => {
    if (layout === "narrow") {
        return {
            width: "100%"
        };
    }
    else {
        return {
            width: "80%"
        };
    }
};

const Layout = ({ children, location, theme }) => (
    <RootContainer>
        <FlexContainer style={getFlexContainerStyle(theme.layout)}>
            <NavBar location={location}/>
            <ContentContainer>{children}</ContentContainer>
            <Footer/>
        </FlexContainer>
    </RootContainer>
);

Layout.displayName = "Layout";

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    theme: PropTypes.shape({
        layout: PropTypes.string.isRequired
    })
};

export default withThemeContext(Layout);