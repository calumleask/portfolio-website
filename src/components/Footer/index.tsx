import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import { RiMailLine, RiLinkedinBoxFill, RiGithubFill } from "react-icons/ri";

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
        font-size: 0.8em;
        font-weight: lighter;

        &:hover {
            color: ${color.footerLinkTextHover};

            svg {
                fill: ${color.footerLinkTextHover};
            }
        }

        &:active {
            color: ${color.footerLinkTextActive};

            svg {
                fill: ${color.footerLinkTextActive};
            }
        }
    
        @media ${device.tablet} {
            font-size: 0.9em;
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

    @media ${device.tablet} {
        font-size: 0.9em;
        font-weight: normal;
    }
`;

type Query = {
    site: {
        siteMetadata: {
            email: string;
            github: string;
            linkedin: string;
            title: string;
        };
    };
};

const Footer: React.FC = () => {
    return (
        <StaticQuery
            query={graphql`
                query {
                    site {
                        siteMetadata {
                            email,
                            github,
                            linkedin,
                            title
                        }
                    }
                }
            `}
            render={(data: Query): React.ReactElement => render(data)}
        />
    );
};

export default Footer;

const render = (data: Query): React.ReactElement => {
    const { email, github, linkedin, title } = data.site.siteMetadata;

    const svgStyle: React.CSSProperties = {
        marginRight: "5px",
        width: "16px",
        height: "16px",
        verticalAlign: "middle"
    };

    return (
        <StyledFooter>
            <Bounds>
                <Ul>
                    <Li>
                        <a href={"mailto:" + email}>
                            <RiMailLine style={svgStyle} color={color.footerText}/>
                            {email}
                        </a>
                    </Li>
                    <Li>
                        <a href={"https://linkedin.com/in/" + linkedin} target="_blank" rel="noopener noreferrer">
                            <RiLinkedinBoxFill style={svgStyle} color={color.footerText}/>
                            {"Linkedin"}
                        </a>
                    </Li>
                    <Li>
                        <a href={"https://github.com/" + github} target="_blank" rel="noopener noreferrer">
                            <RiGithubFill style={svgStyle} color={color.footerText}/>
                            {"GitHub"}
                        </a>
                    </Li>
                </Ul>

                <Text>
                    {`Copyright ©  ${new Date().getFullYear()}  ${title}, Built with `}<a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">{"Gatsby"}</a>
                </Text>
            </Bounds>
        </StyledFooter>
    );
};
