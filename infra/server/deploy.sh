#!/bin/bash
# Installs or updates the dailies server from s3://$BUCKET/_deploy/server/app.tgz.
#   sudo BUCKET=dailies-site-<account> dailies-deploy
set -euo pipefail
BUCKET=${BUCKET:?set BUCKET}
REGION=${REGION:-us-east-1}
PUBLIC_URL=${PUBLIC_URL:?set PUBLIC_URL}
param() { aws ssm get-parameter --region "$REGION" --name "/dailies/$1" --with-decryption --query Parameter.Value --output text 2>/dev/null || true; }
KANE_U=$(param KANE_USERNAME); KANE_K=$(param KANE_ACCESS_KEY)

aws s3 cp "s3://$BUCKET/_deploy/server/app.tgz" /tmp/dailies-app.tgz --region "$REGION"
rm -rf /opt/dailies.next && mkdir -p /opt/dailies.next
tar -xzf /tmp/dailies-app.tgz -C /opt/dailies.next
ln -sfn /var/lib/dailies/workspaces /opt/dailies.next/workspaces
if [ -n "$KANE_U" ] && [ -n "$KANE_K" ]; then
  printf 'KANE_USERNAME=%s\nKANE_ACCESS_KEY=%s\n' "$KANE_U" "$KANE_K" > /opt/dailies.next/.env
else
  echo "warning: /dailies/KANE_USERNAME or /dailies/KANE_ACCESS_KEY missing in SSM; starting without Kane CLI" >&2
  : > /opt/dailies.next/.env
fi
chmod 600 /opt/dailies.next/.env
chown -R dailies:dailies /opt/dailies.next
cd /opt/dailies.next
sudo -u dailies -H npm ci --no-audit --no-fund
sudo -u dailies -H npx vite build apps/studio --outDir "$PWD/dist-studio" --emptyOutDir

# Kane CLI login for the service user (basic auth, no prompts).
if [ -n "$KANE_U" ] && [ -n "$KANE_K" ]; then
  sudo -u dailies -H kane-cli login --username "$KANE_U" --access-key "$KANE_K" \
    --project-id "$(param KANE_PROJECT_ID)" --folder-id "$(param KANE_FOLDER_ID)" </dev/null >/dev/null || echo "warning: kane-cli login failed" >&2
fi

# Warm Kane CLI's runner once, alone: its first run unpacks a ~326 MB binary into
# ~/.cache/v16-runner/<version>/, and parallel first runs crash on the half-written file.
if [ -n "$KANE_U" ] && [ ! -x "/home/dailies/.cache/v16-runner/$(kane-cli --version 2>/dev/null | tail -1)/v16-runner.bin" ]; then
  sudo -u dailies -H bash -c '
    google-chrome --headless=new --no-sandbox --remote-debugging-port=9599 --user-data-dir=/tmp/kane-warm about:blank >/dev/null 2>&1 & C=$!
    sleep 3
    cd /tmp && kane-cli run --analyzer-only --agent --cdp-endpoint http://127.0.0.1:9599 --timeout 120 --condition "The page is blank" >/dev/null 2>&1 || true
    kill $C 2>/dev/null; rm -rf /tmp/kane-warm' || true
fi

cat > /etc/systemd/system/dailies.service <<UNIT
[Unit]
Description=dailies (accounts, MCP API, Kane CLI judging)
After=network-online.target
Wants=network-online.target

[Service]
User=dailies
WorkingDirectory=/opt/dailies/apps/server
Environment=NODE_ENV=production
Environment=DAILIES_PORT=8080
Environment=DAILIES_HOST=0.0.0.0
Environment=DAILIES_STUDIO_DIST=/opt/dailies/dist-studio
Environment=DAILIES_STUDIO_URL=http://127.0.0.1:8080
Environment=DAILIES_PUBLIC_URL=$PUBLIC_URL
Environment=DAILIES_DATA=/var/lib/dailies/data
Environment=DAILIES_DRAFTING=0
Environment=DAILIES_CHROME_NO_SANDBOX=1
Environment=CHROME_PATH=/usr/bin/google-chrome
ExecStart=/usr/bin/npx tsx src/index.ts
Restart=always
RestartSec=3
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=false
ReadWritePaths=/var/lib/dailies /home/dailies /opt/dailies /tmp

[Install]
WantedBy=multi-user.target
UNIT

systemctl stop dailies 2>/dev/null || true
rm -rf /opt/dailies.prev && { [ -d /opt/dailies ] && mv /opt/dailies /opt/dailies.prev || true; }
mv /opt/dailies.next /opt/dailies
systemctl daemon-reload
systemctl enable --now dailies
for i in $(seq 1 60); do curl -fsS http://127.0.0.1:8080/api/health >/dev/null && break; sleep 2; done
curl -fsS http://127.0.0.1:8080/api/health | head -c 400; echo
