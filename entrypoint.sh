#!/bin/bash
set -e

case "$1" in
  run)
    echo "👉 Running Playwright tests..."
    npx playwright test --project=chromium --reporter=line,allure-playwright --output="$ALLURE_RESULTS_DIR"
    ;;
  report)
    echo "👉 Generating Allure report..."
    allure generate "$ALLURE_RESULTS_DIR" --clean -o "$ALLURE_REPORT_DIR"
    ;;
  open)
    echo "👉 Serving Allure report at http://localhost:$PORT ..."
    http-server "$ALLURE_REPORT_DIR" -p "$PORT" -c-1
    ;;
  *)
    echo "Usage: {run|report|open}"
    exit 1
    ;;
esac
