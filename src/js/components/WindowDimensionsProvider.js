import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { globalWindow } from "src/helpers/global-window.js";

const WindowDimensionsContext = createContext(null);


const WindowDimensionsProvider = ({ children }) => {
    const [ dimensions, setDimensions ] = useState({
        width: globalWindow.innerWidth,
        height: globalWindow.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: globalWindow.innerWidth,
                height: globalWindow.innerHeight
            });
        };
        globalWindow.addEventListener("resize", handleResize);
        return () => { globalWindow.removeEventListener("resize", handleResize); };
    }, []);

    return (
        <WindowDimensionsContext.Provider value={dimensions}>
            {children}
        </WindowDimensionsContext.Provider>
    );
  };

  WindowDimensionsProvider.propTypes = {
      children: PropTypes.node.isRequired
  };
  
  export default WindowDimensionsProvider;
  export const useWindowDimensions = () => useContext(WindowDimensionsContext);