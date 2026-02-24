# InsemiTimeSheet

Employee time tracking and HR management system built with Django REST Framework and React.

## Features

- Timesheet tracking with activity logging
- Calendar management and reminders
- Employee hierarchy and user management
- Leave management
- Report generation and data export
- JWT-based authentication

## Prerequisites

- Python 3.12+
- Node.js 18+ (for frontend builds)
- MySQL 8.0 (or SQLite for local development)
- Docker and Docker Compose (optional)

## Quick Start

### 1. Clone and configure

```bash
git clone <repo-url>
cd InsemiTimeSheet
cp .env.example .env
# Edit .env with your actual values
```

### 2. Option A: Docker (recommended)

```bash
docker compose up --build
```

The app will be available at `http://localhost:8000`.

### 2. Option B: Manual setup

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run migrations and start the server
cd Project/Infrastructure/InsemiSystem
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3. Frontend builds

Each GUI module has its own frontend. Build from within the module directory:

```bash
cd Project/Infrastructure/InsemiSystem/<ModuleGUI>
npm install
npm run dev    # development build
npm run build  # production build
```

## Project Structure

```
InsemiTimeSheet/
├── Project/Infrastructure/InsemiSystem/   # Django project root
│   ├── manage.py
│   ├── InsemiSystem/      # Django settings, URLs, WSGI
│   ├── AuthGUI/           # Authentication UI (React + Django)
│   ├── CalendarGUI/       # Calendar UI
│   ├── ExportGUI/         # Export/reporting UI
│   ├── HomeScreenGUI/     # Dashboard UI
│   ├── TimeTrackerGUI/    # Time tracker UI
│   ├── UserFunctionsGUI/  # User management UI
│   ├── Time/              # Time tracking REST API
│   ├── UserModel/         # Custom user model + auth
│   ├── Hierarchy/         # Organization hierarchy
│   └── P/                 # Project management
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## API Endpoints

| Path | Purpose |
|------|---------|
| `/admin/` | Django admin interface |
| `/token-auth/` | JWT authentication |
| `/users/` | User management API |
| `/timetracker/` | Time tracking API |
| `/home/` | Dashboard |
| `/calendar/` | Calendar |
| `/export/` | Report generation |

## Development

### Running tests

```bash
cd Project/Infrastructure/InsemiSystem
pytest
```

### Linting

```bash
ruff check Project/
ruff format --check Project/
```

## License

Apache License 2.0 — see [LICENSE](LICENSE).
