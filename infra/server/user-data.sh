#!/bin/bash
# Provisions the hosted dailies server (Ubuntu 24.04, x86_64): Node 22, Google Chrome,
# Kane CLI, AWS CLI, an unprivileged `dailies` user and the systemd service.
# The app itself is installed/updated by /usr/local/bin/dailies-deploy (infra/server/deploy.sh).
set -euxo pipefail
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y curl ca-certificates unzip jq fonts-liberation fonts-dejavu-core fonts-noto-core fonts-noto-color-emoji
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
curl -fsSL -o /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -y /tmp/chrome.deb
curl -fsSL -o /tmp/awscli.zip https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip
unzip -q -o /tmp/awscli.zip -d /tmp && /tmp/aws/install --update
npm i -g @testmuai/kane-cli@0.10.5
id dailies || useradd -m -s /bin/bash dailies
mkdir -p /var/lib/dailies/workspaces /var/lib/dailies/data /opt/dailies
chown -R dailies:dailies /var/lib/dailies /opt/dailies
aws s3 cp s3://__BUCKET__/_deploy/server/deploy.sh /usr/local/bin/dailies-deploy --region us-east-1
chmod +x /usr/local/bin/dailies-deploy
BUCKET=__BUCKET__ PUBLIC_URL=__PUBLIC_URL__ /usr/local/bin/dailies-deploy > /var/log/dailies-deploy.log 2>&1
