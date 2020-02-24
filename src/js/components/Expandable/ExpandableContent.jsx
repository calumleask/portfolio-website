import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Expandable from "src/components/Expandable/Expandable.jsx";

const ContentContainer = styled.div`
    overflow: hidden;
    transition-duration: 0.25s;
    transition-property: opacity;
    transition-timing-function: ease;
`;

class ExpandableContent extends React.Component {

    render() {
        const { title, render } = this.props;

        return (
            <Expandable
                title={title}
                render={({ expanded }) => {
                    const style = {
                        height: expanded ? "auto" : 0,
                        opacity: expanded ? 1 : 0
                    };
                    return(
                        <ContentContainer style={style}>{render({ expanded })}</ContentContainer>
                    );
                }}
            />
        );
    }
}

ExpandableContent.propTypes = {
    render: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default ExpandableContent;