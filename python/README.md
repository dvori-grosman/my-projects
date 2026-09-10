# Python Client-Server Game Platform

A Python client-server application that combines an interactive command-line game with a Flask REST service and MongoDB persistence. The client maintains a session with the server and stores player history across sessions.

## Key Features

- User registration and login
- Session-aware client-server communication
- Interactive command-line gameplay
- Persistent game statistics and word history
- REST endpoints for create, read and update workflows
- MongoDB-backed user data
- Decorator-based session checks on protected client actions
- ASCII terminal output for game feedback

## Tech Stack

### Client
- Python
- Requests
- pyfiglet

### Server
- Flask
- Flask-CORS
- PyMongo
- MongoDB

## Architecture

```text
CLI Client
   ↓ HTTP / session cookie
Flask REST API
   ↓
MongoDB
```

The client uses a persistent Requests session to communicate with the Flask API. Server endpoints manage users, login state, gameplay access, history and updates.

## Main API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/add` | Register a user |
| POST | `/login` | Authenticate and create a session |
| GET | `/play` | Verify an active session |
| POST | `/history/<name>` | Read player history |
| PUT | `/update/<id>` | Persist game statistics |

## What This Project Demonstrates

The project demonstrates Python application structure across both sides of an HTTP boundary: a stateful CLI client, REST communication, cookie-based sessions, persistence and separation between gameplay logic and server-side data management.
