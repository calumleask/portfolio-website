import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext(null);

const mql = window.matchMedia("(min-width: 600px)");

const layoutMode = {
    narrow: "narrow",
    normal: "normal",
    wide: "wide"
};

const getLayoutMode = () => {
    return mql.matches ? layoutMode.normal : layoutMode.narrow;
};

const ThemeProvider = ({ children }) => {

    const [ layout, setLayout ] = useState(getLayoutMode());

    const [ styles ] = useState({
        color: {
            pageBackground: "#f8f8f8",
            mobileNavBackground: "#f0f0f0",
            mobileFooterBackground: "#f0f0f0",
            navText: "#888",
            navTextActive: "#444"
        }
    });

    useEffect(() => {
        const mediaQueryChange = () => {
            setLayout(getLayoutMode());
        };
        mql.addListener(mediaQueryChange);
        return () => { mql.removeListener(mediaQueryChange); };
    }, []);

    return (
        <ThemeContext.Provider value={{ layout, styles }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.displayName = "ThemeProvider";

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ThemeProvider;

export const withThemeContext = (Component) => {
    const WrapperComponent = (props) => {
        return (
            <ThemeContext.Consumer>
                {state => <Component {...props} theme={state}/>}
            </ThemeContext.Consumer>
        );
    };
    return WrapperComponent;
};