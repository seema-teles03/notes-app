# Notes App
This repository contains a small React + TypeScript notes application.

## Features
- Display notes in a responsive grid
- Create, edit, delete notes via API calls
- Search/filter notes by title/content
- Optimistic updates using React Query
- Loading and error states
- Test written for NoteCard

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- React Query for data management & optimistic updates
- Axios for HTTP
- json-server for mock REST API
- Vitest + jsdom(test environment) + React Testing Library 

## Run locally
1. Install dependencies: `npm install`
2. Start dev servers: `npm run dev` (starts json-server on port 4000 and Vite on 5173)
3. Open: `http://localhost:5173`

## API
json-server serves data from `db.json` with standard REST endpoints at `http://localhost:4000/notes`.

## Notes on choices
- React Query used to centralize API handling, caching, retry and optimistic updates. This makes UI reduces boilerplate around loading/error states.
- Tailwind for fast, composable styling and responsive layout.
- json-server keeps backend simple to run for review

## Potential improvements
- Added pagination and infinite scroll for very large note sets.
- Extract modal into reusable component; add focus trap & a11y improvements.
- validations added foe empty fields

## Tests
- Run: `npm test`
