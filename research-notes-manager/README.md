# Research Notes Manager

A minimal full-stack web application that allows users to add, view, and filter research notes by tag.

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | React (CRA)         |
| Backend  | Node.js + Express   |
| Database | MongoDB + Mongoose  |
| HTTP     | Axios               |

## Project Structure

```
research-notes-manager/
├── server/
│   ├── models/
│   │   └── Note.js          # Mongoose schema
│   ├── server.js             # Express server & API routes
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.js            # React UI (form, list, filter)
│   │   └── App.css           # Styling
│   └── package.json
└── README.md
```

## Prerequisites

- **Node.js** (v16+)
- **MongoDB** running locally on the default port (`mongodb://127.0.0.1:27017`)

## Installation

### 1. Backend

```bash
cd research-notes-manager/server
npm install
```

### 2. Frontend

```bash
cd research-notes-manager/client
npm install
```

## Running the App

### 1. Start MongoDB

Make sure MongoDB is running. On most systems:

```bash
mongod
```

### 2. Start the Backend

```bash
cd research-notes-manager/server
node server.js
```

Server runs at **http://localhost:5000**

### 3. Start the Frontend

```bash
cd research-notes-manager/client
npm start
```

React app opens at **http://localhost:3000**

## API Endpoints

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| POST   | `/notes`       | Create a new note            |
| GET    | `/notes`       | Get all notes                |
| GET    | `/notes?tag=AI`| Get notes filtered by tag    |

## Architecture

```
React (port 3000)  ──Axios──▶  Express (port 5000)  ──Mongoose──▶  MongoDB
```

1. **React** renders the UI, manages state with `useState`, and triggers API calls with `useEffect`.
2. **Axios** sends HTTP requests (`GET` / `POST`) to the Express backend.
3. **Express** handles routes, parses JSON, and uses Mongoose to read/write data.
4. **MongoDB** stores the notes as documents in the `research_notes` database.

**Filtering**: The frontend passes a `?tag=` query parameter. The backend uses a case-insensitive regex to match notes. Notes are refetched automatically whenever the filter input changes.

---

## Interview Explanation

### Why React?
React's component-based architecture and hooks (`useState`, `useEffect`) make it fast to build interactive UIs with minimal boilerplate. Functional components keep the code clean and testable.

### Why Express?
Express is the de-facto standard for Node.js REST APIs. It's lightweight, well-documented, and provides simple middleware composition (CORS, JSON parsing) with minimal setup.

### Why MongoDB?
MongoDB's flexible document model is a natural fit for note-like data that doesn't require rigid relational schemas. Mongoose adds schema validation and a clean API on top.

### How does API communication work?
The React frontend uses Axios to make HTTP requests to the Express backend. `POST /notes` sends a JSON body with title, description, and tag. `GET /notes` retrieves all notes, with an optional `?tag=` query parameter for filtering. CORS middleware on the server allows cross-origin requests from port 3000 to port 5000.

### How does filtering work?
When the user types in the "Filter by Tag" input, React's `useEffect` hook detects the change and calls `GET /notes?tag=<value>`. The backend builds a case-insensitive regex from the query parameter and passes it to Mongoose's `find()`. Results update in real-time as the user types.
