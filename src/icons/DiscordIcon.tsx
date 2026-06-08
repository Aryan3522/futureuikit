"use client";

import React, { useId } from"react";
import { motion } from"framer-motion";
import { IconProps } from"./GithubIcon";

let hasAnimated = false;

export const DiscordIcon: React.FC<IconProps> = React.memo(
 ({ size, width, height, animate = false, ...props }) => {
 const resolvedSize = size ?? 24;
 const [shouldAnimate] = React.useState(() => animate && !hasAnimated);

 React.useEffect(() => {
 if (shouldAnimate) {
 hasAnimated = true;
 }
 }, [shouldAnimate]);
 // Replace colons so it's a valid ID for CSS
 const rawId = useId();
 const maskId ="discord-mask-"+ rawId.replace(/:/g,"");

 return (
 <motion.svg
 xmlns="http://www.w3.org/2000/svg"
 width={width ?? resolvedSize}
 height={height ?? resolvedSize}
 viewBox="0 0 24 24"
 fill="currentColor"
 stroke="none"
 {...props}
 >
 <defs>
 <mask id={maskId}>
 <rect width="100%"height="100%"fill="white"/>
 <motion.path
 d="M8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189z"
 fill="black"
 initial={shouldAnimate ? { scale: 0 } : { scale: 1 }}
 animate={shouldAnimate ? { scale: [1, 1.2, 1] } : { scale: 1 }}
 transition={shouldAnimate ? { repeat: Infinity, duration: 2, delay: 1 } : {}}
 style={{ transformOrigin:"8px 13px"}}
 />
 <motion.path
 d="M15.9948 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"
 fill="black"
 initial={shouldAnimate ? { scale: 0 } : { scale: 1 }}
 animate={shouldAnimate ? { scale: [1, 1.2, 1] } : { scale: 1 }}
 transition={shouldAnimate ? { repeat: Infinity, duration: 2, delay: 1.2 } : {}}
 style={{ transformOrigin:"16px 13px"}}
 />
 </mask>
 </defs>

 <motion.path
 d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"
 mask={`url(#${maskId})`}
 initial={shouldAnimate ? { pathLength: 0, fillOpacity: 0, opacity: 0 } : { pathLength: 1, fillOpacity: 1, opacity: 1 }}
 animate={shouldAnimate ? { pathLength: 1, fillOpacity: 1, opacity: 1 } : { pathLength: 1, fillOpacity: 1, opacity: 1 }}
 transition={shouldAnimate ? {
 pathLength: { duration: 1.5, ease:"easeInOut"},
 opacity: { duration: 0.1 },
 fillOpacity: { duration: 0.5, delay: 1.5 }
 } : {}}
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinejoin="round"
 />
 </motion.svg>
 );
 }
);

DiscordIcon.displayName ="DiscordIcon";
