var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// dailies-dep:remotion
var require_remotion = __commonJS({
  "dailies-dep:remotion"(exports, module) {
    module.exports = globalThis.__DAILIES_DEPS__["remotion"];
  }
});

// dailies-dep:react/jsx-runtime
var require_jsx_runtime = __commonJS({
  "dailies-dep:react/jsx-runtime"(exports, module) {
    module.exports = globalThis.__DAILIES_DEPS__["react/jsx-runtime"];
  }
});

// workspaces/kestrel-runner-launch-spot-0415/versions/v1/Video.tsx
var import_remotion = __toESM(require_remotion(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var composition = {
  fps: 30,
  durationInFrames: 360,
  shots: [
    { n: 1, title: "Product hero", from: 0, durationInFrames: 90 },
    { n: 2, title: "Detail", from: 90, durationInFrames: 120 },
    { n: 3, title: "Call to action", from: 210, durationInFrames: 150 }
  ]
};
var SANS = 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
var C = {
  night0: "#03050b",
  night1: "#08101f",
  night2: "#0f1c33",
  teal: "#12b5a6",
  tealDeep: "#0a6f6a",
  tealLight: "#5ff3df",
  orange: "#ff6a1a",
  orangeLight: "#ffa04d",
  orangeDeep: "#c2410c",
  ink: "#f4fbfa"
};
var clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
var easeOut = import_remotion.Easing.bezier(0.16, 1, 0.3, 1);
var easeInOut = import_remotion.Easing.bezier(0.65, 0, 0.35, 1);
var hash = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
var useLayout = () => {
  const { width, height, fps } = (0, import_remotion.useVideoConfig)();
  const ratio = width / height;
  const kind = ratio > 1.2 ? "landscape" : ratio < 0.83 ? "portrait" : "square";
  const pick = (l, p, s) => kind === "landscape" ? l : kind === "portrait" ? p : s;
  return { width, height, fps, kind, pick };
};
var Shoe = ({ width, id }) => {
  const g = (name) => `${id}-${name}`;
  const eyelets = [0, 1, 2, 3, 4];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      viewBox: "0 0 800 400",
      width,
      height: width / 2,
      style: { display: "block", overflow: "visible" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: g("upper"), x1: "0", y1: "0", x2: "0.2", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: C.tealLight }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.45", stopColor: C.teal }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.tealDeep })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: g("sole"), x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: C.orangeLight }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.55", stopColor: C.orange }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.orangeDeep })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: g("sheen"), x1: "0", y1: "0", x2: "1", y2: "0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#fff", stopOpacity: "0" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.5", stopColor: "#fff", stopOpacity: "0.55" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#fff", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: g("shadow"), cx: "0.5", cy: "0.5", r: "0.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#000", stopOpacity: "0.75" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#000", stopOpacity: "0" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "410", cy: "362", rx: "380", ry: "26", fill: `url(#${g("shadow")})` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M92 270 C 76 214 92 160 140 132 C 172 114 206 106 238 110 L 262 120 C 284 150 318 162 352 156 C 402 150 442 160 482 178 C 562 210 642 222 702 236 C 744 246 770 264 766 288 L 700 272 C 560 276 420 276 300 270 Z",
            fill: `url(#${g("upper")})`
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M92 270 C 80 214 96 166 140 138 L 172 130 C 160 182 166 232 184 270 Z", fill: C.tealDeep, opacity: "0.85" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M140 132 C 180 110 226 104 262 120 C 248 132 214 130 172 142 Z", fill: "#06302f" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M262 120 C 266 90 298 74 330 82 C 346 108 354 136 352 156 C 318 162 284 150 262 120 Z", fill: C.tealLight, opacity: "0.9" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M592 214 C 660 226 742 242 766 286 L 700 272 L 586 268 C 600 250 602 232 592 214 Z", fill: C.tealLight, opacity: "0.35" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M352 246 C 430 240 512 222 584 190 C 540 226 476 250 400 258 Z", fill: C.ink, opacity: "0.92" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M392 262 C 452 260 512 250 566 230 C 530 254 482 266 430 268 Z", fill: C.orange }),
        eyelets.map((i) => {
          const x = 286 + i * 40;
          const y = 150 + i * 9;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: x, cy: y + 16, r: "5", fill: "#06302f" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M${x - 8} ${y + 2} L ${x + 30} ${y + 18}`, stroke: C.ink, strokeWidth: "7", strokeLinecap: "round" })
          ] }, i);
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M150 140 C 210 118 250 124 270 140 C 320 170 420 166 500 196 C 580 222 680 236 740 256",
            stroke: `url(#${g("sheen")})`,
            strokeWidth: "6",
            fill: "none",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M58 300 C 58 334 88 352 132 352 L 662 352 C 724 352 762 334 766 304 L 766 298 L 58 298 Z", fill: C.orangeDeep }),
        [...Array(14)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 110 + i * 44, y: 340, width: "18", height: "10", rx: "3", fill: "#8a2c07" }, i)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M62 300 C 56 272 70 256 94 258 L 300 266 C 420 272 560 272 702 264 C 746 262 770 278 766 302 C 760 322 740 328 700 328 L 120 328 C 82 328 64 320 62 300 Z",
            fill: `url(#${g("sole")})`
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M96 300 C 250 308 500 308 744 292", stroke: "#fff", strokeOpacity: "0.4", strokeWidth: "3", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M140 316 C 300 320 520 318 700 312", stroke: "#7c2d12", strokeOpacity: "0.45", strokeWidth: "3", fill: "none" })
      ]
    }
  );
};
var SoleDetail = ({ sweep }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 1600 700", width: "100%", height: "100%", preserveAspectRatio: "xMidYMid meet", style: { display: "block", overflow: "visible" }, children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "sd-upper", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: C.tealDeep }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.6", stopColor: C.teal }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.tealLight })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "sd-mid", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: C.orangeLight }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.5", stopColor: C.orange }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.orangeDeep })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "sd-sweep", x1: "0", y1: "0", x2: "1", y2: "0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#fff", stopOpacity: "0" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.5", stopColor: "#fff", stopOpacity: "0.42" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#fff", stopOpacity: "0" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: "sd-mesh", width: "22", height: "22", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "4", fill: "#043c39", opacity: "0.55" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("clipPath", { id: "sd-clip", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0 H1600 V250 C 1400 262 1200 268 800 268 C 400 268 200 262 0 250 Z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 250 C 200 262 400 268 800 268 C 1200 268 1400 262 1600 250 V 620 C 1400 640 200 640 0 620 Z" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: "sd-shadow", cx: "0.5", cy: "0.5", r: "0.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#000", stopOpacity: "0.8" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#000", stopOpacity: "0" })
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "800", cy: "660", rx: "820", ry: "40", fill: "url(#sd-shadow)" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0 H1600 V250 C 1400 262 1200 268 800 268 C 400 268 200 262 0 250 Z", fill: "url(#sd-upper)" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0 H1600 V250 C 1400 262 1200 268 800 268 C 400 268 200 262 0 250 Z", fill: "url(#sd-mesh)" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 236 C 200 248 400 254 800 254 C 1200 254 1400 248 1600 236", stroke: C.ink, strokeOpacity: "0.7", strokeWidth: "4", strokeDasharray: "16 12", fill: "none" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 250 C 200 262 400 268 800 268 C 1200 268 1400 262 1600 250 V 540 H 0 Z", fill: "url(#sd-mid)" }),
  [0, 1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      d: `M0 ${330 + i * 50} C 300 ${300 + i * 50} 520 ${380 + i * 50} 800 ${340 + i * 50} C 1080 ${300 + i * 50} 1300 ${370 + i * 50} 1600 ${320 + i * 50}`,
      stroke: i % 2 ? "#7c2d12" : "#fff",
      strokeOpacity: i % 2 ? 0.35 : 0.28,
      strokeWidth: i % 2 ? 6 : 4,
      fill: "none"
    },
    i
  )),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 540 H 1600 V 620 C 1400 640 200 640 0 620 Z", fill: C.orangeDeep }),
  [...Array(27)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 10 + i * 60, y: 560, width: "38", height: "54", rx: "8", fill: "#8a2c07" }, i)),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { clipPath: "url(#sd-clip)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: sweep * 2200 - 600, y: "-20", width: "420", height: "700", fill: "url(#sd-sweep)", transform: "skewX(-18)" }) })
] });
var Skyline = ({ frame }) => {
  const layer = (seed, count, minH, maxH, fill, lit, drift) => {
    let x = -200;
    const items = [];
    for (let i = 0; i < count; i++) {
      const w = 70 + hash(seed + i) * 110;
      const h = minH + hash(seed + i * 3.7) * (maxH - minH);
      const y = 900 - h;
      items.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x, y, width: w, height: h, fill }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: x + 8, y: y + 14, width: w - 16, height: h - 14, fill: `url(#win-${seed})`, opacity: lit * (0.25 + hash(seed + i * 9.1) * 0.75) }),
          hash(seed + i * 5.3) > 0.8 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: x + w / 2 - 2, y: y - 40, width: "4", height: "40", fill }) : null
        ] }, i)
      );
      x += w + 6;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `translate(${-frame * drift} 0)`, children: items });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 2400 900", width: "100%", height: "100%", preserveAspectRatio: "xMidYMax slice", style: { position: "absolute", inset: 0 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: "win-11", width: "22", height: "30", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "6", width: "9", height: "12", fill: "#7fb6d6", opacity: "0.35" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: "win-47", width: "26", height: "34", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "7", y: "7", width: "11", height: "14", fill: "#ffc48a", opacity: "0.55" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "haze", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: C.night0, stopOpacity: "0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.night0, stopOpacity: "0.9" })
      ] })
    ] }),
    layer(11, 30, 260, 620, "#0e1a30", 0.6, 0.25),
    layer(47, 26, 140, 420, "#060b16", 1, 0.7),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "0", y: "600", width: "2400", height: "300", fill: "url(#haze)" })
  ] });
};
var CutWipe = ({ color }) => {
  const f = (0, import_remotion.useCurrentFrame)();
  const p = (0, import_remotion.interpolate)(f, [0, 12], [0, 1], { ...clamp, easing: easeInOut });
  if (p >= 1) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_remotion.AbsoluteFill,
    {
      style: {
        background: color,
        transform: `translateX(${p * 130}%) skewX(-12deg)`,
        transformOrigin: "center",
        width: "130%",
        left: "-15%"
      }
    }
  );
};
var Vignette = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  import_remotion.AbsoluteFill,
  {
    style: {
      pointerEvents: "none",
      background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.6) 100%)"
    }
  }
);
var ShotHero = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { width, height, fps, pick } = useLayout();
  const slide = (0, import_remotion.spring)({ frame: f, fps, config: { damping: 16, stiffness: 80, mass: 1.1 } });
  const shoeW = pick(width * 0.5, width * 0.88, width * 0.74);
  const shoeX = (0, import_remotion.interpolate)(slide, [0, 1], [-width * 0.5 - shoeW, 0]);
  const tilt = (0, import_remotion.interpolate)(slide, [0, 1], [-7, 0]);
  const float = Math.sin(f / 11) * 5 * (0, import_remotion.interpolate)(f, [20, 40], [0, 1], clamp);
  const shoeCenterY = height * pick(0.44, 0.42, 0.42);
  const speed = (0, import_remotion.interpolate)(slide, [0, 0.85, 1], [1, 0.4, 0], clamp);
  const cap = (0, import_remotion.spring)({ frame: f - 30, fps, config: { damping: 200 } });
  const capSize = pick(132, 112, 104);
  const capTop = height * pick(0.72, 0.64, 0.74);
  const rule = (0, import_remotion.interpolate)(f, [26, 50], [0, 1], { ...clamp, easing: easeOut });
  const camera = (0, import_remotion.interpolate)(f, [0, 90], [1.04, 1], { ...clamp, easing: easeOut });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: C.night0, overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { "data-layer": "background", style: { transform: `scale(${camera})` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_remotion.AbsoluteFill,
        {
          style: {
            background: `radial-gradient(ellipse at 70% 20%, ${C.night2} 0%, ${C.night1} 40%, ${C.night0} 80%)`
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_remotion.AbsoluteFill,
        {
          style: {
            background: `radial-gradient(circle at 50% ${pick(70, 55, 62)}%, rgba(18,181,166,0.22), rgba(18,181,166,0) 45%)`
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", left: 0, right: 0, top: 0, height: height * 0.62 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skyline, { frame: f }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: height * 0.62,
            bottom: 0,
            background: `linear-gradient(180deg, #0a1426 0%, ${C.night0} 70%)`
          }
        }
      ),
      [0, 1, 2, 3, 4, 5].map((i) => {
        const y = height * (0.64 + hash(i + 3) * 0.3);
        const len = width * (0.12 + hash(i + 9) * 0.2);
        const x = ((width * 1.6 * hash(i + 21) - f * (10 + hash(i) * 14)) % (width * 1.6) + width * 1.6) % (width * 1.6) - width * 0.3;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: {
              position: "absolute",
              left: x,
              top: y,
              width: len,
              height: 3,
              borderRadius: 3,
              background: `linear-gradient(90deg, rgba(255,255,255,0), ${i % 2 ? C.orange : C.tealLight})`,
              opacity: 0.45,
              filter: "blur(1px)"
            }
          },
          i
        );
      })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: 0,
          width: width / 2 + shoeX,
          top: shoeCenterY - shoeW * 0.12,
          height: shoeW * 0.26,
          opacity: speed * 0.8,
          background: `repeating-linear-gradient(180deg, rgba(95,243,223,0) 0px, rgba(95,243,223,0) 14px, rgba(95,243,223,0.5) 14px, rgba(95,243,223,0.5) 16px)`,
          maskImage: "linear-gradient(90deg, transparent, black)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black)"
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "product",
        style: {
          position: "absolute",
          left: (width - shoeW) / 2,
          top: shoeCenterY - shoeW / 4,
          width: shoeW,
          transform: `translate(${shoeX}px, ${float}px) rotate(${tilt}deg)`,
          filter: `drop-shadow(0 ${shoeW * 0.04}px ${shoeW * 0.05}px rgba(0,0,0,0.6)) drop-shadow(0 0 ${shoeW * 0.08}px rgba(18,181,166,0.25))`
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { width: shoeW, id: "hero" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: (width - shoeW) / 2,
          top: shoeCenterY + shoeW / 4 - shoeW * 0.06,
          width: shoeW,
          transform: `translate(${shoeX}px, 0) scaleY(-1)`,
          opacity: 0.16,
          filter: "blur(4px)",
          maskImage: "linear-gradient(0deg, black, transparent 45%)",
          WebkitMaskImage: "linear-gradient(0deg, black, transparent 45%)"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { width: shoeW, id: "hero-reflect" })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          top: capTop,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 140 * rule, height: 4, borderRadius: 2, background: C.orange } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflow: "hidden", padding: "0 0 12px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "caption",
              style: {
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: capSize,
                letterSpacing: "-0.035em",
                lineHeight: 1,
                color: C.ink,
                whiteSpace: "nowrap",
                transform: `translateY(${(1 - cap) * 110}%)`,
                opacity: cap,
                textShadow: "0 8px 40px rgba(0,0,0,0.6)"
              },
              children: "Run the city"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {})
  ] });
};
var ShotDetail = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { width, height, fps, pick } = useLayout();
  const push = (0, import_remotion.interpolate)(f, [0, 120], [1.12, 1], { ...clamp, easing: easeOut });
  const pan = (0, import_remotion.interpolate)(f, [0, 120], [3, -3], clamp);
  const sweep = (0, import_remotion.interpolate)(f, [8, 80], [0, 1], { ...clamp, easing: easeInOut });
  const soleW = pick(width * 1.12, width * 1.9, width * 1.35);
  const soleH = soleW * (700 / 1600);
  const soleCY = height * pick(0.6, 0.5, 0.56);
  const wmOpacity = (0, import_remotion.interpolate)(f, [14, 40], [0, 1], { ...clamp, easing: easeOut });
  const wmReveal = (0, import_remotion.interpolate)(f, [14, 46], [100, -10], { ...clamp, easing: easeOut });
  const wmTrack = (0, import_remotion.interpolate)(f, [14, 60], [0.42, 0.22], { ...clamp, easing: easeOut });
  const wmSize = pick(200, 132, 132);
  const wmTop = height * pick(0.1, 0.16, 0.1);
  const tag = (0, import_remotion.spring)({ frame: f - 44, fps, config: { damping: 11, stiffness: 120 } });
  const swing = (0, import_remotion.interpolate)(tag, [0, 1], [-18, -4]);
  const priceSize = pick(104, 96, 88);
  const tagPos = pick(
    { left: width * 0.66, top: height * 0.68 },
    { left: width * 0.5 - 170, top: height * 0.72 },
    { left: width * 0.56, top: height * 0.76 }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: C.night0, overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        "data-layer": "background",
        style: {
          background: `radial-gradient(ellipse at 50% ${pick(60, 50, 56)}%, #2a1408 0%, #120a08 40%, ${C.night0} 75%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: `radial-gradient(circle at 50% ${pick(40, 40, 40)}%, rgba(18,181,166,0.18), rgba(0,0,0,0) 55%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "product",
        style: {
          position: "absolute",
          left: (width - soleW) / 2,
          top: soleCY - soleH / 2,
          width: soleW,
          height: soleH,
          transform: `scale(${push}) translateX(${pan}%) rotate(-2deg)`,
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoleDetail, { sweep })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", left: 0, right: 0, top: wmTop, display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "wordmark",
        style: {
          fontFamily: SANS,
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: wmSize,
          lineHeight: 1,
          letterSpacing: `${wmTrack}em`,
          marginRight: `-${wmTrack}em`,
          color: C.ink,
          whiteSpace: "nowrap",
          opacity: wmOpacity,
          clipPath: `inset(-20% ${wmReveal}% -20% -10%)`,
          textShadow: "0 10px 50px rgba(0,0,0,0.55)"
        },
        children: "KESTREL"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "absolute",
          ...tagPos,
          transformOrigin: "24px 50%",
          transform: `rotate(${swing}deg) scale(${(0, import_remotion.interpolate)(tag, [0, 1], [0.6, 1])})`,
          opacity: (0, import_remotion.interpolate)(tag, [0, 0.3], [0, 1], clamp),
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: `${priceSize * 0.22}px ${priceSize * 0.42}px ${priceSize * 0.22}px ${priceSize * 0.34}px`,
          borderRadius: `${priceSize * 0.5}px ${priceSize * 0.18}px ${priceSize * 0.18}px ${priceSize * 0.5}px`,
          background: `linear-gradient(135deg, ${C.ink}, #d9f5f1)`,
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 18, height: 18, borderRadius: 9, background: C.night0, boxShadow: `0 0 0 4px ${C.teal}` } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "price",
              style: {
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: priceSize,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: C.night0,
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap"
              },
              children: "\u20AC149"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CutWipe, { color: C.orange })
  ] });
};
var ShotCTA = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { width, height, fps, pick, kind } = useLayout();
  const shoeIn = (0, import_remotion.spring)({ frame: f - 2, fps, config: { damping: 18, stiffness: 90 } });
  const head = (0, import_remotion.spring)({ frame: f - 16, fps, config: { damping: 200 } });
  const btn = (0, import_remotion.spring)({ frame: f - 34, fps, config: { damping: 13, stiffness: 140 } });
  const shimmer = (0, import_remotion.interpolate)((f - 50) % 60, [0, 30], [-60, 160], clamp);
  const ring = (0, import_remotion.interpolate)(f, [0, 150], [0, 40]);
  const breathe = 1 + Math.sin(f / 9) * 0.012 * (0, import_remotion.interpolate)(f, [60, 80], [0, 1], clamp);
  const shoeW = pick(620, width * 0.66, 520);
  const headSize = pick(150, 104, 100);
  const btnSize = pick(44, 42, 38);
  const band = kind === "portrait" ? { top: height * 0.15, bottom: height * 0.36 } : { top: height * 0.06, bottom: height * 0.06 };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: C.night0, overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        "data-layer": "background",
        style: {
          background: `radial-gradient(ellipse at 50% ${pick(36, 30, 34)}%, #0d4a47 0%, #072426 35%, ${C.night0} 75%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { style: { alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          top: kind === "portrait" ? height * 0.27 - width * 0.45 : height * pick(0.3, 0.3, 0.27) - Math.min(width, height) * 0.36,
          width: kind === "portrait" ? width * 0.9 : Math.min(width, height) * 0.72,
          aspectRatio: "1",
          borderRadius: "50%",
          border: `2px solid rgba(95,243,223,0.18)`,
          transform: `rotate(${ring}deg) scale(${(0, import_remotion.interpolate)(shoeIn, [0, 1], [0.7, 1])})`,
          opacity: shoeIn,
          background: "radial-gradient(circle, rgba(255,106,26,0.12), rgba(0,0,0,0) 60%)"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: -7, left: "50%", width: 14, height: 14, borderRadius: 7, background: C.orange, boxShadow: `0 0 20px ${C.orange}` } })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          top: band.top,
          bottom: band.bottom,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: pick(44, 56, 34)
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "product",
              style: {
                width: shoeW,
                transform: `translateY(${(1 - shoeIn) * -40}px) rotate(${(0, import_remotion.interpolate)(shoeIn, [0, 1], [-14, -6])}deg) scale(${(0, import_remotion.interpolate)(shoeIn, [0, 1], [0.85, 1]) * breathe})`,
                opacity: shoeIn,
                filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.55))"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { width: shoeW, id: "cta" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflow: "hidden", padding: "0.06em 0.1em 0.12em" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "headline",
              style: {
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: headSize,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: C.ink,
                whiteSpace: "nowrap",
                transform: `translateY(${(1 - head) * 110}%)`,
                opacity: head
              },
              children: "Out 28 November"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "button",
              style: {
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: btnSize,
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: C.night0,
                whiteSpace: "nowrap",
                padding: `${btnSize * 0.7}px ${btnSize * 1.3}px`,
                borderRadius: 999,
                backgroundImage: `linear-gradient(105deg, rgba(255,255,255,0) ${shimmer - 20}%, rgba(255,255,255,0.6) ${shimmer}%, rgba(255,255,255,0) ${shimmer + 20}%), linear-gradient(135deg, ${C.orangeLight}, ${C.orange})`,
                boxShadow: `0 18px 50px rgba(255,106,26,${0.45 * btn}), inset 0 1px 0 rgba(255,255,255,0.5)`,
                transform: `translateY(${(1 - btn) * 30}px) scale(${(0, import_remotion.interpolate)(btn, [0, 1], [0.8, 1])})`,
                opacity: (0, import_remotion.interpolate)(btn, [0, 0.4], [0, 1], clamp)
              },
              children: "Get early access"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CutWipe, { color: C.teal })
  ] });
};
function Video() {
  const [s1, s2, s3] = composition.shots;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: C.night0, fontFamily: SANS }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s1.from, durationInFrames: s1.durationInFrames, name: s1.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotHero, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s2.from, durationInFrames: s2.durationInFrames, name: s2.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotDetail, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s3.from, durationInFrames: s3.durationInFrames, name: s3.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotCTA, {}) })
  ] });
}
export {
  composition,
  Video as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9rZXN0cmVsLXJ1bm5lci1sYXVuY2gtc3BvdC0wNDE1L3ZlcnNpb25zL3YxL1ZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZW1vdGlvblwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdC9qc3gtcnVudGltZVwiXTsiLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBTZXF1ZW5jZSxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qICBDb21wb3NpdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgY29uc3QgY29tcG9zaXRpb24gPSB7XG4gIGZwczogMzAsXG4gIGR1cmF0aW9uSW5GcmFtZXM6IDM2MCxcbiAgc2hvdHM6IFtcbiAgICB7IG46IDEsIHRpdGxlOiAnUHJvZHVjdCBoZXJvJywgZnJvbTogMCwgZHVyYXRpb25JbkZyYW1lczogOTAgfSxcbiAgICB7IG46IDIsIHRpdGxlOiAnRGV0YWlsJywgZnJvbTogOTAsIGR1cmF0aW9uSW5GcmFtZXM6IDEyMCB9LFxuICAgIHsgbjogMywgdGl0bGU6ICdDYWxsIHRvIGFjdGlvbicsIGZyb206IDIxMCwgZHVyYXRpb25JbkZyYW1lczogMTUwIH0sXG4gIF0sXG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qICBEZXNpZ24gdG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBTQU5TID0gJ3VpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5cbmNvbnN0IEMgPSB7XG4gIG5pZ2h0MDogJyMwMzA1MGInLFxuICBuaWdodDE6ICcjMDgxMDFmJyxcbiAgbmlnaHQyOiAnIzBmMWMzMycsXG4gIHRlYWw6ICcjMTJiNWE2JyxcbiAgdGVhbERlZXA6ICcjMGE2ZjZhJyxcbiAgdGVhbExpZ2h0OiAnIzVmZjNkZicsXG4gIG9yYW5nZTogJyNmZjZhMWEnLFxuICBvcmFuZ2VMaWdodDogJyNmZmEwNGQnLFxuICBvcmFuZ2VEZWVwOiAnI2MyNDEwYycsXG4gIGluazogJyNmNGZiZmEnLFxufTtcblxuY29uc3QgY2xhbXAgPSB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJyB9IGFzIGNvbnN0O1xuY29uc3QgZWFzZU91dCA9IEVhc2luZy5iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbmNvbnN0IGVhc2VJbk91dCA9IEVhc2luZy5iZXppZXIoMC42NSwgMCwgMC4zNSwgMSk7XG5cbi8qKiBEZXRlcm1pbmlzdGljIGhhc2ggaW4gWzAsIDEpLiAqL1xuY29uc3QgaGFzaCA9IChuOiBudW1iZXIpID0+IHtcbiAgY29uc3QgeCA9IE1hdGguc2luKG4gKiAxMjcuMSArIDMxMS43KSAqIDQzNzU4LjU0NTM7XG4gIHJldHVybiB4IC0gTWF0aC5mbG9vcih4KTtcbn07XG5cbnR5cGUgS2luZCA9ICdsYW5kc2NhcGUnIHwgJ3BvcnRyYWl0JyB8ICdzcXVhcmUnO1xuXG5jb25zdCB1c2VMYXlvdXQgPSAoKSA9PiB7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZnBzIH0gPSB1c2VWaWRlb0NvbmZpZygpO1xuICBjb25zdCByYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuICBjb25zdCBraW5kOiBLaW5kID0gcmF0aW8gPiAxLjIgPyAnbGFuZHNjYXBlJyA6IHJhdGlvIDwgMC44MyA/ICdwb3J0cmFpdCcgOiAnc3F1YXJlJztcbiAgY29uc3QgcGljayA9IDxULD4obDogVCwgcDogVCwgczogVCk6IFQgPT4gKGtpbmQgPT09ICdsYW5kc2NhcGUnID8gbCA6IGtpbmQgPT09ICdwb3J0cmFpdCcgPyBwIDogcyk7XG4gIHJldHVybiB7IHdpZHRoLCBoZWlnaHQsIGZwcywga2luZCwgcGljayB9O1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiAgU2hhcmVkIGdyYXBoaWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvZTogUmVhY3QuRkM8eyB3aWR0aDogbnVtYmVyOyBpZDogc3RyaW5nIH0+ID0gKHsgd2lkdGgsIGlkIH0pID0+IHtcbiAgY29uc3QgZyA9IChuYW1lOiBzdHJpbmcpID0+IGAke2lkfS0ke25hbWV9YDtcbiAgY29uc3QgZXllbGV0cyA9IFswLCAxLCAyLCAzLCA0XTtcbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICB2aWV3Qm94PVwiMCAwIDgwMCA0MDBcIlxuICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgaGVpZ2h0PXt3aWR0aCAvIDJ9XG4gICAgICBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvdzogJ3Zpc2libGUnIH19XG4gICAgPlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17ZygndXBwZXInKX0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwLjJcIiB5Mj1cIjFcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPXtDLnRlYWxMaWdodH0gLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjQ1XCIgc3RvcENvbG9yPXtDLnRlYWx9IC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj17Qy50ZWFsRGVlcH0gLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPXtnKCdzb2xlJyl9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9e0Mub3JhbmdlTGlnaHR9IC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41NVwiIHN0b3BDb2xvcj17Qy5vcmFuZ2V9IC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj17Qy5vcmFuZ2VEZWVwfSAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2coJ3NoZWVuJyl9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMVwiIHkyPVwiMFwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZmZmXCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjVcIiBzdG9wQ29sb3I9XCIjZmZmXCIgc3RvcE9wYWNpdHk9XCIwLjU1XCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiI2ZmZlwiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxyYWRpYWxHcmFkaWVudCBpZD17Zygnc2hhZG93Jyl9IGN4PVwiMC41XCIgY3k9XCIwLjVcIiByPVwiMC41XCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMwMDBcIiBzdG9wT3BhY2l0eT1cIjAuNzVcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjMDAwXCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgPC9yYWRpYWxHcmFkaWVudD5cbiAgICAgIDwvZGVmcz5cblxuICAgICAgey8qIGNvbnRhY3Qgc2hhZG93ICovfVxuICAgICAgPGVsbGlwc2UgY3g9XCI0MTBcIiBjeT1cIjM2MlwiIHJ4PVwiMzgwXCIgcnk9XCIyNlwiIGZpbGw9e2B1cmwoIyR7Zygnc2hhZG93Jyl9KWB9IC8+XG5cbiAgICAgIHsvKiB1cHBlciAqL31cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNOTIgMjcwIEMgNzYgMjE0IDkyIDE2MCAxNDAgMTMyIEMgMTcyIDExNCAyMDYgMTA2IDIzOCAxMTAgTCAyNjIgMTIwIEMgMjg0IDE1MCAzMTggMTYyIDM1MiAxNTYgQyA0MDIgMTUwIDQ0MiAxNjAgNDgyIDE3OCBDIDU2MiAyMTAgNjQyIDIyMiA3MDIgMjM2IEMgNzQ0IDI0NiA3NzAgMjY0IDc2NiAyODggTCA3MDAgMjcyIEMgNTYwIDI3NiA0MjAgMjc2IDMwMCAyNzAgWlwiXG4gICAgICAgIGZpbGw9e2B1cmwoIyR7ZygndXBwZXInKX0pYH1cbiAgICAgIC8+XG4gICAgICB7LyogaGVlbCBjb3VudGVyICovfVxuICAgICAgPHBhdGggZD1cIk05MiAyNzAgQyA4MCAyMTQgOTYgMTY2IDE0MCAxMzggTCAxNzIgMTMwIEMgMTYwIDE4MiAxNjYgMjMyIDE4NCAyNzAgWlwiIGZpbGw9e0MudGVhbERlZXB9IG9wYWNpdHk9XCIwLjg1XCIgLz5cbiAgICAgIHsvKiBjb2xsYXIgKi99XG4gICAgICA8cGF0aCBkPVwiTTE0MCAxMzIgQyAxODAgMTEwIDIyNiAxMDQgMjYyIDEyMCBDIDI0OCAxMzIgMjE0IDEzMCAxNzIgMTQyIFpcIiBmaWxsPVwiIzA2MzAyZlwiIC8+XG4gICAgICB7LyogdG9uZ3VlICovfVxuICAgICAgPHBhdGggZD1cIk0yNjIgMTIwIEMgMjY2IDkwIDI5OCA3NCAzMzAgODIgQyAzNDYgMTA4IDM1NCAxMzYgMzUyIDE1NiBDIDMxOCAxNjIgMjg0IDE1MCAyNjIgMTIwIFpcIiBmaWxsPXtDLnRlYWxMaWdodH0gb3BhY2l0eT1cIjAuOVwiIC8+XG4gICAgICB7LyogdG9lIGNhcCAqL31cbiAgICAgIDxwYXRoIGQ9XCJNNTkyIDIxNCBDIDY2MCAyMjYgNzQyIDI0MiA3NjYgMjg2IEwgNzAwIDI3MiBMIDU4NiAyNjggQyA2MDAgMjUwIDYwMiAyMzIgNTkyIDIxNCBaXCIgZmlsbD17Qy50ZWFsTGlnaHR9IG9wYWNpdHk9XCIwLjM1XCIgLz5cbiAgICAgIHsvKiBrZXN0cmVsIHdpbmcgbWFyayAqL31cbiAgICAgIDxwYXRoIGQ9XCJNMzUyIDI0NiBDIDQzMCAyNDAgNTEyIDIyMiA1ODQgMTkwIEMgNTQwIDIyNiA0NzYgMjUwIDQwMCAyNTggWlwiIGZpbGw9e0MuaW5rfSBvcGFjaXR5PVwiMC45MlwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTM5MiAyNjIgQyA0NTIgMjYwIDUxMiAyNTAgNTY2IDIzMCBDIDUzMCAyNTQgNDgyIDI2NiA0MzAgMjY4IFpcIiBmaWxsPXtDLm9yYW5nZX0gLz5cbiAgICAgIHsvKiBsYWNlcyAqL31cbiAgICAgIHtleWVsZXRzLm1hcCgoaSkgPT4ge1xuICAgICAgICBjb25zdCB4ID0gMjg2ICsgaSAqIDQwO1xuICAgICAgICBjb25zdCB5ID0gMTUwICsgaSAqIDk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGcga2V5PXtpfT5cbiAgICAgICAgICAgIDxjaXJjbGUgY3g9e3h9IGN5PXt5ICsgMTZ9IHI9XCI1XCIgZmlsbD1cIiMwNjMwMmZcIiAvPlxuICAgICAgICAgICAgPHBhdGggZD17YE0ke3ggLSA4fSAke3kgKyAyfSBMICR7eCArIDMwfSAke3kgKyAxOH1gfSBzdHJva2U9e0MuaW5rfSBzdHJva2VXaWR0aD1cIjdcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiAvPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgICAgey8qIHRvcCBzaGVlbiAqL31cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNMTUwIDE0MCBDIDIxMCAxMTggMjUwIDEyNCAyNzAgMTQwIEMgMzIwIDE3MCA0MjAgMTY2IDUwMCAxOTYgQyA1ODAgMjIyIDY4MCAyMzYgNzQwIDI1NlwiXG4gICAgICAgIHN0cm9rZT17YHVybCgjJHtnKCdzaGVlbicpfSlgfVxuICAgICAgICBzdHJva2VXaWR0aD1cIjZcIlxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAvPlxuXG4gICAgICB7Lyogb3V0c29sZSAqL31cbiAgICAgIDxwYXRoIGQ9XCJNNTggMzAwIEMgNTggMzM0IDg4IDM1MiAxMzIgMzUyIEwgNjYyIDM1MiBDIDcyNCAzNTIgNzYyIDMzNCA3NjYgMzA0IEwgNzY2IDI5OCBMIDU4IDI5OCBaXCIgZmlsbD17Qy5vcmFuZ2VEZWVwfSAvPlxuICAgICAge1suLi5BcnJheSgxNCldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICA8cmVjdCBrZXk9e2l9IHg9ezExMCArIGkgKiA0NH0geT17MzQwfSB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMTBcIiByeD1cIjNcIiBmaWxsPVwiIzhhMmMwN1wiIC8+XG4gICAgICApKX1cbiAgICAgIHsvKiBtaWRzb2xlICovfVxuICAgICAgPHBhdGhcbiAgICAgICAgZD1cIk02MiAzMDAgQyA1NiAyNzIgNzAgMjU2IDk0IDI1OCBMIDMwMCAyNjYgQyA0MjAgMjcyIDU2MCAyNzIgNzAyIDI2NCBDIDc0NiAyNjIgNzcwIDI3OCA3NjYgMzAyIEMgNzYwIDMyMiA3NDAgMzI4IDcwMCAzMjggTCAxMjAgMzI4IEMgODIgMzI4IDY0IDMyMCA2MiAzMDAgWlwiXG4gICAgICAgIGZpbGw9e2B1cmwoIyR7Zygnc29sZScpfSlgfVxuICAgICAgLz5cbiAgICAgIDxwYXRoIGQ9XCJNOTYgMzAwIEMgMjUwIDMwOCA1MDAgMzA4IDc0NCAyOTJcIiBzdHJva2U9XCIjZmZmXCIgc3Ryb2tlT3BhY2l0eT1cIjAuNFwiIHN0cm9rZVdpZHRoPVwiM1wiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTQwIDMxNiBDIDMwMCAzMjAgNTIwIDMxOCA3MDAgMzEyXCIgc3Ryb2tlPVwiIzdjMmQxMlwiIHN0cm9rZU9wYWNpdHk9XCIwLjQ1XCIgc3Ryb2tlV2lkdGg9XCIzXCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuY29uc3QgU29sZURldGFpbDogUmVhY3QuRkM8eyBzd2VlcDogbnVtYmVyIH0+ID0gKHsgc3dlZXAgfSkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTYwMCA3MDBcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvdzogJ3Zpc2libGUnIH19PlxuICAgIDxkZWZzPlxuICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwic2QtdXBwZXJcIiB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj17Qy50ZWFsRGVlcH0gLz5cbiAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC42XCIgc3RvcENvbG9yPXtDLnRlYWx9IC8+XG4gICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9e0MudGVhbExpZ2h0fSAvPlxuICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cInNkLW1pZFwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPXtDLm9yYW5nZUxpZ2h0fSAvPlxuICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjVcIiBzdG9wQ29sb3I9e0Mub3JhbmdlfSAvPlxuICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtDLm9yYW5nZURlZXB9IC8+XG4gICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwic2Qtc3dlZXBcIiB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjFcIiB5Mj1cIjBcIj5cbiAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjVcIiBzdG9wQ29sb3I9XCIjZmZmXCIgc3RvcE9wYWNpdHk9XCIwLjQyXCIgLz5cbiAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgIDxwYXR0ZXJuIGlkPVwic2QtbWVzaFwiIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIxMVwiIGN5PVwiMTFcIiByPVwiNFwiIGZpbGw9XCIjMDQzYzM5XCIgb3BhY2l0eT1cIjAuNTVcIiAvPlxuICAgICAgPC9wYXR0ZXJuPlxuICAgICAgPGNsaXBQYXRoIGlkPVwic2QtY2xpcFwiPlxuICAgICAgICA8cGF0aCBkPVwiTTAgMCBIMTYwMCBWMjUwIEMgMTQwMCAyNjIgMTIwMCAyNjggODAwIDI2OCBDIDQwMCAyNjggMjAwIDI2MiAwIDI1MCBaXCIgLz5cbiAgICAgICAgPHBhdGggZD1cIk0wIDI1MCBDIDIwMCAyNjIgNDAwIDI2OCA4MDAgMjY4IEMgMTIwMCAyNjggMTQwMCAyNjIgMTYwMCAyNTAgViA2MjAgQyAxNDAwIDY0MCAyMDAgNjQwIDAgNjIwIFpcIiAvPlxuICAgICAgPC9jbGlwUGF0aD5cbiAgICAgIDxyYWRpYWxHcmFkaWVudCBpZD1cInNkLXNoYWRvd1wiIGN4PVwiMC41XCIgY3k9XCIwLjVcIiByPVwiMC41XCI+XG4gICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjMDAwXCIgc3RvcE9wYWNpdHk9XCIwLjhcIiAvPlxuICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzAwMFwiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICA8L3JhZGlhbEdyYWRpZW50PlxuICAgIDwvZGVmcz5cblxuICAgIDxlbGxpcHNlIGN4PVwiODAwXCIgY3k9XCI2NjBcIiByeD1cIjgyMFwiIHJ5PVwiNDBcIiBmaWxsPVwidXJsKCNzZC1zaGFkb3cpXCIgLz5cblxuICAgIHsvKiB1cHBlciBtZXNoICovfVxuICAgIDxwYXRoIGQ9XCJNMCAwIEgxNjAwIFYyNTAgQyAxNDAwIDI2MiAxMjAwIDI2OCA4MDAgMjY4IEMgNDAwIDI2OCAyMDAgMjYyIDAgMjUwIFpcIiBmaWxsPVwidXJsKCNzZC11cHBlcilcIiAvPlxuICAgIDxwYXRoIGQ9XCJNMCAwIEgxNjAwIFYyNTAgQyAxNDAwIDI2MiAxMjAwIDI2OCA4MDAgMjY4IEMgNDAwIDI2OCAyMDAgMjYyIDAgMjUwIFpcIiBmaWxsPVwidXJsKCNzZC1tZXNoKVwiIC8+XG4gICAgPHBhdGggZD1cIk0wIDIzNiBDIDIwMCAyNDggNDAwIDI1NCA4MDAgMjU0IEMgMTIwMCAyNTQgMTQwMCAyNDggMTYwMCAyMzZcIiBzdHJva2U9e0MuaW5rfSBzdHJva2VPcGFjaXR5PVwiMC43XCIgc3Ryb2tlV2lkdGg9XCI0XCIgc3Ryb2tlRGFzaGFycmF5PVwiMTYgMTJcIiBmaWxsPVwibm9uZVwiIC8+XG5cbiAgICB7LyogbWlkc29sZSAqL31cbiAgICA8cGF0aCBkPVwiTTAgMjUwIEMgMjAwIDI2MiA0MDAgMjY4IDgwMCAyNjggQyAxMjAwIDI2OCAxNDAwIDI2MiAxNjAwIDI1MCBWIDU0MCBIIDAgWlwiIGZpbGw9XCJ1cmwoI3NkLW1pZClcIiAvPlxuICAgIHtbMCwgMSwgMiwgM10ubWFwKChpKSA9PiAoXG4gICAgICA8cGF0aFxuICAgICAgICBrZXk9e2l9XG4gICAgICAgIGQ9e2BNMCAkezMzMCArIGkgKiA1MH0gQyAzMDAgJHszMDAgKyBpICogNTB9IDUyMCAkezM4MCArIGkgKiA1MH0gODAwICR7MzQwICsgaSAqIDUwfSBDIDEwODAgJHszMDAgKyBpICogNTB9IDEzMDAgJHszNzAgKyBpICogNTB9IDE2MDAgJHszMjAgKyBpICogNTB9YH1cbiAgICAgICAgc3Ryb2tlPXtpICUgMiA/ICcjN2MyZDEyJyA6ICcjZmZmJ31cbiAgICAgICAgc3Ryb2tlT3BhY2l0eT17aSAlIDIgPyAwLjM1IDogMC4yOH1cbiAgICAgICAgc3Ryb2tlV2lkdGg9e2kgJSAyID8gNiA6IDR9XG4gICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgIC8+XG4gICAgKSl9XG5cbiAgICB7Lyogb3V0c29sZSArIGx1Z3MgKi99XG4gICAgPHBhdGggZD1cIk0wIDU0MCBIIDE2MDAgViA2MjAgQyAxNDAwIDY0MCAyMDAgNjQwIDAgNjIwIFpcIiBmaWxsPXtDLm9yYW5nZURlZXB9IC8+XG4gICAge1suLi5BcnJheSgyNyldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgPHJlY3Qga2V5PXtpfSB4PXsxMCArIGkgKiA2MH0geT17NTYwfSB3aWR0aD1cIjM4XCIgaGVpZ2h0PVwiNTRcIiByeD1cIjhcIiBmaWxsPVwiIzhhMmMwN1wiIC8+XG4gICAgKSl9XG5cbiAgICB7LyogbGlnaHQgc3dlZXAgKi99XG4gICAgPGcgY2xpcFBhdGg9XCJ1cmwoI3NkLWNsaXApXCI+XG4gICAgICA8cmVjdCB4PXtzd2VlcCAqIDIyMDAgLSA2MDB9IHk9XCItMjBcIiB3aWR0aD1cIjQyMFwiIGhlaWdodD1cIjcwMFwiIGZpbGw9XCJ1cmwoI3NkLXN3ZWVwKVwiIHRyYW5zZm9ybT1cInNrZXdYKC0xOClcIiAvPlxuICAgIDwvZz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBTa3lsaW5lOiBSZWFjdC5GQzx7IGZyYW1lOiBudW1iZXIgfT4gPSAoeyBmcmFtZSB9KSA9PiB7XG4gIGNvbnN0IGxheWVyID0gKHNlZWQ6IG51bWJlciwgY291bnQ6IG51bWJlciwgbWluSDogbnVtYmVyLCBtYXhIOiBudW1iZXIsIGZpbGw6IHN0cmluZywgbGl0OiBudW1iZXIsIGRyaWZ0OiBudW1iZXIpID0+IHtcbiAgICBsZXQgeCA9IC0yMDA7XG4gICAgY29uc3QgaXRlbXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCB3ID0gNzAgKyBoYXNoKHNlZWQgKyBpKSAqIDExMDtcbiAgICAgIGNvbnN0IGggPSBtaW5IICsgaGFzaChzZWVkICsgaSAqIDMuNykgKiAobWF4SCAtIG1pbkgpO1xuICAgICAgY29uc3QgeSA9IDkwMCAtIGg7XG4gICAgICBpdGVtcy5wdXNoKFxuICAgICAgICA8ZyBrZXk9e2l9PlxuICAgICAgICAgIDxyZWN0IHg9e3h9IHk9e3l9IHdpZHRoPXt3fSBoZWlnaHQ9e2h9IGZpbGw9e2ZpbGx9IC8+XG4gICAgICAgICAgPHJlY3QgeD17eCArIDh9IHk9e3kgKyAxNH0gd2lkdGg9e3cgLSAxNn0gaGVpZ2h0PXtoIC0gMTR9IGZpbGw9e2B1cmwoI3dpbi0ke3NlZWR9KWB9IG9wYWNpdHk9e2xpdCAqICgwLjI1ICsgaGFzaChzZWVkICsgaSAqIDkuMSkgKiAwLjc1KX0gLz5cbiAgICAgICAgICB7aGFzaChzZWVkICsgaSAqIDUuMykgPiAwLjggPyAoXG4gICAgICAgICAgICA8cmVjdCB4PXt4ICsgdyAvIDIgLSAyfSB5PXt5IC0gNDB9IHdpZHRoPVwiNFwiIGhlaWdodD1cIjQwXCIgZmlsbD17ZmlsbH0gLz5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9nPixcbiAgICAgICk7XG4gICAgICB4ICs9IHcgKyA2O1xuICAgIH1cbiAgICByZXR1cm4gPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LWZyYW1lICogZHJpZnR9IDApYH0+e2l0ZW1zfTwvZz47XG4gIH07XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0MDAgOTAwXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1heCBzbGljZVwiIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCB9fT5cbiAgICAgIDxkZWZzPlxuICAgICAgICA8cGF0dGVybiBpZD1cIndpbi0xMVwiIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIzMFwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XG4gICAgICAgICAgPHJlY3QgeD1cIjZcIiB5PVwiNlwiIHdpZHRoPVwiOVwiIGhlaWdodD1cIjEyXCIgZmlsbD1cIiM3ZmI2ZDZcIiBvcGFjaXR5PVwiMC4zNVwiIC8+XG4gICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgPHBhdHRlcm4gaWQ9XCJ3aW4tNDdcIiB3aWR0aD1cIjI2XCIgaGVpZ2h0PVwiMzRcIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxuICAgICAgICAgIDxyZWN0IHg9XCI3XCIgeT1cIjdcIiB3aWR0aD1cIjExXCIgaGVpZ2h0PVwiMTRcIiBmaWxsPVwiI2ZmYzQ4YVwiIG9wYWNpdHk9XCIwLjU1XCIgLz5cbiAgICAgICAgPC9wYXR0ZXJuPlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJoYXplXCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj17Qy5uaWdodDB9IHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj17Qy5uaWdodDB9IHN0b3BPcGFjaXR5PVwiMC45XCIgLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgIDwvZGVmcz5cbiAgICAgIHtsYXllcigxMSwgMzAsIDI2MCwgNjIwLCAnIzBlMWEzMCcsIDAuNiwgMC4yNSl9XG4gICAgICB7bGF5ZXIoNDcsIDI2LCAxNDAsIDQyMCwgJyMwNjBiMTYnLCAxLCAwLjcpfVxuICAgICAgPHJlY3QgeD1cIjBcIiB5PVwiNjAwXCIgd2lkdGg9XCIyNDAwXCIgaGVpZ2h0PVwiMzAwXCIgZmlsbD1cInVybCgjaGF6ZSlcIiAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuLyoqIERpYWdvbmFsIHdpcGUgdGhhdCBoYW5kcyBvbmUgc2hvdCB0byB0aGUgbmV4dC4gKi9cbmNvbnN0IEN1dFdpcGU6IFJlYWN0LkZDPHsgY29sb3I6IHN0cmluZyB9PiA9ICh7IGNvbG9yIH0pID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCBwID0gaW50ZXJwb2xhdGUoZiwgWzAsIDEyXSwgWzAsIDFdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IGVhc2VJbk91dCB9KTtcbiAgaWYgKHAgPj0gMSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbFxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZDogY29sb3IsXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtwICogMTMwfSUpIHNrZXdYKC0xMmRlZylgLFxuICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICdjZW50ZXInLFxuICAgICAgICB3aWR0aDogJzEzMCUnLFxuICAgICAgICBsZWZ0OiAnLTE1JScsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59O1xuXG5jb25zdCBWaWduZXR0ZTogUmVhY3QuRkMgPSAoKSA9PiAoXG4gIDxBYnNvbHV0ZUZpbGxcbiAgICBzdHlsZT17e1xuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgYmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDUwJSA0NSUsIHJnYmEoMCwwLDAsMCkgNDUlLCByZ2JhKDAsMCwwLDAuNikgMTAwJSknLFxuICAgIH19XG4gIC8+XG4pO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qICBTaG90IDEgXHUyMDE0IFByb2R1Y3QgaGVybyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNob3RIZXJvOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGZwcywgcGljayB9ID0gdXNlTGF5b3V0KCk7XG5cbiAgY29uc3Qgc2xpZGUgPSBzcHJpbmcoeyBmcmFtZTogZiwgZnBzLCBjb25maWc6IHsgZGFtcGluZzogMTYsIHN0aWZmbmVzczogODAsIG1hc3M6IDEuMSB9IH0pO1xuICBjb25zdCBzaG9lVyA9IHBpY2sod2lkdGggKiAwLjUsIHdpZHRoICogMC44OCwgd2lkdGggKiAwLjc0KTtcbiAgY29uc3Qgc2hvZVggPSBpbnRlcnBvbGF0ZShzbGlkZSwgWzAsIDFdLCBbLXdpZHRoICogMC41IC0gc2hvZVcsIDBdKTtcbiAgY29uc3QgdGlsdCA9IGludGVycG9sYXRlKHNsaWRlLCBbMCwgMV0sIFstNywgMF0pO1xuICBjb25zdCBmbG9hdCA9IE1hdGguc2luKGYgLyAxMSkgKiA1ICogaW50ZXJwb2xhdGUoZiwgWzIwLCA0MF0sIFswLCAxXSwgY2xhbXApO1xuICBjb25zdCBzaG9lQ2VudGVyWSA9IGhlaWdodCAqIHBpY2soMC40NCwgMC40MiwgMC40Mik7XG4gIGNvbnN0IHNwZWVkID0gaW50ZXJwb2xhdGUoc2xpZGUsIFswLCAwLjg1LCAxXSwgWzEsIDAuNCwgMF0sIGNsYW1wKTtcblxuICBjb25zdCBjYXAgPSBzcHJpbmcoeyBmcmFtZTogZiAtIDMwLCBmcHMsIGNvbmZpZzogeyBkYW1waW5nOiAyMDAgfSB9KTtcbiAgY29uc3QgY2FwU2l6ZSA9IHBpY2soMTMyLCAxMTIsIDEwNCk7XG4gIGNvbnN0IGNhcFRvcCA9IGhlaWdodCAqIHBpY2soMC43MiwgMC42NCwgMC43NCk7XG4gIGNvbnN0IHJ1bGUgPSBpbnRlcnBvbGF0ZShmLCBbMjYsIDUwXSwgWzAsIDFdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IGVhc2VPdXQgfSk7XG5cbiAgY29uc3QgY2FtZXJhID0gaW50ZXJwb2xhdGUoZiwgWzAsIDkwXSwgWzEuMDQsIDFdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IGVhc2VPdXQgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6IEMubmlnaHQwLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICA8QWJzb2x1dGVGaWxsIGRhdGEtbGF5ZXI9XCJiYWNrZ3JvdW5kXCIgc3R5bGU9e3sgdHJhbnNmb3JtOiBgc2NhbGUoJHtjYW1lcmF9KWAgfX0+XG4gICAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDcwJSAyMCUsICR7Qy5uaWdodDJ9IDAlLCAke0MubmlnaHQxfSA0MCUsICR7Qy5uaWdodDB9IDgwJSlgLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgNTAlICR7cGljayg3MCwgNTUsIDYyKX0lLCByZ2JhKDE4LDE4MSwxNjYsMC4yMiksIHJnYmEoMTgsMTgxLDE2NiwwKSA0NSUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiAwLCBoZWlnaHQ6IGhlaWdodCAqIDAuNjIgfX0+XG4gICAgICAgICAgPFNreWxpbmUgZnJhbWU9e2Z9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Lyogd2V0IHN0cmVldCAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIHRvcDogaGVpZ2h0ICogMC42MixcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGExNDI2IDAlLCAke0MubmlnaHQwfSA3MCUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICB7LyogcGFzc2luZyBsaWdodCBzdHJlYWtzICovfVxuICAgICAgICB7WzAsIDEsIDIsIDMsIDQsIDVdLm1hcCgoaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHkgPSBoZWlnaHQgKiAoMC42NCArIGhhc2goaSArIDMpICogMC4zKTtcbiAgICAgICAgICBjb25zdCBsZW4gPSB3aWR0aCAqICgwLjEyICsgaGFzaChpICsgOSkgKiAwLjIpO1xuICAgICAgICAgIGNvbnN0IHggPSAoKHdpZHRoICogMS42ICogaGFzaChpICsgMjEpIC0gZiAqICgxMCArIGhhc2goaSkgKiAxNCkpICUgKHdpZHRoICogMS42KSArIHdpZHRoICogMS42KSAlICh3aWR0aCAqIDEuNikgLSB3aWR0aCAqIDAuMztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgbGVmdDogeCxcbiAgICAgICAgICAgICAgICB0b3A6IHksXG4gICAgICAgICAgICAgICAgd2lkdGg6IGxlbixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMCksICR7aSAlIDIgPyBDLm9yYW5nZSA6IEMudGVhbExpZ2h0fSlgLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNDUsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiAnYmx1cigxcHgpJyxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L0Fic29sdXRlRmlsbD5cblxuICAgICAgey8qIHNwZWVkIGxpbmVzIHRyYWlsaW5nIHRoZSBzaG9lICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgd2lkdGg6IHdpZHRoIC8gMiArIHNob2VYLFxuICAgICAgICAgIHRvcDogc2hvZUNlbnRlclkgLSBzaG9lVyAqIDAuMTIsXG4gICAgICAgICAgaGVpZ2h0OiBzaG9lVyAqIDAuMjYsXG4gICAgICAgICAgb3BhY2l0eTogc3BlZWQgKiAwLjgsXG4gICAgICAgICAgYmFja2dyb3VuZDogYHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDk1LDI0MywyMjMsMCkgMHB4LCByZ2JhKDk1LDI0MywyMjMsMCkgMTRweCwgcmdiYSg5NSwyNDMsMjIzLDAuNSkgMTRweCwgcmdiYSg5NSwyNDMsMjIzLDAuNSkgMTZweClgLFxuICAgICAgICAgIG1hc2tJbWFnZTogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIGJsYWNrKScsXG4gICAgICAgICAgV2Via2l0TWFza0ltYWdlOiAnbGluZWFyLWdyYWRpZW50KDkwZGVnLCB0cmFuc3BhcmVudCwgYmxhY2spJyxcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHsvKiBwcm9kdWN0ICovfVxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogKHdpZHRoIC0gc2hvZVcpIC8gMixcbiAgICAgICAgICB0b3A6IHNob2VDZW50ZXJZIC0gc2hvZVcgLyA0LFxuICAgICAgICAgIHdpZHRoOiBzaG9lVyxcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtzaG9lWH1weCwgJHtmbG9hdH1weCkgcm90YXRlKCR7dGlsdH1kZWcpYCxcbiAgICAgICAgICBmaWx0ZXI6IGBkcm9wLXNoYWRvdygwICR7c2hvZVcgKiAwLjA0fXB4ICR7c2hvZVcgKiAwLjA1fXB4IHJnYmEoMCwwLDAsMC42KSkgZHJvcC1zaGFkb3coMCAwICR7c2hvZVcgKiAwLjA4fXB4IHJnYmEoMTgsMTgxLDE2NiwwLjI1KSlgLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8U2hvZSB3aWR0aD17c2hvZVd9IGlkPVwiaGVyb1wiIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIHsvKiByZWZsZWN0aW9uICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6ICh3aWR0aCAtIHNob2VXKSAvIDIsXG4gICAgICAgICAgdG9wOiBzaG9lQ2VudGVyWSArIHNob2VXIC8gNCAtIHNob2VXICogMC4wNixcbiAgICAgICAgICB3aWR0aDogc2hvZVcsXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7c2hvZVh9cHgsIDApIHNjYWxlWSgtMSlgLFxuICAgICAgICAgIG9wYWNpdHk6IDAuMTYsXG4gICAgICAgICAgZmlsdGVyOiAnYmx1cig0cHgpJyxcbiAgICAgICAgICBtYXNrSW1hZ2U6ICdsaW5lYXItZ3JhZGllbnQoMGRlZywgYmxhY2ssIHRyYW5zcGFyZW50IDQ1JSknLFxuICAgICAgICAgIFdlYmtpdE1hc2tJbWFnZTogJ2xpbmVhci1ncmFkaWVudCgwZGVnLCBibGFjaywgdHJhbnNwYXJlbnQgNDUlKScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxTaG9lIHdpZHRoPXtzaG9lV30gaWQ9XCJoZXJvLXJlZmxlY3RcIiAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBjYXB0aW9uICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgdG9wOiBjYXBUb3AsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGdhcDogMjgsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDE0MCAqIHJ1bGUsIGhlaWdodDogNCwgYm9yZGVyUmFkaXVzOiAyLCBiYWNrZ3JvdW5kOiBDLm9yYW5nZSB9fSAvPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93OiAnaGlkZGVuJywgcGFkZGluZzogJzAgMCAxMnB4JyB9fT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkYXRhLWxheWVyPVwiY2FwdGlvblwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBmb250RmFtaWx5OiBTQU5TLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA4MDAsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBjYXBTaXplLFxuICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDM1ZW0nLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgICBjb2xvcjogQy5pbmssXG4gICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7KDEgLSBjYXApICogMTEwfSUpYCxcbiAgICAgICAgICAgICAgb3BhY2l0eTogY2FwLFxuICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnMCA4cHggNDBweCByZ2JhKDAsMCwwLDAuNiknLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBSdW4gdGhlIGNpdHlcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxWaWduZXR0ZSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiAgU2hvdCAyIFx1MjAxNCBEZXRhaWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBTaG90RGV0YWlsOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGZwcywgcGljayB9ID0gdXNlTGF5b3V0KCk7XG5cbiAgY29uc3QgcHVzaCA9IGludGVycG9sYXRlKGYsIFswLCAxMjBdLCBbMS4xMiwgMS4wXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBlYXNlT3V0IH0pO1xuICBjb25zdCBwYW4gPSBpbnRlcnBvbGF0ZShmLCBbMCwgMTIwXSwgWzMsIC0zXSwgY2xhbXApO1xuICBjb25zdCBzd2VlcCA9IGludGVycG9sYXRlKGYsIFs4LCA4MF0sIFswLCAxXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBlYXNlSW5PdXQgfSk7XG5cbiAgY29uc3Qgc29sZVcgPSBwaWNrKHdpZHRoICogMS4xMiwgd2lkdGggKiAxLjksIHdpZHRoICogMS4zNSk7XG4gIGNvbnN0IHNvbGVIID0gc29sZVcgKiAoNzAwIC8gMTYwMCk7XG4gIGNvbnN0IHNvbGVDWSA9IGhlaWdodCAqIHBpY2soMC42LCAwLjUsIDAuNTYpO1xuXG4gIC8vIFdvcmRtYXJrOiBhYnNlbnQgYXQgdGhlIGN1dCAobG9jYWwgMCksIGZ1bGx5IHZpc2libGUgYnkgbG9jYWwgNDggKDA6MDQuNikuXG4gIGNvbnN0IHdtT3BhY2l0eSA9IGludGVycG9sYXRlKGYsIFsxNCwgNDBdLCBbMCwgMV0sIHsgLi4uY2xhbXAsIGVhc2luZzogZWFzZU91dCB9KTtcbiAgLy8gRW5kcyBhdCBhIG5lZ2F0aXZlIGluc2V0IHNvIHRoZSBpdGFsaWMgb3ZlcmhhbmcgaXMgbmV2ZXIgY2xpcHBlZCBvbmNlIHJldmVhbGVkLlxuICBjb25zdCB3bVJldmVhbCA9IGludGVycG9sYXRlKGYsIFsxNCwgNDZdLCBbMTAwLCAtMTBdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IGVhc2VPdXQgfSk7XG4gIGNvbnN0IHdtVHJhY2sgPSBpbnRlcnBvbGF0ZShmLCBbMTQsIDYwXSwgWzAuNDIsIDAuMjJdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IGVhc2VPdXQgfSk7XG4gIGNvbnN0IHdtU2l6ZSA9IHBpY2soMjAwLCAxMzIsIDEzMik7XG4gIGNvbnN0IHdtVG9wID0gaGVpZ2h0ICogcGljaygwLjEsIDAuMTYsIDAuMSk7XG5cbiAgY29uc3QgdGFnID0gc3ByaW5nKHsgZnJhbWU6IGYgLSA0NCwgZnBzLCBjb25maWc6IHsgZGFtcGluZzogMTEsIHN0aWZmbmVzczogMTIwIH0gfSk7XG4gIGNvbnN0IHN3aW5nID0gaW50ZXJwb2xhdGUodGFnLCBbMCwgMV0sIFstMTgsIC00XSk7XG4gIGNvbnN0IHByaWNlU2l6ZSA9IHBpY2soMTA0LCA5NiwgODgpO1xuICBjb25zdCB0YWdQb3MgPSBwaWNrKFxuICAgIHsgbGVmdDogd2lkdGggKiAwLjY2LCB0b3A6IGhlaWdodCAqIDAuNjggfSxcbiAgICB7IGxlZnQ6IHdpZHRoICogMC41IC0gMTcwLCB0b3A6IGhlaWdodCAqIDAuNzIgfSxcbiAgICB7IGxlZnQ6IHdpZHRoICogMC41NiwgdG9wOiBoZWlnaHQgKiAwLjc2IH0sXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6IEMubmlnaHQwLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICA8QWJzb2x1dGVGaWxsXG4gICAgICAgIGRhdGEtbGF5ZXI9XCJiYWNrZ3JvdW5kXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgNTAlICR7cGljayg2MCwgNTAsIDU2KX0lLCAjMmExNDA4IDAlLCAjMTIwYTA4IDQwJSwgJHtDLm5pZ2h0MH0gNzUlKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDUwJSAke3BpY2soNDAsIDQwLCA0MCl9JSwgcmdiYSgxOCwxODEsMTY2LDAuMTgpLCByZ2JhKDAsMCwwLDApIDU1JSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgey8qIHByb2R1Y3Q6IG9yYW5nZSBzb2xlIGNsb3NlLXVwICovfVxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogKHdpZHRoIC0gc29sZVcpIC8gMixcbiAgICAgICAgICB0b3A6IHNvbGVDWSAtIHNvbGVIIC8gMixcbiAgICAgICAgICB3aWR0aDogc29sZVcsXG4gICAgICAgICAgaGVpZ2h0OiBzb2xlSCxcbiAgICAgICAgICB0cmFuc2Zvcm06IGBzY2FsZSgke3B1c2h9KSB0cmFuc2xhdGVYKCR7cGFufSUpIHJvdGF0ZSgtMmRlZylgLFxuICAgICAgICAgIGZpbHRlcjogJ2Ryb3Atc2hhZG93KDAgMzBweCA2MHB4IHJnYmEoMCwwLDAsMC42KSknLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8U29sZURldGFpbCBzd2VlcD17c3dlZXB9IC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIHdvcmRtYXJrICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgcmlnaHQ6IDAsIHRvcDogd21Ub3AsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cIndvcmRtYXJrXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZm9udEZhbWlseTogU0FOUyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDkwMCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ2l0YWxpYycsXG4gICAgICAgICAgICBmb250U2l6ZTogd21TaXplLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IGAke3dtVHJhY2t9ZW1gLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IGAtJHt3bVRyYWNrfWVtYCxcbiAgICAgICAgICAgIGNvbG9yOiBDLmluayxcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgb3BhY2l0eTogd21PcGFjaXR5LFxuICAgICAgICAgICAgY2xpcFBhdGg6IGBpbnNldCgtMjAlICR7d21SZXZlYWx9JSAtMjAlIC0xMCUpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6ICcwIDEwcHggNTBweCByZ2JhKDAsMCwwLDAuNTUpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgS0VTVFJFTFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogcHJpY2UgdGFnICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIC4uLnRhZ1BvcyxcbiAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICcyNHB4IDUwJScsXG4gICAgICAgICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7c3dpbmd9ZGVnKSBzY2FsZSgke2ludGVycG9sYXRlKHRhZywgWzAsIDFdLCBbMC42LCAxXSl9KWAsXG4gICAgICAgICAgb3BhY2l0eTogaW50ZXJwb2xhdGUodGFnLCBbMCwgMC4zXSwgWzAsIDFdLCBjbGFtcCksXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGdhcDogMjIsXG4gICAgICAgICAgcGFkZGluZzogYCR7cHJpY2VTaXplICogMC4yMn1weCAke3ByaWNlU2l6ZSAqIDAuNDJ9cHggJHtwcmljZVNpemUgKiAwLjIyfXB4ICR7cHJpY2VTaXplICogMC4zNH1weGAsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiBgJHtwcmljZVNpemUgKiAwLjV9cHggJHtwcmljZVNpemUgKiAwLjE4fXB4ICR7cHJpY2VTaXplICogMC4xOH1weCAke3ByaWNlU2l6ZSAqIDAuNX1weGAsXG4gICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICR7Qy5pbmt9LCAjZDlmNWYxKWAsXG4gICAgICAgICAgYm94U2hhZG93OiAnMCAyNHB4IDYwcHggcmdiYSgwLDAsMCwwLjUpJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogMTgsIGhlaWdodDogMTgsIGJvcmRlclJhZGl1czogOSwgYmFja2dyb3VuZDogQy5uaWdodDAsIGJveFNoYWRvdzogYDAgMCAwIDRweCAke0MudGVhbH1gIH19IC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwicHJpY2VcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBmb250RmFtaWx5OiBTQU5TLFxuICAgICAgICAgICAgZm9udFdlaWdodDogODAwLFxuICAgICAgICAgICAgZm9udFNpemU6IHByaWNlU2l6ZSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDNlbScsXG4gICAgICAgICAgICBjb2xvcjogQy5uaWdodDAsXG4gICAgICAgICAgICBmb250VmFyaWFudE51bWVyaWM6ICd0YWJ1bGFyLW51bXMnLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIFx1MjBBQzE0OVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8VmlnbmV0dGUgLz5cbiAgICAgIDxDdXRXaXBlIGNvbG9yPXtDLm9yYW5nZX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogIFNob3QgMyBcdTIwMTQgQ2FsbCB0byBhY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdENUQTogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGYgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBmcHMsIHBpY2ssIGtpbmQgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VJbiA9IHNwcmluZyh7IGZyYW1lOiBmIC0gMiwgZnBzLCBjb25maWc6IHsgZGFtcGluZzogMTgsIHN0aWZmbmVzczogOTAgfSB9KTtcbiAgY29uc3QgaGVhZCA9IHNwcmluZyh7IGZyYW1lOiBmIC0gMTYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDIwMCB9IH0pO1xuICBjb25zdCBidG4gPSBzcHJpbmcoeyBmcmFtZTogZiAtIDM0LCBmcHMsIGNvbmZpZzogeyBkYW1waW5nOiAxMywgc3RpZmZuZXNzOiAxNDAgfSB9KTtcbiAgY29uc3Qgc2hpbW1lciA9IGludGVycG9sYXRlKChmIC0gNTApICUgNjAsIFswLCAzMF0sIFstNjAsIDE2MF0sIGNsYW1wKTtcbiAgY29uc3QgcmluZyA9IGludGVycG9sYXRlKGYsIFswLCAxNTBdLCBbMCwgNDBdKTtcbiAgY29uc3QgYnJlYXRoZSA9IDEgKyBNYXRoLnNpbihmIC8gOSkgKiAwLjAxMiAqIGludGVycG9sYXRlKGYsIFs2MCwgODBdLCBbMCwgMV0sIGNsYW1wKTtcblxuICBjb25zdCBzaG9lVyA9IHBpY2soNjIwLCB3aWR0aCAqIDAuNjYsIDUyMCk7XG4gIGNvbnN0IGhlYWRTaXplID0gcGljaygxNTAsIDEwNCwgMTAwKTtcbiAgY29uc3QgYnRuU2l6ZSA9IHBpY2soNDQsIDQyLCAzOCk7XG5cbiAgLy8gOToxNiBzYWZlIGJhbmQ6IHRleHQgbGl2ZXMgYmV0d2VlbiAxNCUgYW5kIDY1JSBvZiBmcmFtZSBoZWlnaHQuXG4gIGNvbnN0IGJhbmQgPSBraW5kID09PSAncG9ydHJhaXQnXG4gICAgPyB7IHRvcDogaGVpZ2h0ICogMC4xNSwgYm90dG9tOiBoZWlnaHQgKiAwLjM2IH1cbiAgICA6IHsgdG9wOiBoZWlnaHQgKiAwLjA2LCBib3R0b206IGhlaWdodCAqIDAuMDYgfTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgYmFja2dyb3VuZDogQy5uaWdodDAsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCA1MCUgJHtwaWNrKDM2LCAzMCwgMzQpfSUsICMwZDRhNDcgMCUsICMwNzI0MjYgMzUlLCAke0MubmlnaHQwfSA3NSUpYCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICB7Lyogb3JiaXQgcmluZyAqL31cbiAgICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDoga2luZCA9PT0gJ3BvcnRyYWl0JyA/IGhlaWdodCAqIDAuMjcgLSB3aWR0aCAqIDAuNDUgOiBoZWlnaHQgKiBwaWNrKDAuMywgMC4zLCAwLjI3KSAtIE1hdGgubWluKHdpZHRoLCBoZWlnaHQpICogMC4zNixcbiAgICAgICAgICAgIHdpZHRoOiBraW5kID09PSAncG9ydHJhaXQnID8gd2lkdGggKiAwLjkgOiBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAqIDAuNzIsXG4gICAgICAgICAgICBhc3BlY3RSYXRpbzogJzEnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIGJvcmRlcjogYDJweCBzb2xpZCByZ2JhKDk1LDI0MywyMjMsMC4xOClgLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7cmluZ31kZWcpIHNjYWxlKCR7aW50ZXJwb2xhdGUoc2hvZUluLCBbMCwgMV0sIFswLjcsIDFdKX0pYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IHNob2VJbixcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCByZ2JhKDI1NSwxMDYsMjYsMC4xMiksIHJnYmEoMCwwLDAsMCkgNjAlKScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTcsIGxlZnQ6ICc1MCUnLCB3aWR0aDogMTQsIGhlaWdodDogMTQsIGJvcmRlclJhZGl1czogNywgYmFja2dyb3VuZDogQy5vcmFuZ2UsIGJveFNoYWRvdzogYDAgMCAyMHB4ICR7Qy5vcmFuZ2V9YCB9fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQWJzb2x1dGVGaWxsPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICB0b3A6IGJhbmQudG9wLFxuICAgICAgICAgIGJvdHRvbTogYmFuZC5ib3R0b20sXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICBnYXA6IHBpY2soNDQsIDU2LCAzNCksXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHdpZHRoOiBzaG9lVyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIHNob2VJbikgKiAtNDB9cHgpIHJvdGF0ZSgke2ludGVycG9sYXRlKHNob2VJbiwgWzAsIDFdLCBbLTE0LCAtNl0pfWRlZykgc2NhbGUoJHtpbnRlcnBvbGF0ZShzaG9lSW4sIFswLCAxXSwgWzAuODUsIDFdKSAqIGJyZWF0aGV9KWAsXG4gICAgICAgICAgICBvcGFjaXR5OiBzaG9lSW4sXG4gICAgICAgICAgICBmaWx0ZXI6ICdkcm9wLXNoYWRvdygwIDMwcHggNDBweCByZ2JhKDAsMCwwLDAuNTUpKScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxTaG9lIHdpZHRoPXtzaG9lV30gaWQ9XCJjdGFcIiAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93OiAnaGlkZGVuJywgcGFkZGluZzogJzAuMDZlbSAwLjFlbSAwLjEyZW0nIH19PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGRhdGEtbGF5ZXI9XCJoZWFkbGluZVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBmb250RmFtaWx5OiBTQU5TLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA4MDAsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBoZWFkU2l6ZSxcbiAgICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjA0ZW0nLFxuICAgICAgICAgICAgICBjb2xvcjogQy5pbmssXG4gICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7KDEgLSBoZWFkKSAqIDExMH0lKWAsXG4gICAgICAgICAgICAgIG9wYWNpdHk6IGhlYWQsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIE91dCAyOCBOb3ZlbWJlclxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cImJ1dHRvblwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFNBTlMsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgICAgICAgICBmb250U2l6ZTogYnRuU2l6ZSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDFlbScsXG4gICAgICAgICAgICBjb2xvcjogQy5uaWdodDAsXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIHBhZGRpbmc6IGAke2J0blNpemUgKiAwLjd9cHggJHtidG5TaXplICogMS4zfXB4YCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogOTk5LFxuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KDEwNWRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAke3NoaW1tZXIgLSAyMH0lLCByZ2JhKDI1NSwyNTUsMjU1LDAuNikgJHtzaGltbWVyfSUsIHJnYmEoMjU1LDI1NSwyNTUsMCkgJHtzaGltbWVyICsgMjB9JSksIGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICR7Qy5vcmFuZ2VMaWdodH0sICR7Qy5vcmFuZ2V9KWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwIDE4cHggNTBweCByZ2JhKDI1NSwxMDYsMjYsJHswLjQ1ICogYnRufSksIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjUpYCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIGJ0bikgKiAzMH1weCkgc2NhbGUoJHtpbnRlcnBvbGF0ZShidG4sIFswLCAxXSwgWzAuOCwgMV0pfSlgLFxuICAgICAgICAgICAgb3BhY2l0eTogaW50ZXJwb2xhdGUoYnRuLCBbMCwgMC40XSwgWzAsIDFdLCBjbGFtcCksXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIEdldCBlYXJseSBhY2Nlc3NcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPFZpZ25ldHRlIC8+XG4gICAgICA8Q3V0V2lwZSBjb2xvcj17Qy50ZWFsfSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiAgUm9vdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlkZW8oKSB7XG4gIGNvbnN0IFtzMSwgczIsIHMzXSA9IGNvbXBvc2l0aW9uLnNob3RzO1xuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgYmFja2dyb3VuZDogQy5uaWdodDAsIGZvbnRGYW1pbHk6IFNBTlMgfX0+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czEuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czEuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czEudGl0bGV9PlxuICAgICAgICA8U2hvdEhlcm8gLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czIuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czIuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czIudGl0bGV9PlxuICAgICAgICA8U2hvdERldGFpbCAvPlxuICAgICAgPC9TZXF1ZW5jZT5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMy5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMy5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPXtzMy50aXRsZX0+XG4gICAgICAgIDxTaG90Q1RBIC8+XG4gICAgICA8L1NlcXVlbmNlPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixVQUFVO0FBQUE7QUFBQTs7O0FDQXZEO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsbUJBQW1CO0FBQUE7QUFBQTs7O0FDQ2hFLHNCQVFPO0FBc0VDO0FBaEVELElBQU0sY0FBYztBQUFBLEVBQ3pCLEtBQUs7QUFBQSxFQUNMLGtCQUFrQjtBQUFBLEVBQ2xCLE9BQU87QUFBQSxJQUNMLEVBQUUsR0FBRyxHQUFHLE9BQU8sZ0JBQWdCLE1BQU0sR0FBRyxrQkFBa0IsR0FBRztBQUFBLElBQzdELEVBQUUsR0FBRyxHQUFHLE9BQU8sVUFBVSxNQUFNLElBQUksa0JBQWtCLElBQUk7QUFBQSxJQUN6RCxFQUFFLEdBQUcsR0FBRyxPQUFPLGtCQUFrQixNQUFNLEtBQUssa0JBQWtCLElBQUk7QUFBQSxFQUNwRTtBQUNGO0FBTUEsSUFBTSxPQUFPO0FBRWIsSUFBTSxJQUFJO0FBQUEsRUFDUixRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsRUFDUixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixhQUFhO0FBQUEsRUFDYixZQUFZO0FBQUEsRUFDWixL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
