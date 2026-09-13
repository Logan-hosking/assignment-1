# Phoneme Activity Builder

## Assessment 2 – Cloud Web Application

**Student:** Logan Hosking  
**Student Number:** 21721784

## Project Overview

Phoneme Activity Builder is a Next.js web application designed to help create simple classroom activities using phoneme-based words.

The original application developed for Assessment 1 provided Wordle and Word Search activity builders using frontend data. Assessment 2 extends the application by introducing a backend, database, API routes, CRUD functionality and Docker support.

The application now stores phoneme words and activity configurations in a SQLite database using Prisma ORM. The frontend retrieves this information through API routes rather than relying only on hard-coded data.

## Technologies Used

- Next.js 16
- React
- JavaScript
- Tailwind CSS
- Prisma ORM
- SQLite
- Node.js
- Docker
- Git and GitHub

## Main Features

### Phoneme Word Database

Words are stored in a SQLite database.

Each word can contain:

- English word
- Hint
- Associated word list
- One or more phonemes
- Phoneme position

Phonemes are stored separately rather than as individual characters. This allows phonemes containing multiple characters, such as `tʃ` and `eə`, to be stored correctly.

Example:

**chair**

Phonemes:

- `tʃ`
- `eə`

### Word Management

The **Manage Words** page provides a frontend interface for database CRUD operations.

Users can:

- Create words
- Read stored words
- Edit existing words
- Delete words
- Enter multiple phonemes for each word

### Activity Management

The **Manage Activities** page allows different activity configurations to be stored.

Activities contain information including:

- Activity name
- Activity type
- Difficulty
- Hint
- Associated word list

Supported activity types include:

- Wordle
- Word Search

This allows multiple activity configurations to be stored in the database.

## API Routes

The application uses Next.js API route handlers for backend functionality.

### Words

`GET /api/words`

Returns all stored words and their phonemes.

`POST /api/words`

Creates a new word.

`GET /api/words/[id]`

Returns an individual word.

`PUT /api/words/[id]`

Updates an existing word.

`DELETE /api/words/[id]`

Deletes a word.

### Word Lists

`GET /api/wordlists`

Returns stored word lists.

`POST /api/wordlists`

Creates a word list.

### Activities

`GET /api/activities`

Returns stored activity configurations.

`POST /api/activities`

Creates an activity configuration.

`GET /api/activities/[id]`

Returns an individual activity.

`PUT /api/activities/[id]`

Updates an activity.

`DELETE /api/activities/[id]`

Deletes an activity.

## Health Check

A health check endpoint is available at:

`GET /health`

Successful response:

```json
{
  "status": "ok",
  "service": "phoneme-builder"
}
```

The endpoint returns HTTP status code `200` when the application is running correctly.

## Database

The application uses SQLite with Prisma ORM.

The main database models are:

- `WordList`
- `Word`
- `Phoneme`
- `Activity`

Relationships are used between these models so that words can belong to word lists, words can contain multiple ordered phonemes, and activities can use stored word lists.

The Prisma schema is located at:

`prisma/schema.prisma`

Database migrations are located in:

`prisma/migrations`

## Frontend and Backend Integration

The Wordle and Word Search builders retrieve stored word information from the backend API.

### Wordle

The Wordle builder allows a stored database word to be selected. Its English word and ordered phonemes are then used when creating the activity and downloadable HTML output.

### Word Search

The Word Search builder retrieves the stored word collection and phoneme information from the database. The stored data is used when preparing the activity and generated HTML output.

This connects the original Assessment 1 frontend functionality with the Assessment 2 backend and database.

## Running the Project Locally

Install dependencies:

```bash
npm install
```

Create an `.env` file containing:

```env
DATABASE_URL="file:./prisma/dev.db"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations if required:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open:

`http://localhost:3000`

## Production Build

To create a production build:

```bash
npm run build
```

To start the production application:

```bash
npm start
```

## Docker

A Dockerfile is included so the application can be built and run in a container.

Build the Docker image:

```bash
docker build -t phoneme-builder .
```

Run the container:

```bash
docker run --name phoneme-builder-app -p 3002:3000 phoneme-builder
```

The Dockerised application can then be accessed at:

`http://localhost:3002`

The health endpoint can be tested at:

`http://localhost:3002/health`

## Application Pages

- `/` – Home
- `/wordle` – Wordle activity builder
- `/wordsearch` – Word Search activity builder
- `/manage` – Manage stored words
- `/manage-activities` – Manage activity configurations
- `/settings` – Application settings
- `/about` – About page
- `/health` – Backend health check

## Validation and Error Handling

The backend performs validation when creating and updating database records.

Examples include:

- Required word values
- Required phoneme arrays
- Valid activity types
- Valid difficulty values
- Valid word list references
- Checking records exist before updating or deleting them

The API returns appropriate error responses when requests cannot be completed.

## Version Control

Git and GitHub were used throughout development.

Assessment 2 development was completed using the:

`assessment-2-backend`

branch.

The repository excludes generated and unnecessary development files such as `node_modules`, `.next`, environment files and generated tooling folders.

## AI Acknowledgement

Generative AI tools, including ChatGPT, were used during development as a support tool for troubleshooting, explaining technical concepts, reviewing errors, assisting with code structure and providing guidance during the implementation of Prisma, API routes and Docker.

All generated suggestions were reviewed, tested and integrated into the project by the student. The final application was tested locally and within Docker to confirm that the implemented functionality operated as expected.

## References

## References

Docker, Inc. (n.d.). *Docker documentation*. Docker Docs. https://docs.docker.com/

MDN Web Docs. (n.d.). *HTTP response status codes*. Mozilla. https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

Prisma Data, Inc. (n.d.). *Prisma ORM documentation*. Prisma. https://www.prisma.io/docs/orm

SQLite. (n.d.). *SQLite documentation*. https://www.sqlite.org/docs.html

Vercel. (n.d.). *Next.js documentation*. https://nextjs.org/docs