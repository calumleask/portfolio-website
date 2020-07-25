import React from "react";
import { useWindowDimensions } from "@providers/WindowDimensionsProvider";

type ResponsiveLayoutProps = {
    breakpoint: number | string;
    renderMobile: () => React.ReactElement | null;
    renderDesktop: () => React.ReactElement | null;
};

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ breakpoint, renderMobile, renderDesktop }: ResponsiveLayoutProps) => {
    if (typeof breakpoint === "string") breakpoint = parseInt(breakpoint);
    const { width } = useWindowDimensions();
    return (width >= breakpoint ? renderDesktop() : renderMobile());
};

export default ResponsiveLayout;
