# Code Quality & Freshness Audit — InsemiTimeSheet

> **Audit Date:** 2026-02-24
> **Overall Assessment:** This repository is a proof-of-concept/internship project from mid-2020 that has been inactive for ~6 years. It is not production-ready due to critical security vulnerabilities, zero test coverage, severely outdated dependencies, and missing infrastructure.

---

## 1. CRITICALLY OUTDATED DEPENDENCIES (all ~6 years old)

### Backend (Python/Django)

| Package | Version in Repo | Current (2026) | Status |
|---|---|---|---|
| Django | 3.0.5 (Apr 2020) | 5.1+ | **End-of-life**, 5 major versions behind |
| djangorestframework-jwt | any | N/A | **Abandoned** since 2017; replaced by `djangorestframework-simplejwt` |
| Python target | 3.x (unspecified) | 3.12+ | No `.python-version` or `pyproject.toml` |

### Frontend (React/JS)

| Package | Version in Repo | Current (2026) | Status |
|---|---|---|---|
| React | 16.13.1 (May 2020) | 19.x | 3 major versions behind |
| Webpack | 4.43.0 (Apr 2020) | 5.x | Missing asset modules, tree-shaking improvements |
| Babel Core | 7.10.4 (Jun 2020) | 7.25+ | Years of optimizations missed |
| css-loader | 3.5/3.6 | 7.x | 4 major versions behind |
| style-loader | 1.2.1 | 3.x+ | |
| rsuite | 4.7.x | 5.x | Major version behind |
| redux | 4.0.5 | 5.x | Modern alternatives exist (Zustand, Jotai) |
| react-redux | 7.2.0 | 9.x | |
| js-cookie | 2.2.1 | 3.x | |
| date-fns | 2.14.0 | 3.x+ | |
| elemental | 0.6.1 | N/A | **Unmaintained since 2016** |
| react-uikit-button | 2.0.2 | N/A | **Unmaintained** |

---

## 2. CRITICAL SECURITY VULNERABILITIES

### Hardcoded Secrets in Git History (CRITICAL)

The following secrets are permanently baked into the public git history:

- **Django `SECRET_KEY`** — hardcoded string in `settings.py`
- **AWS RDS password** — `admin123` in plaintext
- **AWS RDS endpoint** — `insemidb.cvyzrmqcspo0.ap-south-1.rds.amazonaws.com` exposed
- **Database admin username** — `admin`

> Even though source code was cleaned from the working tree, **git history retains all of these permanently**.

### Django Security Misconfigurations

- `DEBUG = True` — exposes stack traces, SQL queries, and internal paths in production
- `ALLOWED_HOSTS = []` — empty; accepts all hosts when DEBUG is on
- `USE_TZ = False` — timezone-naive datetimes cause bugs in multi-timezone deployments
- Missing: `SECURE_SSL_REDIRECT`, `SECURE_HSTS_SECONDS`, `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`, `SESSION_COOKIE_HTTPONLY`
- No Content-Security-Policy headers
- No rate limiting on any endpoint
- `CsrfViewMiddleware` ordered **before** `SecurityMiddleware` (incorrect order per Django docs)

### Authentication Weaknesses

- Uses **deprecated** `djangorestframework-jwt` (unmaintained since 2017, known vulnerabilities)
- JWT tokens stored in `localStorage` — vulnerable to XSS attacks (should use httpOnly cookies)
- No JWT expiration configured (defaults to extremely long-lived tokens)
- No refresh token mechanism
- No token rotation or revocation strategy

### Open API Endpoints

- `permission_classes = (permissions.AllowAny,)` on `ActivityListCreate` and `ChoicesListCreate`
- Timesheet and project data **readable and writable by anyone** without authentication

---

## 3. ZERO TEST COVERAGE

- Every `tests.py` contains only `from django.test import TestCase` with a placeholder comment
- **0 actual test cases** across the entire codebase (backend and frontend)
- No test runner configuration (no pytest, no Jest)
- No coverage tooling
- `.coverage` and `htmlcov/` artifacts were committed despite having no tests

---

## 4. NO CODE QUALITY TOOLING

| Tool | Present? |
|---|---|
| ESLint | No |
| Prettier | No |
| flake8 / ruff / pylint | No |
| Black / isort | No |
| TypeScript / mypy | No |
| PropTypes | No |
| Pre-commit hooks (husky/lint-staged) | No |
| `.editorconfig` | No |

**Result:** Inconsistent naming conventions throughout — `employeeId` (camelCase), `Project_code` (Title_snake), `status_choices` (snake_case) all appear in the same file.

---

## 5. MISSING DEPENDENCY MANAGEMENT

### Python
- No `requirements.txt` (was removed/lost in cleanup)
- No `pyproject.toml` or `setup.cfg`
- No `Pipfile` / `Pipfile.lock`
- No `.python-version`
- Dependencies are only discoverable via import statements in source code

### JavaScript
- Each GUI module has its own `package.json` with no workspace configuration
- No monorepo tooling (npm workspaces, Lerna, Turborepo)
- No lockfiles (`package-lock.json`) committed — builds are not reproducible

---

## 6. INADEQUATE CI/CD

The only GitHub Action is a PR auto-labeler using an outdated action (`actions/labeler@v2`, current is `v5`).

### Missing Entirely
- Automated test execution on PRs
- Build verification
- Lint/format checks
- Dependency vulnerability scanning (Dependabot / Snyk / Trivy)
- SAST (static analysis security testing)
- Docker image builds
- Deployment pipeline
- Staging/production environment configuration

---

## 7. NO CONTAINERIZATION OR INFRASTRUCTURE-AS-CODE

- No `Dockerfile`
- No `docker-compose.yml`
- No `.dockerignore`
- No Kubernetes manifests, Terraform, or CloudFormation
- No `Makefile` or task runner
- Dev environment setup is entirely manual with no automation

---

## 8. FILES THAT SHOULD NOT BE IN THE REPOSITORY

| File/Directory | Problem |
|---|---|
| `db.sqlite3` | Development database, may contain PII |
| `.coverage`, `htmlcov/` | Test coverage artifacts |
| `.DS_Store` | macOS filesystem metadata |
| `.vscode/` | IDE-specific settings |
| `node_modules/` (in git history) | ~7,500+ files inflating repo to ~145 MB |
| `static/*/main.js` | Generated webpack bundles |
| `Planning/*.pptx, *.xlsx, *.docx, *.jpg` | Large binary files bloating the repo |

---

## 9. CODE QUALITY ISSUES

### Django Models

- `default=None` on non-nullable `CharField`/`IntegerField` — will crash on save
- Wildcard imports: `from .models import *`
- `employeeId = models.IntegerField` instead of `ForeignKey` — breaks referential integrity; no cascading deletes or database-level constraints
- `Total_hours = models.IntegerField` — should be `DurationField` or `DecimalField` for partial hours
- `status_choices` defined as a plain Python list instead of Django's `TextChoices` enum or choice tuples
- No `__str__` methods on any model
- No `Meta` classes (no ordering, indexes, or database constraints)
- No model-level validation or `clean()` methods

### Django Views

- `permissions.AllowAny` bypasses authentication entirely
- Only `ListCreateAPIView` — no update, delete, or detail endpoints
- No pagination
- No filtering or search
- No throttling

### Django Settings

- Uses `os.path` instead of modern `pathlib.Path` (standard since Django 3.1+)
- `TEMPLATE_DIRS` uses old-style tuple instead of `TEMPLATES['DIRS']`

### React Components

- Mix of class components and functional components with no consistency
- No error boundaries
- No code splitting / lazy loading (`React.lazy`, `Suspense`)
- No centralized API client — raw `fetch()` scattered throughout
- No error handling patterns
- Direct `localStorage` manipulation for auth tokens

---

## 10. ARCHITECTURAL ISSUES

- **No environment-based configuration**: Same `settings.py` for dev and production; no `django-environ`, no `.env` file support
- **No API versioning**: Unversioned endpoints (`/users/`, `/timetracker/`); any breaking change affects all clients
- **No API documentation**: No Swagger/OpenAPI spec (no `drf-spectacular` or `drf-yasg`)
- **No logging configuration**: Django `LOGGING` dict not configured
- **No error monitoring**: No Sentry or equivalent
- **No caching layer**: No Redis/Memcached
- **No health check endpoint**
- **No production CORS config**: Only `http://127.0.0.1:8000` whitelisted
- **Duplicated UI code**: Each React app is bundled independently with no shared component library or design system

---

## 11. MISSING DOCUMENTATION

- No `README.md` in repository root
- No setup / installation guide
- No API reference
- No `CONTRIBUTING.md`
- No `CHANGELOG.md`
- No environment variable documentation

---

## Summary Scorecard

| Area | Grade | Key Issue |
|---|---|---|
| Dependency Freshness | **F** | Everything 5-6 years old; multiple EOL/abandoned packages |
| Security | **F** | Hardcoded AWS credentials in public history; unauthenticated APIs |
| Testing | **F** | Zero tests |
| Code Quality Tooling | **F** | No linter, formatter, or type checker |
| CI/CD | **F** | Only a PR labeler; no build/test/deploy pipeline |
| Dependency Management | **F** | No requirements.txt, no lockfiles |
| Containerization | **F** | No Docker support |
| Code Patterns | **D** | Broken model defaults, wildcard imports, naming inconsistency |
| Architecture | **D** | No env config, no API versioning, no monitoring |
| Documentation | **D** | No README, no setup guide |
| Git Hygiene | **D** | Database files, node_modules, build artifacts in history |
