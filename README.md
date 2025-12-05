Converge — Chatting and Video Calling Web Application

Live demo: https://converge-chatting-and-video-calling-web.onrender.com/

Overview
- Converge is a full‑stack web application for real‑time chatting and video calling, user onboarding, and social features (friend requests, recommendations, reviews).
- Backend: Node.js + Express with MongoDB (Mongoose), JWT auth, cookies, and Stream Chat server SDK for tokens/user sync.
- Frontend: React (Vite) with Stream Chat React/Video SDKs, TanStack Query, TailwindCSS/DaisyUI, and client‑side routing.

Tech stack
- Language: JavaScript (ESM for Backend; ESM for Frontend)
- Backend: Node.js, Express, Mongoose, jsonwebtoken, cookie‑parser, cors, bcryptjs
- Realtime/Video: Stream Chat/Video (server: `stream-chat`; client: `@stream-io/video-react-sdk`, `stream-chat-react`)
- Frontend: React 19, Vite 6, TanStack Query, TailwindCSS, DaisyUI, Lucide Icons
- Package manager: npm (root, Backend, Frontend)

Monorepo layout
- Root `package.json` orchestrates install/build/start for packages
  - Scripts:
    - `npm run build` → installs deps in Backend and Frontend, then builds Frontend
    - `npm start` → starts Backend (`node Backend/src/server.js` via Backend script)
- Packages:
  - Backend
    - Entry point: `Backend/src/server.js`
    - Scripts: `npm run dev` (nodemon), `npm start` (node)
  - Frontend
    - Entry point: `Frontend/src/main.jsx` (bundled by Vite)
    - Scripts: `npm run dev` (Vite), `npm run build`, `npm run preview`

Requirements
- Node.js 18+ (recommended LTS) and npm
- MongoDB instance (local or hosted) accessible via connection string
- Stream Chat/Video account credentials
- OS: Windows, macOS, or Linux

Environment variables (Backend)
Provide these in `Backend/.env` (not committed). Based on code references:
- `PORT` — HTTP port for Express (e.g., 5000)
- `NODE_ENV` — `development` or `production`
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET_KEY` — secret for signing JWT cookies
- `SALT_ROUNDS` — integer for bcrypt salt rounds (e.g., 10 or 12)
- `STREAM_API_KEY` — Stream API key
- `STREAM_API_SECRET` — Stream API secret

Frontend environment variables
- No explicit `import.meta.env` usage detected in `Frontend` at the moment. The app likely uses relative API paths from the same origin in production (`server.js` serves Frontend in production).

CORS and cookies
- Backend currently allows CORS from `http://localhost:5173` with `credentials: true` for dev.
- In production, the server serves the built Frontend and sets cookies with `secure: NODE_ENV === "production"` and `sameSite: strict`.

API endpoints (summary)
- Base path: `/api`
- Auth: `/api/auth`
  - `POST /signup` — register user
  - `POST /login` — login and receive httpOnly JWT cookie
  - `POST /logout` — clear cookie
  - `POST /onboarding` — complete onboarding (protected)
  - `GET /me` — get current user (protected)
- Users: `/api/users` (all protected)
  - `GET /` — recommended users
  - `GET /friends` — current user’s friends
  - `POST /friend-request/:id` — send friend request
  - `PUT /friend-request/:id/accept` — accept request
  - `GET /friend-requests` — incoming requests
  - `GET /outgoing-friend-requests` — outgoing requests
- Chat/Stream: `/api/chat`
  - `GET /token` — get Stream token for current user (protected)
- Reviews: `/api/review` (protected)
  - `POST /` — submit a review
  - (Optional commented route exists for `GET /`)

Project structure (selected)
- `/Backend`
  - `src/server.js` — Express server, static serving in production
  - `src/lib/mongoDB/db.mongo.js` — MongoDB connection via Mongoose
  - `src/lib/sql/db.postgres.js` — Postgres client (present; usage TBD)
  - `src/lib/stream.js` — Stream client init, user upsert, token creation
  - `src/controllers/*.js` — route handlers (auth, user, chat, review)
  - `src/middleware/auth.middleware.js` — JWT cookie guard
  - `src/models/*.js` — Mongoose models (User, FriendRequest, Review)
  - `src/routes/*.route.js` — route modules mounted under `/api/*`
- `/Frontend`
  - `src/main.jsx` — App bootstrap (React, Router, TanStack Query)
  - `vite.config.js` — Vite config
  - `src/` — components, pages, hooks, styles (not fully listed here)

Setup and running locally
1) Clone and install
```
git clone https://github.com/someshgorai/Converge---Chatting-and-Video-Calling-Web-Application.git
cd Converge---Chatting-and-Video-Calling-Web-Application
npm install --prefix Backend
npm install --prefix Frontend
```

2) Configure environment (Backend)
```
cp Backend/.env.example Backend/.env   # if present; else create Backend/.env
# Required variables (example values):
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/converge
JWT_SECRET_KEY=replace-with-strong-secret
SALT_ROUNDS=12
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret
```

3) Run in development (two terminals)
- Backend (port from `PORT`):
```
npm run dev --prefix Backend
```
- Frontend (Vite dev server, default http://localhost:5173):
```
npm run dev --prefix Frontend
```
Note: In dev, API calls cross‑origin to Backend. CORS origin is set to http://localhost:5173 and cookies are allowed. If you change ports, update Backend CORS config accordingly.

Production build and run
- Build Frontend and start Backend (serves built SPA under `Frontend/dist` in production):
```
npm run build
npm start
```
Ensure `NODE_ENV=production` and all required env vars are set before starting.

Available scripts
- Root:
  - `npm run build` — install packages then build Frontend
  - `npm start` — start Backend
- Backend:
  - `npm run dev` — start server with nodemon
  - `npm start` — start server with node
- Frontend:
  - `npm run dev` — Vite dev server
  - `npm run build` — production build
  - `npm run preview` — preview built app

Deployment notes
- The production server serves static files from `Frontend/dist` when `NODE_ENV === "production"`.
- Cookies use `secure: true` in production; use HTTPS in your deployment environment.
- Update CORS `origin` and any proxy settings if serving Frontend separately.

Security
- JWT is stored in an httpOnly cookie with `sameSite: strict`. Ensure TLS in production.
- Keep `JWT_SECRET_KEY` and `STREAM_API_SECRET` out of source control and environment‑manage them securely.

### License
This project is licensed under the MIT License.

MIT License Copyright (c) 2025 SOMESH GORAI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
