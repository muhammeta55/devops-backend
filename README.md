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

_To be documented once the CI/CD pipeline is set up._

## Live Domain

_To be added once assigned._
