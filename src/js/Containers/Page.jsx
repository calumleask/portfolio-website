import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "src/Pages/Home/index.jsx";
import About from "src/Pages/About/index.jsx";
import ProjectList from "src/Pages/ProjectList/index.jsx";
import Project from "src/Pages/Project/index.jsx";

const Div = styled.div`
    margin: 30px auto 0 auto;
    text-align: center;
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
                        <About/>
                    </Route>
                    <Route path="/projects">
                        <ProjectList/>
                    </Route>
                    <Route path="/:slug">
                        <Project/>
                    </Route>
                </Switch>
            </Div>
        );
    }
}
