import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "~/components/routes.jsx";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes/>
            </Router>
        );
    }
}
