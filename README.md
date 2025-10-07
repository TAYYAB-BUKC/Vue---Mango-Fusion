Mango Fusion

A full-stack real-world application built with Vue 3 (frontend) and .NET 10 / ASP.NET Core (backend). This project follows the structure and features taught in the the “Vue 3 & .NET 10 — Build Full-Stack Real World App [2025]” course.

📖 Table of Contents

About

Features

Tech Stack

Repository Structure

Getting Started

Prerequisites

Backend Setup

Frontend Setup

Authentication & Authorization

State Management & API Communication

Deployment

Contributing

License


1. About

Mango Fusion is a tutorial project where I built an end-to-end web application following a course’s instructions and adding my own improvements. It demonstrates how to connect a Vue 3 SPA frontend with a .NET 10 Web API backend, handling CRUD, authentication, routing, data flow, and more.

By going through the course commits, I implemented nearly all of its features (and some adjustments) to reinforce my full-stack skill set.

Repository link: https://github.com/TAYYAB-BUKC/Vue---Mango-Fusion
 
GitHub

2. Features

Here are the key features your project includes (as inherited from the course and your implementation):

Vue 3 frontend with Composition API

Vue Router for routing / navigation

State management (Pinia)

HTTP calls using Axios

Backend Web API built with .NET 10 / ASP.NET Core

Entity Framework Core for database interactions

CRUD operations on domain entities

User registration / login / JWT authentication

Protected API endpoints (authorization)

Input validation (frontend + backend)

Separation of concerns (controllers, services, repositories)

Handling tokens (storing, attaching to requests)

Error handling and feedback to UI

CORS configuration to allow frontend ↔ backend

Build and deployment readiness

3. Tech Stack
Layer	Technology / Library
Frontend	Vue 3, Composition API
Routing	Vue Router
State	Pinia
HTTP Client	Axios
Backend	ASP.NET Core (.NET 10)
ORM / DB	Entity Framework Core
Auth	JWT / ASP.NET Identity or custom token logic
Database	(e.g., SQL Server, SQLite, or whatever configured)
Deployment	Static hosting (frontend) + Web API hosting
4. Repository Structure

Here’s a likely structure based on course patterns and your repo:

/vue-mango-fusion
│
├── .vscode
│
├── client (Vue 3 frontend)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   ├── store/        ← Pinia stores
│   │   ├── services/     ← API wrappers with Axios
│   │   ├── composables/  ← reusable logic
│   │   ├── App.vue
│   │   └── main.ts
│   └── package.json
│
└── server (Backend API)
    ├── Controllers/
    ├── Models / Entities/
    ├── DTOs/
    ├── Data/              ← DbContext, migrations
    ├── Services / Business Logic /
    ├── Repositories/
    └── Program.cs / Startup or minimal API setup


If your actual folder names differ, adjust accordingly when you place this README in your project.

5. Getting Started
Prerequisites

.NET 10 SDK

Node.js + npm (or yarn)

Database server (SQL Server, SQLite, or preferred)

(Optional) Tools like EF Core CLI

Backend Setup

Go into the server folder (or whatever name you used).

Edit appsettings.json (or environment files) to set your connection string and JWT / secret settings.

Run EF Core migrations (if migrations exist). For example:

dotnet ef database update


Launch the API:

dotnet run


It should start listening (e.g. on https://localhost:5001 or whatever port you configured).

Frontend Setup

Navigate to the client folder.

Install dependencies:

npm install
# or
yarn install


Configure the API base URL (in an environment file like .env or in your service config) so frontend knows where the backend is.

Run the dev server:

npm run dev
# or yarn dev


The Vue app should load (commonly at http://localhost:3000 or configured port).

To build for production:

npm run build

6. Authentication & Authorization

The backend provides endpoints for register, login, returning JWT tokens.

The tokens are validated for protected endpoints (via [Authorize] or middleware).

On the frontend, login/register components call the relevant API endpoints and store tokens (e.g. in localStorage or cookies).

Axios interceptors are used to automatically attach tokens to outgoing API requests.

Vue Router navigation guards (e.g. beforeEach) protect certain routes so only authenticated users may access them.

7. State Management & API Communication

Pinia stores hold global state: user info, authentication status, possibly data lists shared across components.

Services / API wrappers encapsulate HTTP requests to the backend, e.g. userService.login(), productService.getAll().

Axios interceptors handle token injection, response error handling, refreshing tokens if implemented.

Components consume the stores and call service methods to fetch or mutate data, then reflect changes in UI.

8. Deployment

When ready for production:

Publish the backend: dotnet publish -c Release and host it on a server (Azure, AWS, etc.).

Serve the built Vue frontend (static build) from a host (Netlify, Vercel, or same backend).

Configure environment (in production) for API base URLs, secrets, database connections.

Ensure CORS is set up properly so frontend domain can call API.

Use HTTPS in production.

Optionally set up CI/CD for continuous deployment.

9. Contributing

I built this as a learning project following the Udemy course, so the structure and behavior closely mirror what was taught. However, you’re welcome to:

Suggest improvements (error handling, UI polish, additional features)

Fork and experiment

Report issues (if you find mismatches or bugs)

Modify for your own domain or API

If you expand this into a fully-fledged project, consider adding tests (unit + integration), more robust security, and modularization.

10. License

Unless specified otherwise, you may license this under MIT License (or your favorite open-source license).
