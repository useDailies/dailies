#!/usr/bin/env bash
# Deploys the static replay studio (and optionally the film) to AWS.
#
#   scripts/deploy.sh               build + deploy the site
#   scripts/deploy.sh --film        also upload video/out/dailies-ad.mp4 to /media/
#
# Infra (created once): private S3 bucket dailies-site-<account> behind CloudFront
# (origin access control, SPA fallback), and the Lambda dailies-site-deployer
# (infra/deployer/deployer.py), which unpacks the bundle with correct
# Content-Type / Cache-Control, prunes stale files and invalidates CloudFront.
set -euo pipefail
cd "$(dirname "$0")/.."
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
BUCKET="dailies-site-$ACCOUNT"
DIST="${DAILIES_DISTRIBUTION:-E3DWARYQUZMCQV}"
SITE="https://$(aws cloudfront get-distribution --id "$DIST" --query Distribution.DomainName --output text)"
OUT=$(mktemp -d)

VITE_DAILIES_STATIC=1 VITE_FILM_URL=/media/dailies-ad.mp4 npx vite build apps/studio --outDir "$OUT/site" --emptyOutDir
# absolute Open Graph URLs
sed -i.bak "s#content=\"/brand/og-image.png\"#content=\"$SITE/brand/og-image.png\"#" "$OUT/site/index.html" && rm "$OUT/site/index.html.bak"
# never publish this machine's paths
if grep -rqI "$HOME" "$OUT/site"; then echo "refusing: $HOME found in the build" >&2; exit 1; fi

COPYFILE_DISABLE=1 tar -C "$OUT/site" -czf "$OUT/site.tgz" .   # no macOS ._ files
aws s3 cp "$OUT/site.tgz" "s3://$BUCKET/_deploy/site.tgz"
aws lambda invoke --function-name dailies-site-deployer --cli-read-timeout 900 \
  --payload "{\"bucket\":\"$BUCKET\",\"key\":\"_deploy/site.tgz\",\"distribution\":\"$DIST\"}" \
  --cli-binary-format raw-in-base64-out "$OUT/result.json" >/dev/null
cat "$OUT/result.json"; echo

if [[ "${1:-}" == "--film" ]]; then
  aws s3 cp video/out/dailies-ad.mp4 "s3://$BUCKET/media/dailies-ad.mp4" --content-type video/mp4 --cache-control "public, max-age=86400"
  aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/media/*" >/dev/null
fi
echo "live: $SITE"
