# Moodify Project Overview

## Project Summary
Moodify is a full-stack web application that detects the user’s facial expression, maps it to a mood, and plays a song from the backend database that matches that mood. It includes user authentication, a protected home page, webcam-based emotion detection, and an audio player with playback controls.

## What We Built
- A React + Vite frontend with authentication pages for register and login.
- A protected home page that is only accessible after successful login.
- A facial expression detection component using MediaPipe Tasks Vision and Face API logic to determine mood from webcam input.
- A backend Express API that stores song metadata and selects a random song by mood.
- A MongoDB/Mongoose database for users and songs.
- JWT-based authentication with cookies and Redis token blacklist support.
- File upload support for audio and optional poster images using multer and ImageKit.
- A responsive audio player interface with play/pause, seek, volume, replay, and speed controls.

## Key Features
- User registration and login
- Protected application routes
- Mood-based song selection
- Random song selection from backend when multiple songs share the same mood
- Real-time face expression detection from webcam video
- Audio player UI with metadata, poster, and playback controls
- Token-based logout and token blacklist handling via Redis
- Song uploads that read ID3 tags for title and cover art

## Frontend Technologies
- React 19
- Vite
- React Router
- Sass for styling
- Axios for API calls
- @mediapipe/tasks-vision and face-api.js for face detection
- Context API for authentication and song state management

## Backend Technologies
- Node.js and Express
- MongoDB with Mongoose
- dotenv for environment configuration
- bcryptjs for password hashing
- jsonwebtoken for JWT auth
- cookie-parser to read auth cookies
- cors to allow requests from the frontend
- multer for handling file uploads in memory
- node-id3 for reading MP3 metadata
- @imagekit/nodejs for uploading cover art files
- ioredis for Redis connection and token blacklisting

## Project Structure
- `Backend/`
  - `server.js` — bootstraps Express and database connection
  - `src/app.js` — middleware, routes, CORS, JSON parsing
  - `src/config/database.js` — MongoDB connection logic
  - `src/config/cache.js` — Redis connection logic
  - `src/controllers/` — auth and song controller logic
  - `src/routes/` — auth and song routes
  - `src/models/` — user, song, and blacklist models
  - `src/services/storage.services.js` — ImageKit upload helper
  - `src/middlewares/` — auth middleware and multer upload config

- `Frontend/`
  - `src/App.jsx` — root component with context providers and router
  - `src/app.routes.jsx` — route definitions and protected route wrapper
  - `src/features/auth/` — login/register pages, auth context, hooks, API service
  - `src/features/home/` — home page, player component, song context, song API
  - `src/features/expression/` — webcam face detection and mood detection UI
  - `src/features/shared/` — global styles and shared UI assets

## What Was Implemented
- Register and login flows that create users and issue JWT cookies
- Protected route handling for the main home screen
- Mood detection from webcam and sending mood to the backend with `GET /api/song?mood=` request
- Backend random song selection using MongoDB aggregation with `$match` and `$sample`
- Logout route that blacklists tokens in Redis
- Song upload route that accepts audio files and stores metadata including mood
- Frontend player that consumes the returned song and plays audio with UI controls

## Topics Used
- Full-stack web development
- REST API design
- Authentication and authorization
- JWT and cookie security
- Redis for token invalidation
- MongoDB aggregation and random sampling
- Face detection and expression recognition
- Media playback controls in React
- File upload handling and metadata extraction
- Context API for global state management

## Notes
- The backend serves the API at `http://localhost:3000`.
- The frontend is configured to run on `http://localhost:5173`.
- The mood-based song endpoint now returns a random song when multiple songs have the same mood.
- The home page shows either the expression detector or the audio player depending on app state.
