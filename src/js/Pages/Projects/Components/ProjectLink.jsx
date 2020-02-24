import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "gatsby";

import ResponsiveLayout from "src/components/ResponsiveLayout";

import { device } from "src/helpers/devices.js";
import { color } from "css/colors.js";

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`;

const ProjectContainer = styled.li`
    background-color: ${color.projectLink.background};
    box-shadow: 1px 1px 2px 0 ${color.projectLink.shadow};
    color: #444;
    cursor: pointer;
    display: flex;
    flex-direction: column;
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
        color: #222;
    }
    
    @media ${device.mobileL} {
        flex-direction: row;
    }
`;

const ImgContainer = styled.div`
    margin: 0 auto;
    max-width: 240px;
    position: relative;

    @media ${device.mobileL} {
        margin: 0 5px 0 0;
        flex: 1 2;
    }
`;

const ProjectImg = styled.img`
    max-width: 100%;
    opacity: 1;
    transition-duration: 0.25s;
    transition-property: opacity;
    transition-timing-function: ease-in;
    vertical-align: top;
    z-index: 10;
`;

const ProjectInfoContainer = styled.div`
    @media ${device.mobileL} {
        flex: 1 1;
    }
`;

const ProjectTitle = styled.div`
    color: ${color.projectLink.title};
    font-size: 1em;
    font-weight: normal;

    @media ${device.mobileL} {
        font-size: 1.1em;
    }

    @media ${device.tablet} {
        font-size: 1.2em;
    }
`;

const ProjectDate = styled.div`
    color: ${color.projectLink.title};
    font-size: 0.9em;
    font-style: italic;
    font-weight: normal;

    @media ${device.mobileL} {
        font-size: 1em;
    }

    @media ${device.tablet} {
        font-size: 1.1em;
    }
`;

const ProjectExcerpt = styled.div`
    color: ${color.projectLink.excerpt};
    font-size: 0.8em;
    font-weight: lighter;
    text-align: justify;

    @media ${device.mobileL} {
        font-size: 0.9em;
        padding: 5px;
    }

    @media ${device.tablet} {
        font-size: 1em;
    }
`;

class ProjectLink extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };

        this._onMouseOver = this._onMouseOver.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
    }

    componentDidMount() {
        this.setState({
            dimensions: {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight
            }
        });
    }

    _onMouseOver() {
        this.setState({ hover: true });
    }

    _onMouseOut() {
        this.setState({ hover: false });
    }
    
    render() {
        const { excerpt } = this.props.project;
        const { title, date, tags } = this.props.project.frontmatter;
        const { slug } = this.props.project.fields;
        const tagsArray = tags.split(" ");
        tagsArray.forEach((tag, index, tagsArray) => {
            tagsArray[index] = tag.replace(/_/g, " ");
        });

        const imgSrc = "/assets" + slug + ".png";
        const imgSrcOnHover = "/assets" + slug + "-hover.png";

        const style = {
            opacity: this.state.hover ? 1 : 0,
            position: "absolute",
            zIndex: 11
        };

        return (
            <StyledLink to={slug} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut} ref={el => (this.container = el)}>
                <ProjectContainer>
                    <ImgContainer>
                        <ProjectImg src={imgSrcOnHover} style={style}/>
                        <ProjectImg src={imgSrc}/>
                    </ImgContainer>
                    <ResponsiveLayout
                        breakpoint={500}
                        renderDesktop={() => (
                            <ProjectInfoContainer>
                                <ProjectTitle>{title}</ProjectTitle>
                                <ProjectDate>{date}</ProjectDate>
                                <ProjectExcerpt>{excerpt}</ProjectExcerpt>
                            </ProjectInfoContainer>
                        )}
                        renderMobile={() => (
                            <>
                                <ProjectInfoContainer>
                                    <ProjectTitle>{title}</ProjectTitle>
                                    <ProjectDate>{date}</ProjectDate>
                                </ProjectInfoContainer>
                                <ProjectExcerpt>{excerpt}</ProjectExcerpt>
                            </>
                        )}
                    />
                </ProjectContainer>
            </StyledLink>
            
        );
    }
}

ProjectLink.propTypes = {
    project: PropTypes.shape({
        excerpt: PropTypes.string.isRequired,
        fields: PropTypes.shape({
            slug: PropTypes.string.isRequired
        }),
        frontmatter: PropTypes.shape({
            date: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired
        })
    })
};

export default ProjectLink;