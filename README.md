# Goal Setter (MERN + Redux Toolkit)

## Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env     # then fill in MONGO_URI and JWT_SECRET
npm run dev              # runs on http://localhost:8000
```

### 2. Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev              # runs on http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:8000`
(see `frontend/vite.config.js`). If your backend uses a different PORT, update it there.

## Auth flow
1. Register/login returns `{ _id, name, email, token }`, stored in Redux and `localStorage`.
2. On refresh, `authSlice` reads the user back from `localStorage`.
3. Goal requests send `Authorization: Bearer <token>`.
4. `PrivateRoute` redirects visitors without a user to `/login`.
5. A 401 from the API logs the user out automatically.
6. Logout clears `localStorage` and the goals in Redux.

## Backend fixes included
- `authMiddleware`: sets `req.user` (was `req.User`) and no longer falls through after `next()`
- `goalModel`: `user` is now its own field (was nested inside `text`)
- `server.js`: duplicated code removed
- `errorMiddleware.js`: added (it was imported but missing)
- Removed the fallback JWT secret
- `updateGoal` only lets the `text` field change
