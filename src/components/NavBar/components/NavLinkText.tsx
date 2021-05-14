import React, { useState } from "react";
import styled from "styled-components";

import MovingLetter from "./MovingLetter";

const TextContainer = styled.div`
    display: inline;
`;

type NavLinkTextProps = {
    active: boolean;
    children: string;
    color: string;
};

const NavLinkText: React.FC<NavLinkTextProps> = (props: NavLinkTextProps) => {
    const [hover, setHover] = useState(false);

    const onMouseEnterHandler = (): void => {
        setHover(true);
    };

    const onMouseLeaveHandler = (): void => {
        setHover(false);
    };
    
    const getLettersElements = (): React.ReactElement[] | null => {
        const { active, children, color } = props;

        if (typeof children === "string") {
            return [...children].map((letter, index) => {
                const offset = (index % 2 === 0) ? 1 : -1;
                return (
                    <MovingLetter
                        key={index}
                        hover={hover}
                        offset={offset}
                        active={active}
                        color={color}>
                        {letter}
                    </MovingLetter>
                );
            });
        }
        else {
            return null;
        }
    };

    return (
        <TextContainer onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
            {getLettersElements()}
        </TextContainer>
    );
};

export default NavLinkText;
