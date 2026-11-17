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

// workspaces/kestrel-runner-launch-spot-a3eb/versions/v1/Video.tsx
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
    port: { wmTop: h * 0.645, wmSize: 128 * s, wmAlign: "center", wmLeft: 0, tagRight: 90 * s, tagTop: h * 0.17 },
    square: { wmTop: 790 * s, wmSize: 118 * s, wmAlign: "center", wmLeft: 0, tagRight: 80 * s, tagTop: 100 * s }
  }[mode];
  const spacing = (0, import_remotion.interpolate)(wm, [0, 1], [0.32, 0.14]);
  const stringLen = W.tagTop + 20 * s;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9rZXN0cmVsLXJ1bm5lci1sYXVuY2gtc3BvdC1hM2ViL3ZlcnNpb25zL3YxL1ZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZW1vdGlvblwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdC9qc3gtcnVudGltZVwiXTsiLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBTZXF1ZW5jZSxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIENvbXBvc2l0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgY29uc3QgY29tcG9zaXRpb24gPSB7XG4gIGZwczogMzAsXG4gIGR1cmF0aW9uSW5GcmFtZXM6IDM2MCxcbiAgc2hvdHM6IFtcbiAgICB7IG46IDEsIHRpdGxlOiAnUHJvZHVjdCBoZXJvJywgZnJvbTogMCwgZHVyYXRpb25JbkZyYW1lczogOTAgfSxcbiAgICB7IG46IDIsIHRpdGxlOiAnRGV0YWlsJywgZnJvbTogOTAsIGR1cmF0aW9uSW5GcmFtZXM6IDEyMCB9LFxuICAgIHsgbjogMywgdGl0bGU6ICdDYWxsIHRvIGFjdGlvbicsIGZyb206IDIxMCwgZHVyYXRpb25JbkZyYW1lczogMTUwIH0sXG4gIF0sXG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIERlc2lnbiB0b2tlbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGT05UID0gJ3VpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5cbmNvbnN0IEMgPSB7XG4gIG5pZ2h0MDogJyMwMzA2MGQnLFxuICBuaWdodDE6ICcjMDcxMTFmJyxcbiAgbmlnaHQyOiAnIzBjMWEyZScsXG4gIHRlYWw6ICcjMTRiOGE2JyxcbiAgdGVhbExpZ2h0OiAnIzVlZWFkNCcsXG4gIHRlYWxEZWVwOiAnIzBmNzY2ZScsXG4gIHRlYWxJbms6ICcjMDQyZjJlJyxcbiAgb3JhbmdlOiAnI2Y5NzMxNicsXG4gIG9yYW5nZUxpZ2h0OiAnI2ZkYmE3NCcsXG4gIG9yYW5nZURlZXA6ICcjYzI0MTBjJyxcbiAgaW5rOiAnI2Y4ZmFmYycsXG59O1xuXG5jb25zdCBFQVNFX09VVCA9IEVhc2luZy5iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbmNvbnN0IGNsYW1wID0geyBleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsIGV4dHJhcG9sYXRlUmlnaHQ6ICdjbGFtcCcgfSBhcyBjb25zdDtcblxuLyoqIERldGVybWluaXN0aWMgaGFzaCBpbiBbMCwgMSkuICovXG5jb25zdCByYW5kID0gKGk6IG51bWJlcikgPT4ge1xuICBjb25zdCB4ID0gTWF0aC5zaW4oaSAqIDEyNy4xICsgMzExLjcpICogNDM3NTguNTQ1MztcbiAgcmV0dXJuIHggLSBNYXRoLmZsb29yKHgpO1xufTtcblxudHlwZSBNb2RlID0gJ2xhbmQnIHwgJ3BvcnQnIHwgJ3NxdWFyZSc7XG5cbmNvbnN0IHVzZUxheW91dCA9ICgpID0+IHtcbiAgY29uc3QgeyB3aWR0aDogdywgaGVpZ2h0OiBoIH0gPSB1c2VWaWRlb0NvbmZpZygpO1xuICBjb25zdCBhc3BlY3QgPSB3IC8gaDtcbiAgY29uc3QgbW9kZTogTW9kZSA9IGFzcGVjdCA+IDEuMyA/ICdsYW5kJyA6IGFzcGVjdCA8IDAuOCA/ICdwb3J0JyA6ICdzcXVhcmUnO1xuICBjb25zdCBzID0gTWF0aC5taW4odywgaCkgLyAxMDgwO1xuICByZXR1cm4geyB3LCBoLCBtb2RlLCBzIH07XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob2UgYXJ0d29yayAodmlld0JveCAwIDAgNjAwIDMwMCwgdG9lIHBvaW50aW5nIHJpZ2h0KSAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBNSURTT0xFID1cbiAgJ00zMCAyMTQgQzMwIDE5NiA0OCAxODggNzYgMTg4IEwzMDAgMTk0IEM0MDAgMTk3IDQ4MCAxOTYgNTMwIDIwMCBDNTY2IDIwMyA1OTAgMjE2IDU5MCAyMzQgQzU5MCAyNDQgNTg2IDI0OCA1NzggMjQ4IEw2MCAyNDggQzQwIDI0OCAzMCAyMzQgMzAgMjE0IFonO1xuY29uc3QgT1VUU09MRSA9ICdNMzQgMjM2IEw1OTAgMjM2IEM1OTAgMjU0IDU2NiAyNjggNTMwIDI2OCBMODYgMjY4IEM1NiAyNjggMzYgMjU2IDM0IDIzNiBaJztcbmNvbnN0IFVQUEVSID1cbiAgJ001NCAyMDAgQzQ4IDE2MCA1MiAxMTYgNzIgODYgQzg0IDY4IDEwOCA2MCAxMjggNjYgQzE0MCA3MCAxNDYgODIgMTYwIDkyIEMxNzggMTA0IDIwMCAxMDggMjI2IDEwNiBDMjcwIDEwNCAzMTIgMTE2IDM1MiAxMzQgQzQxMCAxNjAgNDcwIDE3MCA1MjIgMTc4IEM1NjAgMTg0IDU4NCAxOTYgNTgyIDIwNiBMNjAgMjA2IFonO1xuXG5jb25zdCBTaG9lOiBSZWFjdC5GQzx7XG4gIGlkOiBzdHJpbmc7XG4gIHZpZXdCb3g/OiBzdHJpbmc7XG4gIHNoZWVuPzogbnVtYmVyOyAvLyAtMC4yIC4uIDEuMiBwb3NpdGlvbiBvZiB0aGUgbGlnaHQgc3dlZXAgYWNyb3NzIHRoZSBzb2xlXG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgcHJlc2VydmU/OiBzdHJpbmc7XG59PiA9ICh7IGlkLCB2aWV3Qm94ID0gJzAgMCA2MDAgMzAwJywgc2hlZW4gPSAtMSwgc3R5bGUsIHByZXNlcnZlID0gJ3hNaWRZTWlkIG1lZXQnIH0pID0+IHtcbiAgY29uc3QgZXllbGV0cyA9IFswLCAxLCAyLCAzLCA0XS5tYXAoKGkpID0+IHtcbiAgICBjb25zdCB0ID0gaSAvIDQ7XG4gICAgcmV0dXJuIHsgeDogMjE0ICsgdCAqIDE1MCwgeTogMTEwICsgdCAqIDM0IH07XG4gIH0pO1xuICBjb25zdCB0cmVhZHMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyMiB9LCAoXywgaSkgPT4gNzQgKyBpICogMjIpO1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmlld0JveD17dmlld0JveH0gcHJlc2VydmVBc3BlY3RSYXRpbz17cHJlc2VydmV9IHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93OiAndmlzaWJsZScsIC4uLnN0eWxlIH19PlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD17YCR7aWR9LXVwcGVyYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwLjE1XCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMyZGQ0YmZcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuNTVcIiBzdG9wQ29sb3I9e0MudGVhbH0gLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtDLnRlYWxEZWVwfSAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfS1taWRgfSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPXtDLm9yYW5nZUxpZ2h0fSAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAuMzVcIiBzdG9wQ29sb3I9e0Mub3JhbmdlfSAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZWE1ODBjXCIgLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPXtgJHtpZH0tb3V0YH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNlYTU4MGNcIiAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9e0Mub3JhbmdlRGVlcH0gLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPXtgJHtpZH0tc2hlZW5gfSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjFcIiB5Mj1cIjBcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZmZlwiIHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMC41XCIgc3RvcENvbG9yPVwiI2ZmZlwiIHN0b3BPcGFjaXR5PVwiMC43NVwiIC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIjBcIiAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8cGF0dGVybiBpZD17YCR7aWR9LW1lc2hgfSB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI3XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIiBwYXR0ZXJuVHJhbnNmb3JtPVwicm90YXRlKDMwKVwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIyXCIgY3k9XCIyXCIgcj1cIjEuMVwiIGZpbGw9XCIjZWNmZWZmXCIgb3BhY2l0eT1cIjAuMjJcIiAvPlxuICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgIDxjbGlwUGF0aCBpZD17YCR7aWR9LXNvbGVgfT5cbiAgICAgICAgICA8cGF0aCBkPXtNSURTT0xFfSAvPlxuICAgICAgICAgIDxwYXRoIGQ9e09VVFNPTEV9IC8+XG4gICAgICAgIDwvY2xpcFBhdGg+XG4gICAgICAgIDxjbGlwUGF0aCBpZD17YCR7aWR9LXVwcGVyY2xpcGB9PlxuICAgICAgICAgIDxwYXRoIGQ9e1VQUEVSfSAvPlxuICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgPC9kZWZzPlxuXG4gICAgICB7LyogdG9uZ3VlICovfVxuICAgICAgPHBhdGggZD1cIk0xOTYgMTA2IEMxOTYgODIgMjE0IDY4IDIzOCA3MiBDMjUyIDc1IDI2MCA5MCAyNjYgMTEyIFpcIiBmaWxsPVwiIzExNWU1OVwiIC8+XG4gICAgICB7LyogdXBwZXIgKi99XG4gICAgICA8cGF0aCBkPXtVUFBFUn0gZmlsbD17YHVybCgjJHtpZH0tdXBwZXIpYH0gLz5cbiAgICAgIDxnIGNsaXBQYXRoPXtgdXJsKCMke2lkfS11cHBlcmNsaXApYH0+XG4gICAgICAgIDxyZWN0IHg9XCIwXCIgeT1cIjBcIiB3aWR0aD1cIjYwMFwiIGhlaWdodD1cIjMwMFwiIGZpbGw9e2B1cmwoIyR7aWR9LW1lc2gpYH0gLz5cbiAgICAgICAgey8qIGhlZWwgY291bnRlciAqL31cbiAgICAgICAgPHBhdGggZD1cIk00MCAyMTAgQzQ0IDE2MCA1MCAxMjAgNjggOTAgQzg0IDEyMCAxMDQgMTYwIDEzNCAyMTAgWlwiIGZpbGw9e0MudGVhbERlZXB9IG9wYWNpdHk9XCIwLjg1XCIgLz5cbiAgICAgICAgey8qIHRvZSBjYXAgKi99XG4gICAgICAgIDxwYXRoIGQ9XCJNNDQwIDE1OCBDNDkwIDE2OCA1NDYgMTc2IDU3NCAxOTIgQzU4OCAyMDAgNTg4IDIxMCA1ODQgMjE0IEw0MjQgMjE0IEM0MTQgMTkyIDQxOCAxNzAgNDQwIDE1OCBaXCIgZmlsbD1cIiMwZDk0ODhcIiAvPlxuICAgICAgICB7Lyogd2luZyBzdHJpcGVzICovfVxuICAgICAgICA8cGF0aCBkPVwiTTEyOCAxOTIgQzIyMCAxNTAgMzMwIDEzNiA0NzAgMTcwIEMzNTAgMTUyIDI0MCAxNjYgMTUwIDIwNCBaXCIgZmlsbD17Qy50ZWFsTGlnaHR9IG9wYWNpdHk9XCIwLjlcIiAvPlxuICAgICAgICA8cGF0aCBkPVwiTTE2OCAyMDAgQzI1MCAxNzIgMzQwIDE2NCA0NDAgMTg0IEMzNTAgMTc2IDI2MCAxODQgMTg2IDIwOCBaXCIgZmlsbD17Qy5vcmFuZ2V9IG9wYWNpdHk9XCIwLjk1XCIgLz5cbiAgICAgICAgey8qIGdsb3NzICovfVxuICAgICAgICA8cGF0aCBkPVwiTTg2IDExMiBDMTUwIDEwOCAyMzAgMTE4IDMyMCAxNDBcIiBzdHJva2U9XCIjZmZmXCIgc3Ryb2tlT3BhY2l0eT1cIjAuMjhcIiBzdHJva2VXaWR0aD1cIjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XG4gICAgICA8L2c+XG4gICAgICB7LyogY29sbGFyIG9wZW5pbmcgKi99XG4gICAgICA8cGF0aCBkPVwiTTg0IDgwIEMxMDAgNjQgMTI2IDYyIDE0MCA3NCBDMTUwIDg0IDE1OCA5MiAxNzIgOTggQzE1MCAxMDQgMTIwIDEwMiAxMDAgOTQgQzkyIDkwIDg2IDg2IDg0IDgwIFpcIiBmaWxsPXtDLnRlYWxJbmt9IC8+XG4gICAgICB7LyogaGVlbCBwdWxsIHRhYiAqL31cbiAgICAgIDxwYXRoIGQ9XCJNNTggOTYgQzU2IDgwIDYyIDY4IDc0IDYyIEw4MiA3NiBDNzIgODAgNjYgODggNjYgOTggWlwiIGZpbGw9e0Mub3JhbmdlfSAvPlxuICAgICAgey8qIGxhY2VzICovfVxuICAgICAge2V5ZWxldHMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgIDxnIGtleT17aX0+XG4gICAgICAgICAgPGNpcmNsZSBjeD17cC54fSBjeT17cC55ICsgNH0gcj1cIjRcIiBmaWxsPXtDLnRlYWxJbmt9IC8+XG4gICAgICAgICAgPHBhdGggZD17YE0ke3AueCAtIDZ9ICR7cC55IC0gMTJ9IEwke3AueCArIDEwfSAke3AueSArIDEyfWB9IHN0cm9rZT1cIiNlY2ZlZmZcIiBzdHJva2VXaWR0aD1cIjdcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiAvPlxuICAgICAgICA8L2c+XG4gICAgICApKX1cblxuICAgICAgey8qIG1pZHNvbGUgKyBvdXRzb2xlICovfVxuICAgICAgPHBhdGggZD17T1VUU09MRX0gZmlsbD17YHVybCgjJHtpZH0tb3V0KWB9IC8+XG4gICAgICA8cGF0aCBkPXtNSURTT0xFfSBmaWxsPXtgdXJsKCMke2lkfS1taWQpYH0gLz5cbiAgICAgIDxwYXRoIGQ9XCJNNTggMjA4IEMyMDAgMjE0IDQwMCAyMTYgNTY2IDIyMFwiIHN0cm9rZT17Qy5vcmFuZ2VMaWdodH0gc3Ryb2tlT3BhY2l0eT1cIjAuOFwiIHN0cm9rZVdpZHRoPVwiM1wiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNNDggMjMwIEMyMDAgMjM0IDQyMCAyMzYgNTg0IDIzOFwiIHN0cm9rZT1cIiM5YTM0MTJcIiBzdHJva2VPcGFjaXR5PVwiMC40NVwiIHN0cm9rZVdpZHRoPVwiMlwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgIHsvKiBmb2FtIHBvZHMgKi99XG4gICAgICB7WzExMCwgMTkwLCAyNzAsIDM1MCwgNDMwLCA1MTBdLm1hcCgoeCkgPT4gKFxuICAgICAgICA8ZWxsaXBzZSBrZXk9e3h9IGN4PXt4fSBjeT1cIjIyNlwiIHJ4PVwiMjJcIiByeT1cIjZcIiBmaWxsPVwiI2VhNTgwY1wiIG9wYWNpdHk9XCIwLjQ1XCIgLz5cbiAgICAgICkpfVxuICAgICAgey8qIHRyZWFkICovfVxuICAgICAge3RyZWFkcy5tYXAoKHgpID0+IChcbiAgICAgICAgPHJlY3Qga2V5PXt4fSB4PXt4fSB5PVwiMjU2XCIgd2lkdGg9XCIxMVwiIGhlaWdodD1cIjEwXCIgcng9XCIyXCIgZmlsbD1cIiM3YzJkMTJcIiBvcGFjaXR5PVwiMC43NVwiIC8+XG4gICAgICApKX1cbiAgICAgIHsvKiBsaWdodCBzd2VlcCBvdmVyIHRoZSBzb2xlICovfVxuICAgICAgPGcgY2xpcFBhdGg9e2B1cmwoIyR7aWR9LXNvbGUpYH0+XG4gICAgICAgIDxyZWN0IHg9ey0xMjAgKyBzaGVlbiAqIDcyMH0geT1cIjE4MFwiIHdpZHRoPVwiMTEwXCIgaGVpZ2h0PVwiMTAwXCIgZmlsbD17YHVybCgjJHtpZH0tc2hlZW4pYH0gdHJhbnNmb3JtPXtgc2tld1goLTIwKWB9IC8+XG4gICAgICA8L2c+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIE5pZ2h0IGNpdHkgYmFja2dyb3VuZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG50eXBlIEJ1aWxkaW5nID0geyB4OiBudW1iZXI7IHc6IG51bWJlcjsgaDogbnVtYmVyOyBsaXQ6IG51bWJlcjsgYW50ZW5uYTogYm9vbGVhbiB9O1xuXG5jb25zdCBidWlsZFJvdyA9IChzZWVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIG1pbkg6IG51bWJlciwgbWF4SDogbnVtYmVyLCBtaW5XOiBudW1iZXIsIG1heFc6IG51bWJlcikgPT4ge1xuICBjb25zdCBvdXQ6IEJ1aWxkaW5nW10gPSBbXTtcbiAgbGV0IHggPSAtNDA7XG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKHggPCB0b3RhbCkge1xuICAgIGNvbnN0IGJ3ID0gbWluVyArIHJhbmQoc2VlZCArIGkpICogKG1heFcgLSBtaW5XKTtcbiAgICBjb25zdCBiaCA9IG1pbkggKyBNYXRoLnBvdyhyYW5kKHNlZWQgKyBpICsgNTAwKSwgMS40KSAqIChtYXhIIC0gbWluSCk7XG4gICAgb3V0LnB1c2goeyB4LCB3OiBidywgaDogYmgsIGxpdDogcmFuZChzZWVkICsgaSArIDkwMCksIGFudGVubmE6IHJhbmQoc2VlZCArIGkgKyA3NykgPiAwLjgyIH0pO1xuICAgIHggKz0gYncgKyByYW5kKHNlZWQgKyBpICsgMTMwMCkgKiA2O1xuICAgIGkrKztcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuY29uc3QgQ2l0eTogUmVhY3QuRkM8e1xuICBpZDogc3RyaW5nO1xuICBob3Jpem9uOiBudW1iZXI7IC8vIHB4IGZyb20gdG9wXG4gIGdsb2JhbEZyYW1lOiBudW1iZXI7XG4gIGRpbT86IG51bWJlcjtcbiAgZ2xvdz86IHN0cmluZztcbiAgZ2xvd1k/OiBudW1iZXI7XG59PiA9ICh7IGlkLCBob3Jpem9uLCBnbG9iYWxGcmFtZSwgZGltID0gMCwgZ2xvdyA9IEMudGVhbCwgZ2xvd1kgPSAwLjQ1IH0pID0+IHtcbiAgY29uc3QgeyB3LCBoLCBzIH0gPSB1c2VMYXlvdXQoKTtcbiAgY29uc3QgZXh0cmEgPSA2MDAgKiBzO1xuICBjb25zdCBmYXIgPSBidWlsZFJvdygxMSwgdyArIGV4dHJhLCBob3Jpem9uICogMC4yMiwgaG9yaXpvbiAqIDAuNjIsIDUwICogcywgMTUwICogcyk7XG4gIGNvbnN0IG5lYXIgPSBidWlsZFJvdyg1NywgdyArIGV4dHJhLCBob3Jpem9uICogMC4xMiwgaG9yaXpvbiAqIDAuNDIsIDcwICogcywgMTkwICogcyk7XG4gIGNvbnN0IGZhclNoaWZ0ID0gLWdsb2JhbEZyYW1lICogMC4zNSAqIHM7XG4gIGNvbnN0IG5lYXJTaGlmdCA9IC1nbG9iYWxGcmFtZSAqIDAuOSAqIHM7XG4gIGNvbnN0IHN0YXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogNDAgfSwgKF8sIGkpID0+ICh7XG4gICAgeDogcmFuZChpICsgMzAwMCkgKiB3LFxuICAgIHk6IHJhbmQoaSArIDQwMDApICogaG9yaXpvbiAqIDAuNSxcbiAgICByOiAoMC42ICsgcmFuZChpICsgNTAwMCkgKiAxLjQpICogcyxcbiAgICB0dzogMC4zNSArIDAuNjUgKiBNYXRoLmFicyhNYXRoLnNpbihnbG9iYWxGcmFtZSAvIDE4ICsgaSkpLFxuICB9KSk7XG4gIGNvbnN0IGNlbGwgPSAxNCAqIHM7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIGRhdGEtbGF5ZXI9XCJiYWNrZ3JvdW5kXCI+XG4gICAgICA8QWJzb2x1dGVGaWxsXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgxODBkZWcsICR7Qy5uaWdodDB9IDAlLCAke0MubmlnaHQxfSAkeyhob3Jpem9uIC8gaCkgKiA1NX0lLCAke0MubmlnaHQyfSAkeyhob3Jpem9uIC8gaCkgKiAxMDB9JSwgJHtDLm5pZ2h0MH0gMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgJHt3ICogMC43fXB4ICR7aCAqIDAuNDV9cHggYXQgNTAlICR7Z2xvd1kgKiAxMDB9JSwgJHtnbG93fTMzIDAlLCB0cmFuc3BhcmVudCA3MCUpYCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8c3ZnIHdpZHRoPXt3fSBoZWlnaHQ9e2h9IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCB9fT5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPHBhdHRlcm4gaWQ9e2Ake2lkfS13aW5BYH0gd2lkdGg9e2NlbGx9IGhlaWdodD17Y2VsbCAqIDEuNH0gcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgIDxyZWN0IHg9e2NlbGwgKiAwLjN9IHk9e2NlbGwgKiAwLjM1fSB3aWR0aD17Y2VsbCAqIDAuMzV9IGhlaWdodD17Y2VsbCAqIDAuNTV9IGZpbGw9XCIjZmNkMzRkXCIgb3BhY2l0eT1cIjAuNTVcIiAvPlxuICAgICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgICA8cGF0dGVybiBpZD17YCR7aWR9LXdpbkJgfSB3aWR0aD17Y2VsbCAqIDEuM30gaGVpZ2h0PXtjZWxsICogMS43fSBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxuICAgICAgICAgICAgPHJlY3QgeD17Y2VsbCAqIDAuNH0geT17Y2VsbCAqIDAuNX0gd2lkdGg9e2NlbGwgKiAwLjR9IGhlaWdodD17Y2VsbCAqIDAuNn0gZmlsbD17Qy50ZWFsTGlnaHR9IG9wYWNpdHk9XCIwLjRcIiAvPlxuICAgICAgICAgIDwvcGF0dGVybj5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2lkfS1oYXplYH0geDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPXtDLm9yYW5nZX0gc3RvcE9wYWNpdHk9XCIwXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9e0Mub3JhbmdlfSBzdG9wT3BhY2l0eT1cIjAuMjJcIiAvPlxuICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDwvZGVmcz5cbiAgICAgICAge3N0YXJzLm1hcCgoc3QsIGkpID0+IChcbiAgICAgICAgICA8Y2lyY2xlIGtleT17aX0gY3g9e3N0Lnh9IGN5PXtzdC55fSByPXtzdC5yfSBmaWxsPVwiI2UyZThmMFwiIG9wYWNpdHk9e3N0LnR3ICogMC42fSAvPlxuICAgICAgICApKX1cbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7ZmFyU2hpZnQgJSAoZXh0cmEgKiAwLjUpfSAwKWB9PlxuICAgICAgICAgIHtmYXIubWFwKChiLCBpKSA9PiAoXG4gICAgICAgICAgICA8cmVjdCBrZXk9e2l9IHg9e2IueH0geT17aG9yaXpvbiAtIGIuaH0gd2lkdGg9e2Iud30gaGVpZ2h0PXtiLmh9IGZpbGw9XCIjMGUxZDMzXCIgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9nPlxuICAgICAgICA8cmVjdCB4PXswfSB5PXtob3Jpem9uICogMC41NX0gd2lkdGg9e3d9IGhlaWdodD17aG9yaXpvbiAqIDAuNDV9IGZpbGw9e2B1cmwoIyR7aWR9LWhhemUpYH0gLz5cbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bmVhclNoaWZ0ICUgKGV4dHJhICogMC44KX0gMClgfT5cbiAgICAgICAgICB7bmVhci5tYXAoKGIsIGkpID0+IChcbiAgICAgICAgICAgIDxnIGtleT17aX0+XG4gICAgICAgICAgICAgIDxyZWN0IHg9e2IueH0geT17aG9yaXpvbiAtIGIuaH0gd2lkdGg9e2Iud30gaGVpZ2h0PXtiLmh9IGZpbGw9XCIjMDgxMTFmXCIgLz5cbiAgICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgICB4PXtiLnggKyA2ICogc31cbiAgICAgICAgICAgICAgICB5PXtob3Jpem9uIC0gYi5oICsgMTAgKiBzfVxuICAgICAgICAgICAgICAgIHdpZHRoPXtNYXRoLm1heCgwLCBiLncgLSAxMiAqIHMpfVxuICAgICAgICAgICAgICAgIGhlaWdodD17TWF0aC5tYXgoMCwgYi5oIC0gMTAgKiBzKX1cbiAgICAgICAgICAgICAgICBmaWxsPXtgdXJsKCMke2lkfS0ke2IubGl0ID4gMC41ID8gJ3dpbkEnIDogJ3dpbkInfSlgfVxuICAgICAgICAgICAgICAgIG9wYWNpdHk9ezAuMjUgKyBiLmxpdCAqIDAuNn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAge2IuYW50ZW5uYSAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxyZWN0IHg9e2IueCArIGIudyAvIDIgLSAxLjUgKiBzfSB5PXtob3Jpem9uIC0gYi5oIC0gNDAgKiBzfSB3aWR0aD17MyAqIHN9IGhlaWdodD17NDAgKiBzfSBmaWxsPVwiIzA4MTExZlwiIC8+XG4gICAgICAgICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgICAgICAgIGN4PXtiLnggKyBiLncgLyAyfVxuICAgICAgICAgICAgICAgICAgICBjeT17aG9yaXpvbiAtIGIuaCAtIDQwICogc31cbiAgICAgICAgICAgICAgICAgICAgcj17NCAqIHN9XG4gICAgICAgICAgICAgICAgICAgIGZpbGw9XCIjZWY0NDQ0XCJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eT17TWF0aC5mbG9vcihnbG9iYWxGcmFtZSAvIDE1ICsgaSkgJSAyID09PSAwID8gMC45NSA6IDAuMjV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2c+XG4gICAgICAgIHsvKiBzdHJlZXQgLyBncm91bmQgcGxhbmUgKi99XG4gICAgICAgIDxyZWN0IHg9ezB9IHk9e2hvcml6b259IHdpZHRoPXt3fSBoZWlnaHQ9e2ggLSBob3Jpem9ufSBmaWxsPVwiIzA0MDgwZlwiIC8+XG4gICAgICAgIDxyZWN0IHg9ezB9IHk9e2hvcml6b259IHdpZHRoPXt3fSBoZWlnaHQ9ezIgKiBzfSBmaWxsPXtDLm9yYW5nZX0gb3BhY2l0eT1cIjAuMzVcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7IGJhY2tncm91bmQ6IEMubmlnaHQwLCBvcGFjaXR5OiBkaW0gfX0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbmNvbnN0IFZpZ25ldHRlOiBSZWFjdC5GQyA9ICgpID0+IChcbiAgPEFic29sdXRlRmlsbFxuICAgIHN0eWxlPXt7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICBiYWNrZ3JvdW5kOiAncmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgODUlIDc1JSBhdCA1MCUgNTAlLCB0cmFuc3BhcmVudCA1NSUsIHJnYmEoMCwwLDAsMC42KSAxMDAlKScsXG4gICAgfX1cbiAgLz5cbik7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAxIFx1MjAxNCBQcm9kdWN0IGhlcm8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdEhlcm86IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgdywgaCwgbW9kZSwgcyB9ID0gdXNlTGF5b3V0KCk7XG5cbiAgY29uc3QgTCA9IHtcbiAgICBsYW5kOiB7IHNob2VXOiAxMTAwICogcywgc2hvZUxlZnQ6IDQ1MCAqIHMsIHNob2VUb3A6IDI1MCAqIHMsIGNhcFRvcDogODgwICogcywgY2FwU2l6ZTogMTEyICogcywgY2FwQWxpZ246ICdsZWZ0JyBhcyBjb25zdCwgY2FwTGVmdDogMTQwICogcyB9LFxuICAgIHBvcnQ6IHsgc2hvZVc6IDk2MCAqIHMsIHNob2VMZWZ0OiA1MCAqIHMsIHNob2VUb3A6IGggKiAwLjMsIGNhcFRvcDogaCAqIDAuMyArIDUyMCAqIHMsIGNhcFNpemU6IDExMiAqIHMsIGNhcEFsaWduOiAnY2VudGVyJyBhcyBjb25zdCwgY2FwTGVmdDogMCB9LFxuICAgIHNxdWFyZTogeyBzaG9lVzogODgwICogcywgc2hvZUxlZnQ6IDkwICogcywgc2hvZVRvcDogMTkwICogcywgY2FwVG9wOiA3NDAgKiBzLCBjYXBTaXplOiAxMDggKiBzLCBjYXBBbGlnbjogJ2NlbnRlcicgYXMgY29uc3QsIGNhcExlZnQ6IDAgfSxcbiAgfVttb2RlXTtcblxuICBjb25zdCBzaG9lSCA9IEwuc2hvZVcgLyAyO1xuICBjb25zdCBob3Jpem9uID0gTC5zaG9lVG9wICsgc2hvZUggKiAwLjg5MztcblxuICBjb25zdCBwID0gaW50ZXJwb2xhdGUoZiwgWzAsIDI2XSwgWzAsIDFdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IEVBU0VfT1VUIH0pO1xuICBjb25zdCBkcmlmdCA9IGludGVycG9sYXRlKGYsIFsyNiwgOTBdLCBbMCwgMjIgKiBzXSwgY2xhbXApO1xuICBjb25zdCBsZWZ0ID0gaW50ZXJwb2xhdGUocCwgWzAsIDFdLCBbLUwuc2hvZVcgLSAxNjAgKiBzLCBMLnNob2VMZWZ0XSkgKyBkcmlmdDtcbiAgY29uc3QgdGlsdCA9ICgxIC0gcCkgKiAtOTtcbiAgY29uc3Qgc2tldyA9ICgxIC0gcCkgKiAtMTQ7XG4gIGNvbnN0IGJsdXIgPSAoMSAtIHApICogMTA7XG4gIGNvbnN0IGJvYiA9IE1hdGguc2luKGYgLyAxNCkgKiAzICogcyAqIHA7XG5cbiAgY29uc3QgY2FwUCA9IGludGVycG9sYXRlKGYsIFs4LCAyNl0sIFswLCAxXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFQVNFX09VVCB9KTtcblxuICBjb25zdCBzdHJlYWtzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOSB9LCAoXywgaSkgPT4ge1xuICAgIGNvbnN0IHkgPSBMLnNob2VUb3AgKyBzaG9lSCAqICgwLjE1ICsgcmFuZChpICsgNjApICogMC43KTtcbiAgICBjb25zdCBsZW4gPSAoMjQwICsgcmFuZChpICsgNzApICogNDIwKSAqIHM7XG4gICAgY29uc3Qgc3BlZWQgPSA3MCArIHJhbmQoaSArIDgwKSAqIDUwO1xuICAgIGNvbnN0IHggPSAtbGVuICsgKChmICogc3BlZWQgKiBzICsgcmFuZChpICsgOTApICogdykgJSAodyArIGxlbikpO1xuICAgIHJldHVybiB7IHksIGxlbiwgeCwgbzogaW50ZXJwb2xhdGUoZiwgWzAsIDIwLCA0MF0sIFswLjksIDAuNiwgMC4xMl0sIGNsYW1wKSAqICgwLjQgKyByYW5kKGkgKyA5OSkgKiAwLjYpIH07XG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICA8Q2l0eSBpZD1cImMxXCIgaG9yaXpvbj17aG9yaXpvbn0gZ2xvYmFsRnJhbWU9e2Z9IGdsb3dZPXtob3Jpem9uIC8gaCAtIDAuMX0gLz5cblxuICAgICAge3N0cmVha3MubWFwKChzdCwgaSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJzcGVlZC1saW5lc1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogc3QueCxcbiAgICAgICAgICAgIHRvcDogc3QueSxcbiAgICAgICAgICAgIHdpZHRoOiBzdC5sZW4sXG4gICAgICAgICAgICBoZWlnaHQ6IDIgKiBzLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAyLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsICR7aSAlIDMgPT09IDAgPyBDLm9yYW5nZSA6IEMudGVhbExpZ2h0fSlgLFxuICAgICAgICAgICAgb3BhY2l0eTogc3QubyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG5cbiAgICAgIHsvKiBjb250YWN0IHNoYWRvdyAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsZWZ0ICsgTC5zaG9lVyAqIDAuMDYsXG4gICAgICAgICAgdG9wOiBob3Jpem9uIC0gMTQgKiBzLFxuICAgICAgICAgIHdpZHRoOiBMLnNob2VXICogMC45LFxuICAgICAgICAgIGhlaWdodDogMzAgKiBzLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IGNlbnRlciwgcmdiYSgwLDAsMCwwLjg1KSwgdHJhbnNwYXJlbnQgNzAlKScsXG4gICAgICAgICAgb3BhY2l0eTogcCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtbGF5ZXI9XCJwcm9kdWN0XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0LFxuICAgICAgICAgIHRvcDogTC5zaG9lVG9wICsgYm9iLFxuICAgICAgICAgIHdpZHRoOiBMLnNob2VXLFxuICAgICAgICAgIGhlaWdodDogc2hvZUgsXG4gICAgICAgICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7dGlsdH1kZWcpIHNrZXdYKCR7c2tld31kZWcpYCxcbiAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc4MCUgOTAlJyxcbiAgICAgICAgICBmaWx0ZXI6IGBibHVyKCR7Ymx1cn1weCkgZHJvcC1zaGFkb3coMCAkezMwICogc31weCAkezQwICogc31weCByZ2JhKDIwLDE4NCwxNjYsMC4yNSkpYCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFNob2UgaWQ9XCJzMVwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19IHNoZWVuPXtpbnRlcnBvbGF0ZShmLCBbMzAsIDcwXSwgWy0wLjIsIDEuMl0sIGNsYW1wKX0gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgdG9wOiBMLmNhcFRvcCxcbiAgICAgICAgICBsZWZ0OiBMLmNhcExlZnQsXG4gICAgICAgICAgcmlnaHQ6IEwuY2FwQWxpZ24gPT09ICdjZW50ZXInID8gMCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0ZXh0QWxpZ246IEwuY2FwQWxpZ24sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiY2FwdGlvblwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGZvbnRTaXplOiBMLmNhcFNpemUsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogYCR7aW50ZXJwb2xhdGUoY2FwUCwgWzAsIDFdLCBbMC4wNCwgLTAuMDM1XSl9ZW1gLFxuICAgICAgICAgICAgY29sb3I6IEMuaW5rLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBvcGFjaXR5OiBjYXBQLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gY2FwUCkgKiA0MCAqIHN9cHgpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IGAwICR7NiAqIHN9cHggJHszMCAqIHN9cHggcmdiYSgwLDAsMCwwLjYpYCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgUnVuIHRoZSBjaXR5XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8VmlnbmV0dGUgLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdCAyIFx1MjAxNCBEZXRhaWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgU2hvdERldGFpbDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGYgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3QgeyBmcHMgfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG4gIGNvbnN0IHsgdywgaCwgbW9kZSwgcyB9ID0gdXNlTGF5b3V0KCk7XG4gIGNvbnN0IGdsb2JhbCA9IGYgKyA5MDtcblxuICBjb25zdCBiYXNlVlcgPSB7IGxhbmQ6IDMwMCwgcG9ydDogMjMwLCBzcXVhcmU6IDI2MCB9W21vZGVdO1xuICBjb25zdCBzZXR0bGUgPSBzcHJpbmcoeyBmcmFtZTogZiwgZnBzLCBjb25maWc6IHsgZGFtcGluZzogMjAwLCBzdGlmZm5lc3M6IDkwIH0gfSk7XG4gIGNvbnN0IHZ3ID0gYmFzZVZXICogaW50ZXJwb2xhdGUoc2V0dGxlLCBbMCwgMV0sIFsxLjI1LCAxXSkgKiBpbnRlcnBvbGF0ZShmLCBbMCwgMTIwXSwgWzEsIDAuOTNdKTtcbiAgY29uc3QgdmggPSB2dyAqIChoIC8gdyk7XG4gIGNvbnN0IGN4ID0gaW50ZXJwb2xhdGUoZiwgWzAsIDEyMF0sIFs0MjUsIDQ1MF0pO1xuICBjb25zdCBjeSA9IDIyODtcbiAgY29uc3Qgdmlld0JveCA9IGAke2N4IC0gdncgLyAyfSAke2N5IC0gdmggLyAyfSAke3Z3fSAke3ZofWA7XG5cbiAgLy8gV29yZG1hcms6IGFic2VudCBhdCBsb2NhbCAwLCBmdWxseSB2aXNpYmxlIGJ5IGxvY2FsIDQ4ICg8IDA6MDUpLlxuICBjb25zdCB3bSA9IGludGVycG9sYXRlKGYsIFsxOCwgNDhdLCBbMCwgMV0sIHsgLi4uY2xhbXAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG5cbiAgLy8gUHJpY2UgdGFnOiBkcm9wcyBpbiwgZnVsbHkgdmlzaWJsZSBieSBsb2NhbCAxNiwgc3RheXMgdGhyb3VnaCB0aGUgc2hvdC5cbiAgY29uc3QgdGFnSW4gPSBpbnRlcnBvbGF0ZShmLCBbNCwgMTZdLCBbMCwgMV0sIHsgLi4uY2xhbXAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG4gIGNvbnN0IHN3aW5nID0gZiA8IDQgPyAwIDogOSAqIE1hdGguZXhwKC0oZiAtIDQpIC8gMTYpICogTWF0aC5jb3MoKGYgLSA0KSAvIDMuNik7XG5cbiAgY29uc3QgVyA9IHtcbiAgICBsYW5kOiB7IHdtVG9wOiA4NTAgKiBzLCB3bVNpemU6IDE1MCAqIHMsIHdtQWxpZ246ICdsZWZ0JyBhcyBjb25zdCwgd21MZWZ0OiAxMzAgKiBzLCB0YWdSaWdodDogMTcwICogcywgdGFnVG9wOiAxMjAgKiBzIH0sXG4gICAgcG9ydDogeyB3bVRvcDogaCAqIDAuNjQ1LCB3bVNpemU6IDEyOCAqIHMsIHdtQWxpZ246ICdjZW50ZXInIGFzIGNvbnN0LCB3bUxlZnQ6IDAsIHRhZ1JpZ2h0OiA5MCAqIHMsIHRhZ1RvcDogaCAqIDAuMTcgfSxcbiAgICBzcXVhcmU6IHsgd21Ub3A6IDc5MCAqIHMsIHdtU2l6ZTogMTE4ICogcywgd21BbGlnbjogJ2NlbnRlcicgYXMgY29uc3QsIHdtTGVmdDogMCwgdGFnUmlnaHQ6IDgwICogcywgdGFnVG9wOiAxMDAgKiBzIH0sXG4gIH1bbW9kZV07XG5cbiAgY29uc3Qgc3BhY2luZyA9IGludGVycG9sYXRlKHdtLCBbMCwgMV0sIFswLjMyLCAwLjE0XSk7XG4gIGNvbnN0IHN0cmluZ0xlbiA9IFcudGFnVG9wICsgMjAgKiBzO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBvdmVyZmxvdzogJ2hpZGRlbicsIGJhY2tncm91bmQ6IEMubmlnaHQwIH19PlxuICAgICAgPENpdHkgaWQ9XCJjMlwiIGhvcml6b249e2ggKiAwLjg2fSBnbG9iYWxGcmFtZT17Z2xvYmFsfSBkaW09ezAuNTV9IGdsb3c9e0Mub3JhbmdlfSBnbG93WT17MC41NX0gLz5cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgJHt3ICogMC42fXB4ICR7aCAqIDAuMzV9cHggYXQgNTUlIDU4JSwgJHtDLm9yYW5nZX00MCwgdHJhbnNwYXJlbnQgNzAlKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPEFic29sdXRlRmlsbCBkYXRhLWxheWVyPVwicHJvZHVjdFwiPlxuICAgICAgICA8U2hvZVxuICAgICAgICAgIGlkPVwiczJcIlxuICAgICAgICAgIHZpZXdCb3g9e3ZpZXdCb3h9XG4gICAgICAgICAgcHJlc2VydmU9XCJ4TWlkWU1pZCBzbGljZVwiXG4gICAgICAgICAgc2hlZW49e2ludGVycG9sYXRlKGYsIFsxNCwgODBdLCBbLTAuMiwgMS4yXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFYXNpbmcuaW5PdXQoRWFzaW5nLmN1YmljKSB9KX1cbiAgICAgICAgICBzdHlsZT17eyB3aWR0aDogdywgaGVpZ2h0OiBoLCBmaWx0ZXI6IGBkcm9wLXNoYWRvdygwICR7MjQgKiBzfXB4ICR7NTAgKiBzfXB4IHJnYmEoMCwwLDAsMC42KSlgIH19XG4gICAgICAgIC8+XG4gICAgICA8L0Fic29sdXRlRmlsbD5cbiAgICAgIHsvKiBmbG9vciBmYWRlIHNvIHRoZSB3b3JkbWFyayBzaXRzIG9uIGNsZWFuIGRhcmsgKi99XG4gICAgICA8QWJzb2x1dGVGaWxsXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB0cmFuc3BhcmVudCA1OCUsIHJnYmEoMyw2LDEzLDAuODUpIDgyJSwgcmdiYSgzLDYsMTMsMC45NSkgMTAwJSknIH19XG4gICAgICAvPlxuXG4gICAgICB7LyogaGFuZyB0YWcgKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgcmlnaHQ6IFcudGFnUmlnaHQsXG4gICAgICAgICAgdG9wOiBXLnRhZ1RvcCAtIHN0cmluZ0xlbixcbiAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IGA1MCUgMGAsXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gdGFnSW4pICogLTI2MCAqIHN9cHgpIHJvdGF0ZSgke3N3aW5nfWRlZylgLFxuICAgICAgICAgIG9wYWNpdHk6IHRhZ0luLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogMiAqIHMsIGhlaWdodDogc3RyaW5nTGVuLCBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgdHJhbnNwYXJlbnQsICNlMmU4ZjApJyB9fSAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgcGFkZGluZzogYCR7MzQgKiBzfXB4ICR7NDQgKiBzfXB4ICR7MjYgKiBzfXB4YCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTYwZGVnLCAjZmZmZmZmLCAjZTJlOGYwKScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDE2ICogcyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYDAgJHsyMCAqIHN9cHggJHs1MCAqIHN9cHggcmdiYSgwLDAsMCwwLjUpYCxcbiAgICAgICAgICAgIGJvcmRlclRvcDogYCR7OCAqIHN9cHggc29saWQgJHtDLm9yYW5nZX1gLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgdG9wOiAxMCAqIHMsXG4gICAgICAgICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICAgICAgICB3aWR0aDogMTQgKiBzLFxuICAgICAgICAgICAgICBoZWlnaHQ6IDE0ICogcyxcbiAgICAgICAgICAgICAgbWFyZ2luTGVmdDogLTcgKiBzLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzk0YTNiOCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGRhdGEtbGF5ZXI9XCJwcmljZVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA4MDAsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4NCAqIHMsXG4gICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wM2VtJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjMGIxMjIwJyxcbiAgICAgICAgICAgICAgZm9udFZhcmlhbnROdW1lcmljOiAndGFidWxhci1udW1zJyxcbiAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFx1MjBBQzE0OVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcDogVy53bVRvcCxcbiAgICAgICAgICBsZWZ0OiBXLndtTGVmdCxcbiAgICAgICAgICByaWdodDogVy53bUFsaWduID09PSAnY2VudGVyJyA/IDAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgdGV4dEFsaWduOiBXLndtQWxpZ24sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwid29yZG1hcmtcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA5MDAsXG4gICAgICAgICAgICBmb250U2l6ZTogVy53bVNpemUsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogYCR7c3BhY2luZ31lbWAsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogVy53bUFsaWduID09PSAnY2VudGVyJyA/IGAtJHtzcGFjaW5nfWVtYCA6IDAsXG4gICAgICAgICAgICBjb2xvcjogQy5pbmssXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IHdtLFxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigkeygxIC0gd20pICogMTQgKiBzfXB4KWAsXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiBgMCAwICR7NDAgKiBzfXB4ICR7Qy5vcmFuZ2V9NTVgLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBLRVNUUkVMXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8QWJzb2x1dGVGaWxsXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IEMub3JhbmdlLCBvcGFjaXR5OiBpbnRlcnBvbGF0ZShmLCBbMCwgOF0sIFswLjM1LCAwXSwgY2xhbXApLCBtaXhCbGVuZE1vZGU6ICdzY3JlZW4nIH19XG4gICAgICAvPlxuICAgICAgPFZpZ25ldHRlIC8+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob3QgMyBcdTIwMTQgQ2FsbCB0byBhY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNob3RDVEE6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBmID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IHsgZnBzIH0gPSB1c2VWaWRlb0NvbmZpZygpO1xuICBjb25zdCB7IHcsIGgsIG1vZGUsIHMgfSA9IHVzZUxheW91dCgpO1xuICBjb25zdCBnbG9iYWwgPSBmICsgMjEwO1xuXG4gIGNvbnN0IEwgPSB7XG4gICAgbGFuZDoge1xuICAgICAgYWxpZ246ICdsZWZ0JyBhcyBjb25zdCxcbiAgICAgIGxlZnQ6IDE0MCAqIHMsXG4gICAgICB3bVRvcDogMjUwICogcyxcbiAgICAgIHdtU2l6ZTogNDQgKiBzLFxuICAgICAgaGxUb3A6IDM0MCAqIHMsXG4gICAgICBobFNpemU6IDExMiAqIHMsXG4gICAgICBidG5Ub3A6IDU0MCAqIHMsXG4gICAgICBzaG9lVzogODIwICogcyxcbiAgICAgIHNob2VMZWZ0OiB3IC0gODYwICogcyxcbiAgICAgIHNob2VUb3A6IDMzMCAqIHMsXG4gICAgfSxcbiAgICBwb3J0OiB7XG4gICAgICBhbGlnbjogJ2NlbnRlcicgYXMgY29uc3QsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd21Ub3A6IGggKiAwLjE3LFxuICAgICAgd21TaXplOiA0MCAqIHMsXG4gICAgICBobFRvcDogaCAqIDAuNDU1LFxuICAgICAgaGxTaXplOiA5NiAqIHMsXG4gICAgICBidG5Ub3A6IGggKiAwLjU0LFxuICAgICAgc2hvZVc6IDg2MCAqIHMsXG4gICAgICBzaG9lTGVmdDogKHcgLSA4NjAgKiBzKSAvIDIsXG4gICAgICBzaG9lVG9wOiBoICogMC4yMTUsXG4gICAgfSxcbiAgICBzcXVhcmU6IHtcbiAgICAgIGFsaWduOiAnY2VudGVyJyBhcyBjb25zdCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB3bVRvcDogODAgKiBzLFxuICAgICAgd21TaXplOiAzOCAqIHMsXG4gICAgICBobFRvcDogNjAwICogcyxcbiAgICAgIGhsU2l6ZTogOTYgKiBzLFxuICAgICAgYnRuVG9wOiA3NjAgKiBzLFxuICAgICAgc2hvZVc6IDc4MCAqIHMsXG4gICAgICBzaG9lTGVmdDogKHcgLSA3ODAgKiBzKSAvIDIsXG4gICAgICBzaG9lVG9wOiAxNTAgKiBzLFxuICAgIH0sXG4gIH1bbW9kZV07XG5cbiAgY29uc3Qgc2hvZUggPSBMLnNob2VXIC8gMjtcbiAgY29uc3Qgc2hvZUluID0gc3ByaW5nKHsgZnJhbWU6IGYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDE4LCBzdGlmZm5lc3M6IDExMCwgbWFzczogMC45IH0gfSk7XG4gIGNvbnN0IGZsb2F0ID0gTWF0aC5zaW4oZiAvIDIwKSAqIDggKiBzO1xuXG4gIGNvbnN0IGhsID0gc3ByaW5nKHsgZnJhbWU6IGYgLSA2LCBmcHMsIGNvbmZpZzogeyBkYW1waW5nOiAyMDAsIHN0aWZmbmVzczogMTIwIH0gfSk7XG4gIGNvbnN0IGJhciA9IGludGVycG9sYXRlKGYsIFsxNiwgNDBdLCBbMCwgMV0sIHsgLi4uY2xhbXAsIGVhc2luZzogRUFTRV9PVVQgfSk7XG4gIGNvbnN0IGJ0biA9IHNwcmluZyh7IGZyYW1lOiBmIC0gMjYsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDE2LCBzdGlmZm5lc3M6IDE0MCB9LCBkdXJhdGlvbkluRnJhbWVzOiAyMiB9KTtcbiAgY29uc3QgYnRuT3BhY2l0eSA9IGludGVycG9sYXRlKGYsIFsyNiwgMzhdLCBbMCwgMV0sIGNsYW1wKTtcbiAgY29uc3Qgc2hpbmUgPSBpbnRlcnBvbGF0ZShmLCBbNjAsIDk1XSwgWzEzMCwgLTMwXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFYXNpbmcuaW5PdXQoRWFzaW5nLmN1YmljKSB9KTtcbiAgY29uc3Qgd21TcGFjaW5nID0gaW50ZXJwb2xhdGUoZiwgWzAsIDQwXSwgWzAuNjIsIDAuNDhdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IEVBU0VfT1VUIH0pO1xuXG4gIGNvbnN0IGJsb2NrID0gKHRvcDogbnVtYmVyKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcCxcbiAgICBsZWZ0OiBMLmxlZnQsXG4gICAgcmlnaHQ6IEwuYWxpZ24gPT09ICdjZW50ZXInID8gMCA6IHVuZGVmaW5lZCxcbiAgICB0ZXh0QWxpZ246IEwuYWxpZ24sXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICA8Q2l0eSBpZD1cImMzXCIgaG9yaXpvbj17aCAqIDAuOTR9IGdsb2JhbEZyYW1lPXtnbG9iYWx9IGRpbT17MC42Mn0gZ2xvdz17Qy50ZWFsfSBnbG93WT17MC40fSAvPlxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoY2lyY2xlICR7TWF0aC5tYXgodywgaCkgKiAwLjM4fXB4IGF0ICR7KChMLnNob2VMZWZ0ICsgTC5zaG9lVyAvIDIpIC8gdykgKiAxMDB9JSAkeygoTC5zaG9lVG9wICsgc2hvZUggLyAyKSAvIGgpICogMTAwfSUsICR7Qy50ZWFsfTM4LCB0cmFuc3BhcmVudCA3MCUpYCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHsvKiBwcm9kdWN0ICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IEwuc2hvZUxlZnQgKyBMLnNob2VXICogMC4xLFxuICAgICAgICAgIHRvcDogTC5zaG9lVG9wICsgc2hvZUggKiAwLjk1LFxuICAgICAgICAgIHdpZHRoOiBMLnNob2VXICogMC44LFxuICAgICAgICAgIGhlaWdodDogMjYgKiBzLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IGNlbnRlciwgcmdiYSgwLDAsMCwwLjgpLCB0cmFuc3BhcmVudCA3MCUpJyxcbiAgICAgICAgICBvcGFjaXR5OiBzaG9lSW4sXG4gICAgICAgICAgdHJhbnNmb3JtOiBgc2NhbGVYKCR7MSAtIGZsb2F0IC8gKDgwICogcyl9KWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogTC5zaG9lTGVmdCxcbiAgICAgICAgICB0b3A6IEwuc2hvZVRvcCArIGZsb2F0LFxuICAgICAgICAgIHdpZHRoOiBMLnNob2VXLFxuICAgICAgICAgIGhlaWdodDogc2hvZUgsXG4gICAgICAgICAgb3BhY2l0eTogaW50ZXJwb2xhdGUoc2hvZUluLCBbMCwgMC4zXSwgWzAsIDFdLCBjbGFtcCksXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gc2hvZUluKSAqIDgwICogc31weCkgcm90YXRlKCR7aW50ZXJwb2xhdGUoc2hvZUluLCBbMCwgMV0sIFs4LCAtNF0pfWRlZykgc2NhbGUoJHtpbnRlcnBvbGF0ZShzaG9lSW4sIFswLCAxXSwgWzAuODYsIDFdKX0pYCxcbiAgICAgICAgICBmaWx0ZXI6IGBkcm9wLXNoYWRvdygwICR7MzAgKiBzfXB4ICR7NTAgKiBzfXB4IHJnYmEoMjAsMTg0LDE2NiwwLjM1KSlgLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8U2hvZSBpZD1cInMzXCIgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfX0gc2hlZW49e2ludGVycG9sYXRlKGYsIFs0MCwgOTBdLCBbLTAuMiwgMS4yXSwgY2xhbXApfSAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiB3b3JkbWFyayBcdTIwMTQgdmlzaWJsZSBmcm9tIHRoZSBmaXJzdCBmcmFtZSBvZiB0aGUgc2hvdCAqL31cbiAgICAgIDxkaXYgc3R5bGU9e2Jsb2NrKEwud21Ub3ApfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJ3b3JkbWFya1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDkwMCxcbiAgICAgICAgICAgIGZvbnRTaXplOiBMLndtU2l6ZSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBgJHt3bVNwYWNpbmd9ZW1gLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IEwuYWxpZ24gPT09ICdjZW50ZXInID8gYC0ke3dtU3BhY2luZ31lbWAgOiAwLFxuICAgICAgICAgICAgY29sb3I6IEMudGVhbExpZ2h0LFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIEtFU1RSRUxcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIGhlYWRsaW5lICovfVxuICAgICAgPGRpdiBzdHlsZT17eyAuLi5ibG9jayhMLmhsVG9wKSwgcGFkZGluZ0JvdHRvbTogMTIgKiBzIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBvdmVyZmxvdzogJ2hpZGRlbicsIHBhZGRpbmc6IGAkezggKiBzfXB4ICR7NCAqIHN9cHhgIH19PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGRhdGEtbGF5ZXI9XCJoZWFkbGluZVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA4MDAsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBMLmhsU2l6ZSxcbiAgICAgICAgICAgICAgbGluZUhlaWdodDogMS4wNSxcbiAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAzNWVtJyxcbiAgICAgICAgICAgICAgY29sb3I6IEMuaW5rLFxuICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkeygxIC0gaGwpICogMTEwfSUpYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgT3V0IDI4IE5vdmVtYmVyXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cImFjY2VudFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGhlaWdodDogNiAqIHMsXG4gICAgICAgICAgICB3aWR0aDogMTQwICogcyxcbiAgICAgICAgICAgIG1hcmdpblRvcDogMTAgKiBzLFxuICAgICAgICAgICAgbWFyZ2luTGVmdDogTC5hbGlnbiA9PT0gJ2NlbnRlcicgPyAnYXV0bycgOiA0ICogcyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBMLmFsaWduID09PSAnY2VudGVyJyA/ICdhdXRvJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyAqIHMsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAke0Mub3JhbmdlfSwgJHtDLm9yYW5nZUxpZ2h0fSlgLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgc2NhbGVYKCR7YmFyfSlgLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBMLmFsaWduID09PSAnY2VudGVyJyA/ICc1MCUgNTAlJyA6ICcwIDUwJScsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogYnV0dG9uICovfVxuICAgICAgPGRpdiBzdHlsZT17YmxvY2soTC5idG5Ub3ApfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJidXR0b25cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgICAgICAgICBmb250U2l6ZTogNDQgKiBzLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wMWVtJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzFjMGEwMicsXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIHBhZGRpbmc6IGAkezMyICogc31weCAkezYwICogc31weGAsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDk5OSxcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudCgxMTBkZWcsIHRyYW5zcGFyZW50IDQwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjY1KSA1MCUsIHRyYW5zcGFyZW50IDYwJSksIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICR7Qy5vcmFuZ2VMaWdodH0sICR7Qy5vcmFuZ2V9KWAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJzI1MCUgMTAwJSwgMTAwJSAxMDAlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogYCR7c2hpbmV9JSAwLCAwIDBgLFxuICAgICAgICAgICAgYmFja2dyb3VuZFJlcGVhdDogJ25vLXJlcGVhdCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwICR7MTggKiBzfXB4ICR7NDQgKiBzfXB4IHJnYmEoMjQ5LDExNSwyMiwwLjQpLCBpbnNldCAwICR7MiAqIHN9cHggMCByZ2JhKDI1NSwyNTUsMjU1LDAuNSlgLFxuICAgICAgICAgICAgb3BhY2l0eTogYnRuT3BhY2l0eSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHsoMSAtIGJ0bikgKiAzMCAqIHN9cHgpIHNjYWxlKCR7aW50ZXJwb2xhdGUoYnRuLCBbMCwgMV0sIFswLjg2LCAxXSl9KWAsXG4gICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IEwuYWxpZ24gPT09ICdjZW50ZXInID8gJzUwJSA1MCUnIDogJzAgNTAlJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgR2V0IGVhcmx5IGFjY2Vzc1xuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPFZpZ25ldHRlIC8+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFJvb3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBWaWRlbygpIHtcbiAgY29uc3QgW3MxLCBzMiwgczNdID0gY29tcG9zaXRpb24uc2hvdHM7XG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiBDLm5pZ2h0MCwgZm9udEZhbWlseTogRk9OVCB9fT5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMS5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMS5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPXtzMS50aXRsZX0+XG4gICAgICAgIDxTaG90SGVybyAvPlxuICAgICAgPC9TZXF1ZW5jZT5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMi5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMi5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPXtzMi50aXRsZX0+XG4gICAgICAgIDxTaG90RGV0YWlsIC8+XG4gICAgICA8L1NlcXVlbmNlPlxuICAgICAgPFNlcXVlbmNlIGZyb209e3MzLmZyb219IGR1cmF0aW9uSW5GcmFtZXM9e3MzLmR1cmF0aW9uSW5GcmFtZXN9IG5hbWU9e3MzLnRpdGxlfT5cbiAgICAgICAgPFNob3RDVEEgLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsV0FBTyxVQUFVLFdBQVcsaUJBQWlCLFVBQVU7QUFBQTtBQUFBOzs7QUNBdkQ7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixtQkFBbUI7QUFBQTtBQUFBOzs7QUNDaEUsc0JBUU87QUFnRkM7QUExRUQsSUFBTSxjQUFjO0FBQUEsRUFDekIsS0FBSztBQUFBLEVBQ0wsa0JBQWtCO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsRUFBRSxHQUFHLEdBQUcsT0FBTyxnQkFBZ0IsTUFBTSxHQUFHLGtCQUFrQixHQUFHO0FBQUEsSUFDN0QsRUFBRSxHQUFHLEdBQUcsT0FBTyxV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
