import React from "react";
import { SVGMotionProps } from "framer-motion";
export interface IconProps extends SVGMotionProps<SVGSVGElement> {
    size?: number | string;
    animate?: boolean;
}
export declare const GithubIcon: React.FC<IconProps>;
