# CLAUDE.md — Insemi TimeSheet

## Project Overview

Insemi TimeSheet is an employee management and time tracking web application built with Django (backend) and React.js (frontend). It supports employee registration/authentication, timesheet entry, calendar-based scheduling, a time tracker with start/stop, and report exports.

**Status:** Mid-stage development. Core features (auth, timesheet, calendar, time tracker, export) are functional. Several features (hierarchy management, leave system, notice board, client customization) remain unimplemented.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend framework | Django 3.0.5 |
| API layer | Django REST Framework + djangorestframework-jwt |
| Database | MySQL (via `mysqlclient` + `django_mysql`) |
| Frontend framework | React 16.13.1 |
| Bundler | Webpack 4.43.0 + Babel 7 |
| UI components | rsuite, react-calendar, styled-components |
| State management | Redux 4.0.5 + redux-thunk (used in CalendarGUI) |
| Auth | JWT tokens stored in localStorage |

## Repository Structure

```
InsemiTimeSheet/
├── Project/Infrastructure/InsemiSystem/   # Main Django project root
│   ├── InsemiSystem/                      # Django project settings
│   │   ├── settings.py                    # App config, DB, middleware, REST/JWT settings
│   │   ├── urls.py                        # Root URL routing
│   │   ├── utils.py                       # Custom JWT response handler
│   │   ├── wsgi.py / asgi.py
│   │   └── __init__.py
│   ├── UserModel/                         # Custom user model + auth (Django app)
│   │   ├── models.py                      # UserDef (AbstractUser), LoginCount
│   │   ├── serializers.py                 # UserDefSerializer, UserSerializerWithToken
│   │   ├── views.py                       # Registration, login, user CRUD, JWT auth
│   │   └── urls.py                        # /users/* routes
│   ├── Time/                              # Timesheet/activity tracking (Django app)
│   │   ├── models.py                      # Activity, Choices
│   │   ├── serializers.py
│   │   ├── views.py                       # ActivityListCreate, ChoicesListCreate
│   │   └── urls.py                        # /timetracker/api/* routes
│   ├── HomeScreenGUI/                     # Home screen (React + Django template)
│   ├── CalendarGUI/                       # Calendar UI (React + Django template)
│   ├── TimeTrackerGUI/                    # Time tracker UI (React + Django template)
│   ├── ExportGUI/                         # Export/reports UI (React + Django template)
│   ├── UserFunctionsGUI/                  # User settings UI (React + Django template)
│   ├── AuthGUI/                           # Login/navigation UI (React + Django template)
│   ├── P/                                 # Projects app (legacy, commented out)
│   ├── Hierarchy/                         # Hierarchy management (unimplemented)
│   ├── loginpage/                         # Standalone login page
│   ├── manage.py                          # Django management entry point
│   └── db.sqlite3                         # Local dev database (fallback)
├── Planning/                              # Planning docs, screenshots, presentations
├── TS_Old/                                # Previous version of the app
├── README.MD                              # User-facing documentation
├── Requirements.txt                       # Internship info (not pip requirements)
└── LICENSE
```

### GUI App Structure Pattern

Each `*GUI` app follows a consistent structure:

```
<App>GUI/
├── src/
│   ├── components/
│   │   └── App.js (or feature-named .js files)
│   └── index.js              # Webpack entry: imports from components/
├── static/<App>GUI/
│   └── main.js               # Webpack output (auto-generated)
├── templates/<App>GUI/
│   └── index.html             # Django template loading main.js
├── views.py                   # Renders the template
├── urls.py                    # URL routing for this app
├── package.json               # npm config with dev/build scripts
├── webpack.config.js          # Webpack config (babel-loader for .js)
├── .babelrc                   # Babel presets (env + react)
└── node_modules/              # Per-app npm dependencies
```

## Key Commands

### Django Backend

All commands run from `Project/Infrastructure/InsemiSystem/`:

```bash
# Run development server
python manage.py runserver

# Create migrations after model changes
python manage.py makemigrations <app_name>

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Frontend (per GUI app)

Each GUI app has its own npm setup. Run from inside the specific `*GUI/` directory:

```bash
# Install dependencies
npm install

# Development build (unminified, with source maps)
npm run dev

# Production build (minified)
npm run build
```

The webpack output goes to `static/<AppName>/main.js`, which the Django template loads.

### Full Development Workflow

```bash
cd Project/Infrastructure/InsemiSystem

# 1. Build all frontend apps (from each GUI directory)
cd TimeTrackerGUI && npm run dev && cd ..
cd CalendarGUI && npm run dev && cd ..
cd HomeScreenGUI && npm run dev && cd ..
cd ExportGUI && npm run dev && cd ..
cd AuthGUI && npm run dev && cd ..
cd UserFunctionsGUI && npm run dev && cd ..

# 2. Run Django server
python manage.py runserver
```

## Data Models

### UserDef (UserModel app)
- Extends `AbstractUser`
- Fields: `employeeId` (unique int), `email_address`, `first_name`, `last_name`, `user_type`, `created_at`, `previous_login`
- User types: `Admin`, `Manager`, `HR`, `Employee`
- Configured as `AUTH_USER_MODEL = 'UserModel.UserDef'`

### Activity (Time app)
- Fields: `employeeId`, `Project_code`, `Date`, `Opening_time`, `Closing_time`, `Total_hours`, `Status`, `Remarks`
- Status choices: WFH, WFO, Earned Leave, Sick Leave, Maternity Leave, Paternity Leave, Emergency Leave

### Choices (Time app)
- Fields: `employeeId`, `Project_No`, `Project_code`, `Project_name`, `Manager`, `Customer_name`, `Vendor_name`

## API Endpoints

| URL Pattern | View | Purpose |
|-------------|------|---------|
| `/token-auth/` | `obtain_jwt_token` | POST: Get JWT token |
| `/users/register/` | `RegisterView` | GET/POST: User registration |
| `/users/login/` | `login_page` | GET/POST: Login page |
| `/users/authenticate/` | `check` | POST: Credential validation |
| `/users/api/` | `UserListCreate` | GET/POST: User list/create |
| `/users/users/` | `UserList` | POST: Create user |
| `/users/current/` | `current_user` | GET: Current authenticated user |
| `/users/settings/` | `settings` | GET: User settings page |
| `/timetracker/api/TimeTracker/allObjects/` | `ActivityListCreate` | GET/POST: Activity CRUD |
| `/timetracker/api/Choices/` | `ChoicesListCreate` | GET/POST: Project choices CRUD |
| `/calendar/` | CalendarGUI view | GET: Calendar page |
| `/home/` | HomeScreenGUI view | GET: Home screen |
| `/ttgui/op/` | TimeTrackerGUI view | GET: Time tracker page |
| `/export/` | ExportGUI view | GET: Export page |
| `/auth/` | AuthGUI view | GET: Navigation/login page |
| `/userfunc/` | UserFunctionsGUI view | GET: User functions page |
| `/admin/` | Django admin | Admin panel |

## Authentication

- **Method:** JWT via `djangorestframework-jwt`
- **Flow:** Client POSTs credentials to `/token-auth/` -> receives JWT token -> stores in `localStorage` -> sends as `Authorization: JWT <token>` header on subsequent API requests
- **Custom handler:** `InsemiSystem/utils.py` defines `my_jwt_response_handler` to include user data in JWT response
- **DRF defaults:** `IsAuthenticated` permission + `JSONWebTokenAuthentication` (see `settings.py` `REST_FRAMEWORK` config)

## Code Conventions

### Backend (Python/Django)
- **File naming:** Standard Django convention (`models.py`, `views.py`, `serializers.py`, `urls.py`)
- **Views:** Mix of function-based views (FBV) and class-based views (CBV via DRF generics)
- **Serializers:** `ModelSerializer` pattern with explicit `fields` tuples
- **App naming:** Feature name for backend apps (`UserModel`, `Time`), `<Feature>GUI` for frontend apps
- **Model fields:** PascalCase for model field names (e.g., `Project_code`, `Opening_time`) — this is a project-specific convention, not standard Django

### Frontend (JavaScript/React)
- **Components:** Mix of class-based and functional components
- **API calls:** Browser `fetch` API (no axios)
- **Token handling:** JWT from `localStorage`, sent as `Authorization: JWT {token}`
- **Styling:** Mix of CSS files, styled-components, and rsuite component library
- **Each GUI app is independently bundled** — no shared component library between apps

## Configuration Notes

- **Database:** MySQL on AWS RDS (`settings.py` line 100-107). Credentials are hardcoded in settings.
- **CORS:** Whitelisted for `http://127.0.0.1:8000` only
- **DEBUG:** Set to `True` — development mode
- **Time zone:** `USE_TZ = False`, `TIME_ZONE = 'UTC'`
- **Static files:** Served from each app's `static/` directory via Django's `{% load static %}` template tag

## Testing

No formal test suite is configured. There are no pytest/unittest configurations or custom test files beyond Django/React defaults. The `htmlcov/` directory suggests coverage tooling was used at some point.

## Unimplemented Features

These are planned but not yet built (documented in README.MD):
- **Hierarchy management** — flexible org chart with permissions per tier
- **Leave system** — multi-day leave requests, approval workflow, leave type restrictions
- **Notice board** — notification system for meetings, deadlines, approvals
- **Client customization** — client-defined hierarchies, superuser setup, feature toggles
- **Higher-level user features** — timesheet approval, project creation, messaging to subordinates
- **Export report compilation** — real-time report generation from date ranges (UI exists, backend incomplete)

## Important Caveats for AI Assistants

1. **Requirements.txt is NOT pip requirements.** It contains internship information. Install Python dependencies manually: `pip install django djangorestframework mysqlclient django_mysql django-crispy-forms django-cors-headers djangorestframework-jwt`
2. **Each GUI app has its own `node_modules/`.** There is no root-level npm workspace. Run `npm install` inside each `*GUI/` directory separately.
3. **The `P/` and `Hierarchy/` apps are commented out** in `INSTALLED_APPS` — do not re-enable without ensuring migrations and dependencies are in place.
4. **Database credentials are hardcoded** in `settings.py`. The remote MySQL DB may not be accessible — fall back to SQLite by changing the `DATABASES` config if needed.
5. **Webpack output paths** must match the Django static file references in templates. The pattern is `static/<AppName>/main.js`.
6. **No linting or formatting tools** are configured. Follow existing code style when making changes.
7. **The `TS_Old/` directory** contains a previous version and should not be modified.
