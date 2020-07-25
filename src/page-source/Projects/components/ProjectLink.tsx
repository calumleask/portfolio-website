import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { Project } from "@pages/Project/types";
import { device } from "@helpers/devices";
import { color } from "@style/colors";

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`;

const ProjectContainer = styled.li`
    background-color: ${color.projectLink.background};
    box-shadow: 1px 1px 2px 1px ${color.projectLink.shadow};
    color: #444;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 20px 0;
    min-width: 200px;
    padding: 5px;
    text-align: left;
    width: 100%;

    &:hover {
        background-color: ${color.projectLink.backgroundHover};
        color: #333;
    }

    &:active {
        background-color: ${color.projectLink.backgroundActive};
        
        div {
            color: ${color.projectLink.textActive};
        }
    }
`;

const ImgContainer = styled.div`
    flex: 1 2;
    margin: 0 5px 0 0;
    max-width: 320px;
    position: relative;
    width: 100%;
`;

const ImgPlaceHolder = styled.div`
    margin: 0 5px 0 0;
    max-width: 320px;
    padding-top: 56.25%;
    width: 100%;
`;

const ProjectImg = styled.img`
    opacity: 1;
    position: absolute;
    top: 0;
    transition-duration: 0.25s;
    transition-property: opacity;
    transition-timing-function: ease-in;
    vertical-align: top;
    width: 100%;
    z-index: 10;
`;

const ProjectInfoContainer = styled.div`
    flex: 1 1;
    overflow: hidden;
    position: relative;
`;

const VerticallyAlignedDiv = styled.div`
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`;

const ProjectTitle = styled.div`
    color: ${color.projectLink.title};
    font-size: 0.9em;
    font-weight: normal;

    @media ${device.mobileL} {
        font-size: 1.1em;
        text-align: center;
    }

    @media ${device.tablet} {
        font-size: 1.2em;
    }
`;

const ProjectDate = styled.div`
    color: ${color.projectLink.title};
    font-size: 0.8em;
    font-style: italic;
    font-weight: normal;

    @media ${device.mobileL} {
        font-size: 1em;
        text-align: center;
    }

    @media ${device.tablet} {
        font-size: 1.1em;
    }
`;

type ProjectLinkProps = {
    project: Project;
};

const ProjectLink: React.FC<ProjectLinkProps> = (props: ProjectLinkProps) => {
    const [hover, setHover] = useState(false);

    const onMouseOver = (): void => {
        setHover(true);
    };

    const onMouseOut = (): void => {
        setHover(false);
    };
    
    const { title, date,tags } = props.project.frontmatter;
    const { slug } = props.project.fields;
    const tagsArray = tags.split(" ");
    tagsArray.forEach((tag, index, tagsArray) => {
        tagsArray[index] = tag.replace(/_/g, " ");
    });

    const imgSrc = "/assets" + slug + ".png";
    const imgSrcOnHover = "/assets" + slug + "-hover.png";

    const style = {
        opacity: hover ? 1 : 0,
        zIndex: 11
    };

    return (
        <StyledLink to={slug} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            <ProjectContainer>
                <ImgContainer>
                    <ImgPlaceHolder/>
                    <ProjectImg src={imgSrcOnHover} style={style}/>
                    <ProjectImg src={imgSrc}/>
                </ImgContainer>
                <ProjectInfoContainer>
                    <VerticallyAlignedDiv>
                        <ProjectTitle>{title}</ProjectTitle>
                        <ProjectDate>{date}</ProjectDate>
                    </VerticallyAlignedDiv>
                </ProjectInfoContainer>
            </ProjectContainer>
        </StyledLink>
        
    );
};

export default ProjectLink;
