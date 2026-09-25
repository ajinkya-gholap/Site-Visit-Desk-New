# Site Visit Desk

A small React app for raising and tracking "site visit" requests (like a mini
help-desk). This version is written in a **beginner-friendly** style:

- Plain function components only (no classes, no TypeScript)
- No `useMemo` / `useCallback` — values are just recalculated on each render
- No React portals — the modal and toast notifications are rendered directly
  in the normal component tree, positioned with plain CSS (`position: fixed`)
- No code-splitting / lazy loading — every component is imported normally
- CSS Modules for styling (one `*.module.css` file per component)
- A `useRef` is used in exactly one place — to set the native `indeterminate`
  property on the "Select all" checkbox, since that can't be done with a prop

## What it does

- **New site visit request** form (left column) — validates every field,
  shows inline errors, and narrows the "Assigned engineer" list based on the
  chosen category.
- **Request queue** (right column) — search, filter by status/severity, sort,
  and act on each request (assign → close, copy ID, delete, view details).
- **Analytics panel** — a simple bar chart of requests by category and a
  severity breakdown, toggled open/closed.
- **Light/dark theme toggle**, remembered in `localStorage`.
- **Toast notifications** for success/error feedback.

The "server" is faked in `src/api/mockApi.js` — it just waits a bit and then
returns data from `src/data/mockRequests.js` (or randomly throws an error, so
you can see the error state).

## Getting started

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/            fake network calls
  components/     one folder per UI piece (Header, RequestForm, Queue, Modal, Toast, Analytics)
  data/           static lists (categories, engineers, seed requests)
  hooks/          small reusable pieces of stateful logic (theme, toasts)
  styles/         global CSS + design tokens (colors, spacing, fonts)
  utils/          small helper functions (class name joining, form validation)
  App.jsx         puts all the pieces together
  main.jsx        starting point that renders <App /> into the page
```
