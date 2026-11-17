var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// dailies-dep:react
var require_react = __commonJS({
  "dailies-dep:react"(exports, module) {
    module.exports = globalThis.__DAILIES_DEPS__["react"];
  }
});

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

// workspaces/kestrel-runner-launch-spot-477c/versions/v3/Video.tsx
var import_react = __toESM(require_react(), 1);
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
var FONT = 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
var INK = "#f8fafc";
var TEAL = "#14b8a6";
var ORANGE = "#f97316";
var EXPO = import_remotion.Easing.bezier(0.16, 1, 0.3, 1);
var SOFT = import_remotion.Easing.bezier(0.45, 0, 0.55, 1);
var ease = (f, a, b, from = 0, to = 1, e = EXPO) => (0, import_remotion.interpolate)(f, [a, b], [from, to], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: e
});
var rnd = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
var mod = (a, m) => (a % m + m) % m;
var useLayout = () => {
  const { width: W, height: H, fps } = (0, import_remotion.useVideoConfig)();
  const r = H / W;
  const aspect = r > 1.3 ? "portrait" : r > 0.85 ? "square" : "landscape";
  const u = Math.min(W, H) / 1080;
  const pick = (l, p, s) => aspect === "landscape" ? l : aspect === "portrait" ? p : s;
  return { W, H, fps, aspect, u, pick };
};
var SHOE_RATIO = 300 / 640;
var UPPER = "M 40 166 C 30 120 36 72 62 52 C 82 38 108 42 122 60 C 140 84 178 92 212 84 C 232 62 258 46 282 50 C 300 54 306 76 314 96 C 400 118 512 138 596 168 C 626 180 638 194 620 194 C 520 204 420 206 330 202 C 220 198 120 184 40 166 Z";
var MIDSOLE = "M 30 160 C 24 196 28 226 46 238 L 598 238 C 624 236 640 220 640 204 C 640 194 634 190 620 192 C 520 204 420 206 330 202 C 220 198 120 182 30 160 Z";
var OUTSOLE = "M 40 232 C 42 254 62 266 92 266 L 560 266 C 600 266 626 250 636 222 C 628 232 614 238 598 238 L 46 238 Z";
var HEEL = "M 40 166 C 30 120 36 72 62 52 C 72 90 84 140 120 180 C 90 176 62 172 40 166 Z";
var TOE = "M 520 146 C 560 156 600 168 616 180 C 630 188 632 194 620 194 C 590 198 556 200 528 200 C 516 184 512 164 520 146 Z";
var WING = "M 140 168 C 210 128 300 108 420 120 C 470 125 500 134 520 146 C 450 132 360 132 280 150 C 230 160 190 172 160 186 Z";
var WING2 = "M 182 178 C 262 152 352 144 462 152 C 382 154 302 164 222 186 Z";
var Shoe = ({
  id,
  width,
  sheen = -1,
  shadow = true
}) => {
  const laces = [0, 1, 2, 3, 4].map((i) => {
    const x = 332 + i * 36;
    const y = 96 + 0.243 * (x - 314);
    return { x, y };
  });
  const sx = -120 + sheen * 880;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      width,
      height: width * SHOE_RATIO,
      viewBox: "0 0 640 300",
      style: { overflow: "visible", display: "block" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}up`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#5eead4" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.45", stopColor: "#14b8a6" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#0f5f59" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}mid`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#fed7aa" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.25", stopColor: "#fb923c" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.75", stopColor: "#f97316" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#c2410c" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}out`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#ea580c" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#7c2d12" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}hl`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#ffffff", stopOpacity: "0.45" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.35", stopColor: "#ffffff", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}sh`, x1: "0", y1: "0", x2: "1", y2: "0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#fff", stopOpacity: "0" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.5", stopColor: "#fff", stopOpacity: "0.55" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#fff", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: `${id}mesh`, width: "6", height: "6", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "3", cy: "3", r: "1.15", fill: "#042f2e", opacity: "0.35" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("clipPath", { id: `${id}sole`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: MIDSOLE }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: OUTSOLE })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", { id: `${id}blur`, x: "-20%", y: "-200%", width: "140%", height: "500%", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "9" }) })
        ] }),
        shadow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "335", cy: "276", rx: "300", ry: "13", fill: "#000", opacity: "0.65", filter: `url(#${id}blur)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: UPPER, fill: `url(#${id}up)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: UPPER, fill: `url(#${id}mesh)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: HEEL, fill: "#0f766e" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: TOE, fill: "#0f766e", opacity: "0.85" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: TOE, fill: `url(#${id}mesh)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 122 60 C 140 84 178 92 212 84 C 196 98 150 98 122 60 Z", fill: "#042f2e" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M 212 84 C 232 62 258 46 282 50 C 290 52 296 60 300 72 C 280 66 250 72 230 92 Z",
            fill: "#2dd4bf"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 56 56 C 48 40 54 24 68 22 L 82 24 C 84 34 80 44 76 50 Z", fill: ORANGE }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: WING, fill: ORANGE }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: WING2, fill: "#fdba74" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: UPPER, fill: `url(#${id}hl)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M 306 92 C 380 112 450 126 512 142",
            stroke: "#134e4a",
            strokeWidth: "18",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        laces.map(({ x, y }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: x - 15, y1: y + 9, x2: x + 13, y2: y - 4, stroke: "#f8fafc", strokeWidth: "6", strokeLinecap: "round" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: x - 15, cy: y + 12, r: "2.6", fill: "#0b3b38" })
        ] }, i)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: MIDSOLE, fill: `url(#${id}mid)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { opacity: "0.35", stroke: "#fff7ed", strokeWidth: "1.6", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 60 212 C 200 220 400 222 600 214" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 52 226 C 200 232 400 233 610 226", opacity: "0.6" })
        ] }),
        [0, 1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 70 + i * 34, y: 200 + i * 1.5, width: "24", height: "24", rx: "9", fill: "#c2410c", opacity: "0.55" }, i)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: OUTSOLE, fill: `url(#${id}out)` }),
        Array.from({ length: 19 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 84 + i * 25, y: "258", width: "13", height: "7", rx: "2", fill: "#431407", opacity: "0.7" }, i)),
        sheen >= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { clipPath: `url(#${id}sole)`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: sx, y: "140", width: "120", height: "140", fill: `url(#${id}sh)`, transform: `skewX(-20)` }) })
      ]
    }
  );
};
var LAYERS = [
  { base: 0.3, vary: 0.26, color: "#111c3a", speed: 0.25, win: 0.45 },
  { base: 0.18, vary: 0.24, color: "#0a1229", speed: 0.6, win: 0.7 },
  { base: 0.08, vary: 0.16, color: "#04070f", speed: 1.3, win: 0.9 }
];
var City = ({
  id,
  dim = 0,
  blur = 0,
  drift = 1
}) => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { W, H, u, aspect } = useLayout();
  const gy = H * (aspect === "portrait" ? 0.64 : 0.8);
  const layers = LAYERS.map((L, li) => {
    const out = [];
    let x = -60 * u;
    let i = 0;
    while (x < W * 1.5) {
      const w = (54 + rnd(li * 997 + i) * 120) * u * (1 + li * 0.35);
      const h = gy * (L.base + rnd(li * 557 + i * 3 + 1) * L.vary);
      out.push({ x, w, h, r: rnd(li * 31 + i * 7 + 2) });
      x += w + 3 * u;
      i++;
    }
    return out;
  });
  const trails = Array.from({ length: 9 }).map((_, k) => {
    const dir = k % 2 ? 1 : -1;
    const speed = (10 + rnd(k + 40) * 14) * u * dir * drift;
    const w = W * (0.12 + rnd(k + 60) * 0.2);
    const span = W * 1.6;
    const x = mod(rnd(k + 80) * span + f * speed, span) - W * 0.3;
    const y = gy + (H - gy) * (0.08 + k / 9 * 0.5);
    return { x, y, w, warm: dir > 0, k };
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { "data-layer": "background", style: { filter: blur ? `blur(${blur}px)` : void 0 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: "block" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}sky`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#02040a" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.55", stopColor: "#0a1430" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.8", stopColor: "#1b2147" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#2a1f3d" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `${id}haze`, cx: "0.5", cy: "1", r: "0.7", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#f97316", stopOpacity: "0.32" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#f97316", stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `${id}moon`, cx: "0.5", cy: "0.5", r: "0.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#99f6e4", stopOpacity: "0.5" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#99f6e4", stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}ground`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#0c1226" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#010205" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}fog`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#2dd4bf", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.5", stopColor: "#2dd4bf", stopOpacity: "0.12" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#2dd4bf", stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}tw`, x1: "0", y1: "0", x2: "1", y2: "0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#fb923c", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.85", stopColor: "#fb923c", stopOpacity: "0.9" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#fff7ed", stopOpacity: "1" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}tc`, x1: "1", y1: "0", x2: "0", y2: "0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#5eead4", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.85", stopColor: "#99f6e4", stopOpacity: "0.8" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#ffffff", stopOpacity: "1" })
        ] }),
        LAYERS.map((L, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.default.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: `${id}w${li}`, width: 16 * u, height: 22 * u, patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 4 * u, y: 6 * u, width: 7 * u, height: 10 * u, fill: "#fbbf24", opacity: 0.16 * L.win }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", { id: `${id}l${li}`, width: 48 * u, height: 66 * u, patternUnits: "userSpaceOnUse", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 4 * u, y: 6 * u, width: 7 * u, height: 10 * u, fill: "#fde68a", opacity: 0.85 * L.win }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 36 * u, y: 50 * u, width: 7 * u, height: 10 * u, fill: "#5eead4", opacity: 0.6 * L.win }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 20 * u, y: 28 * u, width: 7 * u, height: 10 * u, fill: "#fed7aa", opacity: 0.5 * L.win })
          ] })
        ] }, li))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: W, height: H, fill: `url(#${id}sky)` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: W * 0.8, cy: H * 0.16, r: 260 * u, fill: `url(#${id}moon)` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: W * 0.8, cy: H * 0.16, r: 34 * u, fill: "#e6fffb", opacity: "0.85" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { y: gy - H * 0.45, width: W, height: H * 0.45, fill: `url(#${id}haze)` }),
      layers.map((bs, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `translate(${-f * LAYERS[li].speed * u * drift} 0)`, children: bs.map((b, bi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: b.x, y: gy - b.h, width: b.w, height: b.h + 2, fill: LAYERS[li].color }),
        b.r > 0.82 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            x: b.x + b.w * 0.45,
            y: gy - b.h - 40 * u,
            width: 3 * u,
            height: 40 * u,
            fill: LAYERS[li].color
          }
        ),
        b.r > 0.82 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "circle",
          {
            cx: b.x + b.w * 0.45 + 1.5 * u,
            cy: gy - b.h - 42 * u,
            r: 4 * u,
            fill: "#f87171",
            opacity: Math.floor((f + bi * 7) / 18) % 2 ? 0.95 : 0.25
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            x: b.x + 5 * u,
            y: gy - b.h + 10 * u,
            width: Math.max(0, b.w - 10 * u),
            height: Math.max(0, b.h - 10 * u),
            fill: `url(#${id}w${li})`
          }
        ),
        b.r > 0.3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            x: b.x + 5 * u,
            y: gy - b.h + 10 * u,
            width: Math.max(0, b.w - 10 * u),
            height: Math.max(0, b.h - 10 * u),
            fill: `url(#${id}l${li})`
          }
        )
      ] }, bi)) }, li)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { y: gy - 120 * u, width: W, height: 200 * u, fill: `url(#${id}fog)` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { y: gy, width: W, height: H - gy, fill: `url(#${id}ground)` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { y: gy, width: W, height: 2 * u, fill: "#2dd4bf", opacity: "0.35" }),
      trails.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "rect",
        {
          x: t.x,
          y: t.y,
          width: t.w,
          height: (2 + t.k % 3) * u,
          rx: 2 * u,
          fill: `url(#${id}${t.warm ? "tw" : "tc"})`,
          opacity: 0.75
        },
        t.k
      ))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { style: { background: "#02040a", opacity: dim } })
  ] });
};
var Vignette = ({ strength = 0.6 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  import_remotion.AbsoluteFill,
  {
    "data-layer": "vignette",
    style: {
      background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: "none"
    }
  }
);
var Shot1 = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { W, H, u, pick } = useLayout();
  const shoeW = pick(W * 0.54, W * 0.88, W * 0.78);
  const shoeH = shoeW * SHOE_RATIO;
  const cy = pick(H * 0.44, H * 0.36, H * 0.42);
  const enter = ease(f, 0, 22);
  const vel = enter - ease(f - 1, 0, 22);
  const startX = -(W / 2 + shoeW / 2 + 80 * u);
  const x = (1 - enter) * startX;
  const skew = Math.min(vel * 70, 16);
  const rot = (0, import_remotion.interpolate)(enter, [0, 1], [-7, 0]);
  const settle = ease(f, 18, 40);
  const bob = Math.sin((f - 22) / 14) * 5 * u * settle;
  const push = (0, import_remotion.interpolate)(f, [22, 90], [1, 1.045], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SOFT });
  const cap = ease(f, 6, 24);
  const box = ease(f, 2, 16);
  const capBottom = pick(H * 0.07, H * 0.38, H * 0.07);
  const capSize = pick(120, 110, 100) * pick(u, 1, u);
  const bar = ease(f, 12, 30);
  const glow = ease(f, 10, 40);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: "#02040a", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(City, { id: "s1", dim: 0.1 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: W / 2 - shoeW * 0.8,
          top: cy - shoeH * 1.1,
          width: shoeW * 1.6,
          height: shoeH * 2.2,
          background: "radial-gradient(ellipse at center, rgba(20,184,166,0.35) 0%, rgba(20,184,166,0) 62%)",
          opacity: glow
        }
      }
    ),
    [0.28, 0.44, 0.6, 0.74].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: W / 2 - shoeW / 2 + x - shoeW * (0.5 + i * 0.12),
          top: cy - shoeH / 2 + shoeH * p,
          width: shoeW * (0.6 + i * 0.12),
          height: (3 + i % 2 * 2) * u,
          borderRadius: 4 * u,
          background: `linear-gradient(90deg, rgba(45,212,191,0), ${i % 2 ? "rgba(251,146,60,0.9)" : "rgba(94,234,212,0.9)"})`,
          opacity: Math.min(1, vel * 12)
        }
      },
      i
    )),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "product",
        style: {
          position: "absolute",
          left: W / 2 - shoeW / 2 + x,
          top: cy - shoeH / 2,
          width: shoeW,
          height: shoeH,
          transform: `translateY(${bob}px) rotate(${rot}deg) skewX(${-skew}deg) scale(${push})`,
          transformOrigin: "50% 80%"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { id: "shoe1", width: shoeW, sheen: (0, import_remotion.interpolate)(f, [20, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          bottom: capBottom,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            style: {
              position: "relative",
              padding: `${0.14 * capSize}px ${0.42 * capSize}px ${0.18 * capSize}px`,
              borderRadius: 0.16 * capSize,
              background: "rgba(2,4,10,0.72)",
              backdropFilter: `blur(${18 * u}px)`,
              boxShadow: `0 ${18 * u}px ${60 * u}px rgba(0,0,0,0.55), inset 0 0 0 ${1.5 * u}px rgba(255,255,255,0.08)`,
              opacity: box,
              transform: `translateY(${(1 - box) * 24 * u}px) scale(${(0, import_remotion.interpolate)(box, [0, 1], [0.94, 1])})`,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  "data-layer": "caption",
                  style: {
                    fontFamily: FONT,
                    fontSize: capSize,
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    color: INK,
                    whiteSpace: "nowrap",
                    opacity: cap,
                    transform: `translateY(${(1 - cap) * 60}%)`
                  },
                  children: "Run the city"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  "data-layer": "accent",
                  style: {
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: `${bar * 100}%`,
                    height: 6 * u,
                    background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})`
                  }
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, { strength: 0.55 })
  ] });
};
var Shot2 = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { W, H, u, fps, aspect, pick } = useLayout();
  const shoeW = pick(W * 2.3, W * 3.4, W * 2.7);
  const s = shoeW / 640;
  const ax = W / 2;
  const ay = pick(H * 0.64, H * 0.7, H * 0.68);
  const cx = (0, import_remotion.interpolate)(f, [0, 120], [150, 300], { easing: SOFT });
  const zoomS = (0, import_remotion.spring)({ frame: f, fps, config: { damping: 200 }, durationInFrames: 40 });
  const zoom = (0, import_remotion.interpolate)(zoomS, [0, 1], [1.14, 1]);
  const sheen = (0, import_remotion.interpolate)(f, [8, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SOFT });
  const wm = ease(f, 14, 46);
  const wmSize = pick(150, Math.min(118, W * 0.11), 104 * u);
  const wmStyle = aspect === "landscape" ? { left: W * 0.07, top: H * 0.11 } : aspect === "portrait" ? { left: 0, right: 0, top: H * 0.17, display: "flex", justifyContent: "center" } : { left: W * 0.08, top: H * 0.08 };
  const tagIn = (0, import_remotion.spring)({ frame: f - 4, fps, config: { damping: 13, stiffness: 170, mass: 0.8 } });
  const tagOp = ease(f, 4, 12);
  const tagSize = pick(96, 100, 80 * u);
  const tagPos = aspect === "landscape" ? { right: W * 0.08, top: H * 0.3 } : aspect === "portrait" ? { left: 0, right: 0, top: H * 0.43, display: "flex", justifyContent: "center" } : { right: W * 0.08, top: H * 0.34 };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: "#02040a", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(City, { id: "s2", dim: 0.35, blur: 14 * u, drift: 0.6 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: "radial-gradient(ellipse at 70% 75%, rgba(249,115,22,0.28) 0%, rgba(249,115,22,0) 55%), radial-gradient(ellipse at 20% 30%, rgba(20,184,166,0.22) 0%, rgba(20,184,166,0) 50%)"
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", left: ax, top: ay }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "product",
        style: {
          transform: `rotate(-3deg) scale(${zoom}) translate(${-cx * s}px, ${-214 * s}px)`,
          transformOrigin: "0 0"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { id: "shoe2", width: shoeW, sheen, shadow: false })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: "linear-gradient(180deg, rgba(2,4,10,0.75) 0%, rgba(2,4,10,0) 45%)"
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", ...wmStyle }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "wordmark",
        style: {
          fontFamily: FONT,
          fontSize: wmSize,
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "0.2em",
          marginRight: aspect === "portrait" ? "-0.2em" : 0,
          lineHeight: 1,
          color: INK,
          whiteSpace: "nowrap",
          opacity: wm,
          filter: `blur(${(1 - wm) * 12}px)`,
          transform: `translateY(${(1 - wm) * 30 * u}px)`,
          clipPath: `inset(-20% ${(1 - wm) * 100}% -20% -5%)`,
          textShadow: "0 8px 50px rgba(0,0,0,0.6)"
        },
        children: "KESTREL"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", ...tagPos }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: tagSize * 0.28,
          padding: `${tagSize * 0.22}px ${tagSize * 0.42}px ${tagSize * 0.22}px ${tagSize * 0.62}px`,
          background: "linear-gradient(180deg, #fb923c 0%, #ea580c 100%)",
          clipPath: `polygon(${tagSize * 0.36}px 0, 100% 0, 100% 100%, ${tagSize * 0.36}px 100%, 0 50%)`,
          borderRadius: tagSize * 0.08,
          opacity: tagOp,
          transform: `scale(${(0, import_remotion.interpolate)(tagIn, [0, 1], [0.6, 1])}) rotate(${(0, import_remotion.interpolate)(tagIn, [0, 1], [-8, -2])}deg)`,
          transformOrigin: "0% 50%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                width: tagSize * 0.16,
                height: tagSize * 0.16,
                borderRadius: "50%",
                background: "#0b1220",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)"
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "price",
              style: {
                fontFamily: FONT,
                fontSize: tagSize,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#0b1220",
                whiteSpace: "nowrap",
                fontVariantNumeric: "tabular-nums"
              },
              children: "\u20AC149"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, { strength: 0.5 })
  ] });
};
var Shot3 = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { W, H, u, fps, aspect, pick } = useLayout();
  const shoeW = pick(W * 0.46, W * 0.72, W * 0.62);
  const shoeH = shoeW * SHOE_RATIO;
  const scx = pick(W * 0.71, W * 0.5, W * 0.5);
  const scy = pick(H * 0.5, H * 0.335, H * 0.37);
  const rise = (0, import_remotion.spring)({ frame: f, fps, config: { damping: 16, mass: 0.9 } });
  const float = Math.sin(f / 18) * 8 * u;
  const tilt = (0, import_remotion.interpolate)(rise, [0, 1], [-16, -6]) + Math.sin(f / 30) * 1.2;
  const head = ease(f, 8, 30);
  const btn = ease(f, 26, 48);
  const sheenT = f > 50 ? mod(f - 50, 60) / 60 : -1;
  const sx = sheenT < 0 ? -40 : (0, import_remotion.interpolate)(sheenT, [0, 1], [-30, 130]);
  const pulse = f > 48 ? 0.5 + 0.5 * Math.sin((f - 48) / 9) : 0;
  const wmSize = pick(68, 80, 60 * u);
  const headSize = pick(150, 100, 84 * u);
  const btnSize = pick(76, 72, 64 * u);
  const barInset = pick(W * 0.04, W * 0.05, W * 0.05);
  const barBottom = pick(H * 0.05, H * 0.37, H * 0.05);
  const open = ease(f, 26, 46);
  const colLeft = W * 0.07;
  const centered = aspect !== "landscape";
  const wmTop = pick(H * 0.13, H * 0.16, H * 0.07);
  const headTop = pick(H * 0.3, H * 0.455, H * 0.63);
  const block = (top) => centered ? { position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center" } : { position: "absolute", top, left: colLeft };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: "#02040a", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(City, { id: "s3", dim: 0.55, blur: 6 * u, drift: 0.4 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: scx - shoeW,
          top: scy - shoeW * 0.75,
          width: shoeW * 2,
          height: shoeW * 1.5,
          background: "radial-gradient(ellipse at center, rgba(20,184,166,0.38) 0%, rgba(20,184,166,0.08) 40%, rgba(20,184,166,0) 65%)",
          opacity: rise
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "svg",
      {
        width: shoeW * 1.3,
        height: shoeW * 0.42,
        style: {
          position: "absolute",
          left: scx - shoeW * 0.65,
          top: scy + shoeH * 0.18,
          overflow: "visible",
          opacity: rise * 0.9
        },
        viewBox: "0 0 100 32",
        preserveAspectRatio: "none",
        "data-layer": "ring",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "50", cy: "16", rx: "48", ry: "12", fill: "none", stroke: ORANGE, strokeWidth: "0.5", opacity: "0.7" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "ellipse",
            {
              cx: "50",
              cy: "16",
              rx: "48",
              ry: "12",
              fill: "none",
              stroke: "#fdba74",
              strokeWidth: "1",
              strokeDasharray: "30 270",
              strokeDashoffset: -f * 1.6
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "product",
        style: {
          position: "absolute",
          left: scx - shoeW / 2,
          top: scy - shoeH / 2,
          width: shoeW,
          height: shoeH,
          opacity: (0, import_remotion.interpolate)(rise, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${(1 - rise) * H * 0.25 + float}px) rotate(${tilt}deg) scale(${(0, import_remotion.interpolate)(rise, [0, 1], [0.86, 1])})`
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { id: "shoe3", width: shoeW, sheen: (0, import_remotion.interpolate)(f, [30, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: block(wmTop), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "wordmark",
        style: {
          fontFamily: FONT,
          fontSize: wmSize,
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "0.2em",
          marginRight: centered ? "-0.2em" : 0,
          lineHeight: 1,
          color: INK,
          whiteSpace: "nowrap"
        },
        children: "KESTREL"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: block(headTop), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflow: "hidden", paddingBottom: headSize * 0.12 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "headline",
        style: {
          fontFamily: FONT,
          fontSize: headSize,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          color: INK,
          maxWidth: pick(W * 0.46, W * 0.9, W * 0.9),
          textAlign: centered ? "center" : "left",
          whiteSpace: aspect === "landscape" ? "normal" : "nowrap",
          opacity: head,
          transform: `translateY(${(1 - head) * 100}%)`,
          textShadow: "0 8px 50px rgba(0,0,0,0.6)"
        },
        children: "Out 28 November"
      }
    ) }) }),
    aspect !== "portrait" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: H * 0.32,
          background: "linear-gradient(180deg, rgba(2,4,10,0) 0%, rgba(2,4,10,0.85) 100%)",
          opacity: btn
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: barInset,
          right: barInset,
          bottom: barBottom,
          opacity: btn,
          transform: `translateY(${(1 - btn) * 24 * u}px)`,
          clipPath: `inset(-40% ${(1 - open) * 30}% -40% ${(1 - open) * 30}% round ${btnSize * 0.5}px)`
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            "data-layer": "button",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              boxSizing: "border-box",
              fontFamily: FONT,
              fontSize: btnSize,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#0b1220",
              whiteSpace: "nowrap",
              padding: `${btnSize * 0.5}px ${btnSize * 0.6}px`,
              borderRadius: btnSize * 0.42,
              background: `linear-gradient(100deg, rgba(255,255,255,0) ${sx - 10}%, rgba(255,255,255,0.6) ${sx}%, rgba(255,255,255,0) ${sx + 10}%), linear-gradient(180deg, #fdba74 0%, ${ORANGE} 45%, #ea580c 100%)`,
              boxShadow: `0 ${16 * u}px ${50 * u}px rgba(249,115,22,${0.3 + pulse * 0.3}), inset 0 ${2 * u}px 0 rgba(255,255,255,0.55), inset 0 -${4 * u}px 0 rgba(124,45,18,0.35)`
            },
            children: "Get early access"
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, { strength: 0.5 })
  ] });
};
function Video() {
  const [s1, s2, s3] = composition.shots;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: "#02040a", fontFamily: FONT }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s1.from, durationInFrames: s1.durationInFrames, name: s1.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shot1, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s2.from, durationInFrames: s2.durationInFrames, name: s2.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shot2, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s3.from, durationInFrames: s3.durationInFrames, name: s3.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shot3, {}) })
  ] });
}
export {
  composition,
  Video as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVhY3QiLCAiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9rZXN0cmVsLXJ1bm5lci1sYXVuY2gtc3BvdC00NzdjL3ZlcnNpb25zL3YzL1ZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdFwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZW1vdGlvblwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdC9qc3gtcnVudGltZVwiXTsiLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBTZXF1ZW5jZSxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG5leHBvcnQgY29uc3QgY29tcG9zaXRpb24gPSB7XG4gIGZwczogMzAsXG4gIGR1cmF0aW9uSW5GcmFtZXM6IDM2MCxcbiAgc2hvdHM6IFtcbiAgICB7IG46IDEsIHRpdGxlOiAnUHJvZHVjdCBoZXJvJywgZnJvbTogMCwgZHVyYXRpb25JbkZyYW1lczogOTAgfSxcbiAgICB7IG46IDIsIHRpdGxlOiAnRGV0YWlsJywgZnJvbTogOTAsIGR1cmF0aW9uSW5GcmFtZXM6IDEyMCB9LFxuICAgIHsgbjogMywgdGl0bGU6ICdDYWxsIHRvIGFjdGlvbicsIGZyb206IDIxMCwgZHVyYXRpb25JbkZyYW1lczogMTUwIH0sXG4gIF0sXG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFRva2VucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGT05UID0gJ3VpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5jb25zdCBJTksgPSAnI2Y4ZmFmYyc7XG5jb25zdCBURUFMID0gJyMxNGI4YTYnO1xuY29uc3QgT1JBTkdFID0gJyNmOTczMTYnO1xuY29uc3QgRVhQTyA9IEVhc2luZy5iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbmNvbnN0IFNPRlQgPSBFYXNpbmcuYmV6aWVyKDAuNDUsIDAsIDAuNTUsIDEpO1xuXG5jb25zdCBlYXNlID0gKGY6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIGZyb20gPSAwLCB0byA9IDEsIGUgPSBFWFBPKSA9PlxuICBpbnRlcnBvbGF0ZShmLCBbYSwgYl0sIFtmcm9tLCB0b10sIHtcbiAgICBleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsXG4gICAgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJyxcbiAgICBlYXNpbmc6IGUsXG4gIH0pO1xuXG4vLyBEZXRlcm1pbmlzdGljIGhhc2ggaW4gWzAsIDEpOiBubyBNYXRoLnJhbmRvbSBhbnl3aGVyZS5cbmNvbnN0IHJuZCA9IChpOiBudW1iZXIpID0+IHtcbiAgY29uc3QgeCA9IE1hdGguc2luKGkgKiAxMjcuMSArIDMxMS43KSAqIDQzNzU4LjU0NTM7XG4gIHJldHVybiB4IC0gTWF0aC5mbG9vcih4KTtcbn07XG5jb25zdCBtb2QgPSAoYTogbnVtYmVyLCBtOiBudW1iZXIpID0+ICgoYSAlIG0pICsgbSkgJSBtO1xuXG50eXBlIEFzcGVjdCA9ICdsYW5kc2NhcGUnIHwgJ3BvcnRyYWl0JyB8ICdzcXVhcmUnO1xuY29uc3QgdXNlTGF5b3V0ID0gKCkgPT4ge1xuICBjb25zdCB7IHdpZHRoOiBXLCBoZWlnaHQ6IEgsIGZwcyB9ID0gdXNlVmlkZW9Db25maWcoKTtcbiAgY29uc3QgciA9IEggLyBXO1xuICBjb25zdCBhc3BlY3Q6IEFzcGVjdCA9IHIgPiAxLjMgPyAncG9ydHJhaXQnIDogciA+IDAuODUgPyAnc3F1YXJlJyA6ICdsYW5kc2NhcGUnO1xuICBjb25zdCB1ID0gTWF0aC5taW4oVywgSCkgLyAxMDgwO1xuICBjb25zdCBwaWNrID0gPFQsPihsOiBULCBwOiBULCBzOiBUKTogVCA9PiAoYXNwZWN0ID09PSAnbGFuZHNjYXBlJyA/IGwgOiBhc3BlY3QgPT09ICdwb3J0cmFpdCcgPyBwIDogcyk7XG4gIHJldHVybiB7IFcsIEgsIGZwcywgYXNwZWN0LCB1LCBwaWNrIH07XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob2UgXHUyMDE0IGRyYXduIGVudGlyZWx5IGluIFNWRywgdG9lIHBvaW50aW5nIHJpZ2h0ICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNIT0VfUkFUSU8gPSAzMDAgLyA2NDA7XG5jb25zdCBVUFBFUiA9XG4gICdNIDQwIDE2NiBDIDMwIDEyMCAzNiA3MiA2MiA1MiBDIDgyIDM4IDEwOCA0MiAxMjIgNjAgQyAxNDAgODQgMTc4IDkyIDIxMiA4NCBDIDIzMiA2MiAyNTggNDYgMjgyIDUwIEMgMzAwIDU0IDMwNiA3NiAzMTQgOTYgQyA0MDAgMTE4IDUxMiAxMzggNTk2IDE2OCBDIDYyNiAxODAgNjM4IDE5NCA2MjAgMTk0IEMgNTIwIDIwNCA0MjAgMjA2IDMzMCAyMDIgQyAyMjAgMTk4IDEyMCAxODQgNDAgMTY2IFonO1xuY29uc3QgTUlEU09MRSA9XG4gICdNIDMwIDE2MCBDIDI0IDE5NiAyOCAyMjYgNDYgMjM4IEwgNTk4IDIzOCBDIDYyNCAyMzYgNjQwIDIyMCA2NDAgMjA0IEMgNjQwIDE5NCA2MzQgMTkwIDYyMCAxOTIgQyA1MjAgMjA0IDQyMCAyMDYgMzMwIDIwMiBDIDIyMCAxOTggMTIwIDE4MiAzMCAxNjAgWic7XG5jb25zdCBPVVRTT0xFID1cbiAgJ00gNDAgMjMyIEMgNDIgMjU0IDYyIDI2NiA5MiAyNjYgTCA1NjAgMjY2IEMgNjAwIDI2NiA2MjYgMjUwIDYzNiAyMjIgQyA2MjggMjMyIDYxNCAyMzggNTk4IDIzOCBMIDQ2IDIzOCBaJztcbmNvbnN0IEhFRUwgPSAnTSA0MCAxNjYgQyAzMCAxMjAgMzYgNzIgNjIgNTIgQyA3MiA5MCA4NCAxNDAgMTIwIDE4MCBDIDkwIDE3NiA2MiAxNzIgNDAgMTY2IFonO1xuY29uc3QgVE9FID1cbiAgJ00gNTIwIDE0NiBDIDU2MCAxNTYgNjAwIDE2OCA2MTYgMTgwIEMgNjMwIDE4OCA2MzIgMTk0IDYyMCAxOTQgQyA1OTAgMTk4IDU1NiAyMDAgNTI4IDIwMCBDIDUxNiAxODQgNTEyIDE2NCA1MjAgMTQ2IFonO1xuY29uc3QgV0lORyA9XG4gICdNIDE0MCAxNjggQyAyMTAgMTI4IDMwMCAxMDggNDIwIDEyMCBDIDQ3MCAxMjUgNTAwIDEzNCA1MjAgMTQ2IEMgNDUwIDEzMiAzNjAgMTMyIDI4MCAxNTAgQyAyMzAgMTYwIDE5MCAxNzIgMTYwIDE4NiBaJztcbmNvbnN0IFdJTkcyID0gJ00gMTgyIDE3OCBDIDI2MiAxNTIgMzUyIDE0NCA0NjIgMTUyIEMgMzgyIDE1NCAzMDIgMTY0IDIyMiAxODYgWic7XG5cbmNvbnN0IFNob2U6IFJlYWN0LkZDPHsgaWQ6IHN0cmluZzsgd2lkdGg6IG51bWJlcjsgc2hlZW4/OiBudW1iZXI7IHNoYWRvdz86IGJvb2xlYW4gfT4gPSAoe1xuICBpZCxcbiAgd2lkdGgsXG4gIHNoZWVuID0gLTEsXG4gIHNoYWRvdyA9IHRydWUsXG59KSA9PiB7XG4gIGNvbnN0IGxhY2VzID0gWzAsIDEsIDIsIDMsIDRdLm1hcCgoaSkgPT4ge1xuICAgIGNvbnN0IHggPSAzMzIgKyBpICogMzY7XG4gICAgY29uc3QgeSA9IDk2ICsgMC4yNDMgKiAoeCAtIDMxNCk7XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xuICB9KTtcbiAgY29uc3Qgc3ggPSAtMTIwICsgc2hlZW4gKiA4ODA7XG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgaGVpZ2h0PXt3aWR0aCAqIFNIT0VfUkFUSU99XG4gICAgICB2aWV3Qm94PVwiMCAwIDY0MCAzMDBcIlxuICAgICAgc3R5bGU9e3sgb3ZlcmZsb3c6ICd2aXNpYmxlJywgZGlzcGxheTogJ2Jsb2NrJyB9fVxuICAgID5cbiAgICAgIDxkZWZzPlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXVwYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiM1ZWVhZDRcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuNDVcIiBzdG9wQ29sb3I9XCIjMTRiOGE2XCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzBmNWY1OVwiIC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9bWlkYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNmZWQ3YWFcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuMjVcIiBzdG9wQ29sb3I9XCIjZmI5MjNjXCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjc1XCIgc3RvcENvbG9yPVwiI2Y5NzMxNlwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNjMjQxMGNcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfW91dGB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZWE1ODBjXCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzdjMmQxMlwiIC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9aGxgfSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZmZmZmZlwiIHN0b3BPcGFjaXR5PVwiMC40NVwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC4zNVwiIHN0b3BDb2xvcj1cIiNmZmZmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXNoYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIwXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuNVwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjAuNTVcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZmZmXCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPHBhdHRlcm4gaWQ9e2Ake2lkfW1lc2hgfSB3aWR0aD1cIjZcIiBoZWlnaHQ9XCI2XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiM1wiIGN5PVwiM1wiIHI9XCIxLjE1XCIgZmlsbD1cIiMwNDJmMmVcIiBvcGFjaXR5PVwiMC4zNVwiIC8+XG4gICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgPGNsaXBQYXRoIGlkPXtgJHtpZH1zb2xlYH0+XG4gICAgICAgICAgPHBhdGggZD17TUlEU09MRX0gLz5cbiAgICAgICAgICA8cGF0aCBkPXtPVVRTT0xFfSAvPlxuICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICA8ZmlsdGVyIGlkPXtgJHtpZH1ibHVyYH0geD1cIi0yMCVcIiB5PVwiLTIwMCVcIiB3aWR0aD1cIjE0MCVcIiBoZWlnaHQ9XCI1MDAlXCI+XG4gICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjlcIiAvPlxuICAgICAgICA8L2ZpbHRlcj5cbiAgICAgIDwvZGVmcz5cblxuICAgICAge3NoYWRvdyAmJiAoXG4gICAgICAgIDxlbGxpcHNlIGN4PVwiMzM1XCIgY3k9XCIyNzZcIiByeD1cIjMwMFwiIHJ5PVwiMTNcIiBmaWxsPVwiIzAwMFwiIG9wYWNpdHk9XCIwLjY1XCIgZmlsdGVyPXtgdXJsKCMke2lkfWJsdXIpYH0gLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBVcHBlciAqL31cbiAgICAgIDxwYXRoIGQ9e1VQUEVSfSBmaWxsPXtgdXJsKCMke2lkfXVwKWB9IC8+XG4gICAgICA8cGF0aCBkPXtVUFBFUn0gZmlsbD17YHVybCgjJHtpZH1tZXNoKWB9IC8+XG4gICAgICA8cGF0aCBkPXtIRUVMfSBmaWxsPVwiIzBmNzY2ZVwiIC8+XG4gICAgICA8cGF0aCBkPXtUT0V9IGZpbGw9XCIjMGY3NjZlXCIgb3BhY2l0eT1cIjAuODVcIiAvPlxuICAgICAgPHBhdGggZD17VE9FfSBmaWxsPXtgdXJsKCMke2lkfW1lc2gpYH0gLz5cbiAgICAgIDxwYXRoIGQ9XCJNIDEyMiA2MCBDIDE0MCA4NCAxNzggOTIgMjEyIDg0IEMgMTk2IDk4IDE1MCA5OCAxMjIgNjAgWlwiIGZpbGw9XCIjMDQyZjJlXCIgLz5cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNIDIxMiA4NCBDIDIzMiA2MiAyNTggNDYgMjgyIDUwIEMgMjkwIDUyIDI5NiA2MCAzMDAgNzIgQyAyODAgNjYgMjUwIDcyIDIzMCA5MiBaXCJcbiAgICAgICAgZmlsbD1cIiMyZGQ0YmZcIlxuICAgICAgLz5cbiAgICAgIDxwYXRoIGQ9XCJNIDU2IDU2IEMgNDggNDAgNTQgMjQgNjggMjIgTCA4MiAyNCBDIDg0IDM0IDgwIDQ0IDc2IDUwIFpcIiBmaWxsPXtPUkFOR0V9IC8+XG4gICAgICA8cGF0aCBkPXtXSU5HfSBmaWxsPXtPUkFOR0V9IC8+XG4gICAgICA8cGF0aCBkPXtXSU5HMn0gZmlsbD1cIiNmZGJhNzRcIiAvPlxuICAgICAgPHBhdGggZD17VVBQRVJ9IGZpbGw9e2B1cmwoIyR7aWR9aGwpYH0gLz5cblxuICAgICAgey8qIExhY2luZyAqL31cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNIDMwNiA5MiBDIDM4MCAxMTIgNDUwIDEyNiA1MTIgMTQyXCJcbiAgICAgICAgc3Ryb2tlPVwiIzEzNGU0YVwiXG4gICAgICAgIHN0cm9rZVdpZHRoPVwiMThcIlxuICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAvPlxuICAgICAge2xhY2VzLm1hcCgoeyB4LCB5IH0sIGkpID0+IChcbiAgICAgICAgPGcga2V5PXtpfT5cbiAgICAgICAgICA8bGluZSB4MT17eCAtIDE1fSB5MT17eSArIDl9IHgyPXt4ICsgMTN9IHkyPXt5IC0gNH0gc3Ryb2tlPVwiI2Y4ZmFmY1wiIHN0cm9rZVdpZHRoPVwiNlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XG4gICAgICAgICAgPGNpcmNsZSBjeD17eCAtIDE1fSBjeT17eSArIDEyfSByPVwiMi42XCIgZmlsbD1cIiMwYjNiMzhcIiAvPlxuICAgICAgICA8L2c+XG4gICAgICApKX1cblxuICAgICAgey8qIE1pZHNvbGUgKyBvdXRzb2xlICovfVxuICAgICAgPHBhdGggZD17TUlEU09MRX0gZmlsbD17YHVybCgjJHtpZH1taWQpYH0gLz5cbiAgICAgIDxnIG9wYWNpdHk9XCIwLjM1XCIgc3Ryb2tlPVwiI2ZmZjdlZFwiIHN0cm9rZVdpZHRoPVwiMS42XCIgZmlsbD1cIm5vbmVcIj5cbiAgICAgICAgPHBhdGggZD1cIk0gNjAgMjEyIEMgMjAwIDIyMCA0MDAgMjIyIDYwMCAyMTRcIiAvPlxuICAgICAgICA8cGF0aCBkPVwiTSA1MiAyMjYgQyAyMDAgMjMyIDQwMCAyMzMgNjEwIDIyNlwiIG9wYWNpdHk9XCIwLjZcIiAvPlxuICAgICAgPC9nPlxuICAgICAge1swLCAxLCAyLCAzXS5tYXAoKGkpID0+IChcbiAgICAgICAgPHJlY3Qga2V5PXtpfSB4PXs3MCArIGkgKiAzNH0geT17MjAwICsgaSAqIDEuNX0gd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgcng9XCI5XCIgZmlsbD1cIiNjMjQxMGNcIiBvcGFjaXR5PVwiMC41NVwiIC8+XG4gICAgICApKX1cbiAgICAgIDxwYXRoIGQ9e09VVFNPTEV9IGZpbGw9e2B1cmwoIyR7aWR9b3V0KWB9IC8+XG4gICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMTkgfSkubWFwKChfLCBpKSA9PiAoXG4gICAgICAgIDxyZWN0IGtleT17aX0geD17ODQgKyBpICogMjV9IHk9XCIyNThcIiB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiN1wiIHJ4PVwiMlwiIGZpbGw9XCIjNDMxNDA3XCIgb3BhY2l0eT1cIjAuN1wiIC8+XG4gICAgICApKX1cbiAgICAgIHtzaGVlbiA+PSAwICYmIChcbiAgICAgICAgPGcgY2xpcFBhdGg9e2B1cmwoIyR7aWR9c29sZSlgfT5cbiAgICAgICAgICA8cmVjdCB4PXtzeH0geT1cIjE0MFwiIHdpZHRoPVwiMTIwXCIgaGVpZ2h0PVwiMTQwXCIgZmlsbD17YHVybCgjJHtpZH1zaClgfSB0cmFuc2Zvcm09e2Bza2V3WCgtMjApYH0gLz5cbiAgICAgICAgPC9nPlxuICAgICAgKX1cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTmlnaHQgY2l0eSBiYWNrZ3JvdW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IExBWUVSUyA9IFtcbiAgeyBiYXNlOiAwLjMsIHZhcnk6IDAuMjYsIGNvbG9yOiAnIzExMWMzYScsIHNwZWVkOiAwLjI1LCB3aW46IDAuNDUgfSxcbiAgeyBiYXNlOiAwLjE4LCB2YXJ5OiAwLjI0LCBjb2xvcjogJyMwYTEyMjknLCBzcGVlZDogMC42LCB3aW46IDAuNyB9LFxuICB7IGJhc2U6IDAuMDgsIHZhcnk6IDAuMTYsIGNvbG9yOiAnIzA0MDcwZicsIHNwZWVkOiAxLjMsIHdpbjogMC45IH0sXG5dO1xuXG5jb25zdCBDaXR5OiBSZWFjdC5GQzx7IGlkOiBzdHJpbmc7IGRpbT86IG51bWJlcjsgYmx1cj86IG51bWJlcjsgZHJpZnQ/OiBudW1iZXIgfT4gPSAoe1xuICBpZCxcbiAgZGltID0gMCxcbiAgYmx1ciA9IDAsXG4gIGRyaWZ0ID0gMSxcbn0pID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IFcsIEgsIHUsIGFzcGVjdCB9ID0gdXNlTGF5b3V0KCk7XG4gIGNvbnN0IGd5ID0gSCAqIChhc3BlY3QgPT09ICdwb3J0cmFpdCcgPyAwLjY0IDogMC44KTtcblxuICBjb25zdCBsYXllcnMgPSBMQVlFUlMubWFwKChMLCBsaSkgPT4ge1xuICAgIGNvbnN0IG91dDogeyB4OiBudW1iZXI7IHc6IG51bWJlcjsgaDogbnVtYmVyOyByOiBudW1iZXIgfVtdID0gW107XG4gICAgbGV0IHggPSAtNjAgKiB1O1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoeCA8IFcgKiAxLjUpIHtcbiAgICAgIGNvbnN0IHcgPSAoNTQgKyBybmQobGkgKiA5OTcgKyBpKSAqIDEyMCkgKiB1ICogKDEgKyBsaSAqIDAuMzUpO1xuICAgICAgY29uc3QgaCA9IGd5ICogKEwuYmFzZSArIHJuZChsaSAqIDU1NyArIGkgKiAzICsgMSkgKiBMLnZhcnkpO1xuICAgICAgb3V0LnB1c2goeyB4LCB3LCBoLCByOiBybmQobGkgKiAzMSArIGkgKiA3ICsgMikgfSk7XG4gICAgICB4ICs9IHcgKyAzICogdTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSk7XG5cbiAgY29uc3QgdHJhaWxzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOSB9KS5tYXAoKF8sIGspID0+IHtcbiAgICBjb25zdCBkaXIgPSBrICUgMiA/IDEgOiAtMTtcbiAgICBjb25zdCBzcGVlZCA9ICgxMCArIHJuZChrICsgNDApICogMTQpICogdSAqIGRpciAqIGRyaWZ0O1xuICAgIGNvbnN0IHcgPSBXICogKDAuMTIgKyBybmQoayArIDYwKSAqIDAuMik7XG4gICAgY29uc3Qgc3BhbiA9IFcgKiAxLjY7XG4gICAgY29uc3QgeCA9IG1vZChybmQoayArIDgwKSAqIHNwYW4gKyBmICogc3BlZWQsIHNwYW4pIC0gVyAqIDAuMztcbiAgICBjb25zdCB5ID0gZ3kgKyAoSCAtIGd5KSAqICgwLjA4ICsgKGsgLyA5KSAqIDAuNSk7XG4gICAgcmV0dXJuIHsgeCwgeSwgdywgd2FybTogZGlyID4gMCwgayB9O1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIiBzdHlsZT17eyBmaWx0ZXI6IGJsdXIgPyBgYmx1cigke2JsdXJ9cHgpYCA6IHVuZGVmaW5lZCB9fT5cbiAgICAgIDxzdmcgd2lkdGg9e1d9IGhlaWdodD17SH0gdmlld0JveD17YDAgMCAke1d9ICR7SH1gfSBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19PlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXNreWB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMwMjA0MGFcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41NVwiIHN0b3BDb2xvcj1cIiMwYTE0MzBcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC44XCIgc3RvcENvbG9yPVwiIzFiMjE0N1wiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzJhMWYzZFwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8cmFkaWFsR3JhZGllbnQgaWQ9e2Ake2lkfWhhemVgfSBjeD1cIjAuNVwiIGN5PVwiMVwiIHI9XCIwLjdcIj5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZjk3MzE2XCIgc3RvcE9wYWNpdHk9XCIwLjMyXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZjk3MzE2XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICA8L3JhZGlhbEdyYWRpZW50PlxuICAgICAgICAgIDxyYWRpYWxHcmFkaWVudCBpZD17YCR7aWR9bW9vbmB9IGN4PVwiMC41XCIgY3k9XCIwLjVcIiByPVwiMC41XCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiIzk5ZjZlNFwiIHN0b3BPcGFjaXR5PVwiMC41XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjOTlmNmU0XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICA8L3JhZGlhbEdyYWRpZW50PlxuICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9Z3JvdW5kYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiIzBjMTIyNlwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzAxMDIwNVwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfWZvZ2B9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMyZGQ0YmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41XCIgc3RvcENvbG9yPVwiIzJkZDRiZlwiIHN0b3BPcGFjaXR5PVwiMC4xMlwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzJkZDRiZlwiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXR3YH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIwXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZiOTIzY1wiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjg1XCIgc3RvcENvbG9yPVwiI2ZiOTIzY1wiIHN0b3BPcGFjaXR5PVwiMC45XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZmZmN2VkXCIgc3RvcE9wYWNpdHk9XCIxXCIgLz5cbiAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9dGNgfSB4MT1cIjFcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjBcIj5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjNWVlYWQ0XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuODVcIiBzdG9wQ29sb3I9XCIjOTlmNmU0XCIgc3RvcE9wYWNpdHk9XCIwLjhcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZmZmZmZcIiBzdG9wT3BhY2l0eT1cIjFcIiAvPlxuICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAge0xBWUVSUy5tYXAoKEwsIGxpKSA9PiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtsaX0+XG4gICAgICAgICAgICAgIDxwYXR0ZXJuIGlkPXtgJHtpZH13JHtsaX1gfSB3aWR0aD17MTYgKiB1fSBoZWlnaHQ9ezIyICogdX0gcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PXs0ICogdX0geT17NiAqIHV9IHdpZHRoPXs3ICogdX0gaGVpZ2h0PXsxMCAqIHV9IGZpbGw9XCIjZmJiZjI0XCIgb3BhY2l0eT17MC4xNiAqIEwud2lufSAvPlxuICAgICAgICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgICAgICAgIDxwYXR0ZXJuIGlkPXtgJHtpZH1sJHtsaX1gfSB3aWR0aD17NDggKiB1fSBoZWlnaHQ9ezY2ICogdX0gcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PXs0ICogdX0geT17NiAqIHV9IHdpZHRoPXs3ICogdX0gaGVpZ2h0PXsxMCAqIHV9IGZpbGw9XCIjZmRlNjhhXCIgb3BhY2l0eT17MC44NSAqIEwud2lufSAvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9ezM2ICogdX0geT17NTAgKiB1fSB3aWR0aD17NyAqIHV9IGhlaWdodD17MTAgKiB1fSBmaWxsPVwiIzVlZWFkNFwiIG9wYWNpdHk9ezAuNiAqIEwud2lufSAvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9ezIwICogdX0geT17MjggKiB1fSB3aWR0aD17NyAqIHV9IGhlaWdodD17MTAgKiB1fSBmaWxsPVwiI2ZlZDdhYVwiIG9wYWNpdHk9ezAuNSAqIEwud2lufSAvPlxuICAgICAgICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2RlZnM+XG5cbiAgICAgICAgPHJlY3Qgd2lkdGg9e1d9IGhlaWdodD17SH0gZmlsbD17YHVybCgjJHtpZH1za3kpYH0gLz5cbiAgICAgICAgPGNpcmNsZSBjeD17VyAqIDAuOH0gY3k9e0ggKiAwLjE2fSByPXsyNjAgKiB1fSBmaWxsPXtgdXJsKCMke2lkfW1vb24pYH0gLz5cbiAgICAgICAgPGNpcmNsZSBjeD17VyAqIDAuOH0gY3k9e0ggKiAwLjE2fSByPXszNCAqIHV9IGZpbGw9XCIjZTZmZmZiXCIgb3BhY2l0eT1cIjAuODVcIiAvPlxuICAgICAgICA8cmVjdCB5PXtneSAtIEggKiAwLjQ1fSB3aWR0aD17V30gaGVpZ2h0PXtIICogMC40NX0gZmlsbD17YHVybCgjJHtpZH1oYXplKWB9IC8+XG5cbiAgICAgICAge2xheWVycy5tYXAoKGJzLCBsaSkgPT4gKFxuICAgICAgICAgIDxnIGtleT17bGl9IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgkey1mICogTEFZRVJTW2xpXS5zcGVlZCAqIHUgKiBkcmlmdH0gMClgfT5cbiAgICAgICAgICAgIHticy5tYXAoKGIsIGJpKSA9PiAoXG4gICAgICAgICAgICAgIDxnIGtleT17Yml9PlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9e2IueH0geT17Z3kgLSBiLmh9IHdpZHRoPXtiLnd9IGhlaWdodD17Yi5oICsgMn0gZmlsbD17TEFZRVJTW2xpXS5jb2xvcn0gLz5cbiAgICAgICAgICAgICAgICB7Yi5yID4gMC44MiAmJiAoXG4gICAgICAgICAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAgICAgICAgICB4PXtiLnggKyBiLncgKiAwLjQ1fVxuICAgICAgICAgICAgICAgICAgICB5PXtneSAtIGIuaCAtIDQwICogdX1cbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezMgKiB1fVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezQwICogdX1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD17TEFZRVJTW2xpXS5jb2xvcn1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7Yi5yID4gMC44MiAmJiAoXG4gICAgICAgICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgICAgICAgIGN4PXtiLnggKyBiLncgKiAwLjQ1ICsgMS41ICogdX1cbiAgICAgICAgICAgICAgICAgICAgY3k9e2d5IC0gYi5oIC0gNDIgKiB1fVxuICAgICAgICAgICAgICAgICAgICByPXs0ICogdX1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cIiNmODcxNzFcIlxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5PXtNYXRoLmZsb29yKChmICsgYmkgKiA3KSAvIDE4KSAlIDIgPyAwLjk1IDogMC4yNX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAgICAgICAgeD17Yi54ICsgNSAqIHV9XG4gICAgICAgICAgICAgICAgICB5PXtneSAtIGIuaCArIDEwICogdX1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPXtNYXRoLm1heCgwLCBiLncgLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXRoLm1heCgwLCBiLmggLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgZmlsbD17YHVybCgjJHtpZH13JHtsaX0pYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtiLnIgPiAwLjMgJiYgKFxuICAgICAgICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgICAgICAgeD17Yi54ICsgNSAqIHV9XG4gICAgICAgICAgICAgICAgICAgIHk9e2d5IC0gYi5oICsgMTAgKiB1fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17TWF0aC5tYXgoMCwgYi53IC0gMTAgKiB1KX1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXRoLm1heCgwLCBiLmggLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgICBmaWxsPXtgdXJsKCMke2lkfWwke2xpfSlgfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2c+XG4gICAgICAgICkpfVxuXG4gICAgICAgIDxyZWN0IHk9e2d5IC0gMTIwICogdX0gd2lkdGg9e1d9IGhlaWdodD17MjAwICogdX0gZmlsbD17YHVybCgjJHtpZH1mb2cpYH0gLz5cbiAgICAgICAgPHJlY3QgeT17Z3l9IHdpZHRoPXtXfSBoZWlnaHQ9e0ggLSBneX0gZmlsbD17YHVybCgjJHtpZH1ncm91bmQpYH0gLz5cbiAgICAgICAgPHJlY3QgeT17Z3l9IHdpZHRoPXtXfSBoZWlnaHQ9ezIgKiB1fSBmaWxsPVwiIzJkZDRiZlwiIG9wYWNpdHk9XCIwLjM1XCIgLz5cbiAgICAgICAge3RyYWlscy5tYXAoKHQpID0+IChcbiAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAga2V5PXt0Lmt9XG4gICAgICAgICAgICB4PXt0Lnh9XG4gICAgICAgICAgICB5PXt0Lnl9XG4gICAgICAgICAgICB3aWR0aD17dC53fVxuICAgICAgICAgICAgaGVpZ2h0PXsoMiArICh0LmsgJSAzKSkgKiB1fVxuICAgICAgICAgICAgcng9ezIgKiB1fVxuICAgICAgICAgICAgZmlsbD17YHVybCgjJHtpZH0ke3Qud2FybSA/ICd0dycgOiAndGMnfSlgfVxuICAgICAgICAgICAgb3BhY2l0eT17MC43NX1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvc3ZnPlxuICAgICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnIzAyMDQwYScsIG9wYWNpdHk6IGRpbSB9fSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuY29uc3QgVmlnbmV0dGU6IFJlYWN0LkZDPHsgc3RyZW5ndGg/OiBudW1iZXIgfT4gPSAoeyBzdHJlbmd0aCA9IDAuNiB9KSA9PiAoXG4gIDxBYnNvbHV0ZUZpbGxcbiAgICBkYXRhLWxheWVyPVwidmlnbmV0dGVcIlxuICAgIHN0eWxlPXt7XG4gICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgNTAlIDQ1JSwgcmdiYSgwLDAsMCwwKSA0NSUsIHJnYmEoMCwwLDAsJHtzdHJlbmd0aH0pIDEwMCUpYCxcbiAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICB9fVxuICAvPlxuKTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBTaG90IDEgXHUyMDE0IFByb2R1Y3QgaGVybyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNob3QxOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IFcsIEgsIHUsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMC41NCwgVyAqIDAuODgsIFcgKiAwLjc4KTtcbiAgY29uc3Qgc2hvZUggPSBzaG9lVyAqIFNIT0VfUkFUSU87XG4gIGNvbnN0IGN5ID0gcGljayhIICogMC40NCwgSCAqIDAuMzYsIEggKiAwLjQyKTtcblxuICAvLyBTbGlkZSBpbiBmcm9tIHRoZSBsZWZ0LCBmdWxseSBsYW5kZWQgYnkgZnJhbWUgMjIgKDwgMDowMSkuXG4gIGNvbnN0IGVudGVyID0gZWFzZShmLCAwLCAyMik7XG4gIGNvbnN0IHZlbCA9IGVudGVyIC0gZWFzZShmIC0gMSwgMCwgMjIpO1xuICBjb25zdCBzdGFydFggPSAtKFcgLyAyICsgc2hvZVcgLyAyICsgODAgKiB1KTtcbiAgY29uc3QgeCA9ICgxIC0gZW50ZXIpICogc3RhcnRYO1xuICBjb25zdCBza2V3ID0gTWF0aC5taW4odmVsICogNzAsIDE2KTtcbiAgY29uc3Qgcm90ID0gaW50ZXJwb2xhdGUoZW50ZXIsIFswLCAxXSwgWy03LCAwXSk7XG4gIGNvbnN0IHNldHRsZSA9IGVhc2UoZiwgMTgsIDQwKTtcbiAgY29uc3QgYm9iID0gTWF0aC5zaW4oKGYgLSAyMikgLyAxNCkgKiA1ICogdSAqIHNldHRsZTtcbiAgY29uc3QgcHVzaCA9IGludGVycG9sYXRlKGYsIFsyMiwgOTBdLCBbMSwgMS4wNDVdLCB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJywgZWFzaW5nOiBTT0ZUIH0pO1xuXG4gIC8vIENhcHRpb24sIGZ1bGx5IHZpc2libGUgYnkgZnJhbWUgMjQuXG4gIGNvbnN0IGNhcCA9IGVhc2UoZiwgNiwgMjQpO1xuICAvLyBMb3dlci10aGlyZCBzdWJ0aXRsZSwgZnVsbHkgdmlzaWJsZSBieSBmcmFtZSAyNC5cbiAgY29uc3QgYm94ID0gZWFzZShmLCAyLCAxNik7XG4gIGNvbnN0IGNhcEJvdHRvbSA9IHBpY2soSCAqIDAuMDcsIEggKiAwLjM4LCBIICogMC4wNyk7XG4gIGNvbnN0IGNhcFNpemUgPSBwaWNrKDEyMCwgMTEwLCAxMDApICogcGljayh1LCAxLCB1KTtcbiAgY29uc3QgYmFyID0gZWFzZShmLCAxMiwgMzApO1xuXG4gIGNvbnN0IGdsb3cgPSBlYXNlKGYsIDEwLCA0MCk7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjMDIwNDBhJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgPENpdHkgaWQ9XCJzMVwiIGRpbT17MC4xfSAvPlxuICAgICAgey8qIHRlYWwgc3BvdGxpZ2h0IGJlaGluZCBwcm9kdWN0ICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IFcgLyAyIC0gc2hvZVcgKiAwLjgsXG4gICAgICAgICAgdG9wOiBjeSAtIHNob2VIICogMS4xLFxuICAgICAgICAgIHdpZHRoOiBzaG9lVyAqIDEuNixcbiAgICAgICAgICBoZWlnaHQ6IHNob2VIICogMi4yLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICdyYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCBjZW50ZXIsIHJnYmEoMjAsMTg0LDE2NiwwLjM1KSAwJSwgcmdiYSgyMCwxODQsMTY2LDApIDYyJSknLFxuICAgICAgICAgIG9wYWNpdHk6IGdsb3csXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHNwZWVkIHN0cmVha3MgKi99XG4gICAgICB7WzAuMjgsIDAuNDQsIDAuNiwgMC43NF0ubWFwKChwLCBpKSA9PiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogVyAvIDIgLSBzaG9lVyAvIDIgKyB4IC0gc2hvZVcgKiAoMC41ICsgaSAqIDAuMTIpLFxuICAgICAgICAgICAgdG9wOiBjeSAtIHNob2VIIC8gMiArIHNob2VIICogcCxcbiAgICAgICAgICAgIHdpZHRoOiBzaG9lVyAqICgwLjYgKyBpICogMC4xMiksXG4gICAgICAgICAgICBoZWlnaHQ6ICgzICsgKGkgJSAyKSAqIDIpICogdSxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogNCAqIHUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCByZ2JhKDQ1LDIxMiwxOTEsMCksICR7aSAlIDIgPyAncmdiYSgyNTEsMTQ2LDYwLDAuOSknIDogJ3JnYmEoOTQsMjM0LDIxMiwwLjkpJ30pYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IE1hdGgubWluKDEsIHZlbCAqIDEyKSxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtbGF5ZXI9XCJwcm9kdWN0XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBXIC8gMiAtIHNob2VXIC8gMiArIHgsXG4gICAgICAgICAgdG9wOiBjeSAtIHNob2VIIC8gMixcbiAgICAgICAgICB3aWR0aDogc2hvZVcsXG4gICAgICAgICAgaGVpZ2h0OiBzaG9lSCxcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7Ym9ifXB4KSByb3RhdGUoJHtyb3R9ZGVnKSBza2V3WCgkey1za2V3fWRlZykgc2NhbGUoJHtwdXNofSlgLFxuICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzUwJSA4MCUnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8U2hvZSBpZD1cInNob2UxXCIgd2lkdGg9e3Nob2VXfSBzaGVlbj17aW50ZXJwb2xhdGUoZiwgWzIwLCA3MF0sIFswLCAxXSwgeyBleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsIGV4dHJhcG9sYXRlUmlnaHQ6ICdjbGFtcCcgfSl9IC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIExvd2VyLXRoaXJkIHN1YnRpdGxlLiBPbiA5OjE2IGl0IHNpdHMgYXMgbG93IGFzIHRoZSBkZWxpdmVyeSBydWxlcyBhbGxvd1xuICAgICAgICAgIChpdHMgYm90dG9tIGVkZ2Ugc3RheXMgYWJvdmUgdGhlIGJvdHRvbS0zNSUgbm8tdGV4dCB6b25lKS4gKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgYm90dG9tOiBjYXBCb3R0b20sXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgcGFkZGluZzogYCR7MC4xNCAqIGNhcFNpemV9cHggJHswLjQyICogY2FwU2l6ZX1weCAkezAuMTggKiBjYXBTaXplfXB4YCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMC4xNiAqIGNhcFNpemUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyLDQsMTAsMC43MiknLFxuICAgICAgICAgICAgYmFja2Ryb3BGaWx0ZXI6IGBibHVyKCR7MTggKiB1fXB4KWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwICR7MTggKiB1fXB4ICR7NjAgKiB1fXB4IHJnYmEoMCwwLDAsMC41NSksIGluc2V0IDAgMCAwICR7MS41ICogdX1weCByZ2JhKDI1NSwyNTUsMjU1LDAuMDgpYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IGJveCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIGJveCkgKiAyNCAqIHV9cHgpIHNjYWxlKCR7aW50ZXJwb2xhdGUoYm94LCBbMCwgMV0sIFswLjk0LCAxXSl9KWAsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGRhdGEtbGF5ZXI9XCJjYXB0aW9uXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBjYXBTaXplLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA5MDAsXG4gICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wM2VtJyxcbiAgICAgICAgICAgICAgbGluZUhlaWdodDogMS4wNSxcbiAgICAgICAgICAgICAgY29sb3I6IElOSyxcbiAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICAgIG9wYWNpdHk6IGNhcCxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gY2FwKSAqIDYwfSUpYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgUnVuIHRoZSBjaXR5XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZGF0YS1sYXllcj1cImFjY2VudFwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7YmFyICogMTAwfSVgLFxuICAgICAgICAgICAgICBoZWlnaHQ6IDYgKiB1LFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAke1RFQUx9LCAke09SQU5HRX0pYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxWaWduZXR0ZSBzdHJlbmd0aD17MC41NX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAyIFx1MjAxNCBEZXRhaWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdDI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgVywgSCwgdSwgZnBzLCBhc3BlY3QsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIC8vIE1hY3JvIGNsb3NlLXVwIG9mIHRoZSBzb2xlLCBzbG93IHRyYWNraW5nIG1vdmUgYWxvbmcgdGhlIGhlZWwuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMi4zLCBXICogMy40LCBXICogMi43KTtcbiAgY29uc3QgcyA9IHNob2VXIC8gNjQwO1xuICBjb25zdCBheCA9IFcgLyAyO1xuICBjb25zdCBheSA9IHBpY2soSCAqIDAuNjQsIEggKiAwLjcsIEggKiAwLjY4KTtcbiAgY29uc3QgY3ggPSBpbnRlcnBvbGF0ZShmLCBbMCwgMTIwXSwgWzE1MCwgMzAwXSwgeyBlYXNpbmc6IFNPRlQgfSk7XG4gIGNvbnN0IHpvb21TID0gc3ByaW5nKHsgZnJhbWU6IGYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDIwMCB9LCBkdXJhdGlvbkluRnJhbWVzOiA0MCB9KTtcbiAgY29uc3Qgem9vbSA9IGludGVycG9sYXRlKHpvb21TLCBbMCwgMV0sIFsxLjE0LCAxXSk7XG4gIGNvbnN0IHNoZWVuID0gaW50ZXJwb2xhdGUoZiwgWzgsIDkwXSwgWzAsIDFdLCB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJywgZWFzaW5nOiBTT0ZUIH0pO1xuXG4gIC8vIFdvcmRtYXJrOiBhYnNlbnQgYXQgMDowMywgZnVsbHkgdmlzaWJsZSBieSAwOjA0LjUuXG4gIGNvbnN0IHdtID0gZWFzZShmLCAxNCwgNDYpO1xuICBjb25zdCB3bVNpemUgPSBwaWNrKDE1MCwgTWF0aC5taW4oMTE4LCBXICogMC4xMSksIDEwNCAqIHUpO1xuICBjb25zdCB3bVN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID1cbiAgICBhc3BlY3QgPT09ICdsYW5kc2NhcGUnXG4gICAgICA/IHsgbGVmdDogVyAqIDAuMDcsIHRvcDogSCAqIDAuMTEgfVxuICAgICAgOiBhc3BlY3QgPT09ICdwb3J0cmFpdCdcbiAgICAgICAgPyB7IGxlZnQ6IDAsIHJpZ2h0OiAwLCB0b3A6IEggKiAwLjE3LCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9XG4gICAgICAgIDogeyBsZWZ0OiBXICogMC4wOCwgdG9wOiBIICogMC4wOCB9O1xuXG4gIC8vIFByaWNlIHRhZzogaW4gZnJvbSAwOjAzLjEsIGhlbGQgdG8gdGhlIGN1dC5cbiAgY29uc3QgdGFnSW4gPSBzcHJpbmcoeyBmcmFtZTogZiAtIDQsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDEzLCBzdGlmZm5lc3M6IDE3MCwgbWFzczogMC44IH0gfSk7XG4gIGNvbnN0IHRhZ09wID0gZWFzZShmLCA0LCAxMik7XG4gIGNvbnN0IHRhZ1NpemUgPSBwaWNrKDk2LCAxMDAsIDgwICogdSk7XG4gIGNvbnN0IHRhZ1BvczogUmVhY3QuQ1NTUHJvcGVydGllcyA9XG4gICAgYXNwZWN0ID09PSAnbGFuZHNjYXBlJ1xuICAgICAgPyB7IHJpZ2h0OiBXICogMC4wOCwgdG9wOiBIICogMC4zIH1cbiAgICAgIDogYXNwZWN0ID09PSAncG9ydHJhaXQnXG4gICAgICAgID8geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiBIICogMC40MywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfVxuICAgICAgICA6IHsgcmlnaHQ6IFcgKiAwLjA4LCB0b3A6IEggKiAwLjM0IH07XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjMDIwNDBhJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgPENpdHkgaWQ9XCJzMlwiIGRpbT17MC4zNX0gYmx1cj17MTQgKiB1fSBkcmlmdD17MC42fSAvPlxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAncmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgNzAlIDc1JSwgcmdiYSgyNDksMTE1LDIyLDAuMjgpIDAlLCByZ2JhKDI0OSwxMTUsMjIsMCkgNTUlKSwgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgMjAlIDMwJSwgcmdiYSgyMCwxODQsMTY2LDAuMjIpIDAlLCByZ2JhKDIwLDE4NCwxNjYsMCkgNTAlKScsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogYXgsIHRvcDogYXkgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHJvdGF0ZSgtM2RlZykgc2NhbGUoJHt6b29tfSkgdHJhbnNsYXRlKCR7LWN4ICogc31weCwgJHstMjE0ICogc31weClgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCAwJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFNob2UgaWQ9XCJzaG9lMlwiIHdpZHRoPXtzaG9lV30gc2hlZW49e3NoZWVufSBzaGFkb3c9e2ZhbHNlfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgey8qIGxlZ2liaWxpdHkgZ3JhZGllbnQgYXQgdGhlIHRvcCAqL31cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyLDQsMTAsMC43NSkgMCUsIHJnYmEoMiw0LDEwLDApIDQ1JSknLFxuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgLi4ud21TdHlsZSB9fT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJ3b3JkbWFya1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250U2l6ZTogd21TaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogOTAwLFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjJlbScsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogYXNwZWN0ID09PSAncG9ydHJhaXQnID8gJy0wLjJlbScgOiAwLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiBJTkssXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IHdtLFxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigkeygxIC0gd20pICogMTJ9cHgpYCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIHdtKSAqIDMwICogdX1weClgLFxuICAgICAgICAgICAgY2xpcFBhdGg6IGBpbnNldCgtMjAlICR7KDEgLSB3bSkgKiAxMDB9JSAtMjAlIC01JSlgLFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogJzAgOHB4IDUwcHggcmdiYSgwLDAsMCwwLjYpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgS0VTVFJFTFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAuLi50YWdQb3MgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBnYXA6IHRhZ1NpemUgKiAwLjI4LFxuICAgICAgICAgICAgcGFkZGluZzogYCR7dGFnU2l6ZSAqIDAuMjJ9cHggJHt0YWdTaXplICogMC40Mn1weCAke3RhZ1NpemUgKiAwLjIyfXB4ICR7dGFnU2l6ZSAqIDAuNjJ9cHhgLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsICNmYjkyM2MgMCUsICNlYTU4MGMgMTAwJSknLFxuICAgICAgICAgICAgY2xpcFBhdGg6IGBwb2x5Z29uKCR7dGFnU2l6ZSAqIDAuMzZ9cHggMCwgMTAwJSAwLCAxMDAlIDEwMCUsICR7dGFnU2l6ZSAqIDAuMzZ9cHggMTAwJSwgMCA1MCUpYCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGFnU2l6ZSAqIDAuMDgsXG4gICAgICAgICAgICBvcGFjaXR5OiB0YWdPcCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7aW50ZXJwb2xhdGUodGFnSW4sIFswLCAxXSwgWzAuNiwgMV0pfSkgcm90YXRlKCR7aW50ZXJwb2xhdGUodGFnSW4sIFswLCAxXSwgWy04LCAtMl0pfWRlZylgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCUgNTAlJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMjBweCA2MHB4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHdpZHRoOiB0YWdTaXplICogMC4xNixcbiAgICAgICAgICAgICAgaGVpZ2h0OiB0YWdTaXplICogMC4xNixcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMwYjEyMjAnLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6ICdpbnNldCAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjYpJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkYXRhLWxheWVyPVwicHJpY2VcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgICAgZm9udFNpemU6IHRhZ1NpemUsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAzZW0nLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgICBjb2xvcjogJyMwYjEyMjAnLFxuICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgZm9udFZhcmlhbnROdW1lcmljOiAndGFidWxhci1udW1zJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgXHUyMEFDMTQ5XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8VmlnbmV0dGUgc3RyZW5ndGg9ezAuNX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAzIFx1MjAxNCBDYWxsIHRvIGFjdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdDM6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgVywgSCwgdSwgZnBzLCBhc3BlY3QsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMC40NiwgVyAqIDAuNzIsIFcgKiAwLjYyKTtcbiAgY29uc3Qgc2hvZUggPSBzaG9lVyAqIFNIT0VfUkFUSU87XG4gIGNvbnN0IHNjeCA9IHBpY2soVyAqIDAuNzEsIFcgKiAwLjUsIFcgKiAwLjUpO1xuICBjb25zdCBzY3kgPSBwaWNrKEggKiAwLjUsIEggKiAwLjMzNSwgSCAqIDAuMzcpO1xuICBjb25zdCByaXNlID0gc3ByaW5nKHsgZnJhbWU6IGYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDE2LCBtYXNzOiAwLjkgfSB9KTtcbiAgY29uc3QgZmxvYXQgPSBNYXRoLnNpbihmIC8gMTgpICogOCAqIHU7XG4gIGNvbnN0IHRpbHQgPSBpbnRlcnBvbGF0ZShyaXNlLCBbMCwgMV0sIFstMTYsIC02XSkgKyBNYXRoLnNpbihmIC8gMzApICogMS4yO1xuXG4gIGNvbnN0IGhlYWQgPSBlYXNlKGYsIDgsIDMwKTtcbiAgY29uc3QgYnRuID0gZWFzZShmLCAyNiwgNDgpO1xuICBjb25zdCBzaGVlblQgPSBmID4gNTAgPyBtb2QoZiAtIDUwLCA2MCkgLyA2MCA6IC0xO1xuICBjb25zdCBzeCA9IHNoZWVuVCA8IDAgPyAtNDAgOiBpbnRlcnBvbGF0ZShzaGVlblQsIFswLCAxXSwgWy0zMCwgMTMwXSk7XG4gIGNvbnN0IHB1bHNlID0gZiA+IDQ4ID8gMC41ICsgMC41ICogTWF0aC5zaW4oKGYgLSA0OCkgLyA5KSA6IDA7XG5cbiAgY29uc3Qgd21TaXplID0gcGljayg2OCwgODAsIDYwICogdSk7XG4gIGNvbnN0IGhlYWRTaXplID0gcGljaygxNTAsIDEwMCwgODQgKiB1KTtcbiAgY29uc3QgYnRuU2l6ZSA9IHBpY2soNzYsIDcyLCA2NCAqIHUpO1xuICAvLyBGdWxsLXdpZHRoIGluc3RhbGwgYmFyLiAxNjo5IGFuZCAxOjEgcGluIGl0IHRvIHRoZSBib3R0b20gZWRnZTsgb24gOToxNiB0aGVcbiAgLy8gc3Rvcnlib2FyZCBmb3JiaWRzIHRleHQgaW4gdGhlIGJvdHRvbSAzNSUsIHNvIGl0IHBpbnMgdG8gdGhhdCBsaW5lIGluc3RlYWQuXG4gIGNvbnN0IGJhckluc2V0ID0gcGljayhXICogMC4wNCwgVyAqIDAuMDUsIFcgKiAwLjA1KTtcbiAgY29uc3QgYmFyQm90dG9tID0gcGljayhIICogMC4wNSwgSCAqIDAuMzcsIEggKiAwLjA1KTtcbiAgY29uc3Qgb3BlbiA9IGVhc2UoZiwgMjYsIDQ2KTtcblxuICBjb25zdCBjb2xMZWZ0ID0gVyAqIDAuMDc7XG4gIGNvbnN0IGNlbnRlcmVkID0gYXNwZWN0ICE9PSAnbGFuZHNjYXBlJztcbiAgY29uc3Qgd21Ub3AgPSBwaWNrKEggKiAwLjEzLCBIICogMC4xNiwgSCAqIDAuMDcpO1xuICBjb25zdCBoZWFkVG9wID0gcGljayhIICogMC4zLCBIICogMC40NTUsIEggKiAwLjYzKTtcblxuICBjb25zdCBibG9jayA9ICh0b3A6IG51bWJlcik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT5cbiAgICBjZW50ZXJlZFxuICAgICAgPyB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3AsIGxlZnQ6IDAsIHJpZ2h0OiAwLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9XG4gICAgICA6IHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcCwgbGVmdDogY29sTGVmdCB9O1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnIzAyMDQwYScsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgIDxDaXR5IGlkPVwiczNcIiBkaW09ezAuNTV9IGJsdXI9ezYgKiB1fSBkcmlmdD17MC40fSAvPlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IHNjeCAtIHNob2VXLFxuICAgICAgICAgIHRvcDogc2N5IC0gc2hvZVcgKiAwLjc1LFxuICAgICAgICAgIHdpZHRoOiBzaG9lVyAqIDIsXG4gICAgICAgICAgaGVpZ2h0OiBzaG9lVyAqIDEuNSxcbiAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IGNlbnRlciwgcmdiYSgyMCwxODQsMTY2LDAuMzgpIDAlLCByZ2JhKDIwLDE4NCwxNjYsMC4wOCkgNDAlLCByZ2JhKDIwLDE4NCwxNjYsMCkgNjUlKScsXG4gICAgICAgICAgb3BhY2l0eTogcmlzZSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICB7Lyogb3JiaXQgcmluZyAqL31cbiAgICAgIDxzdmdcbiAgICAgICAgd2lkdGg9e3Nob2VXICogMS4zfVxuICAgICAgICBoZWlnaHQ9e3Nob2VXICogMC40Mn1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBzY3ggLSBzaG9lVyAqIDAuNjUsXG4gICAgICAgICAgdG9wOiBzY3kgKyBzaG9lSCAqIDAuMTgsXG4gICAgICAgICAgb3ZlcmZsb3c6ICd2aXNpYmxlJyxcbiAgICAgICAgICBvcGFjaXR5OiByaXNlICogMC45LFxuICAgICAgICB9fVxuICAgICAgICB2aWV3Qm94PVwiMCAwIDEwMCAzMlwiXG4gICAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCJcbiAgICAgICAgZGF0YS1sYXllcj1cInJpbmdcIlxuICAgICAgPlxuICAgICAgICA8ZWxsaXBzZSBjeD1cIjUwXCIgY3k9XCIxNlwiIHJ4PVwiNDhcIiByeT1cIjEyXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9e09SQU5HRX0gc3Ryb2tlV2lkdGg9XCIwLjVcIiBvcGFjaXR5PVwiMC43XCIgLz5cbiAgICAgICAgPGVsbGlwc2VcbiAgICAgICAgICBjeD1cIjUwXCJcbiAgICAgICAgICBjeT1cIjE2XCJcbiAgICAgICAgICByeD1cIjQ4XCJcbiAgICAgICAgICByeT1cIjEyXCJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgc3Ryb2tlPVwiI2ZkYmE3NFwiXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxXCJcbiAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9XCIzMCAyNzBcIlxuICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ9ey1mICogMS42fVxuICAgICAgICAvPlxuICAgICAgPC9zdmc+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtbGF5ZXI9XCJwcm9kdWN0XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBzY3ggLSBzaG9lVyAvIDIsXG4gICAgICAgICAgdG9wOiBzY3kgLSBzaG9lSCAvIDIsXG4gICAgICAgICAgd2lkdGg6IHNob2VXLFxuICAgICAgICAgIGhlaWdodDogc2hvZUgsXG4gICAgICAgICAgb3BhY2l0eTogaW50ZXJwb2xhdGUocmlzZSwgWzAsIDAuNF0sIFswLCAxXSwgeyBleHRyYXBvbGF0ZVJpZ2h0OiAnY2xhbXAnIH0pLFxuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIHJpc2UpICogSCAqIDAuMjUgKyBmbG9hdH1weCkgcm90YXRlKCR7dGlsdH1kZWcpIHNjYWxlKCR7aW50ZXJwb2xhdGUocmlzZSwgWzAsIDFdLCBbMC44NiwgMV0pfSlgLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8U2hvZSBpZD1cInNob2UzXCIgd2lkdGg9e3Nob2VXfSBzaGVlbj17aW50ZXJwb2xhdGUoZiwgWzMwLCAxMTBdLCBbMCwgMV0sIHsgZXh0cmFwb2xhdGVMZWZ0OiAnY2xhbXAnLCBleHRyYXBvbGF0ZVJpZ2h0OiAnY2xhbXAnIH0pfSAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBXb3JkbWFyayBcdTIwMTQgb24gc2NyZWVuIGZvciB0aGUgd2hvbGUgc2hvdCAqL31cbiAgICAgIDxkaXYgc3R5bGU9e2Jsb2NrKHdtVG9wKX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwid29yZG1hcmtcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgZm9udFNpemU6IHdtU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDkwMCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ2l0YWxpYycsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnMC4yZW0nLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IGNlbnRlcmVkID8gJy0wLjJlbScgOiAwLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiBJTkssXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgS0VTVFJFTFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSGVhZGxpbmUgKi99XG4gICAgICA8ZGl2IHN0eWxlPXtibG9jayhoZWFkVG9wKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nQm90dG9tOiBoZWFkU2l6ZSAqIDAuMTIgfX0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZGF0YS1sYXllcj1cImhlYWRsaW5lXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBoZWFkU2l6ZSxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogODAwLFxuICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDRlbScsXG4gICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDAuOTUsXG4gICAgICAgICAgICAgIGNvbG9yOiBJTkssXG4gICAgICAgICAgICAgIG1heFdpZHRoOiBwaWNrKFcgKiAwLjQ2LCBXICogMC45LCBXICogMC45KSxcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiBjZW50ZXJlZCA/ICdjZW50ZXInIDogJ2xlZnQnLFxuICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiBhc3BlY3QgPT09ICdsYW5kc2NhcGUnID8gJ25vcm1hbCcgOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgb3BhY2l0eTogaGVhZCxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gaGVhZCkgKiAxMDB9JSlgLFxuICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnMCA4cHggNTBweCByZ2JhKDAsMCwwLDAuNiknLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBPdXQgMjggTm92ZW1iZXJcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEluc3RhbGwtYmFyIENUQSBcdTIwMTQgZnVsbCB3aWR0aCwgZnVsbHkgdmlzaWJsZSBieSAwOjA4LjYgKi99XG4gICAgICB7YXNwZWN0ICE9PSAncG9ydHJhaXQnICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIGhlaWdodDogSCAqIDAuMzIsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyLDQsMTAsMCkgMCUsIHJnYmEoMiw0LDEwLDAuODUpIDEwMCUpJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IGJ0bixcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBiYXJJbnNldCxcbiAgICAgICAgICByaWdodDogYmFySW5zZXQsXG4gICAgICAgICAgYm90dG9tOiBiYXJCb3R0b20sXG4gICAgICAgICAgb3BhY2l0eTogYnRuLFxuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIGJ0bikgKiAyNCAqIHV9cHgpYCxcbiAgICAgICAgICBjbGlwUGF0aDogYGluc2V0KC00MCUgJHsoMSAtIG9wZW4pICogMzB9JSAtNDAlICR7KDEgLSBvcGVuKSAqIDMwfSUgcm91bmQgJHtidG5TaXplICogMC41fXB4KWAsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiYnV0dG9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgZm9udFNpemU6IGJ0blNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA5MDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDJlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgY29sb3I6ICcjMGIxMjIwJyxcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgcGFkZGluZzogYCR7YnRuU2l6ZSAqIDAuNX1weCAke2J0blNpemUgKiAwLjZ9cHhgLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBidG5TaXplICogMC40MixcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTAwZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDApICR7c3ggLSAxMH0lLCByZ2JhKDI1NSwyNTUsMjU1LDAuNikgJHtzeH0lLCByZ2JhKDI1NSwyNTUsMjU1LDApICR7c3ggKyAxMH0lKSwgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZkYmE3NCAwJSwgJHtPUkFOR0V9IDQ1JSwgI2VhNTgwYyAxMDAlKWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwICR7MTYgKiB1fXB4ICR7NTAgKiB1fXB4IHJnYmEoMjQ5LDExNSwyMiwkezAuMyArIHB1bHNlICogMC4zfSksIGluc2V0IDAgJHsyICogdX1weCAwIHJnYmEoMjU1LDI1NSwyNTUsMC41NSksIGluc2V0IDAgLSR7NCAqIHV9cHggMCByZ2JhKDEyNCw0NSwxOCwwLjM1KWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIEdldCBlYXJseSBhY2Nlc3NcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxWaWduZXR0ZSBzdHJlbmd0aD17MC41fSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFZpZGVvKCkge1xuICBjb25zdCBbczEsIHMyLCBzM10gPSBjb21wb3NpdGlvbi5zaG90cztcbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjMDIwNDBhJywgZm9udEZhbWlseTogRk9OVCB9fT5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMS5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMS5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPXtzMS50aXRsZX0+XG4gICAgICAgIDxTaG90MSAvPlxuICAgICAgPC9TZXF1ZW5jZT5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMi5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMi5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPXtzMi50aXRsZX0+XG4gICAgICAgIDxTaG90MiAvPlxuICAgICAgPC9TZXF1ZW5jZT5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMy5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMy5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPXtzMy50aXRsZX0+XG4gICAgICAgIDxTaG90MyAvPlxuICAgICAgPC9TZXF1ZW5jZT5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsT0FBTztBQUFBO0FBQUE7OztBQ0FwRDtBQUFBO0FBQUEsV0FBTyxVQUFVLFdBQVcsaUJBQWlCLFVBQVU7QUFBQTtBQUFBOzs7QUNBdkQ7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixtQkFBbUI7QUFBQTtBQUFBOzs7QUNBaEUsbUJBQWtCO0FBQ2xCLHNCQVFPO0FBcUZDO0FBbkZELElBQU0sY0FBYztBQUFBLEVBQ3pCLEtBQUs7QUFBQSxFQUNMLGtCQUFrQjtBQUFBLEVBQ2xCLE9BQU87QUFBQSxJQUNMLEVB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TSxRQUFRLEtBQUssSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLElBQUk7QUFDL0MsUUFBTSxRQUFRLFFBQVE7QUFDdEIsUUFBTSxNQUFNLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLEdBQUc7QUFDM0MsUUFBTSxNQUFNLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTyxJQUFJLElBQUk7QUFDN0MsUUFBTSxXQUFPLHdCQUFPLEVBQUUsT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFLFNBQVMsSUFBSSxNQUFNLElBQUksRUFBRSxDQUFDO0FBQ3pFLFFBQU0sUUFBUSxLQUFLLElBQUksSUFBSSxFQUFFLElBQUksSUFBSTtBQUNyQyxRQUFNLFdBQU8sNkJBQVksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFLElBQUk7QUFFdkUsUUFBTSxPQUFPLEtBQUssR0FBRyxHQUFHLEVBQUU7QUFDMUIsUUFBTSxNQUFNLEtBQUssR0FBRyxJQUFJLEVBQUU7QUFDMUIsUUFBTSxTQUFTLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxFQUFFLElBQUksS0FBSztBQUMvQyxRQUFNLEtBQUssU0FBUyxJQUFJLFVBQU0sNkJBQVksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUM7QUFDcEUsUUFBTSxRQUFRLElBQUksS0FBSyxNQUFNLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDLElBQUk7QUFFNUQsUUFBTSxTQUFTLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQztBQUNsQyxRQUFNLFdBQVcsS0FBSyxLQUFLLEtBQUssS0FBSyxDQUFDO0FBQ3RDLFFBQU0sVUFBVSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUM7QUFHbkMsUUFBTSxXQUFXLEtBQUssSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLElBQUk7QUFDbEQsUUFBTSxZQUFZLEtBQUssSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLElBQUk7QUFDbkQsUUFB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UUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFVBQ1QsV0FBVyxlQUFlLElBQUksT0FBTyxLQUFLLENBQUM7QUFBQSxVQUMzQyxVQUFVLGVBQWUsSUFBSSxRQUFRLEVBQUUsV0FBVyxJQUFJLFFBQVEsRUFBRSxXQUFXLFVBQVUsR0FBRztBQUFBLFFBQzFGO0FBQUEsUUFFQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsY0FBVztBQUFBLFlBQ1gsT0FBTztBQUFBLGNBQ0wsU0FBUztBQUFBLGNBQ1QsWUFBWTtBQUFBLGNBQ1osZ0JBQWdCO0FBQUEsY0FDaEIsT0FBTztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGNBQ1osVUFBVTtBQUFBLGNBQ1YsWUFBWTtBQUFBLGNBQ1osZUFBZTtBQUFBLGNBQ2YsWUFBWTtBQUFBLGNBQ1osT0FBTztBQUFBLGNBQ1AsWUFBWTtBQUFBLGNBQ1osU0FBUyxHQUFHLFVBQVUsR0FBRyxNQUFNLFVBQVUsR0FBRztBQUFBLGNBQzVDLGNBQWMsVUFBVTtBQUFBLGNBQ3hCLFlBQVksK0NBQStDLEtBQUssRUFBRSw0QkFBNEIsRUFBRSwwQkFBMEIsS0FBSyxFQUFFLDJDQUEyQyxNQUFNO0FBQUEsY0FDbEwsV0FBVyxLQUFLLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsTUFBTSxRQUFRLEdBQUcsY0FBYyxJQUFJLENBQUMseUNBQXlDLElBQUksQ0FBQztBQUFBLFlBQzVJO0FBQUEsWUFDRDtBQUFBO0FBQUEsUUFFRDtBQUFBO0FBQUEsSUFDRjtBQUFBLElBQ0EsNENBQUMsWUFBUyxVQUFVLEtBQUs7QUFBQSxLQUMzQjtBQUVKO0FBSWUsU0FBUixRQUF5QjtBQUM5QixRQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxZQUFZO0FBQ2pDLFNBQ0UsNkNBQUMsZ0NBQWEsT0FBTyxFQUFFLFlBQVksV0FBVyxZQUFZLEtBQUssR0FDN0Q7QUFBQSxnREFBQyw0QkFBUyxNQUFNLEdBQUcsTUFBTSxrQkFBa0IsR0FBRyxrQkFBa0IsTUFBTSxHQUFHLE9BQ3ZFLHNEQUFDLFNBQU0sR0FDVDtBQUFBLElBQ0EsNENBQUMsNEJBQVMsTUFBTSxHQUFHLE1BQU0sa0JBQWtCLEdBQUcsa0JBQWtCLE1BQU0sR0FBRyxPQUN2RSxzREFBQyxTQUFNLEdBQ1Q7QUFBQSxJQUNBLDRDQUFDLDRCQUFTLE1BQU0sR0FBRyxNQUFNLGtCQUFrQixHQUFHLGtCQUFrQixNQUFNLEdBQUcsT0FDdkUsc0RBQUMsU0FBTSxHQUNUO0FBQUEsS0FDRjtBQUVKOyIsCiAgIm5hbWVzIjogWyJSZWFjdCJdCn0K
