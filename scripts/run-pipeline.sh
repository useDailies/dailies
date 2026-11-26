#!/usr/bin/env bash
# Run the whole dailies pipeline from the terminal against a running server.
#   scripts/run-pipeline.sh [storyboard.md] [--seal]
# Default storyboard: the demo spot. Prints each stage's outcome and Kane's rounds.
set -euo pipefail
API=${DAILIES_API_URL:-http://127.0.0.1:4100}/api/projects
SB=${1:-}
SEAL=0; [[ "${2:-}" == "--seal" || "${1:-}" == "--seal" ]] && SEAL=1
if [[ -z "$SB" || "$SB" == "--seal" ]]; then
  BODY=$(npx -y tsx -e "import { DEMO_STORYBOARD } from './apps/studio/src/lib/templates.ts'; process.stdout.write(JSON.stringify({ storyboard: DEMO_STORYBOARD }))")
else
  BODY=$(node -e "process.stdout.write(JSON.stringify({ storyboard: require('fs').readFileSync(process.argv[1],'utf8') }))" "$SB")
fi
ID=$(curl -fsS -X POST "$API" -H 'content-type: application/json' -d "$BODY" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).id))")
echo "project $ID  →  http://localhost:5173/p/$ID"
idle() { sleep 3; until curl -fsS "$API/$ID" | grep -q '"busy": *null'; do sleep 5; done; }
summary() { curl -fsS "$API/$ID" | node -e "
let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const p=JSON.parse(s);
console.log('$1', p.phase, p.error??'', 'versions', p.versions.length, 'criteria', p.plan?.criteria.length??0);
for (const r of p.rounds) console.log('  ', r.id, r.kind.padEnd(10), 'v'+r.version, r.results.filter(x=>x.verdict==='pass').length+'/'+r.results.length, r.credits.toFixed(1)+' cr', r.calls+' calls', Math.round(r.durationMs/1000)+'s');
if (p.seal) { console.log('  seal', p.seal.tests.map(t=>t.id+':'+t.status).join(' ')); }
console.log('  credits', JSON.stringify(p.credits), 'claude $'+p.claude.costUsd.toFixed(2));})"; }
curl -fsS -X POST "$API/$ID/draft" -H 'content-type: application/json' -d '{}' >/dev/null; idle; summary draft
curl -fsS -X POST "$API/$ID/review" -H 'content-type: application/json' -d '{}' >/dev/null; idle; summary review
if [[ $SEAL == 1 ]]; then curl -fsS -X POST "$API/$ID/seal" -H 'content-type: application/json' -d '{}' >/dev/null; idle; summary seal; fi
