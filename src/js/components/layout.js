import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import NavBar from "src/NavBar/Containers/NavBar.jsx";
import Footer from "src/Footer/Containers/Footer.jsx";

const Container = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 30px 0 0 0;
    position: fixed;
`;

const Div = styled.div`
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
    height: auto !important;
    margin-bottom: -158px;
`;

const ContentContainer = styled.div`
    margin: 30px auto 0 auto;
    text-align: center;
    width: 70%;
`;

const Layout = ({content}) => (
    <Container>
        <Div>
            <NavBar/>
            <ContentContainer>{content}</ContentContainer>
        </Div>
        <Footer/>
    </Container>
);

Layout.displayName = "Layout";

Layout.propTypes = {
    content: PropTypes.node.isRequired
};

export default Layout;