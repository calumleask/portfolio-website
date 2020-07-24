import React from "react";
import styled from "styled-components";
import { WindowLocation } from "@reach/router";

import NavLink from "./components/NavLink";
import ResponsiveLayout from "@components/ResponsiveLayout";

import { device } from "@helpers/devices";
import { color } from "@style/colors";

const Container = styled.div`
    background: ${color.navBackground};
    margin: 0;
`;

const BoundNav = styled.nav`
    font-weight: bold;
    height: 60px;
    line-height: 60px;

    @media ${device.tablet} {
        height: 80px;
        line-height: 80px;
        margin: 0 auto;
        max-width: 1000px;
    }
`;

const Ul = styled.ul`    
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
    margin: 0 auto;
    padding: 0;
    width: 95%;

    @media ${device.tablet} {
        display: block;
        margin: 0;
        width: 100%;
    }
`;

const Li = styled.li`
    display: inline-block;
    float: left;
    margin: 0 auto;
    padding: 0 10px;

    @media ${device.tablet} {
        margin: 0 30px;
        padding: 0;
    }
`;

type NavBarProps = {
    location: WindowLocation<WindowLocation["state"]>
};

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {

    const { pathname } = props.location;

    // TODO: move out of here
    const navLinks = [
        {
            to: "/",
            text: "HOME",
            svg: {
                viewBox: "0 0 24 24",
                path: "M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"
            }
        },
        {
            to: "/projects",
            text: "PROJECTS",
            svg: null
        },
        {
            to: "/about",
            text: "ABOUT",
            svg: null
        }
    ];

    const navLinkElements = navLinks.map(({ text, to, svg }, index) => {
        const active = pathname === to || pathname === to.replace(/\/$/, "");
        return (
            <Li key={index}>
                <ResponsiveLayout
                    breakpoint={device.size.mobileL}
                    renderDesktop={(): React.ReactElement => (<NavLink to={to} text={text} active={active}/>)}
                    renderMobile={(): React.ReactElement => {
                        if (svg) return <NavLink to={to} svg={svg} active={active}/>;
                        return <NavLink to={to} text={text} active={active}/>;
                    }}
                />
            </Li>
        );
    });

    return (
        <Container>
            <BoundNav>
                <Ul>
                    {navLinkElements}
                </Ul>
            </BoundNav>
        </Container>
    );
};

export default NavBar;
