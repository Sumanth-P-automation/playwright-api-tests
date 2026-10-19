# Playwright + TypeScript API Automation & SQL Validation Suite

Automated API testing suite and SQL data-integrity validation framework built with **Playwright**, **TypeScript**, and **Python SQL Checkers**. Features a staged **GitHub Actions CI/CD pipeline** with quality gates and artifact reporting.

---

## 🛠️ Tech Stack & Key Tools

- **API Automation:** Playwright API (`@playwright/test`), TypeScript
- **Backend SQL Validation:** Python 3 (`sqlite3`), SQL (JOINs, GROUP BY, aggregations, NULL & orphan checks)
- **CI/CD Quality Gates:** GitHub Actions (Staged pipeline: Smoke Gate ➔ Full Regression ➔ SQL Data Integrity Checks)
- **Reporting:** Playwright HTML Reporter stored as CI build artifacts

---

## 📁 Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml      # Staged CI/CD Pipeline (Smoke -> Regression -> SQL Checks)
├── sql/
│   ├── validation_queries.sql  # SQL data-integrity queries (JOINs, NULL, count validation)
│   └── validate_data.py        # Python automated SQL runner & assertion script
├── tests/
│   └── api-tests.spec.ts       # Playwright API test suite (@smoke, @critical, @negative)
├── package.json                # Project dependencies & runner scripts
├── playwright.config.ts        # Playwright test execution & reporting configuration
└── README.md
