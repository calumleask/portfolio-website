
const white = "#FCFCFC";
const offWhite = "#F8F8F8";
const whiteSmoke = "#F5F5F5";
const lightGrey = "#E0E0E0";
const grey = "#A1A1A1";
const darkGrey = "#666";
const black = "#333";

const lightYellow = "#ffffea";
const yellow = "#fcfcda";

const lightBlue = "#dbf8ff";
const blue = "#5adcfc";

const orange = "#FFA500";
const darkOrange =  "#FF8C00";

const theme = {
    primary: blue,
    primaryLight: lightBlue,
    highlight: yellow,
    active: lightYellow,
};

export const color = {
    border: lightGrey,
    pageBackground: white,
    navBackground: black,
    footerBackground: black,
    navText: whiteSmoke,
    navTextSelected: theme.primary,
    footerText: whiteSmoke,
    footerLinkText: theme.primary,
    footerLinkTextHover: theme.highlight,
    footerLinkTextActive: theme.active,
    projectLink: {
        background: white,
        backgroundHover: whiteSmoke,
        backgroundActive: black,
        textActive: whiteSmoke,
        shadow: grey,
        title: black,
        excerpt: darkGrey
    },
    button: white,
    buttonHover: theme.highlight,
    buttonActive: theme.active,
    buttonSelected: black,
    buttonSelectedHover: black,
    buttonSelectedActive: black,
    buttonText: black,
    buttonTextHover: black,
    buttonTextActive: black,
    buttonTextSelected: whiteSmoke,
    buttonTextSelectedHover: theme.primary,
    buttonTextSelectedActive: theme.primary,
    buttonBorder: grey,
    buttonShadow: grey,
    expander: {
        default: white,
        hover: theme.primaryLight,
        active: black,
        expanded: black,
        expandedHover: black,
        expandedActive: black,
        text: black,
        textHover: black,
        textActive: whiteSmoke,
        textExpanded: whiteSmoke,
        textExpandedHover: whiteSmoke,
        textExpandedActive: theme.active,
        border: grey,
        rowOdd: white,
        rowOddText: black,
        rowEven: offWhite,
        rowEvenText: black,
        rowHover: theme.primaryLight,
        rowSelected: theme.primary,
        rowTextSelected: black,
        rowBorder: lightGrey
    }
};