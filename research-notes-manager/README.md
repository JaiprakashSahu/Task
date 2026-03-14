# Research Notes Manager

A simple full-stack MERN application for managing research notes.
Allows users to create notes with a title, description, and tags, and filter through them easily. 

## Tech Stack
- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)

## Local Development Setup

### 1. Database
Make sure you have MongoDB running locally on port 27017, or update the `MONGO_URI` in the backend `.env` file.

### 2. Backend
```bash
cd backend
npm install
npm start
```
The server will start on port 5000 by default. Set up a `.env` file based on `.env.example`.

### 3. Frontend
```bash
cd frontend
npm install
npm start
```
The React app will open on port 3000. Set the `REACT_APP_API_URL` in your `.env` file if needed.

---

## Deployment Guide (Production)

This project is structured to be easily deployed to modern cloud platforms.

### 1. MongoDB Atlas (Database)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow access from anywhere (`0.0.0.0/0`).
3. Copy your connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.../research_notes`).

### 2. Render (Backend)
1. Push your code to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Point it to your repository and set the Root Directory to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add these Environment Variables to the Render service:
   - `MONGO_URI`: (Your MongoDB Atlas connection string)
   - `CLIENT_URL`: (The URL of your frontend after it's deployed, e.g., `https://my-frontend.vercel.app`)

### 3. Vercel (Frontend)
1. Go to [Vercel](https://vercel.com/) and Import your GitHub project.
2. Set the Root Directory to `frontend`.
3. Vercel will automatically detect Create React App settings (`npm run build`).
4. Add this Environment Variable in Vercel settings before deploying:
   - `REACT_APP_API_URL`: (The URL of your deployed Render backend, e.g., `https://my-backend.onrender.com`)
5. Click **Deploy**.

Once the frontend is live, make sure to update the `CLIENT_URL` on your Render backend if you didn't have the Vercel URL beforehand.
