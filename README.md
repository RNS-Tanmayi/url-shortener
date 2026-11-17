# url-shortener
# MERN URL Shortener

A full-stack URL Shortener application that converts long URLs into short, shareable links. Users can generate unique short URLs, redirect to original destinations, track link clicks, and generate QR codes for shortened links.

## Features

- **URL Shortening:** Generates unique 7-character short IDs using NanoID.
- **URL Redirection:** Redirects users to the original destination when they access a short URL.
- **URL Validation:** Handles missing and invalid URL submissions.
- **Click Tracking:** Tracks the number of times a shortened URL is accessed.
- **QR Code Generation:** Generates QR codes for shortened URLs with download functionality.
- **Copy to Clipboard:** Allows users to copy generated short URLs.
- **Database Storage:** Stores original URLs, short IDs, and click counts in MongoDB.

## Tech Stack

- **Frontend:** React.js, HTML, CSS, Tailwind CSS v4, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Libraries:** Axios, NanoID, QRCode, React QR Code
- **Testing:** Jest, Supertest, MongoDB Memory Server

## Project Structure

```text
MERN-URL-SHORTENER/
│
├── backend/
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   │   └── url.js
│   ├── tests/
│   │   ├── setup.js
│   │   └── url.test.js
│   ├── app.js
│   ├── server.js
│   ├── jest.config.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database (local MongoDB instance or MongoDB Atlas)
- Git

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd MERN-URL-SHORTENER
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

Replace the MongoDB URI with your own connection string.

Start the backend server:

```bash
npm run dev
```

### 3. Configure the Frontend

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/shorten` | Creates a shortened URL |
| GET | `/:shortId` | Redirects to the original URL |

### Example Request

**POST** `/shorten`

```json
{
  "originalUrl": "https://www.google.com"
}
```

## Automated Testing

The backend API is tested using **Jest** and **Supertest**, with **MongoDB Memory Server** providing an isolated database environment for tests.

### Run Tests

Navigate to the backend directory:

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Current Test Coverage

| Metric | Result |
|---|---:|
| Test cases passed | 5 / 5 |
| Statement coverage | 86.2% |
| Branch coverage | 100% |
| Function coverage | 100% |
| Line coverage | 86.2% |

Coverage results are based on the current automated test suite and can be regenerated using the coverage command.

## Future Improvements

- Add user authentication and personalized URL management.
- Implement URL expiration and deletion.
- Provide analytics for shortened links.
- Add rate limiting and enhanced URL security.

---

**Note:** This project was developed as a learning project to explore full-stack development, REST API design, database integration, and automated backend testing.
