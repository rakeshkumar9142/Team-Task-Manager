# ✨ AI-Powered Team Task Manager

![Project Banner Placeholder](https://via.placeholder.com/1200x400?text=AI-Powered+Team+Task+Manager)

> **Built as part of the Ethara AI hiring assessment**

A premium SaaS-style full-stack web application designed for high-performance teams to plan projects, assign tasks, and monitor momentum with role-based access control and AI-powered task breakdowns. Built with a focus on polished UI, smooth animations, and exceptional user experience.

---

## 🚀 Live Links
- **Live Demo**: https://team-task-manager-coral-five.vercel.app/

---

## 📸 Screenshots

---

## 🌟 Key Features

### 🤖 AI-Powered Capabilities
- **AI Task Breakdown**: Input complex project ideas and watch the integrated AI agent automatically generate actionable subtasks.
- **Smart Prioritization**: Simulated AI recommendations for balancing team workloads and predicting deadline risks.

### 🎨 Premium UI & Experience
- **Dark/Light Mode**: Fully integrated theme switching with seamless transitions and distinct, beautiful color palettes.
- **Framer Motion Animations**: Buttery smooth page transitions, interactive widgets, and modal animations.
- **Glassmorphism Aesthetics**: Premium frosted-glass layouts that feel like a top-tier startup product.

### 📊 Dashboard Analytics
- **Visual Insights**: Interactive Recharts-powered pie and bar charts showing task distribution.
- **Activity Timeline**: Real-time chronological feed of team actions (e.g., "Sarah completed task", "John assigned issue").
- **KPI Tracking**: Track overdue, pending, and completed tasks at a glance.

### 👥 Team Collaboration
- **Role-Based Access Control**: Differentiate between `Admin` and `Member` privileges for secure project management.
- **Seamless Invitations**: Modern modal flow to invite teammates via email and assign specific roles.
- **Kanban & Table Views**: Effortlessly switch between flexible Kanban boards and structured Table views for task management.

---

## 🛠 Tech Stack

### Frontend
- **React 19** + **Vite**: Lightning-fast modern frontend development.
- **Tailwind CSS**: Utility-first styling for custom, scalable, and responsive designs.
- **Framer Motion**: Production-ready animation library for fluid UI states.
- **React Router DOM**: Client-side routing with lazy loading and code-splitting.
- **React Hot Toast**: Beautiful, frictionless global notifications.
- **Recharts**: Composable charting library for dashboard analytics.

### Backend
- **Node.js** & **Express.js**: Robust, scalable backend API infrastructure.
- **MongoDB Atlas** & **Mongoose**: Flexible NoSQL database with strict schema validation.
- **JWT & bcryptjs**: Secure authentication and password hashing.

---

## ⚙️ Local Setup & Installation

### 1. Backend Setup
Navigate to the `backend` directory and set up your environment:
```bash
cd backend
npm install
cp .env.example .env
```

**Backend Environment Variables (`backend/.env`)**
```env
PORT=5000
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-secure-jwt-secret>
```

Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
npm install
cp .env.example .env
```

**Frontend Environment Variables (`frontend/.env`)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

---

## 🌩 Challenges Faced During Deployment

Deploying full-stack applications often presents unique challenges. Here is how I overcame them:
- **Railway DNS & Render Migration**: Initially faced DNS resolution issues and prolonged build times on Railway. Transitioned backend deployment to Render (or resolved Railway config) to ensure stable API uptime.
- **CORS Debugging**: Encountered Cross-Origin Resource Sharing restrictions between the Vercel frontend and the deployed backend. Solved this by strictly configuring origin arrays in the Express CORS middleware.
- **Environment Variables**: Faced issues with undefined process environments in production. Fixed by ensuring Vite uses `VITE_` prefixes and accurately mapping deployment dashboard variables to the code.

---

## 🧠 Key Learnings

1. **State Management & Context API**: Deepened understanding of utilizing React Context for global Auth and Theme management without prop drilling.
2. **Advanced UI Polish**: Learned how to effectively combine Tailwind CSS and Framer Motion to create a cohesive, "startup-grade" aesthetic that stands out.
3. **Performance Optimization**: Successfully implemented React `lazy()` and `Suspense` to code-split routes, significantly reducing initial bundle sizes.
4. **Backend Architecture**: Improved skills in structuring modular Express applications with isolated controllers, middleware, and database models.

---

## 🔮 Future Improvements

- **Real-Time WebSockets**: Integrate Socket.io to allow real-time updates for team task movements across Kanban boards.
- **Actual LLM Integration**: Connect the mock AI Task Breakdown widget to OpenAI or Anthropic APIs for dynamic, context-aware suggestions.
- **Email Notifications**: Integrate SendGrid to dispatch real emails during the Team Invitation flow.

---

## 👨‍💻 Developer / Contact

**Rakesh Kumar**
- 🎓 **University**: Chitkara University
- 💼 **LinkedIn**: [rakesh-kumar-ba423826b](https://linkedin.com/in/rakesh-kumar-ba423826b/)
- 🐙 **GitHub**: [rakeshkumar9142s](https://github.com/rakeshkumar9142s)

---
*Built as part of Ethara AI hiring assessment*
