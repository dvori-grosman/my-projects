# Apartment Marketplace Platform

A backend platform for managing apartment listings, advertisers, cities and categories. The project demonstrates a modular Node.js API with database persistence, authentication, filtering and image-upload support.

## Key Features

- Apartment listing CRUD operations
- Filtering by city, category, advertiser, price range and number of beds
- Advertiser authentication using JWT
- Protected create, update and delete operations
- Image uploads with Multer and file-size/type validation
- MongoDB persistence with Mongoose models
- Modular controllers, routers, models and middleware
- CORS and environment-based configuration

## Tech Stack

- **Runtime:** Node.js
- **API:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Uploads:** Multer
- **Utilities:** dotenv, CORS, body-parser

## Project Structure

```text
api/
├── controllers/   # Request handling and business logic
├── models/        # Mongoose data models
├── routers/       # REST endpoints
└── middlewares.js # Authentication and upload middleware
app.js             # Application entry point
```

## Main API Areas

- `/Apartment` — listing retrieval, filtering and CRUD
- `/Advertiser` — advertiser-related operations
- `/City` — city data
- `/Category` — category data

## Local Setup

1. Install the dependencies defined in `package.json`.
2. Create a `.env` file based on `.env.example`.
3. Start MongoDB locally or provide another MongoDB connection string.
4. Run the Node.js application.

## What This Project Demonstrates

This project focuses on backend architecture for a marketplace-style application: separating routing, data access and middleware concerns; protecting mutations with token-based authentication; working with relational-style references in MongoDB; and supporting real-world features such as filtering and media uploads. The filtering endpoints also show how multiple search dimensions can be exposed through a REST API.
