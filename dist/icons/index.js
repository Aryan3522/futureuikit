"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/icons/index.ts
var icons_exports = {};
__export(icons_exports, {
  ChevronDownIcon: () => ChevronDownIcon,
  ChevronLeftIcon: () => ChevronLeftIcon,
  ChevronRightIcon: () => ChevronRightIcon,
  ChevronUpIcon: () => ChevronUpIcon,
  DiscordIcon: () => DiscordIcon,
  GithubIcon: () => GithubIcon,
  InstagramIcon: () => InstagramIcon,
  LinkedinIcon: () => LinkedinIcon,
  TwitterIcon: () => TwitterIcon,
  XIcon: () => XIcon,
  YoutubeIcon: () => YoutubeIcon
});
module.exports = __toCommonJS(icons_exports);

// src/icons/GithubIcon.tsx
var import_react = __toESM(require("react"));
var import_framer_motion = require("framer-motion");
var import_jsx_runtime = require("react/jsx-runtime");
var hasAnimated = false;
var GithubIcon = import_react.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react.default.useState(() => animate && !hasAnimated);
    import_react.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_framer_motion.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.path,
            {
              d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
              initial: shouldAnimate ? { pathLength: 0 } : { pathLength: 1 },
              animate: shouldAnimate ? { pathLength: 1 } : { pathLength: 1 },
              transition: shouldAnimate ? { duration: 1.5, ease: "easeInOut" } : {}
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.path,
            {
              d: "M9 18c-4.51 2-4.5-2-7-2",
              initial: shouldAnimate ? { pathLength: 0 } : { pathLength: 1 },
              animate: shouldAnimate ? { pathLength: 1 } : { pathLength: 1 },
              transition: shouldAnimate ? { duration: 1, ease: "easeInOut", delay: 0.5 } : {}
            }
          )
        ]
      })
    );
  }
);
GithubIcon.displayName = "GithubIcon";

// src/icons/LinkedinIcon.tsx
var import_react2 = __toESM(require("react"));
var import_framer_motion2 = require("framer-motion");
var import_jsx_runtime2 = require("react/jsx-runtime");
var hasAnimated2 = false;
var LinkedinIcon = import_react2.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react2.default.useState(() => animate && !hasAnimated2);
    import_react2.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated2 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      import_framer_motion2.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_framer_motion2.motion.path,
            {
              d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
              initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
              animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
              transition: shouldAnimate ? { duration: 1.2, ease: "easeOut" } : {}
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_framer_motion2.motion.rect,
            {
              x: "2",
              y: "9",
              width: "4",
              height: "12",
              initial: shouldAnimate ? { scaleY: 0, originY: 1 } : { scaleY: 1 },
              animate: shouldAnimate ? { scaleY: 1 } : { scaleY: 1 },
              transition: shouldAnimate ? { duration: 0.8, delay: 0.3 } : {}
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_framer_motion2.motion.circle,
            {
              cx: "4",
              cy: "4",
              r: "2",
              initial: shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 },
              animate: shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 },
              transition: shouldAnimate ? { type: "spring", stiffness: 300, delay: 0.8 } : {}
            }
          )
        ]
      })
    );
  }
);
LinkedinIcon.displayName = "LinkedinIcon";

// src/icons/TwitterIcon.tsx
var import_react3 = __toESM(require("react"));
var import_framer_motion3 = require("framer-motion");
var import_jsx_runtime3 = require("react/jsx-runtime");
var hasAnimated3 = false;
var TwitterIcon = import_react3.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react3.default.useState(() => animate && !hasAnimated3);
    import_react3.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated3 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_framer_motion3.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_framer_motion3.motion.path,
          {
            d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
            initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
            animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
            transition: shouldAnimate ? { duration: 1.5, ease: "easeInOut" } : {}
          }
        )
      })
    );
  }
);
TwitterIcon.displayName = "TwitterIcon";

// src/icons/InstagramIcon.tsx
var import_react4 = __toESM(require("react"));
var import_framer_motion4 = require("framer-motion");
var import_jsx_runtime4 = require("react/jsx-runtime");
var hasAnimated4 = false;
var InstagramIcon = import_react4.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react4.default.useState(() => animate && !hasAnimated4);
    import_react4.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated4 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      import_framer_motion4.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            import_framer_motion4.motion.rect,
            {
              x: "2",
              y: "2",
              width: "20",
              height: "20",
              rx: "5",
              ry: "5",
              initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
              animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
              transition: shouldAnimate ? { duration: 1.5, ease: "easeInOut" } : {}
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            import_framer_motion4.motion.path,
            {
              d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
              initial: shouldAnimate ? { pathLength: 0, opacity: 0, rotate: -45 } : { pathLength: 1, opacity: 1, rotate: 0 },
              animate: shouldAnimate ? { pathLength: 1, opacity: 1, rotate: 0 } : { pathLength: 1, opacity: 1, rotate: 0 },
              transition: shouldAnimate ? { duration: 1.2, delay: 0.5, ease: "easeOut" } : {}
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            import_framer_motion4.motion.line,
            {
              x1: "17.5",
              y1: "6.5",
              x2: "17.51",
              y2: "6.5",
              initial: shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 },
              animate: shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 },
              transition: shouldAnimate ? { type: "spring", stiffness: 300, delay: 1.2 } : {}
            }
          )
        ]
      })
    );
  }
);
InstagramIcon.displayName = "InstagramIcon";

// src/icons/DiscordIcon.tsx
var import_react5 = __toESM(require("react"));
var import_framer_motion5 = require("framer-motion");
var import_jsx_runtime5 = require("react/jsx-runtime");
var hasAnimated5 = false;
var DiscordIcon = import_react5.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react5.default.useState(() => animate && !hasAnimated5);
    import_react5.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated5 = true;
      }
    }, [shouldAnimate]);
    const rawId = (0, import_react5.useId)();
    const maskId = "discord-mask-" + rawId.replace(/:/g, "");
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      import_framer_motion5.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        stroke: "none"
      }, props), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("mask", { id: maskId, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { width: "100%", height: "100%", fill: "white" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              import_framer_motion5.motion.path,
              {
                d: "M8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189z",
                fill: "black",
                initial: shouldAnimate ? { scale: 0 } : { scale: 1 },
                animate: shouldAnimate ? { scale: [1, 1.2, 1] } : { scale: 1 },
                transition: shouldAnimate ? { repeat: Infinity, duration: 2, delay: 1 } : {},
                style: { transformOrigin: "8px 13px" }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              import_framer_motion5.motion.path,
              {
                d: "M15.9948 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z",
                fill: "black",
                initial: shouldAnimate ? { scale: 0 } : { scale: 1 },
                animate: shouldAnimate ? { scale: [1, 1.2, 1] } : { scale: 1 },
                transition: shouldAnimate ? { repeat: Infinity, duration: 2, delay: 1.2 } : {},
                style: { transformOrigin: "16px 13px" }
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            import_framer_motion5.motion.path,
            {
              d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z",
              mask: `url(#${maskId})`,
              initial: shouldAnimate ? { pathLength: 0, fillOpacity: 0, opacity: 0 } : { pathLength: 1, fillOpacity: 1, opacity: 1 },
              animate: shouldAnimate ? { pathLength: 1, fillOpacity: 1, opacity: 1 } : { pathLength: 1, fillOpacity: 1, opacity: 1 },
              transition: shouldAnimate ? {
                pathLength: { duration: 1.5, ease: "easeInOut" },
                opacity: { duration: 0.1 },
                fillOpacity: { duration: 0.5, delay: 1.5 }
              } : {},
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinejoin: "round"
            }
          )
        ]
      })
    );
  }
);
DiscordIcon.displayName = "DiscordIcon";

// src/icons/YoutubeIcon.tsx
var import_react6 = __toESM(require("react"));
var import_framer_motion6 = require("framer-motion");
var import_jsx_runtime6 = require("react/jsx-runtime");
var hasAnimated6 = false;
var YoutubeIcon = import_react6.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react6.default.useState(() => animate && !hasAnimated6);
    import_react6.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated6 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      import_framer_motion6.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            import_framer_motion6.motion.path,
            {
              d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z",
              initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
              animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
              transition: shouldAnimate ? { duration: 1.5, ease: "easeInOut" } : {}
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            import_framer_motion6.motion.polygon,
            {
              points: "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02",
              initial: shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 },
              animate: shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 },
              transition: shouldAnimate ? { type: "spring", stiffness: 200, delay: 0.8 } : {}
            }
          )
        ]
      })
    );
  }
);
YoutubeIcon.displayName = "YoutubeIcon";

// src/icons/XIcon.tsx
var import_react7 = __toESM(require("react"));
var import_framer_motion7 = require("framer-motion");
var import_jsx_runtime7 = require("react/jsx-runtime");
var hasAnimated7 = false;
var XIcon = import_react7.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react7.default.useState(() => animate && !hasAnimated7);
    import_react7.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated7 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      import_framer_motion7.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            import_framer_motion7.motion.path,
            {
              d: "M4 4l11.733 16h4.267l-11.733-16z",
              initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
              animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
              transition: shouldAnimate ? { duration: 1, ease: "easeInOut" } : {}
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            import_framer_motion7.motion.path,
            {
              d: "M4 20l6.768-6.768m2.464-2.464l6.768-6.768",
              initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
              animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
              transition: shouldAnimate ? { duration: 1, delay: 0.3, ease: "easeInOut" } : {}
            }
          )
        ]
      })
    );
  }
);
XIcon.displayName = "XIcon";

// src/icons/ChevronUpIcon.tsx
var import_react8 = __toESM(require("react"));
var import_framer_motion8 = require("framer-motion");
var import_jsx_runtime8 = require("react/jsx-runtime");
var hasAnimated8 = false;
var ChevronUpIcon = import_react8.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react8.default.useState(() => animate && !hasAnimated8);
    import_react8.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated8 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      import_framer_motion8.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          import_framer_motion8.motion.path,
          {
            d: "m18 15-6-6-6 6",
            initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
            animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
            transition: shouldAnimate ? { duration: 0.8, ease: "easeOut" } : {}
          }
        )
      })
    );
  }
);
ChevronUpIcon.displayName = "ChevronUpIcon";

// src/icons/ChevronDownIcon.tsx
var import_react9 = __toESM(require("react"));
var import_framer_motion9 = require("framer-motion");
var import_jsx_runtime9 = require("react/jsx-runtime");
var hasAnimated9 = false;
var ChevronDownIcon = import_react9.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react9.default.useState(() => animate && !hasAnimated9);
    import_react9.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated9 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      import_framer_motion9.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          import_framer_motion9.motion.path,
          {
            d: "m6 9 6 6 6-6",
            initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
            animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
            transition: shouldAnimate ? { duration: 0.8, ease: "easeOut" } : {}
          }
        )
      })
    );
  }
);
ChevronDownIcon.displayName = "ChevronDownIcon";

// src/icons/ChevronLeftIcon.tsx
var import_react10 = __toESM(require("react"));
var import_framer_motion10 = require("framer-motion");
var import_jsx_runtime10 = require("react/jsx-runtime");
var hasAnimated10 = false;
var ChevronLeftIcon = import_react10.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react10.default.useState(() => animate && !hasAnimated10);
    import_react10.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated10 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      import_framer_motion10.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          import_framer_motion10.motion.path,
          {
            d: "m15 18-6-6 6-6",
            initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
            animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
            transition: shouldAnimate ? { duration: 0.8, ease: "easeOut" } : {}
          }
        )
      })
    );
  }
);
ChevronLeftIcon.displayName = "ChevronLeftIcon";

// src/icons/ChevronRightIcon.tsx
var import_react11 = __toESM(require("react"));
var import_framer_motion11 = require("framer-motion");
var import_jsx_runtime11 = require("react/jsx-runtime");
var hasAnimated11 = false;
var ChevronRightIcon = import_react11.default.memo(
  (_a) => {
    var _b = _a, { size, width, height, animate = false } = _b, props = __objRest(_b, ["size", "width", "height", "animate"]);
    const resolvedSize = size != null ? size : 24;
    const [shouldAnimate] = import_react11.default.useState(() => animate && !hasAnimated11);
    import_react11.default.useEffect(() => {
      if (shouldAnimate) {
        hasAnimated11 = true;
      }
    }, [shouldAnimate]);
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      import_framer_motion11.motion.svg,
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: width != null ? width : resolvedSize,
        height: height != null ? height : resolvedSize,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          import_framer_motion11.motion.path,
          {
            d: "m9 18 6-6-6-6",
            initial: shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 },
            animate: shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 },
            transition: shouldAnimate ? { duration: 0.8, ease: "easeOut" } : {}
          }
        )
      })
    );
  }
);
ChevronRightIcon.displayName = "ChevronRightIcon";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  XIcon,
  YoutubeIcon
});
