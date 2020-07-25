import React from "react";
import { PageProps } from "gatsby";
import styled from "styled-components";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

import { device } from "@helpers/devices";

import "@style/main.css";

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
    width: 100%;
`;

const ContentContainer = styled.div`
    flex-grow: 1;
    margin: 0 auto;
    max-width: 1000px;
    padding: 30px 30px 60px 30px;
    text-align: center;
    width: 100%;

    @media ${device.tablet} {
        width: 80%;
    }
`;

const Layout: React.FC<PageProps> = ({ children, location }: PageProps) => (
    <RootContainer>
        <FlexContainer>
            <NavBar location={location}/>
            <ContentContainer>{children}</ContentContainer>
            <Footer/>
        </FlexContainer>
    </RootContainer>
);

export default Layout;
