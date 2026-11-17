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

// workspaces/kestrel-runner-launch-spot-30d2/versions/v1/Video.tsx
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
var C = {
  teal: "#14b8a6",
  tealBright: "#2dd4bf",
  tealLight: "#99f6e4",
  tealDeep: "#0f766e",
  tealInk: "#083a37",
  orange: "#f97316",
  orangeLight: "#fdba74",
  orangeDeep: "#c2410c",
  orangeBurnt: "#7c2d12",
  ink: "#0b0f19",
  paper: "#f8fafc"
};
var FONT = 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
var EASE_OUT = import_remotion.Easing.bezier(0.16, 1, 0.3, 1);
var CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
var rand = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
var useLayout = () => {
  const { width, height } = (0, import_remotion.useVideoConfig)();
  const r = width / height;
  const layout = r > 1.2 ? "landscape" : r < 0.83 ? "portrait" : "square";
  const u = Math.min(width, height) / 1080;
  return { width, height, layout, u };
};
var pick = (layout, v) => v[layout];
var SOLE_BOTTOM = 262 / 300;
var UPPER = "M 64 198 C 50 160 56 118 86 96 C 100 86 120 84 136 92 C 158 104 190 106 214 94 L 246 64 C 256 56 270 58 274 70 L 292 114 C 344 132 414 142 474 152 C 530 162 566 182 578 206 C 540 202 420 200 300 200 L 64 200 Z";
var MIDSOLE = "M 46 202 C 40 226 60 250 94 250 L 540 246 C 570 244 588 230 586 214 C 584 200 568 194 548 196 L 300 200 L 110 194 C 76 192 50 190 46 202 Z";
var OUTSOLE = "M 58 238 C 64 254 80 262 100 262 L 536 258 C 560 257 578 248 584 232 C 570 244 552 248 540 248 L 94 252 C 78 252 66 248 58 238 Z";
var Shoe = ({ id, width, shadow = 1 }) => {
  const lugs = Array.from({ length: 19 }, (_, i) => 96 + i * 24);
  const laces = Array.from({ length: 5 }, (_, i) => i);
  const pods = [150, 230, 310, 390, 470];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      "data-layer": "product",
      width,
      height: width / 2,
      viewBox: "0 0 600 300",
      style: { overflow: "visible", display: "block" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-up`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: C.tealBright }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "55%", stopColor: C.teal }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: C.tealDeep })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-side`, x1: "0", y1: "0", x2: "1", y2: "0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#000", stopOpacity: "0.35" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "30%", stopColor: "#000", stopOpacity: "0" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "75%", stopColor: "#fff", stopOpacity: "0.06" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#000", stopOpacity: "0.25" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-sole`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: C.orangeLight }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "35%", stopColor: C.orange }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: C.orangeDeep })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-tongue`, x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: C.tealLight }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: C.teal })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: `${id}-mesh`, width: "7", height: "7", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "3.5", cy: "3.5", r: "1.25", fill: C.tealInk, opacity: "0.45" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: `${id}-clip`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: UPPER }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", { id: `${id}-blur`, x: "-20%", y: "-200%", width: "140%", height: "500%", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "8" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "318", cy: "268", rx: "290", ry: "14", fill: "#000", opacity: 0.65 * shadow, filter: `url(#${id}-blur)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: UPPER, fill: `url(#${id}-up)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: `url(#${id}-clip)`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "0", y: "0", width: "600", height: "300", fill: `url(#${id}-mesh)` }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "0", y: "0", width: "600", height: "300", fill: `url(#${id}-side)` }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 40 200 C 44 150 56 110 86 92 C 100 130 108 168 116 200 Z", fill: C.tealDeep }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 466 150 C 530 160 568 182 580 210 L 466 210 C 452 190 452 166 466 150 Z", fill: C.tealDeep, opacity: "0.9" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 150 188 C 220 150 310 128 420 146 L 440 156 C 330 146 248 166 172 198 Z", fill: C.orange }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 200 192 C 260 168 330 156 410 164 L 424 172 C 340 168 272 180 214 200 Z", fill: C.orangeLight, opacity: "0.9" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 92 100 C 120 88 150 104 200 100 L 210 104 C 160 112 124 98 96 108 Z", fill: "#fff", opacity: "0.25" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 296 118 C 360 136 430 144 480 156 C 520 164 552 178 566 194 C 540 176 500 166 470 160 C 410 150 350 140 296 124 Z", fill: "#fff", opacity: "0.22" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 90 98 C 110 86 128 90 140 96 C 160 108 192 110 214 98 L 210 110 C 186 120 156 116 136 106 C 120 98 104 100 90 106 Z", fill: C.tealInk }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 78 100 L 70 80 C 70 74 78 72 82 76 L 94 96 Z", fill: C.orange }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 214 96 L 246 64 C 256 56 270 58 274 70 L 290 114 L 236 118 Z", fill: `url(#${id}-tongue)` }),
        laces.map((i) => {
          const x = 238 + i * 21;
          const y = 106 + i * 6.5;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: x - 12, y1: y - 7, x2: x + 12, y2: y + 9, stroke: "#e2e8f0", strokeWidth: "5", strokeLinecap: "round" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: x - 12, y1: y + 9, x2: x + 12, y2: y - 7, stroke: "#cbd5e1", strokeWidth: "4", strokeLinecap: "round" })
          ] }, i);
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: MIDSOLE, fill: `url(#${id}-sole)` }),
        pods.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: x, cy: 226 + i % 2 * 2, rx: "26", ry: "9", fill: C.orangeDeep, opacity: "0.55" }, x)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 64 220 C 160 210 240 232 320 222 S 480 210 570 220", stroke: C.orangeLight, strokeWidth: "3", fill: "none", opacity: "0.8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 60 206 C 200 198 400 202 560 204", stroke: "#fff", strokeWidth: "2.5", fill: "none", opacity: "0.4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: OUTSOLE, fill: C.orangeBurnt }),
        lugs.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x, y: "251", width: "12", height: "9", rx: "2", fill: C.orangeDeep }, x))
      ]
    }
  );
};
var makeBuildings = (seed, width, u, minH, maxH) => {
  const out = [];
  let x = -60 * u;
  let i = 0;
  while (x < width + 500 * u) {
    const w = (70 + rand(seed + i * 3) * 150) * u;
    const h = minH + Math.pow(rand(seed + i * 3 + 1), 1.4) * (maxH - minH);
    out.push({ x, w, h, lit: rand(seed + i * 3 + 2), i });
    x += w + (6 + rand(seed + i * 7) * 18) * u;
    i++;
  }
  return out;
};
var NightCity = ({ groundY, drift, blur = 0, glowX = 0.5, glowY, warm = 0.5 }) => {
  const frame = (0, import_remotion.useCurrentFrame)();
  const { width, height, u } = useLayout();
  const far = makeBuildings(11, width, u, height * 0.08, groundY * 0.5);
  const near = makeBuildings(97, width, u, height * 0.05, groundY * 0.34);
  const g = groundY / height * 100;
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: rand(i * 5.1) * width,
    y: rand(i * 9.7) * groundY * 0.55,
    r: (0.6 + rand(i * 2.3) * 1.4) * u,
    o: 0.2 + rand(i * 4.4) * 0.5
  }));
  const blink = 0.4 + 0.6 * Math.max(0, Math.sin(frame / 5));
  const gy = glowY ?? groundY * 0.85;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_remotion.AbsoluteFill,
    {
      "data-layer": "background",
      style: {
        background: `linear-gradient(180deg, #03050d 0%, #08102a ${g * 0.5}%, #171a48 ${g * 0.85}%, #3b1f3f ${g}%, #06070d ${g}%, #020308 100%)`
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "svg",
          {
            width,
            height,
            style: { position: "absolute", inset: 0, filter: blur ? `blur(${blur}px)` : void 0 },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: "win-far", width: 12 * u, height: 18 * u, patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 3 * u, y: 5 * u, width: 5 * u, height: 7 * u, fill: "#93a5ff" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: "win-near", width: 16 * u, height: 24 * u, patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 4 * u, y: 7 * u, width: 7 * u, height: 10 * u, fill: "#ffc77a" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "haze", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#3b2a6b", stopOpacity: "0" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#ff7a3d", stopOpacity: 0.18 * warm + 0.06 })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "ground", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#141428" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#020308" })
                ] })
              ] }),
              stars.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: s.x, cy: s.y, r: s.r, fill: "#cbd5ff", opacity: s.o }, i)),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `translate(${-drift * 0.35},0)`, children: far.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: b.x, y: groundY - b.h, width: b.w, height: b.h, fill: "#11183a" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "rect",
                  {
                    x: b.x + 4 * u,
                    y: groundY - b.h + 12 * u,
                    width: Math.max(0, b.w - 8 * u),
                    height: Math.max(0, b.h - 12 * u),
                    fill: "url(#win-far)",
                    opacity: 0.06 + b.lit * 0.2
                  }
                )
              ] }, b.i)) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 0, y: groundY * 0.45, width, height: groundY * 0.55, fill: "url(#haze)" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `translate(${-drift},0)`, children: near.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: b.x, y: groundY - b.h, width: b.w, height: b.h, fill: "#070a17" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "rect",
                  {
                    x: b.x + 6 * u,
                    y: groundY - b.h + 14 * u,
                    width: Math.max(0, b.w - 12 * u),
                    height: Math.max(0, b.h - 14 * u),
                    fill: "url(#win-near)",
                    opacity: b.lit > 0.35 ? 0.12 + b.lit * 0.4 : 0.05
                  }
                ),
                b.lit > 0.82 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: b.x + b.w / 2 - 1.5 * u, y: groundY - b.h - 40 * u, width: 3 * u, height: 40 * u, fill: "#070a17" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: b.x + b.w / 2, cy: groundY - b.h - 40 * u, r: 3.5 * u, fill: "#ff3b3b", opacity: blink })
                ] }) : null
              ] }, b.i)) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 0, y: groundY, width, height: height - groundY, fill: "url(#ground)" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 0, y: groundY - 1 * u, width, height: 2 * u, fill: C.tealBright, opacity: 0.35 }),
              Array.from({ length: 6 }, (_, i) => {
                const y = groundY + (18 + i * i * 14) * u;
                return y < height ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 0, y, width, height: (1 + i * 0.6) * u, fill: "#6b7cff", opacity: 0.08 - i * 0.01 }, i) : null;
              })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_remotion.AbsoluteFill,
          {
            style: {
              background: `radial-gradient(ellipse ${width * 0.5}px ${height * 0.35}px at ${glowX * 100}% ${gy}px, rgba(45,212,191,0.28), rgba(45,212,191,0.06) 55%, transparent 75%)`
            }
          }
        )
      ]
    }
  );
};
var Vignette = ({ strength = 0.7 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  import_remotion.AbsoluteFill,
  {
    "data-layer": "vignette",
    style: {
      pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,${strength}) 100%)`
    }
  }
);
var LogoMark = ({ size }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "data-layer": "logo-mark", width: size, height: size * 0.75, viewBox: "0 0 40 30", style: { display: "block" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 0 22 L 26 2 L 19 15 L 40 8 L 12 30 L 18 19 Z", fill: C.orange }) });
var ShotHero = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { width, height, layout, u } = useLayout();
  const shoeW = width * pick(layout, { landscape: 0.5, portrait: 0.9, square: 0.78 });
  const groundY = height * pick(layout, { landscape: 0.84, portrait: 0.62, square: 0.86 });
  const cx = width * pick(layout, { landscape: 0.58, portrait: 0.5, square: 0.5 });
  const shoeLeft = cx - shoeW / 2;
  const shoeTop = groundY - SOLE_BOTTOM * (shoeW / 2);
  const p = (0, import_remotion.interpolate)(f, [0, 26], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const startX = -(shoeLeft + shoeW + 120 * u);
  const x = (0, import_remotion.interpolate)(p, [0, 1], [startX, 0]);
  const tilt = (0, import_remotion.interpolate)(p, [0, 0.7, 1], [-9, 2, 0]);
  const land = (0, import_remotion.spring)({ frame: f - 22, fps: 30, config: { damping: 12, stiffness: 180 } });
  const squash = 1 - 0.035 * Math.sin(Math.min(1, land) * Math.PI);
  const float = f > 30 ? Math.sin((f - 30) / 11) * 5 * u : 0;
  const camera = (0, import_remotion.interpolate)(f, [0, 90], [1, 1.045], { easing: import_remotion.Easing.inOut(import_remotion.Easing.quad) });
  const trailFade = (0, import_remotion.interpolate)(f, [0, 22, 40], [1, 0.8, 0.18], CLAMP);
  const trails = Array.from({ length: 8 }, (_, i) => {
    const len = (260 + rand(i * 3.3) * 520) * u;
    const speed = (38 + rand(i * 1.7) * 30) * u;
    const span = width + len;
    const xx = (f * speed + rand(i * 8.1) * span) % span - len;
    const yy = groundY - (12 + rand(i * 6.2) * 0.9 * (shoeW / 2)) * 1;
    return { len, xx, yy, color: i % 3 === 0 ? C.orange : C.tealBright, h: (2 + rand(i) * 3) * u };
  });
  const rip = (0, import_remotion.interpolate)(f, [22, 50], [0, 1], { ...CLAMP, easing: import_remotion.Easing.out(import_remotion.Easing.cubic) });
  const c = (0, import_remotion.interpolate)(f, [4, 24], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const capSize = pick(layout, { landscape: 136, portrait: 124, square: 112 }) * u;
  const capTop = height * pick(layout, { landscape: 0.12, portrait: 0.2, square: 0.1 });
  const capAlign = layout === "landscape" ? "left" : "center";
  const barW = (0, import_remotion.interpolate)(f, [2, 20], [0, 96 * u], { ...CLAMP, easing: EASE_OUT });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { backgroundColor: "#03050d", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { transform: `scale(${camera})` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightCity, { groundY, drift: f * 3 * u, glowX: cx / width, glowY: groundY - shoeW * 0.2, warm: 0.6 }),
      trails.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          "data-layer": "light-trail",
          style: {
            position: "absolute",
            left: t.xx,
            top: t.yy,
            width: t.len,
            height: t.h,
            borderRadius: t.h,
            opacity: trailFade * 0.85,
            background: `linear-gradient(90deg, transparent, ${t.color})`,
            boxShadow: `0 0 ${14 * u}px ${t.color}`
          }
        },
        i
      )),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          "data-layer": "ground-ripple",
          style: {
            position: "absolute",
            left: cx - shoeW * 0.55 * (0.6 + rip * 0.6),
            top: groundY - 12 * u,
            width: shoeW * 1.1 * (0.6 + rip * 0.6),
            height: 24 * u,
            borderRadius: "50%",
            border: `${2 * u}px solid ${C.tealBright}`,
            opacity: (1 - rip) * (f >= 22 ? 0.7 : 0),
            boxShadow: `0 0 ${24 * u}px ${C.teal}`
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          style: {
            position: "absolute",
            left: shoeLeft,
            top: shoeTop + float,
            transform: `translateX(${x}px) rotate(${tilt}deg) scaleY(${squash})`,
            transformOrigin: "50% 90%",
            filter: `drop-shadow(0 ${30 * u}px ${40 * u}px rgba(0,0,0,0.55))`
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { id: "hero", width: shoeW })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "absolute",
          left: layout === "landscape" ? width * 0.07 : 0,
          right: layout === "landscape" ? void 0 : 0,
          top: capTop,
          display: "flex",
          flexDirection: "column",
          alignItems: layout === "landscape" ? "flex-start" : "center"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": "accent", style: { width: barW, height: 8 * u, borderRadius: 4 * u, background: C.orange, marginBottom: 28 * u } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "caption",
              style: {
                fontFamily: FONT,
                fontSize: capSize,
                fontWeight: 800,
                letterSpacing: "-0.045em",
                lineHeight: 1,
                color: C.paper,
                whiteSpace: "nowrap",
                textAlign: capAlign,
                opacity: c,
                transform: `translateY(${(1 - c) * 50 * u}px)`,
                filter: `blur(${(1 - c) * 10 * u}px)`,
                textShadow: `0 ${6 * u}px ${30 * u}px rgba(0,0,0,0.5)`
              },
              children: "Run the city"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, { strength: 0.65 })
  ] });
};
var ShotDetail = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { width, height, layout, u } = useLayout();
  const shoeW = width * pick(layout, { landscape: 2.3, portrait: 3, square: 2.6 });
  const shoeH = shoeW / 2;
  const fx = width * 0.5;
  const fy = height * pick(layout, { landscape: 0.5, portrait: 0.6, square: 0.52 });
  const pan = (0, import_remotion.interpolate)(f, [0, 120], [0.06, -0.06], { easing: import_remotion.Easing.inOut(import_remotion.Easing.sin) }) * width;
  const shoeLeft = fx - 330 / 600 * shoeW + pan;
  const shoeTop = fy - 222 / 300 * shoeH;
  const push = (0, import_remotion.interpolate)(f, [0, 120], [1.08, 1], { easing: import_remotion.Easing.out(import_remotion.Easing.quad) });
  const enter = (0, import_remotion.interpolate)(f, [0, 10], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const sweep = (0, import_remotion.interpolate)(f, [16, 76], [-0.6, 1.4], { ...CLAMP, easing: import_remotion.Easing.inOut(import_remotion.Easing.cubic) });
  const w = (0, import_remotion.interpolate)(f, [20, 52], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const wmSize = pick(layout, { landscape: 96, portrait: 92, square: 84 }) * u;
  const ls = (0, import_remotion.interpolate)(w, [0, 1], [0.75, 0.34]);
  const t = (0, import_remotion.interpolate)(f, [6, 22], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const swing = f > 6 ? 9 * Math.exp(-(f - 6) / 12) * Math.cos((f - 6) / 3.2) : 9;
  const priceSize = pick(layout, { landscape: 72, portrait: 76, square: 64 }) * u;
  const wmStyle = pick(layout, {
    landscape: { left: width * 0.07, top: height * 0.8 },
    portrait: { left: 0, right: 0, top: height * 0.17, justifyContent: "center" },
    square: { left: 0, right: 0, top: height * 0.82, justifyContent: "center" }
  });
  const tagStyle = pick(layout, {
    landscape: { right: width * 0.08, top: height * 0.1 },
    portrait: { right: width * 0.1, top: height * 0.3 },
    square: { right: width * 0.08, top: height * 0.08 }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { backgroundColor: "#03050d", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightCity, { groundY: height * 0.9, drift: f * 1.2 * u, blur: 18 * u, glowX: 0.5, glowY: fy, warm: 0.9 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: `radial-gradient(ellipse at 50% ${fy / height * 100}%, rgba(249,115,22,0.22), transparent 60%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { style: { transform: `scale(${push})`, transformOrigin: `${fx}px ${fy}px`, opacity: enter }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: shoeLeft,
          top: shoeTop,
          filter: `drop-shadow(0 ${40 * u}px ${60 * u}px rgba(0,0,0,0.6))`
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { id: "detail", width: shoeW, shadow: 0.6 })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        "data-layer": "light-sweep",
        style: {
          mixBlendMode: "screen",
          background: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,237,213,0.35) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, { strength: 0.75 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", display: "flex", alignItems: "center", gap: 22 * u, ...wmStyle }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { opacity: w, transform: `translateX(${(1 - w) * -20 * u}px)` }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { size: wmSize * 0.8 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          "data-layer": "wordmark",
          style: {
            fontFamily: FONT,
            fontSize: wmSize,
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: `${ls}em`,
            marginRight: `-${ls}em`,
            lineHeight: 1,
            color: C.paper,
            whiteSpace: "nowrap",
            opacity: w,
            filter: `blur(${(1 - w) * 12 * u}px)`,
            textShadow: `0 ${4 * u}px ${24 * u}px rgba(0,0,0,0.6)`
          },
          children: "KESTREL"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "absolute",
          ...tagStyle,
          opacity: t,
          transform: `translateY(${(1 - t) * -60 * u}px) rotate(${-4 + swing}deg)`,
          transformOrigin: "12% 50%"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "price",
              style: {
                fontFamily: FONT,
                fontSize: priceSize,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                whiteSpace: "nowrap",
                color: C.ink,
                padding: `${22 * u}px ${38 * u}px ${22 * u}px ${70 * u}px`,
                borderRadius: 16 * u,
                background: `linear-gradient(135deg, #fff7ed, ${C.orangeLight})`,
                boxShadow: `0 ${20 * u}px ${50 * u}px rgba(0,0,0,0.45), inset 0 ${-4 * u}px 0 rgba(194,65,12,0.25)`
              },
              children: "\u20AC149"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "tag-eyelet",
              style: {
                position: "absolute",
                left: 26 * u,
                top: "50%",
                width: 18 * u,
                height: 18 * u,
                marginTop: -9 * u,
                borderRadius: "50%",
                background: "#1a1205",
                boxShadow: `0 0 0 ${4 * u}px rgba(255,255,255,0.7)`
              }
            }
          )
        ]
      }
    )
  ] });
};
var ShotCTA = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { width, height, layout, u } = useLayout();
  const shoeW = width * pick(layout, { landscape: 0.42, portrait: 0.88, square: 0.62 });
  const groundY = height * pick(layout, { landscape: 0.8, portrait: 0.86, square: 0.58 });
  const cx = width * pick(layout, { landscape: 0.74, portrait: 0.5, square: 0.5 });
  const shoeLeft = cx - shoeW / 2;
  const shoeTop = groundY - SOLE_BOTTOM * (shoeW / 2);
  const camera = (0, import_remotion.interpolate)(f, [0, 36], [1.08, 1], { ...CLAMP, easing: EASE_OUT });
  const drop = (0, import_remotion.spring)({ frame: f, fps: 30, config: { damping: 14, stiffness: 120 } });
  const float = Math.sin(f / 13) * 7 * u;
  const tilt = -7 + Math.sin(f / 20) * 1.2;
  const halo = (0, import_remotion.interpolate)(f, [0, 150], [0, 40]);
  const wmSize = pick(layout, { landscape: 56, portrait: 56, square: 48 }) * u;
  const wmLs = (0, import_remotion.interpolate)(f, [0, 30], [0.42, 0.34], { ...CLAMP, easing: EASE_OUT });
  const h = (0, import_remotion.interpolate)(f, [4, 26], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const hSize = pick(layout, { landscape: 96, portrait: 104, square: 88 }) * u;
  const bo = (0, import_remotion.interpolate)(f, [16, 30], [0, 1], CLAMP);
  const bs = (0, import_remotion.interpolate)(f, [16, 40], [0.86, 1], { ...CLAMP, easing: import_remotion.Easing.out(import_remotion.Easing.back(1.7)) });
  const sheen = (0, import_remotion.interpolate)(f % 75, [0, 40], [-60, 160], CLAMP);
  const pulse = f > 40 ? 0.5 + 0.5 * Math.sin((f - 40) / 9) : 0;
  const bSize = pick(layout, { landscape: 38, portrait: 42, square: 36 }) * u;
  const wmTop = height * pick(layout, { landscape: 0.1, portrait: 0.15, square: 0.07 });
  const hTop = height * pick(layout, { landscape: 0.36, portrait: 0.24, square: 0.64 });
  const bTop = hTop + hSize * 1.05 + pick(layout, { landscape: 70, portrait: 80, square: 40 }) * u;
  const textBox = layout === "landscape" ? { position: "absolute", left: width * 0.07, display: "flex", justifyContent: "flex-start" } : { position: "absolute", left: 0, right: 0, display: "flex", justifyContent: "center" };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { backgroundColor: "#03050d", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { transform: `scale(${camera})` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightCity, { groundY, drift: f * 1.6 * u, glowX: cx / width, glowY: groundY - shoeW * 0.2, warm: 0.7 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "svg",
        {
          "data-layer": "halo",
          width,
          height,
          style: { position: "absolute", inset: 0, overflow: "visible" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "ellipse",
              {
                cx,
                cy: groundY,
                rx: shoeW * 0.62,
                ry: shoeW * 0.07,
                fill: "none",
                stroke: C.tealBright,
                strokeWidth: 2 * u,
                strokeDasharray: `${shoeW * 0.9} ${shoeW * 0.4}`,
                strokeDashoffset: -halo * shoeW * 0.05,
                opacity: 0.55
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx, cy: groundY, rx: shoeW * 0.5, ry: shoeW * 0.05, fill: C.teal, opacity: 0.12 })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          style: {
            position: "absolute",
            left: shoeLeft,
            top: shoeTop + float,
            transform: `translateY(${(1 - drop) * -80 * u}px) rotate(${tilt}deg)`,
            transformOrigin: "50% 90%",
            filter: `drop-shadow(0 ${30 * u}px ${40 * u}px rgba(0,0,0,0.55))`
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { id: "cta", width: shoeW })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, { strength: 0.6 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...textBox, top: wmTop, alignItems: "center", gap: 18 * u }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { size: wmSize * 0.85 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          "data-layer": "wordmark",
          style: {
            fontFamily: FONT,
            fontSize: wmSize,
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: `${wmLs}em`,
            marginRight: `-${wmLs}em`,
            lineHeight: 1,
            color: C.paper,
            whiteSpace: "nowrap"
          },
          children: "KESTREL"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...textBox, top: hTop }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "headline",
        style: {
          fontFamily: FONT,
          fontSize: hSize,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          color: C.paper,
          whiteSpace: "nowrap",
          opacity: h,
          transform: `translateY(${(1 - h) * 40 * u}px)`,
          filter: `blur(${(1 - h) * 8 * u}px)`,
          textShadow: `0 ${6 * u}px ${30 * u}px rgba(0,0,0,0.55)`
        },
        children: "Out 28 November"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...textBox, top: bTop }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "button",
        style: {
          fontFamily: FONT,
          fontSize: bSize,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          color: C.ink,
          padding: `${28 * u}px ${56 * u}px`,
          borderRadius: 999,
          backgroundImage: `linear-gradient(105deg, transparent ${sheen - 20}%, rgba(255,255,255,0.45) ${sheen}%, transparent ${sheen + 20}%), linear-gradient(180deg, ${C.orangeLight}, ${C.orange})`,
          boxShadow: `0 ${16 * u}px ${40 * u}px rgba(249,115,22,${0.3 + pulse * 0.2}), 0 0 0 ${(2 + pulse * 6) * u}px rgba(249,115,22,${0.35 - pulse * 0.25}), inset 0 ${-3 * u}px 0 rgba(124,45,18,0.35)`,
          opacity: bo,
          transform: `scale(${bs})`,
          transformOrigin: layout === "landscape" ? "0% 50%" : "50% 50%"
        },
        children: "Get early access"
      }
    ) })
  ] });
};
function Video() {
  const [s1, s2, s3] = composition.shots;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { backgroundColor: "#03050d", fontFamily: FONT }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s1.from, durationInFrames: s1.durationInFrames, name: s1.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotHero, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s2.from, durationInFrames: s2.durationInFrames, name: s2.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotDetail, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s3.from, durationInFrames: s3.durationInFrames, name: s3.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotCTA, {}) })
  ] });
}
export {
  composition,
  Video as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9rZXN0cmVsLXJ1bm5lci1sYXVuY2gtc3BvdC0zMGQyL3ZlcnNpb25zL3YxL1ZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZW1vdGlvblwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdC9qc3gtcnVudGltZVwiXTsiLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBTZXF1ZW5jZSxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG4vKiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgIEtlc3RyZWwgUnVubmVyIFx1MjAxNCBsYXVuY2ggc3BvdFxuICAgMTJzIEAgMzBmcHMgXHUwMEI3IDE2OjkgLyA5OjE2IC8gMToxIGZyb20gb25lIGNvbXBvbmVudFxuICAgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwICovXG5cbmV4cG9ydCBjb25zdCBjb21wb3NpdGlvbiA9IHtcbiAgZnBzOiAzMCxcbiAgZHVyYXRpb25JbkZyYW1lczogMzYwLFxuICBzaG90czogW1xuICAgIHsgbjogMSwgdGl0bGU6ICdQcm9kdWN0IGhlcm8nLCBmcm9tOiAwLCBkdXJhdGlvbkluRnJhbWVzOiA5MCB9LFxuICAgIHsgbjogMiwgdGl0bGU6ICdEZXRhaWwnLCBmcm9tOiA5MCwgZHVyYXRpb25JbkZyYW1lczogMTIwIH0sXG4gICAgeyBuOiAzLCB0aXRsZTogJ0NhbGwgdG8gYWN0aW9uJywgZnJvbTogMjEwLCBkdXJhdGlvbkluRnJhbWVzOiAxNTAgfSxcbiAgXSxcbn07XG5cbmNvbnN0IEMgPSB7XG4gIHRlYWw6ICcjMTRiOGE2JyxcbiAgdGVhbEJyaWdodDogJyMyZGQ0YmYnLFxuICB0ZWFsTGlnaHQ6ICcjOTlmNmU0JyxcbiAgdGVhbERlZXA6ICcjMGY3NjZlJyxcbiAgdGVhbEluazogJyMwODNhMzcnLFxuICBvcmFuZ2U6ICcjZjk3MzE2JyxcbiAgb3JhbmdlTGlnaHQ6ICcjZmRiYTc0JyxcbiAgb3JhbmdlRGVlcDogJyNjMjQxMGMnLFxuICBvcmFuZ2VCdXJudDogJyM3YzJkMTInLFxuICBpbms6ICcjMGIwZjE5JyxcbiAgcGFwZXI6ICcjZjhmYWZjJyxcbn07XG5cbmNvbnN0IEZPTlQgPSAndWktc2Fucy1zZXJpZiwgc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBzYW5zLXNlcmlmJztcbmNvbnN0IEVBU0VfT1VUID0gRWFzaW5nLmJlemllcigwLjE2LCAxLCAwLjMsIDEpO1xuY29uc3QgQ0xBTVAgPSB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJyB9IGFzIGNvbnN0O1xuXG4vLyBEZXRlcm1pbmlzdGljIGhhc2gsIG5vIE1hdGgucmFuZG9tLlxuY29uc3QgcmFuZCA9IChpOiBudW1iZXIpID0+IHtcbiAgY29uc3QgeCA9IE1hdGguc2luKGkgKiAxMjcuMSArIDMxMS43KSAqIDQzNzU4LjU0NTM7XG4gIHJldHVybiB4IC0gTWF0aC5mbG9vcih4KTtcbn07XG5cbnR5cGUgTGF5b3V0ID0gJ2xhbmRzY2FwZScgfCAncG9ydHJhaXQnIHwgJ3NxdWFyZSc7XG5jb25zdCB1c2VMYXlvdXQgPSAoKSA9PiB7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdXNlVmlkZW9Db25maWcoKTtcbiAgY29uc3QgciA9IHdpZHRoIC8gaGVpZ2h0O1xuICBjb25zdCBsYXlvdXQ6IExheW91dCA9IHIgPiAxLjIgPyAnbGFuZHNjYXBlJyA6IHIgPCAwLjgzID8gJ3BvcnRyYWl0JyA6ICdzcXVhcmUnO1xuICBjb25zdCB1ID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAxMDgwO1xuICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0LCBsYXlvdXQsIHUgfTtcbn07XG5cbmNvbnN0IHBpY2sgPSA8VCw+KGxheW91dDogTGF5b3V0LCB2OiB7IGxhbmRzY2FwZTogVDsgcG9ydHJhaXQ6IFQ7IHNxdWFyZTogVCB9KSA9PiB2W2xheW91dF07XG5cbi8qIFx1MjUwMFx1MjUwMCBTaG9lIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMCAqL1xuXG4vLyB2aWV3Qm94IDAgMCA2MDAgMzAwIFx1MjAxNCBzb2xlIGJvdHRvbSBzaXRzIGF0IHlcdTIyNDgyNjIgKFNPTEVfQk9UVE9NKS5cbmNvbnN0IFNPTEVfQk9UVE9NID0gMjYyIC8gMzAwO1xuXG5jb25zdCBVUFBFUiA9XG4gICdNIDY0IDE5OCBDIDUwIDE2MCA1NiAxMTggODYgOTYgQyAxMDAgODYgMTIwIDg0IDEzNiA5MiBDIDE1OCAxMDQgMTkwIDEwNiAyMTQgOTQgTCAyNDYgNjQgQyAyNTYgNTYgMjcwIDU4IDI3NCA3MCBMIDI5MiAxMTQgQyAzNDQgMTMyIDQxNCAxNDIgNDc0IDE1MiBDIDUzMCAxNjIgNTY2IDE4MiA1NzggMjA2IEMgNTQwIDIwMiA0MjAgMjAwIDMwMCAyMDAgTCA2NCAyMDAgWic7XG5jb25zdCBNSURTT0xFID1cbiAgJ00gNDYgMjAyIEMgNDAgMjI2IDYwIDI1MCA5NCAyNTAgTCA1NDAgMjQ2IEMgNTcwIDI0NCA1ODggMjMwIDU4NiAyMTQgQyA1ODQgMjAwIDU2OCAxOTQgNTQ4IDE5NiBMIDMwMCAyMDAgTCAxMTAgMTk0IEMgNzYgMTkyIDUwIDE5MCA0NiAyMDIgWic7XG5jb25zdCBPVVRTT0xFID1cbiAgJ00gNTggMjM4IEMgNjQgMjU0IDgwIDI2MiAxMDAgMjYyIEwgNTM2IDI1OCBDIDU2MCAyNTcgNTc4IDI0OCA1ODQgMjMyIEMgNTcwIDI0NCA1NTIgMjQ4IDU0MCAyNDggTCA5NCAyNTIgQyA3OCAyNTIgNjYgMjQ4IDU4IDIzOCBaJztcblxuY29uc3QgU2hvZTogUmVhY3QuRkM8eyBpZDogc3RyaW5nOyB3aWR0aDogbnVtYmVyOyBzaGFkb3c/OiBudW1iZXIgfT4gPSAoeyBpZCwgd2lkdGgsIHNoYWRvdyA9IDEgfSkgPT4ge1xuICBjb25zdCBsdWdzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTkgfSwgKF8sIGkpID0+IDk2ICsgaSAqIDI0KTtcbiAgY29uc3QgbGFjZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA1IH0sIChfLCBpKSA9PiBpKTtcbiAgY29uc3QgcG9kcyA9IFsxNTAsIDIzMCwgMzEwLCAzOTAsIDQ3MF07XG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgZGF0YS1sYXllcj1cInByb2R1Y3RcIlxuICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgaGVpZ2h0PXt3aWR0aCAvIDJ9XG4gICAgICB2aWV3Qm94PVwiMCAwIDYwMCAzMDBcIlxuICAgICAgc3R5bGU9e3sgb3ZlcmZsb3c6ICd2aXNpYmxlJywgZGlzcGxheTogJ2Jsb2NrJyB9fVxuICAgID5cbiAgICAgIDxkZWZzPlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfS11cGB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPXtDLnRlYWxCcmlnaHR9IC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNTUlXCIgc3RvcENvbG9yPXtDLnRlYWx9IC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj17Qy50ZWFsRGVlcH0gLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPXtgJHtpZH0tc2lkZWB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMVwiIHkyPVwiMFwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiIzAwMFwiIHN0b3BPcGFjaXR5PVwiMC4zNVwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMzAlXCIgc3RvcENvbG9yPVwiIzAwMFwiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNzUlXCIgc3RvcENvbG9yPVwiI2ZmZlwiIHN0b3BPcGFjaXR5PVwiMC4wNlwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj1cIiMwMDBcIiBzdG9wT3BhY2l0eT1cIjAuMjVcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfS1zb2xlYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9e0Mub3JhbmdlTGlnaHR9IC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMzUlXCIgc3RvcENvbG9yPXtDLm9yYW5nZX0gLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPXtDLm9yYW5nZURlZXB9IC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9LXRvbmd1ZWB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMVwiIHkyPVwiMVwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPXtDLnRlYWxMaWdodH0gLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPXtDLnRlYWx9IC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxwYXR0ZXJuIGlkPXtgJHtpZH0tbWVzaGB9IHdpZHRoPVwiN1wiIGhlaWdodD1cIjdcIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIzLjVcIiBjeT1cIjMuNVwiIHI9XCIxLjI1XCIgZmlsbD17Qy50ZWFsSW5rfSBvcGFjaXR5PVwiMC40NVwiIC8+XG4gICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgPGNsaXBQYXRoIGlkPXtgJHtpZH0tY2xpcGB9PlxuICAgICAgICAgIDxwYXRoIGQ9e1VQUEVSfSAvPlxuICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICA8ZmlsdGVyIGlkPXtgJHtpZH0tYmx1cmB9IHg9XCItMjAlXCIgeT1cIi0yMDAlXCIgd2lkdGg9XCIxNDAlXCIgaGVpZ2h0PVwiNTAwJVwiPlxuICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249XCI4XCIgLz5cbiAgICAgICAgPC9maWx0ZXI+XG4gICAgICA8L2RlZnM+XG5cbiAgICAgIHsvKiBjb250YWN0IHNoYWRvdyAqL31cbiAgICAgIDxlbGxpcHNlIGN4PVwiMzE4XCIgY3k9XCIyNjhcIiByeD1cIjI5MFwiIHJ5PVwiMTRcIiBmaWxsPVwiIzAwMFwiIG9wYWNpdHk9ezAuNjUgKiBzaGFkb3d9IGZpbHRlcj17YHVybCgjJHtpZH0tYmx1cilgfSAvPlxuXG4gICAgICB7LyogdXBwZXIgKi99XG4gICAgICA8cGF0aCBkPXtVUFBFUn0gZmlsbD17YHVybCgjJHtpZH0tdXApYH0gLz5cbiAgICAgIDxnIGNsaXBQYXRoPXtgdXJsKCMke2lkfS1jbGlwKWB9PlxuICAgICAgICA8cmVjdCB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCI2MDBcIiBoZWlnaHQ9XCIzMDBcIiBmaWxsPXtgdXJsKCMke2lkfS1tZXNoKWB9IC8+XG4gICAgICAgIDxyZWN0IHg9XCIwXCIgeT1cIjBcIiB3aWR0aD1cIjYwMFwiIGhlaWdodD1cIjMwMFwiIGZpbGw9e2B1cmwoIyR7aWR9LXNpZGUpYH0gLz5cbiAgICAgICAgey8qIGhlZWwgY291bnRlciAqL31cbiAgICAgICAgPHBhdGggZD1cIk0gNDAgMjAwIEMgNDQgMTUwIDU2IDExMCA4NiA5MiBDIDEwMCAxMzAgMTA4IDE2OCAxMTYgMjAwIFpcIiBmaWxsPXtDLnRlYWxEZWVwfSAvPlxuICAgICAgICB7LyogdG9lIGNhcCAqL31cbiAgICAgICAgPHBhdGggZD1cIk0gNDY2IDE1MCBDIDUzMCAxNjAgNTY4IDE4MiA1ODAgMjEwIEwgNDY2IDIxMCBDIDQ1MiAxOTAgNDUyIDE2NiA0NjYgMTUwIFpcIiBmaWxsPXtDLnRlYWxEZWVwfSBvcGFjaXR5PVwiMC45XCIgLz5cbiAgICAgICAgey8qIGtlc3RyZWwgd2luZyBzdHJpcGVzICovfVxuICAgICAgICA8cGF0aCBkPVwiTSAxNTAgMTg4IEMgMjIwIDE1MCAzMTAgMTI4IDQyMCAxNDYgTCA0NDAgMTU2IEMgMzMwIDE0NiAyNDggMTY2IDE3MiAxOTggWlwiIGZpbGw9e0Mub3JhbmdlfSAvPlxuICAgICAgICA8cGF0aCBkPVwiTSAyMDAgMTkyIEMgMjYwIDE2OCAzMzAgMTU2IDQxMCAxNjQgTCA0MjQgMTcyIEMgMzQwIDE2OCAyNzIgMTgwIDIxNCAyMDAgWlwiIGZpbGw9e0Mub3JhbmdlTGlnaHR9IG9wYWNpdHk9XCIwLjlcIiAvPlxuICAgICAgICB7LyogdG9wLWVkZ2UgaGlnaGxpZ2h0ICovfVxuICAgICAgICA8cGF0aCBkPVwiTSA5MiAxMDAgQyAxMjAgODggMTUwIDEwNCAyMDAgMTAwIEwgMjEwIDEwNCBDIDE2MCAxMTIgMTI0IDk4IDk2IDEwOCBaXCIgZmlsbD1cIiNmZmZcIiBvcGFjaXR5PVwiMC4yNVwiIC8+XG4gICAgICAgIDxwYXRoIGQ9XCJNIDI5NiAxMTggQyAzNjAgMTM2IDQzMCAxNDQgNDgwIDE1NiBDIDUyMCAxNjQgNTUyIDE3OCA1NjYgMTk0IEMgNTQwIDE3NiA1MDAgMTY2IDQ3MCAxNjAgQyA0MTAgMTUwIDM1MCAxNDAgMjk2IDEyNCBaXCIgZmlsbD1cIiNmZmZcIiBvcGFjaXR5PVwiMC4yMlwiIC8+XG4gICAgICA8L2c+XG5cbiAgICAgIHsvKiBjb2xsYXIgbGluaW5nICovfVxuICAgICAgPHBhdGggZD1cIk0gOTAgOTggQyAxMTAgODYgMTI4IDkwIDE0MCA5NiBDIDE2MCAxMDggMTkyIDExMCAyMTQgOTggTCAyMTAgMTEwIEMgMTg2IDEyMCAxNTYgMTE2IDEzNiAxMDYgQyAxMjAgOTggMTA0IDEwMCA5MCAxMDYgWlwiIGZpbGw9e0MudGVhbElua30gLz5cbiAgICAgIHsvKiBoZWVsIHB1bGwgdGFiICovfVxuICAgICAgPHBhdGggZD1cIk0gNzggMTAwIEwgNzAgODAgQyA3MCA3NCA3OCA3MiA4MiA3NiBMIDk0IDk2IFpcIiBmaWxsPXtDLm9yYW5nZX0gLz5cbiAgICAgIHsvKiB0b25ndWUgKi99XG4gICAgICA8cGF0aCBkPVwiTSAyMTQgOTYgTCAyNDYgNjQgQyAyNTYgNTYgMjcwIDU4IDI3NCA3MCBMIDI5MCAxMTQgTCAyMzYgMTE4IFpcIiBmaWxsPXtgdXJsKCMke2lkfS10b25ndWUpYH0gLz5cbiAgICAgIHsvKiBsYWNlcyAqL31cbiAgICAgIHtsYWNlcy5tYXAoKGkpID0+IHtcbiAgICAgICAgY29uc3QgeCA9IDIzOCArIGkgKiAyMTtcbiAgICAgICAgY29uc3QgeSA9IDEwNiArIGkgKiA2LjU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGcga2V5PXtpfT5cbiAgICAgICAgICAgIDxsaW5lIHgxPXt4IC0gMTJ9IHkxPXt5IC0gN30geDI9e3ggKyAxMn0geTI9e3kgKyA5fSBzdHJva2U9XCIjZTJlOGYwXCIgc3Ryb2tlV2lkdGg9XCI1XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgLz5cbiAgICAgICAgICAgIDxsaW5lIHgxPXt4IC0gMTJ9IHkxPXt5ICsgOX0geDI9e3ggKyAxMn0geTI9e3kgLSA3fSBzdHJva2U9XCIjY2JkNWUxXCIgc3Ryb2tlV2lkdGg9XCI0XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgICk7XG4gICAgICB9KX1cblxuICAgICAgey8qIG1pZHNvbGUgKi99XG4gICAgICA8cGF0aCBkPXtNSURTT0xFfSBmaWxsPXtgdXJsKCMke2lkfS1zb2xlKWB9IC8+XG4gICAgICB7cG9kcy5tYXAoKHgsIGkpID0+IChcbiAgICAgICAgPGVsbGlwc2Uga2V5PXt4fSBjeD17eH0gY3k9ezIyNiArIChpICUgMikgKiAyfSByeD1cIjI2XCIgcnk9XCI5XCIgZmlsbD17Qy5vcmFuZ2VEZWVwfSBvcGFjaXR5PVwiMC41NVwiIC8+XG4gICAgICApKX1cbiAgICAgIDxwYXRoIGQ9XCJNIDY0IDIyMCBDIDE2MCAyMTAgMjQwIDIzMiAzMjAgMjIyIFMgNDgwIDIxMCA1NzAgMjIwXCIgc3Ryb2tlPXtDLm9yYW5nZUxpZ2h0fSBzdHJva2VXaWR0aD1cIjNcIiBmaWxsPVwibm9uZVwiIG9wYWNpdHk9XCIwLjhcIiAvPlxuICAgICAgPHBhdGggZD1cIk0gNjAgMjA2IEMgMjAwIDE5OCA0MDAgMjAyIDU2MCAyMDRcIiBzdHJva2U9XCIjZmZmXCIgc3Ryb2tlV2lkdGg9XCIyLjVcIiBmaWxsPVwibm9uZVwiIG9wYWNpdHk9XCIwLjRcIiAvPlxuXG4gICAgICB7Lyogb3V0c29sZSArIGx1Z3MgKi99XG4gICAgICA8cGF0aCBkPXtPVVRTT0xFfSBmaWxsPXtDLm9yYW5nZUJ1cm50fSAvPlxuICAgICAge2x1Z3MubWFwKCh4KSA9PiAoXG4gICAgICAgIDxyZWN0IGtleT17eH0geD17eH0geT1cIjI1MVwiIHdpZHRoPVwiMTJcIiBoZWlnaHQ9XCI5XCIgcng9XCIyXCIgZmlsbD17Qy5vcmFuZ2VEZWVwfSAvPlxuICAgICAgKSl9XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG4vKiBcdTI1MDBcdTI1MDAgTmlnaHQgY2l0eSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDAgKi9cblxudHlwZSBCdWlsZGluZyA9IHsgeDogbnVtYmVyOyB3OiBudW1iZXI7IGg6IG51bWJlcjsgbGl0OiBudW1iZXI7IGk6IG51bWJlciB9O1xuY29uc3QgbWFrZUJ1aWxkaW5ncyA9IChzZWVkOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIHU6IG51bWJlciwgbWluSDogbnVtYmVyLCBtYXhIOiBudW1iZXIpID0+IHtcbiAgY29uc3Qgb3V0OiBCdWlsZGluZ1tdID0gW107XG4gIGxldCB4ID0gLTYwICogdTtcbiAgbGV0IGkgPSAwO1xuICB3aGlsZSAoeCA8IHdpZHRoICsgNTAwICogdSkge1xuICAgIGNvbnN0IHcgPSAoNzAgKyByYW5kKHNlZWQgKyBpICogMykgKiAxNTApICogdTtcbiAgICBjb25zdCBoID0gbWluSCArIE1hdGgucG93KHJhbmQoc2VlZCArIGkgKiAzICsgMSksIDEuNCkgKiAobWF4SCAtIG1pbkgpO1xuICAgIG91dC5wdXNoKHsgeCwgdywgaCwgbGl0OiByYW5kKHNlZWQgKyBpICogMyArIDIpLCBpIH0pO1xuICAgIHggKz0gdyArICg2ICsgcmFuZChzZWVkICsgaSAqIDcpICogMTgpICogdTtcbiAgICBpKys7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn07XG5cbmNvbnN0IE5pZ2h0Q2l0eTogUmVhY3QuRkM8e1xuICBncm91bmRZOiBudW1iZXI7XG4gIGRyaWZ0OiBudW1iZXI7XG4gIGJsdXI/OiBudW1iZXI7XG4gIGdsb3dYPzogbnVtYmVyO1xuICBnbG93WT86IG51bWJlcjtcbiAgd2FybT86IG51bWJlcjtcbn0+ID0gKHsgZ3JvdW5kWSwgZHJpZnQsIGJsdXIgPSAwLCBnbG93WCA9IDAuNSwgZ2xvd1ksIHdhcm0gPSAwLjUgfSkgPT4ge1xuICBjb25zdCBmcmFtZSA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIHUgfSA9IHVzZUxheW91dCgpO1xuICBjb25zdCBmYXIgPSBtYWtlQnVpbGRpbmdzKDExLCB3aWR0aCwgdSwgaGVpZ2h0ICogMC4wOCwgZ3JvdW5kWSAqIDAuNSk7XG4gIGNvbnN0IG5lYXIgPSBtYWtlQnVpbGRpbmdzKDk3LCB3aWR0aCwgdSwgaGVpZ2h0ICogMC4wNSwgZ3JvdW5kWSAqIDAuMzQpO1xuICBjb25zdCBnID0gKGdyb3VuZFkgLyBoZWlnaHQpICogMTAwO1xuICBjb25zdCBzdGFycyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDYwIH0sIChfLCBpKSA9PiAoe1xuICAgIHg6IHJhbmQoaSAqIDUuMSkgKiB3aWR0aCxcbiAgICB5OiByYW5kKGkgKiA5LjcpICogZ3JvdW5kWSAqIDAuNTUsXG4gICAgcjogKDAuNiArIHJhbmQoaSAqIDIuMykgKiAxLjQpICogdSxcbiAgICBvOiAwLjIgKyByYW5kKGkgKiA0LjQpICogMC41LFxuICB9KSk7XG4gIGNvbnN0IGJsaW5rID0gMC40ICsgMC42ICogTWF0aC5tYXgoMCwgTWF0aC5zaW4oZnJhbWUgLyA1KSk7XG4gIGNvbnN0IGd5ID0gZ2xvd1kgPz8gZ3JvdW5kWSAqIDAuODU7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsXG4gICAgICBkYXRhLWxheWVyPVwiYmFja2dyb3VuZFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzAzMDUwZCAwJSwgIzA4MTAyYSAke2cgKiAwLjV9JSwgIzE3MWE0OCAke2cgKiAwLjg1fSUsICMzYjFmM2YgJHtnfSUsICMwNjA3MGQgJHtnfSUsICMwMjAzMDggMTAwJSlgLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8c3ZnXG4gICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCwgZmlsdGVyOiBibHVyID8gYGJsdXIoJHtibHVyfXB4KWAgOiB1bmRlZmluZWQgfX1cbiAgICAgID5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPHBhdHRlcm4gaWQ9XCJ3aW4tZmFyXCIgd2lkdGg9ezEyICogdX0gaGVpZ2h0PXsxOCAqIHV9IHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XG4gICAgICAgICAgICA8cmVjdCB4PXszICogdX0geT17NSAqIHV9IHdpZHRoPXs1ICogdX0gaGVpZ2h0PXs3ICogdX0gZmlsbD1cIiM5M2E1ZmZcIiAvPlxuICAgICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgICA8cGF0dGVybiBpZD1cIndpbi1uZWFyXCIgd2lkdGg9ezE2ICogdX0gaGVpZ2h0PXsyNCAqIHV9IHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XG4gICAgICAgICAgICA8cmVjdCB4PXs0ICogdX0geT17NyAqIHV9IHdpZHRoPXs3ICogdX0gaGVpZ2h0PXsxMCAqIHV9IGZpbGw9XCIjZmZjNzdhXCIgLz5cbiAgICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwiaGF6ZVwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjM2IyYTZiXCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9XCIjZmY3YTNkXCIgc3RvcE9wYWNpdHk9ezAuMTggKiB3YXJtICsgMC4wNn0gLz5cbiAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cImdyb3VuZFwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjMTQxNDI4XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9XCIjMDIwMzA4XCIgLz5cbiAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8L2RlZnM+XG5cbiAgICAgICAge3N0YXJzLm1hcCgocywgaSkgPT4gKFxuICAgICAgICAgIDxjaXJjbGUga2V5PXtpfSBjeD17cy54fSBjeT17cy55fSByPXtzLnJ9IGZpbGw9XCIjY2JkNWZmXCIgb3BhY2l0eT17cy5vfSAvPlxuICAgICAgICApKX1cblxuICAgICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHstZHJpZnQgKiAwLjM1fSwwKWB9PlxuICAgICAgICAgIHtmYXIubWFwKChiKSA9PiAoXG4gICAgICAgICAgICA8ZyBrZXk9e2IuaX0+XG4gICAgICAgICAgICAgIDxyZWN0IHg9e2IueH0geT17Z3JvdW5kWSAtIGIuaH0gd2lkdGg9e2Iud30gaGVpZ2h0PXtiLmh9IGZpbGw9XCIjMTExODNhXCIgLz5cbiAgICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgICB4PXtiLnggKyA0ICogdX1cbiAgICAgICAgICAgICAgICB5PXtncm91bmRZIC0gYi5oICsgMTIgKiB1fVxuICAgICAgICAgICAgICAgIHdpZHRoPXtNYXRoLm1heCgwLCBiLncgLSA4ICogdSl9XG4gICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXRoLm1heCgwLCBiLmggLSAxMiAqIHUpfVxuICAgICAgICAgICAgICAgIGZpbGw9XCJ1cmwoI3dpbi1mYXIpXCJcbiAgICAgICAgICAgICAgICBvcGFjaXR5PXswLjA2ICsgYi5saXQgKiAwLjJ9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZz5cblxuICAgICAgICA8cmVjdCB4PXswfSB5PXtncm91bmRZICogMC40NX0gd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2dyb3VuZFkgKiAwLjU1fSBmaWxsPVwidXJsKCNoYXplKVwiIC8+XG5cbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LWRyaWZ0fSwwKWB9PlxuICAgICAgICAgIHtuZWFyLm1hcCgoYikgPT4gKFxuICAgICAgICAgICAgPGcga2V5PXtiLml9PlxuICAgICAgICAgICAgICA8cmVjdCB4PXtiLnh9IHk9e2dyb3VuZFkgLSBiLmh9IHdpZHRoPXtiLnd9IGhlaWdodD17Yi5ofSBmaWxsPVwiIzA3MGExN1wiIC8+XG4gICAgICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICAgICAgeD17Yi54ICsgNiAqIHV9XG4gICAgICAgICAgICAgICAgeT17Z3JvdW5kWSAtIGIuaCArIDE0ICogdX1cbiAgICAgICAgICAgICAgICB3aWR0aD17TWF0aC5tYXgoMCwgYi53IC0gMTIgKiB1KX1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9e01hdGgubWF4KDAsIGIuaCAtIDE0ICogdSl9XG4gICAgICAgICAgICAgICAgZmlsbD1cInVybCgjd2luLW5lYXIpXCJcbiAgICAgICAgICAgICAgICBvcGFjaXR5PXtiLmxpdCA+IDAuMzUgPyAwLjEyICsgYi5saXQgKiAwLjQgOiAwLjA1fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7Yi5saXQgPiAwLjgyID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8cmVjdCB4PXtiLnggKyBiLncgLyAyIC0gMS41ICogdX0geT17Z3JvdW5kWSAtIGIuaCAtIDQwICogdX0gd2lkdGg9ezMgKiB1fSBoZWlnaHQ9ezQwICogdX0gZmlsbD1cIiMwNzBhMTdcIiAvPlxuICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD17Yi54ICsgYi53IC8gMn0gY3k9e2dyb3VuZFkgLSBiLmggLSA0MCAqIHV9IHI9ezMuNSAqIHV9IGZpbGw9XCIjZmYzYjNiXCIgb3BhY2l0eT17Ymxpbmt9IC8+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2c+XG5cbiAgICAgICAgPHJlY3QgeD17MH0geT17Z3JvdW5kWX0gd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodCAtIGdyb3VuZFl9IGZpbGw9XCJ1cmwoI2dyb3VuZClcIiAvPlxuICAgICAgICA8cmVjdCB4PXswfSB5PXtncm91bmRZIC0gMSAqIHV9IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXsyICogdX0gZmlsbD17Qy50ZWFsQnJpZ2h0fSBvcGFjaXR5PXswLjM1fSAvPlxuICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9LCAoXywgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHkgPSBncm91bmRZICsgKDE4ICsgaSAqIGkgKiAxNCkgKiB1O1xuICAgICAgICAgIHJldHVybiB5IDwgaGVpZ2h0ID8gKFxuICAgICAgICAgICAgPHJlY3Qga2V5PXtpfSB4PXswfSB5PXt5fSB3aWR0aD17d2lkdGh9IGhlaWdodD17KDEgKyBpICogMC42KSAqIHV9IGZpbGw9XCIjNmI3Y2ZmXCIgb3BhY2l0eT17MC4wOCAtIGkgKiAwLjAxfSAvPlxuICAgICAgICAgICkgOiBudWxsO1xuICAgICAgICB9KX1cbiAgICAgIDwvc3ZnPlxuXG4gICAgICB7Lyoga2V5LWxpZ2h0IGdsb3cgYmVoaW5kIHRoZSBwcm9kdWN0ICovfVxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSAke3dpZHRoICogMC41fXB4ICR7aGVpZ2h0ICogMC4zNX1weCBhdCAke2dsb3dYICogMTAwfSUgJHtneX1weCwgcmdiYSg0NSwyMTIsMTkxLDAuMjgpLCByZ2JhKDQ1LDIxMiwxOTEsMC4wNikgNTUlLCB0cmFuc3BhcmVudCA3NSUpYCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG5jb25zdCBWaWduZXR0ZTogUmVhY3QuRkM8eyBzdHJlbmd0aD86IG51bWJlciB9PiA9ICh7IHN0cmVuZ3RoID0gMC43IH0pID0+IChcbiAgPEFic29sdXRlRmlsbFxuICAgIGRhdGEtbGF5ZXI9XCJ2aWduZXR0ZVwiXG4gICAgc3R5bGU9e3tcbiAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCA1MCUgNTAlLCB0cmFuc3BhcmVudCA0NSUsIHJnYmEoMCwwLDAsJHtzdHJlbmd0aH0pIDEwMCUpYCxcbiAgICB9fVxuICAvPlxuKTtcblxuLyogXHUyNTAwXHUyNTAwIEJyYW5kIG1hcmsgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwICovXG5cbmNvbnN0IExvZ29NYXJrOiBSZWFjdC5GQzx7IHNpemU6IG51bWJlciB9PiA9ICh7IHNpemUgfSkgPT4gKFxuICA8c3ZnIGRhdGEtbGF5ZXI9XCJsb2dvLW1hcmtcIiB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplICogMC43NX0gdmlld0JveD1cIjAgMCA0MCAzMFwiIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX0+XG4gICAgPHBhdGggZD1cIk0gMCAyMiBMIDI2IDIgTCAxOSAxNSBMIDQwIDggTCAxMiAzMCBMIDE4IDE5IFpcIiBmaWxsPXtDLm9yYW5nZX0gLz5cbiAgPC9zdmc+XG4pO1xuXG4vKiBcdTI1MDBcdTI1MDAgU2hvdCAxIFx1MDBCNyBQcm9kdWN0IGhlcm8gXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwICovXG5cbmNvbnN0IFNob3RIZXJvOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGxheW91dCwgdSB9ID0gdXNlTGF5b3V0KCk7XG5cbiAgY29uc3Qgc2hvZVcgPSB3aWR0aCAqIHBpY2sobGF5b3V0LCB7IGxhbmRzY2FwZTogMC41LCBwb3J0cmFpdDogMC45LCBzcXVhcmU6IDAuNzggfSk7XG4gIGNvbnN0IGdyb3VuZFkgPSBoZWlnaHQgKiBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDAuODQsIHBvcnRyYWl0OiAwLjYyLCBzcXVhcmU6IDAuODYgfSk7XG4gIGNvbnN0IGN4ID0gd2lkdGggKiBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDAuNTgsIHBvcnRyYWl0OiAwLjUsIHNxdWFyZTogMC41IH0pO1xuICBjb25zdCBzaG9lTGVmdCA9IGN4IC0gc2hvZVcgLyAyO1xuICBjb25zdCBzaG9lVG9wID0gZ3JvdW5kWSAtIFNPTEVfQk9UVE9NICogKHNob2VXIC8gMik7XG5cbiAgLy8gU2xpZGU6IGZ1bGx5IGluIGZyYW1lIGJ5IGZyYW1lIDI2ICg8IDA6MDEpLlxuICBjb25zdCBwID0gaW50ZXJwb2xhdGUoZiwgWzAsIDI2XSwgWzAsIDFdLCB7IC4uLkNMQU1QLCBlYXNpbmc6IEVBU0VfT1VUIH0pO1xuICBjb25zdCBzdGFydFggPSAtKHNob2VMZWZ0ICsgc2hvZVcgKyAxMjAgKiB1KTtcbiAgY29uc3QgeCA9IGludGVycG9sYXRlKHAsIFswLCAxXSwgW3N0YXJ0WCwgMF0pO1xuICBjb25zdCB0aWx0ID0gaW50ZXJwb2xhdGUocCwgWzAsIDAuNywgMV0sIFstOSwgMiwgMF0pO1xuICBjb25zdCBsYW5kID0gc3ByaW5nKHsgZnJhbWU6IGYgLSAyMiwgZnBzOiAzMCwgY29uZmlnOiB7IGRhbXBpbmc6IDEyLCBzdGlmZm5lc3M6IDE4MCB9IH0pO1xuICBjb25zdCBzcXVhc2ggPSAxIC0gMC4wMzUgKiBNYXRoLnNpbihNYXRoLm1pbigxLCBsYW5kKSAqIE1hdGguUEkpO1xuICBjb25zdCBmbG9hdCA9IGYgPiAzMCA/IE1hdGguc2luKChmIC0gMzApIC8gMTEpICogNSAqIHUgOiAwO1xuXG4gIGNvbnN0IGNhbWVyYSA9IGludGVycG9sYXRlKGYsIFswLCA5MF0sIFsxLCAxLjA0NV0sIHsgZWFzaW5nOiBFYXNpbmcuaW5PdXQoRWFzaW5nLnF1YWQpIH0pO1xuXG4gIC8vIExpZ2h0IHRyYWlscyBiZWhpbmQgdGhlIHNob2UsIGZhZGluZyBvbmNlIGl0IGxhbmRzLlxuICBjb25zdCB0cmFpbEZhZGUgPSBpbnRlcnBvbGF0ZShmLCBbMCwgMjIsIDQwXSwgWzEsIDAuOCwgMC4xOF0sIENMQU1QKTtcbiAgY29uc3QgdHJhaWxzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9LCAoXywgaSkgPT4ge1xuICAgIGNvbnN0IGxlbiA9ICgyNjAgKyByYW5kKGkgKiAzLjMpICogNTIwKSAqIHU7XG4gICAgY29uc3Qgc3BlZWQgPSAoMzggKyByYW5kKGkgKiAxLjcpICogMzApICogdTtcbiAgICBjb25zdCBzcGFuID0gd2lkdGggKyBsZW47XG4gICAgY29uc3QgeHggPSAoKGYgKiBzcGVlZCArIHJhbmQoaSAqIDguMSkgKiBzcGFuKSAlIHNwYW4pIC0gbGVuO1xuICAgIGNvbnN0IHl5ID0gZ3JvdW5kWSAtICgxMiArIHJhbmQoaSAqIDYuMikgKiAwLjkgKiAoc2hvZVcgLyAyKSkgKiAxO1xuICAgIHJldHVybiB7IGxlbiwgeHgsIHl5LCBjb2xvcjogaSAlIDMgPT09IDAgPyBDLm9yYW5nZSA6IEMudGVhbEJyaWdodCwgaDogKDIgKyByYW5kKGkpICogMykgKiB1IH07XG4gIH0pO1xuXG4gIC8vIEltcGFjdCByaXBwbGVcbiAgY29uc3QgcmlwID0gaW50ZXJwb2xhdGUoZiwgWzIyLCA1MF0sIFswLCAxXSwgeyAuLi5DTEFNUCwgZWFzaW5nOiBFYXNpbmcub3V0KEVhc2luZy5jdWJpYykgfSk7XG5cbiAgLy8gQ2FwdGlvbjogZnVsbHkgdmlzaWJsZSBieSBmcmFtZSAyNCAoPCAwOjAxKS5cbiAgY29uc3QgYyA9IGludGVycG9sYXRlKGYsIFs0LCAyNF0sIFswLCAxXSwgeyAuLi5DTEFNUCwgZWFzaW5nOiBFQVNFX09VVCB9KTtcbiAgY29uc3QgY2FwU2l6ZSA9IHBpY2sobGF5b3V0LCB7IGxhbmRzY2FwZTogMTM2LCBwb3J0cmFpdDogMTI0LCBzcXVhcmU6IDExMiB9KSAqIHU7XG4gIGNvbnN0IGNhcFRvcCA9IGhlaWdodCAqIHBpY2sobGF5b3V0LCB7IGxhbmRzY2FwZTogMC4xMiwgcG9ydHJhaXQ6IDAuMiwgc3F1YXJlOiAwLjEgfSk7XG4gIGNvbnN0IGNhcEFsaWduID0gbGF5b3V0ID09PSAnbGFuZHNjYXBlJyA/ICdsZWZ0JyA6ICdjZW50ZXInO1xuICBjb25zdCBiYXJXID0gaW50ZXJwb2xhdGUoZiwgWzIsIDIwXSwgWzAsIDk2ICogdV0sIHsgLi4uQ0xBTVAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogJyMwMzA1MGQnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IHRyYW5zZm9ybTogYHNjYWxlKCR7Y2FtZXJhfSlgIH19PlxuICAgICAgICA8TmlnaHRDaXR5IGdyb3VuZFk9e2dyb3VuZFl9IGRyaWZ0PXtmICogMyAqIHV9IGdsb3dYPXtjeCAvIHdpZHRofSBnbG93WT17Z3JvdW5kWSAtIHNob2VXICogMC4yfSB3YXJtPXswLjZ9IC8+XG5cbiAgICAgICAge3RyYWlscy5tYXAoKHQsIGkpID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBkYXRhLWxheWVyPVwibGlnaHQtdHJhaWxcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgIGxlZnQ6IHQueHgsXG4gICAgICAgICAgICAgIHRvcDogdC55eSxcbiAgICAgICAgICAgICAgd2lkdGg6IHQubGVuLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHQuaCxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0LmgsXG4gICAgICAgICAgICAgIG9wYWNpdHk6IHRyYWlsRmFkZSAqIDAuODUsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCAke3QuY29sb3J9KWAsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCAkezE0ICogdX1weCAke3QuY29sb3J9YCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJncm91bmQtcmlwcGxlXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBjeCAtIHNob2VXICogMC41NSAqICgwLjYgKyByaXAgKiAwLjYpLFxuICAgICAgICAgICAgdG9wOiBncm91bmRZIC0gMTIgKiB1LFxuICAgICAgICAgICAgd2lkdGg6IHNob2VXICogMS4xICogKDAuNiArIHJpcCAqIDAuNiksXG4gICAgICAgICAgICBoZWlnaHQ6IDI0ICogdSxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBib3JkZXI6IGAkezIgKiB1fXB4IHNvbGlkICR7Qy50ZWFsQnJpZ2h0fWAsXG4gICAgICAgICAgICBvcGFjaXR5OiAoMSAtIHJpcCkgKiAoZiA+PSAyMiA/IDAuNyA6IDApLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwICR7MjQgKiB1fXB4ICR7Qy50ZWFsfWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogc2hvZUxlZnQsXG4gICAgICAgICAgICB0b3A6IHNob2VUb3AgKyBmbG9hdCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fXB4KSByb3RhdGUoJHt0aWx0fWRlZykgc2NhbGVZKCR7c3F1YXNofSlgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnNTAlIDkwJScsXG4gICAgICAgICAgICBmaWx0ZXI6IGBkcm9wLXNoYWRvdygwICR7MzAgKiB1fXB4ICR7NDAgKiB1fXB4IHJnYmEoMCwwLDAsMC41NSkpYCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFNob2UgaWQ9XCJoZXJvXCIgd2lkdGg9e3Nob2VXfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQWJzb2x1dGVGaWxsPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogbGF5b3V0ID09PSAnbGFuZHNjYXBlJyA/IHdpZHRoICogMC4wNyA6IDAsXG4gICAgICAgICAgcmlnaHQ6IGxheW91dCA9PT0gJ2xhbmRzY2FwZScgPyB1bmRlZmluZWQgOiAwLFxuICAgICAgICAgIHRvcDogY2FwVG9wLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBsYXlvdXQgPT09ICdsYW5kc2NhcGUnID8gJ2ZsZXgtc3RhcnQnIDogJ2NlbnRlcicsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgZGF0YS1sYXllcj1cImFjY2VudFwiIHN0eWxlPXt7IHdpZHRoOiBiYXJXLCBoZWlnaHQ6IDggKiB1LCBib3JkZXJSYWRpdXM6IDQgKiB1LCBiYWNrZ3JvdW5kOiBDLm9yYW5nZSwgbWFyZ2luQm90dG9tOiAyOCAqIHUgfX0gLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJjYXB0aW9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRTaXplOiBjYXBTaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogODAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjA0NWVtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogQy5wYXBlcixcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgdGV4dEFsaWduOiBjYXBBbGlnbixcbiAgICAgICAgICAgIG9wYWNpdHk6IGMsXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7KDEgLSBjKSAqIDUwICogdX1weClgLFxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigkeygxIC0gYykgKiAxMCAqIHV9cHgpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IGAwICR7NiAqIHV9cHggJHszMCAqIHV9cHggcmdiYSgwLDAsMCwwLjUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgUnVuIHRoZSBjaXR5XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxWaWduZXR0ZSBzdHJlbmd0aD17MC42NX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIFx1MjUwMFx1MjUwMCBTaG90IDIgXHUwMEI3IERldGFpbCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDAgKi9cblxuY29uc3QgU2hvdERldGFpbDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGYgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBsYXlvdXQsIHUgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VXID0gd2lkdGggKiBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDIuMywgcG9ydHJhaXQ6IDMuMCwgc3F1YXJlOiAyLjYgfSk7XG4gIGNvbnN0IHNob2VIID0gc2hvZVcgLyAyO1xuICBjb25zdCBmeCA9IHdpZHRoICogMC41O1xuICBjb25zdCBmeSA9IGhlaWdodCAqIHBpY2sobGF5b3V0LCB7IGxhbmRzY2FwZTogMC41LCBwb3J0cmFpdDogMC42LCBzcXVhcmU6IDAuNTIgfSk7XG4gIC8vIGZvY3VzIHBvaW50IG9uIHRoZSBtaWRzb2xlIChzdmcgMzMwLDIyMilcbiAgY29uc3QgcGFuID0gaW50ZXJwb2xhdGUoZiwgWzAsIDEyMF0sIFswLjA2LCAtMC4wNl0sIHsgZWFzaW5nOiBFYXNpbmcuaW5PdXQoRWFzaW5nLnNpbikgfSkgKiB3aWR0aDtcbiAgY29uc3Qgc2hvZUxlZnQgPSBmeCAtICgzMzAgLyA2MDApICogc2hvZVcgKyBwYW47XG4gIGNvbnN0IHNob2VUb3AgPSBmeSAtICgyMjIgLyAzMDApICogc2hvZUg7XG4gIGNvbnN0IHB1c2ggPSBpbnRlcnBvbGF0ZShmLCBbMCwgMTIwXSwgWzEuMDgsIDEuMF0sIHsgZWFzaW5nOiBFYXNpbmcub3V0KEVhc2luZy5xdWFkKSB9KTtcbiAgY29uc3QgZW50ZXIgPSBpbnRlcnBvbGF0ZShmLCBbMCwgMTBdLCBbMCwgMV0sIHsgLi4uQ0xBTVAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG5cbiAgLy8gbGlnaHQgc3dlZXAgYWNyb3NzIHRoZSBzb2xlXG4gIGNvbnN0IHN3ZWVwID0gaW50ZXJwb2xhdGUoZiwgWzE2LCA3Nl0sIFstMC42LCAxLjRdLCB7IC4uLkNMQU1QLCBlYXNpbmc6IEVhc2luZy5pbk91dChFYXNpbmcuY3ViaWMpIH0pO1xuXG4gIC8vIFdvcmRtYXJrOiBhYnNlbnQgYXQgMDowMyAoZj0wKSwgZnVsbHkgdmlzaWJsZSBieSBmPTUyICg8IDA6MDUpLlxuICBjb25zdCB3ID0gaW50ZXJwb2xhdGUoZiwgWzIwLCA1Ml0sIFswLCAxXSwgeyAuLi5DTEFNUCwgZWFzaW5nOiBFQVNFX09VVCB9KTtcbiAgY29uc3Qgd21TaXplID0gcGljayhsYXlvdXQsIHsgbGFuZHNjYXBlOiA5NiwgcG9ydHJhaXQ6IDkyLCBzcXVhcmU6IDg0IH0pICogdTtcbiAgY29uc3QgbHMgPSBpbnRlcnBvbGF0ZSh3LCBbMCwgMV0sIFswLjc1LCAwLjM0XSk7XG5cbiAgLy8gUHJpY2UgdGFnOiBpbiBieSBmPTIyLCBoZWxkIHRocm91Z2ggdGhlIGVuZCAoMDowNCBhbmQgMDowNiBib3RoIGNvdmVyZWQpLlxuICBjb25zdCB0ID0gaW50ZXJwb2xhdGUoZiwgWzYsIDIyXSwgWzAsIDFdLCB7IC4uLkNMQU1QLCBlYXNpbmc6IEVBU0VfT1VUIH0pO1xuICBjb25zdCBzd2luZyA9IGYgPiA2ID8gOSAqIE1hdGguZXhwKC0oZiAtIDYpIC8gMTIpICogTWF0aC5jb3MoKGYgLSA2KSAvIDMuMikgOiA5O1xuICBjb25zdCBwcmljZVNpemUgPSBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDcyLCBwb3J0cmFpdDogNzYsIHNxdWFyZTogNjQgfSkgKiB1O1xuXG4gIGNvbnN0IHdtU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSBwaWNrKGxheW91dCwge1xuICAgIGxhbmRzY2FwZTogeyBsZWZ0OiB3aWR0aCAqIDAuMDcsIHRvcDogaGVpZ2h0ICogMC44IH0sXG4gICAgcG9ydHJhaXQ6IHsgbGVmdDogMCwgcmlnaHQ6IDAsIHRvcDogaGVpZ2h0ICogMC4xNywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH0sXG4gICAgc3F1YXJlOiB7IGxlZnQ6IDAsIHJpZ2h0OiAwLCB0b3A6IGhlaWdodCAqIDAuODIsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9LFxuICB9KTtcbiAgY29uc3QgdGFnU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSBwaWNrKGxheW91dCwge1xuICAgIGxhbmRzY2FwZTogeyByaWdodDogd2lkdGggKiAwLjA4LCB0b3A6IGhlaWdodCAqIDAuMSB9LFxuICAgIHBvcnRyYWl0OiB7IHJpZ2h0OiB3aWR0aCAqIDAuMSwgdG9wOiBoZWlnaHQgKiAwLjMgfSxcbiAgICBzcXVhcmU6IHsgcmlnaHQ6IHdpZHRoICogMC4wOCwgdG9wOiBoZWlnaHQgKiAwLjA4IH0sXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjMDMwNTBkJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgPE5pZ2h0Q2l0eSBncm91bmRZPXtoZWlnaHQgKiAwLjl9IGRyaWZ0PXtmICogMS4yICogdX0gYmx1cj17MTggKiB1fSBnbG93WD17MC41fSBnbG93WT17Znl9IHdhcm09ezAuOX0gLz5cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgNTAlICR7KGZ5IC8gaGVpZ2h0KSAqIDEwMH0lLCByZ2JhKDI0OSwxMTUsMjIsMC4yMiksIHRyYW5zcGFyZW50IDYwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyB0cmFuc2Zvcm06IGBzY2FsZSgke3B1c2h9KWAsIHRyYW5zZm9ybU9yaWdpbjogYCR7Znh9cHggJHtmeX1weGAsIG9wYWNpdHk6IGVudGVyIH19PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogc2hvZUxlZnQsXG4gICAgICAgICAgICB0b3A6IHNob2VUb3AsXG4gICAgICAgICAgICBmaWx0ZXI6IGBkcm9wLXNoYWRvdygwICR7NDAgKiB1fXB4ICR7NjAgKiB1fXB4IHJnYmEoMCwwLDAsMC42KSlgLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U2hvZSBpZD1cImRldGFpbFwiIHdpZHRoPXtzaG9lV30gc2hhZG93PXswLjZ9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9BYnNvbHV0ZUZpbGw+XG5cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgZGF0YS1sYXllcj1cImxpZ2h0LXN3ZWVwXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBtaXhCbGVuZE1vZGU6ICdzY3JlZW4nLFxuICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTA1ZGVnLCB0cmFuc3BhcmVudCAke3N3ZWVwICogMTAwIC0gMTJ9JSwgcmdiYSgyNTUsMjM3LDIxMywwLjM1KSAke3N3ZWVwICogMTAwfSUsIHRyYW5zcGFyZW50ICR7c3dlZXAgKiAxMDAgKyAxMn0lKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPFZpZ25ldHRlIHN0cmVuZ3RoPXswLjc1fSAvPlxuXG4gICAgICB7LyogV29yZG1hcmsgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDIyICogdSwgLi4ud21TdHlsZSB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBvcGFjaXR5OiB3LCB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7KDEgLSB3KSAqIC0yMCAqIHV9cHgpYCB9fT5cbiAgICAgICAgICA8TG9nb01hcmsgc2l6ZT17d21TaXplICogMC44fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJ3b3JkbWFya1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250U2l6ZTogd21TaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogOTAwLFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IGAke2xzfWVtYCxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBgLSR7bHN9ZW1gLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiBDLnBhcGVyLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvcGFjaXR5OiB3LFxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigkeygxIC0gdykgKiAxMiAqIHV9cHgpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IGAwICR7NCAqIHV9cHggJHsyNCAqIHV9cHggcmdiYSgwLDAsMCwwLjYpYCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgS0VTVFJFTFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUHJpY2UgdGFnICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIC4uLnRhZ1N0eWxlLFxuICAgICAgICAgIG9wYWNpdHk6IHQsXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gdCkgKiAtNjAgKiB1fXB4KSByb3RhdGUoJHstNCArIHN3aW5nfWRlZylgLFxuICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzEyJSA1MCUnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cInByaWNlXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRTaXplOiBwcmljZVNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA4MDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDNlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBjb2xvcjogQy5pbmssXG4gICAgICAgICAgICBwYWRkaW5nOiBgJHsyMiAqIHV9cHggJHszOCAqIHV9cHggJHsyMiAqIHV9cHggJHs3MCAqIHV9cHhgLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAxNiAqIHUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZjdlZCwgJHtDLm9yYW5nZUxpZ2h0fSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAkezIwICogdX1weCAkezUwICogdX1weCByZ2JhKDAsMCwwLDAuNDUpLCBpbnNldCAwICR7LTQgKiB1fXB4IDAgcmdiYSgxOTQsNjUsMTIsMC4yNSlgLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBcdTIwQUMxNDlcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwidGFnLWV5ZWxldFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogMjYgKiB1LFxuICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgIHdpZHRoOiAxOCAqIHUsXG4gICAgICAgICAgICBoZWlnaHQ6IDE4ICogdSxcbiAgICAgICAgICAgIG1hcmdpblRvcDogLTkgKiB1LFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMWExMjA1JyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCAwICR7NCAqIHV9cHggcmdiYSgyNTUsMjU1LDI1NSwwLjcpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vKiBcdTI1MDBcdTI1MDAgU2hvdCAzIFx1MDBCNyBDYWxsIHRvIGFjdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDAgKi9cblxuY29uc3QgU2hvdENUQTogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGYgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBsYXlvdXQsIHUgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VXID0gd2lkdGggKiBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDAuNDIsIHBvcnRyYWl0OiAwLjg4LCBzcXVhcmU6IDAuNjIgfSk7XG4gIGNvbnN0IGdyb3VuZFkgPSBoZWlnaHQgKiBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDAuOCwgcG9ydHJhaXQ6IDAuODYsIHNxdWFyZTogMC41OCB9KTtcbiAgY29uc3QgY3ggPSB3aWR0aCAqIHBpY2sobGF5b3V0LCB7IGxhbmRzY2FwZTogMC43NCwgcG9ydHJhaXQ6IDAuNSwgc3F1YXJlOiAwLjUgfSk7XG4gIGNvbnN0IHNob2VMZWZ0ID0gY3ggLSBzaG9lVyAvIDI7XG4gIGNvbnN0IHNob2VUb3AgPSBncm91bmRZIC0gU09MRV9CT1RUT00gKiAoc2hvZVcgLyAyKTtcblxuICAvLyBCYWNrZ3JvdW5kICsgcHJvZHVjdCBjYW1lcmEgc2V0dGxlICh0ZXh0IHN0YXlzIG91dHNpZGUgdGhlIGNhbWVyYSBzbyBpdCBuZXZlciBkcmlmdHMpLlxuICBjb25zdCBjYW1lcmEgPSBpbnRlcnBvbGF0ZShmLCBbMCwgMzZdLCBbMS4wOCwgMV0sIHsgLi4uQ0xBTVAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG4gIGNvbnN0IGRyb3AgPSBzcHJpbmcoeyBmcmFtZTogZiwgZnBzOiAzMCwgY29uZmlnOiB7IGRhbXBpbmc6IDE0LCBzdGlmZm5lc3M6IDEyMCB9IH0pO1xuICBjb25zdCBmbG9hdCA9IE1hdGguc2luKGYgLyAxMykgKiA3ICogdTtcbiAgY29uc3QgdGlsdCA9IC03ICsgTWF0aC5zaW4oZiAvIDIwKSAqIDEuMjtcbiAgY29uc3QgaGFsbyA9IGludGVycG9sYXRlKGYsIFswLCAxNTBdLCBbMCwgNDBdKTtcblxuICAvLyBXb3JkbWFyazogdmlzaWJsZSBmcm9tIHRoZSB2ZXJ5IGZpcnN0IGZyYW1lIG9mIHRoZSBzaG90LlxuICBjb25zdCB3bVNpemUgPSBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDU2LCBwb3J0cmFpdDogNTYsIHNxdWFyZTogNDggfSkgKiB1O1xuICBjb25zdCB3bUxzID0gaW50ZXJwb2xhdGUoZiwgWzAsIDMwXSwgWzAuNDIsIDAuMzRdLCB7IC4uLkNMQU1QLCBlYXNpbmc6IEVBU0VfT1VUIH0pO1xuXG4gIC8vIEhlYWRsaW5lXG4gIGNvbnN0IGggPSBpbnRlcnBvbGF0ZShmLCBbNCwgMjZdLCBbMCwgMV0sIHsgLi4uQ0xBTVAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG4gIGNvbnN0IGhTaXplID0gcGljayhsYXlvdXQsIHsgbGFuZHNjYXBlOiA5NiwgcG9ydHJhaXQ6IDEwNCwgc3F1YXJlOiA4OCB9KSAqIHU7XG5cbiAgLy8gQnV0dG9uOiBmdWxseSB2aXNpYmxlIGJ5IGY9NDAgKGZyYW1lIDI1MCwgPCAwOjA5KS5cbiAgY29uc3QgYm8gPSBpbnRlcnBvbGF0ZShmLCBbMTYsIDMwXSwgWzAsIDFdLCBDTEFNUCk7XG4gIGNvbnN0IGJzID0gaW50ZXJwb2xhdGUoZiwgWzE2LCA0MF0sIFswLjg2LCAxXSwgeyAuLi5DTEFNUCwgZWFzaW5nOiBFYXNpbmcub3V0KEVhc2luZy5iYWNrKDEuNykpIH0pO1xuICBjb25zdCBzaGVlbiA9IGludGVycG9sYXRlKGYgJSA3NSwgWzAsIDQwXSwgWy02MCwgMTYwXSwgQ0xBTVApO1xuICBjb25zdCBwdWxzZSA9IGYgPiA0MCA/IDAuNSArIDAuNSAqIE1hdGguc2luKChmIC0gNDApIC8gOSkgOiAwO1xuICBjb25zdCBiU2l6ZSA9IHBpY2sobGF5b3V0LCB7IGxhbmRzY2FwZTogMzgsIHBvcnRyYWl0OiA0Miwgc3F1YXJlOiAzNiB9KSAqIHU7XG5cbiAgY29uc3Qgd21Ub3AgPSBoZWlnaHQgKiBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDAuMSwgcG9ydHJhaXQ6IDAuMTUsIHNxdWFyZTogMC4wNyB9KTtcbiAgY29uc3QgaFRvcCA9IGhlaWdodCAqIHBpY2sobGF5b3V0LCB7IGxhbmRzY2FwZTogMC4zNiwgcG9ydHJhaXQ6IDAuMjQsIHNxdWFyZTogMC42NCB9KTtcbiAgY29uc3QgYlRvcCA9IGhUb3AgKyBoU2l6ZSAqIDEuMDUgKyBwaWNrKGxheW91dCwgeyBsYW5kc2NhcGU6IDcwLCBwb3J0cmFpdDogODAsIHNxdWFyZTogNDAgfSkgKiB1O1xuXG4gIGNvbnN0IHRleHRCb3g6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPVxuICAgIGxheW91dCA9PT0gJ2xhbmRzY2FwZSdcbiAgICAgID8geyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogd2lkdGggKiAwLjA3LCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcgfVxuICAgICAgOiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCByaWdodDogMCwgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnIzAzMDUwZCcsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgdHJhbnNmb3JtOiBgc2NhbGUoJHtjYW1lcmF9KWAgfX0+XG4gICAgICAgIDxOaWdodENpdHkgZ3JvdW5kWT17Z3JvdW5kWX0gZHJpZnQ9e2YgKiAxLjYgKiB1fSBnbG93WD17Y3ggLyB3aWR0aH0gZ2xvd1k9e2dyb3VuZFkgLSBzaG9lVyAqIDAuMn0gd2FybT17MC43fSAvPlxuXG4gICAgICAgIDxzdmdcbiAgICAgICAgICBkYXRhLWxheWVyPVwiaGFsb1wiXG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCwgb3ZlcmZsb3c6ICd2aXNpYmxlJyB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGVsbGlwc2VcbiAgICAgICAgICAgIGN4PXtjeH1cbiAgICAgICAgICAgIGN5PXtncm91bmRZfVxuICAgICAgICAgICAgcng9e3Nob2VXICogMC42Mn1cbiAgICAgICAgICAgIHJ5PXtzaG9lVyAqIDAuMDd9XG4gICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICBzdHJva2U9e0MudGVhbEJyaWdodH1cbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsyICogdX1cbiAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheT17YCR7c2hvZVcgKiAwLjl9ICR7c2hvZVcgKiAwLjR9YH1cbiAgICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ9ey1oYWxvICogc2hvZVcgKiAwLjA1fVxuICAgICAgICAgICAgb3BhY2l0eT17MC41NX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxlbGxpcHNlIGN4PXtjeH0gY3k9e2dyb3VuZFl9IHJ4PXtzaG9lVyAqIDAuNX0gcnk9e3Nob2VXICogMC4wNX0gZmlsbD17Qy50ZWFsfSBvcGFjaXR5PXswLjEyfSAvPlxuICAgICAgICA8L3N2Zz5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogc2hvZUxlZnQsXG4gICAgICAgICAgICB0b3A6IHNob2VUb3AgKyBmbG9hdCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIGRyb3ApICogLTgwICogdX1weCkgcm90YXRlKCR7dGlsdH1kZWcpYCxcbiAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzUwJSA5MCUnLFxuICAgICAgICAgICAgZmlsdGVyOiBgZHJvcC1zaGFkb3coMCAkezMwICogdX1weCAkezQwICogdX1weCByZ2JhKDAsMCwwLDAuNTUpKWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxTaG9lIGlkPVwiY3RhXCIgd2lkdGg9e3Nob2VXfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQWJzb2x1dGVGaWxsPlxuXG4gICAgICA8VmlnbmV0dGUgc3RyZW5ndGg9ezAuNn0gLz5cblxuICAgICAgey8qIFdvcmRtYXJrICovfVxuICAgICAgPGRpdiBzdHlsZT17eyAuLi50ZXh0Qm94LCB0b3A6IHdtVG9wLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxOCAqIHUgfX0+XG4gICAgICAgIDxMb2dvTWFyayBzaXplPXt3bVNpemUgKiAwLjg1fSAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cIndvcmRtYXJrXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRTaXplOiB3bVNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA5MDAsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdpdGFsaWMnLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogYCR7d21Mc31lbWAsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogYC0ke3dtTHN9ZW1gLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiBDLnBhcGVyLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIEtFU1RSRUxcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEhlYWRsaW5lICovfVxuICAgICAgPGRpdiBzdHlsZT17eyAuLi50ZXh0Qm94LCB0b3A6IGhUb3AgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiaGVhZGxpbmVcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgZm9udFNpemU6IGhTaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogODAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjA0ZW0nLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMS4wNSxcbiAgICAgICAgICAgIGNvbG9yOiBDLnBhcGVyLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvcGFjaXR5OiBoLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gaCkgKiA0MCAqIHV9cHgpYCxcbiAgICAgICAgICAgIGZpbHRlcjogYGJsdXIoJHsoMSAtIGgpICogOCAqIHV9cHgpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IGAwICR7NiAqIHV9cHggJHszMCAqIHV9cHggcmdiYSgwLDAsMCwwLjU1KWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIE91dCAyOCBOb3ZlbWJlclxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQnV0dG9uICovfVxuICAgICAgPGRpdiBzdHlsZT17eyAuLi50ZXh0Qm94LCB0b3A6IGJUb3AgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiYnV0dG9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRTaXplOiBiU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wMWVtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIGNvbG9yOiBDLmluayxcbiAgICAgICAgICAgIHBhZGRpbmc6IGAkezI4ICogdX1weCAkezU2ICogdX1weGAsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDk5OSxcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudCgxMDVkZWcsIHRyYW5zcGFyZW50ICR7c2hlZW4gLSAyMH0lLCByZ2JhKDI1NSwyNTUsMjU1LDAuNDUpICR7c2hlZW59JSwgdHJhbnNwYXJlbnQgJHtzaGVlbiArIDIwfSUpLCBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAke0Mub3JhbmdlTGlnaHR9LCAke0Mub3JhbmdlfSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAkezE2ICogdX1weCAkezQwICogdX1weCByZ2JhKDI0OSwxMTUsMjIsJHswLjMgKyBwdWxzZSAqIDAuMn0pLCAwIDAgMCAkeygyICsgcHVsc2UgKiA2KSAqIHV9cHggcmdiYSgyNDksMTE1LDIyLCR7MC4zNSAtIHB1bHNlICogMC4yNX0pLCBpbnNldCAwICR7LTMgKiB1fXB4IDAgcmdiYSgxMjQsNDUsMTgsMC4zNSlgLFxuICAgICAgICAgICAgb3BhY2l0eTogYm8sXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGBzY2FsZSgke2JzfSlgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBsYXlvdXQgPT09ICdsYW5kc2NhcGUnID8gJzAlIDUwJScgOiAnNTAlIDUwJScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIEdldCBlYXJseSBhY2Nlc3NcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIFx1MjUwMFx1MjUwMCBDb21wb3NpdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDAgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlkZW8oKSB7XG4gIGNvbnN0IFtzMSwgczIsIHMzXSA9IGNvbXBvc2l0aW9uLnNob3RzO1xuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnIzAzMDUwZCcsIGZvbnRGYW1pbHk6IEZPTlQgfX0+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czEuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czEuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czEudGl0bGV9PlxuICAgICAgICA8U2hvdEhlcm8gLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czIuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czIuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czIudGl0bGV9PlxuICAgICAgICA8U2hvdERldGFpbCAvPlxuICAgICAgPC9TZXF1ZW5jZT5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMy5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMy5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPXtzMy50aXRsZX0+XG4gICAgICAgIDxTaG90Q1RBIC8+XG4gICAgICA8L1NlcXVlbmNlPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixVQUFVO0FBQUE7QUFBQTs7O0FDQXZEO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsbUJBQW1CO0FBQUE7QUFBQTs7O0FDQ2hFLHNCQVFPO0FBNkVDO0FBdEVELElBQU0sY0FBYztBQUFBLEVBQ3pCLEtBQUs7QUFBQSxFQUNMLGtCQUFrQjtBQUFBLEVBQ2xCLE9BQU87QUFBQSxJQUNMLEVBQUUsR0FBRyxHQUFHLE9BQU8sZ0JBQWdCLE1BQU0sR0FBRyxrQkFBa0IsR0FBRztBQUFBLElBQzdELEVBQUUsR0FBRyxHQUFHLE9BQU8sVUFBVSxNQUFNLElBQUksa0JBQWtCLElBQUk7QUFBQSxJQUN6RCxFQUFFLEdBQUcsR0FBRyxPQUFPLGtCQUFrQixNQUFNLEtBQUssa0JBQWtCLElBQUk7QUFBQSxFQUNwRTtBQUNGO0FBRUEsSUFBTSxJQUFJO0FBQUEsRUFDUixNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixhQUFhO0FBQUEsRUFDYixZQUFZO0FBQUEsRUFDWixhQUFhO0FBQUEsRUFDYixLQUFLO0FBQUEsRUFDTCxPQUFPO0FBQ1Q7QUFFQSxJQUFNLE9BQU87QUFDYixJQUFNLFdBQVcsdUJBQU8sT0FBTyxNQUFNLEdBQUcs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
