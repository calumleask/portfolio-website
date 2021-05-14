
declare module "*.svg" {
    import React from "react";
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.md" {
    const value: string;
    export default value;
}
