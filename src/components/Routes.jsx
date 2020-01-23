import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Home from "~/pages/Home/index.jsx";
import About from "~/pages/About/index.jsx";

const Div = styled.div`

`;

const Ul = styled.ul`
    border: 0px;
    font-weight: bold;
    list-style: none;
    padding: 0px;
`;

const Li = styled.li`
color: #333333;
    display: inline;
    font-size: 1.4em;
    line-height: 1.4em;
    margin-right: 60px;
`;

const StlyedLink = styled(Link)`
    text-decoration: none;
    padding: 0.25em;
    
    &:hover {
        text-decoration: none;
    }
`;

export default class Routes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Div>
                <Ul>
                    <Li>
                        <StlyedLink to="/">Home</StlyedLink>
                    </Li>
                    <Li>
                        <StlyedLink to="/about">About</StlyedLink>
                    </Li>
                </Ul>

                <hr/>

                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                </Switch>
            </Div>
        );
    }
}