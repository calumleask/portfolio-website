import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Div = styled.div`
    margin: 30px;
`;

const TitleContainer = styled.div`
    font-size: 2em;
    text-align: center;
`;

const DescriptionContainer = styled.div`
    text-align: center;
    font-size: 1em;
`;

class SlideShowText extends React.Component {
    
    render() {
        const { title, description } = this.props;

        return (
            <Div>
                <TitleContainer>
                    <b>{title}</b>
                </TitleContainer>
                <DescriptionContainer>
                    {description}
                </DescriptionContainer>
            </Div>
        );
    }
}

SlideShowText.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default SlideShowText;