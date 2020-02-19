import AMPS_0 from "src/../images/a_musical_platforming_symphony_0.png";
import AMPS_1 from "src/../images/a_musical_platforming_symphony_1.png";
import AMPS_2 from "src/../images/a_musical_platforming_symphony_2.png";
import AMPS_3 from "src/../images/a_musical_platforming_symphony_3.png";
import CITY_0 from "src/../images/a_procedural_city_0.png";
import CITY_1 from "src/../images/a_procedural_city_1.png";
import CITY_2 from "src/../images/a_procedural_city_2.png";
import CITY_3 from "src/../images/a_procedural_city_3.png";
import WAVES_0 from "src/../images/breaking_waves_0.png";
import WAVES_1 from "src/../images/breaking_waves_1.png";
import WAVES_2 from "src/../images/breaking_waves_2.png";
import WAVES_3 from "src/../images/breaking_waves_3.png";
import OCEAN_0 from "src/../images/ocean_water_0.png";
import OCEAN_1 from "src/../images/ocean_water_1.png";
import OPENGL_0 from "src/../images/opengl_0.png";
import OPENGL_1 from "src/../images/opengl_1.png";

const ampsTitle = "AMPS - A Musical Platforming Symphony";
const ampsDesc = "A game developed by students from Abertay University for PC and PS4 using the Sony PhyreEngine.";

const cityTitle = "Procedural City";
const cityDesc = "Procedurally generating realistic cities using voronoi regions.";

const wavesTitle = "Honours Project";
const wavesDesc = "Breaking waves in shoreline water simulations at real-time.";

const oceanTitle = "Ocean Water";
const oceanDesc = "A simulation of ocean water in a 3D DirectX11 application.";

const openglTitle = "OpenGL";
const openglDesc = "A 3D scene created using OpenGL, demonstrating various graphics techniques.";


const slideShowSources = [
    {
        title: wavesTitle,
        description: wavesDesc,
        imgSrcs: [WAVES_0, WAVES_1, WAVES_2, WAVES_3]
    },
    {
        title: cityTitle,
        description: cityDesc,
        imgSrcs: [CITY_0, CITY_1, CITY_2, CITY_3]
    },
    {
        title: ampsTitle,
        description: ampsDesc,
        imgSrcs: [AMPS_0, AMPS_1, AMPS_2, AMPS_3]
    },
    {
        title: oceanTitle,
        description: oceanDesc,
        imgSrcs: [OCEAN_0, OCEAN_1]
    },
    {
        title: openglTitle,
        description: openglDesc,
        imgSrcs: [OPENGL_0, OPENGL_1]
    }
];

const groupIndexToFirstSlideIndex = {};

const generateSlideShowSlides = () => {
    const slides = [];

    let nextId = 0;

    slideShowSources.forEach((group, groupIndex) => {
        group.imgSrcs.forEach(imgSrc => {
            slides.push({
                title: group.title,
                description: group.description,
                imgSrc: imgSrc,
                groupIndex: groupIndex,
                slideId: nextId++
            });

            if (groupIndexToFirstSlideIndex[groupIndex] === undefined) {
                groupIndexToFirstSlideIndex[groupIndex] = slides.length - 1;
            }
        });
    });

    return slides;
};

export const firstSlideIndexFromGroupIndex = (groupIndex) => {
    return groupIndexToFirstSlideIndex[groupIndex];
};

export const slides = generateSlideShowSlides();

const generateGroupSlideShowSlides = () => {
    const groups = [];

    let nextId = 0;

    slideShowSources.forEach((group, groupIndex) => {
        const slides = [];

        group.imgSrcs.forEach(imgSrc => {
            slides.push({
                title: group.title,
                description: group.description,
                imgSrc: imgSrc,
                groupIndex: groupIndex,
                slideId: nextId++
            });

            if (groupIndexToFirstSlideIndex[groupIndex] === undefined) {
                groupIndexToFirstSlideIndex[groupIndex] = slides.length - 1;
            }
        });

        groups.push({
            slides: slides,
            index: groupIndex,
        });
    });

    return groups;
};

export const groupSlides = generateGroupSlideShowSlides();