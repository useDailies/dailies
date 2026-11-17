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

// workspaces/kestrel-runner-launch-spot-477c/versions/v4/Video.tsx
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
  const cy = pick(H * 0.4, H * 0.27, H * 0.33);
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
  const capSize = pick(192, 176, 160) * pick(u, 1, u);
  const capMargin = W * 0.04;
  const capPadX = 0.3 * capSize;
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
              padding: `${0.14 * capSize}px ${capPadX}px ${0.18 * capSize}px`,
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
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: INK,
                    maxWidth: W - 2 * capMargin - 2 * capPadX,
                    textAlign: "center",
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
  const wmSize = pick(240, 189, 166 * u);
  const wmStyle = aspect === "landscape" ? { left: W * 0.04, top: H * 0.08 } : aspect === "portrait" ? { left: 0, right: 0, top: H * 0.17, display: "flex", justifyContent: "center" } : { left: W * 0.05, top: H * 0.06 };
  const tagIn = (0, import_remotion.spring)({ frame: f - 4, fps, config: { damping: 13, stiffness: 170, mass: 0.8 } });
  const tagOp = ease(f, 4, 12);
  const tagSize = pick(154, 160, 128 * u);
  const tagPos = aspect === "landscape" ? { right: W * 0.05, top: H * 0.44 } : aspect === "portrait" ? { left: 0, right: 0, top: H * 0.43, display: "flex", justifyContent: "center" } : { right: W * 0.05, top: H * 0.36 };
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
          letterSpacing: "0.04em",
          marginRight: aspect === "portrait" ? "-0.04em" : 0,
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
                fontWeight: 900,
                letterSpacing: "-0.04em",
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
  const shoeW = pick(W * 0.4, W * 0.66, W * 0.62);
  const shoeH = shoeW * SHOE_RATIO;
  const scx = pick(W * 0.76, W * 0.5, W * 0.5);
  const scy = pick(H * 0.36, H * 0.275, H * 0.33);
  const rise = (0, import_remotion.spring)({ frame: f, fps, config: { damping: 16, mass: 0.9 } });
  const float = Math.sin(f / 18) * 8 * u;
  const tilt = (0, import_remotion.interpolate)(rise, [0, 1], [-16, -6]) + Math.sin(f / 30) * 1.2;
  const head = ease(f, 8, 30);
  const btn = ease(f, 26, 48);
  const sheenT = f > 50 ? mod(f - 50, 60) / 60 : -1;
  const sx = sheenT < 0 ? -40 : (0, import_remotion.interpolate)(sheenT, [0, 1], [-30, 130]);
  const pulse = f > 48 ? 0.5 + 0.5 * Math.sin((f - 48) / 9) : 0;
  const wmSize = pick(109, 128, 96 * u);
  const headSize = pick(240, 160, 134 * u);
  const barInset = pick(W * 0.04, W * 0.03, W * 0.03);
  const barBottom = pick(H * 0.05, H * 0.37, H * 0.05);
  const btnSize = Math.min(pick(122, 115, 102 * u), (W - 2 * barInset) / 10.4);
  const btnPadY = btnSize * 0.5;
  const btnPadX = btnSize * 0.4;
  const open = ease(f, 26, 46);
  const colLeft = W * 0.04;
  const centered = aspect !== "landscape";
  const wmTop = pick(H * 0.08, H * 0.145, H * 0.06);
  const headBottom = barBottom + btnSize + 2 * btnPadY + pick(36, 36, 28) * u;
  const block = (pos) => centered ? { position: "absolute", ...pos, left: 0, right: 0, display: "flex", justifyContent: "center" } : { position: "absolute", ...pos, left: colLeft };
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: block({ top: wmTop }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "wordmark",
        style: {
          fontFamily: FONT,
          fontSize: wmSize,
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "0.04em",
          marginRight: centered ? "-0.04em" : 0,
          lineHeight: 1,
          color: INK,
          whiteSpace: "nowrap"
        },
        children: "KESTREL"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: block({ bottom: headBottom }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflow: "hidden", paddingBottom: headSize * 0.08 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "headline",
        style: {
          fontFamily: FONT,
          fontSize: headSize,
          fontWeight: 900,
          letterSpacing: "-0.045em",
          lineHeight: 0.92,
          color: INK,
          maxWidth: pick(W * 0.7, W * 0.92, W * 0.92),
          textAlign: centered ? "center" : "left",
          whiteSpace: "normal",
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
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "#0b1220",
              textAlign: "center",
              padding: `${btnPadY}px ${btnPadX}px`,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVhY3QiLCAiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9rZXN0cmVsLXJ1bm5lci1sYXVuY2gtc3BvdC00NzdjL3ZlcnNpb25zL3Y0L1ZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdFwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZW1vdGlvblwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdC9qc3gtcnVudGltZVwiXTsiLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBTZXF1ZW5jZSxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG5leHBvcnQgY29uc3QgY29tcG9zaXRpb24gPSB7XG4gIGZwczogMzAsXG4gIGR1cmF0aW9uSW5GcmFtZXM6IDM2MCxcbiAgc2hvdHM6IFtcbiAgICB7IG46IDEsIHRpdGxlOiAnUHJvZHVjdCBoZXJvJywgZnJvbTogMCwgZHVyYXRpb25JbkZyYW1lczogOTAgfSxcbiAgICB7IG46IDIsIHRpdGxlOiAnRGV0YWlsJywgZnJvbTogOTAsIGR1cmF0aW9uSW5GcmFtZXM6IDEyMCB9LFxuICAgIHsgbjogMywgdGl0bGU6ICdDYWxsIHRvIGFjdGlvbicsIGZyb206IDIxMCwgZHVyYXRpb25JbkZyYW1lczogMTUwIH0sXG4gIF0sXG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFRva2VucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGT05UID0gJ3VpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5jb25zdCBJTksgPSAnI2Y4ZmFmYyc7XG5jb25zdCBURUFMID0gJyMxNGI4YTYnO1xuY29uc3QgT1JBTkdFID0gJyNmOTczMTYnO1xuY29uc3QgRVhQTyA9IEVhc2luZy5iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbmNvbnN0IFNPRlQgPSBFYXNpbmcuYmV6aWVyKDAuNDUsIDAsIDAuNTUsIDEpO1xuXG5jb25zdCBlYXNlID0gKGY6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIGZyb20gPSAwLCB0byA9IDEsIGUgPSBFWFBPKSA9PlxuICBpbnRlcnBvbGF0ZShmLCBbYSwgYl0sIFtmcm9tLCB0b10sIHtcbiAgICBleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsXG4gICAgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJyxcbiAgICBlYXNpbmc6IGUsXG4gIH0pO1xuXG4vLyBEZXRlcm1pbmlzdGljIGhhc2ggaW4gWzAsIDEpOiBubyBNYXRoLnJhbmRvbSBhbnl3aGVyZS5cbmNvbnN0IHJuZCA9IChpOiBudW1iZXIpID0+IHtcbiAgY29uc3QgeCA9IE1hdGguc2luKGkgKiAxMjcuMSArIDMxMS43KSAqIDQzNzU4LjU0NTM7XG4gIHJldHVybiB4IC0gTWF0aC5mbG9vcih4KTtcbn07XG5jb25zdCBtb2QgPSAoYTogbnVtYmVyLCBtOiBudW1iZXIpID0+ICgoYSAlIG0pICsgbSkgJSBtO1xuXG50eXBlIEFzcGVjdCA9ICdsYW5kc2NhcGUnIHwgJ3BvcnRyYWl0JyB8ICdzcXVhcmUnO1xuY29uc3QgdXNlTGF5b3V0ID0gKCkgPT4ge1xuICBjb25zdCB7IHdpZHRoOiBXLCBoZWlnaHQ6IEgsIGZwcyB9ID0gdXNlVmlkZW9Db25maWcoKTtcbiAgY29uc3QgciA9IEggLyBXO1xuICBjb25zdCBhc3BlY3Q6IEFzcGVjdCA9IHIgPiAxLjMgPyAncG9ydHJhaXQnIDogciA+IDAuODUgPyAnc3F1YXJlJyA6ICdsYW5kc2NhcGUnO1xuICBjb25zdCB1ID0gTWF0aC5taW4oVywgSCkgLyAxMDgwO1xuICBjb25zdCBwaWNrID0gPFQsPihsOiBULCBwOiBULCBzOiBUKTogVCA9PiAoYXNwZWN0ID09PSAnbGFuZHNjYXBlJyA/IGwgOiBhc3BlY3QgPT09ICdwb3J0cmFpdCcgPyBwIDogcyk7XG4gIHJldHVybiB7IFcsIEgsIGZwcywgYXNwZWN0LCB1LCBwaWNrIH07XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob2UgXHUyMDE0IGRyYXduIGVudGlyZWx5IGluIFNWRywgdG9lIHBvaW50aW5nIHJpZ2h0ICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNIT0VfUkFUSU8gPSAzMDAgLyA2NDA7XG5jb25zdCBVUFBFUiA9XG4gICdNIDQwIDE2NiBDIDMwIDEyMCAzNiA3MiA2MiA1MiBDIDgyIDM4IDEwOCA0MiAxMjIgNjAgQyAxNDAgODQgMTc4IDkyIDIxMiA4NCBDIDIzMiA2MiAyNTggNDYgMjgyIDUwIEMgMzAwIDU0IDMwNiA3NiAzMTQgOTYgQyA0MDAgMTE4IDUxMiAxMzggNTk2IDE2OCBDIDYyNiAxODAgNjM4IDE5NCA2MjAgMTk0IEMgNTIwIDIwNCA0MjAgMjA2IDMzMCAyMDIgQyAyMjAgMTk4IDEyMCAxODQgNDAgMTY2IFonO1xuY29uc3QgTUlEU09MRSA9XG4gICdNIDMwIDE2MCBDIDI0IDE5NiAyOCAyMjYgNDYgMjM4IEwgNTk4IDIzOCBDIDYyNCAyMzYgNjQwIDIyMCA2NDAgMjA0IEMgNjQwIDE5NCA2MzQgMTkwIDYyMCAxOTIgQyA1MjAgMjA0IDQyMCAyMDYgMzMwIDIwMiBDIDIyMCAxOTggMTIwIDE4MiAzMCAxNjAgWic7XG5jb25zdCBPVVRTT0xFID1cbiAgJ00gNDAgMjMyIEMgNDIgMjU0IDYyIDI2NiA5MiAyNjYgTCA1NjAgMjY2IEMgNjAwIDI2NiA2MjYgMjUwIDYzNiAyMjIgQyA2MjggMjMyIDYxNCAyMzggNTk4IDIzOCBMIDQ2IDIzOCBaJztcbmNvbnN0IEhFRUwgPSAnTSA0MCAxNjYgQyAzMCAxMjAgMzYgNzIgNjIgNTIgQyA3MiA5MCA4NCAxNDAgMTIwIDE4MCBDIDkwIDE3NiA2MiAxNzIgNDAgMTY2IFonO1xuY29uc3QgVE9FID1cbiAgJ00gNTIwIDE0NiBDIDU2MCAxNTYgNjAwIDE2OCA2MTYgMTgwIEMgNjMwIDE4OCA2MzIgMTk0IDYyMCAxOTQgQyA1OTAgMTk4IDU1NiAyMDAgNTI4IDIwMCBDIDUxNiAxODQgNTEyIDE2NCA1MjAgMTQ2IFonO1xuY29uc3QgV0lORyA9XG4gICdNIDE0MCAxNjggQyAyMTAgMTI4IDMwMCAxMDggNDIwIDEyMCBDIDQ3MCAxMjUgNTAwIDEzNCA1MjAgMTQ2IEMgNDUwIDEzMiAzNjAgMTMyIDI4MCAxNTAgQyAyMzAgMTYwIDE5MCAxNzIgMTYwIDE4NiBaJztcbmNvbnN0IFdJTkcyID0gJ00gMTgyIDE3OCBDIDI2MiAxNTIgMzUyIDE0NCA0NjIgMTUyIEMgMzgyIDE1NCAzMDIgMTY0IDIyMiAxODYgWic7XG5cbmNvbnN0IFNob2U6IFJlYWN0LkZDPHsgaWQ6IHN0cmluZzsgd2lkdGg6IG51bWJlcjsgc2hlZW4/OiBudW1iZXI7IHNoYWRvdz86IGJvb2xlYW4gfT4gPSAoe1xuICBpZCxcbiAgd2lkdGgsXG4gIHNoZWVuID0gLTEsXG4gIHNoYWRvdyA9IHRydWUsXG59KSA9PiB7XG4gIGNvbnN0IGxhY2VzID0gWzAsIDEsIDIsIDMsIDRdLm1hcCgoaSkgPT4ge1xuICAgIGNvbnN0IHggPSAzMzIgKyBpICogMzY7XG4gICAgY29uc3QgeSA9IDk2ICsgMC4yNDMgKiAoeCAtIDMxNCk7XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xuICB9KTtcbiAgY29uc3Qgc3ggPSAtMTIwICsgc2hlZW4gKiA4ODA7XG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgaGVpZ2h0PXt3aWR0aCAqIFNIT0VfUkFUSU99XG4gICAgICB2aWV3Qm94PVwiMCAwIDY0MCAzMDBcIlxuICAgICAgc3R5bGU9e3sgb3ZlcmZsb3c6ICd2aXNpYmxlJywgZGlzcGxheTogJ2Jsb2NrJyB9fVxuICAgID5cbiAgICAgIDxkZWZzPlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXVwYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiM1ZWVhZDRcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuNDVcIiBzdG9wQ29sb3I9XCIjMTRiOGE2XCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzBmNWY1OVwiIC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9bWlkYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNmZWQ3YWFcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuMjVcIiBzdG9wQ29sb3I9XCIjZmI5MjNjXCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjc1XCIgc3RvcENvbG9yPVwiI2Y5NzMxNlwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNjMjQxMGNcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfW91dGB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZWE1ODBjXCIgLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzdjMmQxMlwiIC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9aGxgfSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZmZmZmZlwiIHN0b3BPcGFjaXR5PVwiMC40NVwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC4zNVwiIHN0b3BDb2xvcj1cIiNmZmZmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXNoYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIwXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuNVwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjAuNTVcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZmZmXCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPHBhdHRlcm4gaWQ9e2Ake2lkfW1lc2hgfSB3aWR0aD1cIjZcIiBoZWlnaHQ9XCI2XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiM1wiIGN5PVwiM1wiIHI9XCIxLjE1XCIgZmlsbD1cIiMwNDJmMmVcIiBvcGFjaXR5PVwiMC4zNVwiIC8+XG4gICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgPGNsaXBQYXRoIGlkPXtgJHtpZH1zb2xlYH0+XG4gICAgICAgICAgPHBhdGggZD17TUlEU09MRX0gLz5cbiAgICAgICAgICA8cGF0aCBkPXtPVVRTT0xFfSAvPlxuICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICA8ZmlsdGVyIGlkPXtgJHtpZH1ibHVyYH0geD1cIi0yMCVcIiB5PVwiLTIwMCVcIiB3aWR0aD1cIjE0MCVcIiBoZWlnaHQ9XCI1MDAlXCI+XG4gICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjlcIiAvPlxuICAgICAgICA8L2ZpbHRlcj5cbiAgICAgIDwvZGVmcz5cblxuICAgICAge3NoYWRvdyAmJiAoXG4gICAgICAgIDxlbGxpcHNlIGN4PVwiMzM1XCIgY3k9XCIyNzZcIiByeD1cIjMwMFwiIHJ5PVwiMTNcIiBmaWxsPVwiIzAwMFwiIG9wYWNpdHk9XCIwLjY1XCIgZmlsdGVyPXtgdXJsKCMke2lkfWJsdXIpYH0gLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBVcHBlciAqL31cbiAgICAgIDxwYXRoIGQ9e1VQUEVSfSBmaWxsPXtgdXJsKCMke2lkfXVwKWB9IC8+XG4gICAgICA8cGF0aCBkPXtVUFBFUn0gZmlsbD17YHVybCgjJHtpZH1tZXNoKWB9IC8+XG4gICAgICA8cGF0aCBkPXtIRUVMfSBmaWxsPVwiIzBmNzY2ZVwiIC8+XG4gICAgICA8cGF0aCBkPXtUT0V9IGZpbGw9XCIjMGY3NjZlXCIgb3BhY2l0eT1cIjAuODVcIiAvPlxuICAgICAgPHBhdGggZD17VE9FfSBmaWxsPXtgdXJsKCMke2lkfW1lc2gpYH0gLz5cbiAgICAgIDxwYXRoIGQ9XCJNIDEyMiA2MCBDIDE0MCA4NCAxNzggOTIgMjEyIDg0IEMgMTk2IDk4IDE1MCA5OCAxMjIgNjAgWlwiIGZpbGw9XCIjMDQyZjJlXCIgLz5cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNIDIxMiA4NCBDIDIzMiA2MiAyNTggNDYgMjgyIDUwIEMgMjkwIDUyIDI5NiA2MCAzMDAgNzIgQyAyODAgNjYgMjUwIDcyIDIzMCA5MiBaXCJcbiAgICAgICAgZmlsbD1cIiMyZGQ0YmZcIlxuICAgICAgLz5cbiAgICAgIDxwYXRoIGQ9XCJNIDU2IDU2IEMgNDggNDAgNTQgMjQgNjggMjIgTCA4MiAyNCBDIDg0IDM0IDgwIDQ0IDc2IDUwIFpcIiBmaWxsPXtPUkFOR0V9IC8+XG4gICAgICA8cGF0aCBkPXtXSU5HfSBmaWxsPXtPUkFOR0V9IC8+XG4gICAgICA8cGF0aCBkPXtXSU5HMn0gZmlsbD1cIiNmZGJhNzRcIiAvPlxuICAgICAgPHBhdGggZD17VVBQRVJ9IGZpbGw9e2B1cmwoIyR7aWR9aGwpYH0gLz5cblxuICAgICAgey8qIExhY2luZyAqL31cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNIDMwNiA5MiBDIDM4MCAxMTIgNDUwIDEyNiA1MTIgMTQyXCJcbiAgICAgICAgc3Ryb2tlPVwiIzEzNGU0YVwiXG4gICAgICAgIHN0cm9rZVdpZHRoPVwiMThcIlxuICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAvPlxuICAgICAge2xhY2VzLm1hcCgoeyB4LCB5IH0sIGkpID0+IChcbiAgICAgICAgPGcga2V5PXtpfT5cbiAgICAgICAgICA8bGluZSB4MT17eCAtIDE1fSB5MT17eSArIDl9IHgyPXt4ICsgMTN9IHkyPXt5IC0gNH0gc3Ryb2tlPVwiI2Y4ZmFmY1wiIHN0cm9rZVdpZHRoPVwiNlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XG4gICAgICAgICAgPGNpcmNsZSBjeD17eCAtIDE1fSBjeT17eSArIDEyfSByPVwiMi42XCIgZmlsbD1cIiMwYjNiMzhcIiAvPlxuICAgICAgICA8L2c+XG4gICAgICApKX1cblxuICAgICAgey8qIE1pZHNvbGUgKyBvdXRzb2xlICovfVxuICAgICAgPHBhdGggZD17TUlEU09MRX0gZmlsbD17YHVybCgjJHtpZH1taWQpYH0gLz5cbiAgICAgIDxnIG9wYWNpdHk9XCIwLjM1XCIgc3Ryb2tlPVwiI2ZmZjdlZFwiIHN0cm9rZVdpZHRoPVwiMS42XCIgZmlsbD1cIm5vbmVcIj5cbiAgICAgICAgPHBhdGggZD1cIk0gNjAgMjEyIEMgMjAwIDIyMCA0MDAgMjIyIDYwMCAyMTRcIiAvPlxuICAgICAgICA8cGF0aCBkPVwiTSA1MiAyMjYgQyAyMDAgMjMyIDQwMCAyMzMgNjEwIDIyNlwiIG9wYWNpdHk9XCIwLjZcIiAvPlxuICAgICAgPC9nPlxuICAgICAge1swLCAxLCAyLCAzXS5tYXAoKGkpID0+IChcbiAgICAgICAgPHJlY3Qga2V5PXtpfSB4PXs3MCArIGkgKiAzNH0geT17MjAwICsgaSAqIDEuNX0gd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgcng9XCI5XCIgZmlsbD1cIiNjMjQxMGNcIiBvcGFjaXR5PVwiMC41NVwiIC8+XG4gICAgICApKX1cbiAgICAgIDxwYXRoIGQ9e09VVFNPTEV9IGZpbGw9e2B1cmwoIyR7aWR9b3V0KWB9IC8+XG4gICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMTkgfSkubWFwKChfLCBpKSA9PiAoXG4gICAgICAgIDxyZWN0IGtleT17aX0geD17ODQgKyBpICogMjV9IHk9XCIyNThcIiB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiN1wiIHJ4PVwiMlwiIGZpbGw9XCIjNDMxNDA3XCIgb3BhY2l0eT1cIjAuN1wiIC8+XG4gICAgICApKX1cbiAgICAgIHtzaGVlbiA+PSAwICYmIChcbiAgICAgICAgPGcgY2xpcFBhdGg9e2B1cmwoIyR7aWR9c29sZSlgfT5cbiAgICAgICAgICA8cmVjdCB4PXtzeH0geT1cIjE0MFwiIHdpZHRoPVwiMTIwXCIgaGVpZ2h0PVwiMTQwXCIgZmlsbD17YHVybCgjJHtpZH1zaClgfSB0cmFuc2Zvcm09e2Bza2V3WCgtMjApYH0gLz5cbiAgICAgICAgPC9nPlxuICAgICAgKX1cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTmlnaHQgY2l0eSBiYWNrZ3JvdW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IExBWUVSUyA9IFtcbiAgeyBiYXNlOiAwLjMsIHZhcnk6IDAuMjYsIGNvbG9yOiAnIzExMWMzYScsIHNwZWVkOiAwLjI1LCB3aW46IDAuNDUgfSxcbiAgeyBiYXNlOiAwLjE4LCB2YXJ5OiAwLjI0LCBjb2xvcjogJyMwYTEyMjknLCBzcGVlZDogMC42LCB3aW46IDAuNyB9LFxuICB7IGJhc2U6IDAuMDgsIHZhcnk6IDAuMTYsIGNvbG9yOiAnIzA0MDcwZicsIHNwZWVkOiAxLjMsIHdpbjogMC45IH0sXG5dO1xuXG5jb25zdCBDaXR5OiBSZWFjdC5GQzx7IGlkOiBzdHJpbmc7IGRpbT86IG51bWJlcjsgYmx1cj86IG51bWJlcjsgZHJpZnQ/OiBudW1iZXIgfT4gPSAoe1xuICBpZCxcbiAgZGltID0gMCxcbiAgYmx1ciA9IDAsXG4gIGRyaWZ0ID0gMSxcbn0pID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IFcsIEgsIHUsIGFzcGVjdCB9ID0gdXNlTGF5b3V0KCk7XG4gIGNvbnN0IGd5ID0gSCAqIChhc3BlY3QgPT09ICdwb3J0cmFpdCcgPyAwLjY0IDogMC44KTtcblxuICBjb25zdCBsYXllcnMgPSBMQVlFUlMubWFwKChMLCBsaSkgPT4ge1xuICAgIGNvbnN0IG91dDogeyB4OiBudW1iZXI7IHc6IG51bWJlcjsgaDogbnVtYmVyOyByOiBudW1iZXIgfVtdID0gW107XG4gICAgbGV0IHggPSAtNjAgKiB1O1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoeCA8IFcgKiAxLjUpIHtcbiAgICAgIGNvbnN0IHcgPSAoNTQgKyBybmQobGkgKiA5OTcgKyBpKSAqIDEyMCkgKiB1ICogKDEgKyBsaSAqIDAuMzUpO1xuICAgICAgY29uc3QgaCA9IGd5ICogKEwuYmFzZSArIHJuZChsaSAqIDU1NyArIGkgKiAzICsgMSkgKiBMLnZhcnkpO1xuICAgICAgb3V0LnB1c2goeyB4LCB3LCBoLCByOiBybmQobGkgKiAzMSArIGkgKiA3ICsgMikgfSk7XG4gICAgICB4ICs9IHcgKyAzICogdTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSk7XG5cbiAgY29uc3QgdHJhaWxzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOSB9KS5tYXAoKF8sIGspID0+IHtcbiAgICBjb25zdCBkaXIgPSBrICUgMiA/IDEgOiAtMTtcbiAgICBjb25zdCBzcGVlZCA9ICgxMCArIHJuZChrICsgNDApICogMTQpICogdSAqIGRpciAqIGRyaWZ0O1xuICAgIGNvbnN0IHcgPSBXICogKDAuMTIgKyBybmQoayArIDYwKSAqIDAuMik7XG4gICAgY29uc3Qgc3BhbiA9IFcgKiAxLjY7XG4gICAgY29uc3QgeCA9IG1vZChybmQoayArIDgwKSAqIHNwYW4gKyBmICogc3BlZWQsIHNwYW4pIC0gVyAqIDAuMztcbiAgICBjb25zdCB5ID0gZ3kgKyAoSCAtIGd5KSAqICgwLjA4ICsgKGsgLyA5KSAqIDAuNSk7XG4gICAgcmV0dXJuIHsgeCwgeSwgdywgd2FybTogZGlyID4gMCwgayB9O1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIiBzdHlsZT17eyBmaWx0ZXI6IGJsdXIgPyBgYmx1cigke2JsdXJ9cHgpYCA6IHVuZGVmaW5lZCB9fT5cbiAgICAgIDxzdmcgd2lkdGg9e1d9IGhlaWdodD17SH0gdmlld0JveD17YDAgMCAke1d9ICR7SH1gfSBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19PlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXNreWB9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMwMjA0MGFcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41NVwiIHN0b3BDb2xvcj1cIiMwYTE0MzBcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC44XCIgc3RvcENvbG9yPVwiIzFiMjE0N1wiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzJhMWYzZFwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8cmFkaWFsR3JhZGllbnQgaWQ9e2Ake2lkfWhhemVgfSBjeD1cIjAuNVwiIGN5PVwiMVwiIHI9XCIwLjdcIj5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZjk3MzE2XCIgc3RvcE9wYWNpdHk9XCIwLjMyXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZjk3MzE2XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICA8L3JhZGlhbEdyYWRpZW50PlxuICAgICAgICAgIDxyYWRpYWxHcmFkaWVudCBpZD17YCR7aWR9bW9vbmB9IGN4PVwiMC41XCIgY3k9XCIwLjVcIiByPVwiMC41XCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiIzk5ZjZlNFwiIHN0b3BPcGFjaXR5PVwiMC41XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjOTlmNmU0XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICA8L3JhZGlhbEdyYWRpZW50PlxuICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9Z3JvdW5kYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiIzBjMTIyNlwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzAxMDIwNVwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfWZvZ2B9IHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMyZGQ0YmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41XCIgc3RvcENvbG9yPVwiIzJkZDRiZlwiIHN0b3BPcGFjaXR5PVwiMC4xMlwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzJkZDRiZlwiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfXR3YH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIwXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZiOTIzY1wiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwLjg1XCIgc3RvcENvbG9yPVwiI2ZiOTIzY1wiIHN0b3BPcGFjaXR5PVwiMC45XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZmZmN2VkXCIgc3RvcE9wYWNpdHk9XCIxXCIgLz5cbiAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9dGNgfSB4MT1cIjFcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjBcIj5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjNWVlYWQ0XCIgc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuODVcIiBzdG9wQ29sb3I9XCIjOTlmNmU0XCIgc3RvcE9wYWNpdHk9XCIwLjhcIiAvPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZmZmZmZcIiBzdG9wT3BhY2l0eT1cIjFcIiAvPlxuICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAge0xBWUVSUy5tYXAoKEwsIGxpKSA9PiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtsaX0+XG4gICAgICAgICAgICAgIDxwYXR0ZXJuIGlkPXtgJHtpZH13JHtsaX1gfSB3aWR0aD17MTYgKiB1fSBoZWlnaHQ9ezIyICogdX0gcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PXs0ICogdX0geT17NiAqIHV9IHdpZHRoPXs3ICogdX0gaGVpZ2h0PXsxMCAqIHV9IGZpbGw9XCIjZmJiZjI0XCIgb3BhY2l0eT17MC4xNiAqIEwud2lufSAvPlxuICAgICAgICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgICAgICAgIDxwYXR0ZXJuIGlkPXtgJHtpZH1sJHtsaX1gfSB3aWR0aD17NDggKiB1fSBoZWlnaHQ9ezY2ICogdX0gcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PXs0ICogdX0geT17NiAqIHV9IHdpZHRoPXs3ICogdX0gaGVpZ2h0PXsxMCAqIHV9IGZpbGw9XCIjZmRlNjhhXCIgb3BhY2l0eT17MC44NSAqIEwud2lufSAvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9ezM2ICogdX0geT17NTAgKiB1fSB3aWR0aD17NyAqIHV9IGhlaWdodD17MTAgKiB1fSBmaWxsPVwiIzVlZWFkNFwiIG9wYWNpdHk9ezAuNiAqIEwud2lufSAvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9ezIwICogdX0geT17MjggKiB1fSB3aWR0aD17NyAqIHV9IGhlaWdodD17MTAgKiB1fSBmaWxsPVwiI2ZlZDdhYVwiIG9wYWNpdHk9ezAuNSAqIEwud2lufSAvPlxuICAgICAgICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2RlZnM+XG5cbiAgICAgICAgPHJlY3Qgd2lkdGg9e1d9IGhlaWdodD17SH0gZmlsbD17YHVybCgjJHtpZH1za3kpYH0gLz5cbiAgICAgICAgPGNpcmNsZSBjeD17VyAqIDAuOH0gY3k9e0ggKiAwLjE2fSByPXsyNjAgKiB1fSBmaWxsPXtgdXJsKCMke2lkfW1vb24pYH0gLz5cbiAgICAgICAgPGNpcmNsZSBjeD17VyAqIDAuOH0gY3k9e0ggKiAwLjE2fSByPXszNCAqIHV9IGZpbGw9XCIjZTZmZmZiXCIgb3BhY2l0eT1cIjAuODVcIiAvPlxuICAgICAgICA8cmVjdCB5PXtneSAtIEggKiAwLjQ1fSB3aWR0aD17V30gaGVpZ2h0PXtIICogMC40NX0gZmlsbD17YHVybCgjJHtpZH1oYXplKWB9IC8+XG5cbiAgICAgICAge2xheWVycy5tYXAoKGJzLCBsaSkgPT4gKFxuICAgICAgICAgIDxnIGtleT17bGl9IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgkey1mICogTEFZRVJTW2xpXS5zcGVlZCAqIHUgKiBkcmlmdH0gMClgfT5cbiAgICAgICAgICAgIHticy5tYXAoKGIsIGJpKSA9PiAoXG4gICAgICAgICAgICAgIDxnIGtleT17Yml9PlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9e2IueH0geT17Z3kgLSBiLmh9IHdpZHRoPXtiLnd9IGhlaWdodD17Yi5oICsgMn0gZmlsbD17TEFZRVJTW2xpXS5jb2xvcn0gLz5cbiAgICAgICAgICAgICAgICB7Yi5yID4gMC44MiAmJiAoXG4gICAgICAgICAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAgICAgICAgICB4PXtiLnggKyBiLncgKiAwLjQ1fVxuICAgICAgICAgICAgICAgICAgICB5PXtneSAtIGIuaCAtIDQwICogdX1cbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezMgKiB1fVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezQwICogdX1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD17TEFZRVJTW2xpXS5jb2xvcn1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7Yi5yID4gMC44MiAmJiAoXG4gICAgICAgICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgICAgICAgIGN4PXtiLnggKyBiLncgKiAwLjQ1ICsgMS41ICogdX1cbiAgICAgICAgICAgICAgICAgICAgY3k9e2d5IC0gYi5oIC0gNDIgKiB1fVxuICAgICAgICAgICAgICAgICAgICByPXs0ICogdX1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cIiNmODcxNzFcIlxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5PXtNYXRoLmZsb29yKChmICsgYmkgKiA3KSAvIDE4KSAlIDIgPyAwLjk1IDogMC4yNX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAgICAgICAgeD17Yi54ICsgNSAqIHV9XG4gICAgICAgICAgICAgICAgICB5PXtneSAtIGIuaCArIDEwICogdX1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPXtNYXRoLm1heCgwLCBiLncgLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXRoLm1heCgwLCBiLmggLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgZmlsbD17YHVybCgjJHtpZH13JHtsaX0pYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtiLnIgPiAwLjMgJiYgKFxuICAgICAgICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgICAgICAgeD17Yi54ICsgNSAqIHV9XG4gICAgICAgICAgICAgICAgICAgIHk9e2d5IC0gYi5oICsgMTAgKiB1fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17TWF0aC5tYXgoMCwgYi53IC0gMTAgKiB1KX1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXRoLm1heCgwLCBiLmggLSAxMCAqIHUpfVxuICAgICAgICAgICAgICAgICAgICBmaWxsPXtgdXJsKCMke2lkfWwke2xpfSlgfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2c+XG4gICAgICAgICkpfVxuXG4gICAgICAgIDxyZWN0IHk9e2d5IC0gMTIwICogdX0gd2lkdGg9e1d9IGhlaWdodD17MjAwICogdX0gZmlsbD17YHVybCgjJHtpZH1mb2cpYH0gLz5cbiAgICAgICAgPHJlY3QgeT17Z3l9IHdpZHRoPXtXfSBoZWlnaHQ9e0ggLSBneX0gZmlsbD17YHVybCgjJHtpZH1ncm91bmQpYH0gLz5cbiAgICAgICAgPHJlY3QgeT17Z3l9IHdpZHRoPXtXfSBoZWlnaHQ9ezIgKiB1fSBmaWxsPVwiIzJkZDRiZlwiIG9wYWNpdHk9XCIwLjM1XCIgLz5cbiAgICAgICAge3RyYWlscy5tYXAoKHQpID0+IChcbiAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAga2V5PXt0Lmt9XG4gICAgICAgICAgICB4PXt0Lnh9XG4gICAgICAgICAgICB5PXt0Lnl9XG4gICAgICAgICAgICB3aWR0aD17dC53fVxuICAgICAgICAgICAgaGVpZ2h0PXsoMiArICh0LmsgJSAzKSkgKiB1fVxuICAgICAgICAgICAgcng9ezIgKiB1fVxuICAgICAgICAgICAgZmlsbD17YHVybCgjJHtpZH0ke3Qud2FybSA/ICd0dycgOiAndGMnfSlgfVxuICAgICAgICAgICAgb3BhY2l0eT17MC43NX1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvc3ZnPlxuICAgICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnIzAyMDQwYScsIG9wYWNpdHk6IGRpbSB9fSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuY29uc3QgVmlnbmV0dGU6IFJlYWN0LkZDPHsgc3RyZW5ndGg/OiBudW1iZXIgfT4gPSAoeyBzdHJlbmd0aCA9IDAuNiB9KSA9PiAoXG4gIDxBYnNvbHV0ZUZpbGxcbiAgICBkYXRhLWxheWVyPVwidmlnbmV0dGVcIlxuICAgIHN0eWxlPXt7XG4gICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgNTAlIDQ1JSwgcmdiYSgwLDAsMCwwKSA0NSUsIHJnYmEoMCwwLDAsJHtzdHJlbmd0aH0pIDEwMCUpYCxcbiAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICB9fVxuICAvPlxuKTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBTaG90IDEgXHUyMDE0IFByb2R1Y3QgaGVybyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNob3QxOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IFcsIEgsIHUsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMC41NCwgVyAqIDAuODgsIFcgKiAwLjc4KTtcbiAgY29uc3Qgc2hvZUggPSBzaG9lVyAqIFNIT0VfUkFUSU87XG4gIGNvbnN0IGN5ID0gcGljayhIICogMC40LCBIICogMC4yNywgSCAqIDAuMzMpO1xuXG4gIC8vIFNsaWRlIGluIGZyb20gdGhlIGxlZnQsIGZ1bGx5IGxhbmRlZCBieSBmcmFtZSAyMiAoPCAwOjAxKS5cbiAgY29uc3QgZW50ZXIgPSBlYXNlKGYsIDAsIDIyKTtcbiAgY29uc3QgdmVsID0gZW50ZXIgLSBlYXNlKGYgLSAxLCAwLCAyMik7XG4gIGNvbnN0IHN0YXJ0WCA9IC0oVyAvIDIgKyBzaG9lVyAvIDIgKyA4MCAqIHUpO1xuICBjb25zdCB4ID0gKDEgLSBlbnRlcikgKiBzdGFydFg7XG4gIGNvbnN0IHNrZXcgPSBNYXRoLm1pbih2ZWwgKiA3MCwgMTYpO1xuICBjb25zdCByb3QgPSBpbnRlcnBvbGF0ZShlbnRlciwgWzAsIDFdLCBbLTcsIDBdKTtcbiAgY29uc3Qgc2V0dGxlID0gZWFzZShmLCAxOCwgNDApO1xuICBjb25zdCBib2IgPSBNYXRoLnNpbigoZiAtIDIyKSAvIDE0KSAqIDUgKiB1ICogc2V0dGxlO1xuICBjb25zdCBwdXNoID0gaW50ZXJwb2xhdGUoZiwgWzIyLCA5MF0sIFsxLCAxLjA0NV0sIHsgZXh0cmFwb2xhdGVMZWZ0OiAnY2xhbXAnLCBleHRyYXBvbGF0ZVJpZ2h0OiAnY2xhbXAnLCBlYXNpbmc6IFNPRlQgfSk7XG5cbiAgLy8gQ2FwdGlvbiwgZnVsbHkgdmlzaWJsZSBieSBmcmFtZSAyNC5cbiAgY29uc3QgY2FwID0gZWFzZShmLCA2LCAyNCk7XG4gIC8vIExvd2VyLXRoaXJkIHN1YnRpdGxlLCBmdWxseSB2aXNpYmxlIGJ5IGZyYW1lIDI0LlxuICBjb25zdCBib3ggPSBlYXNlKGYsIDIsIDE2KTtcbiAgY29uc3QgY2FwQm90dG9tID0gcGljayhIICogMC4wNywgSCAqIDAuMzgsIEggKiAwLjA3KTtcbiAgLy8gUG9zdGVyIHNjYWxlOiAxLjZ4IHRoZSBvcmlnaW5hbCAxMjAgLyAxMTAgLyAxMDAuIFdoZXJlIG9uZSBsaW5lIHdvbid0IGZpdFxuICAvLyB0aGUgZnJhbWUgKDk6MTYsIDE6MSkgaXQgc3RhY2tzIG9udG8gdHdvIGxpbmVzIHJhdGhlciB0aGFuIHNocmlua2luZy5cbiAgY29uc3QgY2FwU2l6ZSA9IHBpY2soMTkyLCAxNzYsIDE2MCkgKiBwaWNrKHUsIDEsIHUpO1xuICBjb25zdCBjYXBNYXJnaW4gPSBXICogMC4wNDtcbiAgY29uc3QgY2FwUGFkWCA9IDAuMyAqIGNhcFNpemU7XG4gIGNvbnN0IGJhciA9IGVhc2UoZiwgMTIsIDMwKTtcblxuICBjb25zdCBnbG93ID0gZWFzZShmLCAxMCwgNDApO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnIzAyMDQwYScsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgIDxDaXR5IGlkPVwiczFcIiBkaW09ezAuMX0gLz5cbiAgICAgIHsvKiB0ZWFsIHNwb3RsaWdodCBiZWhpbmQgcHJvZHVjdCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBXIC8gMiAtIHNob2VXICogMC44LFxuICAgICAgICAgIHRvcDogY3kgLSBzaG9lSCAqIDEuMSxcbiAgICAgICAgICB3aWR0aDogc2hvZVcgKiAxLjYsXG4gICAgICAgICAgaGVpZ2h0OiBzaG9lSCAqIDIuMixcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAncmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgY2VudGVyLCByZ2JhKDIwLDE4NCwxNjYsMC4zNSkgMCUsIHJnYmEoMjAsMTg0LDE2NiwwKSA2MiUpJyxcbiAgICAgICAgICBvcGFjaXR5OiBnbG93LFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBzcGVlZCBzdHJlYWtzICovfVxuICAgICAge1swLjI4LCAwLjQ0LCAwLjYsIDAuNzRdLm1hcCgocCwgaSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IFcgLyAyIC0gc2hvZVcgLyAyICsgeCAtIHNob2VXICogKDAuNSArIGkgKiAwLjEyKSxcbiAgICAgICAgICAgIHRvcDogY3kgLSBzaG9lSCAvIDIgKyBzaG9lSCAqIHAsXG4gICAgICAgICAgICB3aWR0aDogc2hvZVcgKiAoMC42ICsgaSAqIDAuMTIpLFxuICAgICAgICAgICAgaGVpZ2h0OiAoMyArIChpICUgMikgKiAyKSAqIHUsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDQgKiB1LFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiYSg0NSwyMTIsMTkxLDApLCAke2kgJSAyID8gJ3JnYmEoMjUxLDE0Niw2MCwwLjkpJyA6ICdyZ2JhKDk0LDIzNCwyMTIsMC45KSd9KWAsXG4gICAgICAgICAgICBvcGFjaXR5OiBNYXRoLm1pbigxLCB2ZWwgKiAxMiksXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogVyAvIDIgLSBzaG9lVyAvIDIgKyB4LFxuICAgICAgICAgIHRvcDogY3kgLSBzaG9lSCAvIDIsXG4gICAgICAgICAgd2lkdGg6IHNob2VXLFxuICAgICAgICAgIGhlaWdodDogc2hvZUgsXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke2JvYn1weCkgcm90YXRlKCR7cm90fWRlZykgc2tld1goJHstc2tld31kZWcpIHNjYWxlKCR7cHVzaH0pYCxcbiAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc1MCUgODAlJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFNob2UgaWQ9XCJzaG9lMVwiIHdpZHRoPXtzaG9lV30gc2hlZW49e2ludGVycG9sYXRlKGYsIFsyMCwgNzBdLCBbMCwgMV0sIHsgZXh0cmFwb2xhdGVMZWZ0OiAnY2xhbXAnLCBleHRyYXBvbGF0ZVJpZ2h0OiAnY2xhbXAnIH0pfSAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBMb3dlci10aGlyZCBzdWJ0aXRsZS4gT24gOToxNiBpdCBzaXRzIGFzIGxvdyBhcyB0aGUgZGVsaXZlcnkgcnVsZXMgYWxsb3dcbiAgICAgICAgICAoaXRzIGJvdHRvbSBlZGdlIHN0YXlzIGFib3ZlIHRoZSBib3R0b20tMzUlIG5vLXRleHQgem9uZSkuICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGJvdHRvbTogY2FwQm90dG9tLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIHBhZGRpbmc6IGAkezAuMTQgKiBjYXBTaXplfXB4ICR7Y2FwUGFkWH1weCAkezAuMTggKiBjYXBTaXplfXB4YCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMC4xNiAqIGNhcFNpemUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyLDQsMTAsMC43MiknLFxuICAgICAgICAgICAgYmFja2Ryb3BGaWx0ZXI6IGBibHVyKCR7MTggKiB1fXB4KWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwICR7MTggKiB1fXB4ICR7NjAgKiB1fXB4IHJnYmEoMCwwLDAsMC41NSksIGluc2V0IDAgMCAwICR7MS41ICogdX1weCByZ2JhKDI1NSwyNTUsMjU1LDAuMDgpYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IGJveCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIGJveCkgKiAyNCAqIHV9cHgpIHNjYWxlKCR7aW50ZXJwb2xhdGUoYm94LCBbMCwgMV0sIFswLjk0LCAxXSl9KWAsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGRhdGEtbGF5ZXI9XCJjYXB0aW9uXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBjYXBTaXplLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA5MDAsXG4gICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wNGVtJyxcbiAgICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgICAgY29sb3I6IElOSyxcbiAgICAgICAgICAgICAgbWF4V2lkdGg6IFcgLSAyICogY2FwTWFyZ2luIC0gMiAqIGNhcFBhZFgsXG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIG9wYWNpdHk6IGNhcCxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gY2FwKSAqIDYwfSUpYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgUnVuIHRoZSBjaXR5XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZGF0YS1sYXllcj1cImFjY2VudFwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7YmFyICogMTAwfSVgLFxuICAgICAgICAgICAgICBoZWlnaHQ6IDYgKiB1LFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAke1RFQUx9LCAke09SQU5HRX0pYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxWaWduZXR0ZSBzdHJlbmd0aD17MC41NX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAyIFx1MjAxNCBEZXRhaWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdDI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgVywgSCwgdSwgZnBzLCBhc3BlY3QsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIC8vIE1hY3JvIGNsb3NlLXVwIG9mIHRoZSBzb2xlLCBzbG93IHRyYWNraW5nIG1vdmUgYWxvbmcgdGhlIGhlZWwuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMi4zLCBXICogMy40LCBXICogMi43KTtcbiAgY29uc3QgcyA9IHNob2VXIC8gNjQwO1xuICBjb25zdCBheCA9IFcgLyAyO1xuICBjb25zdCBheSA9IHBpY2soSCAqIDAuNjQsIEggKiAwLjcsIEggKiAwLjY4KTtcbiAgY29uc3QgY3ggPSBpbnRlcnBvbGF0ZShmLCBbMCwgMTIwXSwgWzE1MCwgMzAwXSwgeyBlYXNpbmc6IFNPRlQgfSk7XG4gIGNvbnN0IHpvb21TID0gc3ByaW5nKHsgZnJhbWU6IGYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDIwMCB9LCBkdXJhdGlvbkluRnJhbWVzOiA0MCB9KTtcbiAgY29uc3Qgem9vbSA9IGludGVycG9sYXRlKHpvb21TLCBbMCwgMV0sIFsxLjE0LCAxXSk7XG4gIGNvbnN0IHNoZWVuID0gaW50ZXJwb2xhdGUoZiwgWzgsIDkwXSwgWzAsIDFdLCB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJywgZWFzaW5nOiBTT0ZUIH0pO1xuXG4gIC8vIFdvcmRtYXJrOiBhYnNlbnQgYXQgMDowMywgZnVsbHkgdmlzaWJsZSBieSAwOjA0LjUuXG4gIGNvbnN0IHdtID0gZWFzZShmLCAxNCwgNDYpO1xuICAvLyBQb3N0ZXIgc2NhbGU6IDEuNnguIFRyYWNraW5nIHRpZ2h0ZW5lZCBmcm9tIDAuMmVtIHRvIDAuMDRlbSBzbyB0aGVcbiAgLy8gaGVhdmllciwgbGFyZ2VyIHdvcmRtYXJrIHN0aWxsIHNpdHMgaW5zaWRlIHRoZSA5OjE2IGZyYW1lLlxuICBjb25zdCB3bVNpemUgPSBwaWNrKDI0MCwgMTg5LCAxNjYgKiB1KTtcbiAgY29uc3Qgd21TdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9XG4gICAgYXNwZWN0ID09PSAnbGFuZHNjYXBlJ1xuICAgICAgPyB7IGxlZnQ6IFcgKiAwLjA0LCB0b3A6IEggKiAwLjA4IH1cbiAgICAgIDogYXNwZWN0ID09PSAncG9ydHJhaXQnXG4gICAgICAgID8geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiBIICogMC4xNywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfVxuICAgICAgICA6IHsgbGVmdDogVyAqIDAuMDUsIHRvcDogSCAqIDAuMDYgfTtcblxuICAvLyBQcmljZSB0YWc6IGluIGZyb20gMDowMy4xLCBoZWxkIHRvIHRoZSBjdXQuXG4gIGNvbnN0IHRhZ0luID0gc3ByaW5nKHsgZnJhbWU6IGYgLSA0LCBmcHMsIGNvbmZpZzogeyBkYW1waW5nOiAxMywgc3RpZmZuZXNzOiAxNzAsIG1hc3M6IDAuOCB9IH0pO1xuICBjb25zdCB0YWdPcCA9IGVhc2UoZiwgNCwgMTIpO1xuICBjb25zdCB0YWdTaXplID0gcGljaygxNTQsIDE2MCwgMTI4ICogdSk7XG4gIGNvbnN0IHRhZ1BvczogUmVhY3QuQ1NTUHJvcGVydGllcyA9XG4gICAgYXNwZWN0ID09PSAnbGFuZHNjYXBlJ1xuICAgICAgPyB7IHJpZ2h0OiBXICogMC4wNSwgdG9wOiBIICogMC40NCB9XG4gICAgICA6IGFzcGVjdCA9PT0gJ3BvcnRyYWl0J1xuICAgICAgICA/IHsgbGVmdDogMCwgcmlnaHQ6IDAsIHRvcDogSCAqIDAuNDMsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH1cbiAgICAgICAgOiB7IHJpZ2h0OiBXICogMC4wNSwgdG9wOiBIICogMC4zNiB9O1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnIzAyMDQwYScsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgIDxDaXR5IGlkPVwiczJcIiBkaW09ezAuMzV9IGJsdXI9ezE0ICogdX0gZHJpZnQ9ezAuNn0gLz5cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDcwJSA3NSUsIHJnYmEoMjQ5LDExNSwyMiwwLjI4KSAwJSwgcmdiYSgyNDksMTE1LDIyLDApIDU1JSksIHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDIwJSAzMCUsIHJnYmEoMjAsMTg0LDE2NiwwLjIyKSAwJSwgcmdiYSgyMCwxODQsMTY2LDApIDUwJSknLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGF4LCB0b3A6IGF5IH19PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cInByb2R1Y3RcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IGByb3RhdGUoLTNkZWcpIHNjYWxlKCR7em9vbX0pIHRyYW5zbGF0ZSgkey1jeCAqIHN9cHgsICR7LTIxNCAqIHN9cHgpYCxcbiAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzAgMCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxTaG9lIGlkPVwic2hvZTJcIiB3aWR0aD17c2hvZVd9IHNoZWVuPXtzaGVlbn0gc2hhZG93PXtmYWxzZX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIHsvKiBsZWdpYmlsaXR5IGdyYWRpZW50IGF0IHRoZSB0b3AgKi99XG4gICAgICA8QWJzb2x1dGVGaWxsXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMiw0LDEwLDAuNzUpIDAlLCByZ2JhKDIsNCwxMCwwKSA0NSUpJyxcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIC4uLndtU3R5bGUgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwid29yZG1hcmtcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgZm9udFNpemU6IHdtU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDkwMCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ2l0YWxpYycsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnMC4wNGVtJyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBhc3BlY3QgPT09ICdwb3J0cmFpdCcgPyAnLTAuMDRlbScgOiAwLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiBJTkssXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IHdtLFxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigkeygxIC0gd20pICogMTJ9cHgpYCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIHdtKSAqIDMwICogdX1weClgLFxuICAgICAgICAgICAgY2xpcFBhdGg6IGBpbnNldCgtMjAlICR7KDEgLSB3bSkgKiAxMDB9JSAtMjAlIC01JSlgLFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogJzAgOHB4IDUwcHggcmdiYSgwLDAsMCwwLjYpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgS0VTVFJFTFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAuLi50YWdQb3MgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBnYXA6IHRhZ1NpemUgKiAwLjI4LFxuICAgICAgICAgICAgcGFkZGluZzogYCR7dGFnU2l6ZSAqIDAuMjJ9cHggJHt0YWdTaXplICogMC40Mn1weCAke3RhZ1NpemUgKiAwLjIyfXB4ICR7dGFnU2l6ZSAqIDAuNjJ9cHhgLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsICNmYjkyM2MgMCUsICNlYTU4MGMgMTAwJSknLFxuICAgICAgICAgICAgY2xpcFBhdGg6IGBwb2x5Z29uKCR7dGFnU2l6ZSAqIDAuMzZ9cHggMCwgMTAwJSAwLCAxMDAlIDEwMCUsICR7dGFnU2l6ZSAqIDAuMzZ9cHggMTAwJSwgMCA1MCUpYCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGFnU2l6ZSAqIDAuMDgsXG4gICAgICAgICAgICBvcGFjaXR5OiB0YWdPcCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7aW50ZXJwb2xhdGUodGFnSW4sIFswLCAxXSwgWzAuNiwgMV0pfSkgcm90YXRlKCR7aW50ZXJwb2xhdGUodGFnSW4sIFswLCAxXSwgWy04LCAtMl0pfWRlZylgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCUgNTAlJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMjBweCA2MHB4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHdpZHRoOiB0YWdTaXplICogMC4xNixcbiAgICAgICAgICAgICAgaGVpZ2h0OiB0YWdTaXplICogMC4xNixcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMwYjEyMjAnLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6ICdpbnNldCAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjYpJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkYXRhLWxheWVyPVwicHJpY2VcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgICAgZm9udFNpemU6IHRhZ1NpemUsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDkwMCxcbiAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjA0ZW0nLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgICBjb2xvcjogJyMwYjEyMjAnLFxuICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgZm9udFZhcmlhbnROdW1lcmljOiAndGFidWxhci1udW1zJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgXHUyMEFDMTQ5XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8VmlnbmV0dGUgc3RyZW5ndGg9ezAuNX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAzIFx1MjAxNCBDYWxsIHRvIGFjdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdDM6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgVywgSCwgdSwgZnBzLCBhc3BlY3QsIHBpY2sgfSA9IHVzZUxheW91dCgpO1xuXG4gIGNvbnN0IHNob2VXID0gcGljayhXICogMC40LCBXICogMC42NiwgVyAqIDAuNjIpO1xuICBjb25zdCBzaG9lSCA9IHNob2VXICogU0hPRV9SQVRJTztcbiAgY29uc3Qgc2N4ID0gcGljayhXICogMC43NiwgVyAqIDAuNSwgVyAqIDAuNSk7XG4gIGNvbnN0IHNjeSA9IHBpY2soSCAqIDAuMzYsIEggKiAwLjI3NSwgSCAqIDAuMzMpO1xuICBjb25zdCByaXNlID0gc3ByaW5nKHsgZnJhbWU6IGYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDE2LCBtYXNzOiAwLjkgfSB9KTtcbiAgY29uc3QgZmxvYXQgPSBNYXRoLnNpbihmIC8gMTgpICogOCAqIHU7XG4gIGNvbnN0IHRpbHQgPSBpbnRlcnBvbGF0ZShyaXNlLCBbMCwgMV0sIFstMTYsIC02XSkgKyBNYXRoLnNpbihmIC8gMzApICogMS4yO1xuXG4gIGNvbnN0IGhlYWQgPSBlYXNlKGYsIDgsIDMwKTtcbiAgY29uc3QgYnRuID0gZWFzZShmLCAyNiwgNDgpO1xuICBjb25zdCBzaGVlblQgPSBmID4gNTAgPyBtb2QoZiAtIDUwLCA2MCkgLyA2MCA6IC0xO1xuICBjb25zdCBzeCA9IHNoZWVuVCA8IDAgPyAtNDAgOiBpbnRlcnBvbGF0ZShzaGVlblQsIFswLCAxXSwgWy0zMCwgMTMwXSk7XG4gIGNvbnN0IHB1bHNlID0gZiA+IDQ4ID8gMC41ICsgMC41ICogTWF0aC5zaW4oKGYgLSA0OCkgLyA5KSA6IDA7XG5cbiAgLy8gUG9zdGVyIHNjYWxlOiAxLjZ4IHRoZSBvcmlnaW5hbCBzaXplcywgYWxsIDkwMCB3ZWlnaHQuXG4gIGNvbnN0IHdtU2l6ZSA9IHBpY2soMTA5LCAxMjgsIDk2ICogdSk7XG4gIGNvbnN0IGhlYWRTaXplID0gcGljaygyNDAsIDE2MCwgMTM0ICogdSk7XG4gIC8vIEZ1bGwtd2lkdGggaW5zdGFsbCBiYXIuIDE2OjkgYW5kIDE6MSBwaW4gaXQgdG8gdGhlIGJvdHRvbSBlZGdlOyBvbiA5OjE2IHRoZVxuICAvLyBzdG9yeWJvYXJkIGZvcmJpZHMgdGV4dCBpbiB0aGUgYm90dG9tIDM1JSwgc28gaXQgcGlucyB0byB0aGF0IGxpbmUgaW5zdGVhZC5cbiAgY29uc3QgYmFySW5zZXQgPSBwaWNrKFcgKiAwLjA0LCBXICogMC4wMywgVyAqIDAuMDMpO1xuICBjb25zdCBiYXJCb3R0b20gPSBwaWNrKEggKiAwLjA1LCBIICogMC4zNywgSCAqIDAuMDUpO1xuICAvLyAxLjZ4IHRhcmdldCAoMTIyIC8gMTE1IC8gMTAyKSwgY2FwcGVkIHNvIFwiR2V0IGVhcmx5IGFjY2Vzc1wiIHN0YXlzIG9uIG9uZVxuICAvLyBsaW5lIGluc2lkZSB0aGUgYmFyIG9uIHRoZSAxMDgwLXdpZGUgY3V0cyAofjEwLjRlbSBpbmNsLiBwYWRkaW5nKS5cbiAgY29uc3QgYnRuU2l6ZSA9IE1hdGgubWluKHBpY2soMTIyLCAxMTUsIDEwMiAqIHUpLCAoVyAtIDIgKiBiYXJJbnNldCkgLyAxMC40KTtcbiAgY29uc3QgYnRuUGFkWSA9IGJ0blNpemUgKiAwLjU7XG4gIGNvbnN0IGJ0blBhZFggPSBidG5TaXplICogMC40O1xuICBjb25zdCBvcGVuID0gZWFzZShmLCAyNiwgNDYpO1xuXG4gIGNvbnN0IGNvbExlZnQgPSBXICogMC4wNDtcbiAgY29uc3QgY2VudGVyZWQgPSBhc3BlY3QgIT09ICdsYW5kc2NhcGUnO1xuICBjb25zdCB3bVRvcCA9IHBpY2soSCAqIDAuMDgsIEggKiAwLjE0NSwgSCAqIDAuMDYpO1xuICAvLyBIZWFkbGluZSBzdGFja3MgZGlyZWN0bHkgYWJvdmUgdGhlIGJhciwgYW5jaG9yZWQgYnkgaXRzIGJvdHRvbSBlZGdlLlxuICBjb25zdCBoZWFkQm90dG9tID0gYmFyQm90dG9tICsgYnRuU2l6ZSArIDIgKiBidG5QYWRZICsgcGljaygzNiwgMzYsIDI4KSAqIHU7XG5cbiAgY29uc3QgYmxvY2sgPSAocG9zOiB7IHRvcD86IG51bWJlcjsgYm90dG9tPzogbnVtYmVyIH0pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+XG4gICAgY2VudGVyZWRcbiAgICAgID8geyBwb3NpdGlvbjogJ2Fic29sdXRlJywgLi4ucG9zLCBsZWZ0OiAwLCByaWdodDogMCwgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfVxuICAgICAgOiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAuLi5wb3MsIGxlZnQ6IGNvbExlZnQgfTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgYmFja2dyb3VuZDogJyMwMjA0MGEnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICA8Q2l0eSBpZD1cInMzXCIgZGltPXswLjU1fSBibHVyPXs2ICogdX0gZHJpZnQ9ezAuNH0gLz5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBzY3ggLSBzaG9lVyxcbiAgICAgICAgICB0b3A6IHNjeSAtIHNob2VXICogMC43NSxcbiAgICAgICAgICB3aWR0aDogc2hvZVcgKiAyLFxuICAgICAgICAgIGhlaWdodDogc2hvZVcgKiAxLjUsXG4gICAgICAgICAgYmFja2dyb3VuZDpcbiAgICAgICAgICAgICdyYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCBjZW50ZXIsIHJnYmEoMjAsMTg0LDE2NiwwLjM4KSAwJSwgcmdiYSgyMCwxODQsMTY2LDAuMDgpIDQwJSwgcmdiYSgyMCwxODQsMTY2LDApIDY1JSknLFxuICAgICAgICAgIG9wYWNpdHk6IHJpc2UsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIG9yYml0IHJpbmcgKi99XG4gICAgICA8c3ZnXG4gICAgICAgIHdpZHRoPXtzaG9lVyAqIDEuM31cbiAgICAgICAgaGVpZ2h0PXtzaG9lVyAqIDAuNDJ9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogc2N4IC0gc2hvZVcgKiAwLjY1LFxuICAgICAgICAgIHRvcDogc2N5ICsgc2hvZUggKiAwLjE4LFxuICAgICAgICAgIG92ZXJmbG93OiAndmlzaWJsZScsXG4gICAgICAgICAgb3BhY2l0eTogcmlzZSAqIDAuOSxcbiAgICAgICAgfX1cbiAgICAgICAgdmlld0JveD1cIjAgMCAxMDAgMzJcIlxuICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiXG4gICAgICAgIGRhdGEtbGF5ZXI9XCJyaW5nXCJcbiAgICAgID5cbiAgICAgICAgPGVsbGlwc2UgY3g9XCI1MFwiIGN5PVwiMTZcIiByeD1cIjQ4XCIgcnk9XCIxMlwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPXtPUkFOR0V9IHN0cm9rZVdpZHRoPVwiMC41XCIgb3BhY2l0eT1cIjAuN1wiIC8+XG4gICAgICAgIDxlbGxpcHNlXG4gICAgICAgICAgY3g9XCI1MFwiXG4gICAgICAgICAgY3k9XCIxNlwiXG4gICAgICAgICAgcng9XCI0OFwiXG4gICAgICAgICAgcnk9XCIxMlwiXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHN0cm9rZT1cIiNmZGJhNzRcIlxuICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMVwiXG4gICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PVwiMzAgMjcwXCJcbiAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PXstZiAqIDEuNn1cbiAgICAgICAgLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogc2N4IC0gc2hvZVcgLyAyLFxuICAgICAgICAgIHRvcDogc2N5IC0gc2hvZUggLyAyLFxuICAgICAgICAgIHdpZHRoOiBzaG9lVyxcbiAgICAgICAgICBoZWlnaHQ6IHNob2VILFxuICAgICAgICAgIG9wYWNpdHk6IGludGVycG9sYXRlKHJpc2UsIFswLCAwLjRdLCBbMCwgMV0sIHsgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJyB9KSxcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7KDEgLSByaXNlKSAqIEggKiAwLjI1ICsgZmxvYXR9cHgpIHJvdGF0ZSgke3RpbHR9ZGVnKSBzY2FsZSgke2ludGVycG9sYXRlKHJpc2UsIFswLCAxXSwgWzAuODYsIDFdKX0pYCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFNob2UgaWQ9XCJzaG9lM1wiIHdpZHRoPXtzaG9lV30gc2hlZW49e2ludGVycG9sYXRlKGYsIFszMCwgMTEwXSwgWzAsIDFdLCB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJyB9KX0gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogV29yZG1hcmsgXHUyMDE0IG9uIHNjcmVlbiBmb3IgdGhlIHdob2xlIHNob3QgKi99XG4gICAgICA8ZGl2IHN0eWxlPXtibG9jayh7IHRvcDogd21Ub3AgfSl9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cIndvcmRtYXJrXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRTaXplOiB3bVNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA5MDAsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdpdGFsaWMnLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJzAuMDRlbScsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogY2VudGVyZWQgPyAnLTAuMDRlbScgOiAwLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiBJTkssXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgS0VTVFJFTFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSGVhZGxpbmUgKi99XG4gICAgICA8ZGl2IHN0eWxlPXtibG9jayh7IGJvdHRvbTogaGVhZEJvdHRvbSB9KX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nQm90dG9tOiBoZWFkU2l6ZSAqIDAuMDggfX0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZGF0YS1sYXllcj1cImhlYWRsaW5lXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBoZWFkU2l6ZSxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogOTAwLFxuICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDQ1ZW0nLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAwLjkyLFxuICAgICAgICAgICAgICBjb2xvcjogSU5LLFxuICAgICAgICAgICAgICBtYXhXaWR0aDogcGljayhXICogMC43LCBXICogMC45MiwgVyAqIDAuOTIpLFxuICAgICAgICAgICAgICB0ZXh0QWxpZ246IGNlbnRlcmVkID8gJ2NlbnRlcicgOiAnbGVmdCcsXG4gICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3JtYWwnLFxuICAgICAgICAgICAgICBvcGFjaXR5OiBoZWFkLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7KDEgLSBoZWFkKSAqIDEwMH0lKWAsXG4gICAgICAgICAgICAgIHRleHRTaGFkb3c6ICcwIDhweCA1MHB4IHJnYmEoMCwwLDAsMC42KScsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIE91dCAyOCBOb3ZlbWJlclxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSW5zdGFsbC1iYXIgQ1RBIFx1MjAxNCBmdWxsIHdpZHRoLCBmdWxseSB2aXNpYmxlIGJ5IDA6MDguNiAqL31cbiAgICAgIHthc3BlY3QgIT09ICdwb3J0cmFpdCcgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBIICogMC4zMixcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDIsNCwxMCwwKSAwJSwgcmdiYSgyLDQsMTAsMC44NSkgMTAwJSknLFxuICAgICAgICAgICAgb3BhY2l0eTogYnRuLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGJhckluc2V0LFxuICAgICAgICAgIHJpZ2h0OiBiYXJJbnNldCxcbiAgICAgICAgICBib3R0b206IGJhckJvdHRvbSxcbiAgICAgICAgICBvcGFjaXR5OiBidG4sXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gYnRuKSAqIDI0ICogdX1weClgLFxuICAgICAgICAgIGNsaXBQYXRoOiBgaW5zZXQoLTQwJSAkeygxIC0gb3BlbikgKiAzMH0lIC00MCUgJHsoMSAtIG9wZW4pICogMzB9JSByb3VuZCAke2J0blNpemUgKiAwLjV9cHgpYCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJidXR0b25cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250U2l6ZTogYnRuU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDkwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wM2VtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogJyMwYjEyMjAnLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIHBhZGRpbmc6IGAke2J0blBhZFl9cHggJHtidG5QYWRYfXB4YCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogYnRuU2l6ZSAqIDAuNDIsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDEwMGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAke3N4IC0gMTB9JSwgcmdiYSgyNTUsMjU1LDI1NSwwLjYpICR7c3h9JSwgcmdiYSgyNTUsMjU1LDI1NSwwKSAke3N4ICsgMTB9JSksIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZGJhNzQgMCUsICR7T1JBTkdFfSA0NSUsICNlYTU4MGMgMTAwJSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAkezE2ICogdX1weCAkezUwICogdX1weCByZ2JhKDI0OSwxMTUsMjIsJHswLjMgKyBwdWxzZSAqIDAuM30pLCBpbnNldCAwICR7MiAqIHV9cHggMCByZ2JhKDI1NSwyNTUsMjU1LDAuNTUpLCBpbnNldCAwIC0kezQgKiB1fXB4IDAgcmdiYSgxMjQsNDUsMTgsMC4zNSlgLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBHZXQgZWFybHkgYWNjZXNzXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8VmlnbmV0dGUgc3RyZW5ndGg9ezAuNX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBWaWRlbygpIHtcbiAgY29uc3QgW3MxLCBzMiwgczNdID0gY29tcG9zaXRpb24uc2hvdHM7XG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnIzAyMDQwYScsIGZvbnRGYW1pbHk6IEZPTlQgfX0+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czEuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czEuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czEudGl0bGV9PlxuICAgICAgICA8U2hvdDEgLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czIuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czIuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czIudGl0bGV9PlxuICAgICAgICA8U2hvdDIgLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czMuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czMuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czMudGl0bGV9PlxuICAgICAgICA8U2hvdDMgLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsV0FBTyxVQUFVLFdBQVcsaUJBQWlCLE9BQU87QUFBQTtBQUFBOzs7QUNBcEQ7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixVQUFVO0FBQUE7QUFBQTs7O0FDQXZEO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsbUJBQW1CO0FBQUE7QUFBQTs7O0FDQWhFLG1CQUFrQjtBQUNsQixzQkFRTztBQXFGQztBQW5GRCxJQUFNLGNBQWM7QUFBQSxFQUN6QixLQUFLO0FBQUEsRUFDTCxrQkFBa0I7QUFBQSxFQUNsQixPQUFPO0FBQUEsSUFDTCxFQUFFLEdBQUcsR0FBRyxPQUFPLGdCQUFnQixNQUFNLEdBQUcsa0JBQWtCLEdBQUc7QUFBQSxJQUM3RCxFQUFFLEdBQUcsR0FB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
