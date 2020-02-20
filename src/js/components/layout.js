import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import NavBar from "src/NavBar/Containers/NavBar.jsx";
import Footer from "src/Footer/Containers/Footer.jsx";

import { device } from "src/helpers/devices.js";

import "css/index.css";

const RootContainer = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
    overflow-x: hidden;
    padding: 0;
    position: fixed;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    max-width: 1000px;
    width: 100%;

    @media ${device.tablet} {
        width: 80%;
    }
`;

const ContentContainer = styled.div`
    flex-grow: 1;
    padding: 30px 30px 60px 30px;
    text-align: center;
`;

const Layout = ({ children, location }) => (
    <RootContainer>
        <FlexContainer>
            <NavBar location={location}/>
            <ContentContainer>{children}</ContentContainer>
            <Footer/>
        </FlexContainer>
    </RootContainer>
);

Layout.displayName = "Layout";

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
};

export default Layout;