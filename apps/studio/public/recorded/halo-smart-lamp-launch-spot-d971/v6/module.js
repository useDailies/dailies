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

// workspaces/halo-smart-lamp-launch-spot-d971/versions/v6/Video.tsx
var import_remotion = __toESM(require_remotion(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var composition = {
  fps: 30,
  durationInFrames: 300,
  shots: [
    { n: 1, title: "Product hero", from: 0, durationInFrames: 90 },
    { n: 2, title: "Colour", from: 90, durationInFrames: 90 },
    { n: 3, title: "Call to action", from: 180, durationInFrames: 120 }
  ]
};
var AMBER = [255, 166, 72];
var BLUE = [128, 178, 255];
var WHITE = [255, 255, 255];
var INK = [8, 8, 11];
var mix = (a, b, t) => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
var rgba = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
var CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
var FONT = '"SF Pro Display", ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
function getLayout(width, height) {
  const portrait = height > width;
  if (portrait) {
    const D2 = Math.round(width * 0.44);
    return {
      portrait,
      width,
      height,
      D: D2,
      lampX: width / 2,
      lampY: height * 0.665,
      textX: width / 2,
      captionY: height * 0.4,
      priceY: height * 0.4,
      wordmarkY: height * 0.355,
      buttonY: height * 0.475,
      captionSize: 92,
      priceSize: 84,
      wordmarkSize: 150,
      buttonSize: 46,
      footerHeight: 0,
      footerSize: 0
    };
  }
  const D = Math.round(height * 0.35);
  return {
    portrait,
    width,
    height,
    D,
    lampX: width * 0.31,
    lampY: height * 0.46,
    textX: width * 0.555,
    captionY: height * 0.46,
    priceY: height * 0.46,
    wordmarkY: height * 0.44,
    buttonY: height * 0.585,
    captionSize: 104,
    priceSize: 96,
    wordmarkSize: 176,
    buttonSize: 40,
    footerHeight: Math.round(height * 0.13),
    footerSize: 50
  };
}
function useTimeline() {
  const frame = (0, import_remotion.useCurrentFrame)();
  const { fps } = (0, import_remotion.useVideoConfig)();
  const switchOn = (0, import_remotion.spring)({ frame, fps, config: { damping: 14, stiffness: 90 }, durationInFrames: 22 });
  const breath = 1 + 0.035 * Math.sin(frame / fps * Math.PI * 0.9);
  const intensity = (0.5 + 0.5 * Math.min(switchOn, 1.08)) * breath;
  const hueT = (0, import_remotion.interpolate)(frame, [96, 158], [0, 1], {
    ...CLAMP,
    easing: import_remotion.Easing.bezier(0.65, 0, 0.35, 1)
  });
  const color = mix(AMBER, BLUE, hueT);
  return { frame, fps, intensity, hueT, color };
}
var Room = ({ L, color, intensity }) => {
  const { width, height, D, lampX, lampY, portrait } = L;
  const baseBottom = lampY + D / 2 + D * 0.07;
  const consoleH = D * (portrait ? 0.3 : 0.26);
  const floorY = baseBottom + consoleH;
  const consoleLeft = portrait ? lampX - width * 0.42 : -40;
  const consoleRight = portrait ? lampX + width * 0.42 : lampX + D * 1.05;
  const I = intensity;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { "data-layer": "background", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_remotion.AbsoluteFill,
      {
        style: {
          background: `linear-gradient(180deg, #0a090c 0%, #100e11 ${floorY / height * 100}%, #060507 ${floorY / height * 100}%, #030304 100%)`
        }
      }
    ),
    [0.12, 0.5, 0.88].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: width * x,
          top: 0,
          width: 1,
          height: floorY,
          background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.035) 60%, rgba(255,255,255,0) 100%)`
        }
      },
      i
    )),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: lampX - D * 4,
          top: lampY - D * 3.2,
          width: D * 8,
          height: D * 6.4,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${rgba(color, 0.2 * I)} 0%, ${rgba(
            color,
            0.08 * I
          )} 45%, rgba(0,0,0,0) 100%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: consoleLeft,
          top: baseBottom,
          width: consoleRight - consoleLeft,
          height: consoleH,
          borderRadius: 4,
          background: `linear-gradient(180deg, ${rgba(mix(color, [40, 36, 34], 0.55), 0.9)} 0px, #1a181b 3px, #121013 40%, #0a090b 100%)`,
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)"
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: lampX - D * 1.1,
          top: baseBottom - D * 0.08,
          width: D * 2.2,
          height: D * 0.22,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${rgba(color, 0.35 * I)}, rgba(0,0,0,0))`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: lampX - D * 1.8,
          top: floorY,
          width: D * 3.6,
          height: D * 0.5,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${rgba(color, 0.12 * I)}, rgba(0,0,0,0))`
        }
      }
    )
  ] });
};
var Lamp = ({
  L,
  color,
  intensity,
  frame,
  fps
}) => {
  const { D, lampX, lampY } = L;
  const r = D / 2;
  const I = Math.min(intensity, 1.1);
  const rise = (0, import_remotion.spring)({ frame, fps, config: { damping: 200 }, durationInFrames: 24 });
  const y = (0, import_remotion.interpolate)(rise, [0, 1], [D * 0.06, 0]);
  const core = mix(WHITE, color, 0.12);
  const mid = mix(WHITE, color, 0.55);
  const rim = mix(color, INK, 0.18);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "glow",
        style: {
          position: "absolute",
          left: lampX - D * 2.4,
          top: lampY - D * 2.4 + y,
          width: D * 4.8,
          height: D * 4.8,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${rgba(color, 0.42 * I)} 0%, ${rgba(
            color,
            0.16 * I
          )} 38%, rgba(0,0,0,0) 100%)`
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        "data-layer": "product",
        style: {
          position: "absolute",
          left: lampX - r,
          top: lampY - r + y,
          width: D,
          height: D * 1.07
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                position: "absolute",
                left: D * 0.27,
                top: D * 0.94,
                width: D * 0.46,
                height: D * 0.13,
                borderRadius: `${D * 0.03}px ${D * 0.03}px ${D * 0.05}px ${D * 0.05}px`,
                background: "linear-gradient(180deg, #4a4749 0%, #222023 40%, #121113 100%)",
                boxShadow: `inset 0 2px 0 ${rgba(color, 0.55 * I)}, 0 18px 30px rgba(0,0,0,0.55)`
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                height: D,
                borderRadius: "50%",
                background: "radial-gradient(circle at 38% 30%, #f6f4f1 0%, #d8d5d1 40%, #8a8784 78%, #3f3d3b 100%)"
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                height: D,
                borderRadius: "50%",
                opacity: Math.min(1, I),
                background: `radial-gradient(circle at 50% 40%, #ffffff 0%, ${rgba(core)} 20%, ${rgba(
                  mid
                )} 58%, ${rgba(color)} 84%, ${rgba(rim)} 100%)`,
                boxShadow: `0 0 ${D * 0.18}px ${rgba(color, 0.6 * I)}, 0 0 ${D * 0.6}px ${rgba(
                  color,
                  0.35 * I
                )}, inset 0 -${D * 0.06}px ${D * 0.12}px ${rgba(rim, 0.6)}`
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                position: "absolute",
                left: D * 0.2,
                top: D * 0.1,
                width: D * 0.34,
                height: D * 0.2,
                borderRadius: "50%",
                transform: "rotate(-28deg)",
                background: "radial-gradient(closest-side, rgba(255,255,255,0.75), rgba(255,255,255,0))"
              }
            }
          )
        ]
      }
    )
  ] });
};
var ListenRings = ({ L, color, frame }) => {
  const { D, lampX, lampY } = L;
  const shotFade = (0, import_remotion.interpolate)(frame, [14, 26, 76, 88], [0, 1, 1, 0], CLAMP);
  if (shotFade <= 0) return null;
  const period = 42;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { "data-layer": "listen-rings", children: [0, 1, 2].map((i) => {
    const local = frame - 14 - i * 14;
    if (local < 0) return null;
    const t = local % period / period;
    const s = 1.04 + import_remotion.Easing.out(import_remotion.Easing.cubic)(t) * 0.75;
    const o = (1 - t) * 0.55 * shotFade;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: lampX - D / 2,
          top: lampY - D / 2,
          width: D,
          height: D,
          borderRadius: "50%",
          border: `2px solid ${rgba(mix(WHITE, color, 0.5), o)}`,
          transform: `scale(${s})`
        }
      },
      i
    );
  }) });
};
var ColourDial = ({
  L,
  frame,
  hueT,
  color
}) => {
  const { D, lampX, lampY } = L;
  const o = (0, import_remotion.interpolate)(frame, [90, 102, 166, 178], [0, 1, 1, 0], CLAMP);
  if (o <= 0) return null;
  const R = D * 0.66;
  const size = R * 2 + 40;
  const circ = 2 * Math.PI * R;
  const sweep = Math.max(1e-3, hueT);
  const angle = -90 + sweep * 360;
  const kx = size / 2 + R * Math.cos(angle * Math.PI / 180);
  const ky = size / 2 + R * Math.sin(angle * Math.PI / 180);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      "data-layer": "colour-dial",
      width: size,
      height: size,
      style: { position: "absolute", left: lampX - size / 2, top: lampY - size / 2, opacity: o },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "dialGrad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: rgba(AMBER) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: rgba(BLUE) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: size / 2, cy: size / 2, r: R, fill: "none", stroke: "rgba(255,255,255,0.08)", strokeWidth: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "circle",
          {
            cx: size / 2,
            cy: size / 2,
            r: R,
            fill: "none",
            stroke: "url(#dialGrad)",
            strokeWidth: 3,
            strokeLinecap: "round",
            strokeDasharray: `${circ * sweep} ${circ}`,
            transform: `rotate(-90 ${size / 2} ${size / 2})`
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: kx, cy: ky, r: 9, fill: rgba(mix(WHITE, color, 0.3)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: kx, cy: ky, r: 20, fill: rgba(color, 0.25) })
      ]
    }
  );
};
var anchor = (L, y, dy, scale = 1) => ({
  position: "absolute",
  left: L.textX,
  top: y,
  whiteSpace: "nowrap",
  width: "max-content",
  fontFamily: FONT,
  transformOrigin: L.portrait ? "50% 50%" : "0% 50%",
  transform: `translate(${L.portrait ? "-50%" : "0"}, calc(-50% + ${dy}px)) scale(${scale})`
});
var Copy = ({ L, frame, fps, color }) => {
  const capIn = (0, import_remotion.spring)({ frame: frame - 4, fps, config: { damping: 200 }, durationInFrames: 18 });
  const capOut = (0, import_remotion.interpolate)(frame, [84, 90], [0, 1], CLAMP);
  const capOpacity = (0, import_remotion.interpolate)(capIn, [0, 0.6], [0, 1], CLAMP) * (1 - capOut);
  const capBlur = (0, import_remotion.interpolate)(capIn, [0, 1], [10, 0]) + capOut * 8;
  const priceIn = (0, import_remotion.spring)({ frame: frame - 98, fps, config: { damping: 15, stiffness: 120 }, durationInFrames: 22 });
  const priceOut = (0, import_remotion.interpolate)(frame, [166, 173], [0, 1], CLAMP);
  const priceOpacity = (0, import_remotion.interpolate)(frame, [98, 108], [0, 1], CLAMP) * (1 - priceOut);
  const wmIn = (0, import_remotion.spring)({ frame: frame - 172, fps, config: { damping: 200 }, durationInFrames: 30 });
  const wmOpacity = (0, import_remotion.interpolate)(frame, [173, 179], [0, 1], CLAMP);
  const wmTracking = (0, import_remotion.interpolate)(wmIn, [0, 1], [0.5, 0.34]);
  const btnIn = (0, import_remotion.spring)({ frame: frame - 196, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 24 });
  const btnOpacity = (0, import_remotion.interpolate)(frame, [196, 206], [0, 1], CLAMP);
  const shine = (0, import_remotion.interpolate)(frame, [228, 262], [-60, 160], CLAMP);
  const textColor = "#F6F2EC";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { children: [
    capOpacity > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "caption",
        style: {
          ...anchor(L, L.captionY, (0, import_remotion.interpolate)(capIn, [0, 1], [28, 0]) - capOut * 12),
          fontSize: L.captionSize,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: textColor,
          opacity: capOpacity,
          filter: `blur(${capBlur}px)`,
          textShadow: `0 0 40px ${rgba(AMBER, 0.25)}`
        },
        children: "Light that listens"
      }
    ),
    priceOpacity > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "price",
        style: {
          ...anchor(L, L.priceY, (0, import_remotion.interpolate)(priceIn, [0, 1], [24, 0]) - priceOut * 10, (0, import_remotion.interpolate)(priceIn, [0, 1], [0.92, 1])),
          fontSize: L.priceSize,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          color: rgba(mix(WHITE, color, 0.12)),
          padding: "0.26em 0.55em 0.26em 1.05em",
          borderRadius: "0.22em 0.5em 0.5em 0.22em",
          border: `2px solid ${rgba(mix(WHITE, color, 0.4), 0.45)}`,
          background: `radial-gradient(circle at 0.5em 50%, rgba(6,6,9,0.95) 0.09em, ${rgba(
            mix(WHITE, color, 0.6),
            0.7
          )} 0.1em, ${rgba(mix(WHITE, color, 0.6), 0)} 0.16em), linear-gradient(135deg, ${rgba(
            color,
            0.22
          )} 0%, rgba(255,255,255,0.05) 100%)`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.45), 0 0 50px ${rgba(color, 0.18)}`,
          opacity: priceOpacity
        },
        children: "$89"
      }
    ),
    wmOpacity > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "wordmark",
        style: {
          ...anchor(L, L.wordmarkY, (0, import_remotion.interpolate)(wmIn, [0, 1], [18, 0])),
          fontSize: L.wordmarkSize,
          fontWeight: 300,
          letterSpacing: `${wmTracking}em`,
          paddingLeft: L.portrait ? `${wmTracking}em` : 0,
          lineHeight: 1,
          color: textColor,
          opacity: wmOpacity,
          textShadow: `0 0 60px ${rgba(color, 0.35)}`
        },
        children: "HALO"
      }
    ),
    !L.portrait && btnOpacity > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "button",
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: L.footerHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          fontFamily: FONT,
          fontSize: L.footerSize,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          color: "#0b0c10",
          background: `linear-gradient(105deg, rgba(255,255,255,0) ${shine - 12}%, rgba(255,255,255,0.9) ${shine}%, rgba(255,255,255,0) ${shine + 12}%), linear-gradient(180deg, #ffffff 0%, ${rgba(mix(WHITE, color, 0.28))} 100%)`,
          boxShadow: `0 -24px 80px ${rgba(color, 0.3)}, inset 0 1px 0 rgba(255,255,255,0.9)`,
          clipPath: `inset(${(1 - Math.min(1, btnIn)) * 100}% 0 0 0)`,
          opacity: btnOpacity
        },
        children: "Pre-order now"
      }
    ),
    L.portrait && btnOpacity > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "button",
        style: {
          ...anchor(L, L.buttonY, (0, import_remotion.interpolate)(btnIn, [0, 1], [26, 0]), (0, import_remotion.interpolate)(btnIn, [0, 1], [0.94, 1])),
          fontSize: L.buttonSize,
          fontWeight: 600,
          letterSpacing: "-0.005em",
          lineHeight: 1,
          color: "#0b0c10",
          padding: "0.78em 1.7em",
          borderRadius: 999,
          background: `linear-gradient(105deg, rgba(255,255,255,0) ${shine - 20}%, rgba(255,255,255,0.95) ${shine}%, rgba(255,255,255,0) ${shine + 20}%), linear-gradient(180deg, #ffffff 0%, ${rgba(mix(WHITE, color, 0.22))} 100%)`,
          boxShadow: `0 18px 50px ${rgba(color, 0.35)}, inset 0 -2px 0 rgba(0,0,0,0.08)`,
          opacity: btnOpacity
        },
        children: "Pre-order now"
      }
    )
  ] });
};
var Finish = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { pointerEvents: "none" }, children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_remotion.AbsoluteFill,
    {
      style: { background: "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)" }
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "100%", height: "100%", style: { position: "absolute", inset: 0, opacity: 0.07, mixBlendMode: "overlay" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", { id: "grain", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feTurbulence", { type: "fractalNoise", baseFrequency: "0.85", numOctaves: 2, seed: 7, stitchTiles: "stitch" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", { type: "saturate", values: "0" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "100%", height: "100%", filter: "url(#grain)" })
  ] })
] });
function Video() {
  const { width, height } = (0, import_remotion.useVideoConfig)();
  const L = getLayout(width, height);
  const { frame, fps, intensity, hueT, color } = useTimeline();
  const push = (0, import_remotion.interpolate)(frame, [0, 300], [1, 1.045], { ...CLAMP, easing: import_remotion.Easing.inOut(import_remotion.Easing.sin) });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { backgroundColor: "#050406", overflow: "hidden" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { transform: `scale(${push})`, transformOrigin: `${L.lampX}px ${L.lampY}px` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Room, { L, color, intensity }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenRings, { L, color, frame }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColourDial, { L, frame, hueT, color }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { L, color, intensity, frame, fps })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finish, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { L, frame, fps, color })
  ] });
}
export {
  composition,
  Video as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9oYWxvLXNtYXJ0LWxhbXAtbGF1bmNoLXNwb3QtZDk3MS92ZXJzaW9ucy92Ni9WaWRlby50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVtb3Rpb25cIl07IiwgIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVhY3QvanN4LXJ1bnRpbWVcIl07IiwgIi8qXG4gKiBIYWxvIGxhdW5jaCBzcG90IFx1MjAxNCAxMHMsIDMwIGZwcywgMzAwIGZyYW1lczsgMTY6OSArIDk6MTYuXG4gKlxuICogMSAgMDowMFx1MjAxMzA6MDMgIGYwXHUyMDEzODkgICAgIEhlcm86IGFtYmVyIGxhbXAsIFwiTGlnaHQgdGhhdCBsaXN0ZW5zXCJcbiAqIDIgIDA6MDNcdTIwMTMwOjA2ICBmOTBcdTIwMTMxNzkgICBDb2xvdXI6IGFtYmVyIFx1MjE5MiBibHVlLCBcIiQ4OVwiIHRhZ1xuICogMyAgMDowNlx1MjAxMzA6MTAgIGYxODBcdTIwMTMyOTkgIENUQTogSEFMTyB3b3JkbWFyaywgXCJQcmUtb3JkZXIgbm93XCJcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBpbnRlcnBvbGF0ZSxcbiAgc3ByaW5nLFxuICB1c2VDdXJyZW50RnJhbWUsXG4gIHVzZVZpZGVvQ29uZmlnLFxufSBmcm9tICdyZW1vdGlvbic7XG5cbmV4cG9ydCBjb25zdCBjb21wb3NpdGlvbiA9IHtcbiAgZnBzOiAzMCxcbiAgZHVyYXRpb25JbkZyYW1lczogMzAwLFxuICBzaG90czogW1xuICAgIHtuOiAxLCB0aXRsZTogJ1Byb2R1Y3QgaGVybycsIGZyb206IDAsIGR1cmF0aW9uSW5GcmFtZXM6IDkwfSxcbiAgICB7bjogMiwgdGl0bGU6ICdDb2xvdXInLCBmcm9tOiA5MCwgZHVyYXRpb25JbkZyYW1lczogOTB9LFxuICAgIHtuOiAzLCB0aXRsZTogJ0NhbGwgdG8gYWN0aW9uJywgZnJvbTogMTgwLCBkdXJhdGlvbkluRnJhbWVzOiAxMjB9LFxuICBdLFxufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBQYWxldHRlICsgaGVscGVycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxudHlwZSBSR0IgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5jb25zdCBBTUJFUjogUkdCID0gWzI1NSwgMTY2LCA3Ml07XG5jb25zdCBCTFVFOiBSR0IgPSBbMTI4LCAxNzgsIDI1NV07XG5jb25zdCBXSElURTogUkdCID0gWzI1NSwgMjU1LCAyNTVdO1xuY29uc3QgSU5LOiBSR0IgPSBbOCwgOCwgMTFdO1xuXG5jb25zdCBtaXggPSAoYTogUkdCLCBiOiBSR0IsIHQ6IG51bWJlcik6IFJHQiA9PlxuICBbMCwgMSwgMl0ubWFwKChpKSA9PiBNYXRoLnJvdW5kKGFbaV0gKyAoYltpXSAtIGFbaV0pICogdCkpIGFzIFJHQjtcbmNvbnN0IHJnYmEgPSAoYzogUkdCLCBhID0gMSkgPT4gYHJnYmEoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0sJHthfSlgO1xuXG5jb25zdCBDTEFNUCA9IHtleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsIGV4dHJhcG9sYXRlUmlnaHQ6ICdjbGFtcCd9IGFzIGNvbnN0O1xuY29uc3QgRk9OVCA9XG4gICdcIlNGIFBybyBEaXNwbGF5XCIsIHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTGF5b3V0IHBlciBhc3BlY3QgcmF0aW8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbnR5cGUgTGF5b3V0ID0gUmV0dXJuVHlwZTx0eXBlb2YgZ2V0TGF5b3V0PjtcblxuZnVuY3Rpb24gZ2V0TGF5b3V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gIGNvbnN0IHBvcnRyYWl0ID0gaGVpZ2h0ID4gd2lkdGg7XG4gIGlmIChwb3J0cmFpdCkge1xuICAgIC8vIDk6MTYgXHUyMDE0IHRleHQgbGl2ZXMgaW4gdGhlIHNhZmUgYmFuZCAoMTQlLi42NSUgb2YgaGVpZ2h0KTsgdGhlIGxhbXBcbiAgICAvLyBzaXRzIGxvdyBhbmQgdGhyb3dzIGl0cyBsaWdodCB1cCBpbnRvIHRoZSBjb3B5LlxuICAgIGNvbnN0IEQgPSBNYXRoLnJvdW5kKHdpZHRoICogMC40NCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnRyYWl0LFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBELFxuICAgICAgbGFtcFg6IHdpZHRoIC8gMixcbiAgICAgIGxhbXBZOiBoZWlnaHQgKiAwLjY2NSxcbiAgICAgIHRleHRYOiB3aWR0aCAvIDIsXG4gICAgICBjYXB0aW9uWTogaGVpZ2h0ICogMC40LFxuICAgICAgcHJpY2VZOiBoZWlnaHQgKiAwLjQsXG4gICAgICB3b3JkbWFya1k6IGhlaWdodCAqIDAuMzU1LFxuICAgICAgYnV0dG9uWTogaGVpZ2h0ICogMC40NzUsXG4gICAgICBjYXB0aW9uU2l6ZTogOTIsXG4gICAgICBwcmljZVNpemU6IDg0LFxuICAgICAgd29yZG1hcmtTaXplOiAxNTAsXG4gICAgICBidXR0b25TaXplOiA0NixcbiAgICAgIGZvb3RlckhlaWdodDogMCxcbiAgICAgIGZvb3RlclNpemU6IDAsXG4gICAgfTtcbiAgfVxuICAvLyAxNjo5IFx1MjAxNCBsYW1wIG9uIHRoZSBsZWZ0IHRoaXJkLCBjb3B5IG9uIHRoZSByaWdodC5cbiAgY29uc3QgRCA9IE1hdGgucm91bmQoaGVpZ2h0ICogMC4zNSk7XG4gIHJldHVybiB7XG4gICAgcG9ydHJhaXQsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIEQsXG4gICAgbGFtcFg6IHdpZHRoICogMC4zMSxcbiAgICBsYW1wWTogaGVpZ2h0ICogMC40NixcbiAgICB0ZXh0WDogd2lkdGggKiAwLjU1NSxcbiAgICBjYXB0aW9uWTogaGVpZ2h0ICogMC40NixcbiAgICBwcmljZVk6IGhlaWdodCAqIDAuNDYsXG4gICAgd29yZG1hcmtZOiBoZWlnaHQgKiAwLjQ0LFxuICAgIGJ1dHRvblk6IGhlaWdodCAqIDAuNTg1LFxuICAgIGNhcHRpb25TaXplOiAxMDQsXG4gICAgcHJpY2VTaXplOiA5NixcbiAgICB3b3JkbWFya1NpemU6IDE3NixcbiAgICBidXR0b25TaXplOiA0MCxcbiAgICBmb290ZXJIZWlnaHQ6IE1hdGgucm91bmQoaGVpZ2h0ICogMC4xMyksXG4gICAgZm9vdGVyU2l6ZTogNTAsXG4gIH07XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogVGltZWxpbmUgdmFsdWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmZ1bmN0aW9uIHVzZVRpbWVsaW5lKCkge1xuICBjb25zdCBmcmFtZSA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7ZnBzfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG5cbiAgLy8gTGFtcCBzd2l0Y2hlcyBvbjogYWxyZWFkeSBnbG93aW5nIG9uIGZyYW1lIDAsIGZ1bGx5IGxpdCBieSB+MC42cy5cbiAgY29uc3Qgc3dpdGNoT24gPSBzcHJpbmcoe2ZyYW1lLCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDE0LCBzdGlmZm5lc3M6IDkwfSwgZHVyYXRpb25JbkZyYW1lczogMjJ9KTtcbiAgY29uc3QgYnJlYXRoID0gMSArIDAuMDM1ICogTWF0aC5zaW4oKGZyYW1lIC8gZnBzKSAqIE1hdGguUEkgKiAwLjkpO1xuICBjb25zdCBpbnRlbnNpdHkgPSAoMC41ICsgMC41ICogTWF0aC5taW4oc3dpdGNoT24sIDEuMDgpKSAqIGJyZWF0aDtcblxuICAvLyBBbWJlciBcdTIxOTIgc29mdCBibHVlIGR1cmluZyBzaG90IDIuXG4gIGNvbnN0IGh1ZVQgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzk2LCAxNThdLCBbMCwgMV0sIHtcbiAgICAuLi5DTEFNUCxcbiAgICBlYXNpbmc6IEVhc2luZy5iZXppZXIoMC42NSwgMCwgMC4zNSwgMSksXG4gIH0pO1xuICBjb25zdCBjb2xvciA9IG1peChBTUJFUiwgQkxVRSwgaHVlVCk7XG5cbiAgcmV0dXJuIHtmcmFtZSwgZnBzLCBpbnRlbnNpdHksIGh1ZVQsIGNvbG9yfTtcbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBSb29tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgUm9vbTogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgaW50ZW5zaXR5OiBudW1iZXJ9PiA9ICh7TCwgY29sb3IsIGludGVuc2l0eX0pID0+IHtcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIEQsIGxhbXBYLCBsYW1wWSwgcG9ydHJhaXR9ID0gTDtcbiAgY29uc3QgYmFzZUJvdHRvbSA9IGxhbXBZICsgRCAvIDIgKyBEICogMC4wNztcbiAgY29uc3QgY29uc29sZUggPSBEICogKHBvcnRyYWl0ID8gMC4zIDogMC4yNik7XG4gIGNvbnN0IGZsb29yWSA9IGJhc2VCb3R0b20gKyBjb25zb2xlSDtcbiAgY29uc3QgY29uc29sZUxlZnQgPSBwb3J0cmFpdCA/IGxhbXBYIC0gd2lkdGggKiAwLjQyIDogLTQwO1xuICBjb25zdCBjb25zb2xlUmlnaHQgPSBwb3J0cmFpdCA/IGxhbXBYICsgd2lkdGggKiAwLjQyIDogbGFtcFggKyBEICogMS4wNTtcbiAgY29uc3QgSSA9IGludGVuc2l0eTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIj5cbiAgICAgIHsvKiB3YWxsICovfVxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGEwOTBjIDAlLCAjMTAwZTExICR7KGZsb29yWSAvIGhlaWdodCkgKiAxMDB9JSwgIzA2MDUwNyAke1xuICAgICAgICAgICAgKGZsb29yWSAvIGhlaWdodCkgKiAxMDBcbiAgICAgICAgICB9JSwgIzAzMDMwNCAxMDAlKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHdhbGwgcGFuZWxzICovfVxuICAgICAge1swLjEyLCAwLjUsIDAuODhdLm1hcCgoeCwgaSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IHdpZHRoICogeCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBmbG9vclksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjAzNSkgNjAlLCByZ2JhKDI1NSwyNTUsMjU1LDApIDEwMCUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgICB7LyogbGlnaHQgd2FzaGluZyB0aGUgd2FsbCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiA0LFxuICAgICAgICAgIHRvcDogbGFtcFkgLSBEICogMy4yLFxuICAgICAgICAgIHdpZHRoOiBEICogOCxcbiAgICAgICAgICBoZWlnaHQ6IEQgKiA2LjQsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjIgKiBJKX0gMCUsICR7cmdiYShcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgMC4wOCAqIElcbiAgICAgICAgICApfSA0NSUsIHJnYmEoMCwwLDAsMCkgMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBsb3cgY29uc29sZSB0aGUgbGFtcCBzdGFuZHMgb24gKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogY29uc29sZUxlZnQsXG4gICAgICAgICAgdG9wOiBiYXNlQm90dG9tLFxuICAgICAgICAgIHdpZHRoOiBjb25zb2xlUmlnaHQgLSBjb25zb2xlTGVmdCxcbiAgICAgICAgICBoZWlnaHQ6IGNvbnNvbGVILFxuICAgICAgICAgIGJvcmRlclJhZGl1czogNCxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgJHtyZ2JhKG1peChjb2xvciwgWzQwLCAzNiwgMzRdLCAwLjU1KSwgMC45KX0gMHB4LCAjMWExODFiIDNweCwgIzEyMTAxMyA0MCUsICMwYTA5MGIgMTAwJSlgLFxuICAgICAgICAgIGJveFNoYWRvdzogJzAgMzBweCA2MHB4IHJnYmEoMCwwLDAsMC42KScsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHBvb2wgb2YgbGlnaHQgb24gdGhlIGNvbnNvbGUgdG9wICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAqIDEuMSxcbiAgICAgICAgICB0b3A6IGJhc2VCb3R0b20gLSBEICogMC4wOCxcbiAgICAgICAgICB3aWR0aDogRCAqIDIuMixcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjIyLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsICR7cmdiYShjb2xvciwgMC4zNSAqIEkpfSwgcmdiYSgwLDAsMCwwKSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBmbG9vciByZWZsZWN0aW9uICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAqIDEuOCxcbiAgICAgICAgICB0b3A6IGZsb29yWSxcbiAgICAgICAgICB3aWR0aDogRCAqIDMuNixcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjUsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjEyICogSSl9LCByZ2JhKDAsMCwwLDApKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBUaGUgbGFtcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgTGFtcDogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgaW50ZW5zaXR5OiBudW1iZXI7IGZyYW1lOiBudW1iZXI7IGZwczogbnVtYmVyfT4gPSAoe1xuICBMLFxuICBjb2xvcixcbiAgaW50ZW5zaXR5LFxuICBmcmFtZSxcbiAgZnBzLFxufSkgPT4ge1xuICBjb25zdCB7RCwgbGFtcFgsIGxhbXBZfSA9IEw7XG4gIGNvbnN0IHIgPSBEIC8gMjtcbiAgY29uc3QgSSA9IE1hdGgubWluKGludGVuc2l0eSwgMS4xKTtcbiAgY29uc3QgcmlzZSA9IHNwcmluZyh7ZnJhbWUsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMjAwfSwgZHVyYXRpb25JbkZyYW1lczogMjR9KTtcbiAgY29uc3QgeSA9IGludGVycG9sYXRlKHJpc2UsIFswLCAxXSwgW0QgKiAwLjA2LCAwXSk7XG5cbiAgY29uc3QgY29yZSA9IG1peChXSElURSwgY29sb3IsIDAuMTIpO1xuICBjb25zdCBtaWQgPSBtaXgoV0hJVEUsIGNvbG9yLCAwLjU1KTtcbiAgY29uc3QgcmltID0gbWl4KGNvbG9yLCBJTkssIDAuMTgpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHsvKiBibG9vbSBiZWhpbmQgdGhlIGxhbXAgKi99XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtbGF5ZXI9XCJnbG93XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiAyLjQsXG4gICAgICAgICAgdG9wOiBsYW1wWSAtIEQgKiAyLjQgKyB5LFxuICAgICAgICAgIHdpZHRoOiBEICogNC44LFxuICAgICAgICAgIGhlaWdodDogRCAqIDQuOCxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoY2xvc2VzdC1zaWRlLCAke3JnYmEoY29sb3IsIDAuNDIgKiBJKX0gMCUsICR7cmdiYShcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgMC4xNiAqIElcbiAgICAgICAgICApfSAzOCUsIHJnYmEoMCwwLDAsMCkgMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxkaXZcbiAgICAgICAgZGF0YS1sYXllcj1cInByb2R1Y3RcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gcixcbiAgICAgICAgICB0b3A6IGxhbXBZIC0gciArIHksXG4gICAgICAgICAgd2lkdGg6IEQsXG4gICAgICAgICAgaGVpZ2h0OiBEICogMS4wNyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgey8qIGJhc2UgcHVjayAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IEQgKiAwLjI3LFxuICAgICAgICAgICAgdG9wOiBEICogMC45NCxcbiAgICAgICAgICAgIHdpZHRoOiBEICogMC40NixcbiAgICAgICAgICAgIGhlaWdodDogRCAqIDAuMTMsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IGAke0QgKiAwLjAzfXB4ICR7RCAqIDAuMDN9cHggJHtEICogMC4wNX1weCAke0QgKiAwLjA1fXB4YCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjNGE0NzQ5IDAlLCAjMjIyMDIzIDQwJSwgIzEyMTExMyAxMDAlKScsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGBpbnNldCAwIDJweCAwICR7cmdiYShjb2xvciwgMC41NSAqIEkpfSwgMCAxOHB4IDMwcHggcmdiYSgwLDAsMCwwLjU1KWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgey8qIHVubGl0IHNwaGVyZTogbWF0dGUgd2hpdGUgZ2xhc3MgKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBpbnNldDogMCxcbiAgICAgICAgICAgIGhlaWdodDogRCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgICAncmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAzOCUgMzAlLCAjZjZmNGYxIDAlLCAjZDhkNWQxIDQwJSwgIzhhODc4NCA3OCUsICMzZjNkM2IgMTAwJSknLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIHsvKiBsaXQgc3BoZXJlICovfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgaW5zZXQ6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IEQsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgb3BhY2l0eTogTWF0aC5taW4oMSwgSSksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA1MCUgNDAlLCAjZmZmZmZmIDAlLCAke3JnYmEoY29yZSl9IDIwJSwgJHtyZ2JhKFxuICAgICAgICAgICAgICBtaWRcbiAgICAgICAgICAgICl9IDU4JSwgJHtyZ2JhKGNvbG9yKX0gODQlLCAke3JnYmEocmltKX0gMTAwJSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwICR7RCAqIDAuMTh9cHggJHtyZ2JhKGNvbG9yLCAwLjYgKiBJKX0sIDAgMCAke0QgKiAwLjZ9cHggJHtyZ2JhKFxuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgMC4zNSAqIElcbiAgICAgICAgICAgICl9LCBpbnNldCAwIC0ke0QgKiAwLjA2fXB4ICR7RCAqIDAuMTJ9cHggJHtyZ2JhKHJpbSwgMC42KX1gLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIHsvKiBzcGVjdWxhciBzaGVlbiAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IEQgKiAwLjIsXG4gICAgICAgICAgICB0b3A6IEQgKiAwLjEsXG4gICAgICAgICAgICB3aWR0aDogRCAqIDAuMzQsXG4gICAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKC0yOGRlZyknLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsIHJnYmEoMjU1LDI1NSwyNTUsMC43NSksIHJnYmEoMjU1LDI1NSwyNTUsMCkpJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob3Qtc3BlY2lmaWMgZ3JhcGhpY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vLyBTaG90IDE6IHNvZnQgcmluZ3MgXCJsaXN0ZW5pbmdcIiBvdXR3YXJkIGZyb20gdGhlIGxhbXAuXG5jb25zdCBMaXN0ZW5SaW5nczogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgZnJhbWU6IG51bWJlcn0+ID0gKHtMLCBjb2xvciwgZnJhbWV9KSA9PiB7XG4gIGNvbnN0IHtELCBsYW1wWCwgbGFtcFl9ID0gTDtcbiAgY29uc3Qgc2hvdEZhZGUgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzE0LCAyNiwgNzYsIDg4XSwgWzAsIDEsIDEsIDBdLCBDTEFNUCk7XG4gIGlmIChzaG90RmFkZSA8PSAwKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcGVyaW9kID0gNDI7XG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBkYXRhLWxheWVyPVwibGlzdGVuLXJpbmdzXCI+XG4gICAgICB7WzAsIDEsIDJdLm1hcCgoaSkgPT4ge1xuICAgICAgICBjb25zdCBsb2NhbCA9IGZyYW1lIC0gMTQgLSBpICogMTQ7XG4gICAgICAgIGlmIChsb2NhbCA8IDApIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCB0ID0gKGxvY2FsICUgcGVyaW9kKSAvIHBlcmlvZDtcbiAgICAgICAgY29uc3QgcyA9IDEuMDQgKyBFYXNpbmcub3V0KEVhc2luZy5jdWJpYykodCkgKiAwLjc1O1xuICAgICAgICBjb25zdCBvID0gKDEgLSB0KSAqIDAuNTUgKiBzaG90RmFkZTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgbGVmdDogbGFtcFggLSBEIC8gMixcbiAgICAgICAgICAgICAgdG9wOiBsYW1wWSAtIEQgLyAyLFxuICAgICAgICAgICAgICB3aWR0aDogRCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBELFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgICBib3JkZXI6IGAycHggc29saWQgJHtyZ2JhKG1peChXSElURSwgY29sb3IsIDAuNSksIG8pfWAsXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7c30pYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLy8gU2hvdCAyOiBhIGNvbG91ciBkaWFsIHRoYXQgc3dlZXBzIGFtYmVyIFx1MjE5MiBibHVlIGFyb3VuZCB0aGUgbGFtcC5cbmNvbnN0IENvbG91ckRpYWw6IFJlYWN0LkZDPHtMOiBMYXlvdXQ7IGZyYW1lOiBudW1iZXI7IGh1ZVQ6IG51bWJlcjsgY29sb3I6IFJHQn0+ID0gKHtcbiAgTCxcbiAgZnJhbWUsXG4gIGh1ZVQsXG4gIGNvbG9yLFxufSkgPT4ge1xuICBjb25zdCB7RCwgbGFtcFgsIGxhbXBZfSA9IEw7XG4gIGNvbnN0IG8gPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzkwLCAxMDIsIDE2NiwgMTc4XSwgWzAsIDEsIDEsIDBdLCBDTEFNUCk7XG4gIGlmIChvIDw9IDApIHJldHVybiBudWxsO1xuICBjb25zdCBSID0gRCAqIDAuNjY7XG4gIGNvbnN0IHNpemUgPSBSICogMiArIDQwO1xuICBjb25zdCBjaXJjID0gMiAqIE1hdGguUEkgKiBSO1xuICBjb25zdCBzd2VlcCA9IE1hdGgubWF4KDAuMDAxLCBodWVUKTtcbiAgY29uc3QgYW5nbGUgPSAtOTAgKyBzd2VlcCAqIDM2MDtcbiAgY29uc3Qga3ggPSBzaXplIC8gMiArIFIgKiBNYXRoLmNvcygoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MCk7XG4gIGNvbnN0IGt5ID0gc2l6ZSAvIDIgKyBSICogTWF0aC5zaW4oKGFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIGRhdGEtbGF5ZXI9XCJjb2xvdXItZGlhbFwiXG4gICAgICB3aWR0aD17c2l6ZX1cbiAgICAgIGhlaWdodD17c2l6ZX1cbiAgICAgIHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGxhbXBYIC0gc2l6ZSAvIDIsIHRvcDogbGFtcFkgLSBzaXplIC8gMiwgb3BhY2l0eTogb319XG4gICAgPlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cImRpYWxHcmFkXCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9e3JnYmEoQU1CRVIpfSAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9e3JnYmEoQkxVRSl9IC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICA8L2RlZnM+XG4gICAgICA8Y2lyY2xlIGN4PXtzaXplIC8gMn0gY3k9e3NpemUgLyAyfSByPXtSfSBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInJnYmEoMjU1LDI1NSwyNTUsMC4wOClcIiBzdHJva2VXaWR0aD17Mn0gLz5cbiAgICAgIDxjaXJjbGVcbiAgICAgICAgY3g9e3NpemUgLyAyfVxuICAgICAgICBjeT17c2l6ZSAvIDJ9XG4gICAgICAgIHI9e1J9XG4gICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgc3Ryb2tlPVwidXJsKCNkaWFsR3JhZClcIlxuICAgICAgICBzdHJva2VXaWR0aD17M31cbiAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtgJHtjaXJjICogc3dlZXB9ICR7Y2lyY31gfVxuICAgICAgICB0cmFuc2Zvcm09e2Byb3RhdGUoLTkwICR7c2l6ZSAvIDJ9ICR7c2l6ZSAvIDJ9KWB9XG4gICAgICAvPlxuICAgICAgPGNpcmNsZSBjeD17a3h9IGN5PXtreX0gcj17OX0gZmlsbD17cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjMpKX0gLz5cbiAgICAgIDxjaXJjbGUgY3g9e2t4fSBjeT17a3l9IHI9ezIwfSBmaWxsPXtyZ2JhKGNvbG9yLCAwLjI1KX0gLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogQ29weSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IGFuY2hvciA9IChMOiBMYXlvdXQsIHk6IG51bWJlciwgZHk6IG51bWJlciwgc2NhbGUgPSAxKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgbGVmdDogTC50ZXh0WCxcbiAgdG9wOiB5LFxuICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgd2lkdGg6ICdtYXgtY29udGVudCcsXG4gIGZvbnRGYW1pbHk6IEZPTlQsXG4gIHRyYW5zZm9ybU9yaWdpbjogTC5wb3J0cmFpdCA/ICc1MCUgNTAlJyA6ICcwJSA1MCUnLFxuICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtMLnBvcnRyYWl0ID8gJy01MCUnIDogJzAnfSwgY2FsYygtNTAlICsgJHtkeX1weCkpIHNjYWxlKCR7c2NhbGV9KWAsXG59KTtcblxuY29uc3QgQ29weTogUmVhY3QuRkM8e0w6IExheW91dDsgZnJhbWU6IG51bWJlcjsgZnBzOiBudW1iZXI7IGNvbG9yOiBSR0J9PiA9ICh7TCwgZnJhbWUsIGZwcywgY29sb3J9KSA9PiB7XG4gIC8vIFNob3QgMSBjYXB0aW9uIFx1MjAxNCBmdWxseSBpbiBieSB+MDowMC43LCBvdXQgYXQgdGhlIGN1dC5cbiAgY29uc3QgY2FwSW4gPSBzcHJpbmcoe2ZyYW1lOiBmcmFtZSAtIDQsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMjAwfSwgZHVyYXRpb25JbkZyYW1lczogMTh9KTtcbiAgY29uc3QgY2FwT3V0ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFs4NCwgOTBdLCBbMCwgMV0sIENMQU1QKTtcbiAgY29uc3QgY2FwT3BhY2l0eSA9IGludGVycG9sYXRlKGNhcEluLCBbMCwgMC42XSwgWzAsIDFdLCBDTEFNUCkgKiAoMSAtIGNhcE91dCk7XG4gIGNvbnN0IGNhcEJsdXIgPSBpbnRlcnBvbGF0ZShjYXBJbiwgWzAsIDFdLCBbMTAsIDBdKSArIGNhcE91dCAqIDg7XG5cbiAgLy8gU2hvdCAyIHByaWNlIHRhZyBcdTIwMTQgaW4gYnkgMDowMy43LCBob2xkcyB0aHJvdWdoIDA6MDUuNi5cbiAgY29uc3QgcHJpY2VJbiA9IHNwcmluZyh7ZnJhbWU6IGZyYW1lIC0gOTgsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMTUsIHN0aWZmbmVzczogMTIwfSwgZHVyYXRpb25JbkZyYW1lczogMjJ9KTtcbiAgY29uc3QgcHJpY2VPdXQgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzE2NiwgMTczXSwgWzAsIDFdLCBDTEFNUCk7XG4gIGNvbnN0IHByaWNlT3BhY2l0eSA9IGludGVycG9sYXRlKGZyYW1lLCBbOTgsIDEwOF0sIFswLCAxXSwgQ0xBTVApICogKDEgLSBwcmljZU91dCk7XG5cbiAgLy8gU2hvdCAzIHdvcmRtYXJrIFx1MjAxNCBmdWxseSBwcmVzZW50IGZyb20gdGhlIGN1dCBhdCAwOjA2LlxuICBjb25zdCB3bUluID0gc3ByaW5nKHtmcmFtZTogZnJhbWUgLSAxNzIsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMjAwfSwgZHVyYXRpb25JbkZyYW1lczogMzB9KTtcbiAgY29uc3Qgd21PcGFjaXR5ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsxNzMsIDE3OV0sIFswLCAxXSwgQ0xBTVApO1xuICBjb25zdCB3bVRyYWNraW5nID0gaW50ZXJwb2xhdGUod21JbiwgWzAsIDFdLCBbMC41LCAwLjM0XSk7XG5cbiAgLy8gU2hvdCAzIGJ1dHRvbiBcdTIwMTQgZnVsbHkgaW4gYnkgfjA6MDcuXG4gIGNvbnN0IGJ0bkluID0gc3ByaW5nKHtmcmFtZTogZnJhbWUgLSAxOTYsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMTYsIHN0aWZmbmVzczogMTEwfSwgZHVyYXRpb25JbkZyYW1lczogMjR9KTtcbiAgY29uc3QgYnRuT3BhY2l0eSA9IGludGVycG9sYXRlKGZyYW1lLCBbMTk2LCAyMDZdLCBbMCwgMV0sIENMQU1QKTtcbiAgY29uc3Qgc2hpbmUgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzIyOCwgMjYyXSwgWy02MCwgMTYwXSwgQ0xBTVApO1xuXG4gIGNvbnN0IHRleHRDb2xvciA9ICcjRjZGMkVDJztcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGw+XG4gICAgICB7Y2FwT3BhY2l0eSA+IDAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cImNhcHRpb25cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5hbmNob3IoTCwgTC5jYXB0aW9uWSwgaW50ZXJwb2xhdGUoY2FwSW4sIFswLCAxXSwgWzI4LCAwXSkgLSBjYXBPdXQgKiAxMiksXG4gICAgICAgICAgICBmb250U2l6ZTogTC5jYXB0aW9uU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wM2VtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuMSxcbiAgICAgICAgICAgIGNvbG9yOiB0ZXh0Q29sb3IsXG4gICAgICAgICAgICBvcGFjaXR5OiBjYXBPcGFjaXR5LFxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigke2NhcEJsdXJ9cHgpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IGAwIDAgNDBweCAke3JnYmEoQU1CRVIsIDAuMjUpfWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIExpZ2h0IHRoYXQgbGlzdGVuc1xuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHtwcmljZU9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJwcmljZVwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLmFuY2hvcihMLCBMLnByaWNlWSwgaW50ZXJwb2xhdGUocHJpY2VJbiwgWzAsIDFdLCBbMjQsIDBdKSAtIHByaWNlT3V0ICogMTAsIGludGVycG9sYXRlKHByaWNlSW4sIFswLCAxXSwgWzAuOTIsIDFdKSksXG4gICAgICAgICAgICBmb250U2l6ZTogTC5wcmljZVNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDJlbScsXG4gICAgICAgICAgICBmb250VmFyaWFudE51bWVyaWM6ICd0YWJ1bGFyLW51bXMnLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKG1peChXSElURSwgY29sb3IsIDAuMTIpKSxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjI2ZW0gMC41NWVtIDAuMjZlbSAxLjA1ZW0nLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMC4yMmVtIDAuNWVtIDAuNWVtIDAuMjJlbScsXG4gICAgICAgICAgICBib3JkZXI6IGAycHggc29saWQgJHtyZ2JhKG1peChXSElURSwgY29sb3IsIDAuNCksIDAuNDUpfWAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAwLjVlbSA1MCUsIHJnYmEoNiw2LDksMC45NSkgMC4wOWVtLCAke3JnYmEoXG4gICAgICAgICAgICAgIG1peChXSElURSwgY29sb3IsIDAuNiksXG4gICAgICAgICAgICAgIDAuN1xuICAgICAgICAgICAgKX0gMC4xZW0sICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjYpLCAwLjApfSAwLjE2ZW0pLCBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAke3JnYmEoXG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAwLjIyXG4gICAgICAgICAgICApfSAwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjA1KSAxMDAlKWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwIDIwcHggNjBweCByZ2JhKDAsMCwwLDAuNDUpLCAwIDAgNTBweCAke3JnYmEoY29sb3IsIDAuMTgpfWAsXG4gICAgICAgICAgICBvcGFjaXR5OiBwcmljZU9wYWNpdHksXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgICQ4OVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHt3bU9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJ3b3JkbWFya1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLmFuY2hvcihMLCBMLndvcmRtYXJrWSwgaW50ZXJwb2xhdGUod21JbiwgWzAsIDFdLCBbMTgsIDBdKSksXG4gICAgICAgICAgICBmb250U2l6ZTogTC53b3JkbWFya1NpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAzMDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBgJHt3bVRyYWNraW5nfWVtYCxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBMLnBvcnRyYWl0ID8gYCR7d21UcmFja2luZ31lbWAgOiAwLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiB0ZXh0Q29sb3IsXG4gICAgICAgICAgICBvcGFjaXR5OiB3bU9wYWNpdHksXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiBgMCAwIDYwcHggJHtyZ2JhKGNvbG9yLCAwLjM1KX1gLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBIQUxPXG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIDE2OjkgXHUyMDE0IHRoZSBDVEEgaXMgYSBmdWxsLXdpZHRoIGJ1eSBiYXIgZG9ja2VkIHRvIHRoZSBib3R0b20gZWRnZS5cbiAgICAgICAgICBJdCByZXZlYWxzIHdpdGggYSBjbGlwIGZyb20gaXRzIHRvcCBlZGdlLCBzbyBpdHMgYm94IGFuZCB0ZXh0IG5ldmVyXG4gICAgICAgICAgbGVhdmUgdGhlIGZyYW1lLiAoOToxNiBrZWVwcyB0aGUgcGlsbDogdGhlIHN0b3J5Ym9hcmQgZm9yYmlkcyBhbnlcbiAgICAgICAgICBidXR0b24gaW4gdGhlIGJvdHRvbSAzNSUgb2YgdGhhdCBjdXQuKSAqL31cbiAgICAgIHshTC5wb3J0cmFpdCAmJiBidG5PcGFjaXR5ID4gMCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiYnV0dG9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IEwuZm9vdGVySGVpZ2h0LFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250U2l6ZTogTC5mb290ZXJTaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAxZW0nLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiAnIzBiMGMxMCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDEwNWRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAke3NoaW5lIC0gMTJ9JSwgcmdiYSgyNTUsMjU1LDI1NSwwLjkpICR7c2hpbmV9JSwgcmdiYSgyNTUsMjU1LDI1NSwwKSAke1xuICAgICAgICAgICAgICBzaGluZSArIDEyXG4gICAgICAgICAgICB9JSksIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjI4KSl9IDEwMCUpYCxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYDAgLTI0cHggODBweCAke3JnYmEoY29sb3IsIDAuMyl9LCBpbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsMC45KWAsXG4gICAgICAgICAgICBjbGlwUGF0aDogYGluc2V0KCR7KDEgLSBNYXRoLm1pbigxLCBidG5JbikpICogMTAwfSUgMCAwIDApYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IGJ0bk9wYWNpdHksXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIFByZS1vcmRlciBub3dcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7TC5wb3J0cmFpdCAmJiBidG5PcGFjaXR5ID4gMCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiYnV0dG9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uYW5jaG9yKEwsIEwuYnV0dG9uWSwgaW50ZXJwb2xhdGUoYnRuSW4sIFswLCAxXSwgWzI2LCAwXSksIGludGVycG9sYXRlKGJ0bkluLCBbMCwgMV0sIFswLjk0LCAxXSkpLFxuICAgICAgICAgICAgZm9udFNpemU6IEwuYnV0dG9uU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wMDVlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgY29sb3I6ICcjMGIwYzEwJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjc4ZW0gMS43ZW0nLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA5OTksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDEwNWRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAke3NoaW5lIC0gMjB9JSwgcmdiYSgyNTUsMjU1LDI1NSwwLjk1KSAke3NoaW5lfSUsIHJnYmEoMjU1LDI1NSwyNTUsMCkgJHtcbiAgICAgICAgICAgICAgc2hpbmUgKyAyMFxuICAgICAgICAgICAgfSUpLCBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAke3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC4yMikpfSAxMDAlKWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwIDE4cHggNTBweCAke3JnYmEoY29sb3IsIDAuMzUpfSwgaW5zZXQgMCAtMnB4IDAgcmdiYSgwLDAsMCwwLjA4KWAsXG4gICAgICAgICAgICBvcGFjaXR5OiBidG5PcGFjaXR5LFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBQcmUtb3JkZXIgbm93XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogRmluaXNoaW5nOiB2aWduZXR0ZSArIGdyYWluICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IEZpbmlzaDogUmVhY3QuRkMgPSAoKSA9PiAoXG4gIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3twb2ludGVyRXZlbnRzOiAnbm9uZSd9fT5cbiAgICA8QWJzb2x1dGVGaWxsXG4gICAgICBzdHlsZT17e2JhY2tncm91bmQ6ICdyYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCA1MCUgNDglLCByZ2JhKDAsMCwwLDApIDQ1JSwgcmdiYSgwLDAsMCwwLjU1KSAxMDAlKSd9fVxuICAgIC8+XG4gICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsIG9wYWNpdHk6IDAuMDcsIG1peEJsZW5kTW9kZTogJ292ZXJsYXknfX0+XG4gICAgICA8ZmlsdGVyIGlkPVwiZ3JhaW5cIj5cbiAgICAgICAgPGZlVHVyYnVsZW5jZSB0eXBlPVwiZnJhY3RhbE5vaXNlXCIgYmFzZUZyZXF1ZW5jeT1cIjAuODVcIiBudW1PY3RhdmVzPXsyfSBzZWVkPXs3fSBzdGl0Y2hUaWxlcz1cInN0aXRjaFwiIC8+XG4gICAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9XCJzYXR1cmF0ZVwiIHZhbHVlcz1cIjBcIiAvPlxuICAgICAgPC9maWx0ZXI+XG4gICAgICA8cmVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgZmlsdGVyPVwidXJsKCNncmFpbilcIiAvPlxuICAgIDwvc3ZnPlxuICA8L0Fic29sdXRlRmlsbD5cbik7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogQ29tcG9zaXRpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFZpZGVvKCkge1xuICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSB1c2VWaWRlb0NvbmZpZygpO1xuICBjb25zdCBMID0gZ2V0TGF5b3V0KHdpZHRoLCBoZWlnaHQpO1xuICBjb25zdCB7ZnJhbWUsIGZwcywgaW50ZW5zaXR5LCBodWVULCBjb2xvcn0gPSB1c2VUaW1lbGluZSgpO1xuXG4gIC8vIFNsb3cgY2FtZXJhIHB1c2ggaW50byB0aGUgbGFtcCBhY3Jvc3MgdGhlIHdob2xlIHNwb3QuXG4gIGNvbnN0IHB1c2ggPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzAsIDMwMF0sIFsxLCAxLjA0NV0sIHsuLi5DTEFNUCwgZWFzaW5nOiBFYXNpbmcuaW5PdXQoRWFzaW5nLnNpbil9KTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6ICcjMDUwNDA2Jywgb3ZlcmZsb3c6ICdoaWRkZW4nfX0+XG4gICAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7dHJhbnNmb3JtOiBgc2NhbGUoJHtwdXNofSlgLCB0cmFuc2Zvcm1PcmlnaW46IGAke0wubGFtcFh9cHggJHtMLmxhbXBZfXB4YH19PlxuICAgICAgICA8Um9vbSBMPXtMfSBjb2xvcj17Y29sb3J9IGludGVuc2l0eT17aW50ZW5zaXR5fSAvPlxuICAgICAgICA8TGlzdGVuUmluZ3MgTD17TH0gY29sb3I9e2NvbG9yfSBmcmFtZT17ZnJhbWV9IC8+XG4gICAgICAgIDxDb2xvdXJEaWFsIEw9e0x9IGZyYW1lPXtmcmFtZX0gaHVlVD17aHVlVH0gY29sb3I9e2NvbG9yfSAvPlxuICAgICAgICA8TGFtcCBMPXtMfSBjb2xvcj17Y29sb3J9IGludGVuc2l0eT17aW50ZW5zaXR5fSBmcmFtZT17ZnJhbWV9IGZwcz17ZnBzfSAvPlxuICAgICAgPC9BYnNvbHV0ZUZpbGw+XG4gICAgICA8RmluaXNoIC8+XG4gICAgICA8Q29weSBMPXtMfSBmcmFtZT17ZnJhbWV9IGZwcz17ZnBzfSBjb2xvcj17Y29sb3J9IC8+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsV0FBTyxVQUFVLFdBQVcsaUJBQWlCLFVBQVU7QUFBQTtBQUFBOzs7QUNBdkQ7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixtQkFBbUI7QUFBQTtBQUFBOzs7QUNRaEUsc0JBT087QUEwSEg7QUF4SEcsSUFBTSxjQUFjO0FBQUEsRUFDekIsS0FBSztBQUFBLEVBQ0wsa0JBQWtCO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsRUFBQyxHQUFHLEdBQUcsT0FBTyxnQkFBZ0IsTUFBTSxHQUFHLGtCQUFrQixHQUFFO0FBQUEsSUFDM0QsRUFBQyxHQUFHLEdBQUcsT0FBTyxVQUFVLE1BQU0sSUFBSSxrQkFBa0IsR0FBRTtBQUFBLElBQ3RELEVBQUMsR0FBRyxHQUFHLE9BQU8sa0JBQWtCLE1BQU0sS0FBSyxrQkFBa0IsSUFBRztBQUFBLEVBQ2xFO0FBQ0Y7QUFPQSxJQUFNLFFBQWEsQ0FBQyxLQUFLLEtBQUssRUFBRTtBQUNoQyxJQUFNLE9BQVksQ0FBQyxLQUFLLEtBQUssR0FBRztBQUNoQyxJQUFNLFFBQWEsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUNqQyxJQUFNLE1BQVcsQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUUxQixJQUFNLE1BQU0sQ0FBQyxHQUFRLEdBQVEsTUFDM0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFF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
