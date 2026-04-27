# typesecript-express-backend

Backend starter for a React application using **Express**, **TypeScript**, and the **MVC pattern**.

## Project structure

- `src/models` - data/domain logic (Mongoose schemas)
- `src/controllers` - request handling logic
- `src/routes` - route definitions
- `src/app.ts` - express app setup
- `src/server.ts` - server bootstrap
- `src/seed.ts` - one-shot script that populates the database with demo data (demo user, demo quizzes, demo activity)

## Prerequisites

- Node.js + npm
- Docker Desktop (for the Mongo container and the backend image)

## How to start

1. Copy `.env.example` to `.env` (remove the `.example` from the name) and fill in the values.
2. From the project root: `cd backend`
3. `npm install`
4. Open Docker Desktop.
5. Build and start the containers (Mongo + backend app):
   ```
   docker compose up --build -d
   ```
   The `--build` flag rebuilds the backend image after any code change. The `-d` flag runs the containers in the background. You can omit `-d` if you want to keep the logs in your terminal. After the first build, if no backend code has changed you can use `docker compose up -d` (no rebuild) for a faster start.

## Seeding the database

After the containers are running, seed the database with demo data so the profile page has something to display:

```
docker compose exec app npm run seed
```

This runs `src/seed.ts` inside the running backend container so it picks up the same `MONGODB_URI` as the app. The script is **idempotent** — re-running it is safe. It will:

- Create the demo user `Whizzler69` if one does not already exist
- Ensure the four demo quizzes exist in the `Quiz` collection (matched by title; created if missing). Other quizzes already in the database are not touched.
- Normalize the demo user's linked quizzes to those four (preserving any per-quiz privacy flags previously set on the user)
- Insert four demo `Activity` records linked to the demo user (skipped if any already exist for that user)

You only need to re-run the seed if you have wiped the database (e.g. `docker compose down -v`) or want to refresh the demo content.

## Useful commands

| Action | Command |
| --- | --- |
| Build + start everything | `docker compose up --build -d` |
| Start without rebuilding | `docker compose up -d` |
| View backend logs | `docker compose logs -f app` |
| Run the seed script | `docker compose exec app npm run seed` |
| Open a shell inside the backend container | `docker compose exec app sh` |
| Stop containers (keep DB volume) | `docker compose down` |
| Stop containers and **wipe the DB** | `docker compose down -v` |

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/create-quiz` | Create a new quiz |
| GET | `/api/profile` | Fetch the demo user, their linked quizzes, and recent activity |
| PUT | `/api/profile` | Update editable About Me fields (`username`, `aboutMe`, `favoriteSubjects`) |
| PATCH | `/api/profile/quizzes/:quizId/privacy` | Set the per-quiz `isPrivate` flag for the demo user |
| DELETE | `/api/profile/activity/:activityId` | Delete one activity record for the demo user |
