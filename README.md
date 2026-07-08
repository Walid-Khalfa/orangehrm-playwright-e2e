# 🧪 OrangeHRM Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-E2E-45ba4b.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg)](https://www.typescriptlang.org/)
[![GitHub Actions](https://img.shields.io/badge/CI-Playwright-2088ff.svg)](https://github.com/Walid-Khalfa/orangehrm-playwright-e2e/actions)
[![GitHub Codespaces](https://img.shields.io/badge/Codespaces-Compatible-181717.svg)](https://github.com/features/codespaces)

End-to-end test automation for the [OrangeHRM](https://opensource-demo.orangehrmlive.com) demo application, built with **Playwright** and **TypeScript** using the **Page Object Model** pattern.

## ✨ Features

- **Page Object Model (POM)** architecture for maintainable, reusable page interactions (`pages/LoginPage.ts`).
- **Multi-browser coverage** — Chromium, Firefox and WebKit, plus mobile viewports (Pixel 5, iPhone 12).
- **Functional tests** — login success, invalid credentials, and UI element visibility.
- **Accessibility tests** — automated `axe-core` scans (WCAG 2.0 A).
- **Performance tests** — page load and form-interaction timing checks.
- **Security checks** — verifies the application is served over HTTPS.
- **Visual regression tests** — screenshot comparisons (skipped by default, opt-in).
- **CI/CD** — GitHub Actions workflow running the full suite on every push/PR.
- **Reporting** — HTML, JSON and Allure reporters, with traces and failure artifacts.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) 22+
- npm 10+
- Git

## 🚀 Getting started

```bash
# Clone the repository
git clone https://github.com/Walid-Khalfa/orangehrm-playwright-e2e.git
cd orangehrm-playwright-e2e

# Install dependencies
npm install

# Install Playwright browsers (with OS dependencies)
npx playwright install --with-deps
```

### Environment variables

Copy `.env.example` to `.env` to override defaults (all values have sensible defaults):

```bash
cp .env.example .env
```

| Variable    | Default                                         | Description              |
| ----------- | ----------------------------------------------- | ------------------------ |
| `BASE_URL`  | `https://opensource-demo.orangehrmlive.com`     | Application base URL     |
| `USERNAME`  | `Admin`                                         | Login username           |
| `PASSWORD`  | `admin123`                                      | Login password           |

## 🧪 Running the tests

| Script                 | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm test`             | Run all tests across all configured projects         |
| `npm run test:headed`  | Run tests in a headed browser                         |
| `npm run test:debug`   | Run tests in debug mode (step-by-step)               |
| `npm run test:visual`  | Run only the Chromium project                        |
| `npm run test:ci`      | Run with HTML, JSON and GitHub reporters (CI mode)   |
| `npm run test:report`  | Open the last HTML report (`playwright show-report`) |

Example — run a single browser/project:

```bash
npx playwright test --project=chromium
```

### Visual regression tests

The visual tests in `tests/visual.spec.ts` are **skipped by default** because they require committed baseline screenshots and are environment-sensitive. To run them, remove the `test.describe.skip` wrapper (or change it to `test.describe`) and generate baselines with:

```bash
npx playwright test --project=chromium --update-snapshots
```

## 📁 Project structure

```
.
├── pages/                 # Page Object Model classes
│   └── LoginPage.ts
├── tests/                 # Test specifications
│   ├── login.spec.ts
│   ├── accessibility.spec.ts
│   ├── performance.spec.ts
│   ├── https.spec.ts
│   ├── visual.spec.ts
│   └── test-data.ts       # Centralized test data
├── .github/workflows/     # CI/CD pipeline
│   └── playwright.yml
├── playwright.config.ts   # Global Playwright configuration
├── package.json
└── tsconfig.json
```

## 🔄 CI/CD

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on every push to `main`/`master` and on pull requests. It:

1. Checks out the code and sets up Node.js 22.
2. Installs dependencies with `npm ci`.
3. Installs the Playwright browser for the current matrix job.
4. Runs the suite against Chromium, Firefox and WebKit (with retries).
5. Uploads the HTML report and test results as build artifacts on every run.

Optional credentials `ORANGEHRM_USERNAME` / `ORANGEHRM_PASSWORD` can be stored as repository secrets; the suite falls back to the public demo credentials otherwise.

## 📊 Reports

After a run, open the HTML report locally:

```bash
npm run test:report
```

Allure results are produced by the `allure-playwright` reporter and can be served with:

```bash
npm run allure:generate
npm run allure:serve
```

## 🤝 Contributing

Contributions are welcome! Please read the [Contribution Guide](CONTRIBUTING.md) and the [Learning Guide](LEARNING_GUIDE.md) for coding standards, the POM approach, and good testing practices before opening a pull request.

## 📄 License

ISC
