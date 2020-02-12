import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "gatsby";

import ResponsiveLayout from "src/components/ResponsiveLayout";

const ProjectContainer = styled.li`
    background-color: #fff;
    box-shadow: 1px 1px 2px 0 #888;
    color: #444;
    cursor: pointer;
    margin: 20px 0;
    text-align: left;
    width: 100%;

    &:hover {
        background-color: #f0f0f0;
        color: #333;
    }

    &:active {
        background-color: #e0e0e0;
        color: #222;
    }
`;

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`;

const Table = styled.table`
    border-spacing: 0;
    padding: 10px;
    width: 100%;
`;

const TableRow = styled.tr`
    vertical-align: top
`;

const TableCell = styled.td`
    padding: 0;
    vertical-align: top
`;

const ImgContainer = styled.div`
    margin-right: 10px;
    width: 240px;
    height: 135px;
`;

const ProjectImg = styled.img`
    opacity: 1;
    transition-duration: 0.25s;
    transition-property: opacity;
    transition-timing-function: ease-in;
    width: 240px;
    z-index: 10;
`;

const ProjectInfo = styled.div`
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
            <ProjectContainer>
                <StyledLink to={slug} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut} ref={el => (this.container = el)}>
                    <Table>
                        <tbody>
                            <TableRow>
                                <TableCell width="240px">
                                    <ImgContainer style={{ marginBottom: "5px" }}>
                                        <ProjectImg src={imgSrcOnHover} style={style}/>
                                        <ProjectImg src={imgSrc}/>
                                    </ImgContainer>
                                </TableCell>
                                <TableCell>
                                    <ProjectInfo>
                                        <ResponsiveLayout
                                            breakpoint={767}
                                            renderDesktop={() => (
                                                <DesktopView title={title} date={date} excerpt={excerpt}/>
                                            )}
                                            renderMobile={() => (
                                                <MobileView title={title} date={date} excerpt={excerpt}/>
                                            )}
                                        />
                                    </ProjectInfo>
                                </TableCell>
                            </TableRow>
                            <ResponsiveLayout
                                breakpoint={767}
                                renderDesktop={()=>(null)}
                                renderMobile={() => (
                                    <TableRow>
                                        <TableCell colSpan="2">
                                            <ProjectExcerpt>{excerpt}</ProjectExcerpt>
                                        </TableCell>
                                    </TableRow>
                                )}
                            />
                        </tbody>
                    </Table>
                </StyledLink>
            </ProjectContainer>
            
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

const DesktopView = ({ title, date, excerpt }) => (
    <>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDate>{date}</ProjectDate>
        <ProjectExcerpt>{excerpt}</ProjectExcerpt>
    </>
);

DesktopView.propTypes = {
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

const MobileView = ({ title, date }) => (
    <>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDate>{date}</ProjectDate>
    </>
);

MobileView.propTypes = {
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};