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

// workspaces/halo-smart-lamp-launch-spot-d971/versions/v1/Video.tsx
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
      buttonY: height * 0.47,
      captionSize: 92,
      priceSize: 84,
      wordmarkSize: 150,
      buttonSize: 40
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
    wordmarkY: height * 0.4,
    buttonY: height * 0.585,
    captionSize: 104,
    priceSize: 96,
    wordmarkSize: 176,
    buttonSize: 40
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
  const priceOut = (0, import_remotion.interpolate)(frame, [170, 178], [0, 1], CLAMP);
  const priceOpacity = (0, import_remotion.interpolate)(frame, [98, 108], [0, 1], CLAMP) * (1 - priceOut);
  const wmIn = (0, import_remotion.spring)({ frame: frame - 168, fps, config: { damping: 200 }, durationInFrames: 30 });
  const wmOpacity = (0, import_remotion.interpolate)(frame, [170, 179], [0, 1], CLAMP);
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
    btnOpacity > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9oYWxvLXNtYXJ0LWxhbXAtbGF1bmNoLXNwb3QtZDk3MS92ZXJzaW9ucy92MS9WaWRlby50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVtb3Rpb25cIl07IiwgIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVhY3QvanN4LXJ1bnRpbWVcIl07IiwgImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBBYnNvbHV0ZUZpbGwsXG4gIEVhc2luZyxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG5leHBvcnQgY29uc3QgY29tcG9zaXRpb24gPSB7XG4gIGZwczogMzAsXG4gIGR1cmF0aW9uSW5GcmFtZXM6IDMwMCxcbiAgc2hvdHM6IFtcbiAgICB7bjogMSwgdGl0bGU6ICdQcm9kdWN0IGhlcm8nLCBmcm9tOiAwLCBkdXJhdGlvbkluRnJhbWVzOiA5MH0sXG4gICAge246IDIsIHRpdGxlOiAnQ29sb3VyJywgZnJvbTogOTAsIGR1cmF0aW9uSW5GcmFtZXM6IDkwfSxcbiAgICB7bjogMywgdGl0bGU6ICdDYWxsIHRvIGFjdGlvbicsIGZyb206IDE4MCwgZHVyYXRpb25JbkZyYW1lczogMTIwfSxcbiAgXSxcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogUGFsZXR0ZSArIGhlbHBlcnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbnR5cGUgUkdCID0gW251bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuY29uc3QgQU1CRVI6IFJHQiA9IFsyNTUsIDE2NiwgNzJdO1xuY29uc3QgQkxVRTogUkdCID0gWzEyOCwgMTc4LCAyNTVdO1xuY29uc3QgV0hJVEU6IFJHQiA9IFsyNTUsIDI1NSwgMjU1XTtcbmNvbnN0IElOSzogUkdCID0gWzgsIDgsIDExXTtcblxuY29uc3QgbWl4ID0gKGE6IFJHQiwgYjogUkdCLCB0OiBudW1iZXIpOiBSR0IgPT5cbiAgWzAsIDEsIDJdLm1hcCgoaSkgPT4gTWF0aC5yb3VuZChhW2ldICsgKGJbaV0gLSBhW2ldKSAqIHQpKSBhcyBSR0I7XG5jb25zdCByZ2JhID0gKGM6IFJHQiwgYSA9IDEpID0+IGByZ2JhKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19LCR7YX0pYDtcblxuY29uc3QgQ0xBTVAgPSB7ZXh0cmFwb2xhdGVMZWZ0OiAnY2xhbXAnLCBleHRyYXBvbGF0ZVJpZ2h0OiAnY2xhbXAnfSBhcyBjb25zdDtcbmNvbnN0IEZPTlQgPVxuICAnXCJTRiBQcm8gRGlzcGxheVwiLCB1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIHNhbnMtc2VyaWYnO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIExheW91dCBwZXIgYXNwZWN0IHJhdGlvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG50eXBlIExheW91dCA9IFJldHVyblR5cGU8dHlwZW9mIGdldExheW91dD47XG5cbmZ1bmN0aW9uIGdldExheW91dCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICBjb25zdCBwb3J0cmFpdCA9IGhlaWdodCA+IHdpZHRoO1xuICBpZiAocG9ydHJhaXQpIHtcbiAgICAvLyA5OjE2IFx1MjAxNCB0ZXh0IGxpdmVzIGluIHRoZSBzYWZlIGJhbmQgKDE0JS4uNjUlIG9mIGhlaWdodCk7IHRoZSBsYW1wXG4gICAgLy8gc2l0cyBsb3cgYW5kIHRocm93cyBpdHMgbGlnaHQgdXAgaW50byB0aGUgY29weS5cbiAgICBjb25zdCBEID0gTWF0aC5yb3VuZCh3aWR0aCAqIDAuNDQpO1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0cmFpdCxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgRCxcbiAgICAgIGxhbXBYOiB3aWR0aCAvIDIsXG4gICAgICBsYW1wWTogaGVpZ2h0ICogMC42NjUsXG4gICAgICB0ZXh0WDogd2lkdGggLyAyLFxuICAgICAgY2FwdGlvblk6IGhlaWdodCAqIDAuNCxcbiAgICAgIHByaWNlWTogaGVpZ2h0ICogMC40LFxuICAgICAgd29yZG1hcmtZOiBoZWlnaHQgKiAwLjM1NSxcbiAgICAgIGJ1dHRvblk6IGhlaWdodCAqIDAuNDcsXG4gICAgICBjYXB0aW9uU2l6ZTogOTIsXG4gICAgICBwcmljZVNpemU6IDg0LFxuICAgICAgd29yZG1hcmtTaXplOiAxNTAsXG4gICAgICBidXR0b25TaXplOiA0MCxcbiAgICB9O1xuICB9XG4gIC8vIDE2OjkgXHUyMDE0IGxhbXAgb24gdGhlIGxlZnQgdGhpcmQsIGNvcHkgb24gdGhlIHJpZ2h0LlxuICBjb25zdCBEID0gTWF0aC5yb3VuZChoZWlnaHQgKiAwLjM1KTtcbiAgcmV0dXJuIHtcbiAgICBwb3J0cmFpdCxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgRCxcbiAgICBsYW1wWDogd2lkdGggKiAwLjMxLFxuICAgIGxhbXBZOiBoZWlnaHQgKiAwLjQ2LFxuICAgIHRleHRYOiB3aWR0aCAqIDAuNTU1LFxuICAgIGNhcHRpb25ZOiBoZWlnaHQgKiAwLjQ2LFxuICAgIHByaWNlWTogaGVpZ2h0ICogMC40NixcbiAgICB3b3JkbWFya1k6IGhlaWdodCAqIDAuNCxcbiAgICBidXR0b25ZOiBoZWlnaHQgKiAwLjU4NSxcbiAgICBjYXB0aW9uU2l6ZTogMTA0LFxuICAgIHByaWNlU2l6ZTogOTYsXG4gICAgd29yZG1hcmtTaXplOiAxNzYsXG4gICAgYnV0dG9uU2l6ZTogNDAsXG4gIH07XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogVGltZWxpbmUgdmFsdWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmZ1bmN0aW9uIHVzZVRpbWVsaW5lKCkge1xuICBjb25zdCBmcmFtZSA9IHVzZUN1cnJlbnRGcmFtZSgpO1xuICBjb25zdCB7ZnBzfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG5cbiAgLy8gTGFtcCBzd2l0Y2hlcyBvbjogYWxyZWFkeSBnbG93aW5nIG9uIGZyYW1lIDAsIGZ1bGx5IGxpdCBieSB+MC42cy5cbiAgY29uc3Qgc3dpdGNoT24gPSBzcHJpbmcoe2ZyYW1lLCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDE0LCBzdGlmZm5lc3M6IDkwfSwgZHVyYXRpb25JbkZyYW1lczogMjJ9KTtcbiAgY29uc3QgYnJlYXRoID0gMSArIDAuMDM1ICogTWF0aC5zaW4oKGZyYW1lIC8gZnBzKSAqIE1hdGguUEkgKiAwLjkpO1xuICBjb25zdCBpbnRlbnNpdHkgPSAoMC41ICsgMC41ICogTWF0aC5taW4oc3dpdGNoT24sIDEuMDgpKSAqIGJyZWF0aDtcblxuICAvLyBBbWJlciBcdTIxOTIgc29mdCBibHVlIGR1cmluZyBzaG90IDIuXG4gIGNvbnN0IGh1ZVQgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzk2LCAxNThdLCBbMCwgMV0sIHtcbiAgICAuLi5DTEFNUCxcbiAgICBlYXNpbmc6IEVhc2luZy5iZXppZXIoMC42NSwgMCwgMC4zNSwgMSksXG4gIH0pO1xuICBjb25zdCBjb2xvciA9IG1peChBTUJFUiwgQkxVRSwgaHVlVCk7XG5cbiAgcmV0dXJuIHtmcmFtZSwgZnBzLCBpbnRlbnNpdHksIGh1ZVQsIGNvbG9yfTtcbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBSb29tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgUm9vbTogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgaW50ZW5zaXR5OiBudW1iZXJ9PiA9ICh7TCwgY29sb3IsIGludGVuc2l0eX0pID0+IHtcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIEQsIGxhbXBYLCBsYW1wWSwgcG9ydHJhaXR9ID0gTDtcbiAgY29uc3QgYmFzZUJvdHRvbSA9IGxhbXBZICsgRCAvIDIgKyBEICogMC4wNztcbiAgY29uc3QgY29uc29sZUggPSBEICogKHBvcnRyYWl0ID8gMC4zIDogMC4yNik7XG4gIGNvbnN0IGZsb29yWSA9IGJhc2VCb3R0b20gKyBjb25zb2xlSDtcbiAgY29uc3QgY29uc29sZUxlZnQgPSBwb3J0cmFpdCA/IGxhbXBYIC0gd2lkdGggKiAwLjQyIDogLTQwO1xuICBjb25zdCBjb25zb2xlUmlnaHQgPSBwb3J0cmFpdCA/IGxhbXBYICsgd2lkdGggKiAwLjQyIDogbGFtcFggKyBEICogMS4wNTtcbiAgY29uc3QgSSA9IGludGVuc2l0eTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIj5cbiAgICAgIHsvKiB3YWxsICovfVxuICAgICAgPEFic29sdXRlRmlsbFxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGEwOTBjIDAlLCAjMTAwZTExICR7KGZsb29yWSAvIGhlaWdodCkgKiAxMDB9JSwgIzA2MDUwNyAke1xuICAgICAgICAgICAgKGZsb29yWSAvIGhlaWdodCkgKiAxMDBcbiAgICAgICAgICB9JSwgIzAzMDMwNCAxMDAlKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHdhbGwgcGFuZWxzICovfVxuICAgICAge1swLjEyLCAwLjUsIDAuODhdLm1hcCgoeCwgaSkgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IHdpZHRoICogeCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBmbG9vclksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjAzNSkgNjAlLCByZ2JhKDI1NSwyNTUsMjU1LDApIDEwMCUpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgICB7LyogbGlnaHQgd2FzaGluZyB0aGUgd2FsbCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiA0LFxuICAgICAgICAgIHRvcDogbGFtcFkgLSBEICogMy4yLFxuICAgICAgICAgIHdpZHRoOiBEICogOCxcbiAgICAgICAgICBoZWlnaHQ6IEQgKiA2LjQsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjIgKiBJKX0gMCUsICR7cmdiYShcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgMC4wOCAqIElcbiAgICAgICAgICApfSA0NSUsIHJnYmEoMCwwLDAsMCkgMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBsb3cgY29uc29sZSB0aGUgbGFtcCBzdGFuZHMgb24gKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogY29uc29sZUxlZnQsXG4gICAgICAgICAgdG9wOiBiYXNlQm90dG9tLFxuICAgICAgICAgIHdpZHRoOiBjb25zb2xlUmlnaHQgLSBjb25zb2xlTGVmdCxcbiAgICAgICAgICBoZWlnaHQ6IGNvbnNvbGVILFxuICAgICAgICAgIGJvcmRlclJhZGl1czogNCxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgJHtyZ2JhKG1peChjb2xvciwgWzQwLCAzNiwgMzRdLCAwLjU1KSwgMC45KX0gMHB4LCAjMWExODFiIDNweCwgIzEyMTAxMyA0MCUsICMwYTA5MGIgMTAwJSlgLFxuICAgICAgICAgIGJveFNoYWRvdzogJzAgMzBweCA2MHB4IHJnYmEoMCwwLDAsMC42KScsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgey8qIHBvb2wgb2YgbGlnaHQgb24gdGhlIGNvbnNvbGUgdG9wICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAqIDEuMSxcbiAgICAgICAgICB0b3A6IGJhc2VCb3R0b20gLSBEICogMC4wOCxcbiAgICAgICAgICB3aWR0aDogRCAqIDIuMixcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjIyLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsICR7cmdiYShjb2xvciwgMC4zNSAqIEkpfSwgcmdiYSgwLDAsMCwwKSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBmbG9vciByZWZsZWN0aW9uICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAqIDEuOCxcbiAgICAgICAgICB0b3A6IGZsb29yWSxcbiAgICAgICAgICB3aWR0aDogRCAqIDMuNixcbiAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjUsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjEyICogSSl9LCByZ2JhKDAsMCwwLDApKWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBUaGUgbGFtcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgTGFtcDogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgaW50ZW5zaXR5OiBudW1iZXI7IGZyYW1lOiBudW1iZXI7IGZwczogbnVtYmVyfT4gPSAoe1xuICBMLFxuICBjb2xvcixcbiAgaW50ZW5zaXR5LFxuICBmcmFtZSxcbiAgZnBzLFxufSkgPT4ge1xuICBjb25zdCB7RCwgbGFtcFgsIGxhbXBZfSA9IEw7XG4gIGNvbnN0IHIgPSBEIC8gMjtcbiAgY29uc3QgSSA9IE1hdGgubWluKGludGVuc2l0eSwgMS4xKTtcbiAgY29uc3QgcmlzZSA9IHNwcmluZyh7ZnJhbWUsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMjAwfSwgZHVyYXRpb25JbkZyYW1lczogMjR9KTtcbiAgY29uc3QgeSA9IGludGVycG9sYXRlKHJpc2UsIFswLCAxXSwgW0QgKiAwLjA2LCAwXSk7XG5cbiAgY29uc3QgY29yZSA9IG1peChXSElURSwgY29sb3IsIDAuMTIpO1xuICBjb25zdCBtaWQgPSBtaXgoV0hJVEUsIGNvbG9yLCAwLjU1KTtcbiAgY29uc3QgcmltID0gbWl4KGNvbG9yLCBJTkssIDAuMTgpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHsvKiBibG9vbSBiZWhpbmQgdGhlIGxhbXAgKi99XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtbGF5ZXI9XCJnbG93XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiAyLjQsXG4gICAgICAgICAgdG9wOiBsYW1wWSAtIEQgKiAyLjQgKyB5LFxuICAgICAgICAgIHdpZHRoOiBEICogNC44LFxuICAgICAgICAgIGhlaWdodDogRCAqIDQuOCxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoY2xvc2VzdC1zaWRlLCAke3JnYmEoY29sb3IsIDAuNDIgKiBJKX0gMCUsICR7cmdiYShcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgMC4xNiAqIElcbiAgICAgICAgICApfSAzOCUsIHJnYmEoMCwwLDAsMCkgMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxkaXZcbiAgICAgICAgZGF0YS1sYXllcj1cInByb2R1Y3RcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gcixcbiAgICAgICAgICB0b3A6IGxhbXBZIC0gciArIHksXG4gICAgICAgICAgd2lkdGg6IEQsXG4gICAgICAgICAgaGVpZ2h0OiBEICogMS4wNyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgey8qIGJhc2UgcHVjayAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IEQgKiAwLjI3LFxuICAgICAgICAgICAgdG9wOiBEICogMC45NCxcbiAgICAgICAgICAgIHdpZHRoOiBEICogMC40NixcbiAgICAgICAgICAgIGhlaWdodDogRCAqIDAuMTMsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IGAke0QgKiAwLjAzfXB4ICR7RCAqIDAuMDN9cHggJHtEICogMC4wNX1weCAke0QgKiAwLjA1fXB4YCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjNGE0NzQ5IDAlLCAjMjIyMDIzIDQwJSwgIzEyMTExMyAxMDAlKScsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGBpbnNldCAwIDJweCAwICR7cmdiYShjb2xvciwgMC41NSAqIEkpfSwgMCAxOHB4IDMwcHggcmdiYSgwLDAsMCwwLjU1KWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgey8qIHVubGl0IHNwaGVyZTogbWF0dGUgd2hpdGUgZ2xhc3MgKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBpbnNldDogMCxcbiAgICAgICAgICAgIGhlaWdodDogRCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgICAncmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAzOCUgMzAlLCAjZjZmNGYxIDAlLCAjZDhkNWQxIDQwJSwgIzhhODc4NCA3OCUsICMzZjNkM2IgMTAwJSknLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIHsvKiBsaXQgc3BoZXJlICovfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgaW5zZXQ6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IEQsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgb3BhY2l0eTogTWF0aC5taW4oMSwgSSksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA1MCUgNDAlLCAjZmZmZmZmIDAlLCAke3JnYmEoY29yZSl9IDIwJSwgJHtyZ2JhKFxuICAgICAgICAgICAgICBtaWRcbiAgICAgICAgICAgICl9IDU4JSwgJHtyZ2JhKGNvbG9yKX0gODQlLCAke3JnYmEocmltKX0gMTAwJSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwICR7RCAqIDAuMTh9cHggJHtyZ2JhKGNvbG9yLCAwLjYgKiBJKX0sIDAgMCAke0QgKiAwLjZ9cHggJHtyZ2JhKFxuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgMC4zNSAqIElcbiAgICAgICAgICAgICl9LCBpbnNldCAwIC0ke0QgKiAwLjA2fXB4ICR7RCAqIDAuMTJ9cHggJHtyZ2JhKHJpbSwgMC42KX1gLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIHsvKiBzcGVjdWxhciBzaGVlbiAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IEQgKiAwLjIsXG4gICAgICAgICAgICB0b3A6IEQgKiAwLjEsXG4gICAgICAgICAgICB3aWR0aDogRCAqIDAuMzQsXG4gICAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKC0yOGRlZyknLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsIHJnYmEoMjU1LDI1NSwyNTUsMC43NSksIHJnYmEoMjU1LDI1NSwyNTUsMCkpJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob3Qtc3BlY2lmaWMgZ3JhcGhpY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vLyBTaG90IDE6IHNvZnQgcmluZ3MgXCJsaXN0ZW5pbmdcIiBvdXR3YXJkIGZyb20gdGhlIGxhbXAuXG5jb25zdCBMaXN0ZW5SaW5nczogUmVhY3QuRkM8e0w6IExheW91dDsgY29sb3I6IFJHQjsgZnJhbWU6IG51bWJlcn0+ID0gKHtMLCBjb2xvciwgZnJhbWV9KSA9PiB7XG4gIGNvbnN0IHtELCBsYW1wWCwgbGFtcFl9ID0gTDtcbiAgY29uc3Qgc2hvdEZhZGUgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzE0LCAyNiwgNzYsIDg4XSwgWzAsIDEsIDEsIDBdLCBDTEFNUCk7XG4gIGlmIChzaG90RmFkZSA8PSAwKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcGVyaW9kID0gNDI7XG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBkYXRhLWxheWVyPVwibGlzdGVuLXJpbmdzXCI+XG4gICAgICB7WzAsIDEsIDJdLm1hcCgoaSkgPT4ge1xuICAgICAgICBjb25zdCBsb2NhbCA9IGZyYW1lIC0gMTQgLSBpICogMTQ7XG4gICAgICAgIGlmIChsb2NhbCA8IDApIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCB0ID0gKGxvY2FsICUgcGVyaW9kKSAvIHBlcmlvZDtcbiAgICAgICAgY29uc3QgcyA9IDEuMDQgKyBFYXNpbmcub3V0KEVhc2luZy5jdWJpYykodCkgKiAwLjc1O1xuICAgICAgICBjb25zdCBvID0gKDEgLSB0KSAqIDAuNTUgKiBzaG90RmFkZTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgbGVmdDogbGFtcFggLSBEIC8gMixcbiAgICAgICAgICAgICAgdG9wOiBsYW1wWSAtIEQgLyAyLFxuICAgICAgICAgICAgICB3aWR0aDogRCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBELFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgICBib3JkZXI6IGAycHggc29saWQgJHtyZ2JhKG1peChXSElURSwgY29sb3IsIDAuNSksIG8pfWAsXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7c30pYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLy8gU2hvdCAyOiBhIGNvbG91ciBkaWFsIHRoYXQgc3dlZXBzIGFtYmVyIFx1MjE5MiBibHVlIGFyb3VuZCB0aGUgbGFtcC5cbmNvbnN0IENvbG91ckRpYWw6IFJlYWN0LkZDPHtMOiBMYXlvdXQ7IGZyYW1lOiBudW1iZXI7IGh1ZVQ6IG51bWJlcjsgY29sb3I6IFJHQn0+ID0gKHtcbiAgTCxcbiAgZnJhbWUsXG4gIGh1ZVQsXG4gIGNvbG9yLFxufSkgPT4ge1xuICBjb25zdCB7RCwgbGFtcFgsIGxhbXBZfSA9IEw7XG4gIGNvbnN0IG8gPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzkwLCAxMDIsIDE2NiwgMTc4XSwgWzAsIDEsIDEsIDBdLCBDTEFNUCk7XG4gIGlmIChvIDw9IDApIHJldHVybiBudWxsO1xuICBjb25zdCBSID0gRCAqIDAuNjY7XG4gIGNvbnN0IHNpemUgPSBSICogMiArIDQwO1xuICBjb25zdCBjaXJjID0gMiAqIE1hdGguUEkgKiBSO1xuICBjb25zdCBzd2VlcCA9IE1hdGgubWF4KDAuMDAxLCBodWVUKTtcbiAgY29uc3QgYW5nbGUgPSAtOTAgKyBzd2VlcCAqIDM2MDtcbiAgY29uc3Qga3ggPSBzaXplIC8gMiArIFIgKiBNYXRoLmNvcygoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MCk7XG4gIGNvbnN0IGt5ID0gc2l6ZSAvIDIgKyBSICogTWF0aC5zaW4oKGFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIGRhdGEtbGF5ZXI9XCJjb2xvdXItZGlhbFwiXG4gICAgICB3aWR0aD17c2l6ZX1cbiAgICAgIGhlaWdodD17c2l6ZX1cbiAgICAgIHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGxhbXBYIC0gc2l6ZSAvIDIsIHRvcDogbGFtcFkgLSBzaXplIC8gMiwgb3BhY2l0eTogb319XG4gICAgPlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cImRpYWxHcmFkXCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIxXCI+XG4gICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9e3JnYmEoQU1CRVIpfSAvPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9e3JnYmEoQkxVRSl9IC8+XG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICA8L2RlZnM+XG4gICAgICA8Y2lyY2xlIGN4PXtzaXplIC8gMn0gY3k9e3NpemUgLyAyfSByPXtSfSBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInJnYmEoMjU1LDI1NSwyNTUsMC4wOClcIiBzdHJva2VXaWR0aD17Mn0gLz5cbiAgICAgIDxjaXJjbGVcbiAgICAgICAgY3g9e3NpemUgLyAyfVxuICAgICAgICBjeT17c2l6ZSAvIDJ9XG4gICAgICAgIHI9e1J9XG4gICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgc3Ryb2tlPVwidXJsKCNkaWFsR3JhZClcIlxuICAgICAgICBzdHJva2VXaWR0aD17M31cbiAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtgJHtjaXJjICogc3dlZXB9ICR7Y2lyY31gfVxuICAgICAgICB0cmFuc2Zvcm09e2Byb3RhdGUoLTkwICR7c2l6ZSAvIDJ9ICR7c2l6ZSAvIDJ9KWB9XG4gICAgICAvPlxuICAgICAgPGNpcmNsZSBjeD17a3h9IGN5PXtreX0gcj17OX0gZmlsbD17cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjMpKX0gLz5cbiAgICAgIDxjaXJjbGUgY3g9e2t4fSBjeT17a3l9IHI9ezIwfSBmaWxsPXtyZ2JhKGNvbG9yLCAwLjI1KX0gLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogQ29weSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IGFuY2hvciA9IChMOiBMYXlvdXQsIHk6IG51bWJlciwgZHk6IG51bWJlciwgc2NhbGUgPSAxKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgbGVmdDogTC50ZXh0WCxcbiAgdG9wOiB5LFxuICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgd2lkdGg6ICdtYXgtY29udGVudCcsXG4gIGZvbnRGYW1pbHk6IEZPTlQsXG4gIHRyYW5zZm9ybU9yaWdpbjogTC5wb3J0cmFpdCA/ICc1MCUgNTAlJyA6ICcwJSA1MCUnLFxuICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtMLnBvcnRyYWl0ID8gJy01MCUnIDogJzAnfSwgY2FsYygtNTAlICsgJHtkeX1weCkpIHNjYWxlKCR7c2NhbGV9KWAsXG59KTtcblxuY29uc3QgQ29weTogUmVhY3QuRkM8e0w6IExheW91dDsgZnJhbWU6IG51bWJlcjsgZnBzOiBudW1iZXI7IGNvbG9yOiBSR0J9PiA9ICh7TCwgZnJhbWUsIGZwcywgY29sb3J9KSA9PiB7XG4gIC8vIFNob3QgMSBjYXB0aW9uIFx1MjAxNCBmdWxseSBpbiBieSB+MDowMC43LCBvdXQgYXQgdGhlIGN1dC5cbiAgY29uc3QgY2FwSW4gPSBzcHJpbmcoe2ZyYW1lOiBmcmFtZSAtIDQsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMjAwfSwgZHVyYXRpb25JbkZyYW1lczogMTh9KTtcbiAgY29uc3QgY2FwT3V0ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFs4NCwgOTBdLCBbMCwgMV0sIENMQU1QKTtcbiAgY29uc3QgY2FwT3BhY2l0eSA9IGludGVycG9sYXRlKGNhcEluLCBbMCwgMC42XSwgWzAsIDFdLCBDTEFNUCkgKiAoMSAtIGNhcE91dCk7XG4gIGNvbnN0IGNhcEJsdXIgPSBpbnRlcnBvbGF0ZShjYXBJbiwgWzAsIDFdLCBbMTAsIDBdKSArIGNhcE91dCAqIDg7XG5cbiAgLy8gU2hvdCAyIHByaWNlIHRhZyBcdTIwMTQgaW4gYnkgMDowMy43LCBob2xkcyB0aHJvdWdoIDA6MDUuNi5cbiAgY29uc3QgcHJpY2VJbiA9IHNwcmluZyh7ZnJhbWU6IGZyYW1lIC0gOTgsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMTUsIHN0aWZmbmVzczogMTIwfSwgZHVyYXRpb25JbkZyYW1lczogMjJ9KTtcbiAgY29uc3QgcHJpY2VPdXQgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzE3MCwgMTc4XSwgWzAsIDFdLCBDTEFNUCk7XG4gIGNvbnN0IHByaWNlT3BhY2l0eSA9IGludGVycG9sYXRlKGZyYW1lLCBbOTgsIDEwOF0sIFswLCAxXSwgQ0xBTVApICogKDEgLSBwcmljZU91dCk7XG5cbiAgLy8gU2hvdCAzIHdvcmRtYXJrIFx1MjAxNCBmdWxseSBwcmVzZW50IGZyb20gdGhlIGN1dCBhdCAwOjA2LlxuICBjb25zdCB3bUluID0gc3ByaW5nKHtmcmFtZTogZnJhbWUgLSAxNjgsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMjAwfSwgZHVyYXRpb25JbkZyYW1lczogMzB9KTtcbiAgY29uc3Qgd21PcGFjaXR5ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsxNzAsIDE3OV0sIFswLCAxXSwgQ0xBTVApO1xuICBjb25zdCB3bVRyYWNraW5nID0gaW50ZXJwb2xhdGUod21JbiwgWzAsIDFdLCBbMC41LCAwLjM0XSk7XG5cbiAgLy8gU2hvdCAzIGJ1dHRvbiBcdTIwMTQgZnVsbHkgaW4gYnkgfjA6MDcuXG4gIGNvbnN0IGJ0bkluID0gc3ByaW5nKHtmcmFtZTogZnJhbWUgLSAxOTYsIGZwcywgY29uZmlnOiB7ZGFtcGluZzogMTYsIHN0aWZmbmVzczogMTEwfSwgZHVyYXRpb25JbkZyYW1lczogMjR9KTtcbiAgY29uc3QgYnRuT3BhY2l0eSA9IGludGVycG9sYXRlKGZyYW1lLCBbMTk2LCAyMDZdLCBbMCwgMV0sIENMQU1QKTtcbiAgY29uc3Qgc2hpbmUgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzIyOCwgMjYyXSwgWy02MCwgMTYwXSwgQ0xBTVApO1xuXG4gIGNvbnN0IHRleHRDb2xvciA9ICcjRjZGMkVDJztcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGw+XG4gICAgICB7Y2FwT3BhY2l0eSA+IDAgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGF0YS1sYXllcj1cImNhcHRpb25cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5hbmNob3IoTCwgTC5jYXB0aW9uWSwgaW50ZXJwb2xhdGUoY2FwSW4sIFswLCAxXSwgWzI4LCAwXSkgLSBjYXBPdXQgKiAxMiksXG4gICAgICAgICAgICBmb250U2l6ZTogTC5jYXB0aW9uU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wM2VtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuMSxcbiAgICAgICAgICAgIGNvbG9yOiB0ZXh0Q29sb3IsXG4gICAgICAgICAgICBvcGFjaXR5OiBjYXBPcGFjaXR5LFxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigke2NhcEJsdXJ9cHgpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IGAwIDAgNDBweCAke3JnYmEoQU1CRVIsIDAuMjUpfWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIExpZ2h0IHRoYXQgbGlzdGVuc1xuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHtwcmljZU9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJwcmljZVwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLmFuY2hvcihMLCBMLnByaWNlWSwgaW50ZXJwb2xhdGUocHJpY2VJbiwgWzAsIDFdLCBbMjQsIDBdKSAtIHByaWNlT3V0ICogMTAsIGludGVycG9sYXRlKHByaWNlSW4sIFswLCAxXSwgWzAuOTIsIDFdKSksXG4gICAgICAgICAgICBmb250U2l6ZTogTC5wcmljZVNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDJlbScsXG4gICAgICAgICAgICBmb250VmFyaWFudE51bWVyaWM6ICd0YWJ1bGFyLW51bXMnLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKG1peChXSElURSwgY29sb3IsIDAuMTIpKSxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjI2ZW0gMC41NWVtIDAuMjZlbSAxLjA1ZW0nLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMC4yMmVtIDAuNWVtIDAuNWVtIDAuMjJlbScsXG4gICAgICAgICAgICBib3JkZXI6IGAycHggc29saWQgJHtyZ2JhKG1peChXSElURSwgY29sb3IsIDAuNCksIDAuNDUpfWAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAwLjVlbSA1MCUsIHJnYmEoNiw2LDksMC45NSkgMC4wOWVtLCAke3JnYmEoXG4gICAgICAgICAgICAgIG1peChXSElURSwgY29sb3IsIDAuNiksXG4gICAgICAgICAgICAgIDAuN1xuICAgICAgICAgICAgKX0gMC4xZW0sICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjYpLCAwLjApfSAwLjE2ZW0pLCBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAke3JnYmEoXG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAwLjIyXG4gICAgICAgICAgICApfSAwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjA1KSAxMDAlKWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwIDIwcHggNjBweCByZ2JhKDAsMCwwLDAuNDUpLCAwIDAgNTBweCAke3JnYmEoY29sb3IsIDAuMTgpfWAsXG4gICAgICAgICAgICBvcGFjaXR5OiBwcmljZU9wYWNpdHksXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgICQ4OVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHt3bU9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJ3b3JkbWFya1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLmFuY2hvcihMLCBMLndvcmRtYXJrWSwgaW50ZXJwb2xhdGUod21JbiwgWzAsIDFdLCBbMTgsIDBdKSksXG4gICAgICAgICAgICBmb250U2l6ZTogTC53b3JkbWFya1NpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAzMDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBgJHt3bVRyYWNraW5nfWVtYCxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBMLnBvcnRyYWl0ID8gYCR7d21UcmFja2luZ31lbWAgOiAwLFxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICAgIGNvbG9yOiB0ZXh0Q29sb3IsXG4gICAgICAgICAgICBvcGFjaXR5OiB3bU9wYWNpdHksXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiBgMCAwIDYwcHggJHtyZ2JhKGNvbG9yLCAwLjM1KX1gLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBIQUxPXG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAge2J0bk9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJidXR0b25cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5hbmNob3IoTCwgTC5idXR0b25ZLCBpbnRlcnBvbGF0ZShidG5JbiwgWzAsIDFdLCBbMjYsIDBdKSwgaW50ZXJwb2xhdGUoYnRuSW4sIFswLCAxXSwgWzAuOTQsIDFdKSksXG4gICAgICAgICAgICBmb250U2l6ZTogTC5idXR0b25TaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAwNWVtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogJyMwYjBjMTAnLFxuICAgICAgICAgICAgcGFkZGluZzogJzAuNzhlbSAxLjdlbScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDk5OSxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoMTA1ZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDApICR7c2hpbmUgLSAyMH0lLCByZ2JhKDI1NSwyNTUsMjU1LDAuOTUpICR7c2hpbmV9JSwgcmdiYSgyNTUsMjU1LDI1NSwwKSAke1xuICAgICAgICAgICAgICBzaGluZSArIDIwXG4gICAgICAgICAgICB9JSksIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjIyKSl9IDEwMCUpYCxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMThweCA1MHB4ICR7cmdiYShjb2xvciwgMC4zNSl9LCBpbnNldCAwIC0ycHggMCByZ2JhKDAsMCwwLDAuMDgpYCxcbiAgICAgICAgICAgIG9wYWNpdHk6IGJ0bk9wYWNpdHksXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIFByZS1vcmRlciBub3dcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBGaW5pc2hpbmc6IHZpZ25ldHRlICsgZ3JhaW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgRmluaXNoOiBSZWFjdC5GQyA9ICgpID0+IChcbiAgPEFic29sdXRlRmlsbCBzdHlsZT17e3BvaW50ZXJFdmVudHM6ICdub25lJ319PlxuICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgIHN0eWxlPXt7YmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDUwJSA0OCUsIHJnYmEoMCwwLDAsMCkgNDUlLCByZ2JhKDAsMCwwLDAuNTUpIDEwMCUpJ319XG4gICAgLz5cbiAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCwgb3BhY2l0eTogMC4wNywgbWl4QmxlbmRNb2RlOiAnb3ZlcmxheSd9fT5cbiAgICAgIDxmaWx0ZXIgaWQ9XCJncmFpblwiPlxuICAgICAgICA8ZmVUdXJidWxlbmNlIHR5cGU9XCJmcmFjdGFsTm9pc2VcIiBiYXNlRnJlcXVlbmN5PVwiMC44NVwiIG51bU9jdGF2ZXM9ezJ9IHNlZWQ9ezd9IHN0aXRjaFRpbGVzPVwic3RpdGNoXCIgLz5cbiAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT1cInNhdHVyYXRlXCIgdmFsdWVzPVwiMFwiIC8+XG4gICAgICA8L2ZpbHRlcj5cbiAgICAgIDxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWx0ZXI9XCJ1cmwoI2dyYWluKVwiIC8+XG4gICAgPC9zdmc+XG4gIDwvQWJzb2x1dGVGaWxsPlxuKTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBDb21wb3NpdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlkZW8oKSB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHVzZVZpZGVvQ29uZmlnKCk7XG4gIGNvbnN0IEwgPSBnZXRMYXlvdXQod2lkdGgsIGhlaWdodCk7XG4gIGNvbnN0IHtmcmFtZSwgZnBzLCBpbnRlbnNpdHksIGh1ZVQsIGNvbG9yfSA9IHVzZVRpbWVsaW5lKCk7XG5cbiAgLy8gU2xvdyBjYW1lcmEgcHVzaCBpbnRvIHRoZSBsYW1wIGFjcm9zcyB0aGUgd2hvbGUgc3BvdC5cbiAgY29uc3QgcHVzaCA9IGludGVycG9sYXRlKGZyYW1lLCBbMCwgMzAwXSwgWzEsIDEuMDQ1XSwgey4uLkNMQU1QLCBlYXNpbmc6IEVhc2luZy5pbk91dChFYXNpbmcuc2luKX0pO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17e2JhY2tncm91bmRDb2xvcjogJyMwNTA0MDYnLCBvdmVyZmxvdzogJ2hpZGRlbid9fT5cbiAgICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3t0cmFuc2Zvcm06IGBzY2FsZSgke3B1c2h9KWAsIHRyYW5zZm9ybU9yaWdpbjogYCR7TC5sYW1wWH1weCAke0wubGFtcFl9cHhgfX0+XG4gICAgICAgIDxSb29tIEw9e0x9IGNvbG9yPXtjb2xvcn0gaW50ZW5zaXR5PXtpbnRlbnNpdHl9IC8+XG4gICAgICAgIDxMaXN0ZW5SaW5ncyBMPXtMfSBjb2xvcj17Y29sb3J9IGZyYW1lPXtmcmFtZX0gLz5cbiAgICAgICAgPENvbG91ckRpYWwgTD17TH0gZnJhbWU9e2ZyYW1lfSBodWVUPXtodWVUfSBjb2xvcj17Y29sb3J9IC8+XG4gICAgICAgIDxMYW1wIEw9e0x9IGNvbG9yPXtjb2xvcn0gaW50ZW5zaXR5PXtpbnRlbnNpdHl9IGZyYW1lPXtmcmFtZX0gZnBzPXtmcHN9IC8+XG4gICAgICA8L0Fic29sdXRlRmlsbD5cbiAgICAgIDxGaW5pc2ggLz5cbiAgICAgIDxDb3B5IEw9e0x9IGZyYW1lPXtmcmFtZX0gZnBzPXtmcHN9IGNvbG9yPXtjb2xvcn0gLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsVUFBVTtBQUFBO0FBQUE7OztBQ0F2RDtBQUFBO0FBQUEsV0FBTyxVQUFVLFdBQVcsaUJBQWlCLG1CQUFtQjtBQUFBO0FBQUE7OztBQ0NoRSxzQkFPTztBQXNISDtBQXBIRyxJQUFNLGNBQWM7QUFBQSxFQUN6QixLQUFLO0FBQUEsRUFDTCxrQkFBa0I7QUFBQSxFQUNsQixPQUFPO0FBQUEsSUFDTCxFQUFDLEdBQUcsR0FBRyxPQUFPLGdCQUFnQixNQUFNLEdBQUcsa0JBQWtCLEdBQUU7QUFBQSxJQUMzRCxFQUFDLEdBQUcsR0FBRyxPQUFPLFVBQVUsTUFBTSxJQUFJLGtCQUFrQixHQUFFO0FBQUEsSUFDdEQsRUFBQyxHQUFHLEdBQUcsT0FBTyxrQkFBa0IsTUFBTSxLQUFLLGtCQUFrQixJQUFHO0FBQUEsRUFDbEU7QUFDRjtBQU9BLElBQU0sUUFBYSxDQUFDLEtBQUssS0FBSyxFQUFFO0FBQ2hDLElBQU0sT0FBWSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQ2hDLElBQU0sUUFBYSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQ2pDLElBQU0sTUFBVyxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBRTFCLElBQU0sTUFBTSxDQUFDLEdBQVEsR0FBUSxNQUMzQixDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzRCxJQUFNLE9BQU8sQ0FBQyxHQUFRLElB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
