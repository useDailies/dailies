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

// workspaces/halo-smart-lamp-launch-spot-d971/versions/v8/Video.tsx
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
  const { D, lampX, lampY, width, height } = L;
  const r = D / 2;
  const I = Math.min(intensity, 1.1);
  const bloomR = Math.min(D * 2.4, lampX - 24, width - lampX - 24, lampY - 24, height - lampY - 24);
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
          left: lampX - bloomR,
          top: lampY - bloomR + y,
          width: bloomR * 2,
          height: bloomR * 2,
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
                boxShadow: `0 0 ${D * 0.18}px ${rgba(color, 0.6 * I)}, 0 0 ${D * 0.4}px ${rgba(
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9oYWxvLXNtYXJ0LWxhbXAtbGF1bmNoLXNwb3QtZDk3MS92ZXJzaW9ucy92OC9WaWRlby50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVtb3Rpb25cIl07IiwgIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVhY3QvanN4LXJ1bnRpbWVcIl07IiwgIi8qXG4gKiBIYWxvIGxhdW5jaCBzcG90IFx1MjAxNCAxMHMsIDMwIGZwcywgMzAwIGZyYW1lczsgMTY6OSArIDk6MTYuXG4gKlxuICogMSAgMDowMFx1MjAxMzA6MDMgIGYwXHUyMDEzODkgICAgIEhlcm86IGFtYmVyIGxhbXAsIFwiTGlnaHQgdGhhdCBsaXN0ZW5zXCJcbiAqIDIgIDA6MDNcdTIwMTMwOjA2ICBmOTBcdTIwMTMxNzkgICBDb2xvdXI6IGFtYmVyIFx1MjE5MiBibHVlLCBcIiQ4OVwiIHRhZ1xuICogMyAgMDowNlx1MjAxMzA6MTAgIGYxODBcdTIwMTMyOTkgIENUQTogSEFMTyB3b3JkbWFyaywgXCJQcmUtb3JkZXIgbm93XCJcbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBpbnRlcnBvbGF0ZSxcbiAgc3ByaW5nLFxuICB1c2VDdXJyZW50RnJhbWUsXG4gIHVzZVZpZGVvQ29uZmlnLFxufSBmcm9tICdyZW1vdGlvbic7XG5cbmV4cG9ydCBjb25zdCBjb21wb3NpdGlvbiA9IHtcbiAgZnBzOiAzMCxcbiAgZHVyYXRpb25JbkZyYW1lczogMzAwLFxuICBzaG90czogW1xuICAgIHtuOiAxLCB0aXRsZTogJ1Byb2R1Y3QgaGVybycsIGZyb206IDAsIGR1cmF0aW9uSW5GcmFtZXM6IDkwfSxcbiAgICB7bjogMiwgdGl0bGU6ICdDb2xvdXInLCBmcm9tOiA5MCwgZHVyYXRpb25JbkZyYW1lczogOTB9LFxuICAgIHtuOiAzLCB0aXRsZTogJ0NhbGwgdG8gYWN0aW9uJywgZnJvbTogMTgwLCBkdXJhdGlvbkluRnJhbWVzOiAxMjB9LFxuICBdLFxufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBQYWxldHRlICsgaGVscGVycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxudHlwZSBSR0IgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5jb25zdCBBTUJFUjogUkdCID0gWzI1NSwgMTY2LCA3Ml07XG5jb25zdCBCTFVFOiBSR0IgPSBbMTI4LCAxNzgsIDI1NV07XG5jb25zdCBXSElURTogUkdCID0gWzI1NSwgMjU1LCAyNTVdO1xuY29uc3QgSU5LOiBSR0IgPSBbOCwgOCwgMTFdO1xuXG5jb25zdCBtaXggPSAoYTogUkdCLCBiOiBSR0IsIHQ6IG51bWJlcik6IFJHQiA9PlxuICBbMCwgMSwgMl0ubWFwKChpKSA9PiBNYXRoLnJvdW5kKGFbaV0gKyAoYltpXSAtIGFbaV0pICogdCkpIGFzIFJHQjtcbmNvbnN0IHJnYmEgPSAoYzogUkdCLCBhID0gMSkgPT4gYHJnYmEoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0sJHthfSlgO1xuXG5jb25zdCBDTEFNUCA9IHtleHRyYXBvbGF0ZUxlZnQ6ICdjbGFtcCcsIGV4dHJhcG9sYXRlUmlnaHQ6ICdjbGFtcCd9IGFzIGNvbnN0O1xuY29uc3QgRk9OVCA9XG4gICdcIlNGIFBybyBEaXNwbGF5XCIsIHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTGF5b3V0IHBlciBhc3BlY3QgcmF0aW8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbnR5cGUgTGF5b3V0ID0gUmV0dXJuVHlwZTx0eXBlb2YgZ2V0TGF5b3V0PjtcblxuZnVuY3Rpb24gZ2V0TGF5b3V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gIGNvbnN0IHBvcnRyYWl0ID0gaGVpZ2h0ID4gd2lkdGg7XG4gIGlmIChwb3J0cmFpdCkge1xuICAgIC8vIDk6MTYgXHUyMDE0IHRleHQgbGl2ZXMgaW4gdGhlIHNhZmUgYmFuZCAoMTQlLi42NSUgb2YgaGVpZ2h0KTsgdGhlIGxhbXBcbiAgICAvLyBzaXRzIGxvdyBhbmQgdGhyb3dzIGl0cyBsaWdodCB1cCBpbnRvIHRoZSBjb3B5LlxuICAgIGNvbnN0IEQgPSBNYXRoLnJvdW5kKHdpZHRoICogMC40NCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnRyYWl0LFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBELFxuICAgICAgbGFtcFg6IHdpZHRoIC8gMixcbiAgICAgIGxhbXBZOiBoZWlnaHQgKiAwLjY2NSxcbiAgICAgIHRleHRYOiB3aWR0aCAvIDIsXG4gICAgICBjYXB0aW9uWTogaGVpZ2h0ICogMC40LFxuICAgICAgcHJpY2VZOiBoZWlnaHQgKiAwLjQsXG4gICAgICB3b3JkbWFya1k6IGhlaWdodCAqIDAuMzU1LFxuICAgICAgYnV0dG9uWTogaGVpZ2h0ICogMC40NzUsXG4gICAgICBjYXB0aW9uU2l6ZTogOTIsXG4gICAgICBwcmljZVNpemU6IDg0LFxuICAgICAgd29yZG1hcmtTaXplOiAxNTAsXG4gICAgICBidXR0b25TaXplOiA0NixcbiAgICAgIGZvb3RlckhlaWdodDogMCxcbiAgICAgIGZvb3RlclNpemU6IDAsXG4gICAgfTtcbiAgfVxuICAvLyAxNjo5IFx1MjAxNCBsYW1wIG9uIHRoZSBsZWZ0IHRoaXJkLCBjb3B5IG9uIHRoZSByaWdodC5cbiAgY29uc3QgRCA9IE1hdGgucm91bmQoaGVpZ2h0ICogMC4zNSk7XG4gIHJldHVybiB7XG4gICAgcG9ydHJhaXQsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIEQsXG4gICAgbGFtcFg6IHdpZHRoICogMC4zMSxcbiAgICBsYW1wWTogaGVpZ2h0ICogMC40NixcbiAgICB0ZXh0WDogd2lkdGggKiAwLjU1NSxcbiAgICBjYXB0aW9uWTogaGVpZ2h0ICogMC40NixcbiAgICBwcmljZVk6IGhlaWdodCAqIDAuNDYsXG4gICAgd29yZG1hcmtZOiBoZWlnaHQgKiAwLjQ0LFxuICAgIGJ1dHRvblk6IGhlaWdodCAqIDAuNTg1LFxuICAgIGNhcHRpb25TaXplOiAxMDQsXG4gICAgcHJpY2VTaXplOiA5NixcbiAgICB3b3JkbWFya1NpemU6IDE3NixcbiAgICBidXR0b25TaXplOiA0MCxcbiAgICBmb290ZXJIZWlnaHQ6IE1hdGgucm91bmQoaGVpZ2h0ICogMC4xMyksXG4gICAgZm9vdGVyU2l6ZTogNTAsXG4gIH07XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogVGltZWxpbmUgdmFsdWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmZ1bmN0aW9uIHVzZVRpbWVsaW5lKCkge1xuICBjb25zdCBmcmFtZSA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7ZnBzfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG5cbiAgLy8gTGFtcCBzd2l0Y2hlcyBvbjogYWxyZWFkeSBnbG93aW5nIG9uIGZyYW1lIDAsIGZ1bGx5IGxpdCBieSB+MC42cy5cbiAgY29uc3Qgc3dpdGNoT24gPSBzcHJpbmcoe2ZyYW1lLCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDE0LCBzdGlmZm5lc3M6IDkwfSwgZHVyYXRpb25JbkZyYW1lczogMjJ9KTtcbiAgY29uc3QgYnJlYXRoID0gMSArIDAuMDM1ICogTWF0aC5zaW4oKGZyYW1lIC8gZnBzKSAqIE1hdGguUEkgKiAwLjkpO1xuICBjb25zdCBpbnRlbnNpdHkgPSAoMC41ICsgMC41ICogTWF0aC5taW4oc3dpdGNoT24sIDEuMDgpKSAqIGJyZWF0aDtcblxuICAvLyBBbWJlciBcdTIxOTIgc29mdCBibHVlIGR1cmluZyBzaG90IDIuXG4gIGNvbnN0IGh1ZVQgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzk2LCAxNThdLCBbMCwgMV0sIHtcbiAgICAuLi5DTEFNUCxcbiAgICBlYXNpbmc6IEVhc2luZy5iZXppZXIoMC42NSwgMCwgMC4zNSwgMSksXG4gIH0pO1xuICBjb25zdCBjb2xvciA9IG1peChBTUJFUiwgQkxVRSwgaHVlVCk7XG5cbiAgcmV0dXJuIHtmcmFtZSwgZnBzLCBpbnRlbnNpdHksIGh1ZVQsIGNvbG9yfTtcbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBSb29tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgUm9vbTogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgaW50ZW5zaXR5OiBudW1iZXJ9PiA9ICh7TCwgY29sb3IsIGludGVuc2l0eX0pID0+IHtcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIEQsIGxhbXBYLCBsYW1wWSwgcG9ydHJhaXR9ID0gTDtcbiAgY29uc3QgYmFzZUJvdHRvbSA9IGxhbXBZICsgRCAvIDIgKyBEICogMC4wNztcbiAgY29uc3QgY29uc29sZUggPSBEICogKHBvcnRyYWl0ID8gMC4zIDogMC4yNik7XG4gIGNvbnN0IGZsb29yWSA9IGJhc2VCb3R0b20gKyBjb25zb2xlSDtcbiAgY29uc3QgY29uc29sZUxlZnQgPSBwb3J0cmFpdCA/IGxhbXBYIC0gd2lkdGggKiAwLjQyIDogLTQwO1xuICBjb25zdCBjb25zb2xlUmlnaHQgPSBwb3J0cmFpdCA/IGxhbXBYICsgd2lkdGggKiAwLjQyIDogbGFtcFggKyBEICogMS4wNTtcbiAgY29uc3QgSSA9IGludGVuc2l0eTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIj5cbiAgICAgIHsvKiB3YWxsICovfVxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGEwOTBjIDAlLCAjMTAwZTExICR7KGZsb29yWSAvIGhlaWdodCkgKiAxMDB9JSwgIzA2MDUwNyAke1xuICAgICAgICAgICAgKGZsb29yWSAvIGhlaWdodCkgKiAxMDBcbiAgICAgICAgICB9JSwgIzAzMDMwNCAxMDAlKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHdhbGwgcGFuZWxzICovfVxuICAgICAge1swLjEyLCAwLjUsIDAuODhdLm1hcCgoeCwgaSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IHdpZHRoICogeCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBmbG9vclksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjAzNSkgNjAlLCByZ2JhKDI1NSwyNTUsMjU1LDApIDEwMCUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgICB7LyogbGlnaHQgd2FzaGluZyB0aGUgd2FsbCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiA0LFxuICAgICAgICAgIHRvcDogbGFtcFkgLSBEICogMy4yLFxuICAgICAgICAgIHdpZHRoOiBEICogOCxcbiAgICAgICAgICBoZWlnaHQ6IEQgKiA2LjQsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjIgKiBJKX0gMCUsICR7cmdiYShcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgMC4wOCAqIElcbiAgICAgICAgICApfSA0NSUsIHJnYmEoMCwwLDAsMCkgMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBsb3cgY29uc29sZSB0aGUgbGFtcCBzdGFuZHMgb24gKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogY29uc29sZUxlZnQsXG4gICAgICAgICAgdG9wOiBiYXNlQm90dG9tLFxuICAgICAgICAgIHdpZHRoOiBjb25zb2xlUmlnaHQgLSBjb25zb2xlTGVmdCxcbiAgICAgICAgICBoZWlnaHQ6IGNvbnNvbGVILFxuICAgICAgICAgIGJvcmRlclJhZGl1czogNCxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgJHtyZ2JhKG1peChjb2xvciwgWzQwLCAzNiwgMzRdLCAwLjU1KSwgMC45KX0gMHB4LCAjMWExODFiIDNweCwgIzEyMTAxMyA0MCUsICMwYTA5MGIgMTAwJSlgLFxuICAgICAgICAgIGJveFNoYWRvdzogJzAgMzBweCA2MHB4IHJnYmEoMCwwLDAsMC42KScsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHBvb2wgb2YgbGlnaHQgb24gdGhlIGNvbnNvbGUgdG9wICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAqIDEuMSxcbiAgICAgICAgICB0b3A6IGJhc2VCb3R0b20gLSBEICogMC4wOCxcbiAgICAgICAgICB3aWR0aDogRCAqIDIuMixcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjIyLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsICR7cmdiYShjb2xvciwgMC4zNSAqIEkpfSwgcmdiYSgwLDAsMCwwKSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBmbG9vciByZWZsZWN0aW9uICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAqIDEuOCxcbiAgICAgICAgICB0b3A6IGZsb29yWSxcbiAgICAgICAgICB3aWR0aDogRCAqIDMuNixcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjUsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjEyICogSSl9LCByZ2JhKDAsMCwwLDApKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBUaGUgbGFtcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgTGFtcDogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgaW50ZW5zaXR5OiBudW1iZXI7IGZyYW1lOiBudW1iZXI7IGZwczogbnVtYmVyfT4gPSAoe1xuICBMLFxuICBjb2xvcixcbiAgaW50ZW5zaXR5LFxuICBmcmFtZSxcbiAgZnBzLFxufSkgPT4ge1xuICBjb25zdCB7RCwgbGFtcFgsIGxhbXBZLCB3aWR0aCwgaGVpZ2h0fSA9IEw7XG4gIGNvbnN0IHIgPSBEIC8gMjtcbiAgY29uc3QgSSA9IE1hdGgubWluKGludGVuc2l0eSwgMS4xKTtcbiAgLy8gS2VlcCB0aGUgdmlzaWJsZSBibG9vbSBpbnNpZGUgdGhlIGZyYW1lIG9uIGV2ZXJ5IGN1dC5cbiAgY29uc3QgYmxvb21SID0gTWF0aC5taW4oRCAqIDIuNCwgbGFtcFggLSAyNCwgd2lkdGggLSBsYW1wWCAtIDI0LCBsYW1wWSAtIDI0LCBoZWlnaHQgLSBsYW1wWSAtIDI0KTtcbiAgY29uc3QgcmlzZSA9IHNwcmluZyh7ZnJhbWUsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMjAwfSwgZHVyYXRpb25JbkZyYW1lczogMjR9KTtcbiAgY29uc3QgeSA9IGludGVycG9sYXRlKHJpc2UsIFswLCAxXSwgW0QgKiAwLjA2LCAwXSk7XG5cbiAgY29uc3QgY29yZSA9IG1peChXSElURSwgY29sb3IsIDAuMTIpO1xuICBjb25zdCBtaWQgPSBtaXgoV0hJVEUsIGNvbG9yLCAwLjU1KTtcbiAgY29uc3QgcmltID0gbWl4KGNvbG9yLCBJTkssIDAuMTgpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHsvKiBibG9vbSBiZWhpbmQgdGhlIGxhbXAgXHUyMDE0IGNsaXBwZWQgdG8gdGhlIGZyYW1lIHNvIHRoZSBsYXllciBuZXZlclxuICAgICAgICAgIG1lYXN1cmVzIGFzIGV4dGVuZGluZyBvdXRzaWRlIGl0ICovfVxuICAgICAgPEFic29sdXRlRmlsbCBkYXRhLWxheWVyPVwiZ2xvd1wiIHN0eWxlPXt7b3ZlcmZsb3c6ICdoaWRkZW4nfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBsYW1wWCAtIGJsb29tUixcbiAgICAgICAgICAgIHRvcDogbGFtcFkgLSBibG9vbVIgKyB5LFxuICAgICAgICAgICAgd2lkdGg6IGJsb29tUiAqIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IGJsb29tUiAqIDIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsICR7cmdiYShjb2xvciwgMC40MiAqIEkpfSAwJSwgJHtyZ2JhKFxuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgMC4xNiAqIElcbiAgICAgICAgICAgICl9IDM4JSwgcmdiYSgwLDAsMCwwKSAxMDAlKWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvQWJzb2x1dGVGaWxsPlxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLWxheWVyPVwicHJvZHVjdFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogbGFtcFggLSByLFxuICAgICAgICAgIHRvcDogbGFtcFkgLSByICsgeSxcbiAgICAgICAgICB3aWR0aDogRCxcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAxLjA3LFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7LyogYmFzZSBwdWNrICovfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogRCAqIDAuMjcsXG4gICAgICAgICAgICB0b3A6IEQgKiAwLjk0LFxuICAgICAgICAgICAgd2lkdGg6IEQgKiAwLjQ2LFxuICAgICAgICAgICAgaGVpZ2h0OiBEICogMC4xMyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogYCR7RCAqIDAuMDN9cHggJHtEICogMC4wM31weCAke0QgKiAwLjA1fXB4ICR7RCAqIDAuMDV9cHhgLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsICM0YTQ3NDkgMCUsICMyMjIwMjMgNDAlLCAjMTIxMTEzIDEwMCUpJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYGluc2V0IDAgMnB4IDAgJHtyZ2JhKGNvbG9yLCAwLjU1ICogSSl9LCAwIDE4cHggMzBweCByZ2JhKDAsMCwwLDAuNTUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICB7LyogdW5saXQgc3BoZXJlOiBtYXR0ZSB3aGl0ZSBnbGFzcyAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGluc2V0OiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBELFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAgICdyYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDM4JSAzMCUsICNmNmY0ZjEgMCUsICNkOGQ1ZDEgNDAlLCAjOGE4Nzg0IDc4JSwgIzNmM2QzYiAxMDAlKScsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgey8qIGxpdCBzcGhlcmUgKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBpbnNldDogMCxcbiAgICAgICAgICAgIGhlaWdodDogRCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBvcGFjaXR5OiBNYXRoLm1pbigxLCBJKSxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDUwJSA0MCUsICNmZmZmZmYgMCUsICR7cmdiYShjb3JlKX0gMjAlLCAke3JnYmEoXG4gICAgICAgICAgICAgIG1pZFxuICAgICAgICAgICAgKX0gNTglLCAke3JnYmEoY29sb3IpfSA4NCUsICR7cmdiYShyaW0pfSAxMDAlKWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgJHtEICogMC4xOH1weCAke3JnYmEoY29sb3IsIDAuNiAqIEkpfSwgMCAwICR7RCAqIDAuNH1weCAke3JnYmEoXG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAwLjM1ICogSVxuICAgICAgICAgICAgKX0sIGluc2V0IDAgLSR7RCAqIDAuMDZ9cHggJHtEICogMC4xMn1weCAke3JnYmEocmltLCAwLjYpfWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgey8qIHNwZWN1bGFyIHNoZWVuICovfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogRCAqIDAuMixcbiAgICAgICAgICAgIHRvcDogRCAqIDAuMSxcbiAgICAgICAgICAgIHdpZHRoOiBEICogMC4zNCxcbiAgICAgICAgICAgIGhlaWdodDogRCAqIDAuMixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoLTI4ZGVnKScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgcmdiYSgyNTUsMjU1LDI1NSwwLjc1KSwgcmdiYSgyNTUsMjU1LDI1NSwwKSknLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hvdC1zcGVjaWZpYyBncmFwaGljcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbi8vIFNob3QgMTogc29mdCByaW5ncyBcImxpc3RlbmluZ1wiIG91dHdhcmQgZnJvbSB0aGUgbGFtcC5cbmNvbnN0IExpc3RlblJpbmdzOiBSZWFjdC5GQzx7TDogTGF5b3V0OyBjb2xvcjogUkdCOyBmcmFtZTogbnVtYmVyfT4gPSAoe0wsIGNvbG9yLCBmcmFtZX0pID0+IHtcbiAgY29uc3Qge0QsIGxhbXBYLCBsYW1wWX0gPSBMO1xuICBjb25zdCBzaG90RmFkZSA9IGludGVycG9sYXRlKGZyYW1lLCBbMTQsIDI2LCA3NiwgODhdLCBbMCwgMSwgMSwgMF0sIENMQU1QKTtcbiAgaWYgKHNob3RGYWRlIDw9IDApIHJldHVybiBudWxsO1xuICBjb25zdCBwZXJpb2QgPSA0MjtcbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIGRhdGEtbGF5ZXI9XCJsaXN0ZW4tcmluZ3NcIj5cbiAgICAgIHtbMCwgMSwgMl0ubWFwKChpKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvY2FsID0gZnJhbWUgLSAxNCAtIGkgKiAxNDtcbiAgICAgICAgaWYgKGxvY2FsIDwgMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHQgPSAobG9jYWwgJSBwZXJpb2QpIC8gcGVyaW9kO1xuICAgICAgICBjb25zdCBzID0gMS4wNCArIEVhc2luZy5vdXQoRWFzaW5nLmN1YmljKSh0KSAqIDAuNzU7XG4gICAgICAgIGNvbnN0IG8gPSAoMSAtIHQpICogMC41NSAqIHNob3RGYWRlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgLyAyLFxuICAgICAgICAgICAgICB0b3A6IGxhbXBZIC0gRCAvIDIsXG4gICAgICAgICAgICAgIHdpZHRoOiBELFxuICAgICAgICAgICAgICBoZWlnaHQ6IEQsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgIGJvcmRlcjogYDJweCBzb2xpZCAke3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC41KSwgbyl9YCxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHtzfSlgLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vLyBTaG90IDI6IGEgY29sb3VyIGRpYWwgdGhhdCBzd2VlcHMgYW1iZXIgXHUyMTkyIGJsdWUgYXJvdW5kIHRoZSBsYW1wLlxuY29uc3QgQ29sb3VyRGlhbDogUmVhY3QuRkM8e0w6IExheW91dDsgZnJhbWU6IG51bWJlcjsgaHVlVDogbnVtYmVyOyBjb2xvcjogUkdCfT4gPSAoe1xuICBMLFxuICBmcmFtZSxcbiAgaHVlVCxcbiAgY29sb3IsXG59KSA9PiB7XG4gIGNvbnN0IHtELCBsYW1wWCwgbGFtcFl9ID0gTDtcbiAgY29uc3QgbyA9IGludGVycG9sYXRlKGZyYW1lLCBbOTAsIDEwMiwgMTY2LCAxNzhdLCBbMCwgMSwgMSwgMF0sIENMQU1QKTtcbiAgaWYgKG8gPD0gMCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IFIgPSBEICogMC42NjtcbiAgY29uc3Qgc2l6ZSA9IFIgKiAyICsgNDA7XG4gIGNvbnN0IGNpcmMgPSAyICogTWF0aC5QSSAqIFI7XG4gIGNvbnN0IHN3ZWVwID0gTWF0aC5tYXgoMC4wMDEsIGh1ZVQpO1xuICBjb25zdCBhbmdsZSA9IC05MCArIHN3ZWVwICogMzYwO1xuICBjb25zdCBreCA9IHNpemUgLyAyICsgUiAqIE1hdGguY29zKChhbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcbiAgY29uc3Qga3kgPSBzaXplIC8gMiArIFIgKiBNYXRoLnNpbigoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MCk7XG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgZGF0YS1sYXllcj1cImNvbG91ci1kaWFsXCJcbiAgICAgIHdpZHRoPXtzaXplfVxuICAgICAgaGVpZ2h0PXtzaXplfVxuICAgICAgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogbGFtcFggLSBzaXplIC8gMiwgdG9wOiBsYW1wWSAtIHNpemUgLyAyLCBvcGFjaXR5OiBvfX1cbiAgICA+XG4gICAgICA8ZGVmcz5cbiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwiZGlhbEdyYWRcIiB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjFcIiB5Mj1cIjFcIj5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3BDb2xvcj17cmdiYShBTUJFUil9IC8+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj17cmdiYShCTFVFKX0gLz5cbiAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgIDwvZGVmcz5cbiAgICAgIDxjaXJjbGUgY3g9e3NpemUgLyAyfSBjeT17c2l6ZSAvIDJ9IHI9e1J9IGZpbGw9XCJub25lXCIgc3Ryb2tlPVwicmdiYSgyNTUsMjU1LDI1NSwwLjA4KVwiIHN0cm9rZVdpZHRoPXsyfSAvPlxuICAgICAgPGNpcmNsZVxuICAgICAgICBjeD17c2l6ZSAvIDJ9XG4gICAgICAgIGN5PXtzaXplIC8gMn1cbiAgICAgICAgcj17Un1cbiAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICBzdHJva2U9XCJ1cmwoI2RpYWxHcmFkKVwiXG4gICAgICAgIHN0cm9rZVdpZHRoPXszfVxuICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICBzdHJva2VEYXNoYXJyYXk9e2Ake2NpcmMgKiBzd2VlcH0gJHtjaXJjfWB9XG4gICAgICAgIHRyYW5zZm9ybT17YHJvdGF0ZSgtOTAgJHtzaXplIC8gMn0gJHtzaXplIC8gMn0pYH1cbiAgICAgIC8+XG4gICAgICA8Y2lyY2xlIGN4PXtreH0gY3k9e2t5fSByPXs5fSBmaWxsPXtyZ2JhKG1peChXSElURSwgY29sb3IsIDAuMykpfSAvPlxuICAgICAgPGNpcmNsZSBjeD17a3h9IGN5PXtreX0gcj17MjB9IGZpbGw9e3JnYmEoY29sb3IsIDAuMjUpfSAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBDb3B5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgYW5jaG9yID0gKEw6IExheW91dCwgeTogbnVtYmVyLCBkeTogbnVtYmVyLCBzY2FsZSA9IDEpOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICBsZWZ0OiBMLnRleHRYLFxuICB0b3A6IHksXG4gIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB3aWR0aDogJ21heC1jb250ZW50JyxcbiAgZm9udEZhbWlseTogRk9OVCxcbiAgdHJhbnNmb3JtT3JpZ2luOiBMLnBvcnRyYWl0ID8gJzUwJSA1MCUnIDogJzAlIDUwJScsXG4gIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke0wucG9ydHJhaXQgPyAnLTUwJScgOiAnMCd9LCBjYWxjKC01MCUgKyAke2R5fXB4KSkgc2NhbGUoJHtzY2FsZX0pYCxcbn0pO1xuXG5jb25zdCBDb3B5OiBSZWFjdC5GQzx7TDogTGF5b3V0OyBmcmFtZTogbnVtYmVyOyBmcHM6IG51bWJlcjsgY29sb3I6IFJHQn0+ID0gKHtMLCBmcmFtZSwgZnBzLCBjb2xvcn0pID0+IHtcbiAgLy8gU2hvdCAxIGNhcHRpb24gXHUyMDE0IGZ1bGx5IGluIGJ5IH4wOjAwLjcsIG91dCBhdCB0aGUgY3V0LlxuICBjb25zdCBjYXBJbiA9IHNwcmluZyh7ZnJhbWU6IGZyYW1lIC0gNCwgZnBzLCBjb25maWc6IHtkYW1waW5nOiAyMDB9LCBkdXJhdGlvbkluRnJhbWVzOiAxOH0pO1xuICBjb25zdCBjYXBPdXQgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzg0LCA5MF0sIFswLCAxXSwgQ0xBTVApO1xuICBjb25zdCBjYXBPcGFjaXR5ID0gaW50ZXJwb2xhdGUoY2FwSW4sIFswLCAwLjZdLCBbMCwgMV0sIENMQU1QKSAqICgxIC0gY2FwT3V0KTtcbiAgY29uc3QgY2FwQmx1ciA9IGludGVycG9sYXRlKGNhcEluLCBbMCwgMV0sIFsxMCwgMF0pICsgY2FwT3V0ICogODtcblxuICAvLyBTaG90IDIgcHJpY2UgdGFnIFx1MjAxNCBpbiBieSAwOjAzLjcsIGhvbGRzIHRocm91Z2ggMDowNS42LlxuICBjb25zdCBwcmljZUluID0gc3ByaW5nKHtmcmFtZTogZnJhbWUgLSA5OCwgZnBzLCBjb25maWc6IHtkYW1waW5nOiAxNSwgc3RpZmZuZXNzOiAxMjB9LCBkdXJhdGlvbkluRnJhbWVzOiAyMn0pO1xuICBjb25zdCBwcmljZU91dCA9IGludGVycG9sYXRlKGZyYW1lLCBbMTY2LCAxNzNdLCBbMCwgMV0sIENMQU1QKTtcbiAgY29uc3QgcHJpY2VPcGFjaXR5ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFs5OCwgMTA4XSwgWzAsIDFdLCBDTEFNUCkgKiAoMSAtIHByaWNlT3V0KTtcblxuICAvLyBTaG90IDMgd29yZG1hcmsgXHUyMDE0IGZ1bGx5IHByZXNlbnQgZnJvbSB0aGUgY3V0IGF0IDA6MDYuXG4gIGNvbnN0IHdtSW4gPSBzcHJpbmcoe2ZyYW1lOiBmcmFtZSAtIDE3MiwgZnBzLCBjb25maWc6IHtkYW1waW5nOiAyMDB9LCBkdXJhdGlvbkluRnJhbWVzOiAzMH0pO1xuICBjb25zdCB3bU9wYWNpdHkgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzE3MywgMTc5XSwgWzAsIDFdLCBDTEFNUCk7XG4gIGNvbnN0IHdtVHJhY2tpbmcgPSBpbnRlcnBvbGF0ZSh3bUluLCBbMCwgMV0sIFswLjUsIDAuMzRdKTtcblxuICAvLyBTaG90IDMgYnV0dG9uIFx1MjAxNCBmdWxseSBpbiBieSB+MDowNy5cbiAgY29uc3QgYnRuSW4gPSBzcHJpbmcoe2ZyYW1lOiBmcmFtZSAtIDE5NiwgZnBzLCBjb25maWc6IHtkYW1waW5nOiAxNiwgc3RpZmZuZXNzOiAxMTB9LCBkdXJhdGlvbkluRnJhbWVzOiAyNH0pO1xuICBjb25zdCBidG5PcGFjaXR5ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsxOTYsIDIwNl0sIFswLCAxXSwgQ0xBTVApO1xuICBjb25zdCBzaGluZSA9IGludGVycG9sYXRlKGZyYW1lLCBbMjI4LCAyNjJdLCBbLTYwLCAxNjBdLCBDTEFNUCk7XG5cbiAgY29uc3QgdGV4dENvbG9yID0gJyNGNkYyRUMnO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbD5cbiAgICAgIHtjYXBPcGFjaXR5ID4gMCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiY2FwdGlvblwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLmFuY2hvcihMLCBMLmNhcHRpb25ZLCBpbnRlcnBvbGF0ZShjYXBJbiwgWzAsIDFdLCBbMjgsIDBdKSAtIGNhcE91dCAqIDEyKSxcbiAgICAgICAgICAgIGZvbnRTaXplOiBMLmNhcHRpb25TaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAzZW0nLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMS4xLFxuICAgICAgICAgICAgY29sb3I6IHRleHRDb2xvcixcbiAgICAgICAgICAgIG9wYWNpdHk6IGNhcE9wYWNpdHksXG4gICAgICAgICAgICBmaWx0ZXI6IGBibHVyKCR7Y2FwQmx1cn1weClgLFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogYDAgMCA0MHB4ICR7cmdiYShBTUJFUiwgMC4yNSl9YCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgTGlnaHQgdGhhdCBsaXN0ZW5zXG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAge3ByaWNlT3BhY2l0eSA+IDAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cInByaWNlXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uYW5jaG9yKEwsIEwucHJpY2VZLCBpbnRlcnBvbGF0ZShwcmljZUluLCBbMCwgMV0sIFsyNCwgMF0pIC0gcHJpY2VPdXQgKiAxMCwgaW50ZXJwb2xhdGUocHJpY2VJbiwgWzAsIDFdLCBbMC45MiwgMV0pKSxcbiAgICAgICAgICAgIGZvbnRTaXplOiBMLnByaWNlU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wMmVtJyxcbiAgICAgICAgICAgIGZvbnRWYXJpYW50TnVtZXJpYzogJ3RhYnVsYXItbnVtcycsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgY29sb3I6IHJnYmEobWl4KFdISVRFLCBjb2xvciwgMC4xMikpLFxuICAgICAgICAgICAgcGFkZGluZzogJzAuMjZlbSAwLjU1ZW0gMC4yNmVtIDEuMDVlbScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcwLjIyZW0gMC41ZW0gMC41ZW0gMC4yMmVtJyxcbiAgICAgICAgICAgIGJvcmRlcjogYDJweCBzb2xpZCAke3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC40KSwgMC40NSl9YCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDAuNWVtIDUwJSwgcmdiYSg2LDYsOSwwLjk1KSAwLjA5ZW0sICR7cmdiYShcbiAgICAgICAgICAgICAgbWl4KFdISVRFLCBjb2xvciwgMC42KSxcbiAgICAgICAgICAgICAgMC43XG4gICAgICAgICAgICApfSAwLjFlbSwgJHtyZ2JhKG1peChXSElURSwgY29sb3IsIDAuNiksIDAuMCl9IDAuMTZlbSksIGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICR7cmdiYShcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIDAuMjJcbiAgICAgICAgICAgICl9IDAlLCByZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIDEwMCUpYCxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMjBweCA2MHB4IHJnYmEoMCwwLDAsMC40NSksIDAgMCA1MHB4ICR7cmdiYShjb2xvciwgMC4xOCl9YCxcbiAgICAgICAgICAgIG9wYWNpdHk6IHByaWNlT3BhY2l0eSxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgJDg5XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAge3dtT3BhY2l0eSA+IDAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cIndvcmRtYXJrXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uYW5jaG9yKEwsIEwud29yZG1hcmtZLCBpbnRlcnBvbGF0ZSh3bUluLCBbMCwgMV0sIFsxOCwgMF0pKSxcbiAgICAgICAgICAgIGZvbnRTaXplOiBMLndvcmRtYXJrU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDMwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IGAke3dtVHJhY2tpbmd9ZW1gLFxuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IEwucG9ydHJhaXQgPyBgJHt3bVRyYWNraW5nfWVtYCA6IDAsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgY29sb3I6IHRleHRDb2xvcixcbiAgICAgICAgICAgIG9wYWNpdHk6IHdtT3BhY2l0eSxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IGAwIDAgNjBweCAke3JnYmEoY29sb3IsIDAuMzUpfWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIEhBTE9cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogMTY6OSBcdTIwMTQgdGhlIENUQSBpcyBhIGZ1bGwtd2lkdGggYnV5IGJhciBkb2NrZWQgdG8gdGhlIGJvdHRvbSBlZGdlLlxuICAgICAgICAgIEl0IHJldmVhbHMgd2l0aCBhIGNsaXAgZnJvbSBpdHMgdG9wIGVkZ2UsIHNvIGl0cyBib3ggYW5kIHRleHQgbmV2ZXJcbiAgICAgICAgICBsZWF2ZSB0aGUgZnJhbWUuICg5OjE2IGtlZXBzIHRoZSBwaWxsOiB0aGUgc3Rvcnlib2FyZCBmb3JiaWRzIGFueVxuICAgICAgICAgIGJ1dHRvbiBpbiB0aGUgYm90dG9tIDM1JSBvZiB0aGF0IGN1dC4pICovfVxuICAgICAgeyFMLnBvcnRyYWl0ICYmIGJ0bk9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJidXR0b25cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIGhlaWdodDogTC5mb290ZXJIZWlnaHQsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGZvbnRTaXplOiBMLmZvb3RlclNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDFlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgY29sb3I6ICcjMGIwYzEwJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTA1ZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDApICR7c2hpbmUgLSAxMn0lLCByZ2JhKDI1NSwyNTUsMjU1LDAuOSkgJHtzaGluZX0lLCByZ2JhKDI1NSwyNTUsMjU1LDApICR7XG4gICAgICAgICAgICAgIHNoaW5lICsgMTJcbiAgICAgICAgICAgIH0lKSwgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgJHtyZ2JhKG1peChXSElURSwgY29sb3IsIDAuMjgpKX0gMTAwJSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAtMjRweCA4MHB4ICR7cmdiYShjb2xvciwgMC4zKX0sIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjkpYCxcbiAgICAgICAgICAgIGNsaXBQYXRoOiBgaW5zZXQoJHsoMSAtIE1hdGgubWluKDEsIGJ0bkluKSkgKiAxMDB9JSAwIDAgMClgLFxuICAgICAgICAgICAgb3BhY2l0eTogYnRuT3BhY2l0eSxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgUHJlLW9yZGVyIG5vd1xuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHtMLnBvcnRyYWl0ICYmIGJ0bk9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJidXR0b25cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5hbmNob3IoTCwgTC5idXR0b25ZLCBpbnRlcnBvbGF0ZShidG5JbiwgWzAsIDFdLCBbMjYsIDBdKSwgaW50ZXJwb2xhdGUoYnRuSW4sIFswLCAxXSwgWzAuOTQsIDFdKSksXG4gICAgICAgICAgICBmb250U2l6ZTogTC5idXR0b25TaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAwNWVtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogJyMwYjBjMTAnLFxuICAgICAgICAgICAgcGFkZGluZzogJzAuNzhlbSAxLjdlbScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDk5OSxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTA1ZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDApICR7c2hpbmUgLSAyMH0lLCByZ2JhKDI1NSwyNTUsMjU1LDAuOTUpICR7c2hpbmV9JSwgcmdiYSgyNTUsMjU1LDI1NSwwKSAke1xuICAgICAgICAgICAgICBzaGluZSArIDIwXG4gICAgICAgICAgICB9JSksIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjIyKSl9IDEwMCUpYCxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMThweCA1MHB4ICR7cmdiYShjb2xvciwgMC4zNSl9LCBpbnNldCAwIC0ycHggMCByZ2JhKDAsMCwwLDAuMDgpYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IGJ0bk9wYWNpdHksXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIFByZS1vcmRlciBub3dcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBGaW5pc2hpbmc6IHZpZ25ldHRlICsgZ3JhaW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgRmluaXNoOiBSZWFjdC5GQyA9ICgpID0+IChcbiAgPEFic29sdXRlRmlsbCBzdHlsZT17e3BvaW50ZXJFdmVudHM6ICdub25lJ319PlxuICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgIHN0eWxlPXt7YmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDUwJSA0OCUsIHJnYmEoMCwwLDAsMCkgNDUlLCByZ2JhKDAsMCwwLDAuNTUpIDEwMCUpJ319XG4gICAgLz5cbiAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCwgb3BhY2l0eTogMC4wNywgbWl4QmxlbmRNb2RlOiAnb3ZlcmxheSd9fT5cbiAgICAgIDxmaWx0ZXIgaWQ9XCJncmFpblwiPlxuICAgICAgICA8ZmVUdXJidWxlbmNlIHR5cGU9XCJmcmFjdGFsTm9pc2VcIiBiYXNlRnJlcXVlbmN5PVwiMC44NVwiIG51bU9jdGF2ZXM9ezJ9IHNlZWQ9ezd9IHN0aXRjaFRpbGVzPVwic3RpdGNoXCIgLz5cbiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT1cInNhdHVyYXRlXCIgdmFsdWVzPVwiMFwiIC8+XG4gICAgICA8L2ZpbHRlcj5cbiAgICAgIDxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWx0ZXI9XCJ1cmwoI2dyYWluKVwiIC8+XG4gICAgPC9zdmc+XG4gIDwvQWJzb2x1dGVGaWxsPlxuKTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBDb21wb3NpdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlkZW8oKSB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHVzZVZpZGVvQ29uZmlnKCk7XG4gIGNvbnN0IEwgPSBnZXRMYXlvdXQod2lkdGgsIGhlaWdodCk7XG4gIGNvbnN0IHtmcmFtZSwgZnBzLCBpbnRlbnNpdHksIGh1ZVQsIGNvbG9yfSA9IHVzZVRpbWVsaW5lKCk7XG5cbiAgLy8gU2xvdyBjYW1lcmEgcHVzaCBpbnRvIHRoZSBsYW1wIGFjcm9zcyB0aGUgd2hvbGUgc3BvdC5cbiAgY29uc3QgcHVzaCA9IGludGVycG9sYXRlKGZyYW1lLCBbMCwgMzAwXSwgWzEsIDEuMDQ1XSwgey4uLkNMQU1QLCBlYXNpbmc6IEVhc2luZy5pbk91dChFYXNpbmcuc2luKX0pO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17e2JhY2tncm91bmRDb2xvcjogJyMwNTA0MDYnLCBvdmVyZmxvdzogJ2hpZGRlbid9fT5cbiAgICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3t0cmFuc2Zvcm06IGBzY2FsZSgke3B1c2h9KWAsIHRyYW5zZm9ybU9yaWdpbjogYCR7TC5sYW1wWH1weCAke0wubGFtcFl9cHhgfX0+XG4gICAgICAgIDxSb29tIEw9e0x9IGNvbG9yPXtjb2xvcn0gaW50ZW5zaXR5PXtpbnRlbnNpdHl9IC8+XG4gICAgICAgIDxMaXN0ZW5SaW5ncyBMPXtMfSBjb2xvcj17Y29sb3J9IGZyYW1lPXtmcmFtZX0gLz5cbiAgICAgICAgPENvbG91ckRpYWwgTD17TH0gZnJhbWU9e2ZyYW1lfSBodWVUPXtodWVUfSBjb2xvcj17Y29sb3J9IC8+XG4gICAgICAgIDxMYW1wIEw9e0x9IGNvbG9yPXtjb2xvcn0gaW50ZW5zaXR5PXtpbnRlbnNpdHl9IGZyYW1lPXtmcmFtZX0gZnBzPXtmcHN9IC8+XG4gICAgICA8L0Fic29sdXRlRmlsbD5cbiAgICAgIDxGaW5pc2ggLz5cbiAgICAgIDxDb3B5IEw9e0x9IGZyYW1lPXtmcmFtZX0gZnBzPXtmcHN9IGNvbG9yPXtjb2xvcn0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsVUFBVTtBQUFBO0FBQUE7OztBQ0F2RDtBQUFBO0FBQUEsV0FBTyxVQUFVLFdBQVcsaUJBQWlCLG1CQUFtQjtBQUFBO0FBQUE7OztBQ1FoRSxzQkFPTztBQTBISDtBQXhIRyxJQUFNLGNBQWM7QUFBQSxFQUN6QixLQUFLO0FBQUEsRUFDTCxrQkFBa0I7QUFBQSxFQUNsQixPQUFPO0FBQUEsSUFDTCxFQUFDLEdBQUcsR0FBRyxPQUFPLGdCQUFnQixNQUFNLEdBQUcsa0JBQWtCLEdBQUU7QUFBQSxJQUMzRCxFQUFDLEdB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
