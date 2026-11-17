import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import * as Remotion from 'remotion';

/**
 * Compositions are compiled on the server with bare imports rewritten to this
 * registry, so they share the exact React and Remotion instances the Player
 * uses (two Reacts in one tree would break hooks).
 */
declare global {
  // eslint-disable-next-line no-var
  var __DAILIES_DEPS__: Record<string, unknown>;
}

globalThis.__DAILIES_DEPS__ = {
  react: React,
  'react/jsx-runtime': jsxRuntime,
  'react/jsx-dev-runtime': jsxRuntime,
  remotion: Remotion,
};
