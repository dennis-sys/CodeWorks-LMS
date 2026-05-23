# Codeworks Academy LMS

A full-stack Learning Management System (LMS) for students to manage courses, assignments, and their learning journey.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + Zustand + React Router v6
- **Backend**: Node.js + Express.js
- **Database**: Replit PostgreSQL (via `pg` package)
- **Auth**: Replit Auth (OpenID Connect via `openid-client` + `passport`)
- **Package Manager**: npm

## Project Structure

- `frontend/` — React app served on port 5000
- `backend/` — Express API server on port 3001

## Running the App

- **Frontend workflow**: `cd frontend && npm run dev` (port 5000)
- **Backend workflow**: `cd backend && npm run dev` (port 3001)

## Auth Flow

- Login: `/api/login` → Replit OIDC → `/api/callback` → redirects to `/`
- Logout: `/api/logout`
- Identity check: `/api/auth/identity` (returns current session user)

## Database Tables

- `users` — linked to Replit user IDs
- `courses` — course catalog
- `assignments` — submitted quiz results
- `enrollments` — user-course progress
- `sessions` — express-session store

## User Preferences

- Backend port: 3001
- Frontend port: 5000
- No email/password forms — authentication handled entirely by Replit Auth
