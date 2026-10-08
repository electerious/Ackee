# Agent notes

- `npm run build` only generates environment-specific HTML/custom tracker. After UI or tracker changes, run `npm run build:pre`; JS/CSS/tracker bundles in `dist/` are tracked. Never edit bundles by hand.
- Tracker source lives in external `ackee-tracker` package, not this repo.
- UI uses React `createElement as h`, not JSX; build disables Babel. `src/types/` contains GraphQL schemas, not TypeScript.
- `src/utils/config.js` reads env variables lazily so tests can mock them. Don't replace it with import-time constants.
- Keep API behavior aligned between `src/server.js` (Express) and `src/serverless.js` (Netlify/Vercel), including CORS, headers, and request context.
- Compose protected resolvers with `pipe(requireAuth, ...)`; add `blockDemoMode` for domain/event/permanent-token writes. Tracking mutations stay public and work in demo mode. Use `KnownError` for expected user-facing failures.
- Preserve privacy: salted client IDs rotate daily; new records anonymize older records for that client. Never persist raw IPs/user agents or expose client IDs.
- Ignored visits/actions return success without writes; creation returns sentinel UUID `88888888-8888-8888-8888-888888888888`. Keep this tracker contract.
- `npm test` includes lint + AVA; `npx ava test/path.js` runs focused tests. Tests need Node 24.12+ or 26+ and start in-memory MongoDB; no separate DB needed.
- Reuse test helpers and serial tests for shared DB/env state. Teardown must stop MongoDB, close server, and cancel salt job to avoid hanging tests.
