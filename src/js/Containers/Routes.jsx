import React from "react";
import styled from "styled-components";

import NavBar from "src/NavBar/Containers/NavBar.jsx";
import Page from "src/Containers/Page.jsx";

const Div = styled.div`
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
    height: auto !important;
    margin-bottom: -158px;
`;

export default class Routes extends React.Component {

    render() {
        return (
            <Div>
                <NavBar/>
                <Page/>
            </Div>
        );
    }
}