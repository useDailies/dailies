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

// workspaces/halo-smart-lamp-launch-spot-d971/versions/v2/Video.tsx
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
      buttonSize: 46
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9oYWxvLXNtYXJ0LWxhbXAtbGF1bmNoLXNwb3QtZDk3MS92ZXJzaW9ucy92Mi9WaWRlby50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVtb3Rpb25cIl07IiwgIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5fX0RBSUxJRVNfREVQU19fW1wicmVhY3QvanN4LXJ1bnRpbWVcIl07IiwgImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBBYnNvbHV0ZUZpbGwsXG4gIEVhc2luZyxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG5leHBvcnQgY29uc3QgY29tcG9zaXRpb24gPSB7XG4gIGZwczogMzAsXG4gIGR1cmF0aW9uSW5GcmFtZXM6IDMwMCxcbiAgc2hvdHM6IFtcbiAgICB7bjogMSwgdGl0bGU6ICdQcm9kdWN0IGhlcm8nLCBmcm9tOiAwLCBkdXJhdGlvbkluRnJhbWVzOiA5MH0sXG4gICAge246IDIsIHRpdGxlOiAnQ29sb3VyJywgZnJvbTogOTAsIGR1cmF0aW9uSW5GcmFtZXM6IDkwfSxcbiAgICB7bjogMywgdGl0bGU6ICdDYWxsIHRvIGFjdGlvbicsIGZyb206IDE4MCwgZHVyYXRpb25JbkZyYW1lczogMTIwfSxcbiAgXSxcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogUGFsZXR0ZSArIGhlbHBlcnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbnR5cGUgUkdCID0gW251bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuY29uc3QgQU1CRVI6IFJHQiA9IFsyNTUsIDE2NiwgNzJdO1xuY29uc3QgQkxVRTogUkdCID0gWzEyOCwgMTc4LCAyNTVdO1xuY29uc3QgV0hJVEU6IFJHQiA9IFsyNTUsIDI1NSwgMjU1XTtcbmNvbnN0IElOSzogUkdCID0gWzgsIDgsIDExXTtcblxuY29uc3QgbWl4ID0gKGE6IFJHQiwgYjogUkdCLCB0OiBudW1iZXIpOiBSR0IgPT5cbiAgWzAsIDEsIDJdLm1hcCgoaSkgPT4gTWF0aC5yb3VuZChhW2ldICsgKGJbaV0gLSBhW2ldKSAqIHQpKSBhcyBSR0I7XG5jb25zdCByZ2JhID0gKGM6IFJHQiwgYSA9IDEpID0+IGByZ2JhKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19LCR7YX0pYDtcblxuY29uc3QgQ0xBTVAgPSB7ZXh0cmFwb2xhdGVMZWZ0OiAnY2xhbXAnLCBleHRyYXBvbGF0ZVJpZ2h0OiAnY2xhbXAnfSBhcyBjb25zdDtcbmNvbnN0IEZPTlQgPVxuICAnXCJTRiBQcm8gRGlzcGxheVwiLCB1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIHNhbnMtc2VyaWYnO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIExheW91dCBwZXIgYXNwZWN0IHJhdGlvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG50eXBlIExheW91dCA9IFJldHVyblR5cGU8dHlwZW9mIGdldExheW91dD47XG5cbmZ1bmN0aW9uIGdldExheW91dCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICBjb25zdCBwb3J0cmFpdCA9IGhlaWdodCA+IHdpZHRoO1xuICBpZiAocG9ydHJhaXQpIHtcbiAgICAvLyA5OjE2IFx1MjAxNCB0ZXh0IGxpdmVzIGluIHRoZSBzYWZlIGJhbmQgKDE0JS4uNjUlIG9mIGhlaWdodCk7IHRoZSBsYW1wXG4gICAgLy8gc2l0cyBsb3cgYW5kIHRocm93cyBpdHMgbGlnaHQgdXAgaW50byB0aGUgY29weS5cbiAgICBjb25zdCBEID0gTWF0aC5yb3VuZCh3aWR0aCAqIDAuNDQpO1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0cmFpdCxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgRCxcbiAgICAgIGxhbXBYOiB3aWR0aCAvIDIsXG4gICAgICBsYW1wWTogaGVpZ2h0ICogMC42NjUsXG4gICAgICB0ZXh0WDogd2lkdGggLyAyLFxuICAgICAgY2FwdGlvblk6IGhlaWdodCAqIDAuNCxcbiAgICAgIHByaWNlWTogaGVpZ2h0ICogMC40LFxuICAgICAgd29yZG1hcmtZOiBoZWlnaHQgKiAwLjM1NSxcbiAgICAgIGJ1dHRvblk6IGhlaWdodCAqIDAuNDc1LFxuICAgICAgY2FwdGlvblNpemU6IDkyLFxuICAgICAgcHJpY2VTaXplOiA4NCxcbiAgICAgIHdvcmRtYXJrU2l6ZTogMTUwLFxuICAgICAgYnV0dG9uU2l6ZTogNDYsXG4gICAgfTtcbiAgfVxuICAvLyAxNjo5IFx1MjAxNCBsYW1wIG9uIHRoZSBsZWZ0IHRoaXJkLCBjb3B5IG9uIHRoZSByaWdodC5cbiAgY29uc3QgRCA9IE1hdGgucm91bmQoaGVpZ2h0ICogMC4zNSk7XG4gIHJldHVybiB7XG4gICAgcG9ydHJhaXQsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIEQsXG4gICAgbGFtcFg6IHdpZHRoICogMC4zMSxcbiAgICBsYW1wWTogaGVpZ2h0ICogMC40NixcbiAgICB0ZXh0WDogd2lkdGggKiAwLjU1NSxcbiAgICBjYXB0aW9uWTogaGVpZ2h0ICogMC40NixcbiAgICBwcmljZVk6IGhlaWdodCAqIDAuNDYsXG4gICAgd29yZG1hcmtZOiBoZWlnaHQgKiAwLjQsXG4gICAgYnV0dG9uWTogaGVpZ2h0ICogMC41ODUsXG4gICAgY2FwdGlvblNpemU6IDEwNCxcbiAgICBwcmljZVNpemU6IDk2LFxuICAgIHdvcmRtYXJrU2l6ZTogMTc2LFxuICAgIGJ1dHRvblNpemU6IDQwLFxuICB9O1xufVxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFRpbWVsaW5lIHZhbHVlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5mdW5jdGlvbiB1c2VUaW1lbGluZSgpIHtcbiAgY29uc3QgZnJhbWUgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3Qge2Zwc30gPSB1c2VWaWRlb0NvbmZpZygpO1xuXG4gIC8vIExhbXAgc3dpdGNoZXMgb246IGFscmVhZHkgZ2xvd2luZyBvbiBmcmFtZSAwLCBmdWxseSBsaXQgYnkgfjAuNnMuXG4gIGNvbnN0IHN3aXRjaE9uID0gc3ByaW5nKHtmcmFtZSwgZnBzLCBjb25maWc6IHtkYW1waW5nOiAxNCwgc3RpZmZuZXNzOiA5MH0sIGR1cmF0aW9uSW5GcmFtZXM6IDIyfSk7XG4gIGNvbnN0IGJyZWF0aCA9IDEgKyAwLjAzNSAqIE1hdGguc2luKChmcmFtZSAvIGZwcykgKiBNYXRoLlBJICogMC45KTtcbiAgY29uc3QgaW50ZW5zaXR5ID0gKDAuNSArIDAuNSAqIE1hdGgubWluKHN3aXRjaE9uLCAxLjA4KSkgKiBicmVhdGg7XG5cbiAgLy8gQW1iZXIgXHUyMTkyIHNvZnQgYmx1ZSBkdXJpbmcgc2hvdCAyLlxuICBjb25zdCBodWVUID0gaW50ZXJwb2xhdGUoZnJhbWUsIFs5NiwgMTU4XSwgWzAsIDFdLCB7XG4gICAgLi4uQ0xBTVAsXG4gICAgZWFzaW5nOiBFYXNpbmcuYmV6aWVyKDAuNjUsIDAsIDAuMzUsIDEpLFxuICB9KTtcbiAgY29uc3QgY29sb3IgPSBtaXgoQU1CRVIsIEJMVUUsIGh1ZVQpO1xuXG4gIHJldHVybiB7ZnJhbWUsIGZwcywgaW50ZW5zaXR5LCBodWVULCBjb2xvcn07XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogUm9vbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFJvb206IFJlYWN0LkZDPHtMOiBMYXlvdXQ7IGNvbG9yOiBSR0I7IGludGVuc2l0eTogbnVtYmVyfT4gPSAoe0wsIGNvbG9yLCBpbnRlbnNpdHl9KSA9PiB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBELCBsYW1wWCwgbGFtcFksIHBvcnRyYWl0fSA9IEw7XG4gIGNvbnN0IGJhc2VCb3R0b20gPSBsYW1wWSArIEQgLyAyICsgRCAqIDAuMDc7XG4gIGNvbnN0IGNvbnNvbGVIID0gRCAqIChwb3J0cmFpdCA/IDAuMyA6IDAuMjYpO1xuICBjb25zdCBmbG9vclkgPSBiYXNlQm90dG9tICsgY29uc29sZUg7XG4gIGNvbnN0IGNvbnNvbGVMZWZ0ID0gcG9ydHJhaXQgPyBsYW1wWCAtIHdpZHRoICogMC40MiA6IC00MDtcbiAgY29uc3QgY29uc29sZVJpZ2h0ID0gcG9ydHJhaXQgPyBsYW1wWCArIHdpZHRoICogMC40MiA6IGxhbXBYICsgRCAqIDEuMDU7XG4gIGNvbnN0IEkgPSBpbnRlbnNpdHk7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsIGRhdGEtbGF5ZXI9XCJiYWNrZ3JvdW5kXCI+XG4gICAgICB7Lyogd2FsbCAqL31cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBhMDkwYyAwJSwgIzEwMGUxMSAkeyhmbG9vclkgLyBoZWlnaHQpICogMTAwfSUsICMwNjA1MDcgJHtcbiAgICAgICAgICAgIChmbG9vclkgLyBoZWlnaHQpICogMTAwXG4gICAgICAgICAgfSUsICMwMzAzMDQgMTAwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiB3YWxsIHBhbmVscyAqL31cbiAgICAgIHtbMC4xMiwgMC41LCAwLjg4XS5tYXAoKHgsIGkpID0+IChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiB3aWR0aCAqIHgsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogZmxvb3JZLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMCkgMCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4wMzUpIDYwJSwgcmdiYSgyNTUsMjU1LDI1NSwwKSAxMDAlKWAsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgICAgey8qIGxpZ2h0IHdhc2hpbmcgdGhlIHdhbGwgKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogbGFtcFggLSBEICogNCxcbiAgICAgICAgICB0b3A6IGxhbXBZIC0gRCAqIDMuMixcbiAgICAgICAgICB3aWR0aDogRCAqIDgsXG4gICAgICAgICAgaGVpZ2h0OiBEICogNi40LFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsICR7cmdiYShjb2xvciwgMC4yICogSSl9IDAlLCAke3JnYmEoXG4gICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgIDAuMDggKiBJXG4gICAgICAgICAgKX0gNDUlLCByZ2JhKDAsMCwwLDApIDEwMCUpYCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICB7LyogbG93IGNvbnNvbGUgdGhlIGxhbXAgc3RhbmRzIG9uICovfVxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IGNvbnNvbGVMZWZ0LFxuICAgICAgICAgIHRvcDogYmFzZUJvdHRvbSxcbiAgICAgICAgICB3aWR0aDogY29uc29sZVJpZ2h0IC0gY29uc29sZUxlZnQsXG4gICAgICAgICAgaGVpZ2h0OiBjb25zb2xlSCxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgxODBkZWcsICR7cmdiYShtaXgoY29sb3IsIFs0MCwgMzYsIDM0XSwgMC41NSksIDAuOSl9IDBweCwgIzFhMTgxYiAzcHgsICMxMjEwMTMgNDAlLCAjMGEwOTBiIDEwMCUpYCxcbiAgICAgICAgICBib3hTaGFkb3c6ICcwIDMwcHggNjBweCByZ2JhKDAsMCwwLDAuNiknLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiBwb29sIG9mIGxpZ2h0IG9uIHRoZSBjb25zb2xlIHRvcCAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiAxLjEsXG4gICAgICAgICAgdG9wOiBiYXNlQm90dG9tIC0gRCAqIDAuMDgsXG4gICAgICAgICAgd2lkdGg6IEQgKiAyLjIsXG4gICAgICAgICAgaGVpZ2h0OiBEICogMC4yMixcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoY2xvc2VzdC1zaWRlLCAke3JnYmEoY29sb3IsIDAuMzUgKiBJKX0sIHJnYmEoMCwwLDAsMCkpYCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICB7LyogZmxvb3IgcmVmbGVjdGlvbiAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIEQgKiAxLjgsXG4gICAgICAgICAgdG9wOiBmbG9vclksXG4gICAgICAgICAgd2lkdGg6IEQgKiAzLjYsXG4gICAgICAgICAgaGVpZ2h0OiBEICogMC41LFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjbG9zZXN0LXNpZGUsICR7cmdiYShjb2xvciwgMC4xMiAqIEkpfSwgcmdiYSgwLDAsMCwwKSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogVGhlIGxhbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IExhbXA6IFJlYWN0LkZDPHtMOiBMYXlvdXQ7IGNvbG9yOiBSR0I7IGludGVuc2l0eTogbnVtYmVyOyBmcmFtZTogbnVtYmVyOyBmcHM6IG51bWJlcn0+ID0gKHtcbiAgTCxcbiAgY29sb3IsXG4gIGludGVuc2l0eSxcbiAgZnJhbWUsXG4gIGZwcyxcbn0pID0+IHtcbiAgY29uc3Qge0QsIGxhbXBYLCBsYW1wWX0gPSBMO1xuICBjb25zdCByID0gRCAvIDI7XG4gIGNvbnN0IEkgPSBNYXRoLm1pbihpbnRlbnNpdHksIDEuMSk7XG4gIGNvbnN0IHJpc2UgPSBzcHJpbmcoe2ZyYW1lLCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDIwMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDI0fSk7XG4gIGNvbnN0IHkgPSBpbnRlcnBvbGF0ZShyaXNlLCBbMCwgMV0sIFtEICogMC4wNiwgMF0pO1xuXG4gIGNvbnN0IGNvcmUgPSBtaXgoV0hJVEUsIGNvbG9yLCAwLjEyKTtcbiAgY29uc3QgbWlkID0gbWl4KFdISVRFLCBjb2xvciwgMC41NSk7XG4gIGNvbnN0IHJpbSA9IG1peChjb2xvciwgSU5LLCAwLjE4KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7LyogYmxvb20gYmVoaW5kIHRoZSBsYW1wICovfVxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLWxheWVyPVwiZ2xvd1wiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogbGFtcFggLSBEICogMi40LFxuICAgICAgICAgIHRvcDogbGFtcFkgLSBEICogMi40ICsgeSxcbiAgICAgICAgICB3aWR0aDogRCAqIDQuOCxcbiAgICAgICAgICBoZWlnaHQ6IEQgKiA0LjgsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgJHtyZ2JhKGNvbG9yLCAwLjQyICogSSl9IDAlLCAke3JnYmEoXG4gICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgIDAuMTYgKiBJXG4gICAgICAgICAgKX0gMzglLCByZ2JhKDAsMCwwLDApIDEwMCUpYCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtbGF5ZXI9XCJwcm9kdWN0XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBsYW1wWCAtIHIsXG4gICAgICAgICAgdG9wOiBsYW1wWSAtIHIgKyB5LFxuICAgICAgICAgIHdpZHRoOiBELFxuICAgICAgICAgIGhlaWdodDogRCAqIDEuMDcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHsvKiBiYXNlIHB1Y2sgKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBEICogMC4yNyxcbiAgICAgICAgICAgIHRvcDogRCAqIDAuOTQsXG4gICAgICAgICAgICB3aWR0aDogRCAqIDAuNDYsXG4gICAgICAgICAgICBoZWlnaHQ6IEQgKiAwLjEzLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBgJHtEICogMC4wM31weCAke0QgKiAwLjAzfXB4ICR7RCAqIDAuMDV9cHggJHtEICogMC4wNX1weGAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzRhNDc0OSAwJSwgIzIyMjAyMyA0MCUsICMxMjExMTMgMTAwJSknLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgaW5zZXQgMCAycHggMCAke3JnYmEoY29sb3IsIDAuNTUgKiBJKX0sIDAgMThweCAzMHB4IHJnYmEoMCwwLDAsMC41NSlgLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIHsvKiB1bmxpdCBzcGhlcmU6IG1hdHRlIHdoaXRlIGdsYXNzICovfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgaW5zZXQ6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IEQsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDpcbiAgICAgICAgICAgICAgJ3JhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgMzglIDMwJSwgI2Y2ZjRmMSAwJSwgI2Q4ZDVkMSA0MCUsICM4YTg3ODQgNzglLCAjM2YzZDNiIDEwMCUpJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICB7LyogbGl0IHNwaGVyZSAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGluc2V0OiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBELFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IE1hdGgubWluKDEsIEkpLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgNTAlIDQwJSwgI2ZmZmZmZiAwJSwgJHtyZ2JhKGNvcmUpfSAyMCUsICR7cmdiYShcbiAgICAgICAgICAgICAgbWlkXG4gICAgICAgICAgICApfSA1OCUsICR7cmdiYShjb2xvcil9IDg0JSwgJHtyZ2JhKHJpbSl9IDEwMCUpYCxcbiAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCAke0QgKiAwLjE4fXB4ICR7cmdiYShjb2xvciwgMC42ICogSSl9LCAwIDAgJHtEICogMC42fXB4ICR7cmdiYShcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIDAuMzUgKiBJXG4gICAgICAgICAgICApfSwgaW5zZXQgMCAtJHtEICogMC4wNn1weCAke0QgKiAwLjEyfXB4ICR7cmdiYShyaW0sIDAuNil9YCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICB7Lyogc3BlY3VsYXIgc2hlZW4gKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBEICogMC4yLFxuICAgICAgICAgICAgdG9wOiBEICogMC4xLFxuICAgICAgICAgICAgd2lkdGg6IEQgKiAwLjM0LFxuICAgICAgICAgICAgaGVpZ2h0OiBEICogMC4yLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgtMjhkZWcpJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyYWRpYWwtZ3JhZGllbnQoY2xvc2VzdC1zaWRlLCByZ2JhKDI1NSwyNTUsMjU1LDAuNzUpLCByZ2JhKDI1NSwyNTUsMjU1LDApKScsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBTaG90LXNwZWNpZmljIGdyYXBoaWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLy8gU2hvdCAxOiBzb2Z0IHJpbmdzIFwibGlzdGVuaW5nXCIgb3V0d2FyZCBmcm9tIHRoZSBsYW1wLlxuY29uc3QgTGlzdGVuUmluZ3M6IFJlYWN0LkZDPHtMOiBMYXlvdXQ7IGNvbG9yOiBSR0I7IGZyYW1lOiBudW1iZXJ9PiA9ICh7TCwgY29sb3IsIGZyYW1lfSkgPT4ge1xuICBjb25zdCB7RCwgbGFtcFgsIGxhbXBZfSA9IEw7XG4gIGNvbnN0IHNob3RGYWRlID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsxNCwgMjYsIDc2LCA4OF0sIFswLCAxLCAxLCAwXSwgQ0xBTVApO1xuICBpZiAoc2hvdEZhZGUgPD0gMCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHBlcmlvZCA9IDQyO1xuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgZGF0YS1sYXllcj1cImxpc3Rlbi1yaW5nc1wiPlxuICAgICAge1swLCAxLCAyXS5tYXAoKGkpID0+IHtcbiAgICAgICAgY29uc3QgbG9jYWwgPSBmcmFtZSAtIDE0IC0gaSAqIDE0O1xuICAgICAgICBpZiAobG9jYWwgPCAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgdCA9IChsb2NhbCAlIHBlcmlvZCkgLyBwZXJpb2Q7XG4gICAgICAgIGNvbnN0IHMgPSAxLjA0ICsgRWFzaW5nLm91dChFYXNpbmcuY3ViaWMpKHQpICogMC43NTtcbiAgICAgICAgY29uc3QgbyA9ICgxIC0gdCkgKiAwLjU1ICogc2hvdEZhZGU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgIGxlZnQ6IGxhbXBYIC0gRCAvIDIsXG4gICAgICAgICAgICAgIHRvcDogbGFtcFkgLSBEIC8gMixcbiAgICAgICAgICAgICAgd2lkdGg6IEQsXG4gICAgICAgICAgICAgIGhlaWdodDogRCxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjUpLCBvKX1gLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGBzY2FsZSgke3N9KWAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8vIFNob3QgMjogYSBjb2xvdXIgZGlhbCB0aGF0IHN3ZWVwcyBhbWJlciBcdTIxOTIgYmx1ZSBhcm91bmQgdGhlIGxhbXAuXG5jb25zdCBDb2xvdXJEaWFsOiBSZWFjdC5GQzx7TDogTGF5b3V0OyBmcmFtZTogbnVtYmVyOyBodWVUOiBudW1iZXI7IGNvbG9yOiBSR0J9PiA9ICh7XG4gIEwsXG4gIGZyYW1lLFxuICBodWVULFxuICBjb2xvcixcbn0pID0+IHtcbiAgY29uc3Qge0QsIGxhbXBYLCBsYW1wWX0gPSBMO1xuICBjb25zdCBvID0gaW50ZXJwb2xhdGUoZnJhbWUsIFs5MCwgMTAyLCAxNjYsIDE3OF0sIFswLCAxLCAxLCAwXSwgQ0xBTVApO1xuICBpZiAobyA8PSAwKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgUiA9IEQgKiAwLjY2O1xuICBjb25zdCBzaXplID0gUiAqIDIgKyA0MDtcbiAgY29uc3QgY2lyYyA9IDIgKiBNYXRoLlBJICogUjtcbiAgY29uc3Qgc3dlZXAgPSBNYXRoLm1heCgwLjAwMSwgaHVlVCk7XG4gIGNvbnN0IGFuZ2xlID0gLTkwICsgc3dlZXAgKiAzNjA7XG4gIGNvbnN0IGt4ID0gc2l6ZSAvIDIgKyBSICogTWF0aC5jb3MoKGFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xuICBjb25zdCBreSA9IHNpemUgLyAyICsgUiAqIE1hdGguc2luKChhbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICBkYXRhLWxheWVyPVwiY29sb3VyLWRpYWxcIlxuICAgICAgd2lkdGg9e3NpemV9XG4gICAgICBoZWlnaHQ9e3NpemV9XG4gICAgICBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBsYW1wWCAtIHNpemUgLyAyLCB0b3A6IGxhbXBZIC0gc2l6ZSAvIDIsIG9wYWNpdHk6IG99fVxuICAgID5cbiAgICAgIDxkZWZzPlxuICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJkaWFsR3JhZFwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMVwiIHkyPVwiMVwiPlxuICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPXtyZ2JhKEFNQkVSKX0gLz5cbiAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPXtyZ2JhKEJMVUUpfSAvPlxuICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgPC9kZWZzPlxuICAgICAgPGNpcmNsZSBjeD17c2l6ZSAvIDJ9IGN5PXtzaXplIC8gMn0gcj17Un0gZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpXCIgc3Ryb2tlV2lkdGg9ezJ9IC8+XG4gICAgICA8Y2lyY2xlXG4gICAgICAgIGN4PXtzaXplIC8gMn1cbiAgICAgICAgY3k9e3NpemUgLyAyfVxuICAgICAgICByPXtSfVxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgIHN0cm9rZT1cInVybCgjZGlhbEdyYWQpXCJcbiAgICAgICAgc3Ryb2tlV2lkdGg9ezN9XG4gICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgIHN0cm9rZURhc2hhcnJheT17YCR7Y2lyYyAqIHN3ZWVwfSAke2NpcmN9YH1cbiAgICAgICAgdHJhbnNmb3JtPXtgcm90YXRlKC05MCAke3NpemUgLyAyfSAke3NpemUgLyAyfSlgfVxuICAgICAgLz5cbiAgICAgIDxjaXJjbGUgY3g9e2t4fSBjeT17a3l9IHI9ezl9IGZpbGw9e3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC4zKSl9IC8+XG4gICAgICA8Y2lyY2xlIGN4PXtreH0gY3k9e2t5fSByPXsyMH0gZmlsbD17cmdiYShjb2xvciwgMC4yNSl9IC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIENvcHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBhbmNob3IgPSAoTDogTGF5b3V0LCB5OiBudW1iZXIsIGR5OiBudW1iZXIsIHNjYWxlID0gMSk6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIGxlZnQ6IEwudGV4dFgsXG4gIHRvcDogeSxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICBmb250RmFtaWx5OiBGT05ULFxuICB0cmFuc2Zvcm1PcmlnaW46IEwucG9ydHJhaXQgPyAnNTAlIDUwJScgOiAnMCUgNTAlJyxcbiAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7TC5wb3J0cmFpdCA/ICctNTAlJyA6ICcwJ30sIGNhbGMoLTUwJSArICR7ZHl9cHgpKSBzY2FsZSgke3NjYWxlfSlgLFxufSk7XG5cbmNvbnN0IENvcHk6IFJlYWN0LkZDPHtMOiBMYXlvdXQ7IGZyYW1lOiBudW1iZXI7IGZwczogbnVtYmVyOyBjb2xvcjogUkdCfT4gPSAoe0wsIGZyYW1lLCBmcHMsIGNvbG9yfSkgPT4ge1xuICAvLyBTaG90IDEgY2FwdGlvbiBcdTIwMTQgZnVsbHkgaW4gYnkgfjA6MDAuNywgb3V0IGF0IHRoZSBjdXQuXG4gIGNvbnN0IGNhcEluID0gc3ByaW5nKHtmcmFtZTogZnJhbWUgLSA0LCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDIwMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDE4fSk7XG4gIGNvbnN0IGNhcE91dCA9IGludGVycG9sYXRlKGZyYW1lLCBbODQsIDkwXSwgWzAsIDFdLCBDTEFNUCk7XG4gIGNvbnN0IGNhcE9wYWNpdHkgPSBpbnRlcnBvbGF0ZShjYXBJbiwgWzAsIDAuNl0sIFswLCAxXSwgQ0xBTVApICogKDEgLSBjYXBPdXQpO1xuICBjb25zdCBjYXBCbHVyID0gaW50ZXJwb2xhdGUoY2FwSW4sIFswLCAxXSwgWzEwLCAwXSkgKyBjYXBPdXQgKiA4O1xuXG4gIC8vIFNob3QgMiBwcmljZSB0YWcgXHUyMDE0IGluIGJ5IDA6MDMuNywgaG9sZHMgdGhyb3VnaCAwOjA1LjYuXG4gIGNvbnN0IHByaWNlSW4gPSBzcHJpbmcoe2ZyYW1lOiBmcmFtZSAtIDk4LCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDE1LCBzdGlmZm5lc3M6IDEyMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDIyfSk7XG4gIGNvbnN0IHByaWNlT3V0ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsxNjYsIDE3M10sIFswLCAxXSwgQ0xBTVApO1xuICBjb25zdCBwcmljZU9wYWNpdHkgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzk4LCAxMDhdLCBbMCwgMV0sIENMQU1QKSAqICgxIC0gcHJpY2VPdXQpO1xuXG4gIC8vIFNob3QgMyB3b3JkbWFyayBcdTIwMTQgZnVsbHkgcHJlc2VudCBmcm9tIHRoZSBjdXQgYXQgMDowNi5cbiAgY29uc3Qgd21JbiA9IHNwcmluZyh7ZnJhbWU6IGZyYW1lIC0gMTcyLCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDIwMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDMwfSk7XG4gIGNvbnN0IHdtT3BhY2l0eSA9IGludGVycG9sYXRlKGZyYW1lLCBbMTczLCAxNzldLCBbMCwgMV0sIENMQU1QKTtcbiAgY29uc3Qgd21UcmFja2luZyA9IGludGVycG9sYXRlKHdtSW4sIFswLCAxXSwgWzAuNSwgMC4zNF0pO1xuXG4gIC8vIFNob3QgMyBidXR0b24gXHUyMDE0IGZ1bGx5IGluIGJ5IH4wOjA3LlxuICBjb25zdCBidG5JbiA9IHNwcmluZyh7ZnJhbWU6IGZyYW1lIC0gMTk2LCBmcHMsIGNvbmZpZzoge2RhbXBpbmc6IDE2LCBzdGlmZm5lc3M6IDExMH0sIGR1cmF0aW9uSW5GcmFtZXM6IDI0fSk7XG4gIGNvbnN0IGJ0bk9wYWNpdHkgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzE5NiwgMjA2XSwgWzAsIDFdLCBDTEFNUCk7XG4gIGNvbnN0IHNoaW5lID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsyMjgsIDI2Ml0sIFstNjAsIDE2MF0sIENMQU1QKTtcblxuICBjb25zdCB0ZXh0Q29sb3IgPSAnI0Y2RjJFQyc7XG5cbiAgcmV0dXJuIChcbiAgICA8QWJzb2x1dGVGaWxsPlxuICAgICAge2NhcE9wYWNpdHkgPiAwICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJjYXB0aW9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uYW5jaG9yKEwsIEwuY2FwdGlvblksIGludGVycG9sYXRlKGNhcEluLCBbMCwgMV0sIFsyOCwgMF0pIC0gY2FwT3V0ICogMTIpLFxuICAgICAgICAgICAgZm9udFNpemU6IEwuY2FwdGlvblNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDNlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjEsXG4gICAgICAgICAgICBjb2xvcjogdGV4dENvbG9yLFxuICAgICAgICAgICAgb3BhY2l0eTogY2FwT3BhY2l0eSxcbiAgICAgICAgICAgIGZpbHRlcjogYGJsdXIoJHtjYXBCbHVyfXB4KWAsXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiBgMCAwIDQwcHggJHtyZ2JhKEFNQkVSLCAwLjI1KX1gLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBMaWdodCB0aGF0IGxpc3RlbnNcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7cHJpY2VPcGFjaXR5ID4gMCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwicHJpY2VcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5hbmNob3IoTCwgTC5wcmljZVksIGludGVycG9sYXRlKHByaWNlSW4sIFswLCAxXSwgWzI0LCAwXSkgLSBwcmljZU91dCAqIDEwLCBpbnRlcnBvbGF0ZShwcmljZUluLCBbMCwgMV0sIFswLjkyLCAxXSkpLFxuICAgICAgICAgICAgZm9udFNpemU6IEwucHJpY2VTaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAyZW0nLFxuICAgICAgICAgICAgZm9udFZhcmlhbnROdW1lcmljOiAndGFidWxhci1udW1zJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogcmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjEyKSksXG4gICAgICAgICAgICBwYWRkaW5nOiAnMC4yNmVtIDAuNTVlbSAwLjI2ZW0gMS4wNWVtJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAuMjJlbSAwLjVlbSAwLjVlbSAwLjIyZW0nLFxuICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7cmdiYShtaXgoV0hJVEUsIGNvbG9yLCAwLjQpLCAwLjQ1KX1gLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgMC41ZW0gNTAlLCByZ2JhKDYsNiw5LDAuOTUpIDAuMDllbSwgJHtyZ2JhKFxuICAgICAgICAgICAgICBtaXgoV0hJVEUsIGNvbG9yLCAwLjYpLFxuICAgICAgICAgICAgICAwLjdcbiAgICAgICAgICAgICl9IDAuMWVtLCAke3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC42KSwgMC4wKX0gMC4xNmVtKSwgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgJHtyZ2JhKFxuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgMC4yMlxuICAgICAgICAgICAgKX0gMCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4wNSkgMTAwJSlgLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAyMHB4IDYwcHggcmdiYSgwLDAsMCwwLjQ1KSwgMCAwIDUwcHggJHtyZ2JhKGNvbG9yLCAwLjE4KX1gLFxuICAgICAgICAgICAgb3BhY2l0eTogcHJpY2VPcGFjaXR5LFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICAkODlcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7d21PcGFjaXR5ID4gMCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwid29yZG1hcmtcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5hbmNob3IoTCwgTC53b3JkbWFya1ksIGludGVycG9sYXRlKHdtSW4sIFswLCAxXSwgWzE4LCAwXSkpLFxuICAgICAgICAgICAgZm9udFNpemU6IEwud29yZG1hcmtTaXplLFxuICAgICAgICAgICAgZm9udFdlaWdodDogMzAwLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogYCR7d21UcmFja2luZ31lbWAsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogTC5wb3J0cmFpdCA/IGAke3dtVHJhY2tpbmd9ZW1gIDogMCxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgICBjb2xvcjogdGV4dENvbG9yLFxuICAgICAgICAgICAgb3BhY2l0eTogd21PcGFjaXR5LFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogYDAgMCA2MHB4ICR7cmdiYShjb2xvciwgMC4zNSl9YCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgSEFMT1xuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHtidG5PcGFjaXR5ID4gMCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiYnV0dG9uXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uYW5jaG9yKEwsIEwuYnV0dG9uWSwgaW50ZXJwb2xhdGUoYnRuSW4sIFswLCAxXSwgWzI2LCAwXSksIGludGVycG9sYXRlKGJ0bkluLCBbMCwgMV0sIFswLjk0LCAxXSkpLFxuICAgICAgICAgICAgZm9udFNpemU6IEwuYnV0dG9uU2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wMDVlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgY29sb3I6ICcjMGIwYzEwJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjc4ZW0gMS43ZW0nLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA5OTksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDEwNWRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAke3NoaW5lIC0gMjB9JSwgcmdiYSgyNTUsMjU1LDI1NSwwLjk1KSAke3NoaW5lfSUsIHJnYmEoMjU1LDI1NSwyNTUsMCkgJHtcbiAgICAgICAgICAgICAgc2hpbmUgKyAyMFxuICAgICAgICAgICAgfSUpLCBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAke3JnYmEobWl4KFdISVRFLCBjb2xvciwgMC4yMikpfSAxMDAlKWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwIDE4cHggNTBweCAke3JnYmEoY29sb3IsIDAuMzUpfSwgaW5zZXQgMCAtMnB4IDAgcmdiYSgwLDAsMCwwLjA4KWAsXG4gICAgICAgICAgICBvcGFjaXR5OiBidG5PcGFjaXR5LFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICBQcmUtb3JkZXIgbm93XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogRmluaXNoaW5nOiB2aWduZXR0ZSArIGdyYWluICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IEZpbmlzaDogUmVhY3QuRkMgPSAoKSA9PiAoXG4gIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3twb2ludGVyRXZlbnRzOiAnbm9uZSd9fT5cbiAgICA8QWJzb2x1dGVGaWxsXG4gICAgICBzdHlsZT17e2JhY2tncm91bmQ6ICdyYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCA1MCUgNDglLCByZ2JhKDAsMCwwLDApIDQ1JSwgcmdiYSgwLDAsMCwwLjU1KSAxMDAlKSd9fVxuICAgIC8+XG4gICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsIG9wYWNpdHk6IDAuMDcsIG1peEJsZW5kTW9kZTogJ292ZXJsYXknfX0+XG4gICAgICA8ZmlsdGVyIGlkPVwiZ3JhaW5cIj5cbiAgICAgICAgPGZlVHVyYnVsZW5jZSB0eXBlPVwiZnJhY3RhbE5vaXNlXCIgYmFzZUZyZXF1ZW5jeT1cIjAuODVcIiBudW1PY3RhdmVzPXsyfSBzZWVkPXs3fSBzdGl0Y2hUaWxlcz1cInN0aXRjaFwiIC8+XG4gICAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9XCJzYXR1cmF0ZVwiIHZhbHVlcz1cIjBcIiAvPlxuICAgICAgPC9maWx0ZXI+XG4gICAgICA8cmVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgZmlsdGVyPVwidXJsKCNncmFpbilcIiAvPlxuICAgIDwvc3ZnPlxuICA8L0Fic29sdXRlRmlsbD5cbik7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogQ29tcG9zaXRpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFZpZGVvKCkge1xuICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSB1c2VWaWRlb0NvbmZpZygpO1xuICBjb25zdCBMID0gZ2V0TGF5b3V0KHdpZHRoLCBoZWlnaHQpO1xuICBjb25zdCB7ZnJhbWUsIGZwcywgaW50ZW5zaXR5LCBodWVULCBjb2xvcn0gPSB1c2VUaW1lbGluZSgpO1xuXG4gIC8vIFNsb3cgY2FtZXJhIHB1c2ggaW50byB0aGUgbGFtcCBhY3Jvc3MgdGhlIHdob2xlIHNwb3QuXG4gIGNvbnN0IHB1c2ggPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzAsIDMwMF0sIFsxLCAxLjA0NV0sIHsuLi5DTEFNUCwgZWFzaW5nOiBFYXNpbmcuaW5PdXQoRWFzaW5nLnNpbil9KTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGwgc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6ICcjMDUwNDA2Jywgb3ZlcmZsb3c6ICdoaWRkZW4nfX0+XG4gICAgICA8QWJzb2x1dGVGaWxsIHN0eWxlPXt7dHJhbnNmb3JtOiBgc2NhbGUoJHtwdXNofSlgLCB0cmFuc2Zvcm1PcmlnaW46IGAke0wubGFtcFh9cHggJHtMLmxhbXBZfXB4YH19PlxuICAgICAgICA8Um9vbSBMPXtMfSBjb2xvcj17Y29sb3J9IGludGVuc2l0eT17aW50ZW5zaXR5fSAvPlxuICAgICAgICA8TGlzdGVuUmluZ3MgTD17TH0gY29sb3I9e2NvbG9yfSBmcmFtZT17ZnJhbWV9IC8+XG4gICAgICAgIDxDb2xvdXJEaWFsIEw9e0x9IGZyYW1lPXtmcmFtZX0gaHVlVD17aHVlVH0gY29sb3I9e2NvbG9yfSAvPlxuICAgICAgICA8TGFtcCBMPXtMfSBjb2xvcj17Y29sb3J9IGludGVuc2l0eT17aW50ZW5zaXR5fSBmcmFtZT17ZnJhbWV9IGZwcz17ZnBzfSAvPlxuICAgICAgPC9BYnNvbHV0ZUZpbGw+XG4gICAgICA8RmluaXNoIC8+XG4gICAgICA8Q29weSBMPXtMfSBmcmFtZT17ZnJhbWV9IGZwcz17ZnBzfSBjb2xvcj17Y29sb3J9IC8+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsV0FBTyxVQUFVLFdBQVcsaUJBQWlCLFVBQVU7QUFBQTtBQUFBOzs7QUNBdkQ7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixtQkFBbUI7QUFBQTtBQUFBOzs7QUNDaEUsc0JBT087QUFzSEg7QUFwSEcsSUFBTSxjQUFjO0FBQUEsRUFDekIsS0FBSztBQUFBLEVBQ0wsa0JBQWtCO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsRUFBQyxHQUFHLEdBQUcsT0FBTyxnQkFBZ0IsTUFBTSxHQUFHLGtCQUFrQixHQUFFO0FBQUEsSUFDM0QsRUFBQyxHQUFHLEdBQUcsT0FBTyxVQUFVLE1BQU0sSUFBSSxrQkFBa0IsR0FBRTtBQUFBLElBQ3RELEVBQUMsR0FBRyxHQUFHLE9BQU8sa0JBQWtCLE1BQU0sS0FBSyxrQkFBa0IsSUFBRztBQUFBLEVBQ2xFO0FBQ0Y7QUFPQSxJQUFNLFFBQWEsQ0FBQyxLQUFLLEtBQUssRUFBRTtBQUNoQyxJQUFNLE9BQVksQ0FBQyxLQUFLLEtBQUssR0FBRztBQUNoQyxJQUFNLFFBQWEsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUNqQyxJQUFNLE1BQVcsQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUUxQixJQUFNLE1BQU0sQ0FBQyxHQUFRLEdBQVEsTUFDM0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0QsSUFBTSxPQUFPLENBQUMsR0FBUSxJ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
