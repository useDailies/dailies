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

// workspaces/kestrel-runner-launch-spot-477c/versions/v1/Video.tsx
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
  const capTop = pick(H * 0.76, H * 0.5, H * 0.74);
  const capSize = pick(112, 110, 96) * pick(u, 1, u);
  const bar = ease(f, 16, 36);
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "absolute",
          top: capTop,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflow: "hidden", padding: `0 ${0.1 * capSize}px ${0.14 * capSize}px` }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "caption",
              style: {
                fontFamily: FONT,
                fontSize: capSize,
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                color: INK,
                whiteSpace: "nowrap",
                opacity: cap,
                transform: `translateY(${(1 - cap) * 70}%)`,
                textShadow: "0 6px 40px rgba(0,0,0,0.55)"
              },
              children: "Run the city"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "accent",
              style: {
                marginTop: 10 * u,
                width: 140 * u * bar,
                height: 6 * u,
                borderRadius: 3 * u,
                background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})`
              }
            }
          )
        ]
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
  const btnSize = pick(44, 58, 42 * u);
  const colLeft = W * 0.07;
  const centered = aspect !== "landscape";
  const wmTop = pick(H * 0.13, H * 0.16, H * 0.07);
  const headTop = pick(H * 0.3, H * 0.455, H * 0.63);
  const btnTop = pick(H * 0.7, H * 0.555, H * 0.79);
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: block(btnTop), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "button",
        style: {
          fontFamily: FONT,
          fontSize: btnSize,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          color: "#0b1220",
          whiteSpace: "nowrap",
          padding: `${btnSize * 0.6}px ${btnSize * 1.1}px`,
          borderRadius: 999,
          background: `linear-gradient(100deg, rgba(255,255,255,0) ${sx - 12}%, rgba(255,255,255,0.55) ${sx}%, rgba(255,255,255,0) ${sx + 12}%), linear-gradient(180deg, #fdba74 0%, ${ORANGE} 45%, #ea580c 100%)`,
          boxShadow: `0 ${14 * u}px ${40 * u}px rgba(249,115,22,${0.25 + pulse * 0.25}), inset 0 1px 0 rgba(255,255,255,0.5)`,
          opacity: btn,
          transform: `translateY(${(1 - btn) * 40 * u}px)`
        },
        children: "Get early access"
      }
    ) }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVhY3QiLCAiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9rZXN0cmVsLXJ1bm5lci1sYXVuY2gtc3BvdC00NzdjL3ZlcnNpb25zL3YxL1ZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdFwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZW1vdGlvblwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdC9qc3gtcnVudGltZVwiXTsiLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBTZXF1ZW5jZSxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG5leHBvcnQgY29uc3QgY29tcG9zaXRpb24gPSB7XG4gIGZwczogMzAsXG4gIGR1cmF0aW9uSW5GcmFtZXM6IDM2MCxcbiAgc2hvdHM6IFtcbiAgICB7IG46IDEsIHRpdGxlOiAnUHJvZHVjdCBoZXJvJywgZnJvbTogMCwgZHVyYXRpb25JbkZyYW1lczogOTAgfSxcbiAgICB7IG46IDIsIHRpdGxlOiAnRGV0YWlsJywgZnJvbTogOTAsIGR1cmF0aW9uSW5GcmFtZXM6IDEyMCB9LFxuICAgIHsgbjogMywgdGl0bGU6ICdDYWxsIHRvIGFjdGlvbicsIGZyb206IDIxMCwgZHVyYXRpb25JbkZyYW1lczogMTUwIH0sXG4gIF0sXG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFRva2VucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGT05UID0gJ3VpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5jb25zdCBJTksgPSAnI2Y4ZmFmYyc7XG5jb25zdCBURUFMID0gJyMxNGI4YTYnO1xuY29uc3QgT1JBTkdFID0gJyNmOTczMTYnO1xuY29uc3QgRVhQTyA9IEVhc2luZy5iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbmNvbnN0IFNPRlQgPSBFYXNpbmcuYmV6aWVyKDAuNDUsIDAsIDAuNTUsIDEpO1xuXG5jb25zdCBlYXNlID0gKGY6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIGZyb20gPSAwLCB0byA9IDEsIGUgPSBFWFBPKSA9PlxuICBpbnRlcnBvbGF0ZShmLCBbYSwgYl0sIFtmcm9tLCB0b10sIHtcbiAgICBleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsXG4gICAgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJyxcbiAgICBlYXNpbmc6IGUsXG4gIH0pO1xuXG4vLyBEZXRlcm1pbmlzdGljIGhhc2ggaW4gWzAsIDEpOiBubyBNYXRoLnJhbmRvbSBhbnl3aGVyZS5cbmNvbnN0IHJuZCA9IChpOiBudW1iZXIpID0+IHtcbiAgY29uc3QgeCA9IE1hdGguc2luKGkgKiAxMjcuMSArIDMxMS43KSAqIDQzNzU4LjU0NTM7XG4gIHJldHVybiB4IC0gTWF0aC5mbG9vcih4KTtcbn07XG5jb25zdCBtb2QgPSAoYTogbnVtYmVyLCBtOiBudW1iZXIpID0+ICgoYSAlIG0pICsgbSkgJSBtO1xuXG50eXBlIEFzcGVjdCA9ICdsYW5kc2NhcGUnIHwgJ3BvcnRyYWl0JyB8ICdzcXVhcmUnO1xuY29uc3QgdXNlTGF5b3V0ID0gKCkgPT4ge1xuICBjb25zdCB7IHdpZHRoOiBXLCBoZWlnaHQ6IEgsIGZwcyB9ID0gdXNlVmlkZW9Db25maWcoKTtcbiAgY29uc3QgciA9IEggLyBXO1xuICBjb25zdCBhc3BlY3Q6IEFzcGVjdCA9IHIgPiAxLjMgPyAncG9ydHJhaXQnIDogciA+IDAuODUgPyAnc3F1YXJlJyA6ICdsYW5kc2NhcGUnO1xuICBjb25zdCB1ID0gTWF0aC5taW4oVywgSCkgLyAxMDgwO1xuICBjb25zdCBwaWNrID0gPFQsPihsOiBULCBwOiBULCBzOiBUKTogVCA9PiAoYXNwZWN0ID09PSAnbGFuZHNjYXBlJyA/IGwgOiBhc3BlY3QgPT09ICdwb3J0cmFpdCcgPyBwIDogcyk7XG4gIHJldHVybiB7IFcsIEgsIGZwcywgYXNwZWN0LCB1LCBwaWNrIH07XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob2UgXHUyMDE0IGRyYXduIGVudGlyZWx5IGluIFNWRywgdG9lIHBvaW50aW5nIHJpZ2h0ICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNIT0VfUkFUSU8gPSAzMDAgLyA2NDA7XG5jb25zdCBVUFBFUiA9XG4gICdNIDQwIDE2NiBDIDMwIDEyMCAzNiA3MiA2MiA1MiBDIDgyIDM4IDEwOCA0MiAxMjIgNjAgQyAxNDAgODQgMTc4IDkyIDIxMiA4NCBDIDIzMiA2MiAyNTggNDYgMjgyIDUwIEMgMzAwIDU0IDMwNiA3NiAzMTQgOTYgQyA0MDAgMTE4IDUxMiAxMzggNTk2IDE2OCBDIDYyNiAxODAgNjM4IDE5NCA2MjAgMTk0IEMgNTIwIDIwNCA0MjAgMjA2IDMzMCAyMDIgQyAyMjAgMTk4IDEyMCAxODQgNDAgMTY2IFonO1xuY29uc3QgTUlEU09MRSA9XG4gICdNIDMwIDE2MCBDIDI0IDE5NiAyOCAyMjYgNDYgMjM4IEwgNTk4IDIzOCBDIDYyNCAyMzYgNjQwIDIyMCA2NDAgMjA0IEMgNjQwIDE5NCA2MzQgMTkwIDYyMCAxOTIgQyA1MjAgMjA0IDQyMCAyMDYgMzMwIDIwMiBDIDIyMCAxOTggMTIwIDE4MiAzMCAxNjAgWic7XG5jb25zdCBPVVRTT0xFID1cbiAgJ00gNDAgMjMyIEMgNDIgMjU0IDYyIDI2NiA5MiAyNjYgTCA1NjAgMjY2IEMgNjAwIDI2NiA2MjYgMjUwIDYzNiAyMjIgQyA2MjggMjMyIDYxNCAyMzggNTk4IDIzOCBMIDQ2IDIzOCBaJztcbmNvbnN0IEhFRUwgPSAnTSA0MCAxNjYgQyAzMCAxMjAgMzYgNzIgNjIgNTIgQyA3MiA5MCA4NCAxNDAgMTIwIDE4MCBDIDkwIDE3NiA2MiAxNzIgNDAgMTY2IFonO1xuY29uc3QgVE9FID1cbiAgJ00gNTIwIDE0NiBDIDU2MCAxNTYgNjAwIDE2OCA2MTYgMTgwIEMgNjMwIDE4OCA2MzIgMTk0IDYyMCAxOTQgQyA1OTAgMTk4IDU1NiAyMDAgNTI4IDIwMCBDIDUxNiAxODQgNTEyIDE2NCA1MjAgMTQ2IFonO1xuY29uc3QgV0lORyA9XG4gICdNIDE0MCAxNjggQyAyMTAgMTI4IDMwMCAxMDggNDIwIDEyMCBDIDQ3MCAxMjUgNTAwIDEzNCA1MjAgMTQ2IEMgNDUwIDEzMiAzNjAgMTMyIDI4MCAxNTAgQyAyMzAgMTYwIDE5MCAxNzIgMTYwIDE4NiBaJztcbmNvbnN0IFdJTkcyID0gJ00gMTgyIDE3OCBDIDI2MiAxNTIgMzUyIDE0NCA0NjIgMTUyIEMgMzgyIDE1NCAzMDIgMTY0IDIyMiAxODYgWic7XG5cbmNvbnN0IFNob2U6IFJlYWN0LkZDPHsgaWQ6IHN0cmluZzsgd2lkdGg6IG51bWJlcjsgc2hlZW4/OiBudW1iZXI7IHNoYWRvdz86IGJvb2xlYW4gfT4gPSAoe1xuICBpZCxcbiAgd2lkdGgsXG4gIHNoZWVuID0gLTEsXG4gIHNoYWRvdyA9IHRydWUsXG59KSA9PiB7XG4gIGNvbnN0IGxhY2VzID0gWzAsIDEsIDIsIDMsIDRdLm1hcCgoaSkgPT4ge1xuICAgIGNvbnN0IHggPSAzMzIgKyBpICogMzY7XG4gICAgY29uc3QgeSA9IDk2ICsgMC4yNDMgKiAoeCAtIDMxNCk7XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xuICB9KTtcbiAgY29uc3Qgc3ggPSAtMTIwICsgc2hlZW4gKiA4ODA7XG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgaGVpZ2h0PXt3aWR0aCAqIFNIT0VfUkFUSU99XG4gICAgICB2aWV3Qm94PVwiMCAwIDY0MCAzMDBcIlxuICAgICAgc3R5bGU9e3sgb3ZlcmZsb3c6ICd2aXNpYmxlJywgZGlzcGxheTogJ2Jsb2NrJyB9fVxuICAgID5cbiAgICAgIDxkZWZzPlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXVwYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiM1ZWVhZDRcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuNDVcIiBzdG9wQ29sb3I9XCIjMTRiOGE2XCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzBmNWY1OVwiIC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9bWlkYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNmZWQ3YWFcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuMjVcIiBzdG9wQ29sb3I9XCIjZmI5MjNjXCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjc1XCIgc3RvcENvbG9yPVwiI2Y5NzMxNlwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNjMjQxMGNcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfW91dGB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZWE1ODBjXCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzdjMmQxMlwiIC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9aGxgfSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZmZmZmZlwiIHN0b3BPcGFjaXR5PVwiMC40NVwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC4zNVwiIHN0b3BDb2xvcj1cIiNmZmZmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXNoYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIwXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuNVwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjAuNTVcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZmZmXCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPHBhdHRlcm4gaWQ9e2Ake2lkfW1lc2hgfSB3aWR0aD1cIjZcIiBoZWlnaHQ9XCI2XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiM1wiIGN5PVwiM1wiIHI9XCIxLjE1XCIgZmlsbD1cIiMwNDJmMmVcIiBvcGFjaXR5PVwiMC4zNVwiIC8+XG4gICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgPGNsaXBQYXRoIGlkPXtgJHtpZH1zb2xlYH0+XG4gICAgICAgICAgPHBhdGggZD17TUlEU09MRX0gLz5cbiAgICAgICAgICA8cGF0aCBkPXtPVVRTT0xFfSAvPlxuICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICA8ZmlsdGVyIGlkPXtgJHtpZH1ibHVyYH0geD1cIi0yMCVcIiB5PVwiLTIwMCVcIiB3aWR0aD1cIjE0MCVcIiBoZWlnaHQ9XCI1MDAlXCI+XG4gICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjlcIiAvPlxuICAgICAgICA8L2ZpbHRlcj5cbiAgICAgIDwvZGVmcz5cblxuICAgICAge3NoYWRvdyAmJiAoXG4gICAgICAgIDxlbGxpcHNlIGN4PVwiMzM1XCIgY3k9XCIyNzZcIiByeD1cIjMwMFwiIHJ5PVwiMTNcIiBmaWxsPVwiIzAwMFwiIG9wYWNpdHk9XCIwLjY1XCIgZmlsdGVyPXtgdXJsKCMke2lkfWJsdXIpYH0gLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBVcHBlciAqL31cbiAgICAgIDxwYXRoIGQ9e1VQUEVSfSBmaWxsPXtgdXJsKCMke2lkfXVwKWB9IC8+XG4gICAgICA8cGF0aCBkPXtVUFBFUn0gZmlsbD17YHVybCgjJHtpZH1tZXNoKWB9IC8+XG4gICAgICA8cGF0aCBkPXtIRUVMfSBmaWxsPVwiIzBmNzY2ZVwiIC8+XG4gICAgICA8cGF0aCBkPXtUT0V9IGZpbGw9XCIjMGY3NjZlXCIgb3BhY2l0eT1cIjAuODVcIiAvPlxuICAgICAgPHBhdGggZD17VE9FfSBmaWxsPXtgdXJsKCMke2lkfW1lc2gpYH0gLz5cbiAgICAgIDxwYXRoIGQ9XCJNIDEyMiA2MCBDIDE0MCA4NCAxNzggOTIgMjEyIDg0IEMgMTk2IDk4IDE1MCA5OCAxMjIgNjAgWlwiIGZpbGw9XCIjMDQyZjJlXCIgLz5cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNIDIxMiA4NCBDIDIzMiA2MiAyNTggNDYgMjgyIDUwIEMgMjkwIDUyIDI5NiA2MCAzMDAgNzIgQyAyODAgNjYgMjUwIDcyIDIzMCA5MiBaXCJcbiAgICAgICAgZmlsbD1cIiMyZGQ0YmZcIlxuICAgICAgLz5cbiAgICAgIDxwYXRoIGQ9XCJNIDU2IDU2IEMgNDggNDAgNTQgMjQgNjggMjIgTCA4MiAyNCBDIDg0IDM0IDgwIDQ0IDc2IDUwIFpcIiBmaWxsPXtPUkFOR0V9IC8+XG4gICAgICA8cGF0aCBkPXtXSU5HfSBmaWxsPXtPUkFOR0V9IC8+XG4gICAgICA8cGF0aCBkPXtXSU5HMn0gZmlsbD1cIiNmZGJhNzRcIiAvPlxuICAgICAgPHBhdGggZD17VVBQRVJ9IGZpbGw9e2B1cmwoIyR7aWR9aGwpYH0gLz5cblxuICAgICAgey8qIExhY2luZyAqL31cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNIDMwNiA5MiBDIDM4MCAxMTIgNDUwIDEyNiA1MTIgMTQyXCJcbiAgICAgICAgc3Ryb2tlPVwiIzEzNGU0YVwiXG4gICAgICAgIHN0cm9rZVdpZHRoPVwiMThcIlxuICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAvPlxuICAgICAge2xhY2VzLm1hcCgoeyB4LCB5IH0sIGkpID0+IChcbiAgICAgICAgPGcga2V5PXtpfT5cbiAgICAgICAgICA8bGluZSB4MT17eCAtIDE1fSB5MT17eSArIDl9IHgyPXt4ICsgMTN9IHkyPXt5IC0gNH0gc3Ryb2tlPVwiI2Y4ZmFmY1wiIHN0cm9rZVdpZHRoPVwiNlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XG4gICAgICAgICAgPGNpcmNsZSBjeD17eCAtIDE1fSBjeT17eSArIDEyfSByPVwiMi42XCIgZmlsbD1cIiMwYjNiMzhcIiAvPlxuICAgICAgICA8L2c+XG4gICAgICApKX1cblxuICAgICAgey8qIE1pZHNvbGUgKyBvdXRzb2xlICovfVxuICAgICAgPHBhdGggZD17TUlEU09MRX0gZmlsbD17YHVybCgjJHtpZH1taWQpYH0gLz5cbiAgICAgIDxnIG9wYWNpdHk9XCIwLjM1XCIgc3Ryb2tlPVwiI2ZmZjdlZFwiIHN0cm9rZVdpZHRoPVwiMS42XCIgZmlsbD1cIm5vbmVcIj5cbiAgICAgICAgPHBhdGggZD1cIk0gNjAgMjEyIEMgMjAwIDIyMCA0MDAgMjIyIDYwMCAyMTRcIiAvPlxuICAgICAgICA8cGF0aCBkPVwiTSA1MiAyMjYgQyAyMDAgMjMyIDQwMCAyMzMgNjEwIDIyNlwiIG9wYWNpdHk9XCIwLjZcIiAvPlxuICAgICAgPC9nPlxuICAgICAge1swLCAxLCAyLCAzXS5tYXAoKGkpID0+IChcbiAgICAgICAgPHJlY3Qga2V5PXtpfSB4PXs3MCArIGkgKiAzNH0geT17MjAwICsgaSAqIDEuNX0gd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgcng9XCI5XCIgZmlsbD1cIiNjMjQxMGNcIiBvcGFjaXR5PVwiMC41NVwiIC8+XG4gICAgICApKX1cbiAgICAgIDxwYXRoIGQ9e09VVFNPTEV9IGZpbGw9e2B1cmwoIyR7aWR9b3V0KWB9IC8+XG4gICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMTkgfSkubWFwKChfLCBpKSA9PiAoXG4gICAgICAgIDxyZWN0IGtleT17aX0geD17ODQgKyBpICogMjV9IHk9XCIyNThcIiB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiN1wiIHJ4PVwiMlwiIGZpbGw9XCIjNDMxNDA3XCIgb3BhY2l0eT1cIjAuN1wiIC8+XG4gICAgICApKX1cbiAgICAgIHtzaGVlbiA+PSAwICYmIChcbiAgICAgICAgPGcgY2xpcFBhdGg9e2B1cmwoIyR7aWR9c29sZSlgfT5cbiAgICAgICAgICA8cmVjdCB4PXtzeH0geT1cIjE0MFwiIHdpZHRoPVwiMTIwXCIgaGVpZ2h0PVwiMTQwXCIgZmlsbD17YHVybCgjJHtpZH1zaClgfSB0cmFuc2Zvcm09e2Bza2V3WCgtMjApYH0gLz5cbiAgICAgICAgPC9nPlxuICAgICAgKX1cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTmlnaHQgY2l0eSBiYWNrZ3JvdW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IExBWUVSUyA9IFtcbiAgeyBiYXNlOiAwLjMsIHZhcnk6IDAuMjYsIGNvbG9yOiAnIzExMWMzYScsIHNwZWVkOiAwLjI1LCB3aW46IDAuNDUgfSxcbiAgeyBiYXNlOiAwLjE4LCB2YXJ5OiAwLjI0LCBjb2xvcjogJyMwYTEyMjknLCBzcGVlZDogMC42LCB3aW46IDAuNyB9LFxuICB7IGJhc2U6IDAuMDgsIHZhcnk6IDAuMTYsIGNvbG9yOiAnIzA0MDcwZicsIHNwZWVkOiAxLjMsIHdpbjogMC45IH0sXG5dO1xuXG5jb25zdCBDaXR5OiBSZWFjdC5GQzx7IGlkOiBzdHJpbmc7IGRpbT86IG51bWJlcjsgYmx1cj86IG51bWJlcjsgZHJpZnQ/OiBudW1iZXIgfT4gPSAoe1xuICBpZCxcbiAgZGltID0gMCxcbiAgYmx1ciA9IDAsXG4gIGRyaWZ0ID0gMSxcbn0pID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IFcsIEgsIHUsIGFzcGVjdCB9ID0gdXNlTGF5b3V0KCk7XG4gIGNvbnN0IGd5ID0gSCAqIChhc3BlY3QgPT09ICdwb3J0cmFpdCcgPyAwLjY0IDogMC44KTtcblxuICBjb25zdCBsYXllcnMgPSBMQVlFUlMubWFwKChMLCBsaSkgPT4ge1xuICAgIGNvbnN0IG91dDogeyB4OiBudW1iZXI7IHc6IG51bWJlcjsgaDogbnVtYmVyOyByOiBudW1iZXIgfVtdID0gW107XG4gICAgbGV0IHggPSAtNjAgKiB1O1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoeCA8IFcgKiAxLjUpIHtcbiAgICAgIGNvbnN0IHcgPSAoNTQgKyBybmQobGkgKiA5OTcgKyBpKSAqIDEyMCkgKiB1ICogKDEgKyBsaSAqIDAuMzUpO1xuICAgICAgY29uc3QgaCA9IGd5ICogKEwuYmFzZSArIHJuZChsaSAqIDU1NyArIGkgKiAzICsgMSkgKiBMLnZhcnkpO1xuICAgICAgb3V0LnB1c2goeyB4LCB3LCBoLCByOiBybmQobGkgKiAzMSArIGkgKiA3ICsgMikgfSk7XG4gICAgICB4ICs9IHcgKyAzICogdTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSk7XG5cbiAgY29uc3QgdHJhaWxzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOSB9KS5tYXAoKF8sIGspID0+IHtcbiAgICBjb25zdCBkaXIgPSBrICUgMiA/IDEgOiAtMTtcbiAgICBjb25zdCBzcGVlZCA9ICgxMCArIHJuZChrICsgNDApICogMTQpICogdSAqIGRpciAqIGRyaWZ0O1xuICAgIGNvbnN0IHcgPSBXICogKDAuMTIgKyBybmQoayArIDYwKSAqIDAuMik7XG4gICAgY29uc3Qgc3BhbiA9IFcgKiAxLjY7XG4gICAgY29uc3QgeCA9IG1vZChybmQoayArIDgwKSAqIHNwYW4gKyBmICogc3BlZWQsIHNwYW4pIC0gVyAqIDAuMztcbiAgICBjb25zdCB5ID0gZ3kgKyAoSCAtIGd5KSAqICgwLjA4ICsgKGsgLyA5KSAqIDAuNSk7XG4gICAgcmV0dXJuIHsgeCwgeSwgdywgd2FybTogZGlyID4gMCwgayB9O1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIiBzdHlsZT17eyBmaWx0ZXI6IGJsdXIgPyBgYmx1cigke2JsdXJ9cHgpYCA6IHVuZGVmaW5lZCB9fT5cbiAgICAgIDxzdmcgd2lkdGg9e1d9IGhlaWdodD17SH0gdmlld0JveD17YDAgMCAke1d9ICR7SH1gfSBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19PlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXNreWB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMwMjA0MGFcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41NVwiIHN0b3BDb2xvcj1cIiMwYTE0MzBcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC44XCIgc3RvcENvbG9yPVwiIzFiMjE0N1wiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzJhMWYzZFwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8cmFkaWFsR3JhZGllbnQgaWQ9e2Ake2lkfWhhemVgfSBjeD1cIjAuNVwiIGN5PVwiMVwiIHI9XCIwLjdcIj5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZjk3MzE2XCIgc3RvcE9wYWNpdHk9XCIwLjMyXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZjk3MzE2XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICA8L3JhZGlhbEdyYWRpZW50PlxuICAgICAgICAgIDxyYWRpYWxHcmFkaWVudCBpZD17YCR7aWR9bW9vbmB9IGN4PVwiMC41XCIgY3k9XCIwLjVcIiByPVwiMC41XCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiIzk5ZjZlNFwiIHN0b3BPcGFjaXR5PVwiMC41XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjOTlmNmU0XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICA8L3JhZGlhbEdyYWRpZW50PlxuICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9Z3JvdW5kYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiIzBjMTIyNlwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzAxMDIwNVwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfWZvZ2B9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMyZGQ0YmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41XCIgc3RvcENvbG9yPVwiIzJkZDRiZlwiIHN0b3BPcGFjaXR5PVwiMC4xMlwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzJkZDRiZlwiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXR3YH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIwXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZiOTIzY1wiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjg1XCIgc3RvcENvbG9yPVwiI2ZiOTIzY1wiIHN0b3BPcGFjaXR5PVwiMC45XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZmZmN2VkXCIgc3RvcE9wYWNpdHk9XCIxXCIgLz5cbiAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9dGNgfSB4MT1cIjFcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjBcIj5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjNWVlYWQ0XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuODVcIiBzdG9wQ29sb3I9XCIjOTlmNmU0XCIgc3RvcE9wYWNpdHk9XCIwLjhcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZmZmZmZcIiBzdG9wT3BhY2l0eT1cIjFcIiAvPlxuICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAge0xBWUVSUy5tYXAoKEwsIGxpKSA9PiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtsaX0+XG4gICAgICAgICAgICAgIDxwYXR0ZXJuIGlkPXtgJHtpZH13JHtsaX1gfSB3aWR0aD17MTYgKiB1fSBoZWlnaHQ9ezIyICogdX0gcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PXs0ICogdX0geT17NiAqIHV9IHdpZHRoPXs3ICogdX0gaGVpZ2h0PXsxMCAqIHV9IGZpbGw9XCIjZmJiZjI0XCIgb3BhY2l0eT17MC4xNiAqIEwud2lufSAvPlxuICAgICAgICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgICAgICAgIDxwYXR0ZXJuIGlkPXtgJHtpZH1sJHtsaX1gfSB3aWR0aD17NDggKiB1fSBoZWlnaHQ9ezY2ICogdX0gcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PXs0ICogdX0geT17NiAqIHV9IHdpZHRoPXs3ICogdX0gaGVpZ2h0PXsxMCAqIHV9IGZpbGw9XCIjZmRlNjhhXCIgb3BhY2l0eT17MC44NSAqIEwud2lufSAvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9ezM2ICogdX0geT17NTAgKiB1fSB3aWR0aD17NyAqIHV9IGhlaWdodD17MTAgKiB1fSBmaWxsPVwiIzVlZWFkNFwiIG9wYWNpdHk9ezAuNiAqIEwud2lufSAvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9ezIwICogdX0geT17MjggKiB1fSB3aWR0aD17NyAqIHV9IGhlaWdodD17MTAgKiB1fSBmaWxsPVwiI2ZlZDdhYVwiIG9wYWNpdHk9ezAuNSAqIEwud2lufSAvPlxuICAgICAgICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2RlZnM+XG5cbiAgICAgICAgPHJlY3Qgd2lkdGg9e1d9IGhlaWdodD17SH0gZmlsbD17YHVybCgjJHtpZH1za3kpYH0gLz5cbiAgICAgICAgPGNpcmNsZSBjeD17VyAqIDAuOH0gY3k9e0ggKiAwLjE2fSByPXsyNjAgKiB1fSBmaWxsPXtgdXJsKCMke2lkfW1vb24pYH0gLz5cbiAgICAgICAgPGNpcmNsZSBjeD17VyAqIDAuOH0gY3k9e0ggKiAwLjE2fSByPXszNCAqIHV9IGZpbGw9XCIjZTZmZmZiXCIgb3BhY2l0eT1cIjAuODVcIiAvPlxuICAgICAgICA8cmVjdCB5PXtneSAtIEggKiAwLjQ1fSB3aWR0aD17V30gaGVpZ2h0PXtIICogMC40NX0gZmlsbD17YHVybCgjJHtpZH1oYXplKWB9IC8+XG5cbiAgICAgICAge2xheWVycy5tYXAoKGJzLCBsaSkgPT4gKFxuICAgICAgICAgIDxnIGtleT17bGl9IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgkey1mICogTEFZRVJTW2xpXS5zcGVlZCAqIHUgKiBkcmlmdH0gMClgfT5cbiAgICAgICAgICAgIHticy5tYXAoKGIsIGJpKSA9PiAoXG4gICAgICAgICAgICAgIDxnIGtleT17Yml9PlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9e2IueH0geT17Z3kgLSBiLmh9IHdpZHRoPXtiLnd9IGhlaWdodD17Yi5oICsgMn0gZmlsbD17TEFZRVJTW2xpXS5jb2xvcn0gLz5cbiAgICAgICAgICAgICAgICB7Yi5yID4gMC44MiAmJiAoXG4gICAgICAgICAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAgICAgICAgICB4PXtiLnggKyBiLncgKiAwLjQ1fVxuICAgICAgICAgICAgICAgICAgICB5PXtneSAtIGIuaCAtIDQwICogdX1cbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezMgKiB1fVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezQwICogdX1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD17TEFZRVJTW2xpXS5jb2xvcn1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7Yi5yID4gMC44MiAmJiAoXG4gICAgICAgICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgICAgICAgIGN4PXtiLnggKyBiLncgKiAwLjQ1ICsgMS41ICogdX1cbiAgICAgICAgICAgICAgICAgICAgY3k9e2d5IC0gYi5oIC0gNDIgKiB1fVxuICAgICAgICAgICAgICAgICAgICByPXs0ICogdX1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cIiNmODcxNzFcIlxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5PXtNYXRoLmZsb29yKChmICsgYmkgKiA3KSAvIDE4KSAlIDIgPyAwLjk1IDogMC4yNX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAgICAgICAgeD17Yi54ICsgNSAqIHV9XG4gICAgICAgICAgICAgICAgICB5PXtneSAtIGIuaCArIDEwICogdX1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPXtNYXRoLm1heCgwLCBiLncgLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXRoLm1heCgwLCBiLmggLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgZmlsbD17YHVybCgjJHtpZH13JHtsaX0pYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtiLnIgPiAwLjMgJiYgKFxuICAgICAgICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgICAgICAgeD17Yi54ICsgNSAqIHV9XG4gICAgICAgICAgICAgICAgICAgIHk9e2d5IC0gYi5oICsgMTAgKiB1fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17TWF0aC5tYXgoMCwgYi53IC0gMTAgKiB1KX1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXRoLm1heCgwLCBiLmggLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgICBmaWxsPXtgdXJsKCMke2lkfWwke2xpfSlgfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2c+XG4gICAgICAgICkpfVxuXG4gICAgICAgIDxyZWN0IHk9e2d5IC0gMTIwICogdX0gd2lkdGg9e1d9IGhlaWdodD17MjAwICogdX0gZmlsbD17YHVybCgjJHtpZH1mb2cpYH0gLz5cbiAgICAgICAgPHJlY3QgeT17Z3l9IHdpZHRoPXtXfSBoZWlnaHQ9e0ggLSBneX0gZmlsbD17YHVybCgjJHtpZH1ncm91bmQpYH0gLz5cbiAgICAgICAgPHJlY3QgeT17Z3l9IHdpZHRoPXtXfSBoZWlnaHQ9ezIgKiB1fSBmaWxsPVwiIzJkZDRiZlwiIG9wYWNpdHk9XCIwLjM1XCIgLz5cbiAgICAgICAge3RyYWlscy5tYXAoKHQpID0+IChcbiAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAga2V5PXt0Lmt9XG4gICAgICAgICAgICB4PXt0Lnh9XG4gICAgICAgICAgICB5PXt0Lnl9XG4gICAgICAgICAgICB3aWR0aD17dC53fVxuICAgICAgICAgICAgaGVpZ2h0PXsoMiArICh0LmsgJSAzKSkgKiB1fVxuICAgICAgICAgICAgcng9ezIgKiB1fVxuICAgICAgICAgICAgZmlsbD17YHVybCgjJHtpZH0ke3Qud2FybSA/ICd0dycgOiAndGMnfSlgfVxuICAgICAgICAgICAgb3BhY2l0eT17MC43NX1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvc3ZnPlxuICAgICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnIzAyMDQwYScsIG9wYWNpdHk6IGRpbSB9fSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuY29uc3QgVmlnbmV0dGU6IFJlYWN0LkZDPHsgc3RyZW5ndGg/OiBudW1iZXIgfT4gPSAoeyBzdHJlbmd0aCA9IDAuNiB9KSA9PiAoXG4gIDxBYnNvbHV0ZUZpbGxcbiAgICBkYXRhLWxheWVyPVwidmlnbmV0dGVcIlxuICAgIHN0eWxlPXt7XG4gICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgNTAlIDQ1JSwgcmdiYSgwLDAsMCwwKSA0NSUsIHJnYmEoMCwwLDAsJHtzdHJlbmd0aH0pIDEwMCUpYCxcbiAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICB9fVxuICAvPlxuKTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBTaG90IDEgXHUyMDE0IFByb2R1Y3QgaGVybyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNob3QxOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IFcsIEgsIHUsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMC41NCwgVyAqIDAuODgsIFcgKiAwLjc4KTtcbiAgY29uc3Qgc2hvZUggPSBzaG9lVyAqIFNIT0VfUkFUSU87XG4gIGNvbnN0IGN5ID0gcGljayhIICogMC40NCwgSCAqIDAuMzYsIEggKiAwLjQyKTtcblxuICAvLyBTbGlkZSBpbiBmcm9tIHRoZSBsZWZ0LCBmdWxseSBsYW5kZWQgYnkgZnJhbWUgMjIgKDwgMDowMSkuXG4gIGNvbnN0IGVudGVyID0gZWFzZShmLCAwLCAyMik7XG4gIGNvbnN0IHZlbCA9IGVudGVyIC0gZWFzZShmIC0gMSwgMCwgMjIpO1xuICBjb25zdCBzdGFydFggPSAtKFcgLyAyICsgc2hvZVcgLyAyICsgODAgKiB1KTtcbiAgY29uc3QgeCA9ICgxIC0gZW50ZXIpICogc3RhcnRYO1xuICBjb25zdCBza2V3ID0gTWF0aC5taW4odmVsICogNzAsIDE2KTtcbiAgY29uc3Qgcm90ID0gaW50ZXJwb2xhdGUoZW50ZXIsIFswLCAxXSwgWy03LCAwXSk7XG4gIGNvbnN0IHNldHRsZSA9IGVhc2UoZiwgMTgsIDQwKTtcbiAgY29uc3QgYm9iID0gTWF0aC5zaW4oKGYgLSAyMikgLyAxNCkgKiA1ICogdSAqIHNldHRsZTtcbiAgY29uc3QgcHVzaCA9IGludGVycG9sYXRlKGYsIFsyMiwgOTBdLCBbMSwgMS4wNDVdLCB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJywgZWFzaW5nOiBTT0ZUIH0pO1xuXG4gIC8vIENhcHRpb24sIGZ1bGx5IHZpc2libGUgYnkgZnJhbWUgMjQuXG4gIGNvbnN0IGNhcCA9IGVhc2UoZiwgNiwgMjQpO1xuICBjb25zdCBjYXBUb3AgPSBwaWNrKEggKiAwLjc2LCBIICogMC41LCBIICogMC43NCk7XG4gIGNvbnN0IGNhcFNpemUgPSBwaWNrKDExMiwgMTEwLCA5NikgKiAocGljayh1LCAxLCB1KSk7XG4gIGNvbnN0IGJhciA9IGVhc2UoZiwgMTYsIDM2KTtcblxuICBjb25zdCBnbG93ID0gZWFzZShmLCAxMCwgNDApO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnIzAyMDQwYScsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgIDxDaXR5IGlkPVwiczFcIiBkaW09ezAuMX0gLz5cbiAgICAgIHsvKiB0ZWFsIHNwb3RsaWdodCBiZWhpbmQgcHJvZHVjdCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBXIC8gMiAtIHNob2VXICogMC44LFxuICAgICAgICAgIHRvcDogY3kgLSBzaG9lSCAqIDEuMSxcbiAgICAgICAgICB3aWR0aDogc2hvZVcgKiAxLjYsXG4gICAgICAgICAgaGVpZ2h0OiBzaG9lSCAqIDIuMixcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAncmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgY2VudGVyLCByZ2JhKDIwLDE4NCwxNjYsMC4zNSkgMCUsIHJnYmEoMjAsMTg0LDE2NiwwKSA2MiUpJyxcbiAgICAgICAgICBvcGFjaXR5OiBnbG93LFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBzcGVlZCBzdHJlYWtzICovfVxuICAgICAge1swLjI4LCAwLjQ0LCAwLjYsIDAuNzRdLm1hcCgocCwgaSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IFcgLyAyIC0gc2hvZVcgLyAyICsgeCAtIHNob2VXICogKDAuNSArIGkgKiAwLjEyKSxcbiAgICAgICAgICAgIHRvcDogY3kgLSBzaG9lSCAvIDIgKyBzaG9lSCAqIHAsXG4gICAgICAgICAgICB3aWR0aDogc2hvZVcgKiAoMC42ICsgaSAqIDAuMTIpLFxuICAgICAgICAgICAgaGVpZ2h0OiAoMyArIChpICUgMikgKiAyKSAqIHUsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDQgKiB1LFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiYSg0NSwyMTIsMTkxLDApLCAke2kgJSAyID8gJ3JnYmEoMjUxLDE0Niw2MCwwLjkpJyA6ICdyZ2JhKDk0LDIzNCwyMTIsMC45KSd9KWAsXG4gICAgICAgICAgICBvcGFjaXR5OiBNYXRoLm1pbigxLCB2ZWwgKiAxMiksXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogVyAvIDIgLSBzaG9lVyAvIDIgKyB4LFxuICAgICAgICAgIHRvcDogY3kgLSBzaG9lSCAvIDIsXG4gICAgICAgICAgd2lkdGg6IHNob2VXLFxuICAgICAgICAgIGhlaWdodDogc2hvZUgsXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke2JvYn1weCkgcm90YXRlKCR7cm90fWRlZykgc2tld1goJHstc2tld31kZWcpIHNjYWxlKCR7cHVzaH0pYCxcbiAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc1MCUgODAlJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFNob2UgaWQ9XCJzaG9lMVwiIHdpZHRoPXtzaG9lV30gc2hlZW49e2ludGVycG9sYXRlKGYsIFsyMCwgNzBdLCBbMCwgMV0sIHsgZXh0cmFwb2xhdGVMZWZ0OiAnY2xhbXAnLCBleHRyYXBvbGF0ZVJpZ2h0OiAnY2xhbXAnIH0pfSAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3A6IGNhcFRvcCxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvdzogJ2hpZGRlbicsIHBhZGRpbmc6IGAwICR7MC4xICogY2FwU2l6ZX1weCAkezAuMTQgKiBjYXBTaXplfXB4YCB9fT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkYXRhLWxheWVyPVwiY2FwdGlvblwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgICBmb250U2l6ZTogY2FwU2l6ZSxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogODAwLFxuICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDM1ZW0nLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjA1LFxuICAgICAgICAgICAgICBjb2xvcjogSU5LLFxuICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgb3BhY2l0eTogY2FwLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7KDEgLSBjYXApICogNzB9JSlgLFxuICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnMCA2cHggNDBweCByZ2JhKDAsMCwwLDAuNTUpJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgUnVuIHRoZSBjaXR5XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cImFjY2VudFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIG1hcmdpblRvcDogMTAgKiB1LFxuICAgICAgICAgICAgd2lkdGg6IDE0MCAqIHUgKiBiYXIsXG4gICAgICAgICAgICBoZWlnaHQ6IDYgKiB1LFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzICogdSxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICR7VEVBTH0sICR7T1JBTkdFfSlgLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxWaWduZXR0ZSBzdHJlbmd0aD17MC41NX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAyIFx1MjAxNCBEZXRhaWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdDI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgVywgSCwgdSwgZnBzLCBhc3BlY3QsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIC8vIE1hY3JvIGNsb3NlLXVwIG9mIHRoZSBzb2xlLCBzbG93IHRyYWNraW5nIG1vdmUgYWxvbmcgdGhlIGhlZWwuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMi4zLCBXICogMy40LCBXICogMi43KTtcbiAgY29uc3QgcyA9IHNob2VXIC8gNjQwO1xuICBjb25zdCBheCA9IFcgLyAyO1xuICBjb25zdCBheSA9IHBpY2soSCAqIDAuNjQsIEggKiAwLjcsIEggKiAwLjY4KTtcbiAgY29uc3QgY3ggPSBpbnRlcnBvbGF0ZShmLCBbMCwgMTIwXSwgWzE1MCwgMzAwXSwgeyBlYXNpbmc6IFNPRlQgfSk7XG4gIGNvbnN0IHpvb21TID0gc3ByaW5nKHsgZnJhbWU6IGYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDIwMCB9LCBkdXJhdGlvbkluRnJhbWVzOiA0MCB9KTtcbiAgY29uc3Qgem9vbSA9IGludGVycG9sYXRlKHpvb21TLCBbMCwgMV0sIFsxLjE0LCAxXSk7XG4gIGNvbnN0IHNoZWVuID0gaW50ZXJwb2xhdGUoZiwgWzgsIDkwXSwgWzAsIDFdLCB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJywgZWFzaW5nOiBTT0ZUIH0pO1xuXG4gIC8vIFdvcmRtYXJrOiBhYnNlbnQgYXQgMDowMywgZnVsbHkgdmlzaWJsZSBieSAwOjA0LjUuXG4gIGNvbnN0IHdtID0gZWFzZShmLCAxNCwgNDYpO1xuICBjb25zdCB3bVNpemUgPSBwaWNrKDE1MCwgTWF0aC5taW4oMTE4LCBXICogMC4xMSksIDEwNCAqIHUpO1xuICBjb25zdCB3bVN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID1cbiAgICBhc3BlY3QgPT09ICdsYW5kc2NhcGUnXG4gICAgICA/IHsgbGVmdDogVyAqIDAuMDcsIHRvcDogSCAqIDAuMTEgfVxuICAgICAgOiBhc3BlY3QgPT09ICdwb3J0cmFpdCdcbiAgICAgICAgPyB7IGxlZnQ6IDAsIHJpZ2h0OiAwLCB0b3A6IEggKiAwLjE3LCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9XG4gICAgICAgIDogeyBsZWZ0OiBXICogMC4wOCwgdG9wOiBIICogMC4wOCB9O1xuXG4gIC8vIFByaWNlIHRhZzogaW4gZnJvbSAwOjAzLjEsIGhlbGQgdG8gdGhlIGN1dC5cbiAgY29uc3QgdGFnSW4gPSBzcHJpbmcoeyBmcmFtZTogZiAtIDQsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDEzLCBzdGlmZm5lc3M6IDE3MCwgbWFzczogMC44IH0gfSk7XG4gIGNvbnN0IHRhZ09wID0gZWFzZShmLCA0LCAxMik7XG4gIGNvbnN0IHRhZ1NpemUgPSBwaWNrKDk2LCAxMDAsIDgwICogdSk7XG4gIGNvbnN0IHRhZ1BvczogUmVhY3QuQ1NTUHJvcGVydGllcyA9XG4gICAgYXNwZWN0ID09PSAnbGFuZHNjYXBlJ1xuICAgICAgPyB7IHJpZ2h0OiBXICogMC4wOCwgdG9wOiBIICogMC4zIH1cbiAgICAgIDogYXNwZWN0ID09PSAncG9ydHJhaXQnXG4gICAgICAgID8geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiBIICogMC40MywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfVxuICAgICAgICA6IHsgcmlnaHQ6IFcgKiAwLjA4LCB0b3A6IEggKiAwLjM0IH07XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjMDIwNDBhJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgPENpdHkgaWQ9XCJzMlwiIGRpbT17MC4zNX0gYmx1cj17MTQgKiB1fSBkcmlmdD17MC42fSAvPlxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAncmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgNzAlIDc1JSwgcmdiYSgyNDksMTE1LDIyLDAuMjgpIDAlLCByZ2JhKDI0OSwxMTUsMjIsMCkgNTUlKSwgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgMjAlIDMwJSwgcmdiYSgyMCwxODQsMTY2LDAuMjIpIDAlLCByZ2JhKDIwLDE4NCwxNjYsMCkgNTAlKScsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogYXgsIHRvcDogYXkgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHJvdGF0ZSgtM2RlZykgc2NhbGUoJHt6b29tfSkgdHJhbnNsYXRlKCR7LWN4ICogc31weCwgJHstMjE0ICogc31weClgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCAwJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFNob2UgaWQ9XCJzaG9lMlwiIHdpZHRoPXtzaG9lV30gc2hlZW49e3NoZWVufSBzaGFkb3c9e2ZhbHNlfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgey8qIGxlZ2liaWxpdHkgZ3JhZGllbnQgYXQgdGhlIHRvcCAqL31cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyLDQsMTAsMC43NSkgMCUsIHJnYmEoMiw0LDEwLDApIDQ1JSknLFxuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgLi4ud21TdHlsZSB9fT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJ3b3JkbWFya1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250U2l6ZTogd21TaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogOTAwLFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjJlbScsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogYXNwZWN0ID09PSAncG9ydHJhaXQnID8gJy0wLjJlbScgOiAwLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiBJTkssXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IHdtLFxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigkeygxIC0gd20pICogMTJ9cHgpYCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIHdtKSAqIDMwICogdX1weClgLFxuICAgICAgICAgICAgY2xpcFBhdGg6IGBpbnNldCgtMjAlICR7KDEgLSB3bSkgKiAxMDB9JSAtMjAlIC01JSlgLFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogJzAgOHB4IDUwcHggcmdiYSgwLDAsMCwwLjYpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgS0VTVFJFTFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAuLi50YWdQb3MgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBnYXA6IHRhZ1NpemUgKiAwLjI4LFxuICAgICAgICAgICAgcGFkZGluZzogYCR7dGFnU2l6ZSAqIDAuMjJ9cHggJHt0YWdTaXplICogMC40Mn1weCAke3RhZ1NpemUgKiAwLjIyfXB4ICR7dGFnU2l6ZSAqIDAuNjJ9cHhgLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsICNmYjkyM2MgMCUsICNlYTU4MGMgMTAwJSknLFxuICAgICAgICAgICAgY2xpcFBhdGg6IGBwb2x5Z29uKCR7dGFnU2l6ZSAqIDAuMzZ9cHggMCwgMTAwJSAwLCAxMDAlIDEwMCUsICR7dGFnU2l6ZSAqIDAuMzZ9cHggMTAwJSwgMCA1MCUpYCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGFnU2l6ZSAqIDAuMDgsXG4gICAgICAgICAgICBvcGFjaXR5OiB0YWdPcCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7aW50ZXJwb2xhdGUodGFnSW4sIFswLCAxXSwgWzAuNiwgMV0pfSkgcm90YXRlKCR7aW50ZXJwb2xhdGUodGFnSW4sIFswLCAxXSwgWy04LCAtMl0pfWRlZylgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCUgNTAlJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMjBweCA2MHB4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHdpZHRoOiB0YWdTaXplICogMC4xNixcbiAgICAgICAgICAgICAgaGVpZ2h0OiB0YWdTaXplICogMC4xNixcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMwYjEyMjAnLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6ICdpbnNldCAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjYpJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkYXRhLWxheWVyPVwicHJpY2VcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgICAgZm9udFNpemU6IHRhZ1NpemUsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAzZW0nLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgICBjb2xvcjogJyMwYjEyMjAnLFxuICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgZm9udFZhcmlhbnROdW1lcmljOiAndGFidWxhci1udW1zJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgXHUyMEFDMTQ5XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8VmlnbmV0dGUgc3RyZW5ndGg9ezAuNX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAzIFx1MjAxNCBDYWxsIHRvIGFjdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdDM6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgVywgSCwgdSwgZnBzLCBhc3BlY3QsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMC40NiwgVyAqIDAuNzIsIFcgKiAwLjYyKTtcbiAgY29uc3Qgc2hvZUggPSBzaG9lVyAqIFNIT0VfUkFUSU87XG4gIGNvbnN0IHNjeCA9IHBpY2soVyAqIDAuNzEsIFcgKiAwLjUsIFcgKiAwLjUpO1xuICBjb25zdCBzY3kgPSBwaWNrKEggKiAwLjUsIEggKiAwLjMzNSwgSCAqIDAuMzcpO1xuICBjb25zdCByaXNlID0gc3ByaW5nKHsgZnJhbWU6IGYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDE2LCBtYXNzOiAwLjkgfSB9KTtcbiAgY29uc3QgZmxvYXQgPSBNYXRoLnNpbihmIC8gMTgpICogOCAqIHU7XG4gIGNvbnN0IHRpbHQgPSBpbnRlcnBvbGF0ZShyaXNlLCBbMCwgMV0sIFstMTYsIC02XSkgKyBNYXRoLnNpbihmIC8gMzApICogMS4yO1xuXG4gIGNvbnN0IGhlYWQgPSBlYXNlKGYsIDgsIDMwKTtcbiAgY29uc3QgYnRuID0gZWFzZShmLCAyNiwgNDgpO1xuICBjb25zdCBzaGVlblQgPSBmID4gNTAgPyBtb2QoZiAtIDUwLCA2MCkgLyA2MCA6IC0xO1xuICBjb25zdCBzeCA9IHNoZWVuVCA8IDAgPyAtNDAgOiBpbnRlcnBvbGF0ZShzaGVlblQsIFswLCAxXSwgWy0zMCwgMTMwXSk7XG4gIGNvbnN0IHB1bHNlID0gZiA+IDQ4ID8gMC41ICsgMC41ICogTWF0aC5zaW4oKGYgLSA0OCkgLyA5KSA6IDA7XG5cbiAgY29uc3Qgd21TaXplID0gcGljayg2OCwgODAsIDYwICogdSk7XG4gIGNvbnN0IGhlYWRTaXplID0gcGljaygxNTAsIDEwMCwgODQgKiB1KTtcbiAgY29uc3QgYnRuU2l6ZSA9IHBpY2soNDQsIDU4LCA0MiAqIHUpO1xuXG4gIGNvbnN0IGNvbExlZnQgPSBXICogMC4wNztcbiAgY29uc3QgY2VudGVyZWQgPSBhc3BlY3QgIT09ICdsYW5kc2NhcGUnO1xuICBjb25zdCB3bVRvcCA9IHBpY2soSCAqIDAuMTMsIEggKiAwLjE2LCBIICogMC4wNyk7XG4gIGNvbnN0IGhlYWRUb3AgPSBwaWNrKEggKiAwLjMsIEggKiAwLjQ1NSwgSCAqIDAuNjMpO1xuICBjb25zdCBidG5Ub3AgPSBwaWNrKEggKiAwLjcsIEggKiAwLjU1NSwgSCAqIDAuNzkpO1xuXG4gIGNvbnN0IGJsb2NrID0gKHRvcDogbnVtYmVyKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PlxuICAgIGNlbnRlcmVkXG4gICAgICA/IHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcCwgbGVmdDogMCwgcmlnaHQ6IDAsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH1cbiAgICAgIDogeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wLCBsZWZ0OiBjb2xMZWZ0IH07XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjMDIwNDBhJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgPENpdHkgaWQ9XCJzM1wiIGRpbT17MC41NX0gYmx1cj17NiAqIHV9IGRyaWZ0PXswLjR9IC8+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogc2N4IC0gc2hvZVcsXG4gICAgICAgICAgdG9wOiBzY3kgLSBzaG9lVyAqIDAuNzUsXG4gICAgICAgICAgd2lkdGg6IHNob2VXICogMixcbiAgICAgICAgICBoZWlnaHQ6IHNob2VXICogMS41LFxuICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAncmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgY2VudGVyLCByZ2JhKDIwLDE4NCwxNjYsMC4zOCkgMCUsIHJnYmEoMjAsMTg0LDE2NiwwLjA4KSA0MCUsIHJnYmEoMjAsMTg0LDE2NiwwKSA2NSUpJyxcbiAgICAgICAgICBvcGFjaXR5OiByaXNlLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBvcmJpdCByaW5nICovfVxuICAgICAgPHN2Z1xuICAgICAgICB3aWR0aD17c2hvZVcgKiAxLjN9XG4gICAgICAgIGhlaWdodD17c2hvZVcgKiAwLjQyfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IHNjeCAtIHNob2VXICogMC42NSxcbiAgICAgICAgICB0b3A6IHNjeSArIHNob2VIICogMC4xOCxcbiAgICAgICAgICBvdmVyZmxvdzogJ3Zpc2libGUnLFxuICAgICAgICAgIG9wYWNpdHk6IHJpc2UgKiAwLjksXG4gICAgICAgIH19XG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMTAwIDMyXCJcbiAgICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIlxuICAgICAgICBkYXRhLWxheWVyPVwicmluZ1wiXG4gICAgICA+XG4gICAgICAgIDxlbGxpcHNlIGN4PVwiNTBcIiBjeT1cIjE2XCIgcng9XCI0OFwiIHJ5PVwiMTJcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17T1JBTkdFfSBzdHJva2VXaWR0aD1cIjAuNVwiIG9wYWNpdHk9XCIwLjdcIiAvPlxuICAgICAgICA8ZWxsaXBzZVxuICAgICAgICAgIGN4PVwiNTBcIlxuICAgICAgICAgIGN5PVwiMTZcIlxuICAgICAgICAgIHJ4PVwiNDhcIlxuICAgICAgICAgIHJ5PVwiMTJcIlxuICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICBzdHJva2U9XCIjZmRiYTc0XCJcbiAgICAgICAgICBzdHJva2VXaWR0aD1cIjFcIlxuICAgICAgICAgIHN0cm9rZURhc2hhcnJheT1cIjMwIDI3MFwiXG4gICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldD17LWYgKiAxLjZ9XG4gICAgICAgIC8+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxkaXZcbiAgICAgICAgZGF0YS1sYXllcj1cInByb2R1Y3RcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IHNjeCAtIHNob2VXIC8gMixcbiAgICAgICAgICB0b3A6IHNjeSAtIHNob2VIIC8gMixcbiAgICAgICAgICB3aWR0aDogc2hvZVcsXG4gICAgICAgICAgaGVpZ2h0OiBzaG9lSCxcbiAgICAgICAgICBvcGFjaXR5OiBpbnRlcnBvbGF0ZShyaXNlLCBbMCwgMC40XSwgWzAsIDFdLCB7IGV4dHJhcG9sYXRlUmlnaHQ6ICdjbGFtcCcgfSksXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gcmlzZSkgKiBIICogMC4yNSArIGZsb2F0fXB4KSByb3RhdGUoJHt0aWx0fWRlZykgc2NhbGUoJHtpbnRlcnBvbGF0ZShyaXNlLCBbMCwgMV0sIFswLjg2LCAxXSl9KWAsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxTaG9lIGlkPVwic2hvZTNcIiB3aWR0aD17c2hvZVd9IHNoZWVuPXtpbnRlcnBvbGF0ZShmLCBbMzAsIDExMF0sIFswLCAxXSwgeyBleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsIGV4dHJhcG9sYXRlUmlnaHQ6ICdjbGFtcCcgfSl9IC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFdvcmRtYXJrIFx1MjAxNCBvbiBzY3JlZW4gZm9yIHRoZSB3aG9sZSBzaG90ICovfVxuICAgICAgPGRpdiBzdHlsZT17YmxvY2sod21Ub3ApfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJ3b3JkbWFya1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250U2l6ZTogd21TaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogOTAwLFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjJlbScsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogY2VudGVyZWQgPyAnLTAuMmVtJyA6IDAsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgY29sb3I6IElOSyxcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBLRVNUUkVMXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBIZWFkbGluZSAqL31cbiAgICAgIDxkaXYgc3R5bGU9e2Jsb2NrKGhlYWRUb3ApfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvdzogJ2hpZGRlbicsIHBhZGRpbmdCb3R0b206IGhlYWRTaXplICogMC4xMiB9fT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkYXRhLWxheWVyPVwiaGVhZGxpbmVcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgICAgZm9udFNpemU6IGhlYWRTaXplLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA4MDAsXG4gICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wNGVtJyxcbiAgICAgICAgICAgICAgbGluZUhlaWdodDogMC45NSxcbiAgICAgICAgICAgICAgY29sb3I6IElOSyxcbiAgICAgICAgICAgICAgbWF4V2lkdGg6IHBpY2soVyAqIDAuNDYsIFcgKiAwLjksIFcgKiAwLjkpLFxuICAgICAgICAgICAgICB0ZXh0QWxpZ246IGNlbnRlcmVkID8gJ2NlbnRlcicgOiAnbGVmdCcsXG4gICAgICAgICAgICAgIHdoaXRlU3BhY2U6IGFzcGVjdCA9PT0gJ2xhbmRzY2FwZScgPyAnbm9ybWFsJyA6ICdub3dyYXAnLFxuICAgICAgICAgICAgICBvcGFjaXR5OiBoZWFkLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7KDEgLSBoZWFkKSAqIDEwMH0lKWAsXG4gICAgICAgICAgICAgIHRleHRTaGFkb3c6ICcwIDhweCA1MHB4IHJnYmEoMCwwLDAsMC42KScsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIE91dCAyOCBOb3ZlbWJlclxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQnV0dG9uIFx1MjAxNCBmdWxseSB2aXNpYmxlIGJ5IDA6MDguNiAqL31cbiAgICAgIDxkaXYgc3R5bGU9e2Jsb2NrKGJ0blRvcCl9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cImJ1dHRvblwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250U2l6ZTogYnRuU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wMWVtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogJyMwYjEyMjAnLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBwYWRkaW5nOiBgJHtidG5TaXplICogMC42fXB4ICR7YnRuU2l6ZSAqIDEuMX1weGAsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDk5OSxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTAwZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDApICR7c3ggLSAxMn0lLCByZ2JhKDI1NSwyNTUsMjU1LDAuNTUpICR7c3h9JSwgcmdiYSgyNTUsMjU1LDI1NSwwKSAke3N4ICsgMTJ9JSksIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZGJhNzQgMCUsICR7T1JBTkdFfSA0NSUsICNlYTU4MGMgMTAwJSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAkezE0ICogdX1weCAkezQwICogdX1weCByZ2JhKDI0OSwxMTUsMjIsJHswLjI1ICsgcHVsc2UgKiAwLjI1fSksIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjUpYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IGJ0bixcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIGJ0bikgKiA0MCAqIHV9cHgpYCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgR2V0IGVhcmx5IGFjY2Vzc1xuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPFZpZ25ldHRlIHN0cmVuZ3RoPXswLjV9IC8+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlkZW8oKSB7XG4gIGNvbnN0IFtzMSwgczIsIHMzXSA9IGNvbXBvc2l0aW9uLnNob3RzO1xuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgYmFja2dyb3VuZDogJyMwMjA0MGEnLCBmb250RmFtaWx5OiBGT05UIH19PlxuICAgICAgPFNlcXVlbmNlIGZyb209e3MxLmZyb219IGR1cmF0aW9uSW5GcmFtZXM9e3MxLmR1cmF0aW9uSW5GcmFtZXN9IG5hbWU9e3MxLnRpdGxlfT5cbiAgICAgICAgPFNob3QxIC8+XG4gICAgICA8L1NlcXVlbmNlPlxuICAgICAgPFNlcXVlbmNlIGZyb209e3MyLmZyb219IGR1cmF0aW9uSW5GcmFtZXM9e3MyLmR1cmF0aW9uSW5GcmFtZXN9IG5hbWU9e3MyLnRpdGxlfT5cbiAgICAgICAgPFNob3QyIC8+XG4gICAgICA8L1NlcXVlbmNlPlxuICAgICAgPFNlcXVlbmNlIGZyb209e3MzLmZyb219IGR1cmF0aW9uSW5GcmFtZXM9e3MzLmR1cmF0aW9uSW5GcmFtZXN9IG5hbWU9e3MzLnRpdGxlfT5cbiAgICAgICAgPFNob3QzIC8+XG4gICAgICA8L1NlcXVlbmNlPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixPQUFPO0FBQUE7QUFBQTs7O0FDQXBEO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsVUFBVTtBQUFBO0FBQUE7OztBQ0F2RDtBQUFBO0FBQUEsV0FBTyxVQUFVLFdBQVcsaUJBQWlCLG1CQUFtQjtBQUFBO0FBQUE7OztBQ0FoRSxtQkFBa0I7QUFDbEIsc0JBUU87QUFxRkM7QUFuRkQsSUFBTSxjQUFjO0FBQUEsRUFDekIsS0FBSztBQUFBLEVBQ0wsa0JBQWtCO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsRUFBRSxHQUFHLEdBQUcs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O0FBQUEsVUFDekMsV0FBVyxXQUFXLFdBQVc7QUFBQSxVQUNqQyxZQUFZLFdBQVcsY0FBYyxXQUFXO0FBQUEsVUFDaEQsU0FBUztBQUFBLFVBQ1QsV0FBVyxlQUFlLElBQUksUUFBUSxHQUFHO0FBQUEsVUFDekMsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxRQUNEO0FBQUE7QUFBQSxJQUVELEdBQ0YsR0FDRjtBQUFBLElBR0EsNENBQUMsU0FBSSxPQUFPLE1BQU0sTUFBTSxHQUN0QjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsY0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0wsWUFBWTtBQUFBLFVBQ1osVUFBVTtBQUFBLFVBQ1YsWUFBWTtBQUFBLFVBQ1osZUFBZTtBQUFBLFVBQ2YsWUFBWTtBQUFBLFVBQ1osT0FBTztBQUFBLFVBQ1AsWUFBWTtBQUFBLFVBQ1osU0FBUyxHQUFHLFVBQVUsR0FBRyxNQUFNLFVBQVUsR0FBRztBQUFBLFVBQzVDLGNBQWM7QUFBQSxVQUNkLFlBQVksK0NBQStDLEtBQUssRUFBRSw2QkFBNkIsRUFBRSwwQkFBMEIsS0FBSyxFQUFFLDJDQUEyQyxNQUFNO0FBQUEsVUFDbkwsV0FBVyxLQUFLLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsT0FBTyxRQUFRLElBQUk7QUFBQSxVQUMzRSxTQUFTO0FBQUEsVUFDVCxXQUFXLGVBQWUsSUFBSSxPQUFPLEtBQUssQ0FBQztBQUFBLFFBQzdDO0FBQUEsUUFDRDtBQUFBO0FBQUEsSUFFRCxHQUNGO0FBQUEsSUFDQSw0Q0FBQyxZQUFTLFVBQVUsS0FBSztBQUFBLEtBQzNCO0FBRUo7QUFJZSxTQUFSLFFBQXlCO0FBQzlCLFFBQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxJQUFJLFlBQVk7QUFDakMsU0FDRSw2Q0FBQyxnQ0FBYSxPQUFPLEVBQUUsWUFBWSxXQUFXLFlBQVksS0FBSyxHQUM3RDtBQUFBLGdEQUFDLDRCQUFTLE1BQU0sR0FBRyxNQUFNLGtCQUFrQixHQUFHLGtCQUFrQixNQUFNLEdBQUcsT0FDdkUsc0RBQUMsU0FBTSxHQUNUO0FBQUEsSUFDQSw0Q0FBQyw0QkFBUyxNQUFNLEdBQUcsTUFBTSxrQkFBa0IsR0FBRyxrQkFBa0IsTUFBTSxHQUFHLE9BQ3ZFLHNEQUFDLFNBQU0sR0FDVDtBQUFBLElBQ0EsNENBQUMsNEJBQVMsTUFBTSxHQUFHLE1BQU0sa0JBQWtCLEdBQUcsa0JBQWtCLE1BQU0sR0FBRyxPQUN2RSxzREFBQyxTQUFNLEdBQ1Q7QUFBQSxLQUNGO0FBRUo7IiwKICAibmFtZXMiOiBbIlJlYWN0Il0KfQo=
