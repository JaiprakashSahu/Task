# Research Notes Manager

A full-stack MERN app for creating and filtering research notes with tags.

## Tech Stack

- **Frontend** — React, Axios
- **Backend** — Node.js, Express
- **Database** — MongoDB (Mongoose)

## Project Structure

```
research-notes-manager/
├── package.json                  # root scripts
├── client/                       # React frontend
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── index.css
│       ├── App.js
│       ├── App.css
│       ├── components/
│       │   └── NoteCard.js
│       ├── pages/
│       │   └── HomePage.js
│       └── services/
│           └── api.js
└── server/                       # Express backend
    ├── package.json
    ├── server.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── noteController.js
    ├── models/
    │   └── noteModel.js
    ├── routes/
    │   └── noteRoutes.js
    └── middleware/
```

## Local Development

**Prerequisites:** Node.js 18+ and MongoDB (local or Atlas).

```bash
# 1. install dependencies
npm run install-server
npm run install-client

# 2. configure environment
cp server/.env.example server/.env
# edit server/.env — set your MONGO_URI

# 3. start the backend (port 5000)
cd server
npm run dev

# 4. in a new terminal, start the frontend (port 3000)
cd client
npm start
```

The React app uses `REACT_APP_API_URL` to reach the API (defaults to `http://localhost:5000`).

---

## Deployment

### Database — MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist `0.0.0.0/0` for access.
3. Copy the connection string.

### Backend — Render (Web Service)

| Setting         | Value              |
| --------------- | ------------------ |
| Root Directory  | `server`           |
| Build Command   | `npm install`      |
| Start Command   | `npm start`        |

**Environment variables on Render:**

| Variable     | Value                                      |
| ------------ | ------------------------------------------ |
| `MONGO_URI`  | Your Atlas connection string               |
| `CLIENT_URL` | Your deployed frontend URL                 |
| `NODE_ENV`   | `production`                               |

### Frontend — Vercel (or Render Static Site)

| Setting         | Value              |
| --------------- | ------------------ |
| Root Directory  | `client`           |
| Build Command   | `npm install && npm run build` |
| Publish / Output| `build`            |

**Environment variables on Vercel:**

| Variable              | Value                                   |
| --------------------- | --------------------------------------- |
| `REACT_APP_API_URL`   | Your Render backend URL (e.g. `https://your-api.onrender.com`) |

After the frontend is live, update `CLIENT_URL` on your Render backend to match the frontend URL.

### Alternative — Single Render Deployment

You can also serve both from one Render service:

| Setting         | Value                                                              |
| --------------- | ------------------------------------------------------------------ |
| Root Directory  | *(leave empty)*                                                    |
| Build Command   | `npm run install-server && npm run install-client && npm run build-client` |
| Start Command   | `npm start`                                                        |

Set `NODE_ENV=production` so Express serves the React build automatically.
