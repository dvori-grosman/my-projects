# Task Management Full Stack App

A full-stack task management application with a React client and an ASP.NET Core API. The backend persists tasks in MySQL through Entity Framework Core and includes Swagger and Docker support.

## Key Features

- Create, list, update and delete tasks
- Mark tasks as complete
- React client communicating with the API through Axios
- ASP.NET Core minimal API endpoints
- Entity Framework Core data access
- MySQL persistence
- Swagger/OpenAPI documentation
- CORS configuration for client-server development
- Docker-ready backend configuration

## Tech Stack

### Frontend
- React 18
- Axios
- Create React App

### Backend
- C# / .NET 8
- ASP.NET Core
- Entity Framework Core 8
- Pomelo MySQL provider
- Swagger / Swashbuckle
- Docker

## Project Structure

```text
TodoApi/
├── react/   # React frontend
└── server/  # ASP.NET Core API and data layer
```

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Return all tasks |
| POST | `/` | Create a task |
| PUT | `/{id}` | Update task completion state |
| DELETE | `/{id}` | Delete a task |

## Running Locally

### Backend

```bash
cd server
dotnet restore
dotnet run
```

Configure the `ToDoDB` connection string for a MySQL 8 database before starting the API.

### Frontend

```bash
cd react
npm install
npm start
```

## What This Project Demonstrates

The project shows end-to-end development across two technology ecosystems: a React UI on the client and a typed C#/.NET API on the server, with ORM-based persistence, API documentation and container-ready configuration.
