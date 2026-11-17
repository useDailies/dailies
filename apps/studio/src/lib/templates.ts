export interface Template {
  id: string;
  name: string;
  blurb: string;
  body: string;
}

export const TEMPLATES: Template[] = [
  {
    id: 'kestrel',
    name: 'Product launch',
    blurb: 'Sneaker launch spot · 12s · three cuts · exact copy and platform safe zones',
    body: `# Kestrel Runner — launch spot

Length 12 seconds at 30 fps. Deliver three cuts: 16:9 (1920x1080), 9:16 (1080x1920), 1:1 (1080x1080).

## Shot 1 (0:00–0:03) Product hero
- A teal running shoe with an orange sole slides in from the left over a dark night-city background.
- The shoe is fully inside the frame by 0:01.
- Caption reads exactly: Run the city
- The caption is fully visible by 0:01.

## Shot 2 (0:03–0:07) Detail
- Close-up of the orange sole, same teal and orange colourway as shot 1.
- The KESTREL wordmark is absent at 0:03 and fully visible by 0:05.
- A price tag reads exactly: €149 and is visible at 0:04 and at 0:06.

## Shot 3 (0:07–0:12) Call to action
- Headline reads exactly: Out 28 November
- A button labelled exactly: Get early access, fully visible by 0:09.
- The KESTREL wordmark is visible throughout shot 3.

## Delivery rules
- On the 9:16 cut, no text or button sits in the bottom 35% or the top 14% of the frame.
- On the 9:16 cut, every piece of text is set at 48px or larger so it reads on a phone.
- On every cut, all text stays fully inside the frame.
`,
  },
  {
    id: 'feature',
    name: 'Feature announcement',
    blurb: 'SaaS changelog clip · 10s · a counter, a UI card and a CTA',
    body: `# Ledgerline — Instant Exports

Length 10 seconds at 30 fps. Deliver two cuts: 16:9 (1920x1080) and 9:16 (1080x1920).

## Shot 1 (0:00–0:03) Hook
- Title reads exactly: Exports in one click
- A dark navy background with a single lime accent line drawn left to right.

## Shot 2 (0:03–0:07) Proof
- A white app card shows a table with three rows and a lime "Export CSV" button.
- A counter reads 0 at 0:03 and reads exactly 10,000 rows by 0:06.

## Shot 3 (0:07–0:10) Call to action
- Text reads exactly: Live today for every plan
- The ledgerline.app URL is visible from 0:08 to the end.
- On the 9:16 cut, nothing sits in the bottom 35% of the frame.
`,
  },
  {
    id: 'event',
    name: 'Event promo',
    blurb: 'Conference teaser · 8s · square and vertical · kinetic type',
    body: `# Signal Conf 2027 — teaser

Length 8 seconds at 30 fps. Deliver two cuts: 1:1 (1080x1080) and 9:16 (1080x1920).

## Shot 1 (0:00–0:04) Kinetic title
- The words SIGNAL, CONF and 2027 appear one after another, each fully visible by 0:01, 0:02 and 0:03.
- Background is a deep violet gradient.

## Shot 2 (0:04–0:08) Details
- Date reads exactly: 14–15 March · Lisbon
- A pill-shaped button labelled exactly: Get tickets
- All text stays fully inside the frame on every cut.
`,
  },
];
