# Hng-backend
Hng assignments 
# Cat Facts API - HNG Backend Project

A simple Node.js/Express API that returns user information along with random cat facts from the Cat Facts API.

## Live Endpoint

**Base URL:** `https://hng-backend-sodf.onrender.com`

**Endpoint:** `GET /me`

## API Documentation

### GET /me

Returns user information with a random cat fact and current timestamp.

**Request:**
```http
GET /me HTTP/1.1
Host: hng-backend-sodf.onrender.com
```

**Response:**
```json
{
  "status": "success",
  "user": {
    "email": "uchennapeace2003@gmail.com",
    "name": "Onoh Uchenna Peace",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-19T12:34:56.789Z",
  "fact": "Cats have over 20 vocalizations, including the purr, meow, and chirp."
}
```

**Status Code:** `200 OK`

**Content-Type:** `application/json`

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Always returns "success" |
| `user.email` | string | User's email address |
| `user.name` | string | User's full name |
| `user.stack` | string | Backend technology stack |
| `timestamp` | string | Current UTC time in ISO 8601 format |
| `fact` | string | Random cat fact from Cat Facts API |

### Features

- ✅ Fetches a fresh cat fact on every request (not cached)
- ✅ Dynamic timestamp that updates with each request
- ✅ Graceful error handling with fallback message if Cat Facts API is down
- ✅ 5-second timeout on external API calls
- ✅ CORS enabled for cross-origin requests

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the server:**
```bash
npm start
```

4. **Test the endpoint:**
```bash
curl http://localhost:3000/me
```

Or visit `http://localhost:3000/me` in your browser.

### Development Mode

For auto-restart on file changes:
```bash
npm run dev
```

## Testing

### Manual Testing

**Test the main endpoint:**
```bash
curl https://hng-backend-sodf.onrender.com/me
```

**Test multiple times to verify dynamic cat facts:**
```bash
curl https://hng-backend-sodf.onrender.com/me
curl https://hng-backend-sodf.onrender.com/me
curl https://hng-backend-sodf.onrender.com/me
```

**Check timestamp updates:**
Each request should return a different timestamp reflecting the current time.

**Health check endpoint:**
```bash
curl https://hng-backend-sodf.onrender.com/health
```

### Expected Behavior

✅ **Status code:** 200 OK  
✅ **Content-Type:** application/json  
✅ **All required fields present:** status, user (email, name, stack), timestamp, fact  
✅ **Timestamp format:** ISO 8601 (e.g., "2025-10-19T12:34:56.789Z")  
✅ **Cat fact changes:** Different fact on each request  
✅ **Timestamp updates:** Different timestamp on each request  

### Error Handling

If the Cat Facts API is unavailable, the endpoint will return:
```json
{
  "status": "success",
  "user": { ... },
  "timestamp": "2025-10-19T12:34:56.789Z",
  "fact": "Cats are amazing creatures! (Cat Facts API temporarily unavailable)"
}
```

## Project Structure

```
.
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── package-lock.json  # Dependency lock file
├── node_modules/      # Installed dependencies (not in repo)
└── README.md          # This file
```

## Dependencies

- **express** (^4.18.2) - Web framework for Node.js
- **axios** (^1.6.0) - HTTP client for API requests

## Environment Variables

- `PORT` - Server port (default: 3000)

## Deployment

Deployed on [Render](https://render.com) with automatic deployments from GitHub.

### Deployment Configuration

- **Build Command:** `npm install` (or `yarn install`)
- **Start Command:** `npm start`
- **Auto-Deploy:** Enabled

## External API

This project integrates with the [Cat Facts API](https://catfact.ninja):
- **Endpoint:** `https://catfact.ninja/fact`
- **Purpose:** Fetch random cat facts
- **Timeout:** 5 seconds

## Author

**Onoh Uchenna Peace**  
Email: uchennapeace2003@gmail.com  
Stack: Node.js/Express

## License

ISC
