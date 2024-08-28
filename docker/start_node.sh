#!/bin/bash
echo "run migrations"
npm run migrations:run

echo "start node"
pm2-runtime start dist/main.js
