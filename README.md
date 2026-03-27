# Expo Todo App

A simple and polished todo app built with Expo and React Native.

The app helps you quickly capture tasks, track progress, and stay focused with a lightweight interface.

## Project overview

This project is a mobile-first todo list application with local persistence. Todos are saved on-device using AsyncStorage, so your data remains available after app restarts.

## Features

- Add new tasks
- Mark tasks as done or active
- Delete tasks
- Filter tasks by status: All, Active, Done
- View quick stats: Total, Left, Done
- Persist todos locally with AsyncStorage
- Modern, high-contrast UI for readability

## Tech stack

- Expo
- React Native
- TypeScript
- Expo Router
- AsyncStorage
- Expo Vector Icons

## Demo images

Store README screenshots in `docs/screenshots/` so they stay separate from runtime app assets.

<img src="./docs/screenshots/Screenshot_20260328_012847.png" alt="Home screen" width="220" />
<p><em>Version 1</em></p>

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the Expo development server

   ```bash
   npm run start
   ```

3. Run on your preferred platform

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Project structure

```text
app/
  _layout.tsx
  index.tsx
assets/
  images/
docs/
  screenshots/
```

## Notes

- Todo data is stored locally under the AsyncStorage key `@expo-todo/todos`.
- Screenshots used in this README live in `docs/screenshots/` to avoid mixing docs assets with runtime app assets.
