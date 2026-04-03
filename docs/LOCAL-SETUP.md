# Local Development Setup

## Prerequisites
- Node.js 18+ and npm
- Docker Desktop (for local CMS)
- Git

## Quick Start (Frontend Only — No CMS)
```bash
npm install
npm run dev
# Visit http://localhost:3000
```
This uses static data from `src/data/` as fallback. Good for frontend development.

## Full Stack (Frontend + Drupal CMS)

### 1. Start Drupal + MySQL
```bash
docker compose up -d
```
This starts:
- MySQL 8.0 on port 3306
- Drupal with auto-install on port 8080

The entrypoint script automatically:
- Waits for MySQL to be ready
- Installs Drupal (if first run)
- Enables required modules (field, node, jsonapi, serialization, rest)
- Rebuilds caches

### 2. Seed Content
```bash
bash scripts/seed-local.sh
```
This seeds:
- Content model (content types, fields, taxonomies)
- 3 solution areas (EngageOS, InsightLens, PropelEdge)
- Differentiators, proof points, case studies, pod roles

### 3. Enable CMS Mode
Edit `.env.local`:
```
NEXT_PUBLIC_USE_CMS=true
NEXT_PUBLIC_DRUPAL_BASE_URL=http://localhost:8080
```

### 4. Start Frontend
```bash
npm run dev
# Visit http://localhost:3000
```

### 5. Drupal Admin
Visit http://localhost:8080/user/login
- Username: `admin`
- Password: `admin`

## Running Tests
```bash
npm run build          # Build first (required for Playwright)
npm test               # Run all tests
npm run test:smoke     # Smoke tests only
npm run test:perf      # Performance tests only
npm run test:report    # View HTML test report
```

## Stopping Services
```bash
docker compose down        # Stop containers (data persists)
docker compose down -v     # Stop + delete all data (fresh start)
```

## Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_USE_CMS` | `false` | Enable Drupal CMS content |
| `NEXT_PUBLIC_DRUPAL_BASE_URL` | `http://localhost:8080` | Drupal API URL |
| `NEXT_PUBLIC_GA_ID` | — | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_HUBSPOT_ID` | — | HubSpot portal ID for tracking |
| `SITE_URL` | `http://localhost:3000` | Site URL for sitemap generation |
