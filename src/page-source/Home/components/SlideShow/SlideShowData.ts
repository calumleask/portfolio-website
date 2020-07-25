import AMPS_0 from "@images/a_musical_platforming_symphony_0.png";
import AMPS_1 from "@images/a_musical_platforming_symphony_1.png";
import AMPS_2 from "@images/a_musical_platforming_symphony_2.png";
import AMPS_3 from "@images/a_musical_platforming_symphony_3.png";
import CITY_0 from "@images/a_procedural_city_0.png";
import CITY_1 from "@images/a_procedural_city_1.png";
import CITY_2 from "@images/a_procedural_city_2.png";
import CITY_3 from "@images/a_procedural_city_3.png";
import WAVES_0 from "@images/breaking_waves_0.png";
import WAVES_1 from "@images/breaking_waves_1.png";
import WAVES_2 from "@images/breaking_waves_2.png";
import WAVES_3 from "@images/breaking_waves_3.png";
import OCEAN_0 from "@images/ocean_water_0.png";
import OCEAN_1 from "@images/ocean_water_1.png";
import OPENGL_0 from "@images/opengl_0.png";
import OPENGL_1 from "@images/opengl_1.png";

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


export const carouselProjectCards = [
    {
        title: wavesTitle,
        description: wavesDesc,
        images: [WAVES_0, WAVES_1, WAVES_2, WAVES_3]
    },
    {
        title: cityTitle,
        description: cityDesc,
        images: [CITY_0, CITY_1, CITY_2, CITY_3]
    },
    {
        title: ampsTitle,
        description: ampsDesc,
        images: [AMPS_0, AMPS_1, AMPS_2, AMPS_3]
    },
    {
        title: oceanTitle,
        description: oceanDesc,
        images: [OCEAN_0, OCEAN_1]
    },
    {
        title: openglTitle,
        description: openglDesc,
        images: [OPENGL_0, OPENGL_1]
    }
];
