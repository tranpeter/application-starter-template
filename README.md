# MediDent Inventory Manager

## Overview
MediDent Inventory Manager is a web and mobile platform designed to help dental and medical practices manage their inventory efficiently. The system offers features like invoice scanning, QR code tracking, low-stock alerts, and expiry tracking.

## Tiers
- **Basic Tier ($49-$79/mo)**: Manual inventory edits, invoice scanning, low-stock alerts, expiry alerts, CSV import/export
- **Pro Tier ($149-$179/mo)**: All Basic features plus hybrid QR system, lot & expiry tracking, batch scanning, detailed audit logs

## Technical Stack
- **Frontend**: React v18.2.0 (Web), React Native (Mobile - planned)
- **Component Library**: Mantine v8.3.1 + TanStack Table v8.10.7
- **Backend**: Node.js v20 + Express v4.18.2
- **Database**: PostgreSQL v16 (Alpine)
- **Authentication**: JWT v9.0.2 (Azure AD B2B integration planned)
- **API**: REST API (GraphQL planned)
- **State Management**: React Query v3.39.3
- **Containerization**: Docker v3.8 (Kubernetes planned)
- **HTTP Client**: Axios v1.6.2
- **Routing**: React Router v6.20.0
- **Database ORM**: Knex v2.5.1
- **Logging**: Winston v3.11.0
- **Security**: CORS, Helmet v7.0.0, bcryptjs v2.4.3, TLS encryption

## Project Structure
```
medident-inventory-manager/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/     # Request controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middlewares/     # Express middlewares
│   │   ├── utils/           # Utility functions
│   │   └── config/          # Configuration files
│   └── tests/               # Backend tests
├── frontend/                # React frontend
│   ├── public/              # Static files
│   └── src/
│       ├── components/      # React components
│       ├── pages/           # Page components
│       ├── hooks/           # Custom React hooks
│       ├── utils/           # Utility functions
│       ├── services/        # API services
│       ├── context/         # React context
│       └── styles/          # CSS/SCSS styles
└── docker/                  # Docker configuration
```

## Getting Started

### Development Setup
1. Clone the repository
2. Set up the backend: `cd backend && npm install`
3. Set up the frontend: `cd frontend && npm install`
4. Run the application with Docker: `docker-compose up`

### Building the Application
The application is containerized using Docker, which simplifies the build and deployment process:

```bash
# Build and start all services
docker-compose up

# Build without starting
docker-compose build

# Build a specific service
docker-compose build backend
docker-compose build frontend
```

### Accessing the Application
Once the application is running, you can access it at the following URLs:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Health Check**: http://localhost:5001/health

### Login Credentials
Use the following credentials to log in to the application:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@medident.com | password123 |
| Manager | manager@medident.com | password123 |
| Assistant | assistant@medident.com | password123 |

## Features
- Manual inventory edits
- Invoice scanning
- Low-stock alerts
- Expiry tracking
- CSV import/export
- QR code system (Pro)
- Lot & expiry tracking (Pro)
- Batch scanning (Pro)
- Detailed audit logs (Pro)

