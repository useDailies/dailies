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

// workspaces/ledgerline-instant-exports-0525/versions/v1/Video.tsx
var import_remotion = __toESM(require_remotion(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var FPS = 30;
var composition = {
  fps: FPS,
  durationInFrames: 300,
  shots: [
    { n: 1, title: "Hook", from: 0, durationInFrames: 90 },
    { n: 2, title: "Proof", from: 90, durationInFrames: 120 },
    { n: 3, title: "Call to action", from: 210, durationInFrames: 90 }
  ]
};
var FONT = 'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
var MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
var NAVY_DEEP = "#060D22";
var NAVY = "#0B1736";
var NAVY_LIFT = "#13245A";
var LIME = "#C8F53C";
var LIME_DEEP = "#9BCB12";
var INK = "#0B1533";
var PAPER = "#FFFFFF";
var MUTED = "#6B7593";
var RULE = "#E7EAF2";
var TEXT_ON_NAVY = "#F3F6FC";
var clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
var formatThousands = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
var useLayout = () => {
  const { width, height } = (0, import_remotion.useVideoConfig)();
  const portrait = height > width;
  const safe = portrait ? {
    top: height * 0.14,
    left: width * 0.06,
    width: width * 0.88,
    height: height * (1 - 0.14 - 0.35)
  } : {
    top: height * 0.1,
    left: width * 0.08,
    width: width * 0.84,
    height: height * 0.8
  };
  return { portrait, width, height, safe };
};
var SafeBox = ({ layout, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "div",
  {
    style: {
      position: "absolute",
      top: layout.safe.top,
      left: layout.safe.left,
      width: layout.safe.width,
      height: layout.safe.height,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    children
  }
);
var Background = ({ layout }) => {
  const frame = (0, import_remotion.useCurrentFrame)();
  const drift = (0, import_remotion.interpolate)(frame, [0, 300], [0, 1], clamp);
  const glowX = 50 + Math.sin(drift * Math.PI) * 8;
  const glowY = layout.portrait ? 36 : 42;
  const gridOffset = drift * 60;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_remotion.AbsoluteFill,
    {
      "data-layer": "background",
      style: {
        background: `radial-gradient(ellipse 70% 60% at ${glowX}% ${glowY}%, ${NAVY_LIFT} 0%, ${NAVY} 45%, ${NAVY_DEEP} 100%)`,
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_remotion.AbsoluteFill,
          {
            style: {
              backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
              backgroundSize: "72px 72px",
              backgroundPosition: `${gridOffset}px ${gridOffset * 0.5}px`,
              maskImage: `radial-gradient(ellipse 65% 55% at 50% ${glowY}%, black 0%, transparent 80%)`,
              WebkitMaskImage: `radial-gradient(ellipse 65% 55% at 50% ${glowY}%, black 0%, transparent 80%)`
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_remotion.AbsoluteFill,
          {
            style: {
              background: "radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(2,6,18,0.65) 100%)"
            }
          }
        )
      ]
    }
  );
};
var LogoGlyph = ({ size }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { "data-layer": "logo", width: size, height: size, viewBox: "0 0 48 48", fill: "none", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "1", y: "1", width: "46", height: "46", rx: "12", fill: "rgba(255,255,255,0.06)", stroke: "rgba(255,255,255,0.14)" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "11", y: "13", width: "26", height: "3.5", rx: "1.75", fill: "rgba(243,246,252,0.55)" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "11", y: "22", width: "20", height: "3.5", rx: "1.75", fill: "rgba(243,246,252,0.8)" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "11", y: "31", width: "26", height: "4", rx: "2", fill: LIME })
] });
var AccentLine = ({
  progress,
  width,
  thickness,
  tail = 0
}) => {
  const head = Math.max(0, Math.min(1, progress));
  const start = Math.max(0, Math.min(head, tail));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { "data-layer": "accent-line", style: { position: "relative", width, height: thickness }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: start * width,
          width: (head - start) * width,
          top: 0,
          height: thickness,
          borderRadius: thickness,
          background: `linear-gradient(90deg, ${LIME_DEEP}, ${LIME})`,
          boxShadow: `0 0 ${thickness * 6}px rgba(200,245,60,0.45)`
        }
      }
    ),
    head > 1e-3 && head < 0.999 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          left: head * width - thickness * 2,
          top: -thickness * 1.5,
          width: thickness * 4,
          height: thickness * 4,
          borderRadius: "50%",
          background: "#F4FFD6",
          boxShadow: `0 0 ${thickness * 10}px ${thickness * 3}px rgba(200,245,60,0.6)`
        }
      }
    ) : null
  ] });
};
var ShotHook = ({ layout }) => {
  const frame = (0, import_remotion.useCurrentFrame)();
  const { fps } = (0, import_remotion.useVideoConfig)();
  const { portrait } = layout;
  const rise = (0, import_remotion.spring)({ frame, fps, config: { damping: 200, mass: 0.9 } });
  const y = (0, import_remotion.interpolate)(rise, [0, 1], [38, 0]);
  const tracking = (0, import_remotion.interpolate)(rise, [0, 1], [-0.01, -0.04]);
  const draw = (0, import_remotion.interpolate)(frame, [8, 52], [0, 1], { ...clamp, easing: import_remotion.Easing.bezier(0.65, 0, 0.25, 1) });
  const exit = (0, import_remotion.interpolate)(frame, [74, 90], [0, 1], { ...clamp, easing: import_remotion.Easing.in(import_remotion.Easing.cubic) });
  const tail = exit;
  const fontSize = portrait ? 128 : 136;
  const lineWidth = portrait ? 760 : 1180;
  const eyebrow = (0, import_remotion.spring)({ frame: frame - 4, fps, config: { damping: 200 } });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SafeBox, { layout, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: portrait ? 64 : 52,
          opacity: (0, import_remotion.interpolate)(eyebrow, [0, 1], [0, 1]) * (1 - exit),
          transform: `translateY(${(0, import_remotion.interpolate)(eyebrow, [0, 1], [14, 0]) - exit * 24}px)`
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoGlyph, { size: portrait ? 56 : 52 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "wordmark",
              style: {
                fontFamily: FONT,
                fontSize: portrait ? 38 : 34,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "rgba(243,246,252,0.82)"
              },
              children: "Ledgerline"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "headline",
        style: {
          fontFamily: FONT,
          fontSize,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: `${tracking}em`,
          color: TEXT_ON_NAVY,
          textAlign: "center",
          maxWidth: portrait ? 900 : 1600,
          transform: `translateY(${y - exit * 48}px)`,
          opacity: 1 - exit,
          textShadow: "0 20px 60px rgba(0,0,0,0.35)"
        },
        children: "Exports in one click"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: portrait ? 72 : 64 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccentLine, { progress: draw, tail, width: lineWidth, thickness: portrait ? 7 : 6 }) })
  ] }) });
};
var ROWS = [
  { date: "May 21", payee: "Northwind Supply", amount: "$12,480.00" },
  { date: "May 22", payee: "Halcyon Studio", amount: "$3,215.50" },
  { date: "May 23", payee: "Arbor Freight", amount: "$8,902.75" }
];
var CLICK_AT = 16;
var COUNT_START = 20;
var COUNT_END = 80;
var Cursor = ({ press }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "svg",
  {
    "data-layer": "cursor",
    width: "44",
    height: "52",
    viewBox: "0 0 22 26",
    style: {
      transform: `scale(${1 - press * 0.14})`,
      transformOrigin: "2px 2px",
      filter: "drop-shadow(0 6px 10px rgba(6,13,34,0.35))"
    },
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 2 L2 21 L7.2 16.4 L10.6 24 L14 22.5 L10.7 15 L18 15 Z", fill: INK, stroke: "#fff", strokeWidth: "1.6", strokeLinejoin: "round" })
  }
);
var ShotProof = ({ layout }) => {
  const frame = (0, import_remotion.useCurrentFrame)();
  const { fps } = (0, import_remotion.useVideoConfig)();
  const { portrait } = layout;
  const settle = (0, import_remotion.spring)({ frame, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });
  const cardScale = (0, import_remotion.interpolate)(settle, [0, 1], [0.9, 1]);
  const cardY = (0, import_remotion.interpolate)(settle, [0, 1], [80, 0]);
  const cardTilt = (0, import_remotion.interpolate)(settle, [0, 1], [10, 0]);
  const exit = (0, import_remotion.interpolate)(frame, [106, 120], [0, 1], { ...clamp, easing: import_remotion.Easing.in(import_remotion.Easing.cubic) });
  const travel = (0, import_remotion.interpolate)(frame, [0, CLICK_AT - 2], [0, 1], { ...clamp, easing: import_remotion.Easing.bezier(0.33, 0, 0.15, 1) });
  const press = (0, import_remotion.interpolate)(frame, [CLICK_AT - 2, CLICK_AT, CLICK_AT + 5], [0, 1, 0], clamp);
  const cursorX = (0, import_remotion.interpolate)(travel, [0, 1], [portrait ? 180 : 320, 0]);
  const cursorY = (0, import_remotion.interpolate)(travel, [0, 1], [portrait ? 260 : 220, 0]);
  const cursorOut = (0, import_remotion.interpolate)(frame, [CLICK_AT + 18, CLICK_AT + 30], [0, 1], clamp);
  const ripple = (0, import_remotion.interpolate)(frame, [CLICK_AT, CLICK_AT + 22], [0, 1], { ...clamp, easing: import_remotion.Easing.out(import_remotion.Easing.cubic) });
  const countT = (0, import_remotion.interpolate)(frame, [COUNT_START, COUNT_END], [0, 1], {
    ...clamp,
    easing: import_remotion.Easing.bezier(0.45, 0, 0.2, 1)
  });
  const count = Math.round(countT * 1e4);
  const done = (0, import_remotion.interpolate)(frame, [COUNT_END, COUNT_END + 10], [0, 1], clamp);
  const donePop = (0, import_remotion.spring)({ frame: frame - COUNT_END, fps, config: { damping: 12, stiffness: 180 } });
  const cardWidth = portrait ? 900 : 1180;
  const pad = portrait ? 48 : 56;
  const cell = portrait ? 28 : 28;
  const rowH = portrait ? 92 : 84;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { style: { perspective: 1800 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafeBox, { layout, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      "data-layer": "product",
      style: {
        width: cardWidth,
        background: PAPER,
        borderRadius: 32,
        padding: pad,
        boxSizing: "border-box",
        fontFamily: FONT,
        color: INK,
        transform: `translateY(${cardY - exit * 30}px) scale(${cardScale * (1 - exit * 0.04)}) rotateX(${cardTilt}deg)`,
        transformOrigin: "50% 100%",
        opacity: 1 - exit,
        boxShadow: "0 2px 0 rgba(255,255,255,0.6) inset, 0 50px 120px -20px rgba(0,0,0,0.6), 0 18px 40px -10px rgba(3,8,24,0.5), 0 0 0 1px rgba(255,255,255,0.08)"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: portrait ? 40 : 36 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": "card-title", style: { fontSize: portrait ? 40 : 38, fontWeight: 700, letterSpacing: "-0.02em" }, children: "Transactions" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": "card-subtitle", style: { fontSize: portrait ? 24 : 22, color: MUTED, fontWeight: 500 }, children: "Q2 \xB7 Operating account" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                style: {
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  border: `3px solid ${LIME}`,
                  opacity: ripple > 0 ? 1 - ripple : 0,
                  transform: `scale(${1 + ripple * 0.35})`
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: LIME,
                  borderRadius: 999,
                  padding: portrait ? "22px 34px" : "20px 32px",
                  transform: `scale(${1 - press * 0.06})`,
                  boxShadow: `0 10px 24px -8px rgba(155,203,18,0.7), inset 0 -3px 0 rgba(0,0,0,0.08)`
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: portrait ? 28 : 26, height: portrait ? 28 : 26, viewBox: "0 0 24 24", fill: "none", children: done > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "path",
                    {
                      d: "M5 12.5 L10 17 L19 7",
                      stroke: INK,
                      strokeWidth: "2.8",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeDasharray: "24",
                      strokeDashoffset: 24 * (1 - done)
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 4 V15", stroke: INK, strokeWidth: "2.6", strokeLinecap: "round" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 10.5 L12 15.5 L17 10.5", stroke: INK, strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 20 H19", stroke: INK, strokeWidth: "2.6", strokeLinecap: "round" })
                  ] }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "data-layer": "button", style: { fontSize: portrait ? 30 : 28, fontWeight: 700, letterSpacing: "-0.01em", color: INK }, children: "Export CSV" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                style: {
                  position: "absolute",
                  left: "62%",
                  top: "58%",
                  opacity: 1 - cursorOut,
                  transform: `translate(${cursorX + cursorOut * 40}px, ${cursorY + cursorOut * 60}px)`
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cursor, { press })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { borderTop: `1px solid ${RULE}` }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                height: portrait ? 64 : 60,
                fontSize: portrait ? 20 : 19,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: MUTED,
                borderBottom: `1px solid ${RULE}`
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": "table-header-date", style: { width: portrait ? 160 : 220 }, children: "Date" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": "table-header-payee", style: { flex: 1 }, children: "Payee" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": "table-header-amount", style: { width: 240, textAlign: "right" }, children: "Amount" })
              ]
            }
          ),
          ROWS.map((row, i) => {
            const enter = (0, import_remotion.spring)({ frame: frame - 3 - i * 4, fps, config: { damping: 200 } });
            const x = (0, import_remotion.interpolate)(enter, [0, 1], [28, 0]);
            const sweep = (0, import_remotion.interpolate)(countT, [i / 3, (i + 1) / 3], [0, 1], clamp);
            const lit = sweep > 0 && sweep < 1 ? 1 : 0;
            const n = i + 1;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                style: {
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  height: rowH,
                  fontSize: cell,
                  borderBottom: i < ROWS.length - 1 ? `1px solid ${RULE}` : "none",
                  transform: `translateX(${x}px)`
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: -pad / 2,
                        right: -pad / 2,
                        top: 4,
                        bottom: 4,
                        borderRadius: 14,
                        background: `linear-gradient(90deg, rgba(200,245,60,0.28) ${sweep * 100}%, rgba(200,245,60,0.0) ${sweep * 100}%)`,
                        opacity: lit ? 1 : sweep >= 1 ? (0, import_remotion.interpolate)(frame, [COUNT_END, COUNT_END + 14], [0.5, 0], clamp) : 0
                      }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": `row-${n}-date`, style: { position: "relative", width: portrait ? 160 : 220, color: MUTED, fontWeight: 500 }, children: row.date }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": `row-${n}-payee`, style: { position: "relative", flex: 1, fontWeight: 600 }, children: row.payee }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "div",
                    {
                      "data-layer": `row-${n}-amount`,
                      style: { position: "relative", width: 240, textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" },
                      children: row.amount
                    }
                  )
                ]
              },
              row.payee
            );
          })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            style: {
              marginTop: portrait ? 36 : 32,
              padding: portrait ? "30px 34px" : "28px 32px",
              borderRadius: 22,
              background: "#F4F6FB",
              border: `1px solid ${RULE}`,
              display: "flex",
              flexDirection: "column",
              gap: 20
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    "data-layer": "counter",
                    style: {
                      fontSize: portrait ? 68 : 64,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1,
                      color: INK,
                      transform: `scale(${1 + (done > 0 ? (1 - donePop) * 0.04 : 0)})`,
                      transformOrigin: "left bottom"
                    },
                    children: `${formatThousands(count)} rows`
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "26", height: "30", viewBox: "0 0 20 24", fill: "none", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 1.5 H12.5 L17.5 6.5 V22.5 H3 Z", fill: "#fff", stroke: MUTED, strokeWidth: "1.5", strokeLinejoin: "round" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.5 1.5 V6.5 H17.5", stroke: MUTED, strokeWidth: "1.5", strokeLinejoin: "round" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "5.5", y: "12", width: "9.5", height: "2", rx: "1", fill: LIME_DEEP }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "5.5", y: "16", width: "7", height: "2", rx: "1", fill: MUTED, opacity: "0.5" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "data-layer": "filename", style: { fontFamily: MONO, fontSize: portrait ? 22 : 21, color: MUTED }, children: "ledger-q2.csv" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-layer": "progress", style: { height: 10, borderRadius: 10, background: "#E3E7F0", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  style: {
                    width: `${countT * 100}%`,
                    height: "100%",
                    borderRadius: 10,
                    background: `linear-gradient(90deg, ${LIME_DEEP}, ${LIME})`,
                    boxShadow: "0 0 12px rgba(200,245,60,0.6)"
                  }
                }
              ) })
            ]
          }
        )
      ]
    }
  ) }) });
};
var URL_IN = 12;
var ShotCTA = ({ layout }) => {
  const frame = (0, import_remotion.useCurrentFrame)();
  const { fps } = (0, import_remotion.useVideoConfig)();
  const { portrait } = layout;
  const rise = (0, import_remotion.spring)({ frame, fps, config: { damping: 200, mass: 0.8 } });
  const headY = (0, import_remotion.interpolate)(rise, [0, 1], [44, 0]);
  const tracking = (0, import_remotion.interpolate)(rise, [0, 1], [-0.015, -0.04]);
  const logo = (0, import_remotion.spring)({ frame: frame - 2, fps, config: { damping: 14, stiffness: 160 } });
  const draw = (0, import_remotion.interpolate)(frame, [4, 30], [0, 1], { ...clamp, easing: import_remotion.Easing.bezier(0.65, 0, 0.25, 1) });
  const urlIn = (0, import_remotion.spring)({ frame: frame - URL_IN, fps, config: { damping: 16, stiffness: 170 } });
  const urlOpacity = (0, import_remotion.interpolate)(frame, [URL_IN, URL_IN + 8], [0, 1], clamp);
  const pulse = 0.5 + 0.5 * Math.sin(frame / fps * Math.PI * 2 * 0.8);
  const fontSize = portrait ? 116 : 124;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.AbsoluteFill, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SafeBox, { layout, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: portrait ? 56 : 48,
          transform: `scale(${(0, import_remotion.interpolate)(logo, [0, 1], [0.85, 1])})`,
          opacity: (0, import_remotion.interpolate)(frame, [0, 6], [0, 1], clamp)
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoGlyph, { size: portrait ? 64 : 60 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-layer": "wordmark",
              style: { fontFamily: FONT, fontSize: portrait ? 44 : 40, fontWeight: 650, letterSpacing: "-0.015em", color: TEXT_ON_NAVY },
              children: "Ledgerline"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-layer": "headline",
        style: {
          fontFamily: FONT,
          fontSize,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: `${tracking}em`,
          color: TEXT_ON_NAVY,
          textAlign: "center",
          maxWidth: portrait ? 900 : 1600,
          transform: `translateY(${headY}px)`,
          textShadow: "0 20px 60px rgba(0,0,0,0.35)"
        },
        children: "Live today for every plan"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: portrait ? 52 : 44 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccentLine, { progress: draw, width: portrait ? 300 : 360, thickness: 6 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          marginTop: portrait ? 56 : 48,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: portrait ? "22px 40px" : "20px 38px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
          opacity: urlOpacity,
          transform: `translateY(${(0, import_remotion.interpolate)(urlIn, [0, 1], [26, 0])}px) scale(${(0, import_remotion.interpolate)(urlIn, [0, 1], [0.94, 1])})`
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: LIME,
                boxShadow: `0 0 ${8 + pulse * 14}px rgba(200,245,60,${0.5 + pulse * 0.4})`
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              "data-layer": "url",
              style: { fontFamily: FONT, fontSize: portrait ? 42 : 40, fontWeight: 600, letterSpacing: "-0.01em", color: TEXT_ON_NAVY },
              children: "ledgerline.app"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 12 H18 M13 7 L18 12 L13 17", stroke: LIME, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }) })
        ]
      }
    )
  ] }) });
};
function Video() {
  const layout = useLayout();
  const [s1, s2, s3] = composition.shots;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_remotion.AbsoluteFill, { style: { background: NAVY_DEEP, fontFamily: FONT }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, { layout }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s1.from, durationInFrames: s1.durationInFrames, name: "Shot 1 \xB7 Hook", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotHook, { layout }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s2.from, durationInFrames: s2.durationInFrames, name: "Shot 2 \xB7 Proof", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotProof, { layout }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remotion.Sequence, { from: s3.from, durationInFrames: s3.durationInFrames, name: "Shot 3 \xB7 Call to action", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotCTA, { layout }) })
  ] });
}
export {
  composition,
  Video as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGFpbGllcy1kZXA6cmVtb3Rpb24iLCAiZGFpbGllcy1kZXA6cmVhY3QvanN4LXJ1bnRpbWUiLCAid29ya3NwYWNlcy9sZWRnZXJsaW5lLWluc3RhbnQtZXhwb3J0cy0wNTI1L3ZlcnNpb25zL3YxL1ZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZW1vdGlvblwiXTsiLCAibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLl9fREFJTElFU19ERVBTX19bXCJyZWFjdC9qc3gtcnVudGltZVwiXTsiLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFic29sdXRlRmlsbCxcbiAgRWFzaW5nLFxuICBTZXF1ZW5jZSxcbiAgaW50ZXJwb2xhdGUsXG4gIHNwcmluZyxcbiAgdXNlQ3VycmVudEZyYW1lLFxuICB1c2VWaWRlb0NvbmZpZyxcbn0gZnJvbSAncmVtb3Rpb24nO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIENvbXBvc2l0aW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGUFMgPSAzMDtcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2l0aW9uID0ge1xuICBmcHM6IEZQUyxcbiAgZHVyYXRpb25JbkZyYW1lczogMzAwLFxuICBzaG90czogW1xuICAgIHsgbjogMSwgdGl0bGU6ICdIb29rJywgZnJvbTogMCwgZHVyYXRpb25JbkZyYW1lczogOTAgfSxcbiAgICB7IG46IDIsIHRpdGxlOiAnUHJvb2YnLCBmcm9tOiA5MCwgZHVyYXRpb25JbkZyYW1lczogMTIwIH0sXG4gICAgeyBuOiAzLCB0aXRsZTogJ0NhbGwgdG8gYWN0aW9uJywgZnJvbTogMjEwLCBkdXJhdGlvbkluRnJhbWVzOiA5MCB9LFxuICBdLFxufTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBEZXNpZ24gdG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgRk9OVCA9ICd1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFwiU0YgUHJvIERpc3BsYXlcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZic7XG5jb25zdCBNT05PID0gJ3VpLW1vbm9zcGFjZSwgXCJTRiBNb25vXCIsIE1lbmxvLCBDb25zb2xhcywgbW9ub3NwYWNlJztcblxuY29uc3QgTkFWWV9ERUVQID0gJyMwNjBEMjInO1xuY29uc3QgTkFWWSA9ICcjMEIxNzM2JztcbmNvbnN0IE5BVllfTElGVCA9ICcjMTMyNDVBJztcbmNvbnN0IExJTUUgPSAnI0M4RjUzQyc7XG5jb25zdCBMSU1FX0RFRVAgPSAnIzlCQ0IxMic7XG5jb25zdCBJTksgPSAnIzBCMTUzMyc7XG5jb25zdCBQQVBFUiA9ICcjRkZGRkZGJztcbmNvbnN0IE1VVEVEID0gJyM2Qjc1OTMnO1xuY29uc3QgUlVMRSA9ICcjRTdFQUYyJztcbmNvbnN0IFRFWFRfT05fTkFWWSA9ICcjRjNGNkZDJztcblxuY29uc3QgY2xhbXAgPSB7IGV4dHJhcG9sYXRlTGVmdDogJ2NsYW1wJywgZXh0cmFwb2xhdGVSaWdodDogJ2NsYW1wJyB9IGFzIGNvbnN0O1xuXG5jb25zdCBmb3JtYXRUaG91c2FuZHMgPSAobjogbnVtYmVyKSA9PiBTdHJpbmcobikucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBMYXlvdXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxudHlwZSBMYXlvdXQgPSB7XG4gIHBvcnRyYWl0OiBib29sZWFuO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgLy8gU2FmZSBjb250ZW50IGJveCAocG9ydHJhaXQgaG9ub3VycyAxNCUgdG9wLCAzNSUgYm90dG9tLCA2JSBzaWRlcykuXG4gIHNhZmU6IHsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlcjsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfTtcbn07XG5cbmNvbnN0IHVzZUxheW91dCA9ICgpOiBMYXlvdXQgPT4ge1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG4gIGNvbnN0IHBvcnRyYWl0ID0gaGVpZ2h0ID4gd2lkdGg7XG4gIGNvbnN0IHNhZmUgPSBwb3J0cmFpdFxuICAgID8ge1xuICAgICAgICB0b3A6IGhlaWdodCAqIDAuMTQsXG4gICAgICAgIGxlZnQ6IHdpZHRoICogMC4wNixcbiAgICAgICAgd2lkdGg6IHdpZHRoICogMC44OCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiAoMSAtIDAuMTQgLSAwLjM1KSxcbiAgICAgIH1cbiAgICA6IHtcbiAgICAgICAgdG9wOiBoZWlnaHQgKiAwLjEsXG4gICAgICAgIGxlZnQ6IHdpZHRoICogMC4wOCxcbiAgICAgICAgd2lkdGg6IHdpZHRoICogMC44NCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiAwLjgsXG4gICAgICB9O1xuICByZXR1cm4geyBwb3J0cmFpdCwgd2lkdGgsIGhlaWdodCwgc2FmZSB9O1xufTtcblxuY29uc3QgU2FmZUJveDogUmVhY3QuRkM8eyBsYXlvdXQ6IExheW91dDsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9PiA9ICh7IGxheW91dCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8ZGl2XG4gICAgc3R5bGU9e3tcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBsYXlvdXQuc2FmZS50b3AsXG4gICAgICBsZWZ0OiBsYXlvdXQuc2FmZS5sZWZ0LFxuICAgICAgd2lkdGg6IGxheW91dC5zYWZlLndpZHRoLFxuICAgICAgaGVpZ2h0OiBsYXlvdXQuc2FmZS5oZWlnaHQsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgIH19XG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBCYWNrZ3JvdW5kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgQmFja2dyb3VuZDogUmVhY3QuRkM8eyBsYXlvdXQ6IExheW91dCB9PiA9ICh7IGxheW91dCB9KSA9PiB7XG4gIGNvbnN0IGZyYW1lID0gdXNlQ3VycmVudEZyYW1lKCk7XG4gIGNvbnN0IGRyaWZ0ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFswLCAzMDBdLCBbMCwgMV0sIGNsYW1wKTtcbiAgY29uc3QgZ2xvd1ggPSA1MCArIE1hdGguc2luKGRyaWZ0ICogTWF0aC5QSSkgKiA4O1xuICBjb25zdCBnbG93WSA9IGxheW91dC5wb3J0cmFpdCA/IDM2IDogNDI7XG4gIGNvbnN0IGdyaWRPZmZzZXQgPSBkcmlmdCAqIDYwO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbFxuICAgICAgZGF0YS1sYXllcj1cImJhY2tncm91bmRcIlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIDcwJSA2MCUgYXQgJHtnbG93WH0lICR7Z2xvd1l9JSwgJHtOQVZZX0xJRlR9IDAlLCAke05BVll9IDQ1JSwgJHtOQVZZX0RFRVB9IDEwMCUpYCxcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7LyogZmluZSBsZWRnZXIgZ3JpZCAqL31cbiAgICAgIDxBYnNvbHV0ZUZpbGxcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQocmdiYSgyNTUsMjU1LDI1NSwwLjAzNSkgMXB4LCB0cmFuc3BhcmVudCAxcHgpLCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMC4wMzUpIDFweCwgdHJhbnNwYXJlbnQgMXB4KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6ICc3MnB4IDcycHgnLFxuICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogYCR7Z3JpZE9mZnNldH1weCAke2dyaWRPZmZzZXQgKiAwLjV9cHhgLFxuICAgICAgICAgIG1hc2tJbWFnZTogYHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIDY1JSA1NSUgYXQgNTAlICR7Z2xvd1l9JSwgYmxhY2sgMCUsIHRyYW5zcGFyZW50IDgwJSlgLFxuICAgICAgICAgIFdlYmtpdE1hc2tJbWFnZTogYHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIDY1JSA1NSUgYXQgNTAlICR7Z2xvd1l9JSwgYmxhY2sgMCUsIHRyYW5zcGFyZW50IDgwJSlgLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIHsvKiB2aWduZXR0ZSBmb3IgZGVwdGggKi99XG4gICAgICA8QWJzb2x1dGVGaWxsXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChlbGxpcHNlIDEyMCUgOTAlIGF0IDUwJSA0MCUsIHRyYW5zcGFyZW50IDU1JSwgcmdiYSgyLDYsMTgsMC42NSkgMTAwJSknLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L0Fic29sdXRlRmlsbD5cbiAgKTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogU2hhcmVkIHBpZWNlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IExvZ29HbHlwaDogUmVhY3QuRkM8eyBzaXplOiBudW1iZXIgfT4gPSAoeyBzaXplIH0pID0+IChcbiAgPHN2ZyBkYXRhLWxheWVyPVwibG9nb1wiIHdpZHRoPXtzaXplfSBoZWlnaHQ9e3NpemV9IHZpZXdCb3g9XCIwIDAgNDggNDhcIiBmaWxsPVwibm9uZVwiPlxuICAgIDxyZWN0IHg9XCIxXCIgeT1cIjFcIiB3aWR0aD1cIjQ2XCIgaGVpZ2h0PVwiNDZcIiByeD1cIjEyXCIgZmlsbD1cInJnYmEoMjU1LDI1NSwyNTUsMC4wNilcIiBzdHJva2U9XCJyZ2JhKDI1NSwyNTUsMjU1LDAuMTQpXCIgLz5cbiAgICA8cmVjdCB4PVwiMTFcIiB5PVwiMTNcIiB3aWR0aD1cIjI2XCIgaGVpZ2h0PVwiMy41XCIgcng9XCIxLjc1XCIgZmlsbD1cInJnYmEoMjQzLDI0NiwyNTIsMC41NSlcIiAvPlxuICAgIDxyZWN0IHg9XCIxMVwiIHk9XCIyMlwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIzLjVcIiByeD1cIjEuNzVcIiBmaWxsPVwicmdiYSgyNDMsMjQ2LDI1MiwwLjgpXCIgLz5cbiAgICA8cmVjdCB4PVwiMTFcIiB5PVwiMzFcIiB3aWR0aD1cIjI2XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9e0xJTUV9IC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgQWNjZW50TGluZTogUmVhY3QuRkM8eyBwcm9ncmVzczogbnVtYmVyOyB3aWR0aDogbnVtYmVyOyB0aGlja25lc3M6IG51bWJlcjsgdGFpbD86IG51bWJlciB9PiA9ICh7XG4gIHByb2dyZXNzLFxuICB3aWR0aCxcbiAgdGhpY2tuZXNzLFxuICB0YWlsID0gMCxcbn0pID0+IHtcbiAgY29uc3QgaGVhZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHByb2dyZXNzKSk7XG4gIGNvbnN0IHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oaGVhZCwgdGFpbCkpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1sYXllcj1cImFjY2VudC1saW5lXCIgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoLCBoZWlnaHQ6IHRoaWNrbmVzcyB9fT5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBzdGFydCAqIHdpZHRoLFxuICAgICAgICAgIHdpZHRoOiAoaGVhZCAtIHN0YXJ0KSAqIHdpZHRoLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBoZWlnaHQ6IHRoaWNrbmVzcyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoaWNrbmVzcyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAke0xJTUVfREVFUH0sICR7TElNRX0pYCxcbiAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgJHt0aGlja25lc3MgKiA2fXB4IHJnYmEoMjAwLDI0NSw2MCwwLjQ1KWAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAge2hlYWQgPiAwLjAwMSAmJiBoZWFkIDwgMC45OTkgPyAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBoZWFkICogd2lkdGggLSB0aGlja25lc3MgKiAyLFxuICAgICAgICAgICAgdG9wOiAtdGhpY2tuZXNzICogMS41LFxuICAgICAgICAgICAgd2lkdGg6IHRoaWNrbmVzcyAqIDQsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaWNrbmVzcyAqIDQsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNGNEZGRDYnLFxuICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwICR7dGhpY2tuZXNzICogMTB9cHggJHt0aGlja25lc3MgKiAzfXB4IHJnYmEoMjAwLDI0NSw2MCwwLjYpYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob3QgMSBcdTIwMTQgSG9vayAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFNob3RIb29rOiBSZWFjdC5GQzx7IGxheW91dDogTGF5b3V0IH0+ID0gKHsgbGF5b3V0IH0pID0+IHtcbiAgY29uc3QgZnJhbWUgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3QgeyBmcHMgfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG4gIGNvbnN0IHsgcG9ydHJhaXQgfSA9IGxheW91dDtcblxuICBjb25zdCByaXNlID0gc3ByaW5nKHsgZnJhbWUsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDIwMCwgbWFzczogMC45IH0gfSk7XG4gIGNvbnN0IHkgPSBpbnRlcnBvbGF0ZShyaXNlLCBbMCwgMV0sIFszOCwgMF0pO1xuICBjb25zdCB0cmFja2luZyA9IGludGVycG9sYXRlKHJpc2UsIFswLCAxXSwgWy0wLjAxLCAtMC4wNF0pO1xuXG4gIGNvbnN0IGRyYXcgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzgsIDUyXSwgWzAsIDFdLCB7IC4uLmNsYW1wLCBlYXNpbmc6IEVhc2luZy5iZXppZXIoMC42NSwgMCwgMC4yNSwgMSkgfSk7XG5cbiAgLy8gRXhpdDogaGVhZGxpbmUgbGlmdHMgYXdheSwgbGluZSByZXRyYWN0cyBmcm9tIHRoZSBsZWZ0IFx1MjAxNCBoYW5kaW5nIG9mZiB0byB0aGUgcHJvb2YuXG4gIGNvbnN0IGV4aXQgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzc0LCA5MF0sIFswLCAxXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFYXNpbmcuaW4oRWFzaW5nLmN1YmljKSB9KTtcbiAgY29uc3QgdGFpbCA9IGV4aXQ7XG5cbiAgY29uc3QgZm9udFNpemUgPSBwb3J0cmFpdCA/IDEyOCA6IDEzNjtcbiAgY29uc3QgbGluZVdpZHRoID0gcG9ydHJhaXQgPyA3NjAgOiAxMTgwO1xuXG4gIGNvbnN0IGV5ZWJyb3cgPSBzcHJpbmcoeyBmcmFtZTogZnJhbWUgLSA0LCBmcHMsIGNvbmZpZzogeyBkYW1waW5nOiAyMDAgfSB9KTtcblxuICByZXR1cm4gKFxuICAgIDxBYnNvbHV0ZUZpbGw+XG4gICAgICA8U2FmZUJveCBsYXlvdXQ9e2xheW91dH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBnYXA6IDE4LFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBwb3J0cmFpdCA/IDY0IDogNTIsXG4gICAgICAgICAgICBvcGFjaXR5OiBpbnRlcnBvbGF0ZShleWVicm93LCBbMCwgMV0sIFswLCAxXSkgKiAoMSAtIGV4aXQpLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke2ludGVycG9sYXRlKGV5ZWJyb3csIFswLCAxXSwgWzE0LCAwXSkgLSBleGl0ICogMjR9cHgpYCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPExvZ29HbHlwaCBzaXplPXtwb3J0cmFpdCA/IDU2IDogNTJ9IC8+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZGF0YS1sYXllcj1cIndvcmRtYXJrXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBwb3J0cmFpdCA/IDM4IDogMzQsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAxZW0nLFxuICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjQzLDI0NiwyNTIsMC44MiknLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBMZWRnZXJsaW5lXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkYXRhLWxheWVyPVwiaGVhZGxpbmVcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05ULFxuICAgICAgICAgICAgZm9udFNpemUsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjAsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBgJHt0cmFja2luZ31lbWAsXG4gICAgICAgICAgICBjb2xvcjogVEVYVF9PTl9OQVZZLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIG1heFdpZHRoOiBwb3J0cmFpdCA/IDkwMCA6IDE2MDAsXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7eSAtIGV4aXQgKiA0OH1weClgLFxuICAgICAgICAgICAgb3BhY2l0eTogMSAtIGV4aXQsXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiAnMCAyMHB4IDYwcHggcmdiYSgwLDAsMCwwLjM1KScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIEV4cG9ydHMgaW4gb25lIGNsaWNrXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiBwb3J0cmFpdCA/IDcyIDogNjQgfX0+XG4gICAgICAgICAgPEFjY2VudExpbmUgcHJvZ3Jlc3M9e2RyYXd9IHRhaWw9e3RhaWx9IHdpZHRoPXtsaW5lV2lkdGh9IHRoaWNrbmVzcz17cG9ydHJhaXQgPyA3IDogNn0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NhZmVCb3g+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob3QgMiBcdTIwMTQgUHJvb2YgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFJPV1MgPSBbXG4gIHsgZGF0ZTogJ01heSAyMScsIHBheWVlOiAnTm9ydGh3aW5kIFN1cHBseScsIGFtb3VudDogJyQxMiw0ODAuMDAnIH0sXG4gIHsgZGF0ZTogJ01heSAyMicsIHBheWVlOiAnSGFsY3lvbiBTdHVkaW8nLCBhbW91bnQ6ICckMywyMTUuNTAnIH0sXG4gIHsgZGF0ZTogJ01heSAyMycsIHBheWVlOiAnQXJib3IgRnJlaWdodCcsIGFtb3VudDogJyQ4LDkwMi43NScgfSxcbl07XG5cbmNvbnN0IENMSUNLX0FUID0gMTY7IC8vIGxvY2FsIGZyYW1lIHRoZSBjdXJzb3IgcHJlc3NlcyB0aGUgYnV0dG9uXG5jb25zdCBDT1VOVF9TVEFSVCA9IDIwO1xuY29uc3QgQ09VTlRfRU5EID0gODA7IC8vIGxvY2FsIDgwID0+IGdsb2JhbCAxNzAsIGJlZm9yZSAwOjA2XG5cbmNvbnN0IEN1cnNvcjogUmVhY3QuRkM8eyBwcmVzczogbnVtYmVyIH0+ID0gKHsgcHJlc3MgfSkgPT4gKFxuICA8c3ZnXG4gICAgZGF0YS1sYXllcj1cImN1cnNvclwiXG4gICAgd2lkdGg9XCI0NFwiXG4gICAgaGVpZ2h0PVwiNTJcIlxuICAgIHZpZXdCb3g9XCIwIDAgMjIgMjZcIlxuICAgIHN0eWxlPXt7XG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZSgkezEgLSBwcmVzcyAqIDAuMTR9KWAsXG4gICAgICB0cmFuc2Zvcm1PcmlnaW46ICcycHggMnB4JyxcbiAgICAgIGZpbHRlcjogJ2Ryb3Atc2hhZG93KDAgNnB4IDEwcHggcmdiYSg2LDEzLDM0LDAuMzUpKScsXG4gICAgfX1cbiAgPlxuICAgIDxwYXRoIGQ9XCJNMiAyIEwyIDIxIEw3LjIgMTYuNCBMMTAuNiAyNCBMMTQgMjIuNSBMMTAuNyAxNSBMMTggMTUgWlwiIGZpbGw9e0lOS30gc3Ryb2tlPVwiI2ZmZlwiIHN0cm9rZVdpZHRoPVwiMS42XCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgU2hvdFByb29mOiBSZWFjdC5GQzx7IGxheW91dDogTGF5b3V0IH0+ID0gKHsgbGF5b3V0IH0pID0+IHtcbiAgY29uc3QgZnJhbWUgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3QgeyBmcHMgfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG4gIGNvbnN0IHsgcG9ydHJhaXQgfSA9IGxheW91dDtcblxuICAvLyBDYXJkIGlzIGZ1bGx5IG9wYXF1ZSBmcm9tIHRoZSBmaXJzdCBmcmFtZSBvZiB0aGUgc2hvdDsgaXQgc2V0dGxlcyBpbiBkZXB0aC5cbiAgY29uc3Qgc2V0dGxlID0gc3ByaW5nKHsgZnJhbWUsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDE4LCBzdGlmZm5lc3M6IDEyMCwgbWFzczogMC45IH0gfSk7XG4gIGNvbnN0IGNhcmRTY2FsZSA9IGludGVycG9sYXRlKHNldHRsZSwgWzAsIDFdLCBbMC45LCAxXSk7XG4gIGNvbnN0IGNhcmRZID0gaW50ZXJwb2xhdGUoc2V0dGxlLCBbMCwgMV0sIFs4MCwgMF0pO1xuICBjb25zdCBjYXJkVGlsdCA9IGludGVycG9sYXRlKHNldHRsZSwgWzAsIDFdLCBbMTAsIDBdKTtcblxuICBjb25zdCBleGl0ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFsxMDYsIDEyMF0sIFswLCAxXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFYXNpbmcuaW4oRWFzaW5nLmN1YmljKSB9KTtcblxuICAvLyBDdXJzb3IgdHJhdmVscyBpbiBhbmQgcHJlc3NlcyB0aGUgYnV0dG9uLlxuICBjb25zdCB0cmF2ZWwgPSBpbnRlcnBvbGF0ZShmcmFtZSwgWzAsIENMSUNLX0FUIC0gMl0sIFswLCAxXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFYXNpbmcuYmV6aWVyKDAuMzMsIDAsIDAuMTUsIDEpIH0pO1xuICBjb25zdCBwcmVzcyA9IGludGVycG9sYXRlKGZyYW1lLCBbQ0xJQ0tfQVQgLSAyLCBDTElDS19BVCwgQ0xJQ0tfQVQgKyA1XSwgWzAsIDEsIDBdLCBjbGFtcCk7XG4gIGNvbnN0IGN1cnNvclggPSBpbnRlcnBvbGF0ZSh0cmF2ZWwsIFswLCAxXSwgW3BvcnRyYWl0ID8gMTgwIDogMzIwLCAwXSk7XG4gIGNvbnN0IGN1cnNvclkgPSBpbnRlcnBvbGF0ZSh0cmF2ZWwsIFswLCAxXSwgW3BvcnRyYWl0ID8gMjYwIDogMjIwLCAwXSk7XG4gIGNvbnN0IGN1cnNvck91dCA9IGludGVycG9sYXRlKGZyYW1lLCBbQ0xJQ0tfQVQgKyAxOCwgQ0xJQ0tfQVQgKyAzMF0sIFswLCAxXSwgY2xhbXApO1xuXG4gIC8vIFJpcHBsZSBmcm9tIHRoZSBjbGljay5cbiAgY29uc3QgcmlwcGxlID0gaW50ZXJwb2xhdGUoZnJhbWUsIFtDTElDS19BVCwgQ0xJQ0tfQVQgKyAyMl0sIFswLCAxXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFYXNpbmcub3V0KEVhc2luZy5jdWJpYykgfSk7XG5cbiAgLy8gQ291bnRlcjogMCBhdCBzaG90IHN0YXJ0LCBleGFjdGx5IDEwLDAwMCBieSBsb2NhbCBmcmFtZSA4MC5cbiAgY29uc3QgY291bnRUID0gaW50ZXJwb2xhdGUoZnJhbWUsIFtDT1VOVF9TVEFSVCwgQ09VTlRfRU5EXSwgWzAsIDFdLCB7XG4gICAgLi4uY2xhbXAsXG4gICAgZWFzaW5nOiBFYXNpbmcuYmV6aWVyKDAuNDUsIDAsIDAuMiwgMSksXG4gIH0pO1xuICBjb25zdCBjb3VudCA9IE1hdGgucm91bmQoY291bnRUICogMTAwMDApO1xuICBjb25zdCBkb25lID0gaW50ZXJwb2xhdGUoZnJhbWUsIFtDT1VOVF9FTkQsIENPVU5UX0VORCArIDEwXSwgWzAsIDFdLCBjbGFtcCk7XG4gIGNvbnN0IGRvbmVQb3AgPSBzcHJpbmcoeyBmcmFtZTogZnJhbWUgLSBDT1VOVF9FTkQsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDEyLCBzdGlmZm5lc3M6IDE4MCB9IH0pO1xuXG4gIGNvbnN0IGNhcmRXaWR0aCA9IHBvcnRyYWl0ID8gOTAwIDogMTE4MDtcbiAgY29uc3QgcGFkID0gcG9ydHJhaXQgPyA0OCA6IDU2O1xuICBjb25zdCBjZWxsID0gcG9ydHJhaXQgPyAyOCA6IDI4O1xuICBjb25zdCByb3dIID0gcG9ydHJhaXQgPyA5MiA6IDg0O1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBwZXJzcGVjdGl2ZTogMTgwMCB9fT5cbiAgICAgIDxTYWZlQm94IGxheW91dD17bGF5b3V0fT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJwcm9kdWN0XCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6IGNhcmRXaWR0aCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IFBBUEVSLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzMixcbiAgICAgICAgICAgIHBhZGRpbmc6IHBhZCxcbiAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVCxcbiAgICAgICAgICAgIGNvbG9yOiBJTkssXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7Y2FyZFkgLSBleGl0ICogMzB9cHgpIHNjYWxlKCR7Y2FyZFNjYWxlICogKDEgLSBleGl0ICogMC4wNCl9KSByb3RhdGVYKCR7Y2FyZFRpbHR9ZGVnKWAsXG4gICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc1MCUgMTAwJScsXG4gICAgICAgICAgICBvcGFjaXR5OiAxIC0gZXhpdCxcbiAgICAgICAgICAgIGJveFNoYWRvdzpcbiAgICAgICAgICAgICAgJzAgMnB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjYpIGluc2V0LCAwIDUwcHggMTIwcHggLTIwcHggcmdiYSgwLDAsMCwwLjYpLCAwIDE4cHggNDBweCAtMTBweCByZ2JhKDMsOCwyNCwwLjUpLCAwIDAgMCAxcHggcmdiYSgyNTUsMjU1LDI1NSwwLjA4KScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBtYXJnaW5Cb3R0b206IHBvcnRyYWl0ID8gNDAgOiAzNiB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiA2IH19PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtbGF5ZXI9XCJjYXJkLXRpdGxlXCIgc3R5bGU9e3sgZm9udFNpemU6IHBvcnRyYWl0ID8gNDAgOiAzOCwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnLTAuMDJlbScgfX0+XG4gICAgICAgICAgICAgICAgVHJhbnNhY3Rpb25zXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtbGF5ZXI9XCJjYXJkLXN1YnRpdGxlXCIgc3R5bGU9e3sgZm9udFNpemU6IHBvcnRyYWl0ID8gMjQgOiAyMiwgY29sb3I6IE1VVEVELCBmb250V2VpZ2h0OiA1MDAgfX0+XG4gICAgICAgICAgICAgICAgUTIgXHUwMEI3IE9wZXJhdGluZyBhY2NvdW50XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XG4gICAgICAgICAgICAgIHsvKiByaXBwbGUgKi99XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICBpbnNldDogMCxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogOTk5LFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgM3B4IHNvbGlkICR7TElNRX1gLFxuICAgICAgICAgICAgICAgICAgb3BhY2l0eTogcmlwcGxlID4gMCA/IDEgLSByaXBwbGUgOiAwLFxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHsxICsgcmlwcGxlICogMC4zNX0pYCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgZ2FwOiAxNCxcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IExJTUUsXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDk5OSxcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IHBvcnRyYWl0ID8gJzIycHggMzRweCcgOiAnMjBweCAzMnB4JyxcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7MSAtIHByZXNzICogMC4wNn0pYCxcbiAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMTBweCAyNHB4IC04cHggcmdiYSgxNTUsMjAzLDE4LDAuNyksIGluc2V0IDAgLTNweCAwIHJnYmEoMCwwLDAsMC4wOClgLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPXtwb3J0cmFpdCA/IDI4IDogMjZ9IGhlaWdodD17cG9ydHJhaXQgPyAyOCA6IDI2fSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIj5cbiAgICAgICAgICAgICAgICAgIHtkb25lID4gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICBkPVwiTTUgMTIuNSBMMTAgMTcgTDE5IDdcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT17SU5LfVxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMi44XCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheT1cIjI0XCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PXsyNCAqICgxIC0gZG9uZSl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgNCBWMTVcIiBzdHJva2U9e0lOS30gc3Ryb2tlV2lkdGg9XCIyLjZcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNyAxMC41IEwxMiAxNS41IEwxNyAxMC41XCIgc3Ryb2tlPXtJTkt9IHN0cm9rZVdpZHRoPVwiMi42XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk01IDIwIEgxOVwiIHN0cm9rZT17SU5LfSBzdHJva2VXaWR0aD1cIjIuNlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWxheWVyPVwiYnV0dG9uXCIgc3R5bGU9e3sgZm9udFNpemU6IHBvcnRyYWl0ID8gMzAgOiAyOCwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnLTAuMDFlbScsIGNvbG9yOiBJTksgfX0+XG4gICAgICAgICAgICAgICAgICBFeHBvcnQgQ1NWXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgey8qIGN1cnNvciAqL31cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgIGxlZnQ6ICc2MiUnLFxuICAgICAgICAgICAgICAgICAgdG9wOiAnNTglJyxcbiAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEgLSBjdXJzb3JPdXQsXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtjdXJzb3JYICsgY3Vyc29yT3V0ICogNDB9cHgsICR7Y3Vyc29yWSArIGN1cnNvck91dCAqIDYwfXB4KWAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxDdXJzb3IgcHJlc3M9e3ByZXNzfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFRhYmxlICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYm9yZGVyVG9wOiBgMXB4IHNvbGlkICR7UlVMRX1gIH19PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHBvcnRyYWl0ID8gNjQgOiA2MCxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogcG9ydHJhaXQgPyAyMCA6IDE5LFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnMC4wOGVtJyxcbiAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogTVVURUQsXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7UlVMRX1gLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtbGF5ZXI9XCJ0YWJsZS1oZWFkZXItZGF0ZVwiIHN0eWxlPXt7IHdpZHRoOiBwb3J0cmFpdCA/IDE2MCA6IDIyMCB9fT5EYXRlPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1sYXllcj1cInRhYmxlLWhlYWRlci1wYXllZVwiIHN0eWxlPXt7IGZsZXg6IDEgfX0+UGF5ZWU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLWxheWVyPVwidGFibGUtaGVhZGVyLWFtb3VudFwiIHN0eWxlPXt7IHdpZHRoOiAyNDAsIHRleHRBbGlnbjogJ3JpZ2h0JyB9fT5BbW91bnQ8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7Uk9XUy5tYXAoKHJvdywgaSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBlbnRlciA9IHNwcmluZyh7IGZyYW1lOiBmcmFtZSAtIDMgLSBpICogNCwgZnBzLCBjb25maWc6IHsgZGFtcGluZzogMjAwIH0gfSk7XG4gICAgICAgICAgICAgIGNvbnN0IHggPSBpbnRlcnBvbGF0ZShlbnRlciwgWzAsIDFdLCBbMjgsIDBdKTtcbiAgICAgICAgICAgICAgLy8gSGlnaGxpZ2h0IHN3ZWVwcyBlYWNoIHJvdyBhcyB0aGUgZXhwb3J0IHJ1bnMuXG4gICAgICAgICAgICAgIGNvbnN0IHN3ZWVwID0gaW50ZXJwb2xhdGUoY291bnRULCBbaSAvIDMsIChpICsgMSkgLyAzXSwgWzAsIDFdLCBjbGFtcCk7XG4gICAgICAgICAgICAgIGNvbnN0IGxpdCA9IHN3ZWVwID4gMCAmJiBzd2VlcCA8IDEgPyAxIDogMDtcbiAgICAgICAgICAgICAgY29uc3QgbiA9IGkgKyAxO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGtleT17cm93LnBheWVlfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcm93SCxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IGNlbGwsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogaSA8IFJPV1MubGVuZ3RoIC0gMSA/IGAxcHggc29saWQgJHtSVUxFfWAgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fXB4KWAsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAtcGFkIC8gMixcbiAgICAgICAgICAgICAgICAgICAgICByaWdodDogLXBhZCAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgdG9wOiA0LFxuICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogNCxcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDE0LFxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEoMjAwLDI0NSw2MCwwLjI4KSAke3N3ZWVwICogMTAwfSUsIHJnYmEoMjAwLDI0NSw2MCwwLjApICR7c3dlZXAgKiAxMDB9JSlgLFxuICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGxpdCA/IDEgOiBzd2VlcCA+PSAxID8gaW50ZXJwb2xhdGUoZnJhbWUsIFtDT1VOVF9FTkQsIENPVU5UX0VORCArIDE0XSwgWzAuNSwgMF0sIGNsYW1wKSA6IDAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWxheWVyPXtgcm93LSR7bn0tZGF0ZWB9IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogcG9ydHJhaXQgPyAxNjAgOiAyMjAsIGNvbG9yOiBNVVRFRCwgZm9udFdlaWdodDogNTAwIH19PlxuICAgICAgICAgICAgICAgICAgICB7cm93LmRhdGV9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1sYXllcj17YHJvdy0ke259LXBheWVlYH0gc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIGZsZXg6IDEsIGZvbnRXZWlnaHQ6IDYwMCB9fT5cbiAgICAgICAgICAgICAgICAgICAge3Jvdy5wYXllZX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBkYXRhLWxheWVyPXtgcm93LSR7bn0tYW1vdW50YH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoOiAyNDAsIHRleHRBbGlnbjogJ3JpZ2h0JywgZm9udFdlaWdodDogNjAwLCBmb250VmFyaWFudE51bWVyaWM6ICd0YWJ1bGFyLW51bXMnIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtyb3cuYW1vdW50fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBFeHBvcnQgc3RhdHVzICovfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIG1hcmdpblRvcDogcG9ydHJhaXQgPyAzNiA6IDMyLFxuICAgICAgICAgICAgICBwYWRkaW5nOiBwb3J0cmFpdCA/ICczMHB4IDM0cHgnIDogJzI4cHggMzJweCcsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMjIsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjRjRGNkZCJyxcbiAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7UlVMRX1gLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICBnYXA6IDIwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyB9fT5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGRhdGEtbGF5ZXI9XCJjb3VudGVyXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IHBvcnRyYWl0ID8gNjggOiA2NCxcbiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICctMC4wM2VtJyxcbiAgICAgICAgICAgICAgICAgIGZvbnRWYXJpYW50TnVtZXJpYzogJ3RhYnVsYXItbnVtcycsXG4gICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IElOSyxcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7MSArIChkb25lID4gMCA/ICgxIC0gZG9uZVBvcCkgKiAwLjA0IDogMCl9KWAsXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICdsZWZ0IGJvdHRvbScsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtgJHtmb3JtYXRUaG91c2FuZHMoY291bnQpfSByb3dzYH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMCB9fT5cbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjZcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjRcIiBmaWxsPVwibm9uZVwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zIDEuNSBIMTIuNSBMMTcuNSA2LjUgVjIyLjUgSDMgWlwiIGZpbGw9XCIjZmZmXCIgc3Ryb2tlPXtNVVRFRH0gc3Ryb2tlV2lkdGg9XCIxLjVcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTIuNSAxLjUgVjYuNSBIMTcuNVwiIHN0cm9rZT17TVVURUR9IHN0cm9rZVdpZHRoPVwiMS41XCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIC8+XG4gICAgICAgICAgICAgICAgICA8cmVjdCB4PVwiNS41XCIgeT1cIjEyXCIgd2lkdGg9XCI5LjVcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgZmlsbD17TElNRV9ERUVQfSAvPlxuICAgICAgICAgICAgICAgICAgPHJlY3QgeD1cIjUuNVwiIHk9XCIxNlwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIiByeD1cIjFcIiBmaWxsPXtNVVRFRH0gb3BhY2l0eT1cIjAuNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1sYXllcj1cImZpbGVuYW1lXCIgc3R5bGU9e3sgZm9udEZhbWlseTogTU9OTywgZm9udFNpemU6IHBvcnRyYWl0ID8gMjIgOiAyMSwgY29sb3I6IE1VVEVEIH19PlxuICAgICAgICAgICAgICAgICAgbGVkZ2VyLXEyLmNzdlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1sYXllcj1cInByb2dyZXNzXCIgc3R5bGU9e3sgaGVpZ2h0OiAxMCwgYm9yZGVyUmFkaXVzOiAxMCwgYmFja2dyb3VuZDogJyNFM0U3RjAnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2NvdW50VCAqIDEwMH0lYCxcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAxMCxcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICR7TElNRV9ERUVQfSwgJHtMSU1FfSlgLFxuICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAwIDEycHggcmdiYSgyMDAsMjQ1LDYwLDAuNiknLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NhZmVCb3g+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFNob3QgMyBcdTIwMTQgQ2FsbCB0byBhY3Rpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFVSTF9JTiA9IDEyOyAvLyBsb2NhbCBmcmFtZTsgVVJMIGZ1bGx5IHZpc2libGUgYnkgbG9jYWwgMjYgKGdsb2JhbCAyMzYpIDwgMDowOFxuXG5jb25zdCBTaG90Q1RBOiBSZWFjdC5GQzx7IGxheW91dDogTGF5b3V0IH0+ID0gKHsgbGF5b3V0IH0pID0+IHtcbiAgY29uc3QgZnJhbWUgPSB1c2VDdXJyZW50RnJhbWUoKTtcbiAgY29uc3QgeyBmcHMgfSA9IHVzZVZpZGVvQ29uZmlnKCk7XG4gIGNvbnN0IHsgcG9ydHJhaXQgfSA9IGxheW91dDtcblxuICBjb25zdCByaXNlID0gc3ByaW5nKHsgZnJhbWUsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDIwMCwgbWFzczogMC44IH0gfSk7XG4gIGNvbnN0IGhlYWRZID0gaW50ZXJwb2xhdGUocmlzZSwgWzAsIDFdLCBbNDQsIDBdKTtcbiAgY29uc3QgdHJhY2tpbmcgPSBpbnRlcnBvbGF0ZShyaXNlLCBbMCwgMV0sIFstMC4wMTUsIC0wLjA0XSk7XG5cbiAgY29uc3QgbG9nbyA9IHNwcmluZyh7IGZyYW1lOiBmcmFtZSAtIDIsIGZwcywgY29uZmlnOiB7IGRhbXBpbmc6IDE0LCBzdGlmZm5lc3M6IDE2MCB9IH0pO1xuICBjb25zdCBkcmF3ID0gaW50ZXJwb2xhdGUoZnJhbWUsIFs0LCAzMF0sIFswLCAxXSwgeyAuLi5jbGFtcCwgZWFzaW5nOiBFYXNpbmcuYmV6aWVyKDAuNjUsIDAsIDAuMjUsIDEpIH0pO1xuXG4gIGNvbnN0IHVybEluID0gc3ByaW5nKHsgZnJhbWU6IGZyYW1lIC0gVVJMX0lOLCBmcHMsIGNvbmZpZzogeyBkYW1waW5nOiAxNiwgc3RpZmZuZXNzOiAxNzAgfSB9KTtcbiAgY29uc3QgdXJsT3BhY2l0eSA9IGludGVycG9sYXRlKGZyYW1lLCBbVVJMX0lOLCBVUkxfSU4gKyA4XSwgWzAsIDFdLCBjbGFtcCk7XG4gIGNvbnN0IHB1bHNlID0gMC41ICsgMC41ICogTWF0aC5zaW4oKGZyYW1lIC8gZnBzKSAqIE1hdGguUEkgKiAyICogMC44KTtcblxuICBjb25zdCBmb250U2l6ZSA9IHBvcnRyYWl0ID8gMTE2IDogMTI0O1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbD5cbiAgICAgIDxTYWZlQm94IGxheW91dD17bGF5b3V0fT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGdhcDogMTgsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IHBvcnRyYWl0ID8gNTYgOiA0OCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7aW50ZXJwb2xhdGUobG9nbywgWzAsIDFdLCBbMC44NSwgMV0pfSlgLFxuICAgICAgICAgICAgb3BhY2l0eTogaW50ZXJwb2xhdGUoZnJhbWUsIFswLCA2XSwgWzAuMCwgMV0sIGNsYW1wKSxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPExvZ29HbHlwaCBzaXplPXtwb3J0cmFpdCA/IDY0IDogNjB9IC8+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZGF0YS1sYXllcj1cIndvcmRtYXJrXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGZvbnRGYW1pbHk6IEZPTlQsIGZvbnRTaXplOiBwb3J0cmFpdCA/IDQ0IDogNDAsIGZvbnRXZWlnaHQ6IDY1MCwgbGV0dGVyU3BhY2luZzogJy0wLjAxNWVtJywgY29sb3I6IFRFWFRfT05fTkFWWSB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIExlZGdlcmxpbmVcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGRhdGEtbGF5ZXI9XCJoZWFkbGluZVwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlQsXG4gICAgICAgICAgICBmb250U2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuMDIsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBgJHt0cmFja2luZ31lbWAsXG4gICAgICAgICAgICBjb2xvcjogVEVYVF9PTl9OQVZZLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIG1heFdpZHRoOiBwb3J0cmFpdCA/IDkwMCA6IDE2MDAsXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7aGVhZFl9cHgpYCxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6ICcwIDIwcHggNjBweCByZ2JhKDAsMCwwLDAuMzUpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgTGl2ZSB0b2RheSBmb3IgZXZlcnkgcGxhblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogcG9ydHJhaXQgPyA1MiA6IDQ0IH19PlxuICAgICAgICAgIDxBY2NlbnRMaW5lIHByb2dyZXNzPXtkcmF3fSB3aWR0aD17cG9ydHJhaXQgPyAzMDAgOiAzNjB9IHRoaWNrbmVzcz17Nn0gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IHBvcnRyYWl0ID8gNTYgOiA0OCxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgZ2FwOiAxNixcbiAgICAgICAgICAgIHBhZGRpbmc6IHBvcnRyYWl0ID8gJzIycHggNDBweCcgOiAnMjBweCAzOHB4JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogOTk5LFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMjU1LDI1NSwyNTUsMC4wNiknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4xNiknLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAyNHB4IDYwcHggLTIwcHggcmdiYSgwLDAsMCwwLjYpLCBpbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsMC4xMiknLFxuICAgICAgICAgICAgb3BhY2l0eTogdXJsT3BhY2l0eSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHtpbnRlcnBvbGF0ZSh1cmxJbiwgWzAsIDFdLCBbMjYsIDBdKX1weCkgc2NhbGUoJHtpbnRlcnBvbGF0ZSh1cmxJbiwgWzAsIDFdLCBbMC45NCwgMV0pfSlgLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICB3aWR0aDogMTQsXG4gICAgICAgICAgICAgIGhlaWdodDogMTQsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IExJTUUsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCAkezggKyBwdWxzZSAqIDE0fXB4IHJnYmEoMjAwLDI0NSw2MCwkezAuNSArIHB1bHNlICogMC40fSlgLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBkYXRhLWxheWVyPVwidXJsXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGZvbnRGYW1pbHk6IEZPTlQsIGZvbnRTaXplOiBwb3J0cmFpdCA/IDQyIDogNDAsIGZvbnRXZWlnaHQ6IDYwMCwgbGV0dGVyU3BhY2luZzogJy0wLjAxZW0nLCBjb2xvcjogVEVYVF9PTl9OQVZZIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgbGVkZ2VybGluZS5hcHBcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIj5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNiAxMiBIMTggTTEzIDcgTDE4IDEyIEwxMyAxN1wiIHN0cm9rZT17TElNRX0gc3Ryb2tlV2lkdGg9XCIyLjRcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NhZmVCb3g+XG4gICAgPC9BYnNvbHV0ZUZpbGw+XG4gICk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFJvb3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBWaWRlbygpIHtcbiAgY29uc3QgbGF5b3V0ID0gdXNlTGF5b3V0KCk7XG4gIGNvbnN0IFtzMSwgczIsIHMzXSA9IGNvbXBvc2l0aW9uLnNob3RzO1xuXG4gIHJldHVybiAoXG4gICAgPEFic29sdXRlRmlsbCBzdHlsZT17eyBiYWNrZ3JvdW5kOiBOQVZZX0RFRVAsIGZvbnRGYW1pbHk6IEZPTlQgfX0+XG4gICAgICA8QmFja2dyb3VuZCBsYXlvdXQ9e2xheW91dH0gLz5cbiAgICAgIDxTZXF1ZW5jZSBmcm9tPXtzMS5mcm9tfSBkdXJhdGlvbkluRnJhbWVzPXtzMS5kdXJhdGlvbkluRnJhbWVzfSBuYW1lPVwiU2hvdCAxIFx1MDBCNyBIb29rXCI+XG4gICAgICAgIDxTaG90SG9vayBsYXlvdXQ9e2xheW91dH0gLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czIuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czIuZHVyYXRpb25JbkZyYW1lc30gbmFtZT1cIlNob3QgMiBcdTAwQjcgUHJvb2ZcIj5cbiAgICAgICAgPFNob3RQcm9vZiBsYXlvdXQ9e2xheW91dH0gLz5cbiAgICAgIDwvU2VxdWVuY2U+XG4gICAgICA8U2VxdWVuY2UgZnJvbT17czMuZnJvbX0gZHVyYXRpb25JbkZyYW1lcz17czMuZHVyYXRpb25JbkZyYW1lc30gbmFtZT1cIlNob3QgMyBcdTAwQjcgQ2FsbCB0byBhY3Rpb25cIj5cbiAgICAgICAgPFNob3RDVEEgbGF5b3V0PXtsYXlvdXR9IC8+XG4gICAgICA8L1NlcXVlbmNlPlxuICAgIDwvQWJzb2x1dGVGaWxsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLFdBQU8sVUFBVSxXQUFXLGlCQUFpQixVQUFVO0FBQUE7QUFBQTs7O0FDQXZEO0FBQUE7QUFBQSxXQUFPLFVBQVUsV0FBVyxpQkFBaUIsbUJBQW1CO0FBQUE7QUFBQTs7O0FDQ2hFLHNCQVFPO0FBd0VMO0FBbEVGLElBQU0sTUFBTTtBQUVMLElBQU0sY0FBYztBQUFBLEVBQ3pCLEtBQUs7QUFBQSxFQUNMLGtCQUFrQjtBQUFBLEVBQ2xCLE9BQU87QUFBQSxJQUNMLEVBQUUsR0FBRyxHQUFHLE9BQU8sUUFBUSxNQUFNLEdBQUcsa0JBQWtCLEdBQUc7QUFBQSxJQUNyRCxFQUFFLEdBQUcsR0FBRyxPQUFPLFNBQVMsTUFBTSxJQUFJLGtCQUFrQixJQUFJO0FBQUEsSUFDeEQsRUFBRSxHQUFHLEdBQUcsT0FBTyxrQkFBa0IsTUFBTSxLQUFLLGtCQUFrQixHQUFHO0FBQUEsRUFDbkU7QUFDRjtBQU1BLElBQU0sT0FBTztBQUNiLElBQU0sT0FBTztBQUViLElBQU0sWUFBWTtB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
