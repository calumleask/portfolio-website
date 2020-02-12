import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import WindowDimensionsProvider from "src/components/WindowDimensionsProvider";
import ThemeProvider, { withThemeContext } from "src/components/ThemeContext.jsx";
import NavBar from "src/NavBar/Containers/NavBar.jsx";
import Footer from "src/Footer/Containers/Footer.jsx";

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
    padding: 0;
    position: fixed;
`;

const ContentContainer = styled.div`
    flex-grow: 1;
    margin: 30px auto;
    max-width: 960px;
    text-align: center;
    width: 80%;
`;

const getStyle = (layout) => {
    if (layout === "narrow") {
        return {
            margin: 0,
            padding: "0 30px",
            width: "100%"
        };
    }
    else {
        return {
            margin: "0 auto",
            width: "80%"
        };
    }
};

const Content = (props) => {
    return (
        <ContentContainer style={getStyle(props.theme.layout)}>{props.children}</ContentContainer>
    );
};

const WrappedContent = withThemeContext(Content);

const Layout = ({ children, location }) => (
    <WindowDimensionsProvider>
        <ThemeProvider>
            <FlexContainer>
                <NavBar location={location}/>
                    <WrappedContent>{children}</WrappedContent>
                <Footer/>
            </FlexContainer>
        </ThemeProvider>
    </WindowDimensionsProvider>
);

Layout.displayName = "Layout";

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
};

export default Layout;