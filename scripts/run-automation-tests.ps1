# Runs full Copilot Studio automation suite: frontend, backend, and E2E.
$ErrorActionPreference = "Stop"

Write-Host "==> Frontend unit tests"
Push-Location "$PSScriptRoot\..\frontend"
npm run test:run
Pop-Location

Write-Host "==> Backend unit tests"
Push-Location "$PSScriptRoot\..\backend"
.\.venv\Scripts\pytest
Pop-Location

Write-Host "==> Playwright E2E tests"
Push-Location "$PSScriptRoot\.."
npm run test:e2e
Pop-Location

Write-Host "All automation tests completed."
