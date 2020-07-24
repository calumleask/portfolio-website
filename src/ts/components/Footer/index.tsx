import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";

import ResponsiveLayout from "@components/ResponsiveLayout";
import SvgIcon from "@components/SvgIcon";

import { device } from "@helpers/devices";
import { color } from "@style/colors";

const StyledFooter = styled.footer`
    background: ${color.footerBackground};
    border-top: 1px solid ${color.border};
    color: ${color.footerText};
    flex-shrink: 0;
    margin: 0;
    text-align: center;

    a {
        color: ${color.footerLinkText};
        font-family: monospace;
        font-weight: lighter;

        &:hover {
            color: ${color.footerLinkTextHover};

            path {
                fill: ${color.footerLinkTextHover};
            }
        }

        &:active {
            color: ${color.footerLinkTextActive};

            path {
                fill: ${color.footerLinkTextActive};
            }
        }
    }
`;

const Bounds = styled.div`
    padding: 20px 20px 30px 20px;

    @media ${device.tablet} {
        margin: 0 auto;
        max-width: 1000px;
    }
`;

const Ul = styled.ul`
    font-weight: bold;
    list-style: none;
    margin: 0 0 20px 0;
    padding: 0;
    text-align: left;
`;

const Li = styled.li`
    display: block;
    font-size: 1em;
    line-height: 1em;
    margin: 5px 0;
`;

const Text = styled.div`
    font-family: monospace;
    font-size: 0.8em;
    font-weight: lighter;
    margin: 0 0 10px 0;

    @media ${device.mobileL} {
        font-size: 0.9em;
        font-weight: normal;
    }

    @media ${device.tablet} {
        font-size: 1em;
        font-weight: normal;
    }
`;

type Query = {
    site: {
        siteMetadata: {
            email: string;
            linkedin: string;
            title: string;
        };
    };
};

const Footer: React.FC<unknown> = () => {
    return (
        <StaticQuery
            query={graphql`
                query {
                    site {
                        siteMetadata {
                            title
                        }
                    }
                }
            `}
            render={(data: Query): React.ReactNode => render(data)}
        />
    );
};

export default Footer;

const render = (data: Query): React.ReactNode => {
    const { email, linkedin, title } = data.site.siteMetadata;

    const svgStyle = {
        height: "16px",
        margin: "0 5px",
        width: "16px",
    };

    return (
        <StyledFooter>
            <Bounds>
                <Ul>
                    <Li>
                        <a href={"mailto:" + email}>
                            <SvgIcon style={svgStyle} viewBox="0 0 32 32" color={color.footerText} path="M26.667 0h-21.333c-2.934 0-5.334 2.4-5.334 5.334v21.332c0 2.936 2.4 5.334 5.334 5.334h21.333c2.934
                                0 5.333-2.398 5.333-5.334v-21.332c0-2.934-2.399-5.334-5.333-5.334zM26.667 4c0.25 0 0.486 0.073 0.688 0.198l-11.355 9.388-11.355-9.387c0.202-0.125
                                0.439-0.198 0.689-0.198h21.333zM5.334 28c-0.060 0-0.119-0.005-0.178-0.013l7.051-9.78-0.914-0.914-7.293 7.293v-19.098l12 14.512 12-14.512v19.098l-7.293-7.293-0.914
                                0.914 7.051 9.78c-0.058 0.008-0.117 0.013-0.177 0.013h-21.333z"
                            />
                            {email}
                        </a>
                    </Li>
                    
                    <Li>
                        <a href={"https://linkedin.com/in/" + linkedin} target="_blank" rel="noopener noreferrer">
                            <SvgIcon style={svgStyle} viewBox="0 0 57 57" color={color.footerText} path="M49.265,4.667H7.145c-2.016,0-3.651,1.596-3.651,3.563v42.613c0,1.966,1.635,3.562,3.651,3.562h42.12
                                c2.019,0,3.654-1.597,3.654-3.562V8.23C52.919,6.262,51.283,4.667,49.265,4.667z M18.475,46.304h-7.465V23.845h7.465V46.304z
                                M14.743,20.777h-0.05c-2.504,0-4.124-1.725-4.124-3.88c0-2.203,1.67-3.88,4.223-3.88c2.554,0,4.125,1.677,4.175,3.88
                                C18.967,19.052,17.345,20.777,14.743,20.777z M45.394,46.304h-7.465V34.286c0-3.018-1.08-5.078-3.781-5.078
                                c-2.062,0-3.29,1.389-3.831,2.731c-0.197,0.479-0.245,1.149-0.245,1.821v12.543h-7.465c0,0,0.098-20.354,0-22.459h7.465v3.179
                                c0.992-1.53,2.766-3.709,6.729-3.709c4.911,0,8.594,3.211,8.594,10.11V46.304z"
                            />
                            {linkedin}
                        </a>
                    </Li>
                </Ul>

                <Text>
                    {`Copyright ©  ${new Date().getFullYear()}  ${title}, Built with `}<a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">{"Gatsby"}</a>
                </Text>
                <ResponsiveLayout
                    breakpoint={device.size.mobileL}
                    renderDesktop={(): null => null}
                    renderMobile={(): React.ReactElement => {
                        return (
                            <Text>
                                {"Home icon by "}<a href="https://icons8.com/icon/83326/home" rel="noopener noreferrer" target="_blank">{"Icons8"}</a>
                            </Text>
                        );
                    }}
                />
            </Bounds>
        </StyledFooter>
    );
};
