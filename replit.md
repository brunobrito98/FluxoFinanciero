# Financial Management Dashboard

## Overview

This is a financial management dashboard application built to help users track clients, subscription plans, and revenue projections. The application provides a comprehensive view of monthly recurring revenue (MRR), annual recurring revenue (ARR), and 12-month revenue forecasting. Users can manage client information including plan details, monthly values, and renewal dates through an intuitive interface with data visualization components.

The system is designed as a SaaS-style dashboard prioritizing data clarity, efficient workflows, and instant comprehension of financial metrics. It features client management, calendar-based renewal tracking, and detailed financial projections with interactive charts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript running in a Vite development environment.

**UI Component Library**: Shadcn/ui components built on Radix UI primitives, providing accessible and customizable interface elements. The design system follows the "new-york" style variant with a modern SaaS dashboard aesthetic inspired by Stripe and Linear.

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router. Main routes include Dashboard (/), Clients (/clientes), Calendar (/calendario), and Projections (/projecoes).

**State Management**: TanStack Query (React Query) for server state management with aggressive caching strategies (staleTime: Infinity, no refetch on window focus). Local component state managed with React hooks.

**Styling**: Tailwind CSS with custom design tokens defined in CSS variables for theming. Supports light/dark mode with theme persistence in localStorage. Typography uses Inter for UI elements and JetBrains Mono for numeric/currency displays.

**Form Management**: React Hook Form with Zod schema validation for type-safe form handling and validation.

**Data Visualization**: Recharts library for rendering bar charts and line charts showing revenue projections.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript (ESM modules).

**API Design**: RESTful API endpoints under `/api` namespace:
- GET `/api/clients` - Retrieve all clients
- POST `/api/clients` - Create new client
- PATCH `/api/clients/:id` - Update existing client
- DELETE `/api/clients/:id` - Delete client

**Request Logging**: Custom middleware logs API requests with method, path, status code, duration, and truncated response data (max 80 characters).

**Error Handling**: Centralized error responses with appropriate HTTP status codes (400 for validation errors, 404 for not found).

### Data Storage Solutions

**Current Implementation**: In-memory storage using a Map-based implementation (MemStorage class) for development/prototyping. This provides a simple IStorage interface that can be swapped for a database implementation.

**Database Schema**: Drizzle ORM schema defined for PostgreSQL with a `clients` table containing:
- id (UUID, primary key, auto-generated)
- name (text, required)
- plan (text, required)
- monthlyValue (numeric with precision 10, scale 2)
- renewalDate (date, required)

**Migration Strategy**: Drizzle Kit configured for schema migrations with migrations output to `./migrations` directory. Database connection via `DATABASE_URL` environment variable.

**Design Decision**: The in-memory storage allows rapid development and testing without database dependencies. The IStorage interface abstraction means switching to Drizzle ORM with PostgreSQL requires only implementing the interface methods against the database, without changing application logic.

### Authentication and Authorization

**Current State**: No authentication system implemented. The application assumes single-user usage or trusted environment.

**Future Consideration**: The session middleware dependency (connect-pg-simple) suggests planned session-based authentication, but it's not yet integrated.

### External Dependencies

**Database**: 
- PostgreSQL (via @neondatabase/serverless driver)
- Drizzle ORM for type-safe database queries and schema management

**UI Component Libraries**:
- Radix UI primitives (20+ component packages for accessible UI building blocks)
- Recharts for data visualization
- Lucide React for icons
- date-fns for date manipulation and formatting (with pt-BR locale support)

**Developer Tools**:
- Vite for development server and build tooling
- TypeScript for type safety across client and server
- ESBuild for server-side bundling in production
- Replit-specific plugins for development environment integration

**Font Loading**: Google Fonts CDN for Inter and JetBrains Mono font families.

**Validation**: Zod for runtime type validation, integrated with Drizzle ORM schemas via drizzle-zod.

**Code Organization**:
- `client/` - React frontend application
- `server/` - Express backend API
- `shared/` - Shared TypeScript types and schemas (database schema definitions)
- Path aliases configured: `@/` for client source, `@shared/` for shared modules