# CLAUDE.md — InsemiTimeSheet

## Project Overview

InsemiTimeSheet is a full-stack employee time tracking and HR management system built with **Django REST Framework** (backend) and **React** (frontend). It was developed by a team at InSemi Technology Solutions and is licensed under Apache 2.0.

The application provides timesheet tracking, calendar management, employee hierarchy, leave management, user authentication, and reporting/export functionality.

## Repository Structure

```
InsemiTimeSheet/
├── .github/
│   ├── labeler.yml              # PR label rules by module
│   └── workflows/
│       └── label.yml            # GitHub Action: auto-label PRs
├── Planning/                    # Design docs, mockups, presentations
│   ├── Guide2.md                # Feature roadmap and TODO list
│   ├── SpecSheet_New.docx       # Specification document
│   ├── Planning.xlsx            # Project planning spreadsheet
│   ├── *.pptx                   # Module presentations
│   └── *.jpg                    # UI mockups
├── Project/
│   └── Infrastructure/
│       └── InsemiSystem/        # Django project root
│           ├── manage.py        # Django management script
│           ├── InsemiSystem/    # Django project config (settings, urls, wsgi)
│           ├── AuthGUI/         # Authentication frontend (React) + Django app
│           ├── CalendarGUI/     # Calendar frontend (React) + Django app
│           ├── ExportGUI/       # Export/reporting frontend (React) + Django app
│           ├── HomeScreenGUI/   # Home screen frontend (React) + Django app
│           ├── TimeTrackerGUI/  # Time tracker frontend (React) + Django app
│           ├── UserFunctionsGUI/# User management frontend (React) + Django app
│           ├── Time/            # Time tracking REST API (Django)
│           ├── UserModel/       # Custom user model + auth backend (Django)
│           ├── Hierarchy/       # Organization hierarchy (Django)
│           ├── P/               # Project management (Django)
│           ├── loginpage/       # Alternative login interface
│           └── db.sqlite3       # SQLite database (dev)
├── LICENSE                      # Apache License 2.0
└── .gitignore
```

**Note:** Most module source code was removed in a repository cleanup (commit `1fa4e8534`). The final working commit with all modules is `fbc7e8a76`. Only `AuthGUI/` skeleton files remain in the current working tree.

## Technology Stack

| Layer     | Technology                          | Version  |
|-----------|-------------------------------------|----------|
| Backend   | Django                              | 3.0.5    |
| API       | Django REST Framework               | —        |
| Auth      | djangorestframework-jwt             | —        |
| Frontend  | React                               | 16.13.1  |
| Bundler   | Webpack                             | 4.43.0   |
| Transpiler| Babel 7 (`@babel/preset-env`, `@babel/preset-react`) | 7.10.4 |
| Database  | SQLite (dev) / MySQL (prod via RDS) | —        |
| CORS      | django-cors-headers                 | —        |
| Forms     | django-crispy-forms                 | —        |
| Language  | Python 3 (backend), JavaScript ES6+ (frontend) | — |

## Architecture

### Backend (Django + DRF)

The backend follows Django's **MTV (Model-Template-View)** pattern with DRF for REST APIs:

- **Models** are defined in each app's `models.py` (e.g., `Time/models.py` contains `Activity` and `Choices` models)
- **Serializers** in `serializers.py` convert models to/from JSON using `ModelSerializer`
- **Views** use DRF generic views (`ListCreateAPIView`) for CRUD endpoints
- **URLs** are namespaced per app and included in the root `InsemiSystem/urls.py`

### Frontend (React + Webpack)

Each `*GUI` module is a self-contained React application:

- React components live in `src/` within each GUI app
- Webpack bundles `src/index.js` into `static/<AppName>/main.js`
- Django serves the bundled JS via templates in `templates/<AppName>/`
- Components use **class components** (older) and **functional components** (newer)
- State is managed via local component state (`this.state` / hooks) — no Redux

### Authentication Flow

1. User submits credentials to `POST /token-auth/`
2. Server returns a JWT token
3. Token is stored in `localStorage`
4. Subsequent API calls include `Authorization: JWT <token>` header
5. User info fetched via `GET /users/current/`
6. Logout removes token from `localStorage`

## URL Endpoints

| Path             | App              | Purpose                      |
|------------------|------------------|------------------------------|
| `/admin/`        | Django Admin     | Admin interface              |
| `/home/`         | HomeScreenGUI    | Dashboard / home page        |
| `/timetracker/`  | Time             | Time tracking API            |
| `/ttgui/`        | TimeTrackerGUI   | Time tracker UI              |
| `/export/`       | ExportGUI        | Report generation/export     |
| `/calendar/`     | CalendarGUI      | Calendar and reminders       |
| `/users/`        | UserModel        | User management API          |
| `/userfunc/`     | UserFunctionsGUI | User management UI           |
| `/token-auth/`   | DRF JWT          | JWT token endpoint           |
| `/auth/`         | AuthGUI          | Login/signup UI              |

## Development Commands

### Django (Backend)

All commands run from `Project/Infrastructure/InsemiSystem/`:

```bash
# Create/apply database migrations
python manage.py makemigrations
python manage.py migrate

# Start development server (default: http://localhost:8000/)
python manage.py runserver

# Create a superuser for admin access
python manage.py createsuperuser

# Run tests
python manage.py test
```

### React (Frontend)

Each GUI module has its own `package.json`. Run from within the module directory (e.g., `AuthGUI/`):

```bash
# Install dependencies
npm install

# Development build (unminified, with source maps)
npm run dev

# Production build (minified)
npm run build
```

Webpack entry point: `./src/index.js`
Webpack output: `./static/<AppName>/main.js`

## Module Naming Conventions

- **`*GUI` apps** — Frontend React applications bundled with Webpack and served by Django templates
- **Non-GUI apps** (`Time`, `UserModel`, `Hierarchy`, `P`) — Backend-only Django apps providing REST APIs and models
- **`InsemiSystem/`** — The Django project configuration directory (settings, root URLs, WSGI)

## Key File Patterns Per Module

Each Django + React module follows this structure:

```
<ModuleName>/
├── .babelrc                    # Babel config (preset-env + preset-react)
├── webpack.config.js           # Webpack config (babel-loader for .js)
├── package.json                # npm deps and build scripts
├── admin.py                    # Django admin registration
├── apps.py                     # Django AppConfig
├── models.py                   # Django ORM models
├── serializers.py              # DRF serializers (backend modules)
├── views.py                    # Django/DRF views
├── urls.py                     # URL routing
├── tests.py                    # Unit tests
├── migrations/                 # Django migration files
├── src/
│   ├── index.js                # React entry point
│   ├── App.js                  # Root React component
│   ├── App.css                 # Root styles
│   └── <Component>.js          # Feature components
├── static/<ModuleName>/
│   └── main.js                 # Webpack-generated bundle (do NOT edit)
└── templates/<ModuleName>/
    └── *.html                  # Django templates that load the React bundle
```

## Configuration Details

### Babel (`.babelrc`)

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

### Webpack (`webpack.config.js`)

Standard config using `babel-loader` for `.js` files, plus `css-loader` and `style-loader` for CSS imports.

### Django Settings (key points)

- `AUTH_USER_MODEL = 'UserModel.UserDef'` — Custom user model
- `REST_FRAMEWORK` uses JWT + Session + Basic authentication
- `CORS_ORIGIN_WHITELIST` includes `http://127.0.0.1:8000`
- `USE_TZ = False` — Timezone-naive datetimes
- Static files served from `/static/` URL prefix

## Code Conventions

- **Python**: Standard Django conventions; models use CamelCase class names, fields use snake_case or CamelCase (inconsistent — legacy code)
- **JavaScript**: Mix of class components and functional components; ES6+ syntax with Babel transpilation
- **API calls**: Use the browser `fetch()` API (not Axios) with JSON content type and JWT auth headers
- **CSS**: Plain CSS files per component, imported directly in JS files via Webpack css-loader
- **No linter or formatter configured** — No ESLint, Prettier, or flake8/black in the repo

## CI/CD

- **GitHub Actions**: A single workflow (`.github/workflows/label.yml`) auto-labels PRs based on which module's files changed
- **No automated testing, build, or deployment pipelines**

## Important Notes for AI Assistants

1. **Most source code was cleaned from the repo.** The full codebase exists only in git history at commit `fbc7e8a76`. Use `git show fbc7e8a76:<path>` to examine historical files.
2. **Each GUI module is independently bundled.** There is no shared `node_modules` at the project root — each module has its own `package.json` and dependencies.
3. **No `.env` file exists.** Sensitive values (SECRET_KEY, DB credentials) were hardcoded in `settings.py`. Any new development should use environment variables.
4. **The database is SQLite for development** but was configured for AWS RDS MySQL in the final commit. Connection details should not be committed.
5. **Django's `manage.py` is at** `Project/Infrastructure/InsemiSystem/manage.py` — not at the repo root.
6. **Static bundles (`static/*/main.js`) are generated files.** Always rebuild with `npm run dev` or `npm run build` after changing React source.
7. **The custom user model** is `UserModel.UserDef`, not Django's default `auth.User`.
8. **PR labeling** is automatic via GitHub Actions — labels are applied based on which directories have changes (see `.github/labeler.yml`).
