# AutoHub - Vehicle Rental Management System

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-10.0-e0234e?logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/PostgreSQL-15.0-336791?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TanStack_Router-Latest-ff4154?logo=react&logoColor=white" alt="TanStack Router" />
  <img src="https://img.shields.io/badge/Vite-5.0-646cff?logo=vite&logoColor=white" alt="Vite" />
</p>

Welcome to AutoHub - A comprehensive vehicle rental management system featuring a modern React frontend and a robust NestJS backend.

## 📋 Table of Contents

- [System Overview](#-system-overview)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Technologies](#-technologies)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🏢 System Overview

AutoHub is a full-stack application designed to efficiently manage vehicle rentals. The system provides an intuitive interface for customers to browse vehicles, make bookings, and manage rentals, while offering powerful administrative tools for fleet management, user administration, and business analytics.

The application consists of two main parts:
- **Frontend**: React-based client application with TypeScript and TanStack Router
- **Backend**: NestJS-based RESTful API with PostgreSQL database

## 📁 Project Structure

```
AutoHub/
├── Client/                      # Frontend React application
│   ├── public/                  # Static assets
│   └── src/                     # Source code
│       ├── app/                 # App configuration
│       ├── components/          # Reusable UI components
│       ├── routes/              # TanStack Router routes
│       └── ...                  # Other frontend modules
│
└── Server/                      # Backend NestJS application
    ├── src/                     # Source code
    │   ├── common/              # Shared utilities
    │   ├── config/              # Configuration
    │   ├── modules/             # Feature modules
    │   └── ...                  # Other backend modules
    └── test/                    # Test files
```

## ✨ Key Features

### User-Facing Features
- **Vehicle Browsing**: Filterable vehicle catalog with search functionality
- **Booking System**: Intuitive booking process with date selection
- **User Authentication**: Secure login/registration with JWT tokens
- **Dashboard**: Personal dashboard for managing bookings and profile
- **Payment Processing**: Integrated Stripe payment flow
- **Responsive Design**: Mobile-first responsive design

### Admin Features
- **Dashboard Analytics**: Charts and metrics for business insights
- **Vehicle Management**: CRUD operations for vehicle inventory
- **User Management**: Admin controls for user accounts
- **Booking Management**: View and manage all bookings
- **Reporting System**: Financial and operational reports
- **Support Management**: Customer ticket handling system

## 🔧 Technologies

### Frontend
- React 18.x with TypeScript
- TanStack Router for type-safe routing
- Vite for fast development and building
- Redux Toolkit with RTK Query for state management
- Tailwind CSS for styling
- React Hook Form with Zod validation

### Backend
- NestJS 10.x with TypeScript
- PostgreSQL with TypeORM for database management
- JWT for authentication and authorization
- Stripe for payment processing
- NodeMailer for email notifications
- Swagger/OpenAPI for API documentation

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- PostgreSQL 12.0 or higher
- pnpm package manager

### Frontend Setup

1. **Navigate to the Client directory**
```bash
cd AutoHub/Client
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment configuration**
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
VITE_API_URL="http://localhost:3001/api"
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
VITE_APP_NAME="AutoHub"
```

4. **Start the development server**
```bash
pnpm start
```

The frontend application will be available at http://localhost:5173

### Backend Setup

1. **Navigate to the Server directory**
```bash
cd AutoHub/Server
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment configuration**
```bash
cp .env.example .env
```

Edit the .env file with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/autohub"

# JWT
JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_EXPIRES_IN="30d"

# Stripe
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Email Configuration
EMAIL_HOST="smtp.example.com"
EMAIL_PORT=587
EMAIL_USER="your-email@example.com"
EMAIL_PASSWORD="your-email-password"
EMAIL_FROM="AutoHub <noreply@autohub.com>"
EMAIL_SECURE=false

# Application
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"
```

4. **Database setup**
```bash
# Create database (ensure PostgreSQL is running)
createdb autohub

# Run TypeORM migrations
pnpm run typeorm:migration:run

# Seed with sample data (optional)
pnpm run seed
```

5. **Start the development server**
```bash
pnpm run start:dev
```

The backend API will be available at http://localhost:3001

## 📖 API Documentation

Once the server is running, access the auto-generated Swagger documentation at:
```
http://localhost:3001/api
```

### Key API Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get current user profile

#### Vehicles
- `GET /vehicles` - Get all vehicles with filtering
- `GET /vehicles/:id` - Get vehicle by ID
- `GET /vehicles/:id/availability` - Check vehicle availability

#### Bookings
- `GET /bookings` - Get user's bookings
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking

#### Payments
- `POST /payments/create-intent` - Create payment intent
- `POST /payments/confirm` - Confirm payment

## 🚀 Deployment

### Frontend Deployment

#### Build for Production
```bash
cd AutoHub/Client
pnpm build
```

#### Deployment Platforms
- **Vercel**: Automatic deployment from GitHub
- **Netlify**: Automatic deployment with netlify.toml configuration
- **GitHub Pages**: Manual deployment with gh-pages package

### Backend Deployment

#### Build for Production
```bash
cd AutoHub/Server
pnpm build
```

#### Deployment Options
- **Render**: Web service with PostgreSQL integration
- **Azure**: App Service deployment with Azure CLI
- **Docker**: Container deployment with included Dockerfile
- **AWS**: Elastic Beanstalk or EC2 deployment

## 🤝 Contributing

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation when adding features
- Follow established code structure and patterns
- Use provided linting and formatting tools

### Commit Message Convention
```
feat: add new vehicle filter component
fix: resolve booking date validation issue
docs: update routing documentation
style: improve responsive design for mobile
refactor: simplify authentication logic
test: add tests for payment component
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

AutoHub - A comprehensive vehicle rental management system with React frontend and NestJS backend.
