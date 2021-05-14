import React, { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";

import { globalWindow } from "@helpers/global-window";

type WindowDimensionsContext = {
    width: number;
    height: number;
};

const defaultDimensions: WindowDimensionsContext = {
    width: 0,
    height: 0
};

const WindowDimensionsContext = createContext(defaultDimensions);

type WindowDimensionsProviderProps = PropsWithChildren<unknown>;

const WindowDimensionsProvider: React.FC<WindowDimensionsProviderProps> = (props: WindowDimensionsProviderProps) => {
    const [ dimensions, setDimensions ] = useState({
        width: globalWindow.innerWidth,
        height: globalWindow.innerHeight
    });

    useEffect(() => {
        const handleResize = (): void => {
            setDimensions({
                width: globalWindow.innerWidth,
                height: globalWindow.innerHeight
            });
        };
        globalWindow.addEventListener("resize", handleResize);
        return (): void => { globalWindow.removeEventListener("resize", handleResize); };
    }, []);

    return (
        <WindowDimensionsContext.Provider value={dimensions}>
            {props.children}
        </WindowDimensionsContext.Provider>
    );
};

export default WindowDimensionsProvider;
export const useWindowDimensions = (): WindowDimensionsContext => useContext(WindowDimensionsContext);
