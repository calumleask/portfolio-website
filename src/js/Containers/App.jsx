import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import Routes from "src/Containers/Routes.jsx";
import Footer from "src/Footer/Containers/Footer.jsx";

const Container = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 30px 0 0 0;
    position: fixed;
`;

export default class App extends React.Component {

    render() {
        return (
            <Container>
                <Router>
                    <Routes/>
                </Router>
                
                <Footer/>
            </Container>
        );
    }
}
