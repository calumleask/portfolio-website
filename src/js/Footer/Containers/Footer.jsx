import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";

import Icon from "src/Footer/Components/Icon.jsx";

const StyledFooter = styled.footer`
    border-top: 1px solid #d5d5d5;
    font-size: 1em;
    margin: 20px auto 0 auto;
    text-align: center;
    width: 70%;
    height: 138px;
`;

const Ul = styled.ul`
    font-weight: bold;
    list-style: none;
    padding: 0px;
    text-align: left;
`;

const Li = styled.li`
    display: block;
    font-size: 1em;
    line-height: 1em;
    margin: 5px 20px;
`;

export default class Footer extends React.Component {
    render() {
        return (
            <StaticQuery
                query={graphql`
                    query {
                        site {
                            siteMetadata {
                                title,
                                email,
                                linkedin
                            }
                        }
                    }
                `}
                render={(data) => render(data)}
            />
        );
    }
}

const render = (data) => {
    const { title, email, linkedin } = data.site.siteMetadata;
    return (
        <StyledFooter>
            <Ul>
                <Li>
                    <a href={"mailto:" + email}>
                        <Icon viewBox="0 0 32 32" fill="#828282" path="M26.667 0h-21.333c-2.934 0-5.334 2.4-5.334 5.334v21.332c0 2.936 2.4 5.334 5.334 5.334h21.333c2.934
                            0 5.333-2.398 5.333-5.334v-21.332c0-2.934-2.399-5.334-5.333-5.334zM26.667 4c0.25 0 0.486 0.073 0.688 0.198l-11.355 9.388-11.355-9.387c0.202-0.125
                            0.439-0.198 0.689-0.198h21.333zM5.334 28c-0.060 0-0.119-0.005-0.178-0.013l7.051-9.78-0.914-0.914-7.293 7.293v-19.098l12 14.512 12-14.512v19.098l-7.293-7.293-0.914
                            0.914 7.051 9.78c-0.058 0.008-0.117 0.013-0.177 0.013h-21.333z"
                        />
                        {email}
                    </a>
                </Li>
                
                <Li>
                    <a href={"https://linkedin.com/in/" + linkedin}>
                        <Icon viewBox="0 0 57 57" fill="#828282" path="M49.265,4.667H7.145c-2.016,0-3.651,1.596-3.651,3.563v42.613c0,1.966,1.635,3.562,3.651,3.562h42.12
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

            <p>Copyright © {new Date().getFullYear()} {" "} {title}, Built with {" "}<a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">Gatsby</a></p>
        </StyledFooter>
    );
};