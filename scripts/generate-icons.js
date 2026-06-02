const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'src', 'icons');

const arrowIcons = {
  ArrowUp: { d1: "M12 19V5", d2: "M5 12l7-7 7 7" },
  ArrowDown: { d1: "M12 5v14", d2: "M19 12l-7 7-7-7" },
  ArrowLeft: { d1: "M19 12H5", d2: "M12 19l-7-7 7-7" },
  ArrowRight: { d1: "M5 12h14", d2: "M12 5l7 7-7 7" },
  ArrowUpRight: { d1: "M7 17L17 7", d2: "M7 7h10v10" },
  ArrowUpLeft: { d1: "M17 17L7 7", d2: "M17 7H7v10" },
  ArrowDownRight: { d1: "M7 7l10 10", d2: "M17 7v10H7" },
  ArrowDownLeft: { d1: "M17 7L7 17", d2: "M7 7v10h10" }
};

const getTemplate = (name, inner) => `"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconProps } from "./GithubIcon";

let hasAnimated = false;

export const ${name}: React.FC<IconProps> = React.memo(
  ({ size, width, height, animate = false, ...props }) => {
    const resolvedSize = size ?? 24;
    const [shouldAnimate] = React.useState(() => animate && !hasAnimated);

    React.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated = true;
      }
    }, [shouldAnimate]);
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? resolvedSize}
        height={height ?? resolvedSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
${inner}
      </motion.svg>
    );
  }
);

${name}.displayName = "${name}";
`;

for (const [name, paths] of Object.entries(arrowIcons)) {
  const componentName = name + 'Icon';
  const inner = `        <motion.path
          d="${paths.d1}"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 0.8, ease: "easeInOut" } : {}}
        />
        <motion.path
          d="${paths.d2}"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 0.6, delay: 0.4, ease: "easeOut" } : {}}
        />`;
  fs.writeFileSync(path.join(iconsDir, componentName + '.tsx'), getTemplate(componentName, inner));
}

// SearchIcon
fs.writeFileSync(path.join(iconsDir, 'SearchIcon.tsx'), getTemplate('SearchIcon', `        <motion.circle
          cx="11"
          cy="11"
          r="8"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 1, ease: "easeInOut" } : {}}
        />
        <motion.path
          d="m21 21-4.3-4.3"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 0.5, delay: 0.8, ease: "easeOut" } : {}}
        />`));

// LoaderIcon (needs a custom rotation on the svg tag)
const loaderTemplate = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconProps } from "./GithubIcon";

let hasAnimated = false;

export const LoaderIcon: React.FC<IconProps> = React.memo(
  ({ size, width, height, animate = false, ...props }) => {
    const resolvedSize = size ?? 24;
    const [shouldAnimate] = React.useState(() => animate && !hasAnimated);

    React.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated = true;
      }
    }, [shouldAnimate]);
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? resolvedSize}
        height={height ?? resolvedSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={animate ? { rotate: 360 } : {}}
        transition={animate ? { repeat: Infinity, ease: "linear", duration: 1.5 } : {}}
        {...props}
      >
        <motion.path
          d="M21 12a9 9 0 1 1-6.219-8.56"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={shouldAnimate ? { duration: 1, ease: "easeInOut" } : {}}
        />
      </motion.svg>
    );
  }
);

LoaderIcon.displayName = "LoaderIcon";
`;
fs.writeFileSync(path.join(iconsDir, 'LoaderIcon.tsx'), loaderTemplate);

// Update index.ts
let indexContent = fs.readFileSync(path.join(iconsDir, 'index.ts'), 'utf-8');
const newExports = [
  'SearchIcon',
  'LoaderIcon',
  ...Object.keys(arrowIcons).map(name => name + 'Icon')
].map(name => `export * from "./${name}";`).join('\\n');

indexContent += '\\n' + newExports + '\\n';
fs.writeFileSync(path.join(iconsDir, 'index.ts'), indexContent);

console.log("All icons created and index.ts updated.");
