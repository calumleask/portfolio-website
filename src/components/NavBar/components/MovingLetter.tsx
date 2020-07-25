import React from "react";
import styled from "styled-components";

const Letter = styled.div`
    display: inline;
    font-family: monospace;
    font-size: 1.4em;
    position: relative;
    text-decoration: none;
    top: 0;
    transition: top 0.25s;
`;

type MovingLetterProps = {
    active: boolean;
    children: string;
    color: string;
    hover: boolean;
    offset: number;
};

const MovingLetter: React.FC<MovingLetterProps> = (props: MovingLetterProps) => {

    const calculateStyle = (): React.CSSProperties => {
        const { active, color, hover, offset } = props;
        const style: React.CSSProperties = { color };
        const emOffset = (active ? 0.1 : -0.1) * offset + "em";
        style.top = active || hover ? emOffset : 0;
        return style;
    };

    return (
        <Letter style={calculateStyle()}>{props.children}</Letter>
    );
};

export default MovingLetter;
