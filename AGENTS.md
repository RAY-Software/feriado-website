# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Feriado Cantina is a Next.js 16 restaurant website (single app, not a monorepo) for an Argentine cantina in Buenos Aires (Av. Cabildo 3702, Coghlan). It uses the App Router, React 19, Tailwind CSS v4, and connects to an external Rayapp API for reservations.

### Prerequisites

- **Node.js 20** is required (set via `nvm use 20`; the VM snapshot already has it installed and set as default).
- npm is the package manager; use `npm install --legacy-peer-deps` due to peer dependency conflicts.

### Environment variables

A `.env` file must exist with at least these three **required** variables (the app's API routes throw without them):

| Variable | Purpose |
|---|---|
| `RAYAPP_API_BASE_URL` | Rayapp reservations API base URL |
| `RAYAPP_COMPANY_ID` | Numeric company ID in Rayapp |
| `RAYAPP_COMPANY_NAME` | Company name in Rayapp |

Optional: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `N8N_WEBHOOK_URL`, `ZAPIER_BOOKING_WEBHOOK_URL`. The app loads and navigates fine without them; only specific features (maps, analytics, chat widget) degrade.

The `rayappConfig` getter in `lib/rayapp-config.ts` only throws when accessed (in `/api/booking/*` routes), so the homepage and all static pages render without real credentials.

### Common commands

See `package.json` scripts:
- **Dev server:** `npm run dev` (port 3000)
- **Lint:** `npm run lint` (runs `eslint`; pre-existing warnings/errors exist in the codebase)
- **Build:** `npm run build` (has a pre-existing `/_global-error` prerender failure; dev server is unaffected)

### Gotchas

- `npm run build` fails with a `TypeError: Cannot read properties of null (reading 'useContext')` during prerender of `/_global-error`. This is a pre-existing issue and does **not** affect `npm run dev`.
- The project uses `--legacy-peer-deps` for npm install (React 19 peer dependency conflicts).
- No automated test suite exists — there are no test scripts or test frameworks configured.
- No local database is needed; all persistent data comes from external APIs or is hardcoded in `lib/`.
