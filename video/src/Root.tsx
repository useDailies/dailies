import React from 'react';
import { Composition, continueRender, delayRender, staticFile } from 'remotion';
import { Ad } from './Ad';
import { FPS, TOTAL } from './timeline';
import { WALKTHROUGH_FRAMES, Walkthrough } from './Walkthrough';

const FONTS: [string, string, string][] = [
  ['Bricolage', 'bricolage-600.ttf', '600'],
  ['Bricolage', 'bricolage-700.ttf', '700'],
  ['Bricolage', 'bricolage-800.ttf', '800'],
  ['Geist', 'geist-400.ttf', '400'],
  ['Geist', 'geist-500.ttf', '500'],
  ['Geist', 'geist-600.ttf', '600'],
  ['Geist Mono', 'geistmono-400.ttf', '400'],
  ['Geist Mono', 'geistmono-500.ttf', '500'],
];
const handle = delayRender('fonts');
Promise.all(
  FONTS.map(([family, file, weight]) =>
    new FontFace(family, `url(${staticFile(`fonts/${file}`)})`, { weight }).load().then((f) => {
      document.fonts.add(f);
    }),
  ),
).then(() => continueRender(handle));

export const Root = () => (
  <>
    <Composition id="Ad" component={Ad} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} />
    <Composition id="Walkthrough" component={Walkthrough} durationInFrames={WALKTHROUGH_FRAMES} fps={30} width={1920} height={1080} />
  </>
);
