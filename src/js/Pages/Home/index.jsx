import React from "react";

import SlideShow from "src/pages/Home/SlideShow.jsx";

export default class Home extends React.Component {

    render() {
        return (
            <div style={{ margin: "40px 0" }}>
                <SlideShow/>
            </div>
        );
    }
}