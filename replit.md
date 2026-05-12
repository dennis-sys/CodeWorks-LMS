# Student LMS Dashboard

A full-stack Learning Management System (LMS) for students to manage their learning journey.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + Zustand + React Router v6
- **Backend**: Node.js + Express.js
- **Database/Auth**: Supabase (PostgreSQL + Auth)
- **Package Manager**: npm

## Project Structure

- `frontend/` — React app served on port 5000
- `backend/` — Express API server on port 3001

## Running the App

- **Frontend workflow**: `cd frontend && npm run dev` (port 5000)
- **Backend workflow**: `cd backend && npm run dev` (port 3001)

## Required Secrets

The following secrets must be set in Replit Secrets:

- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Backend service role key
- `VITE_SUPABASE_URL` — Same as SUPABASE_URL (used by frontend)
- `VITE_SUPABASE_ANON_KEY` — Public anon key (used by frontend)

## User Preferences

- Backend port: 3001
- Frontend port: 5000
