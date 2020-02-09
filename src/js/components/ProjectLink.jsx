import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`;

const ProjectContainer = styled.li`
    background-color: #fff;
    box-shadow: 1px 1px 2px 0 #888;
    color: #444;
    cursor: pointer;
    display: table;
    margin: 20px 0;
    text-align: left;
    width: 100%;
    height: 100px;

    &:hover {
        background-color: #f0f0f0;
        color: #333;
    }

    &:active {
        background-color: #e0e0e0;
        color: #222;
    }
`;

const ProjectImg = styled.img`
    display: table-cell;
    opacity: 1;
    transition-duration: 0.25s;
    transition-property: opacity;
    transition-timing-function: ease-in;
    width: 248px;
    z-index: 10;
`;

const ProjectInfo = styled.div`
    display: table-cell;
    padding: 10px;
    height: 100%;
    vertical-align: top;
`;

const ProjectTitle = styled.div`
    color: #444;
    font-size: 1.2em;
    font-weight: normal;
`;

const ProjectDate = styled.div`
    color: #444;
    font-size: 1.1em;
    font-style: italic;
    font-weight: normal;
`;

const ProjectExcerpt = styled.div`
    color: #777;
    font-size: 1em;
    font-weight: lighter;
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

    _onMouseOver() {
        this.setState({ hover: true });
    }

    _onMouseOut() {
        this.setState({ hover: false });
    }
    
    render() {
        const { path, cover, title, date, tags } = this.props.project.frontmatter;
        const tagsArray = tags.split(" ");
        tagsArray.forEach((tag, index, tagsArray) => {
            tagsArray[index] = tag.replace(/_/g, " ");
        });

        const imgSrc = "/project-cover/" + cover + ".png";
        const imgSrcOnHover = "/project-cover/" + cover + "_hover.png";

        const style = {
            opacity: this.state.hover ? 1 : 0,
            position: "absolute",
            zIndex: 11
        };

        return (
            <StyledLink to={path} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
                <ProjectContainer>
                    <ProjectImg src={imgSrcOnHover} style={style}/>
                    <ProjectImg src={imgSrc}/>
                    <ProjectInfo>
                        <ProjectTitle>{title}</ProjectTitle>
                        <ProjectDate>{date}</ProjectDate>
                        <ProjectExcerpt>{this.props.project.excerpt}</ProjectExcerpt>
                    </ProjectInfo>
                </ProjectContainer>
            </StyledLink>
        );
    }
}

ProjectLink.propTypes = {
    project: PropTypes.shape({
        excerpt: PropTypes.string.isRequired,
        frontmatter: PropTypes.shape({
            date: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            cover: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired
        })
    })
};

export default ProjectLink;