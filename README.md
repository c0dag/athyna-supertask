# Super Task

## Prerequisites

- Node.js 22+
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Docker Network Setup

Before running the API with Docker, create the required network:

```bash
docker network create super-task-network
```

## API Setup (`super-task-api`)

### Docker Development

1. Navigate to the API directory:
```bash
cd super-task-api
```

2. Create a `.env` file with the following variables:
```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/supertaskdb"
PORT=4000
```

**Note:** In Docker, the `DATABASE_URL` uses `db` as the hostname (the service name from docker-compose) instead of `localhost`.

3. Start with Docker Compose:
```bash
npm run start:docker
```

This will start both the PostgreSQL database and the API in containers connected via the `super-task-network`.

### Local Development

1. Navigate to the API directory:
```bash
cd super-task-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5435/supertaskdb"
PORT=4000
```

4. Setup database (migrations and seed):
```bash
npm run migrate:dev
npm run db:seed
```

5. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:4000/api`


## Frontend Setup (`super-task-app`)

### Local Development

1. Navigate to the frontend directory:
```bash
cd super-task-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (or add to existing `.env.local`) with:
```env
VITE_API_URL=http://localhost:4000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Environment Variables

### API Environment Variables

**Local Development:**
- `DATABASE_URL`: Points to `localhost:5432` (or your local PostgreSQL port)
- `PORT`: API server port (default: 4000)

**Docker:**
- `DATABASE_URL`: Points to `db:5432` (Docker service name)
- `PORT`: API server port (default: 4000)

### Frontend Environment Variables

- `VITE_API_URL`: Backend API base URL (e.g., `http://localhost:4000/api`)


## Approach and Tradeoffs

The project follows a modular architecture, separating the backend and frontend.
On the backend, I opted for isolated modules (Jobs, Companies, and Applications). I implemented layered validations using DTOs and class-validator, documented the API with Swagger, ensured type safety with Prisma, and containerized deployments using Docker.
On the frontend, I used React Query (TanStack) to manage server state with caching and optimistic updates. Local UI state is handled with React Hooks, and URL state is used for filters and pagination. Form validation is managed with React Hook Form and Zod. The UI is built using Shadcn and TailwindCSS.
The approach was inspired by jobs.athyna.com, including features such as job listings, job creation, and application (listing/applying).
Since there’s no authentication, a boolean column in the database tracks applications, a key tradeoff. The /admin page is also unprotected and accessible directly via its route.

## Youtube video
https://youtu.be/0D0y_g0wfvM

## What would I improve with more time

I would develop unit and end-to-end tests to cover both the API and the frontend (e.g., using Cypress).
Pagination could be replaced with infinite scroll for a smoother browsing experience.
A real job application system would be implemented, allowing user registration and resume uploads.
The UI could be enhanced with graphics, images, and backgrounds to improve visual appeal and robustness.
The admin system would be secured with auth guards.
Job management features would include archiving, editing, saving, and soft deletion.
Part of this logic is already implemented on the backend but not yet integrated into the frontend.
