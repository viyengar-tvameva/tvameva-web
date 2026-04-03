@echo off
REM =============================================================================
REM seed-local.cmd — One-command local Drupal content seeding (Windows)
REM
REM Prerequisites: docker compose up (Drupal + MySQL running on port 8080)
REM
REM Usage:
REM   scripts\seed-local.cmd
REM =============================================================================

set DRUPAL_CONTAINER=tvameva-drupal
set DRUPAL_URL=http://localhost:8080

echo === Tvameva Local Content Seed ===

echo.
echo Waiting for Drupal to be ready...
set /a attempts=0
:wait_loop
set /a attempts+=1
if %attempts% gtr 60 (
    echo ERROR: Drupal not ready after 60 attempts. Is docker compose up running?
    exit /b 1
)
curl -s -o nul -w "%%{http_code}" -H "Accept: application/vnd.api+json" "%DRUPAL_URL%/jsonapi" 2>nul | findstr "200" >nul
if errorlevel 1 (
    echo   Attempt %attempts%/60 — waiting 3s...
    timeout /t 3 /nobreak >nul
    goto wait_loop
)
echo Drupal is ready.

echo.
echo --- Copying scripts to container ---
docker cp src\utils\setup-content-model.php %DRUPAL_CONTAINER%:/tmp/setup-content-model.php
docker cp scripts\drupal-seed-solution.php %DRUPAL_CONTAINER%:/tmp/seed.php
docker cp scripts\seed-content.php %DRUPAL_CONTAINER%:/tmp/seed-content.php

echo.
echo --- Setting up content model ---
docker exec %DRUPAL_CONTAINER% bash -c "cd /opt/drupal/web && php /tmp/setup-content-model.php"

echo.
echo --- Seeding solution areas ---
for %%s in (engageos insightlens propeledge) do (
    echo   Extracting %%s...
    npx tsx scripts/extract-solution-json.ts %%s | docker exec -i %DRUPAL_CONTAINER% bash -c "cat > /tmp/%%s.json"
    echo   Seeding %%s...
    docker exec %DRUPAL_CONTAINER% bash -c "cd /opt/drupal/web && php /tmp/seed.php %%s"
)

echo.
echo --- Seeding global content ---
npx tsx scripts/extract-content-json.ts | docker exec -i %DRUPAL_CONTAINER% bash -c "cat > /tmp/content.json"
docker exec %DRUPAL_CONTAINER% bash -c "cd /opt/drupal/web && php /tmp/seed-content.php /tmp/content.json"

echo.
echo === LOCAL SEED COMPLETE ===
echo.
echo Next steps:
echo   1. Set NEXT_PUBLIC_USE_CMS=true in .env.local
echo   2. Run: npm run dev
echo   3. Visit: http://localhost:3000/solutions/propeledge
