# Claude Project Guide (CLAUDE.MD)

## Development Workflow

### Commands
- **Install Dependencies:** `npm install`
- **Run Dev Server:** `npm run dev` (Vite)
- **Build Project:** `npm run build`
- **Run Unit Tests:** `npm test` (Vitest)
- **Run E2E Tests:** `npm run test:e2e` (Playwright). Use `--reporter=line` to prevent shell freezes.
- **Preview Build:** `npm run preview`

### Tests & Documentation Mandatory
- **Always Pass:** All changes MUST pass `npm test`, `npm run test:e2e`, and `npm run build` before completion.
- **Successful Build:** The project must always be buildable with no TypeScript errors or Vite errors.
- **Coverage:** 
  - New utilities or logic must have unit tests in `src/utils/` or `src/data/`.
  - New UI components or interactions must have E2E tests in `tests/`.
  - Fixes for bugs must include a regression test.
- **Documentation:** Always keep `README.MD` updated with every change, alongside the tests.
- **Verification:** Run `npm run test:e2e` after any map or interaction change to ensure markers and popups still function correctly.

## Codebase Structure
- `src/main.ts`: Entry point, map initialization.
- `src/utils/mapUtils.ts`: CRS and bounds logic.
- `src/utils/MarkerManager.ts`: Handles marker creation and layer management.
- `src/utils/LayerSidebar.ts`: Custom sidebar UI for category filtering.
- `src/js/`: Custom Leaflet plugins (mouse position, hash).
- `src/data/`: Static data (markers categorized).
- `public/images/`: Map tiles and marker icons.
  - Tiles are organized by zoom level: `/images/{z}/{x}/{y}.png`.
  - Markers are in `/images/markers/marker_{id}.png`.

## Core Logic: CRS
The project uses a custom Coordinate Reference System (CRS) to map pixel coordinates to the GTA 5 map grid.
The transformation is defined in `src/utils/mapUtils.ts` and used in `src/main.ts`.
