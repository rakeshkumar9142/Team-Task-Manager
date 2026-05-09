# Team Task Manager

Team Task Manager is a premium SaaS-style full-stack web application for campus placement teams to plan projects, assign tasks, and monitor performance with role-based access.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, React Router DOM, Axios, Framer Motion
- Backend: Node.js, Express.js
- Database: MongoDB Atlas + Mongoose
- Auth: JWT + bcryptjs
- Deployment: Vercel (frontend), Railway (backend)

## Project Structure

```text
backend/
  src/
    config/
    constants/
    controllers/
    middleware/
    models/
    routes/
    utils/
    validations/
    app.js
    server.js

frontend/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    routes/
    services/
    utils/
```

## MongoDB Schemas

- User: name, email, password, role (admin/member)
- Project: title, description, createdBy (User ref), teamMembers[] (User refs)
- Task: title, description, status, priority, dueDate, assignedTo (User ref), projectId (Project ref), createdBy (User ref)

## Backend API Endpoints

- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Projects:
  - `POST /api/projects`
  - `GET /api/projects`
  - `GET /api/projects/:id`
  - `PUT /api/projects/:id`
  - `DELETE /api/projects/:id`
  - `POST /api/projects/:id/members`
  - `GET /api/projects/:id/members`
  - `GET /api/projects/:id/tasks`
- Tasks:
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - `PATCH /api/tasks/:id/status`
  - `DELETE /api/tasks/:id`
- Dashboard:
  - `GET /api/dashboard/stats`
- Users:
  - `GET /api/users`

## Premium UI Highlights

- Ethara-inspired dark gradient visual language with glass surfaces
- Framer Motion transitions for cards, pages, and modals
- Analytics dashboard with pie + bar charts
- Modal-based project/task/member workflows
- Modern task table with priority/status badges and inline status updates
- Team invite flow with member picker (no raw ID entry UX)
- Role-based UI controls (admin/member action visibility)
- Toast notifications and skeleton loading states
- Task view toggle between table and kanban

## Local Setup

### 1) Backend setup

```bash
cd backend
cp .env.example .env
# Add your MongoDB Atlas URI and JWT secret in .env
npm install
npm run dev
```

### 2) Frontend setup

```bash
cd frontend
cp .env.example .env
# Ensure VITE_API_BASE_URL points to backend API
npm install
npm run dev
```

## Deployment Steps

### Backend (Railway)

1. Create new Railway project and connect repository.
2. Set root directory to `backend`.
3. Add environment variables from `backend/.env.example`.
4. Railway build/start commands:
   - Build: `npm install`
   - Start: `npm start`
5. Copy deployed backend URL.

### Frontend (Vercel)

1. Create Vercel project and connect repository.
2. Set root directory to `frontend`.
3. Add env variable:
   - `VITE_API_BASE_URL=<your-railway-backend-url>/api`
4. Deploy and validate login/dashboard flow.

## Demo Video Flow (2 minutes)

1. Show landing page premium UI + motion effects.
2. Signup/Login as Admin.
3. Create a project and add team members.
4. Create and assign tasks with due dates and priority.
5. Update task status.
6. Open dashboard and show analytics (total/completed/pending/overdue + activity).

