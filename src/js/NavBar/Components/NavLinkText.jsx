import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MovingLetter from "src/NavBar/Components/MovingLetter.jsx";

const Div = styled.div`
    display: inline;
`;

class NavLinkText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };

        this._textAnimationTimeout = null;

        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    }

    onMouseEnterHandler() {
        this.setState({ hover: true, seconds: 0 });
    }

    onMouseLeaveHandler() {
        this.setState({ hover: false, seconds: 0 });
    }

    getLettersElements() {
        const { children, active } = this.props;

        if (typeof children === "string" || children instanceof String) {
            return [...children].map((letter, index) => {
                const offset = (index % 2 === 0) ? 1 : -1;
                return (
                    <MovingLetter
                        key={index}
                        hover={this.state.hover}
                        offset={offset}
                        active={active}
                        >
                        {letter}
                    </MovingLetter>
                );
            });
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <Div onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
                {this.getLettersElements()}
            </Div>
        );
    }
}

NavLinkText.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.string
};

export default NavLinkText;