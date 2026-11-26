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

// workspaces/halo-smart-lamp-launch-spot-d971/versions/v7/Video.tsx
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { "data-layer": "glow", style: { overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
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
    ) }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9oYWxvLXNtYXJ0LWxhbXAtbGF1bmNoLXNwb3QtZDk3MS92ZXJzaW9ucy92Ny9WaWRlby50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVtb3Rpb25cIl07IiwgIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVhY3QvanN4LXJ1bnRpbWVcIl07IiwgIi8qXG4gKiBIYWxvIGxhdW5jaCBzcG90IFx1MjAxNCAxMHMsIDMwIGZwcywgMzAwIGZyYW1lczsgMTY6OSArIDk6MTYuXG4gKlxuICogMSAgMDowMFx1MjAxMzA6MDMgIGYwXHUyMDEzODkgICAgIEhlcm86IGFtYmVyIGxhbXAsIFwiTGlnaHQgdGhhdCBsaXN0ZW5zXCJcbiAqIDIgIDA6MDNcdTIwMTMwOjA2ICBmOTBcdTIwMTMxNzkgICBDb2xvdXI6IGFtYmVyIFx1MjE5MiBibHVlLCBcIiQ4OVwiIHRhZ1xuICogMyAgMDowNlx1MjAxMzA6MTAgIGYxODBcdTIwMTMyOTkgIENUQTogSEFMTyB3b3JkbWFyaywgXCJQcmUtb3JkZXIgbm93XCJcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBpbnRlcnBvbGF0ZSxcbiAgc3ByaW5nLFxuICB1c2VDdXJyZW50RnJhbWUsXG4gIHVzZVZpZGVvQ29uZmlnLFxufSBmcm9tICdyZW1vdGlvbic7XG5cbmV4cG9ydCBjb25zdCBjb21wb3NpdGlvbiA9IHtcbiAgZnBzOiAzMCxcbiAgZHVyYXRpb25JbkZyYW1lczogMzAwLFxuICBzaG90czogW1xuICAgIHtuOiAxLCB0aXRsZTogJ1Byb2R1Y3QgaGVybycsIGZyb206IDAsIGR1cmF0aW9uSW5GcmFtZXM6IDkwfSxcbiAgICB7bjogMiwgdGl0bGU6ICdDb2xvdXInLCBmcm9tOiA5MCwgZHVyYXRpb25JbkZyYW1lczogOTB9LFxuICAgIHtuOiAzLCB0aXRsZTogJ0NhbGwgdG8gYWN0aW9uJywgZnJvbTogMTgwLCBkdXJhdGlvbkluRnJhbWVzOiAxMjB9LFxuICBdLFxufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBQYWxldHRlICsgaGVscGVycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxudHlwZSBSR0IgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5jb25zdCBBTUJFUjogUkdCID0gWzI1NSwgMTY2LCA3Ml07XG5jb25zdCBCTFVFOiBSR0IgPSBbMTI4LCAxNzgsIDI1NV07XG5jb25zdCBXSElURTogUkdCID0gWzI1NSwgMjU1LCAyNTVdO1xuY29uc3QgSU5LOiBSR0IgPSBbOCwgOCwgMTFdO1xuXG5jb25zdCBtaXggPSAoYTogUkdCLCBiOiBSR0IsIHQ6IG51bWJlcik6IFJHQiA9PlxuICBbMCwgMSwgMl0ubWFwKChpKSA9PiBNYXRoLnJvdW5kKGFbaV0gKyAoYltpXSAtIGFbaV0pICogdCkpIGFzIFJHQjtcbmNvbnN0IHJnYmEgPSAoYzogUkdCLCBhID0gMSkgPT4gYHJnYmEoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0sJHthfSlgO1xuXG5jb25zdCBDTEFNUCA9IHtleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsIGV4dHJhcG9sYXRlUmlnaHQ6ICdjbGFtcCd9IGFzIGNvbnN0O1xuY29uc3QgRk9OVCA9XG4gICdcIlNGIFBybyBEaXNwbGF5XCIsIHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTGF5b3V0IHBlciBhc3BlY3QgcmF0aW8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbnR5cGUgTGF5b3V0ID0gUmV0dXJuVHlwZTx0eXBlb2YgZ2V0TGF5b3V0PjtcblxuZnVuY3Rpb24gZ2V0TGF5b3V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gIGNvbnN0IHBvcnRyYWl0ID0gaGVpZ2h0ID4gd2lkdGg7XG4gIGlmIChwb3J0cmFpdCkge1xuICAgIC8vIDk6MTYgXHUyMDE0IHRleHQgbGl2ZXMgaW4gdGhlIHNhZmUgYmFuZCAoMTQlLi42NSUgb2YgaGVpZ2h0KTsgdGhlIGxhbXBcbiAgICAvLyBzaXRzIGxvdyBhbmQgdGhyb3dzIGl0cyBsaWdodCB1cCBpbnRvIHRoZSBjb3B5LlxuICAgIGNvbnN0IEQgPSBNYXRoLnJvdW5kKHdpZHRoICogMC40NCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnRyYWl0LFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBELFxuICAgICAgbGFtcFg6IHdpZHRoIC8gMixcbiAgICAgIGxhbXBZOiBoZWlnaHQgKiAwLjY2NSxcbiAgICAgIHRleHRYOiB3aWR0aCAvIDIsXG4gICAgICBjYXB0aW9uWTogaGVpZ2h0ICogMC40LFxuICAgICAgcHJpY2VZOiBoZWlnaHQgKiAwLjQsXG4gICAgICB3b3JkbWFya1k6IGhlaWdodCAqIDAuMzU1LFxuICAgICAgYnV0dG9uWTogaGVpZ2h0ICogMC40NzUsXG4gICAgICBjYXB0aW9uU2l6ZTogOTIsXG4gICAgICBwcmljZVNpemU6IDg0LFxuICAgICAgd29yZG1hcmtTaXplOiAxNTAsXG4gICAgICBidXR0b25TaXplOiA0NixcbiAgICAgIGZvb3RlckhlaWdodDogMCxcbiAgICAgIGZvb3RlclNpemU6IDAsXG4gICAgfTtcbiAgfVxuICAvLyAxNjo5IFx1MjAxNCBsYW1wIG9uIHRoZSBsZWZ0IHRoaXJkLCBjb3B5IG9uIHRoZSByaWdodC5cbiAgY29uc3QgRCA9IE1hdGgucm91bmQoaGVpZ2h0ICogMC4zNSk7XG4gIHJldHVybiB7XG4gICAgcG9ydHJhaXQsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIEQsXG4gICAgbGFtcFg6IHdpZHRoICogMC4zMSxcbiAgICBsYW1wWTogaGVpZ2h0ICogMC40NixcbiAgICB0ZXh0WDogd2lkdGggKiAwLjU1NSxcbiAgICBjYXB0aW9uWTogaGVpZ2h0ICogMC40NixcbiAgICBwcmljZVk6IGhlaWdodCAqIDAuNDYsXG4gICAgd29yZG1hcmtZOiBoZWlnaHQgKiAwLjQ0LFxuICAgIGJ1dHRvblk6IGhlaWdodCAqIDAuNTg1LFxuICAgIGNhcHRpb25TaXplOiAxMDQsXG4gICAgcHJpY2VTaXplOiA5NixcbiAgICB3b3JkbWFya1NpemU6IDE3NixcbiAgICBidXR0b25TaXplOiA0MCxcbiAgICBmb290ZXJIZWlnaHQ6IE1hdGgucm91bmQoaGVpZ2h0ICogMC4xMyksXG4gICAgZm9vdGVyU2l6ZTogNTAsXG4gIH07XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogVGltZWxpbmUgdmFsdWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmZ1bmN0aW9uIHVzZVRpbWVsaW5lKCkge1xuICBjb25zdCBmcmFtZSA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7ZnBzfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG5cbiAgLy8gTGFtcCBzd2l0Y2hlcyBvbjogYWxyZWFkeSBnbG93aW5nIG9uIGZyYW1lIDAsIGZ1bGx5IGxpdCBieSB+MC42cy5cbiAgY29uc3Qgc3dpdGNoT24gPSBzcHJpbmcoe2ZyYW1lLCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDE0LCBzdGlmZm5lc3M6IDkwfSwgZHVyYXRpb25JbkZyYW1lczogMjJ9KTtcbiAgY29uc3QgYnJlYXRoID0gMSArIDAuMDM1ICogTWF0aC5zaW4oKGZyYW1lIC8gZnBzKSAqIE1hdGguUEkgKiAwLjkpO1xuICBjb25zdCBpbnRlbnNpdHkgPSAoMC41ICsgMC41ICogTWF0aC5taW4oc3dpdGNoT24sIDEuMDgpKSAqIGJyZWF0aDtcblxuICAvLyBBbWJlciBcdTIxOTIgc29mdCBibHVlIGR1cmluZyBzaG90IDIuXG4gIGNvbnN0IGh1ZVQgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzk2LCAxNThdLCBbMCwgMV0sIHtcbiAgICAuLi5DTEFNUCxcbiAgICBlYXNpbmc6IEVhc2luZy5iZXppZXIoMC42NSwgMCwgMC4zNSwgMSksXG4gIH0pO1xuICBjb25zdCBjb2xvciA9IG1peChBTUJFUiwgQkxVRSwgaHVlVCk7XG5cbiAgcmV0dXJuIHtmcmFtZSwgZnBzLCBpbnRlbnNpdHksIGh1ZVQsIGNvbG9yfTtcbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBSb29tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgUm9vbTogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgaW50ZW5zaXR5OiBudW1iZXJ9PiA9ICh7TCwgY29sb3IsIGludGVuc2l0eX0pID0+IHtcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIEQsIGxhbXBYLCBsYW1wWSwgcG9ydHJhaXR9ID0gTDtcbiAgY29uc3QgYmFzZUJvdHRvbSA9IGxhbXBZICsgRCAvIDIgKyBEICogMC4wNztcbiAgY29uc3QgY29uc29sZUggPSBEICogKHBvcnRyYWl0ID8gMC4zIDogMC4yNik7XG4gIGNvbnN0IGZsb29yWSA9IGJhc2VCb3R0b20gKyBjb25zb2xlSDtcbiAgY29uc3QgY29uc29sZUxlZnQgPSBwb3J0cmFpdCA/IGxhbXBYIC0gd2lkdGggKiAwLjQyIDogLTQwO1xuICBjb25zdCBjb25zb2xlUmlnaHQgPSBwb3J0cmFpdCA/IGxhbXBYICsgd2lkdGggKiAwLjQyIDogbGFtcFggKyBEICogMS4wNTtcbiAgY29uc3QgSSA9IGludGVuc2l0eTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIj5cbiAgICAgIHsvKiB3YWxsICovfVxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGEwOTBjIDAlLCAjMTAwZTExICR7KGZsb29yWSAvIGhlaWdodCkgKiAxMDB9JSwgIzA2MDUwNyAke1xuICAgICAgICAgICAgKGZsb29yWSAvIGhlaWdodCkgKiAxMDBcbiAgICAgICAgICB9JSwgIzAzMDMwNCAxMDAlKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHdhbGwgcGFuZWxzICovfVxuICAgICAge1swLjEyLCAwLjUsIDAuODhdLm1hcCgoeCwgaSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IHdpZHRoICogeCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBmbG9vclksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjAzNSkgNjAlLCByZ2JhKDI1NSwyNTUsMjU1LDApIDEwMCUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgICB7LyogbGlnaHQgd2FzaGluZyB0aGUgd2FsbCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiA0LFxuICAgICAgICAgIHRvcDogbGFtcFkgLSBEICogMy4yLFxuICAgICAgICAgIHdpZHRoOiBEICogOCxcbiAgICAgICAgICBoZWlnaHQ6IEQgKiA2LjQsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjIgKiBJKX0gMCUsICR7cmdiYShcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgMC4wOCAqIElcbiAgICAgICAgICApfSA0NSUsIHJnYmEoMCwwLDAsMCkgMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBsb3cgY29uc29sZSB0aGUgbGFtcCBzdGFuZHMgb24gKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogY29uc29sZUxlZnQsXG4gICAgICAgICAgdG9wOiBiYXNlQm90dG9tLFxuICAgICAgICAgIHdpZHRoOiBjb25zb2xlUmlnaHQgLSBjb25zb2xlTGVmdCxcbiAgICAgICAgICBoZWlnaHQ6IGNvbnNvbGVILFxuICAgICAgICAgIGJvcmRlclJhZGl1czogNCxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgJHtyZ2JhKG1peChjb2xvciwgWzQwLCAzNiwgMzRdLCAwLjU1KSwgMC45KX0gMHB4LCAjMWExODFiIDNweCwgIzEyMTAxMyA0MCUsICMwYTA5MGIgMTAwJSlgLFxuICAgICAgICAgIGJveFNoYWRvdzogJzAgMzBweCA2MHB4IHJnYmEoMCwwLDAsMC42KScsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHBvb2wgb2YgbGlnaHQgb24gdGhlIGNvbnNvbGUgdG9wICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAqIDEuMSxcbiAgICAgICAgICB0b3A6IGJhc2VCb3R0b20gLSBEICogMC4wOCxcbiAgICAgICAgICB3aWR0aDogRCAqIDIuMixcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjIyLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsICR7cmdiYShjb2xvciwgMC4zNSAqIEkpfSwgcmdiYSgwLDAsMCwwKSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBmbG9vciByZWZsZWN0aW9uICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAqIDEuOCxcbiAgICAgICAgICB0b3A6IGZsb29yWSxcbiAgICAgICAgICB3aWR0aDogRCAqIDMuNixcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjUsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjEyICogSSl9LCByZ2JhKDAsMCwwLDApKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBUaGUgbGFtcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgTGFtcDogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgaW50ZW5zaXR5OiBudW1iZXI7IGZyYW1lOiBudW1iZXI7IGZwczogbnVtYmVyfT4gPSAoe1xuICBMLFxuICBjb2xvcixcbiAgaW50ZW5zaXR5LFxuICBmcmFtZSxcbiAgZnBzLFxufSkgPT4ge1xuICBjb25zdCB7RCwgbGFtcFgsIGxhbXBZfSA9IEw7XG4gIGNvbnN0IHIgPSBEIC8gMjtcbiAgY29uc3QgSSA9IE1hdGgubWluKGludGVuc2l0eSwgMS4xKTtcbiAgY29uc3QgcmlzZSA9IHNwcmluZyh7ZnJhbWUsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMjAwfSwgZHVyYXRpb25JbkZyYW1lczogMjR9KTtcbiAgY29uc3QgeSA9IGludGVycG9sYXRlKHJpc2UsIFswLCAxXSwgW0QgKiAwLjA2LCAwXSk7XG5cbiAgY29uc3QgY29yZSA9IG1peChXSElURSwgY29sb3IsIDAuMTIpO1xuICBjb25zdCBtaWQgPSBtaXgoV0hJVEUsIGNvbG9yLCAwLjU1KTtcbiAgY29uc3QgcmltID0gbWl4KGNvbG9yLCBJTkssIDAuMTgpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHsvKiBibG9vbSBiZWhpbmQgdGhlIGxhbXAgXHUyMDE0IGNsaXBwZWQgdG8gdGhlIGZyYW1lIHNvIHRoZSBsYXllciBuZXZlclxuICAgICAgICAgIG1lYXN1cmVzIGFzIGV4dGVuZGluZyBvdXRzaWRlIGl0ICovfVxuICAgICAgPEFic29sdXRlRmlsbCBkYXRhLWxheWVyPVwiZ2xvd1wiIHN0eWxlPXt7b3ZlcmZsb3c6ICdoaWRkZW4nfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiAyLjQsXG4gICAgICAgICAgICB0b3A6IGxhbXBZIC0gRCAqIDIuNCArIHksXG4gICAgICAgICAgICB3aWR0aDogRCAqIDQuOCxcbiAgICAgICAgICAgIGhlaWdodDogRCAqIDQuOCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjQyICogSSl9IDAlLCAke3JnYmEoXG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAwLjE2ICogSVxuICAgICAgICAgICAgKX0gMzglLCByZ2JhKDAsMCwwLDApIDEwMCUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9BYnNvbHV0ZUZpbGw+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtbGF5ZXI9XCJwcm9kdWN0XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIHIsXG4gICAgICAgICAgdG9wOiBsYW1wWSAtIHIgKyB5LFxuICAgICAgICAgIHdpZHRoOiBELFxuICAgICAgICAgIGhlaWdodDogRCAqIDEuMDcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHsvKiBiYXNlIHB1Y2sgKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBEICogMC4yNyxcbiAgICAgICAgICAgIHRvcDogRCAqIDAuOTQsXG4gICAgICAgICAgICB3aWR0aDogRCAqIDAuNDYsXG4gICAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjEzLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBgJHtEICogMC4wM31weCAke0QgKiAwLjAzfXB4ICR7RCAqIDAuMDV9cHggJHtEICogMC4wNX1weGAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzRhNDc0OSAwJSwgIzIyMjAyMyA0MCUsICMxMjExMTMgMTAwJSknLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgaW5zZXQgMCAycHggMCAke3JnYmEoY29sb3IsIDAuNTUgKiBJKX0sIDAgMThweCAzMHB4IHJnYmEoMCwwLDAsMC41NSlgLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIHsvKiB1bmxpdCBzcGhlcmU6IG1hdHRlIHdoaXRlIGdsYXNzICovfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgaW5zZXQ6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IEQsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDpcbiAgICAgICAgICAgICAgJ3JhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgMzglIDMwJSwgI2Y2ZjRmMSAwJSwgI2Q4ZDVkMSA0MCUsICM4YTg3ODQgNzglLCAjM2YzZDNiIDEwMCUpJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICB7LyogbGl0IHNwaGVyZSAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGluc2V0OiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBELFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IE1hdGgubWluKDEsIEkpLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgNTAlIDQwJSwgI2ZmZmZmZiAwJSwgJHtyZ2JhKGNvcmUpfSAyMCUsICR7cmdiYShcbiAgICAgICAgICAgICAgbWlkXG4gICAgICAgICAgICApfSA1OCUsICR7cmdiYShjb2xvcil9IDg0JSwgJHtyZ2JhKHJpbSl9IDEwMCUpYCxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCAke0QgKiAwLjE4fXB4ICR7cmdiYShjb2xvciwgMC42ICogSSl9LCAwIDAgJHtEICogMC42fXB4ICR7cmdiYShcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIDAuMzUgKiBJXG4gICAgICAgICAgICApfSwgaW5zZXQgMCAtJHtEICogMC4wNn1weCAke0QgKiAwLjEyfXB4ICR7cmdiYShyaW0sIDAuNil9YCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICB7Lyogc3BlY3VsYXIgc2hlZW4gKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBEICogMC4yLFxuICAgICAgICAgICAgdG9wOiBEICogMC4xLFxuICAgICAgICAgICAgd2lkdGg6IEQgKiAwLjM0LFxuICAgICAgICAgICAgaGVpZ2h0OiBEICogMC4yLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgtMjhkZWcpJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyYWRpYWwtZ3JhZGllbnQoY2xvc2VzdC1zaWRlLCByZ2JhKDI1NSwyNTUsMjU1LDAuNzUpLCByZ2JhKDI1NSwyNTUsMjU1LDApKScsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBTaG90LXNwZWNpZmljIGdyYXBoaWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLy8gU2hvdCAxOiBzb2Z0IHJpbmdzIFwibGlzdGVuaW5nXCIgb3V0d2FyZCBmcm9tIHRoZSBsYW1wLlxuY29uc3QgTGlzdGVuUmluZ3M6IFJlYWN0LkZDPHtMOiBMYXlvdXQ7IGNvbG9yOiBSR0I7IGZyYW1lOiBudW1iZXJ9PiA9ICh7TCwgY29sb3IsIGZyYW1lfSkgPT4ge1xuICBjb25zdCB7RCwgbGFtcFgsIGxhbXBZfSA9IEw7XG4gIGNvbnN0IHNob3RGYWRlID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsxNCwgMjYsIDc2LCA4OF0sIFswLCAxLCAxLCAwXSwgQ0xBTVApO1xuICBpZiAoc2hvdEZhZGUgPD0gMCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHBlcmlvZCA9IDQyO1xuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImxpc3Rlbi1yaW5nc1wiPlxuICAgICAge1swLCAxLCAyXS5tYXAoKGkpID0+IHtcbiAgICAgICAgY29uc3QgbG9jYWwgPSBmcmFtZSAtIDE0IC0gaSAqIDE0O1xuICAgICAgICBpZiAobG9jYWwgPCAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgdCA9IChsb2NhbCAlIHBlcmlvZCkgLyBwZXJpb2Q7XG4gICAgICAgIGNvbnN0IHMgPSAxLjA0ICsgRWFzaW5nLm91dChFYXNpbmcuY3ViaWMpKHQpICogMC43NTtcbiAgICAgICAgY29uc3QgbyA9ICgxIC0gdCkgKiAwLjU1ICogc2hvdEZhZGU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAvIDIsXG4gICAgICAgICAgICAgIHRvcDogbGFtcFkgLSBEIC8gMixcbiAgICAgICAgICAgICAgd2lkdGg6IEQsXG4gICAgICAgICAgICAgIGhlaWdodDogRCxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjUpLCBvKX1gLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGBzY2FsZSgke3N9KWAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8vIFNob3QgMjogYSBjb2xvdXIgZGlhbCB0aGF0IHN3ZWVwcyBhbWJlciBcdTIxOTIgYmx1ZSBhcm91bmQgdGhlIGxhbXAuXG5jb25zdCBDb2xvdXJEaWFsOiBSZWFjdC5GQzx7TDogTGF5b3V0OyBmcmFtZTogbnVtYmVyOyBodWVUOiBudW1iZXI7IGNvbG9yOiBSR0J9PiA9ICh7XG4gIEwsXG4gIGZyYW1lLFxuICBodWVULFxuICBjb2xvcixcbn0pID0+IHtcbiAgY29uc3Qge0QsIGxhbXBYLCBsYW1wWX0gPSBMO1xuICBjb25zdCBvID0gaW50ZXJwb2xhdGUoZnJhbWUsIFs5MCwgMTAyLCAxNjYsIDE3OF0sIFswLCAxLCAxLCAwXSwgQ0xBTVApO1xuICBpZiAobyA8PSAwKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgUiA9IEQgKiAwLjY2O1xuICBjb25zdCBzaXplID0gUiAqIDIgKyA0MDtcbiAgY29uc3QgY2lyYyA9IDIgKiBNYXRoLlBJICogUjtcbiAgY29uc3Qgc3dlZXAgPSBNYXRoLm1heCgwLjAwMSwgaHVlVCk7XG4gIGNvbnN0IGFuZ2xlID0gLTkwICsgc3dlZXAgKiAzNjA7XG4gIGNvbnN0IGt4ID0gc2l6ZSAvIDIgKyBSICogTWF0aC5jb3MoKGFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xuICBjb25zdCBreSA9IHNpemUgLyAyICsgUiAqIE1hdGguc2luKChhbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICBkYXRhLWxheWVyPVwiY29sb3VyLWRpYWxcIlxuICAgICAgd2lkdGg9e3NpemV9XG4gICAgICBoZWlnaHQ9e3NpemV9XG4gICAgICBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBsYW1wWCAtIHNpemUgLyAyLCB0b3A6IGxhbXBZIC0gc2l6ZSAvIDIsIG9wYWNpdHk6IG99fVxuICAgID5cbiAgICAgIDxkZWZzPlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJkaWFsR3JhZFwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMVwiIHkyPVwiMVwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPXtyZ2JhKEFNQkVSKX0gLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPXtyZ2JhKEJMVUUpfSAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgPC9kZWZzPlxuICAgICAgPGNpcmNsZSBjeD17c2l6ZSAvIDJ9IGN5PXtzaXplIC8gMn0gcj17Un0gZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpXCIgc3Ryb2tlV2lkdGg9ezJ9IC8+XG4gICAgICA8Y2lyY2xlXG4gICAgICAgIGN4PXtzaXplIC8gMn1cbiAgICAgICAgY3k9e3NpemUgLyAyfVxuICAgICAgICByPXtSfVxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgIHN0cm9rZT1cInVybCgjZGlhbEdyYWQpXCJcbiAgICAgICAgc3Ryb2tlV2lkdGg9ezN9XG4gICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgIHN0cm9rZURhc2hhcnJheT17YCR7Y2lyYyAqIHN3ZWVwfSAke2NpcmN9YH1cbiAgICAgICAgdHJhbnNmb3JtPXtgcm90YXRlKC05MCAke3NpemUgLyAyfSAke3NpemUgLyAyfSlgfVxuICAgICAgLz5cbiAgICAgIDxjaXJjbGUgY3g9e2t4fSBjeT17a3l9IHI9ezl9IGZpbGw9e3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC4zKSl9IC8+XG4gICAgICA8Y2lyY2xlIGN4PXtreH0gY3k9e2t5fSByPXsyMH0gZmlsbD17cmdiYShjb2xvciwgMC4yNSl9IC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIENvcHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBhbmNob3IgPSAoTDogTGF5b3V0LCB5OiBudW1iZXIsIGR5OiBudW1iZXIsIHNjYWxlID0gMSk6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIGxlZnQ6IEwudGV4dFgsXG4gIHRvcDogeSxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICBmb250RmFtaWx5OiBGT05ULFxuICB0cmFuc2Zvcm1PcmlnaW46IEwucG9ydHJhaXQgPyAnNTAlIDUwJScgOiAnMCUgNTAlJyxcbiAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7TC5wb3J0cmFpdCA/ICctNTAlJyA6ICcwJ30sIGNhbGMoLTUwJSArICR7ZHl9cHgpKSBzY2FsZSgke3NjYWxlfSlgLFxufSk7XG5cbmNvbnN0IENvcHk6IFJlYWN0LkZDPHtMOiBMYXlvdXQ7IGZyYW1lOiBudW1iZXI7IGZwczogbnVtYmVyOyBjb2xvcjogUkdCfT4gPSAoe0wsIGZyYW1lLCBmcHMsIGNvbG9yfSkgPT4ge1xuICAvLyBTaG90IDEgY2FwdGlvbiBcdTIwMTQgZnVsbHkgaW4gYnkgfjA6MDAuNywgb3V0IGF0IHRoZSBjdXQuXG4gIGNvbnN0IGNhcEluID0gc3ByaW5nKHtmcmFtZTogZnJhbWUgLSA0LCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDIwMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDE4fSk7XG4gIGNvbnN0IGNhcE91dCA9IGludGVycG9sYXRlKGZyYW1lLCBbODQsIDkwXSwgWzAsIDFdLCBDTEFNUCk7XG4gIGNvbnN0IGNhcE9wYWNpdHkgPSBpbnRlcnBvbGF0ZShjYXBJbiwgWzAsIDAuNl0sIFswLCAxXSwgQ0xBTVApICogKDEgLSBjYXBPdXQpO1xuICBjb25zdCBjYXBCbHVyID0gaW50ZXJwb2xhdGUoY2FwSW4sIFswLCAxXSwgWzEwLCAwXSkgKyBjYXBPdXQgKiA4O1xuXG4gIC8vIFNob3QgMiBwcmljZSB0YWcgXHUyMDE0IGluIGJ5IDA6MDMuNywgaG9sZHMgdGhyb3VnaCAwOjA1LjYuXG4gIGNvbnN0IHByaWNlSW4gPSBzcHJpbmcoe2ZyYW1lOiBmcmFtZSAtIDk4LCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDE1LCBzdGlmZm5lc3M6IDEyMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDIyfSk7XG4gIGNvbnN0IHByaWNlT3V0ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsxNjYsIDE3M10sIFswLCAxXSwgQ0xBTVApO1xuICBjb25zdCBwcmljZU9wYWNpdHkgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzk4LCAxMDhdLCBbMCwgMV0sIENMQU1QKSAqICgxIC0gcHJpY2VPdXQpO1xuXG4gIC8vIFNob3QgMyB3b3JkbWFyayBcdTIwMTQgZnVsbHkgcHJlc2VudCBmcm9tIHRoZSBjdXQgYXQgMDowNi5cbiAgY29uc3Qgd21JbiA9IHNwcmluZyh7ZnJhbWU6IGZyYW1lIC0gMTcyLCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDIwMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDMwfSk7XG4gIGNvbnN0IHdtT3BhY2l0eSA9IGludGVycG9sYXRlKGZyYW1lLCBbMTczLCAxNzldLCBbMCwgMV0sIENMQU1QKTtcbiAgY29uc3Qgd21UcmFja2luZyA9IGludGVycG9sYXRlKHdtSW4sIFswLCAxXSwgWzAuNSwgMC4zNF0pO1xuXG4gIC8vIFNob3QgMyBidXR0b24gXHUyMDE0IGZ1bGx5IGluIGJ5IH4wOjA3LlxuICBjb25zdCBidG5JbiA9IHNwcmluZyh7ZnJhbWU6IGZyYW1lIC0gMTk2LCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDE2LCBzdGlmZm5lc3M6IDExMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDI0fSk7XG4gIGNvbnN0IGJ0bk9wYWNpdHkgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzE5NiwgMjA2XSwgWzAsIDFdLCBDTEFNUCk7XG4gIGNvbnN0IHNoaW5lID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsyMjgsIDI2Ml0sIFstNjAsIDE2MF0sIENMQU1QKTtcblxuICBjb25zdCB0ZXh0Q29sb3IgPSAnI0Y2RjJFQyc7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsPlxuICAgICAge2NhcE9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJjYXB0aW9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uYW5jaG9yKEwsIEwuY2FwdGlvblksIGludGVycG9sYXRlKGNhcEluLCBbMCwgMV0sIFsyOCwgMF0pIC0gY2FwT3V0ICogMTIpLFxuICAgICAgICAgICAgZm9udFNpemU6IEwuY2FwdGlvblNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDNlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjEsXG4gICAgICAgICAgICBjb2xvcjogdGV4dENvbG9yLFxuICAgICAgICAgICAgb3BhY2l0eTogY2FwT3BhY2l0eSxcbiAgICAgICAgICAgIGZpbHRlcjogYGJsdXIoJHtjYXBCbHVyfXB4KWAsXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiBgMCAwIDQwcHggJHtyZ2JhKEFNQkVSLCAwLjI1KX1gLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBMaWdodCB0aGF0IGxpc3RlbnNcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7cHJpY2VPcGFjaXR5ID4gMCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwicHJpY2VcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5hbmNob3IoTCwgTC5wcmljZVksIGludGVycG9sYXRlKHByaWNlSW4sIFswLCAxXSwgWzI0LCAwXSkgLSBwcmljZU91dCAqIDEwLCBpbnRlcnBvbGF0ZShwcmljZUluLCBbMCwgMV0sIFswLjkyLCAxXSkpLFxuICAgICAgICAgICAgZm9udFNpemU6IEwucHJpY2VTaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAyZW0nLFxuICAgICAgICAgICAgZm9udFZhcmlhbnROdW1lcmljOiAndGFidWxhci1udW1zJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogcmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjEyKSksXG4gICAgICAgICAgICBwYWRkaW5nOiAnMC4yNmVtIDAuNTVlbSAwLjI2ZW0gMS4wNWVtJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAuMjJlbSAwLjVlbSAwLjVlbSAwLjIyZW0nLFxuICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjQpLCAwLjQ1KX1gLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgMC41ZW0gNTAlLCByZ2JhKDYsNiw5LDAuOTUpIDAuMDllbSwgJHtyZ2JhKFxuICAgICAgICAgICAgICBtaXgoV0hJVEUsIGNvbG9yLCAwLjYpLFxuICAgICAgICAgICAgICAwLjdcbiAgICAgICAgICAgICl9IDAuMWVtLCAke3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC42KSwgMC4wKX0gMC4xNmVtKSwgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgJHtyZ2JhKFxuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgMC4yMlxuICAgICAgICAgICAgKX0gMCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4wNSkgMTAwJSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAyMHB4IDYwcHggcmdiYSgwLDAsMCwwLjQ1KSwgMCAwIDUwcHggJHtyZ2JhKGNvbG9yLCAwLjE4KX1gLFxuICAgICAgICAgICAgb3BhY2l0eTogcHJpY2VPcGFjaXR5LFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICAkODlcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7d21PcGFjaXR5ID4gMCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwid29yZG1hcmtcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5hbmNob3IoTCwgTC53b3JkbWFya1ksIGludGVycG9sYXRlKHdtSW4sIFswLCAxXSwgWzE4LCAwXSkpLFxuICAgICAgICAgICAgZm9udFNpemU6IEwud29yZG1hcmtTaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogMzAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogYCR7d21UcmFja2luZ31lbWAsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogTC5wb3J0cmFpdCA/IGAke3dtVHJhY2tpbmd9ZW1gIDogMCxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogdGV4dENvbG9yLFxuICAgICAgICAgICAgb3BhY2l0eTogd21PcGFjaXR5LFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogYDAgMCA2MHB4ICR7cmdiYShjb2xvciwgMC4zNSl9YCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgSEFMT1xuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiAxNjo5IFx1MjAxNCB0aGUgQ1RBIGlzIGEgZnVsbC13aWR0aCBidXkgYmFyIGRvY2tlZCB0byB0aGUgYm90dG9tIGVkZ2UuXG4gICAgICAgICAgSXQgcmV2ZWFscyB3aXRoIGEgY2xpcCBmcm9tIGl0cyB0b3AgZWRnZSwgc28gaXRzIGJveCBhbmQgdGV4dCBuZXZlclxuICAgICAgICAgIGxlYXZlIHRoZSBmcmFtZS4gKDk6MTYga2VlcHMgdGhlIHBpbGw6IHRoZSBzdG9yeWJvYXJkIGZvcmJpZHMgYW55XG4gICAgICAgICAgYnV0dG9uIGluIHRoZSBib3R0b20gMzUlIG9mIHRoYXQgY3V0LikgKi99XG4gICAgICB7IUwucG9ydHJhaXQgJiYgYnRuT3BhY2l0eSA+IDAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cImJ1dHRvblwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBMLmZvb3RlckhlaWdodCxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgZm9udFNpemU6IEwuZm9vdGVyU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wMWVtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogJyMwYjBjMTAnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgxMDVkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMCkgJHtzaGluZSAtIDEyfSUsIHJnYmEoMjU1LDI1NSwyNTUsMC45KSAke3NoaW5lfSUsIHJnYmEoMjU1LDI1NSwyNTUsMCkgJHtcbiAgICAgICAgICAgICAgc2hpbmUgKyAxMlxuICAgICAgICAgICAgfSUpLCBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAke3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC4yOCkpfSAxMDAlKWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwIC0yNHB4IDgwcHggJHtyZ2JhKGNvbG9yLCAwLjMpfSwgaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LDAuOSlgLFxuICAgICAgICAgICAgY2xpcFBhdGg6IGBpbnNldCgkeygxIC0gTWF0aC5taW4oMSwgYnRuSW4pKSAqIDEwMH0lIDAgMCAwKWAsXG4gICAgICAgICAgICBvcGFjaXR5OiBidG5PcGFjaXR5LFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBQcmUtb3JkZXIgbm93XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAge0wucG9ydHJhaXQgJiYgYnRuT3BhY2l0eSA+IDAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cImJ1dHRvblwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLmFuY2hvcihMLCBMLmJ1dHRvblksIGludGVycG9sYXRlKGJ0bkluLCBbMCwgMV0sIFsyNiwgMF0pLCBpbnRlcnBvbGF0ZShidG5JbiwgWzAsIDFdLCBbMC45NCwgMV0pKSxcbiAgICAgICAgICAgIGZvbnRTaXplOiBMLmJ1dHRvblNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDA1ZW0nLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiAnIzBiMGMxMCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMC43OGVtIDEuN2VtJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogOTk5LFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgxMDVkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMCkgJHtzaGluZSAtIDIwfSUsIHJnYmEoMjU1LDI1NSwyNTUsMC45NSkgJHtzaGluZX0lLCByZ2JhKDI1NSwyNTUsMjU1LDApICR7XG4gICAgICAgICAgICAgIHNoaW5lICsgMjBcbiAgICAgICAgICAgIH0lKSwgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgJHtyZ2JhKG1peChXSElURSwgY29sb3IsIDAuMjIpKX0gMTAwJSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAxOHB4IDUwcHggJHtyZ2JhKGNvbG9yLCAwLjM1KX0sIGluc2V0IDAgLTJweCAwIHJnYmEoMCwwLDAsMC4wOClgLFxuICAgICAgICAgICAgb3BhY2l0eTogYnRuT3BhY2l0eSxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgUHJlLW9yZGVyIG5vd1xuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIEZpbmlzaGluZzogdmlnbmV0dGUgKyBncmFpbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGaW5pc2g6IFJlYWN0LkZDID0gKCkgPT4gKFxuICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7cG9pbnRlckV2ZW50czogJ25vbmUnfX0+XG4gICAgPEFic29sdXRlRmlsbFxuICAgICAgc3R5bGU9e3tiYWNrZ3JvdW5kOiAncmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgNTAlIDQ4JSwgcmdiYSgwLDAsMCwwKSA0NSUsIHJnYmEoMCwwLDAsMC41NSkgMTAwJSknfX1cbiAgICAvPlxuICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLCBvcGFjaXR5OiAwLjA3LCBtaXhCbGVuZE1vZGU6ICdvdmVybGF5J319PlxuICAgICAgPGZpbHRlciBpZD1cImdyYWluXCI+XG4gICAgICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT1cImZyYWN0YWxOb2lzZVwiIGJhc2VGcmVxdWVuY3k9XCIwLjg1XCIgbnVtT2N0YXZlcz17Mn0gc2VlZD17N30gc3RpdGNoVGlsZXM9XCJzdGl0Y2hcIiAvPlxuICAgICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPVwic2F0dXJhdGVcIiB2YWx1ZXM9XCIwXCIgLz5cbiAgICAgIDwvZmlsdGVyPlxuICAgICAgPHJlY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZpbHRlcj1cInVybCgjZ3JhaW4pXCIgLz5cbiAgICA8L3N2Zz5cbiAgPC9BYnNvbHV0ZUZpbGw+XG4pO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIENvbXBvc2l0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBWaWRlbygpIHtcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdXNlVmlkZW9Db25maWcoKTtcbiAgY29uc3QgTCA9IGdldExheW91dCh3aWR0aCwgaGVpZ2h0KTtcbiAgY29uc3Qge2ZyYW1lLCBmcHMsIGludGVuc2l0eSwgaHVlVCwgY29sb3J9ID0gdXNlVGltZWxpbmUoKTtcblxuICAvLyBTbG93IGNhbWVyYSBwdXNoIGludG8gdGhlIGxhbXAgYWNyb3NzIHRoZSB3aG9sZSBzcG90LlxuICBjb25zdCBwdXNoID0gaW50ZXJwb2xhdGUoZnJhbWUsIFswLCAzMDBdLCBbMSwgMS4wNDVdLCB7Li4uQ0xBTVAsIGVhc2luZzogRWFzaW5nLmluT3V0KEVhc2luZy5zaW4pfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOiAnIzA1MDQwNicsIG92ZXJmbG93OiAnaGlkZGVuJ319PlxuICAgICAgPEFic29sdXRlRmlsbCBzdHlsZT17e3RyYW5zZm9ybTogYHNjYWxlKCR7cHVzaH0pYCwgdHJhbnNmb3JtT3JpZ2luOiBgJHtMLmxhbXBYfXB4ICR7TC5sYW1wWX1weGB9fT5cbiAgICAgICAgPFJvb20gTD17TH0gY29sb3I9e2NvbG9yfSBpbnRlbnNpdHk9e2ludGVuc2l0eX0gLz5cbiAgICAgICAgPExpc3RlblJpbmdzIEw9e0x9IGNvbG9yPXtjb2xvcn0gZnJhbWU9e2ZyYW1lfSAvPlxuICAgICAgICA8Q29sb3VyRGlhbCBMPXtMfSBmcmFtZT17ZnJhbWV9IGh1ZVQ9e2h1ZVR9IGNvbG9yPXtjb2xvcn0gLz5cbiAgICAgICAgPExhbXAgTD17TH0gY29sb3I9e2NvbG9yfSBpbnRlbnNpdHk9e2ludGVuc2l0eX0gZnJhbWU9e2ZyYW1lfSBmcHM9e2Zwc30gLz5cbiAgICAgIDwvQWJzb2x1dGVGaWxsPlxuICAgICAgPEZpbmlzaCAvPlxuICAgICAgPENvcHkgTD17TH0gZnJhbWU9e2ZyYW1lfSBmcHM9e2Zwc30gY29sb3I9e2NvbG9yfSAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixVQUFVO0FBQUE7QUFBQTs7O0FDQXZEO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsbUJBQW1CO0FBQUE7QUFBQTs7O0FDUWhFLHNCQU9PO0FBMEhIO0FBeEhHLElBQU0sY0FBYztBQUFBLEVBQ3pCLEtBQUs7QUFBQSxFQUNMLGtCQUFrQjtBQUFBLEVBQ2xCLE9BQU87QUFBQSxJQUNMLEVBQUMsR0FBRyxHQUFHLE9BQU8sZ0JBQWdCLE1BQU0sR0FBRyxrQkFBa0IsR0FBRTtBQUFBLElBQzNELEVBQUMsR0FBRyxHQUFHLE9BQU8sVUFBVSxNQUFNLElBQUksa0JBQWtCLEdBQUU7QUFBQSxJQUN0RCxFQUFDLEdBQUcsR0FBRyxPQUFPLGtCQUFrQixNQUFNLEtBQUssa0JBQWtCLElBQUc7QUFBQSxFQUNsRTtBQUNGO0FBT0EsSUFBTSxRQUFhLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDaEMsSUFBTSxPQUFZLENBQUMsS0FBSyxLQUFL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
