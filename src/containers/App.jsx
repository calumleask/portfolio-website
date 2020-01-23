import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import Routes from "~/components/Routes.jsx";
import Footer from "~/Footer/Containers/Footer.jsx";

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 60px 0 0 0;
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
