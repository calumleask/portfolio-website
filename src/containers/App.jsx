import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
};

const About = () => {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
};

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>

                    <hr/>

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
