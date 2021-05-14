import React from "react";
import styled from "styled-components";
import { WindowLocation } from "@reach/router";
import { IconType } from "react-icons";
import { RiHome2Line } from "react-icons/ri";

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

type NavLink = {
    to: string;
    text: string;
    Icon?: IconType;
}

type NavBarProps = {
    location: WindowLocation<WindowLocation["state"]>
};

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {

    const { pathname } = props.location;

    const navLinks: NavLink[] = [
        {
            to: "/",
            text: "HOME",
            Icon: RiHome2Line
        },
        {
            to: "/projects",
            text: "PROJECTS"
        },
        {
            to: "/about",
            text: "ABOUT"
        }
    ];

    const navLinkElements = navLinks.map(({ text, to, Icon }, index) => {
        const active = pathname === to || pathname === to.replace(/\/$/, "");
        return (
            <Li key={index}>
                <ResponsiveLayout
                    breakpoint={device.size.mobileL}
                    renderDesktop={(): React.ReactElement => (<NavLink to={to} text={text} active={active}/>)}
                    renderMobile={(): React.ReactElement => {
                        return <NavLink to={to} text={text} Icon={Icon} active={active}/>;
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
