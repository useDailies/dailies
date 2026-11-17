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

// workspaces/kestrel-runner-launch-spot-a3eb/versions/v2/Video.tsx
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
var C = {
  night0: "#03060d",
  night1: "#07111f",
  night2: "#0c1a2e",
  teal: "#14b8a6",
  tealLight: "#5eead4",
  tealDeep: "#0f766e",
  tealInk: "#042f2e",
  orange: "#f97316",
  orangeLight: "#fdba74",
  orangeDeep: "#c2410c",
  ink: "#f8fafc"
};
var EASE_OUT = import_remotion.Easing.bezier(0.16, 1, 0.3, 1);
var clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
var rand = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
var useLayout = () => {
  const { width: w, height: h } = (0, import_remotion.useVideoConfig)();
  const aspect = w / h;
  const mode = aspect > 1.3 ? "land" : aspect < 0.8 ? "port" : "square";
  const s = Math.min(w, h) / 1080;
  return { w, h, mode, s };
};
var MIDSOLE = "M30 214 C30 196 48 188 76 188 L300 194 C400 197 480 196 530 200 C566 203 590 216 590 234 C590 244 586 248 578 248 L60 248 C40 248 30 234 30 214 Z";
var OUTSOLE = "M34 236 L590 236 C590 254 566 268 530 268 L86 268 C56 268 36 256 34 236 Z";
var UPPER = "M54 200 C48 160 52 116 72 86 C84 68 108 60 128 66 C140 70 146 82 160 92 C178 104 200 108 226 106 C270 104 312 116 352 134 C410 160 470 170 522 178 C560 184 584 196 582 206 L60 206 Z";
var Shoe = ({ id, viewBox = "0 0 600 300", sheen = -1, style, preserve = "xMidYMid meet" }) => {
  const eyelets = [0, 1, 2, 3, 4].map((i) => {
    const t = i / 4;
    return { x: 214 + t * 150, y: 110 + t * 34 };
  });
  const treads = Array.from({ length: 22 }, (_, i) => 74 + i * 22);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox, preserveAspectRatio: preserve, style: { display: "block", overflow: "visible", ...style }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-upper`, x1: "0", y1: "0", x2: "0.15", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#2dd4bf" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.55", stopColor: C.teal }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.tealDeep })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-mid`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: C.orangeLight }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.35", stopColor: C.orange }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#ea580c" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-out`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#ea580c" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.orangeDeep })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-sheen`, x1: "0", y1: "0", x2: "1", y2: "0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#fff", stopOpacity: "0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.5", stopColor: "#fff", stopOpacity: "0.75" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#fff", stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: `${id}-mesh`, width: "7", height: "7", patternUnits: "userSpaceOnUse", patternTransform: "rotate(30)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "2", cy: "2", r: "1.1", fill: "#ecfeff", opacity: "0.22" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("clipPath", { id: `${id}-sole`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: MIDSOLE }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: OUTSOLE })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: `${id}-upperclip`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: UPPER }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M196 106 C196 82 214 68 238 72 C252 75 260 90 266 112 Z", fill: "#115e59" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: UPPER, fill: `url(#${id}-upper)` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: `url(#${id}-upperclip)`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "0", y: "0", width: "600", height: "300", fill: `url(#${id}-mesh)` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40 210 C44 160 50 120 68 90 C84 120 104 160 134 210 Z", fill: C.tealDeep, opacity: "0.85" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440 158 C490 168 546 176 574 192 C588 200 588 210 584 214 L424 214 C414 192 418 170 440 158 Z", fill: "#0d9488" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M128 192 C220 150 330 136 470 170 C350 152 240 166 150 204 Z", fill: C.tealLight, opacity: "0.9" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M168 200 C250 172 340 164 440 184 C350 176 260 184 186 208 Z", fill: C.orange, opacity: "0.95" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M86 112 C150 108 230 118 320 140", stroke: "#fff", strokeOpacity: "0.28", strokeWidth: "4", fill: "none", strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M84 80 C100 64 126 62 140 74 C150 84 158 92 172 98 C150 104 120 102 100 94 C92 90 86 86 84 80 Z", fill: C.tealInk }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M58 96 C56 80 62 68 74 62 L82 76 C72 80 66 88 66 98 Z", fill: C.orange }),
    eyelets.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: p.x, cy: p.y + 4, r: "4", fill: C.tealInk }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M${p.x - 6} ${p.y - 12} L${p.x + 10} ${p.y + 12}`, stroke: "#ecfeff", strokeWidth: "7", strokeLinecap: "round" })
    ] }, i)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: OUTSOLE, fill: `url(#${id}-out)` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: MIDSOLE, fill: `url(#${id}-mid)` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M58 208 C200 214 400 216 566 220", stroke: C.orangeLight, strokeOpacity: "0.8", strokeWidth: "3", fill: "none" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M48 230 C200 234 420 236 584 238", stroke: "#9a3412", strokeOpacity: "0.45", strokeWidth: "2", fill: "none" }),
    [110, 190, 270, 350, 430, 510].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: x, cy: "226", rx: "22", ry: "6", fill: "#ea580c", opacity: "0.45" }, x)),
    treads.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x, y: "256", width: "11", height: "10", rx: "2", fill: "#7c2d12", opacity: "0.75" }, x)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { clipPath: `url(#${id}-sole)`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: -120 + sheen * 720, y: "180", width: "110", height: "100", fill: `url(#${id}-sheen)`, transform: `skewX(-20)` }) })
  ] });
};
var buildRow = (seed, total, minH, maxH, minW, maxW) => {
  const out = [];
  let x = -40;
  let i = 0;
  while (x < total) {
    const bw = minW + rand(seed + i) * (maxW - minW);
    const bh = minH + Math.pow(rand(seed + i + 500), 1.4) * (maxH - minH);
    out.push({ x, w: bw, h: bh, lit: rand(seed + i + 900), antenna: rand(seed + i + 77) > 0.82 });
    x += bw + rand(seed + i + 1300) * 6;
    i++;
  }
  return out;
};
var City = ({ id, horizon, globalFrame, dim = 0, glow = C.teal, glowY = 0.45 }) => {
  const { w, h, s } = useLayout();
  const extra = 600 * s;
  const far = buildRow(11, w + extra, horizon * 0.22, horizon * 0.62, 50 * s, 150 * s);
  const near = buildRow(57, w + extra, horizon * 0.12, horizon * 0.42, 70 * s, 190 * s);
  const farShift = -globalFrame * 0.35 * s;
  const nearShift = -globalFrame * 0.9 * s;
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: rand(i + 3e3) * w,
    y: rand(i + 4e3) * horizon * 0.5,
    r: (0.6 + rand(i + 5e3) * 1.4) * s,
    tw: 0.35 + 0.65 * Math.abs(Math.sin(globalFrame / 18 + i))
  }));
  const cell = 14 * s;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { "data-layer": "background", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: `linear-gradient(180deg, ${C.night0} 0%, ${C.night1} ${horizon / h * 55}%, ${C.night2} ${horizon / h * 100}%, ${C.night0} 100%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: `radial-gradient(ellipse ${w * 0.7}px ${h * 0.45}px at 50% ${glowY * 100}%, ${glow}33 0%, transparent 70%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: w, height: h, style: { position: "absolute", inset: 0 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: `${id}-winA`, width: cell, height: cell * 1.4, patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: cell * 0.3, y: cell * 0.35, width: cell * 0.35, height: cell * 0.55, fill: "#fcd34d", opacity: "0.55" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", { id: `${id}-winB`, width: cell * 1.3, height: cell * 1.7, patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: cell * 0.4, y: cell * 0.5, width: cell * 0.4, height: cell * 0.6, fill: C.tealLight, opacity: "0.4" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `${id}-haze`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: C.orange, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: C.orange, stopOpacity: "0.22" })
        ] })
      ] }),
      stars.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: st.x, cy: st.y, r: st.r, fill: "#e2e8f0", opacity: st.tw * 0.6 }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `translate(${farShift % (extra * 0.5)} 0)`, children: far.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: b.x, y: horizon - b.h, width: b.w, height: b.h, fill: "#0e1d33" }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 0, y: horizon * 0.55, width: w, height: horizon * 0.45, fill: `url(#${id}-haze)` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `translate(${nearShift % (extra * 0.8)} 0)`, children: near.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: b.x, y: horizon - b.h, width: b.w, height: b.h, fill: "#08111f" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            x: b.x + 6 * s,
            y: horizon - b.h + 10 * s,
            width: Math.max(0, b.w - 12 * s),
            height: Math.max(0, b.h - 10 * s),
            fill: `url(#${id}-${b.lit > 0.5 ? "winA" : "winB"})`,
            opacity: 0.25 + b.lit * 0.6
          }
        ),
        b.antenna && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: b.x + b.w / 2 - 1.5 * s, y: horizon - b.h - 40 * s, width: 3 * s, height: 40 * s, fill: "#08111f" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "circle",
            {
              cx: b.x + b.w / 2,
              cy: horizon - b.h - 40 * s,
              r: 4 * s,
              fill: "#ef4444",
              opacity: Math.floor(globalFrame / 15 + i) % 2 === 0 ? 0.95 : 0.25
            }
          )
        ] })
      ] }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 0, y: horizon, width: w, height: h - horizon, fill: "#04080f" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 0, y: horizon, width: w, height: 2 * s, fill: C.orange, opacity: "0.35" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { style: { background: C.night0, opacity: dim } })
  ] });
};
var Vignette = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  import_remotion.AbsoluteFill,
  {
    style: {
      pointerEvents: "none",
      background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)"
    }
  }
);
var ShotHero = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { w, h, mode, s } = useLayout();
  const L = {
    land: { shoeW: 1100 * s, shoeLeft: 450 * s, shoeTop: 250 * s, capTop: 880 * s, capSize: 112 * s, capAlign: "left", capLeft: 140 * s },
    port: { shoeW: 960 * s, shoeLeft: 50 * s, shoeTop: h * 0.3, capTop: h * 0.3 + 520 * s, capSize: 112 * s, capAlign: "center", capLeft: 0 },
    square: { shoeW: 880 * s, shoeLeft: 90 * s, shoeTop: 190 * s, capTop: 740 * s, capSize: 108 * s, capAlign: "center", capLeft: 0 }
  }[mode];
  const shoeH = L.shoeW / 2;
  const horizon = L.shoeTop + shoeH * 0.893;
  const p = (0, import_remotion.interpolate)(f, [0, 26], [0, 1], { ...clamp, easing: EASE_OUT });
  const drift = (0, import_remotion.interpolate)(f, [26, 90], [0, 22 * s], clamp);
  const left = (0, import_remotion.interpolate)(p, [0, 1], [-L.shoeW - 160 * s, L.shoeLeft]) + drift;
  const tilt = (1 - p) * -9;
  const skew = (1 - p) * -14;
  const blur = (1 - p) * 10;
  const bob = Math.sin(f / 14) * 3 * s * p;
  const capP = (0, import_remotion.interpolate)(f, [8, 26], [0, 1], { ...clamp, easing: EASE_OUT });
  const streaks = Array.from({ length: 9 }, (_, i) => {
    const y = L.shoeTop + shoeH * (0.15 + rand(i + 60) * 0.7);
    const len = (240 + rand(i + 70) * 420) * s;
    const speed = 70 + rand(i + 80) * 50;
    const x = -len + (f * speed * s + rand(i + 90) * w) % (w + len);
    return { y, len, x, o: (0, import_remotion.interpolate)(f, [0, 20, 40], [0.9, 0.6, 0.12], clamp) * (0.4 + rand(i + 99) * 0.6) };
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(City, { id: "c1", horizon, globalFrame: f, glowY: horizon / h - 0.1 }),
    streaks.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "speed-lines",
        style: {
          position: "absolute",
          left: st.x,
          top: st.y,
          width: st.len,
          height: 2 * s,
          borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${i % 3 === 0 ? C.orange : C.tealLight})`,
          opacity: st.o
        }
      },
      i
    )),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: left + L.shoeW * 0.06,
          top: horizon - 14 * s,
          width: L.shoeW * 0.9,
          height: 30 * s,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85), transparent 70%)",
          opacity: p
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "product",
        style: {
          position: "absolute",
          left,
          top: L.shoeTop + bob,
          width: L.shoeW,
          height: shoeH,
          transform: `rotate(${tilt}deg) skewX(${skew}deg)`,
          transformOrigin: "80% 90%",
          filter: `blur(${blur}px) drop-shadow(0 ${30 * s}px ${40 * s}px rgba(20,184,166,0.25))`
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { id: "s1", style: { width: "100%", height: "100%" }, sheen: (0, import_remotion.interpolate)(f, [30, 70], [-0.2, 1.2], clamp) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          top: L.capTop,
          left: L.capLeft,
          right: L.capAlign === "center" ? 0 : void 0,
          textAlign: L.capAlign
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            "data-layer": "caption",
            style: {
              display: "inline-block",
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: L.capSize,
              lineHeight: 1,
              letterSpacing: `${(0, import_remotion.interpolate)(capP, [0, 1], [0.04, -0.035])}em`,
              color: C.ink,
              whiteSpace: "nowrap",
              opacity: capP,
              transform: `translateY(${(1 - capP) * 40 * s}px)`,
              textShadow: `0 ${6 * s}px ${30 * s}px rgba(0,0,0,0.6)`
            },
            children: "Run the city"
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {})
  ] });
};
var ShotDetail = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { fps } = (0, import_remotion.useVideoConfig)();
  const { w, h, mode, s } = useLayout();
  const global = f + 90;
  const baseVW = { land: 300, port: 230, square: 260 }[mode];
  const settle = (0, import_remotion.spring)({ frame: f, fps, config: { damping: 200, stiffness: 90 } });
  const vw = baseVW * (0, import_remotion.interpolate)(settle, [0, 1], [1.25, 1]) * (0, import_remotion.interpolate)(f, [0, 120], [1, 0.93]);
  const vh = vw * (h / w);
  const cx = (0, import_remotion.interpolate)(f, [0, 120], [425, 450]);
  const cy = 228;
  const viewBox = `${cx - vw / 2} ${cy - vh / 2} ${vw} ${vh}`;
  const wm = (0, import_remotion.interpolate)(f, [18, 48], [0, 1], { ...clamp, easing: EASE_OUT });
  const tagIn = (0, import_remotion.interpolate)(f, [4, 16], [0, 1], { ...clamp, easing: EASE_OUT });
  const swing = f < 4 ? 0 : 9 * Math.exp(-(f - 4) / 16) * Math.cos((f - 4) / 3.6);
  const W = {
    land: { wmTop: 850 * s, wmSize: 150 * s, wmAlign: "left", wmLeft: 130 * s, tagRight: 170 * s, tagTop: 120 * s },
    // 9:16 safe band is 14%–65% of the height: wordmark sits on the dark sky above the shoe,
    // the tag hangs on a short string just below it.
    port: { wmTop: h * 0.16, wmSize: 128 * s, wmAlign: "center", wmLeft: 0, tagRight: 90 * s, tagTop: h * 0.3 },
    square: { wmTop: 790 * s, wmSize: 118 * s, wmAlign: "center", wmLeft: 0, tagRight: 80 * s, tagTop: 100 * s }
  }[mode];
  const spacing = (0, import_remotion.interpolate)(wm, [0, 1], [0.32, 0.14]);
  const stringLen = mode === "port" ? 110 * s : W.tagTop + 20 * s;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { overflow: "hidden", background: C.night0 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(City, { id: "c2", horizon: h * 0.86, globalFrame: global, dim: 0.55, glow: C.orange, glowY: 0.55 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: `radial-gradient(ellipse ${w * 0.6}px ${h * 0.35}px at 55% 58%, ${C.orange}40, transparent 70%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { "data-layer": "product", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Shoe,
      {
        id: "s2",
        viewBox,
        preserve: "xMidYMid slice",
        sheen: (0, import_remotion.interpolate)(f, [14, 80], [-0.2, 1.2], { ...clamp, easing: import_remotion.Easing.inOut(import_remotion.Easing.cubic) }),
        style: { width: w, height: h, filter: `drop-shadow(0 ${24 * s}px ${50 * s}px rgba(0,0,0,0.6))` }
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: { background: "linear-gradient(180deg, transparent 58%, rgba(3,6,13,0.85) 82%, rgba(3,6,13,0.95) 100%)" }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "absolute",
          right: W.tagRight,
          top: W.tagTop - stringLen,
          transformOrigin: `50% 0`,
          transform: `translateY(${(1 - tagIn) * -260 * s}px) rotate(${swing}deg)`,
          opacity: tagIn,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 2 * s, height: stringLen, background: "linear-gradient(180deg, transparent, #e2e8f0)" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              style: {
                position: "relative",
                padding: `${34 * s}px ${44 * s}px ${26 * s}px`,
                background: "linear-gradient(160deg, #ffffff, #e2e8f0)",
                borderRadius: 16 * s,
                boxShadow: `0 ${20 * s}px ${50 * s}px rgba(0,0,0,0.5)`,
                borderTop: `${8 * s}px solid ${C.orange}`
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: 10 * s,
                      left: "50%",
                      width: 14 * s,
                      height: 14 * s,
                      marginLeft: -7 * s,
                      borderRadius: "50%",
                      background: "#94a3b8"
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "span",
                  {
                    "data-layer": "price",
                    style: {
                      display: "block",
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 84 * s,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: "#0b1220",
                      fontVariantNumeric: "tabular-nums",
                      whiteSpace: "nowrap"
                    },
                    children: "\u20AC149"
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          top: W.wmTop,
          left: W.wmLeft,
          right: W.wmAlign === "center" ? 0 : void 0,
          textAlign: W.wmAlign
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            "data-layer": "wordmark",
            style: {
              display: "inline-block",
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: W.wmSize,
              lineHeight: 1,
              letterSpacing: `${spacing}em`,
              marginRight: W.wmAlign === "center" ? `-${spacing}em` : 0,
              color: C.ink,
              whiteSpace: "nowrap",
              opacity: wm,
              filter: `blur(${(1 - wm) * 14 * s}px)`,
              textShadow: `0 0 ${40 * s}px ${C.orange}55`
            },
            children: "KESTREL"
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: { background: C.orange, opacity: (0, import_remotion.interpolate)(f, [0, 8], [0.35, 0], clamp), mixBlendMode: "screen" }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {})
  ] });
};
var ShotCTA = () => {
  const f = (0, import_remotion.useCurrentFrame)();
  const { fps } = (0, import_remotion.useVideoConfig)();
  const { w, h, mode, s } = useLayout();
  const global = f + 210;
  const L = {
    land: {
      align: "left",
      left: 140 * s,
      wmTop: 250 * s,
      wmSize: 44 * s,
      hlTop: 340 * s,
      hlSize: 112 * s,
      btnTop: 540 * s,
      shoeW: 820 * s,
      shoeLeft: w - 860 * s,
      shoeTop: 330 * s
    },
    port: {
      align: "center",
      left: 0,
      wmTop: h * 0.17,
      wmSize: 40 * s,
      hlTop: h * 0.455,
      hlSize: 96 * s,
      btnTop: h * 0.54,
      shoeW: 860 * s,
      shoeLeft: (w - 860 * s) / 2,
      shoeTop: h * 0.215
    },
    square: {
      align: "center",
      left: 0,
      wmTop: 80 * s,
      wmSize: 38 * s,
      hlTop: 600 * s,
      hlSize: 96 * s,
      btnTop: 760 * s,
      shoeW: 780 * s,
      shoeLeft: (w - 780 * s) / 2,
      shoeTop: 150 * s
    }
  }[mode];
  const shoeH = L.shoeW / 2;
  const shoeIn = (0, import_remotion.spring)({ frame: f, fps, config: { damping: 18, stiffness: 110, mass: 0.9 } });
  const float = Math.sin(f / 20) * 8 * s;
  const hl = (0, import_remotion.spring)({ frame: f - 6, fps, config: { damping: 200, stiffness: 120 } });
  const bar = (0, import_remotion.interpolate)(f, [16, 40], [0, 1], { ...clamp, easing: EASE_OUT });
  const btn = (0, import_remotion.spring)({ frame: f - 26, fps, config: { damping: 16, stiffness: 140 }, durationInFrames: 22 });
  const btnOpacity = (0, import_remotion.interpolate)(f, [26, 38], [0, 1], clamp);
  const shine = (0, import_remotion.interpolate)(f, [60, 95], [130, -30], { ...clamp, easing: import_remotion.Easing.inOut(import_remotion.Easing.cubic) });
  const wmSpacing = (0, import_remotion.interpolate)(f, [0, 40], [0.62, 0.48], { ...clamp, easing: EASE_OUT });
  const block = (top) => ({
    position: "absolute",
    top,
    left: L.left,
    right: L.align === "center" ? 0 : void 0,
    textAlign: L.align
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(City, { id: "c3", horizon: h * 0.94, globalFrame: global, dim: 0.62, glow: C.teal, glowY: 0.4 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: `radial-gradient(circle ${Math.max(w, h) * 0.38}px at ${(L.shoeLeft + L.shoeW / 2) / w * 100}% ${(L.shoeTop + shoeH / 2) / h * 100}%, ${C.teal}38, transparent 70%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: L.shoeLeft + L.shoeW * 0.1,
          top: L.shoeTop + shoeH * 0.95,
          width: L.shoeW * 0.8,
          height: 26 * s,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.8), transparent 70%)",
          opacity: shoeIn,
          transform: `scaleX(${1 - float / (80 * s)})`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "product",
        style: {
          position: "absolute",
          left: L.shoeLeft,
          top: L.shoeTop + float,
          width: L.shoeW,
          height: shoeH,
          opacity: (0, import_remotion.interpolate)(shoeIn, [0, 0.3], [0, 1], clamp),
          transform: `translateY(${(1 - shoeIn) * 80 * s}px) rotate(${(0, import_remotion.interpolate)(shoeIn, [0, 1], [8, -4])}deg) scale(${(0, import_remotion.interpolate)(shoeIn, [0, 1], [0.86, 1])})`,
          filter: `drop-shadow(0 ${30 * s}px ${50 * s}px rgba(20,184,166,0.35))`
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shoe, { id: "s3", style: { width: "100%", height: "100%" }, sheen: (0, import_remotion.interpolate)(f, [40, 90], [-0.2, 1.2], clamp) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: block(L.wmTop), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "wordmark",
        style: {
          display: "inline-block",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: L.wmSize,
          lineHeight: 1,
          letterSpacing: `${wmSpacing}em`,
          marginRight: L.align === "center" ? `-${wmSpacing}em` : 0,
          color: C.tealLight,
          whiteSpace: "nowrap"
        },
        children: "KESTREL"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...block(L.hlTop), paddingBottom: 12 * s }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "inline-block", overflow: "hidden", padding: `${8 * s}px ${4 * s}px` }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          "data-layer": "headline",
          style: {
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: L.hlSize,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: C.ink,
            whiteSpace: "nowrap",
            transform: `translateY(${(1 - hl) * 110}%)`
          },
          children: "Out 28 November"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          "data-layer": "accent",
          style: {
            height: 6 * s,
            width: 140 * s,
            marginTop: 10 * s,
            marginLeft: L.align === "center" ? "auto" : 4 * s,
            marginRight: L.align === "center" ? "auto" : void 0,
            borderRadius: 3 * s,
            background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`,
            transform: `scaleX(${bar})`,
            transformOrigin: L.align === "center" ? "50% 50%" : "0 50%"
          }
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: block(L.btnTop), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "button",
        style: {
          display: "inline-block",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 44 * s,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: "#1c0a02",
          whiteSpace: "nowrap",
          padding: `${32 * s}px ${60 * s}px`,
          borderRadius: 999,
          backgroundImage: `linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.65) 50%, transparent 60%), linear-gradient(180deg, ${C.orangeLight}, ${C.orange})`,
          backgroundSize: "250% 100%, 100% 100%",
          backgroundPosition: `${shine}% 0, 0 0`,
          backgroundRepeat: "no-repeat",
          boxShadow: `0 ${18 * s}px ${44 * s}px rgba(249,115,22,0.4), inset 0 ${2 * s}px 0 rgba(255,255,255,0.5)`,
          opacity: btnOpacity,
          transform: `translateY(${(1 - btn) * 30 * s}px) scale(${(0, import_remotion.interpolate)(btn, [0, 1], [0.86, 1])})`,
          transformOrigin: L.align === "center" ? "50% 50%" : "0 50%"
        },
        children: "Get early access"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {})
  ] });
};
function Video() {
  const [s1, s2, s3] = composition.shots;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: C.night0, fontFamily: FONT }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s1.from, durationInFrames: s1.durationInFrames, name: s1.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotHero, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s2.from, durationInFrames: s2.durationInFrames, name: s2.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotDetail, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s3.from, durationInFrames: s3.durationInFrames, name: s3.title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotCTA, {}) })
  ] });
}
export {
  composition,
  Video as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9rZXN0cmVsLXJ1bm5lci1sYXVuY2gtc3BvdC1hM2ViL3ZlcnNpb25zL3YyL1ZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZW1vdGlvblwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdC9qc3gtcnVudGltZVwiXTsiLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBTZXF1ZW5jZSxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIENvbXBvc2l0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgY29uc3QgY29tcG9zaXRpb24gPSB7XG4gIGZwczogMzAsXG4gIGR1cmF0aW9uSW5GcmFtZXM6IDM2MCxcbiAgc2hvdHM6IFtcbiAgICB7IG46IDEsIHRpdGxlOiAnUHJvZHVjdCBoZXJvJywgZnJvbTogMCwgZHVyYXRpb25JbkZyYW1lczogOTAgfSxcbiAgICB7IG46IDIsIHRpdGxlOiAnRGV0YWlsJywgZnJvbTogOTAsIGR1cmF0aW9uSW5GcmFtZXM6IDEyMCB9LFxuICAgIHsgbjogMywgdGl0bGU6ICdDYWxsIHRvIGFjdGlvbicsIGZyb206IDIxMCwgZHVyYXRpb25JbkZyYW1lczogMTUwIH0sXG4gIF0sXG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIERlc2lnbiB0b2tlbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGT05UID0gJ3VpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5cbmNvbnN0IEMgPSB7XG4gIG5pZ2h0MDogJyMwMzA2MGQnLFxuICBuaWdodDE6ICcjMDcxMTFmJyxcbiAgbmlnaHQyOiAnIzBjMWEyZScsXG4gIHRlYWw6ICcjMTRiOGE2JyxcbiAgdGVhbExpZ2h0OiAnIzVlZWFkNCcsXG4gIHRlYWxEZWVwOiAnIzBmNzY2ZScsXG4gIHRlYWxJbms6ICcjMDQyZjJlJyxcbiAgb3JhbmdlOiAnI2Y5NzMxNicsXG4gIG9yYW5nZUxpZ2h0OiAnI2ZkYmE3NCcsXG4gIG9yYW5nZURlZXA6ICcjYzI0MTBjJyxcbiAgaW5rOiAnI2Y4ZmFmYycsXG59O1xuXG5jb25zdCBFQVNFX09VVCA9IEVhc2luZy5iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbmNvbnN0IGNsYW1wID0geyBleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsIGV4dHJhcG9sYXRlUmlnaHQ6ICdjbGFtcCcgfSBhcyBjb25zdDtcblxuLyoqIERldGVybWluaXN0aWMgaGFzaCBpbiBbMCwgMSkuICovXG5jb25zdCByYW5kID0gKGk6IG51bWJlcikgPT4ge1xuICBjb25zdCB4ID0gTWF0aC5zaW4oaSAqIDEyNy4xICsgMzExLjcpICogNDM3NTguNTQ1MztcbiAgcmV0dXJuIHggLSBNYXRoLmZsb29yKHgpO1xufTtcblxudHlwZSBNb2RlID0gJ2xhbmQnIHwgJ3BvcnQnIHwgJ3NxdWFyZSc7XG5cbmNvbnN0IHVzZUxheW91dCA9ICgpID0+IHtcbiAgY29uc3QgeyB3aWR0aDogdywgaGVpZ2h0OiBoIH0gPSB1c2VWaWRlb0NvbmZpZygpO1xuICBjb25zdCBhc3BlY3QgPSB3IC8gaDtcbiAgY29uc3QgbW9kZTogTW9kZSA9IGFzcGVjdCA+IDEuMyA/ICdsYW5kJyA6IGFzcGVjdCA8IDAuOCA/ICdwb3J0JyA6ICdzcXVhcmUnO1xuICBjb25zdCBzID0gTWF0aC5taW4odywgaCkgLyAxMDgwO1xuICByZXR1cm4geyB3LCBoLCBtb2RlLCBzIH07XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob2UgYXJ0d29yayAodmlld0JveCAwIDAgNjAwIDMwMCwgdG9lIHBvaW50aW5nIHJpZ2h0KSAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBNSURTT0xFID1cbiAgJ00zMCAyMTQgQzMwIDE5NiA0OCAxODggNzYgMTg4IEwzMDAgMTk0IEM0MDAgMTk3IDQ4MCAxOTYgNTMwIDIwMCBDNTY2IDIwMyA1OTAgMjE2IDU5MCAyMzQgQzU5MCAyNDQgNTg2IDI0OCA1NzggMjQ4IEw2MCAyNDggQzQwIDI0OCAzMCAyMzQgMzAgMjE0IFonO1xuY29uc3QgT1VUU09MRSA9ICdNMzQgMjM2IEw1OTAgMjM2IEM1OTAgMjU0IDU2NiAyNjggNTMwIDI2OCBMODYgMjY4IEM1NiAyNjggMzYgMjU2IDM0IDIzNiBaJztcbmNvbnN0IFVQUEVSID1cbiAgJ001NCAyMDAgQzQ4IDE2MCA1MiAxMTYgNzIgODYgQzg0IDY4IDEwOCA2MCAxMjggNjYgQzE0MCA3MCAxNDYgODIgMTYwIDkyIEMxNzggMTA0IDIwMCAxMDggMjI2IDEwNiBDMjcwIDEwNCAzMTIgMTE2IDM1MiAxMzQgQzQxMCAxNjAgNDcwIDE3MCA1MjIgMTc4IEM1NjAgMTg0IDU4NCAxOTYgNTgyIDIwNiBMNjAgMjA2IFonO1xuXG5jb25zdCBTaG9lOiBSZWFjdC5GQzx7XG4gIGlkOiBzdHJpbmc7XG4gIHZpZXdCb3g/OiBzdHJpbmc7XG4gIHNoZWVuPzogbnVtYmVyOyAvLyAtMC4yIC4uIDEuMiBwb3NpdGlvbiBvZiB0aGUgbGlnaHQgc3dlZXAgYWNyb3NzIHRoZSBzb2xlXG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgcHJlc2VydmU/OiBzdHJpbmc7XG59PiA9ICh7IGlkLCB2aWV3Qm94ID0gJzAgMCA2MDAgMzAwJywgc2hlZW4gPSAtMSwgc3R5bGUsIHByZXNlcnZlID0gJ3hNaWRZTWlkIG1lZXQnIH0pID0+IHtcbiAgY29uc3QgZXllbGV0cyA9IFswLCAxLCAyLCAzLCA0XS5tYXAoKGkpID0+IHtcbiAgICBjb25zdCB0ID0gaSAvIDQ7XG4gICAgcmV0dXJuIHsgeDogMjE0ICsgdCAqIDE1MCwgeTogMTEwICsgdCAqIDM0IH07XG4gIH0pO1xuICBjb25zdCB0cmVhZHMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyMiB9LCAoXywgaSkgPT4gNzQgKyBpICogMjIpO1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmlld0JveD17dmlld0JveH0gcHJlc2VydmVBc3BlY3RSYXRpbz17cHJlc2VydmV9IHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93OiAndmlzaWJsZScsIC4uLnN0eWxlIH19PlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9LXVwcGVyYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwLjE1XCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMyZGQ0YmZcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuNTVcIiBzdG9wQ29sb3I9e0MudGVhbH0gLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtDLnRlYWxEZWVwfSAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfS1taWRgfSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPXtDLm9yYW5nZUxpZ2h0fSAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuMzVcIiBzdG9wQ29sb3I9e0Mub3JhbmdlfSAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZWE1ODBjXCIgLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPXtgJHtpZH0tb3V0YH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNlYTU4MGNcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9e0Mub3JhbmdlRGVlcH0gLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPXtgJHtpZH0tc2hlZW5gfSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjFcIiB5Mj1cIjBcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZmZlwiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41XCIgc3RvcENvbG9yPVwiI2ZmZlwiIHN0b3BPcGFjaXR5PVwiMC43NVwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8cGF0dGVybiBpZD17YCR7aWR9LW1lc2hgfSB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIiBwYXR0ZXJuVHJhbnNmb3JtPVwicm90YXRlKDMwKVwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIyXCIgY3k9XCIyXCIgcj1cIjEuMVwiIGZpbGw9XCIjZWNmZWZmXCIgb3BhY2l0eT1cIjAuMjJcIiAvPlxuICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgIDxjbGlwUGF0aCBpZD17YCR7aWR9LXNvbGVgfT5cbiAgICAgICAgICA8cGF0aCBkPXtNSURTT0xFfSAvPlxuICAgICAgICAgIDxwYXRoIGQ9e09VVFNPTEV9IC8+XG4gICAgICAgIDwvY2xpcFBhdGg+XG4gICAgICAgIDxjbGlwUGF0aCBpZD17YCR7aWR9LXVwcGVyY2xpcGB9PlxuICAgICAgICAgIDxwYXRoIGQ9e1VQUEVSfSAvPlxuICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgPC9kZWZzPlxuXG4gICAgICB7LyogdG9uZ3VlICovfVxuICAgICAgPHBhdGggZD1cIk0xOTYgMTA2IEMxOTYgODIgMjE0IDY4IDIzOCA3MiBDMjUyIDc1IDI2MCA5MCAyNjYgMTEyIFpcIiBmaWxsPVwiIzExNWU1OVwiIC8+XG4gICAgICB7LyogdXBwZXIgKi99XG4gICAgICA8cGF0aCBkPXtVUFBFUn0gZmlsbD17YHVybCgjJHtpZH0tdXBwZXIpYH0gLz5cbiAgICAgIDxnIGNsaXBQYXRoPXtgdXJsKCMke2lkfS11cHBlcmNsaXApYH0+XG4gICAgICAgIDxyZWN0IHg9XCIwXCIgeT1cIjBcIiB3aWR0aD1cIjYwMFwiIGhlaWdodD1cIjMwMFwiIGZpbGw9e2B1cmwoIyR7aWR9LW1lc2gpYH0gLz5cbiAgICAgICAgey8qIGhlZWwgY291bnRlciAqL31cbiAgICAgICAgPHBhdGggZD1cIk00MCAyMTAgQzQ0IDE2MCA1MCAxMjAgNjggOTAgQzg0IDEyMCAxMDQgMTYwIDEzNCAyMTAgWlwiIGZpbGw9e0MudGVhbERlZXB9IG9wYWNpdHk9XCIwLjg1XCIgLz5cbiAgICAgICAgey8qIHRvZSBjYXAgKi99XG4gICAgICAgIDxwYXRoIGQ9XCJNNDQwIDE1OCBDNDkwIDE2OCA1NDYgMTc2IDU3NCAxOTIgQzU4OCAyMDAgNTg4IDIxMCA1ODQgMjE0IEw0MjQgMjE0IEM0MTQgMTkyIDQxOCAxNzAgNDQwIDE1OCBaXCIgZmlsbD1cIiMwZDk0ODhcIiAvPlxuICAgICAgICB7Lyogd2luZyBzdHJpcGVzICovfVxuICAgICAgICA8cGF0aCBkPVwiTTEyOCAxOTIgQzIyMCAxNTAgMzMwIDEzNiA0NzAgMTcwIEMzNTAgMTUyIDI0MCAxNjYgMTUwIDIwNCBaXCIgZmlsbD17Qy50ZWFsTGlnaHR9IG9wYWNpdHk9XCIwLjlcIiAvPlxuICAgICAgICA8cGF0aCBkPVwiTTE2OCAyMDAgQzI1MCAxNzIgMzQwIDE2NCA0NDAgMTg0IEMzNTAgMTc2IDI2MCAxODQgMTg2IDIwOCBaXCIgZmlsbD17Qy5vcmFuZ2V9IG9wYWNpdHk9XCIwLjk1XCIgLz5cbiAgICAgICAgey8qIGdsb3NzICovfVxuICAgICAgICA8cGF0aCBkPVwiTTg2IDExMiBDMTUwIDEwOCAyMzAgMTE4IDMyMCAxNDBcIiBzdHJva2U9XCIjZmZmXCIgc3Ryb2tlT3BhY2l0eT1cIjAuMjhcIiBzdHJva2VXaWR0aD1cIjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XG4gICAgICA8L2c+XG4gICAgICB7LyogY29sbGFyIG9wZW5pbmcgKi99XG4gICAgICA8cGF0aCBkPVwiTTg0IDgwIEMxMDAgNjQgMTI2IDYyIDE0MCA3NCBDMTUwIDg0IDE1OCA5MiAxNzIgOTggQzE1MCAxMDQgMTIwIDEwMiAxMDAgOTQgQzkyIDkwIDg2IDg2IDg0IDgwIFpcIiBmaWxsPXtDLnRlYWxJbmt9IC8+XG4gICAgICB7LyogaGVlbCBwdWxsIHRhYiAqL31cbiAgICAgIDxwYXRoIGQ9XCJNNTggOTYgQzU2IDgwIDYyIDY4IDc0IDYyIEw4MiA3NiBDNzIgODAgNjYgODggNjYgOTggWlwiIGZpbGw9e0Mub3JhbmdlfSAvPlxuICAgICAgey8qIGxhY2VzICovfVxuICAgICAge2V5ZWxldHMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgIDxnIGtleT17aX0+XG4gICAgICAgICAgPGNpcmNsZSBjeD17cC54fSBjeT17cC55ICsgNH0gcj1cIjRcIiBmaWxsPXtDLnRlYWxJbmt9IC8+XG4gICAgICAgICAgPHBhdGggZD17YE0ke3AueCAtIDZ9ICR7cC55IC0gMTJ9IEwke3AueCArIDEwfSAke3AueSArIDEyfWB9IHN0cm9rZT1cIiNlY2ZlZmZcIiBzdHJva2VXaWR0aD1cIjdcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiAvPlxuICAgICAgICA8L2c+XG4gICAgICApKX1cblxuICAgICAgey8qIG1pZHNvbGUgKyBvdXRzb2xlICovfVxuICAgICAgPHBhdGggZD17T1VUU09MRX0gZmlsbD17YHVybCgjJHtpZH0tb3V0KWB9IC8+XG4gICAgICA8cGF0aCBkPXtNSURTT0xFfSBmaWxsPXtgdXJsKCMke2lkfS1taWQpYH0gLz5cbiAgICAgIDxwYXRoIGQ9XCJNNTggMjA4IEMyMDAgMjE0IDQwMCAyMTYgNTY2IDIyMFwiIHN0cm9rZT17Qy5vcmFuZ2VMaWdodH0gc3Ryb2tlT3BhY2l0eT1cIjAuOFwiIHN0cm9rZVdpZHRoPVwiM1wiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNNDggMjMwIEMyMDAgMjM0IDQyMCAyMzYgNTg0IDIzOFwiIHN0cm9rZT1cIiM5YTM0MTJcIiBzdHJva2VPcGFjaXR5PVwiMC40NVwiIHN0cm9rZVdpZHRoPVwiMlwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgIHsvKiBmb2FtIHBvZHMgKi99XG4gICAgICB7WzExMCwgMTkwLCAyNzAsIDM1MCwgNDMwLCA1MTBdLm1hcCgoeCkgPT4gKFxuICAgICAgICA8ZWxsaXBzZSBrZXk9e3h9IGN4PXt4fSBjeT1cIjIyNlwiIHJ4PVwiMjJcIiByeT1cIjZcIiBmaWxsPVwiI2VhNTgwY1wiIG9wYWNpdHk9XCIwLjQ1XCIgLz5cbiAgICAgICkpfVxuICAgICAgey8qIHRyZWFkICovfVxuICAgICAge3RyZWFkcy5tYXAoKHgpID0+IChcbiAgICAgICAgPHJlY3Qga2V5PXt4fSB4PXt4fSB5PVwiMjU2XCIgd2lkdGg9XCIxMVwiIGhlaWdodD1cIjEwXCIgcng9XCIyXCIgZmlsbD1cIiM3YzJkMTJcIiBvcGFjaXR5PVwiMC43NVwiIC8+XG4gICAgICApKX1cbiAgICAgIHsvKiBsaWdodCBzd2VlcCBvdmVyIHRoZSBzb2xlICovfVxuICAgICAgPGcgY2xpcFBhdGg9e2B1cmwoIyR7aWR9LXNvbGUpYH0+XG4gICAgICAgIDxyZWN0IHg9ey0xMjAgKyBzaGVlbiAqIDcyMH0geT1cIjE4MFwiIHdpZHRoPVwiMTEwXCIgaGVpZ2h0PVwiMTAwXCIgZmlsbD17YHVybCgjJHtpZH0tc2hlZW4pYH0gdHJhbnNmb3JtPXtgc2tld1goLTIwKWB9IC8+XG4gICAgICA8L2c+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIE5pZ2h0IGNpdHkgYmFja2dyb3VuZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG50eXBlIEJ1aWxkaW5nID0geyB4OiBudW1iZXI7IHc6IG51bWJlcjsgaDogbnVtYmVyOyBsaXQ6IG51bWJlcjsgYW50ZW5uYTogYm9vbGVhbiB9O1xuXG5jb25zdCBidWlsZFJvdyA9IChzZWVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIG1pbkg6IG51bWJlciwgbWF4SDogbnVtYmVyLCBtaW5XOiBudW1iZXIsIG1heFc6IG51bWJlcikgPT4ge1xuICBjb25zdCBvdXQ6IEJ1aWxkaW5nW10gPSBbXTtcbiAgbGV0IHggPSAtNDA7XG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKHggPCB0b3RhbCkge1xuICAgIGNvbnN0IGJ3ID0gbWluVyArIHJhbmQoc2VlZCArIGkpICogKG1heFcgLSBtaW5XKTtcbiAgICBjb25zdCBiaCA9IG1pbkggKyBNYXRoLnBvdyhyYW5kKHNlZWQgKyBpICsgNTAwKSwgMS40KSAqIChtYXhIIC0gbWluSCk7XG4gICAgb3V0LnB1c2goeyB4LCB3OiBidywgaDogYmgsIGxpdDogcmFuZChzZWVkICsgaSArIDkwMCksIGFudGVubmE6IHJhbmQoc2VlZCArIGkgKyA3NykgPiAwLjgyIH0pO1xuICAgIHggKz0gYncgKyByYW5kKHNlZWQgKyBpICsgMTMwMCkgKiA2O1xuICAgIGkrKztcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuY29uc3QgQ2l0eTogUmVhY3QuRkM8e1xuICBpZDogc3RyaW5nO1xuICBob3Jpem9uOiBudW1iZXI7IC8vIHB4IGZyb20gdG9wXG4gIGdsb2JhbEZyYW1lOiBudW1iZXI7XG4gIGRpbT86IG51bWJlcjtcbiAgZ2xvdz86IHN0cmluZztcbiAgZ2xvd1k/OiBudW1iZXI7XG59PiA9ICh7IGlkLCBob3Jpem9uLCBnbG9iYWxGcmFtZSwgZGltID0gMCwgZ2xvdyA9IEMudGVhbCwgZ2xvd1kgPSAwLjQ1IH0pID0+IHtcbiAgY29uc3QgeyB3LCBoLCBzIH0gPSB1c2VMYXlvdXQoKTtcbiAgY29uc3QgZXh0cmEgPSA2MDAgKiBzO1xuICBjb25zdCBmYXIgPSBidWlsZFJvdygxMSwgdyArIGV4dHJhLCBob3Jpem9uICogMC4yMiwgaG9yaXpvbiAqIDAuNjIsIDUwICogcywgMTUwICogcyk7XG4gIGNvbnN0IG5lYXIgPSBidWlsZFJvdyg1NywgdyArIGV4dHJhLCBob3Jpem9uICogMC4xMiwgaG9yaXpvbiAqIDAuNDIsIDcwICogcywgMTkwICogcyk7XG4gIGNvbnN0IGZhclNoaWZ0ID0gLWdsb2JhbEZyYW1lICogMC4zNSAqIHM7XG4gIGNvbnN0IG5lYXJTaGlmdCA9IC1nbG9iYWxGcmFtZSAqIDAuOSAqIHM7XG4gIGNvbnN0IHN0YXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogNDAgfSwgKF8sIGkpID0+ICh7XG4gICAgeDogcmFuZChpICsgMzAwMCkgKiB3LFxuICAgIHk6IHJhbmQoaSArIDQwMDApICogaG9yaXpvbiAqIDAuNSxcbiAgICByOiAoMC42ICsgcmFuZChpICsgNTAwMCkgKiAxLjQpICogcyxcbiAgICB0dzogMC4zNSArIDAuNjUgKiBNYXRoLmFicyhNYXRoLnNpbihnbG9iYWxGcmFtZSAvIDE4ICsgaSkpLFxuICB9KSk7XG4gIGNvbnN0IGNlbGwgPSAxNCAqIHM7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIGRhdGEtbGF5ZXI9XCJiYWNrZ3JvdW5kXCI+XG4gICAgICA8QWJzb2x1dGVGaWxsXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgxODBkZWcsICR7Qy5uaWdodDB9IDAlLCAke0MubmlnaHQxfSAkeyhob3Jpem9uIC8gaCkgKiA1NX0lLCAke0MubmlnaHQyfSAkeyhob3Jpem9uIC8gaCkgKiAxMDB9JSwgJHtDLm5pZ2h0MH0gMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgJHt3ICogMC43fXB4ICR7aCAqIDAuNDV9cHggYXQgNTAlICR7Z2xvd1kgKiAxMDB9JSwgJHtnbG93fTMzIDAlLCB0cmFuc3BhcmVudCA3MCUpYCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8c3ZnIHdpZHRoPXt3fSBoZWlnaHQ9e2h9IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCB9fT5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPHBhdHRlcm4gaWQ9e2Ake2lkfS13aW5BYH0gd2lkdGg9e2NlbGx9IGhlaWdodD17Y2VsbCAqIDEuNH0gcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgIDxyZWN0IHg9e2NlbGwgKiAwLjN9IHk9e2NlbGwgKiAwLjM1fSB3aWR0aD17Y2VsbCAqIDAuMzV9IGhlaWdodD17Y2VsbCAqIDAuNTV9IGZpbGw9XCIjZmNkMzRkXCIgb3BhY2l0eT1cIjAuNTVcIiAvPlxuICAgICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgICA8cGF0dGVybiBpZD17YCR7aWR9LXdpbkJgfSB3aWR0aD17Y2VsbCAqIDEuM30gaGVpZ2h0PXtjZWxsICogMS43fSBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxuICAgICAgICAgICAgPHJlY3QgeD17Y2VsbCAqIDAuNH0geT17Y2VsbCAqIDAuNX0gd2lkdGg9e2NlbGwgKiAwLjR9IGhlaWdodD17Y2VsbCAqIDAuNn0gZmlsbD17Qy50ZWFsTGlnaHR9IG9wYWNpdHk9XCIwLjRcIiAvPlxuICAgICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfS1oYXplYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPXtDLm9yYW5nZX0gc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9e0Mub3JhbmdlfSBzdG9wT3BhY2l0eT1cIjAuMjJcIiAvPlxuICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDwvZGVmcz5cbiAgICAgICAge3N0YXJzLm1hcCgoc3QsIGkpID0+IChcbiAgICAgICAgICA8Y2lyY2xlIGtleT17aX0gY3g9e3N0Lnh9IGN5PXtzdC55fSByPXtzdC5yfSBmaWxsPVwiI2UyZThmMFwiIG9wYWNpdHk9e3N0LnR3ICogMC42fSAvPlxuICAgICAgICApKX1cbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7ZmFyU2hpZnQgJSAoZXh0cmEgKiAwLjUpfSAwKWB9PlxuICAgICAgICAgIHtmYXIubWFwKChiLCBpKSA9PiAoXG4gICAgICAgICAgICA8cmVjdCBrZXk9e2l9IHg9e2IueH0geT17aG9yaXpvbiAtIGIuaH0gd2lkdGg9e2Iud30gaGVpZ2h0PXtiLmh9IGZpbGw9XCIjMGUxZDMzXCIgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9nPlxuICAgICAgICA8cmVjdCB4PXswfSB5PXtob3Jpem9uICogMC41NX0gd2lkdGg9e3d9IGhlaWdodD17aG9yaXpvbiAqIDAuNDV9IGZpbGw9e2B1cmwoIyR7aWR9LWhhemUpYH0gLz5cbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bmVhclNoaWZ0ICUgKGV4dHJhICogMC44KX0gMClgfT5cbiAgICAgICAgICB7bmVhci5tYXAoKGIsIGkpID0+IChcbiAgICAgICAgICAgIDxnIGtleT17aX0+XG4gICAgICAgICAgICAgIDxyZWN0IHg9e2IueH0geT17aG9yaXpvbiAtIGIuaH0gd2lkdGg9e2Iud30gaGVpZ2h0PXtiLmh9IGZpbGw9XCIjMDgxMTFmXCIgLz5cbiAgICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgICB4PXtiLnggKyA2ICogc31cbiAgICAgICAgICAgICAgICB5PXtob3Jpem9uIC0gYi5oICsgMTAgKiBzfVxuICAgICAgICAgICAgICAgIHdpZHRoPXtNYXRoLm1heCgwLCBiLncgLSAxMiAqIHMpfVxuICAgICAgICAgICAgICAgIGhlaWdodD17TWF0aC5tYXgoMCwgYi5oIC0gMTAgKiBzKX1cbiAgICAgICAgICAgICAgICBmaWxsPXtgdXJsKCMke2lkfS0ke2IubGl0ID4gMC41ID8gJ3dpbkEnIDogJ3dpbkInfSlgfVxuICAgICAgICAgICAgICAgIG9wYWNpdHk9ezAuMjUgKyBiLmxpdCAqIDAuNn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAge2IuYW50ZW5uYSAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxyZWN0IHg9e2IueCArIGIudyAvIDIgLSAxLjUgKiBzfSB5PXtob3Jpem9uIC0gYi5oIC0gNDAgKiBzfSB3aWR0aD17MyAqIHN9IGhlaWdodD17NDAgKiBzfSBmaWxsPVwiIzA4MTExZlwiIC8+XG4gICAgICAgICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgICAgICAgIGN4PXtiLnggKyBiLncgLyAyfVxuICAgICAgICAgICAgICAgICAgICBjeT17aG9yaXpvbiAtIGIuaCAtIDQwICogc31cbiAgICAgICAgICAgICAgICAgICAgcj17NCAqIHN9XG4gICAgICAgICAgICAgICAgICAgIGZpbGw9XCIjZWY0NDQ0XCJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eT17TWF0aC5mbG9vcihnbG9iYWxGcmFtZSAvIDE1ICsgaSkgJSAyID09PSAwID8gMC45NSA6IDAuMjV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2c+XG4gICAgICAgIHsvKiBzdHJlZXQgLyBncm91bmQgcGxhbmUgKi99XG4gICAgICAgIDxyZWN0IHg9ezB9IHk9e2hvcml6b259IHdpZHRoPXt3fSBoZWlnaHQ9e2ggLSBob3Jpem9ufSBmaWxsPVwiIzA0MDgwZlwiIC8+XG4gICAgICAgIDxyZWN0IHg9ezB9IHk9e2hvcml6b259IHdpZHRoPXt3fSBoZWlnaHQ9ezIgKiBzfSBmaWxsPXtDLm9yYW5nZX0gb3BhY2l0eT1cIjAuMzVcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6IEMubmlnaHQwLCBvcGFjaXR5OiBkaW0gfX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbmNvbnN0IFZpZ25ldHRlOiBSZWFjdC5GQyA9ICgpID0+IChcbiAgPEFic29sdXRlRmlsbFxuICAgIHN0eWxlPXt7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICBiYWNrZ3JvdW5kOiAncmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgODUlIDc1JSBhdCA1MCUgNTAlLCB0cmFuc3BhcmVudCA1NSUsIHJnYmEoMCwwLDAsMC42KSAxMDAlKScsXG4gICAgfX1cbiAgLz5cbik7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAxIFx1MjAxNCBQcm9kdWN0IGhlcm8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdEhlcm86IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgdywgaCwgbW9kZSwgcyB9ID0gdXNlTGF5b3V0KCk7XG5cbiAgY29uc3QgTCA9IHtcbiAgICBsYW5kOiB7IHNob2VXOiAxMTAwICogcywgc2hvZUxlZnQ6IDQ1MCAqIHMsIHNob2VUb3A6IDI1MCAqIHMsIGNhcFRvcDogODgwICogcywgY2FwU2l6ZTogMTEyICogcywgY2FwQWxpZ246ICdsZWZ0JyBhcyBjb25zdCwgY2FwTGVmdDogMTQwICogcyB9LFxuICAgIHBvcnQ6IHsgc2hvZVc6IDk2MCAqIHMsIHNob2VMZWZ0OiA1MCAqIHMsIHNob2VUb3A6IGggKiAwLjMsIGNhcFRvcDogaCAqIDAuMyArIDUyMCAqIHMsIGNhcFNpemU6IDExMiAqIHMsIGNhcEFsaWduOiAnY2VudGVyJyBhcyBjb25zdCwgY2FwTGVmdDogMCB9LFxuICAgIHNxdWFyZTogeyBzaG9lVzogODgwICogcywgc2hvZUxlZnQ6IDkwICogcywgc2hvZVRvcDogMTkwICogcywgY2FwVG9wOiA3NDAgKiBzLCBjYXBTaXplOiAxMDggKiBzLCBjYXBBbGlnbjogJ2NlbnRlcicgYXMgY29uc3QsIGNhcExlZnQ6IDAgfSxcbiAgfVttb2RlXTtcblxuICBjb25zdCBzaG9lSCA9IEwuc2hvZVcgLyAyO1xuICBjb25zdCBob3Jpem9uID0gTC5zaG9lVG9wICsgc2hvZUggKiAwLjg5MztcblxuICBjb25zdCBwID0gaW50ZXJwb2xhdGUoZiwgWzAsIDI2XSwgWzAsIDFdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IEVBU0VfT1VUIH0pO1xuICBjb25zdCBkcmlmdCA9IGludGVycG9sYXRlKGYsIFsyNiwgOTBdLCBbMCwgMjIgKiBzXSwgY2xhbXApO1xuICBjb25zdCBsZWZ0ID0gaW50ZXJwb2xhdGUocCwgWzAsIDFdLCBbLUwuc2hvZVcgLSAxNjAgKiBzLCBMLnNob2VMZWZ0XSkgKyBkcmlmdDtcbiAgY29uc3QgdGlsdCA9ICgxIC0gcCkgKiAtOTtcbiAgY29uc3Qgc2tldyA9ICgxIC0gcCkgKiAtMTQ7XG4gIGNvbnN0IGJsdXIgPSAoMSAtIHApICogMTA7XG4gIGNvbnN0IGJvYiA9IE1hdGguc2luKGYgLyAxNCkgKiAzICogcyAqIHA7XG5cbiAgY29uc3QgY2FwUCA9IGludGVycG9sYXRlKGYsIFs4LCAyNl0sIFswLCAxXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFQVNFX09VVCB9KTtcblxuICBjb25zdCBzdHJlYWtzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOSB9LCAoXywgaSkgPT4ge1xuICAgIGNvbnN0IHkgPSBMLnNob2VUb3AgKyBzaG9lSCAqICgwLjE1ICsgcmFuZChpICsgNjApICogMC43KTtcbiAgICBjb25zdCBsZW4gPSAoMjQwICsgcmFuZChpICsgNzApICogNDIwKSAqIHM7XG4gICAgY29uc3Qgc3BlZWQgPSA3MCArIHJhbmQoaSArIDgwKSAqIDUwO1xuICAgIGNvbnN0IHggPSAtbGVuICsgKChmICogc3BlZWQgKiBzICsgcmFuZChpICsgOTApICogdykgJSAodyArIGxlbikpO1xuICAgIHJldHVybiB7IHksIGxlbiwgeCwgbzogaW50ZXJwb2xhdGUoZiwgWzAsIDIwLCA0MF0sIFswLjksIDAuNiwgMC4xMl0sIGNsYW1wKSAqICgwLjQgKyByYW5kKGkgKyA5OSkgKiAwLjYpIH07XG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICA8Q2l0eSBpZD1cImMxXCIgaG9yaXpvbj17aG9yaXpvbn0gZ2xvYmFsRnJhbWU9e2Z9IGdsb3dZPXtob3Jpem9uIC8gaCAtIDAuMX0gLz5cblxuICAgICAge3N0cmVha3MubWFwKChzdCwgaSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJzcGVlZC1saW5lc1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogc3QueCxcbiAgICAgICAgICAgIHRvcDogc3QueSxcbiAgICAgICAgICAgIHdpZHRoOiBzdC5sZW4sXG4gICAgICAgICAgICBoZWlnaHQ6IDIgKiBzLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAyLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsICR7aSAlIDMgPT09IDAgPyBDLm9yYW5nZSA6IEMudGVhbExpZ2h0fSlgLFxuICAgICAgICAgICAgb3BhY2l0eTogc3QubyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG5cbiAgICAgIHsvKiBjb250YWN0IHNoYWRvdyAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsZWZ0ICsgTC5zaG9lVyAqIDAuMDYsXG4gICAgICAgICAgdG9wOiBob3Jpem9uIC0gMTQgKiBzLFxuICAgICAgICAgIHdpZHRoOiBMLnNob2VXICogMC45LFxuICAgICAgICAgIGhlaWdodDogMzAgKiBzLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IGNlbnRlciwgcmdiYSgwLDAsMCwwLjg1KSwgdHJhbnNwYXJlbnQgNzAlKScsXG4gICAgICAgICAgb3BhY2l0eTogcCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtbGF5ZXI9XCJwcm9kdWN0XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0LFxuICAgICAgICAgIHRvcDogTC5zaG9lVG9wICsgYm9iLFxuICAgICAgICAgIHdpZHRoOiBMLnNob2VXLFxuICAgICAgICAgIGhlaWdodDogc2hvZUgsXG4gICAgICAgICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7dGlsdH1kZWcpIHNrZXdYKCR7c2tld31kZWcpYCxcbiAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc4MCUgOTAlJyxcbiAgICAgICAgICBmaWx0ZXI6IGBibHVyKCR7Ymx1cn1weCkgZHJvcC1zaGFkb3coMCAkezMwICogc31weCAkezQwICogc31weCByZ2JhKDIwLDE4NCwxNjYsMC4yNSkpYCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFNob2UgaWQ9XCJzMVwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19IHNoZWVuPXtpbnRlcnBvbGF0ZShmLCBbMzAsIDcwXSwgWy0wLjIsIDEuMl0sIGNsYW1wKX0gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgdG9wOiBMLmNhcFRvcCxcbiAgICAgICAgICBsZWZ0OiBMLmNhcExlZnQsXG4gICAgICAgICAgcmlnaHQ6IEwuY2FwQWxpZ24gPT09ICdjZW50ZXInID8gMCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0ZXh0QWxpZ246IEwuY2FwQWxpZ24sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiY2FwdGlvblwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGZvbnRTaXplOiBMLmNhcFNpemUsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogYCR7aW50ZXJwb2xhdGUoY2FwUCwgWzAsIDFdLCBbMC4wNCwgLTAuMDM1XSl9ZW1gLFxuICAgICAgICAgICAgY29sb3I6IEMuaW5rLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvcGFjaXR5OiBjYXBQLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gY2FwUCkgKiA0MCAqIHN9cHgpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IGAwICR7NiAqIHN9cHggJHszMCAqIHN9cHggcmdiYSgwLDAsMCwwLjYpYCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgUnVuIHRoZSBjaXR5XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8VmlnbmV0dGUgLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAyIFx1MjAxNCBEZXRhaWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdERldGFpbDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGYgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3QgeyBmcHMgfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG4gIGNvbnN0IHsgdywgaCwgbW9kZSwgcyB9ID0gdXNlTGF5b3V0KCk7XG4gIGNvbnN0IGdsb2JhbCA9IGYgKyA5MDtcblxuICBjb25zdCBiYXNlVlcgPSB7IGxhbmQ6IDMwMCwgcG9ydDogMjMwLCBzcXVhcmU6IDI2MCB9W21vZGVdO1xuICBjb25zdCBzZXR0bGUgPSBzcHJpbmcoeyBmcmFtZTogZiwgZnBzLCBjb25maWc6IHsgZGFtcGluZzogMjAwLCBzdGlmZm5lc3M6IDkwIH0gfSk7XG4gIGNvbnN0IHZ3ID0gYmFzZVZXICogaW50ZXJwb2xhdGUoc2V0dGxlLCBbMCwgMV0sIFsxLjI1LCAxXSkgKiBpbnRlcnBvbGF0ZShmLCBbMCwgMTIwXSwgWzEsIDAuOTNdKTtcbiAgY29uc3QgdmggPSB2dyAqIChoIC8gdyk7XG4gIGNvbnN0IGN4ID0gaW50ZXJwb2xhdGUoZiwgWzAsIDEyMF0sIFs0MjUsIDQ1MF0pO1xuICBjb25zdCBjeSA9IDIyODtcbiAgY29uc3Qgdmlld0JveCA9IGAke2N4IC0gdncgLyAyfSAke2N5IC0gdmggLyAyfSAke3Z3fSAke3ZofWA7XG5cbiAgLy8gV29yZG1hcms6IGFic2VudCBhdCBsb2NhbCAwLCBmdWxseSB2aXNpYmxlIGJ5IGxvY2FsIDQ4ICg8IDA6MDUpLlxuICBjb25zdCB3bSA9IGludGVycG9sYXRlKGYsIFsxOCwgNDhdLCBbMCwgMV0sIHsgLi4uY2xhbXAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG5cbiAgLy8gUHJpY2UgdGFnOiBkcm9wcyBpbiwgZnVsbHkgdmlzaWJsZSBieSBsb2NhbCAxNiwgc3RheXMgdGhyb3VnaCB0aGUgc2hvdC5cbiAgY29uc3QgdGFnSW4gPSBpbnRlcnBvbGF0ZShmLCBbNCwgMTZdLCBbMCwgMV0sIHsgLi4uY2xhbXAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG4gIGNvbnN0IHN3aW5nID0gZiA8IDQgPyAwIDogOSAqIE1hdGguZXhwKC0oZiAtIDQpIC8gMTYpICogTWF0aC5jb3MoKGYgLSA0KSAvIDMuNik7XG5cbiAgY29uc3QgVyA9IHtcbiAgICBsYW5kOiB7IHdtVG9wOiA4NTAgKiBzLCB3bVNpemU6IDE1MCAqIHMsIHdtQWxpZ246ICdsZWZ0JyBhcyBjb25zdCwgd21MZWZ0OiAxMzAgKiBzLCB0YWdSaWdodDogMTcwICogcywgdGFnVG9wOiAxMjAgKiBzIH0sXG4gICAgLy8gOToxNiBzYWZlIGJhbmQgaXMgMTQlXHUyMDEzNjUlIG9mIHRoZSBoZWlnaHQ6IHdvcmRtYXJrIHNpdHMgb24gdGhlIGRhcmsgc2t5IGFib3ZlIHRoZSBzaG9lLFxuICAgIC8vIHRoZSB0YWcgaGFuZ3Mgb24gYSBzaG9ydCBzdHJpbmcganVzdCBiZWxvdyBpdC5cbiAgICBwb3J0OiB7IHdtVG9wOiBoICogMC4xNiwgd21TaXplOiAxMjggKiBzLCB3bUFsaWduOiAnY2VudGVyJyBhcyBjb25zdCwgd21MZWZ0OiAwLCB0YWdSaWdodDogOTAgKiBzLCB0YWdUb3A6IGggKiAwLjMgfSxcbiAgICBzcXVhcmU6IHsgd21Ub3A6IDc5MCAqIHMsIHdtU2l6ZTogMTE4ICogcywgd21BbGlnbjogJ2NlbnRlcicgYXMgY29uc3QsIHdtTGVmdDogMCwgdGFnUmlnaHQ6IDgwICogcywgdGFnVG9wOiAxMDAgKiBzIH0sXG4gIH1bbW9kZV07XG5cbiAgY29uc3Qgc3BhY2luZyA9IGludGVycG9sYXRlKHdtLCBbMCwgMV0sIFswLjMyLCAwLjE0XSk7XG4gIGNvbnN0IHN0cmluZ0xlbiA9IG1vZGUgPT09ICdwb3J0JyA/IDExMCAqIHMgOiBXLnRhZ1RvcCArIDIwICogcztcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgb3ZlcmZsb3c6ICdoaWRkZW4nLCBiYWNrZ3JvdW5kOiBDLm5pZ2h0MCB9fT5cbiAgICAgIDxDaXR5IGlkPVwiYzJcIiBob3Jpem9uPXtoICogMC44Nn0gZ2xvYmFsRnJhbWU9e2dsb2JhbH0gZGltPXswLjU1fSBnbG93PXtDLm9yYW5nZX0gZ2xvd1k9ezAuNTV9IC8+XG4gICAgICA8QWJzb2x1dGVGaWxsXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChlbGxpcHNlICR7dyAqIDAuNn1weCAke2ggKiAwLjM1fXB4IGF0IDU1JSA1OCUsICR7Qy5vcmFuZ2V9NDAsIHRyYW5zcGFyZW50IDcwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cInByb2R1Y3RcIj5cbiAgICAgICAgPFNob2VcbiAgICAgICAgICBpZD1cInMyXCJcbiAgICAgICAgICB2aWV3Qm94PXt2aWV3Qm94fVxuICAgICAgICAgIHByZXNlcnZlPVwieE1pZFlNaWQgc2xpY2VcIlxuICAgICAgICAgIHNoZWVuPXtpbnRlcnBvbGF0ZShmLCBbMTQsIDgwXSwgWy0wLjIsIDEuMl0sIHsgLi4uY2xhbXAsIGVhc2luZzogRWFzaW5nLmluT3V0KEVhc2luZy5jdWJpYykgfSl9XG4gICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IHcsIGhlaWdodDogaCwgZmlsdGVyOiBgZHJvcC1zaGFkb3coMCAkezI0ICogc31weCAkezUwICogc31weCByZ2JhKDAsMCwwLDAuNikpYCB9fVxuICAgICAgICAvPlxuICAgICAgPC9BYnNvbHV0ZUZpbGw+XG4gICAgICB7LyogZmxvb3IgZmFkZSBzbyB0aGUgd29yZG1hcmsgc2l0cyBvbiBjbGVhbiBkYXJrICovfVxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgdHJhbnNwYXJlbnQgNTglLCByZ2JhKDMsNiwxMywwLjg1KSA4MiUsIHJnYmEoMyw2LDEzLDAuOTUpIDEwMCUpJyB9fVxuICAgICAgLz5cblxuICAgICAgey8qIGhhbmcgdGFnICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHJpZ2h0OiBXLnRhZ1JpZ2h0LFxuICAgICAgICAgIHRvcDogVy50YWdUb3AgLSBzdHJpbmdMZW4sXG4gICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBgNTAlIDBgLFxuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIHRhZ0luKSAqIC0yNjAgKiBzfXB4KSByb3RhdGUoJHtzd2luZ31kZWcpYCxcbiAgICAgICAgICBvcGFjaXR5OiB0YWdJbixcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDIgKiBzLCBoZWlnaHQ6IHN0cmluZ0xlbiwgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsIHRyYW5zcGFyZW50LCAjZTJlOGYwKScgfX0gLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIHBhZGRpbmc6IGAkezM0ICogc31weCAkezQ0ICogc31weCAkezI2ICogc31weGAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE2MGRlZywgI2ZmZmZmZiwgI2UyZThmMCknLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAxNiAqIHMsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwICR7MjAgKiBzfXB4ICR7NTAgKiBzfXB4IHJnYmEoMCwwLDAsMC41KWAsXG4gICAgICAgICAgICBib3JkZXJUb3A6IGAkezggKiBzfXB4IHNvbGlkICR7Qy5vcmFuZ2V9YCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgIHRvcDogMTAgKiBzLFxuICAgICAgICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgICAgICAgd2lkdGg6IDE0ICogcyxcbiAgICAgICAgICAgICAgaGVpZ2h0OiAxNCAqIHMsXG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IC03ICogcyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyM5NGEzYjgnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBkYXRhLWxheWVyPVwicHJpY2VcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogODAwLFxuICAgICAgICAgICAgICBmb250U2l6ZTogODQgKiBzLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDNlbScsXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzBiMTIyMCcsXG4gICAgICAgICAgICAgIGZvbnRWYXJpYW50TnVtZXJpYzogJ3RhYnVsYXItbnVtcycsXG4gICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBcdTIwQUMxNDlcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3A6IFcud21Ub3AsXG4gICAgICAgICAgbGVmdDogVy53bUxlZnQsXG4gICAgICAgICAgcmlnaHQ6IFcud21BbGlnbiA9PT0gJ2NlbnRlcicgPyAwIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRleHRBbGlnbjogVy53bUFsaWduLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cIndvcmRtYXJrXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgZm9udFdlaWdodDogOTAwLFxuICAgICAgICAgICAgZm9udFNpemU6IFcud21TaXplLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IGAke3NwYWNpbmd9ZW1gLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IFcud21BbGlnbiA9PT0gJ2NlbnRlcicgPyBgLSR7c3BhY2luZ31lbWAgOiAwLFxuICAgICAgICAgICAgY29sb3I6IEMuaW5rLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvcGFjaXR5OiB3bSxcbiAgICAgICAgICAgIGZpbHRlcjogYGJsdXIoJHsoMSAtIHdtKSAqIDE0ICogc31weClgLFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogYDAgMCAkezQwICogc31weCAke0Mub3JhbmdlfTU1YCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgS0VTVFJFTFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBDLm9yYW5nZSwgb3BhY2l0eTogaW50ZXJwb2xhdGUoZiwgWzAsIDhdLCBbMC4zNSwgMF0sIGNsYW1wKSwgbWl4QmxlbmRNb2RlOiAnc2NyZWVuJyB9fVxuICAgICAgLz5cbiAgICAgIDxWaWduZXR0ZSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBTaG90IDMgXHUyMDE0IENhbGwgdG8gYWN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBTaG90Q1RBOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgZiA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7IGZwcyB9ID0gdXNlVmlkZW9Db25maWcoKTtcbiAgY29uc3QgeyB3LCBoLCBtb2RlLCBzIH0gPSB1c2VMYXlvdXQoKTtcbiAgY29uc3QgZ2xvYmFsID0gZiArIDIxMDtcblxuICBjb25zdCBMID0ge1xuICAgIGxhbmQ6IHtcbiAgICAgIGFsaWduOiAnbGVmdCcgYXMgY29uc3QsXG4gICAgICBsZWZ0OiAxNDAgKiBzLFxuICAgICAgd21Ub3A6IDI1MCAqIHMsXG4gICAgICB3bVNpemU6IDQ0ICogcyxcbiAgICAgIGhsVG9wOiAzNDAgKiBzLFxuICAgICAgaGxTaXplOiAxMTIgKiBzLFxuICAgICAgYnRuVG9wOiA1NDAgKiBzLFxuICAgICAgc2hvZVc6IDgyMCAqIHMsXG4gICAgICBzaG9lTGVmdDogdyAtIDg2MCAqIHMsXG4gICAgICBzaG9lVG9wOiAzMzAgKiBzLFxuICAgIH0sXG4gICAgcG9ydDoge1xuICAgICAgYWxpZ246ICdjZW50ZXInIGFzIGNvbnN0LFxuICAgICAgbGVmdDogMCxcbiAgICAgIHdtVG9wOiBoICogMC4xNyxcbiAgICAgIHdtU2l6ZTogNDAgKiBzLFxuICAgICAgaGxUb3A6IGggKiAwLjQ1NSxcbiAgICAgIGhsU2l6ZTogOTYgKiBzLFxuICAgICAgYnRuVG9wOiBoICogMC41NCxcbiAgICAgIHNob2VXOiA4NjAgKiBzLFxuICAgICAgc2hvZUxlZnQ6ICh3IC0gODYwICogcykgLyAyLFxuICAgICAgc2hvZVRvcDogaCAqIDAuMjE1LFxuICAgIH0sXG4gICAgc3F1YXJlOiB7XG4gICAgICBhbGlnbjogJ2NlbnRlcicgYXMgY29uc3QsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd21Ub3A6IDgwICogcyxcbiAgICAgIHdtU2l6ZTogMzggKiBzLFxuICAgICAgaGxUb3A6IDYwMCAqIHMsXG4gICAgICBobFNpemU6IDk2ICogcyxcbiAgICAgIGJ0blRvcDogNzYwICogcyxcbiAgICAgIHNob2VXOiA3ODAgKiBzLFxuICAgICAgc2hvZUxlZnQ6ICh3IC0gNzgwICogcykgLyAyLFxuICAgICAgc2hvZVRvcDogMTUwICogcyxcbiAgICB9LFxuICB9W21vZGVdO1xuXG4gIGNvbnN0IHNob2VIID0gTC5zaG9lVyAvIDI7XG4gIGNvbnN0IHNob2VJbiA9IHNwcmluZyh7IGZyYW1lOiBmLCBmcHMsIGNvbmZpZzogeyBkYW1waW5nOiAxOCwgc3RpZmZuZXNzOiAxMTAsIG1hc3M6IDAuOSB9IH0pO1xuICBjb25zdCBmbG9hdCA9IE1hdGguc2luKGYgLyAyMCkgKiA4ICogcztcblxuICBjb25zdCBobCA9IHNwcmluZyh7IGZyYW1lOiBmIC0gNiwgZnBzLCBjb25maWc6IHsgZGFtcGluZzogMjAwLCBzdGlmZm5lc3M6IDEyMCB9IH0pO1xuICBjb25zdCBiYXIgPSBpbnRlcnBvbGF0ZShmLCBbMTYsIDQwXSwgWzAsIDFdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IEVBU0VfT1VUIH0pO1xuICBjb25zdCBidG4gPSBzcHJpbmcoeyBmcmFtZTogZiAtIDI2LCBmcHMsIGNvbmZpZzogeyBkYW1waW5nOiAxNiwgc3RpZmZuZXNzOiAxNDAgfSwgZHVyYXRpb25JbkZyYW1lczogMjIgfSk7XG4gIGNvbnN0IGJ0bk9wYWNpdHkgPSBpbnRlcnBvbGF0ZShmLCBbMjYsIDM4XSwgWzAsIDFdLCBjbGFtcCk7XG4gIGNvbnN0IHNoaW5lID0gaW50ZXJwb2xhdGUoZiwgWzYwLCA5NV0sIFsxMzAsIC0zMF0sIHsgLi4uY2xhbXAsIGVhc2luZzogRWFzaW5nLmluT3V0KEVhc2luZy5jdWJpYykgfSk7XG4gIGNvbnN0IHdtU3BhY2luZyA9IGludGVycG9sYXRlKGYsIFswLCA0MF0sIFswLjYyLCAwLjQ4XSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFQVNFX09VVCB9KTtcblxuICBjb25zdCBibG9jayA9ICh0b3A6IG51bWJlcik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3AsXG4gICAgbGVmdDogTC5sZWZ0LFxuICAgIHJpZ2h0OiBMLmFsaWduID09PSAnY2VudGVyJyA/IDAgOiB1bmRlZmluZWQsXG4gICAgdGV4dEFsaWduOiBMLmFsaWduLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgPENpdHkgaWQ9XCJjM1wiIGhvcml6b249e2ggKiAwLjk0fSBnbG9iYWxGcmFtZT17Z2xvYmFsfSBkaW09ezAuNjJ9IGdsb3c9e0MudGVhbH0gZ2xvd1k9ezAuNH0gLz5cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSAke01hdGgubWF4KHcsIGgpICogMC4zOH1weCBhdCAkeygoTC5zaG9lTGVmdCArIEwuc2hvZVcgLyAyKSAvIHcpICogMTAwfSUgJHsoKEwuc2hvZVRvcCArIHNob2VIIC8gMikgLyBoKSAqIDEwMH0lLCAke0MudGVhbH0zOCwgdHJhbnNwYXJlbnQgNzAlKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuXG4gICAgICB7LyogcHJvZHVjdCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBMLnNob2VMZWZ0ICsgTC5zaG9lVyAqIDAuMSxcbiAgICAgICAgICB0b3A6IEwuc2hvZVRvcCArIHNob2VIICogMC45NSxcbiAgICAgICAgICB3aWR0aDogTC5zaG9lVyAqIDAuOCxcbiAgICAgICAgICBoZWlnaHQ6IDI2ICogcyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICdyYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCBjZW50ZXIsIHJnYmEoMCwwLDAsMC44KSwgdHJhbnNwYXJlbnQgNzAlKScsXG4gICAgICAgICAgb3BhY2l0eTogc2hvZUluLFxuICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlWCgkezEgLSBmbG9hdCAvICg4MCAqIHMpfSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxkaXZcbiAgICAgICAgZGF0YS1sYXllcj1cInByb2R1Y3RcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IEwuc2hvZUxlZnQsXG4gICAgICAgICAgdG9wOiBMLnNob2VUb3AgKyBmbG9hdCxcbiAgICAgICAgICB3aWR0aDogTC5zaG9lVyxcbiAgICAgICAgICBoZWlnaHQ6IHNob2VILFxuICAgICAgICAgIG9wYWNpdHk6IGludGVycG9sYXRlKHNob2VJbiwgWzAsIDAuM10sIFswLCAxXSwgY2xhbXApLFxuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIHNob2VJbikgKiA4MCAqIHN9cHgpIHJvdGF0ZSgke2ludGVycG9sYXRlKHNob2VJbiwgWzAsIDFdLCBbOCwgLTRdKX1kZWcpIHNjYWxlKCR7aW50ZXJwb2xhdGUoc2hvZUluLCBbMCwgMV0sIFswLjg2LCAxXSl9KWAsXG4gICAgICAgICAgZmlsdGVyOiBgZHJvcC1zaGFkb3coMCAkezMwICogc31weCAkezUwICogc31weCByZ2JhKDIwLDE4NCwxNjYsMC4zNSkpYCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFNob2UgaWQ9XCJzM1wiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19IHNoZWVuPXtpbnRlcnBvbGF0ZShmLCBbNDAsIDkwXSwgWy0wLjIsIDEuMl0sIGNsYW1wKX0gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Lyogd29yZG1hcmsgXHUyMDE0IHZpc2libGUgZnJvbSB0aGUgZmlyc3QgZnJhbWUgb2YgdGhlIHNob3QgKi99XG4gICAgICA8ZGl2IHN0eWxlPXtibG9jayhMLndtVG9wKX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwid29yZG1hcmtcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA5MDAsXG4gICAgICAgICAgICBmb250U2l6ZTogTC53bVNpemUsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogYCR7d21TcGFjaW5nfWVtYCxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBMLmFsaWduID09PSAnY2VudGVyJyA/IGAtJHt3bVNwYWNpbmd9ZW1gIDogMCxcbiAgICAgICAgICAgIGNvbG9yOiBDLnRlYWxMaWdodCxcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBLRVNUUkVMXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBoZWFkbGluZSAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgLi4uYmxvY2soTC5obFRvcCksIHBhZGRpbmdCb3R0b206IDEyICogcyB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiBgJHs4ICogc31weCAkezQgKiBzfXB4YCB9fT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkYXRhLWxheWVyPVwiaGVhZGxpbmVcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogODAwLFxuICAgICAgICAgICAgICBmb250U2l6ZTogTC5obFNpemUsXG4gICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuMDUsXG4gICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wMzVlbScsXG4gICAgICAgICAgICAgIGNvbG9yOiBDLmluayxcbiAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIGhsKSAqIDExMH0lKWAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIE91dCAyOCBOb3ZlbWJlclxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJhY2NlbnRcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBoZWlnaHQ6IDYgKiBzLFxuICAgICAgICAgICAgd2lkdGg6IDE0MCAqIHMsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6IDEwICogcyxcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6IEwuYWxpZ24gPT09ICdjZW50ZXInID8gJ2F1dG8nIDogNCAqIHMsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogTC5hbGlnbiA9PT0gJ2NlbnRlcicgPyAnYXV0bycgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDMgKiBzLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCg5MGRlZywgJHtDLm9yYW5nZX0sICR7Qy5vcmFuZ2VMaWdodH0pYCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlWCgke2Jhcn0pYCxcbiAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogTC5hbGlnbiA9PT0gJ2NlbnRlcicgPyAnNTAlIDUwJScgOiAnMCA1MCUnLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIGJ1dHRvbiAqL31cbiAgICAgIDxkaXYgc3R5bGU9e2Jsb2NrKEwuYnRuVG9wKX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiYnV0dG9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgZm9udFdlaWdodDogNzAwLFxuICAgICAgICAgICAgZm9udFNpemU6IDQ0ICogcyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDFlbScsXG4gICAgICAgICAgICBjb2xvcjogJyMxYzBhMDInLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBwYWRkaW5nOiBgJHszMiAqIHN9cHggJHs2MCAqIHN9cHhgLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA5OTksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQoMTEwZGVnLCB0cmFuc3BhcmVudCA0MCUsIHJnYmEoMjU1LDI1NSwyNTUsMC42NSkgNTAlLCB0cmFuc3BhcmVudCA2MCUpLCBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAke0Mub3JhbmdlTGlnaHR9LCAke0Mub3JhbmdlfSlgLFxuICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICcyNTAlIDEwMCUsIDEwMCUgMTAwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IGAke3NoaW5lfSUgMCwgMCAwYCxcbiAgICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAkezE4ICogc31weCAkezQ0ICogc31weCByZ2JhKDI0OSwxMTUsMjIsMC40KSwgaW5zZXQgMCAkezIgKiBzfXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjUpYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IGJ0bk9wYWNpdHksXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7KDEgLSBidG4pICogMzAgKiBzfXB4KSBzY2FsZSgke2ludGVycG9sYXRlKGJ0biwgWzAsIDFdLCBbMC44NiwgMV0pfSlgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBMLmFsaWduID09PSAnY2VudGVyJyA/ICc1MCUgNTAlJyA6ICcwIDUwJScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIEdldCBlYXJseSBhY2Nlc3NcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxWaWduZXR0ZSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBSb290ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlkZW8oKSB7XG4gIGNvbnN0IFtzMSwgczIsIHMzXSA9IGNvbXBvc2l0aW9uLnNob3RzO1xuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3sgYmFja2dyb3VuZDogQy5uaWdodDAsIGZvbnRGYW1pbHk6IEZPTlQgfX0+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czEuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czEuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czEudGl0bGV9PlxuICAgICAgICA8U2hvdEhlcm8gLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czIuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czIuZHVyYXRpb25JbkZyYW1lc30gbmFtZT17czIudGl0bGV9PlxuICAgICAgICA8U2hvdERldGFpbCAvPlxuICAgICAgPC9TZXF1ZW5jZT5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMy5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMy5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPXtzMy50aXRsZX0+XG4gICAgICAgIDxTaG90Q1RBIC8+XG4gICAgICA8L1NlcXVlbmNlPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixVQUFVO0FBQUE7QUFBQTs7O0FDQXZEO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsbUJBQW1CO0FBQUE7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O0FBQUEsSUFHQSw0Q0FBQyxTQUFJLE9BQU8sTUFBTSxFQUFFLE1BQU0sR0FDeEI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGNBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxVQUNMLFNBQVM7QUFBQSxVQUNULFlBQVk7QUFBQSxVQUNaLFlBQVk7QUFBQSxVQUNaLFVBQVUsS0FBSztBQUFBLFVBQ2YsWUFBWTtBQUFBLFVBQ1osZUFBZTtBQUFBLFVBQ2YsT0FBTztBQUFBLFVBQ1AsWUFBWTtBQUFBLFVBQ1osU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztBQUFBLFVBQzlCLGNBQWM7QUFBQSxVQUNkLGlCQUFpQixrSEFBa0gsRUFBRSxXQUFXLEtBQUssRUFBRSxNQUFNO0FBQUEsVUFDN0osZ0JBQWdCO0FBQUEsVUFDaEIsb0JBQW9CLEdBQUcsS0FBSztBQUFBLFVBQzVCLGtCQUFrQjtBQUFBLFVBQ2xCLFdBQVcsS0FBSyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsb0NBQW9DLElBQUksQ0FBQztBQUFBLFVBQzNFLFNBQVM7QUFBQSxVQUNULFdBQVcsZUFBZSxJQUFJLE9BQU8sS0FBSyxDQUFDLGlCQUFhLDZCQUFZLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFBQSxVQUMzRixpQkFBaUIsRUFBRSxVQUFVLFdBQVcsWUFBWTtBQUFBLFFBQ3REO0FBQUEsUUFDRDtBQUFBO0FBQUEsSUFFRCxHQUNGO0FBQUEsSUFDQSw0Q0FBQyxZQUFTO0FBQUEsS0FDWjtBQUVKO0FBTWUsU0FBUixRQUF5QjtBQUM5QixRQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxZQUFZO0FBQ2pDLFNBQ0UsNkNBQUMsZ0NBQWEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLFlBQVksS0FBSyxHQUM1RDtBQUFBLGdEQUFDLDRCQUFTLE1BQU0sR0FBRyxNQUFNLGtCQUFrQixHQUFHLGtCQUFrQixNQUFNLEdBQUcsT0FDdkUsc0RBQUMsWUFBUyxHQUNaO0FBQUEsSUFDQSw0Q0FBQyw0QkFBUyxNQUFNLEdBQUcsTUFBTSxrQkFBa0IsR0FBRyxrQkFBa0IsTUFBTSxHQUFHLE9BQ3ZFLHNEQUFDLGNBQVcsR0FDZDtBQUFBLElBQ0EsNENBQUMsNEJBQVMsTUFBTSxHQUFHLE1BQU0sa0JBQWtCLEdBQUcsa0JBQWtCLE1BQU0sR0FBRyxPQUN2RSxzREFBQyxXQUFRLEdBQ1g7QUFBQSxLQUNGO0FBRUo7IiwKICAibmFtZXMiOiBbXQp9Cg==
