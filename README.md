# DevOps Backend

## Purpose & Technologies

A simple REST API built with Node.js and Express, created as part of a DevOps
project to demonstrate CI/CD deployment to an Ubuntu VPS.

## Endpoints

- `GET /` – confirms the app is running
- `GET /api/health` – health check endpoint, used by the CI/CD pipeline
- `GET /api/info` – returns application metadata (name, version, environment)

## Running Locally

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and adjust values if needed
3. Start the server: `node server.js`
4. Visit `http://localhost:3000`

## Environment Variables

See `.env.example` for the full list. Key variables:

- `PORT` – port the app listens on
- `NODE_ENV` – `development` or `production`
- `APP_VERSION` – current application version

## Deployment

This application is automatically deployed via GitHub Actions on every push
to the `main` branch. The workflow (`.github/workflows/deploy.yml`):

1. Checks out the code
2. Removes git metadata (not needed on the server)
3. Installs Node.js and production dependencies
4. Copies the code to the server via SCP
5. Installs production dependencies on the server
6. Restarts the app via PM2 (`pm2 restart backend-app`)
7. Runs a health check against `/api/health`

The server runs Nginx as a reverse proxy in front of the app (listening on
`127.0.0.1:3000`), with HTTPS handled via Let's Encrypt (Certbot).

## Live Domain

https://muhammet-backend.team-vit-devops.nl
