import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Div = styled.div`
    margin: 30px;
`;

class SlideShowText extends React.Component {
    
    render() {
        const { title, description } = this.props;

        return (
            <Div>
                <h1>{title}</h1>
                <p style={{ textAlign: "center" }}>{description}</p>
            </Div>
        );
    }
}

SlideShowText.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default SlideShowText;