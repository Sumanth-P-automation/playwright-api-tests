# Playwright + TypeScript API Automation & SQL Validation Suite

Automated API and database data-integrity test suite built with **Playwright**, **TypeScript**, and **GitHub Actions** CI/CD pipelines.

## 🚀 Key Features
- **Full REST API CRUD Coverage:** Automated GET, POST, PUT, and DELETE endpoint assertions.
- **Data Contract & Payload Assertions:** Status code checks, JSON schema validation, and header assertions.
- **SQL Data-Integrity Validations:** Relational database checks including record counts, NULL foreign keys, orphan records, and duplicate filtering.
- **Risk-Based Tagging:** Categorized test execution using `@smoke`, `@critical`, and `@negative` tags.
- **CI/CD Quality Gate:** Staged GitHub Actions pipeline executing `@smoke` tests as a quality gate prior to running the full regression suite.

## 🏷️ Test Tagging Convention
- `@smoke`: Fast, critical-path API health checks (executed first in CI).
- `@critical`: Core business workflows and CRUD operations.
- `@negative`: Client error handling, 404 responses, and malformed payload validations.

## 🛠️ Local Execution
```bash
# Install dependencies
npm ci

# Run all tests
npm test

# Run specific tag suites
npm run test:smoke
npm run test:critical
npm run test:negative
