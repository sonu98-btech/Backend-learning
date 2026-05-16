# Project Documentation

## Project Overview

This project is a full-stack Notes application built with a React frontend and an Express/MongoDB backend. The main purpose of the project is to let a user create, view, update, and delete notes through a simple UI while storing the note data in a database.

The project is split into two main parts:

- `Frontend/` for the user interface
- `Backend/` for the API and database logic

---

## What I Built

In this project, I built a complete CRUD note management system. The application allows a user to:

- Add a new note with a title and description
- Fetch and display all saved notes
- Delete a note
- Update an existing note

I connected the frontend to the backend using `axios`, and the backend is connected to MongoDB using `mongoose`.

---

## Frontend Work

The frontend was built with React and Vite.

### Main files used

- `Frontend/src/App.jsx`
- `Frontend/src/main.jsx`
- `Frontend/src/index.css`

### What the frontend does

The `App.jsx` file handles the full note UI logic. It manages the note data in React state and communicates with the backend API.

### Frontend features

1. **Initial note state**
   - The component starts with a sample list of notes so the UI has visible content before the backend data loads.

2. **Fetch notes from the backend**
   - When the app loads, it calls the backend API to get all notes.
   - The fetched notes replace the default local notes state.

3. **Create note form**
   - A form is used to collect `title` and `description` from the user.
   - On submit, the form sends a POST request to the backend.
   - After the note is created, the list refreshes so the new note appears immediately.

4. **Delete note action**
   - Each note has a delete button.
   - Clicking delete sends a request to remove the note from the backend.
   - The list is fetched again after deletion.

5. **Update note action**
   - Each note also has an update button.
   - Clicking update opens prompt inputs for the new title and description.
   - The updated note is sent to the backend and the notes list refreshes afterward.

### Frontend behavior flow

- The page loads
- `useEffect` runs and calls the note fetch function
- Notes are loaded from the API
- The user can create, delete, or update notes
- Every change is reflected in the UI by reloading the notes list

### UI structure

The UI is simple and focused on functionality:

- A form at the top for adding notes
- A notes container below the form
- Each note card shows:
  - Title
  - Description
  - Delete button
  - Update button

---

## Backend Work

The backend was built with Express and MongoDB.

### Main files used

- `Backend/server.js`
- `Backend/src/app.js`
- `Backend/src/config/database.js`
- `Backend/src/model/note.model.js`

### What the backend does

The backend exposes REST API endpoints for note operations and connects to MongoDB for persistent storage.

### Backend features

1. **Express server setup**
   - The app is created with `express()`.
   - Middleware is added for JSON parsing and CORS.

2. **Static file serving**
   - The backend can also serve static files from the public folder.
   - This helps with deployment or serving the frontend build.

3. **MongoDB connection**
   - The database connection is handled in `database.js`.
   - `mongoose.connect()` is used with the `MONGO_URI` environment variable.
   - Connection success and failure are logged.

4. **Note model**
   - A Mongoose schema is defined for notes.
   - Each note has:
     - `title`
     - `description`
   - The model is used for database operations.

---

## API Endpoints

The backend provides the following routes:

### `GET /api/notes`

- Fetches all notes from the database
- Returns the note list in JSON format

### `POST /api/notes`

- Creates a new note
- Expects `title` and `description` in the request body
- Saves the note to MongoDB

### `DELETE /api/notes/:id`

- Deletes a note by its MongoDB ID
- Removes the selected note from the database

### `PATCH /api/notes/:id`

- Updates a note by ID
- Updates the title field in the database

---

## Data Flow Between Frontend and Backend

This project works as a full stack CRUD flow:

1. The user opens the frontend UI
2. React loads the current notes from the backend API
3. The user submits a new note
4. The backend stores the note in MongoDB
5. The frontend reloads the note list
6. The user can delete or update any note
7. The backend updates the database
8. The frontend reflects the latest data

---

## Technologies Used

### Frontend

- React
- Vite
- Axios
- JavaScript
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

---

## What I Learned From This Project

This project helped me practice and understand:

- Building a React frontend with functional components
- Using `useState` and `useEffect`
- Sending HTTP requests with `axios`
- Creating REST APIs with Express
- Connecting an app to MongoDB with Mongoose
- Designing CRUD flows between the frontend and backend
- Structuring a project into separate frontend and backend folders

---

## Project Structure

- `Frontend/`
  - React application
  - Handles user interaction and UI updates
- `Backend/`
  - Express server
  - Handles API requests and database operations

---

## Final Summary

This project is a complete Notes CRUD application. I built both the frontend and backend parts, connected them using API calls, and used MongoDB to store the notes permanently. The result is a working full-stack application where users can create, view, edit, and delete notes from a clean and simple interface.
