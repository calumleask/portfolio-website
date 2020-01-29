import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "src/pages/Home/index.jsx";
//import About from "src/pages/About/index.jsx";

const Div = styled.div`
    margin: 30px auto 0 auto;
    width: 70%;
`;

export default class Routes extends React.Component {

    render() {
        return (
            <Div>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/about">
                    </Route>
                </Switch>
            </Div>
        );
    }
}
