# react_native_expo

A collection of React Native / Expo projects, each exploring a different stack and feature set — from local-only state to online databases, custom backends, and auth.

## Projects

| Project | Description | Stack |
| --- | --- | --- |
| [`convex-todo`](./convex-todo) | A todo app built in two versions: v1 uses local `AsyncStorage`, v2 adds a Convex-backed online database, tabbed navigation, inline editing, and dark mode | Expo, React Native, TypeScript, Expo Router, Convex |
| [`expenso`](./expenso) | An expense tracker with a custom backend for transactions and summaries, and a mobile app with Clerk authentication | Expo, React Native, TypeScript, Expo Router, Clerk, Express, Neon (serverless Postgres), Upstash Redis (rate limiting), Bun |
| [`subly`](./subly/subly-mobile) | A subscription tracker/manager showing upcoming renewals, balances, and per-subscription details | Expo, React Native, TypeScript, Expo Router, NativeWind (Tailwind), Zustand, Clerk |

Each project is self-contained with its own `package.json`, dependencies, and README — see the links above for project-specific setup notes.

## General setup

Each project follows the standard Expo workflow:

```bash
cd <project-folder>
npm install      # or bun install / pnpm install, depending on the project's lockfile
npx expo start
```

From the Expo CLI output you can launch the app in:

- a development build
- an Android emulator
- an iOS simulator
- [Expo Go](https://expo.dev/go)

### Project-specific notes

- **convex-todo**: run `npx convex dev` in a separate terminal before `npm run start` to bring up the v2 backend.
- **expenso**: the `backend` folder is a standalone Bun + Express API (`bun install` then `bun run index.ts`) backed by Neon Postgres, with Upstash-based rate limiting. It expects `DB_URL` (Neon connection string) and related env vars in a `.env` file. The `mobile` folder is the Expo client and expects Clerk publishable keys configured for auth.
- **subly**: uses NativeWind (Tailwind for React Native) and Zustand for local state; also expects Clerk keys for auth.

## Tech stack overview

- **Framework**: Expo (Expo Router, file-based navigation) + React Native
- **Language**: TypeScript throughout
- **Auth**: Clerk (`expenso`, `subly`)
- **Data layer**: Convex (`convex-todo`), Neon serverless Postgres via a custom Express API (`expenso`)
- **Styling**: NativeWind/Tailwind (`subly`), custom themed components elsewhere
- **State management**: Zustand (`subly`), React state/AsyncStorage/Convex hooks elsewhere
