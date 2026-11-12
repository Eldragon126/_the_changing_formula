#!/bin/sh
# Idempotent preview boot. Healthy server → exit 0. Otherwise start npm run dev.
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
nohup npm run dev > /tmp/lifequest-dev.log 2>&1 &
exit 0
