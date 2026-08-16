# First Aid Scanner

A cross-platform first-aid companion that captures a wound image, presents basic guidance, and keeps a local history. It is not a diagnostic tool and must not replace professional medical care.

## Features

- Capture a wound image with the device camera.
- Display basic first-aid guidance and safety notices.
- Browse scan history and a first-aid guide.
- Run as an Expo mobile or web application with an optional Node.js API service.

## Technology

- Expo and React Native
- Expo Router
- TypeScript
- Express and tRPC
- Drizzle ORM with MySQL support

## Requirements

- Node.js 20 or later
- pnpm 9
- Expo Go, an Android/iOS simulator, or a modern browser
- MySQL only when enabling database-backed server features

## Getting Started

```bash
git clone https://github.com/betauzi/first-aid-scanner.git
cd first-aid-scanner
pnpm install
Copy-Item .env.example .env
pnpm dev
```

The development command starts the API server and Expo web development server. Follow the Expo terminal output to open the app on web or a connected device.

## Available Commands

```bash
pnpm dev
pnpm dev:server
pnpm dev:metro
pnpm check
pnpm lint
pnpm test
pnpm db:push
pnpm android
pnpm ios
```

## Configuration

Copy `.env.example` to `.env` and set only the integrations you use. `DATABASE_URL` and `JWT_SECRET` are server-side secrets. Variables beginning with `EXPO_PUBLIC_` are embedded in the client build, so they must never contain secrets.

## Project Structure

```text
app/                  Expo Router screens
components/           Shared UI components
constants/            Client configuration helpers
server/               Express API and server services
drizzle/              Database schema and migrations
assets/               Images and application assets
```

## Security Notes

Keep `.env` private and rotate any credential that is exposed. Treat captured images as sensitive health-related data: obtain consent, minimize retention, and use access controls before deploying any backend.

## License

No license has been declared for this repository. Add a `LICENSE` file before distributing or accepting external contributions.
