import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Expander from "src/components/Expandable/Expander.jsx";

const expanderHeight = 40;

const Container = styled.div`
    margin-bottom: 10px;
    min-height: ${expanderHeight}px;
    position: relative;
    width: 100%;
`;

class Expandable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    _collapse() {
        this.setState({ expanded: false });
    }

    _onExpanderClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const { title, render } = this.props;
        const { expanded } = this.state;

        return (
            <Container>
                <Expander expanded={expanded} title={title} onClick={this._onExpanderClick.bind(this)}/>
                {render({ expanded })}
            </Container>
        );
    }
}

Expandable.propTypes = {
    render: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default Expandable;