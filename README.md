# AI Safety Incident Log API

A RESTful API service for logging and managing AI safety incidents. Built with Node.js, Express, and MySQL.

## Features

- CRUD operations for AI safety incidents
- Data validation
- Error handling
- Sample data included
- RESTful API design

## Project Structure

```
src/
├── config/         # Configuration files
│   ├── database.js    # Database connection
│   ├── database.sql   # Database schema
│   └── setupDatabase.js # Database setup script
├── controllers/    # Route controllers
│   └── incidentController.js
├── models/         # Database models
│   └── incidentModel.js
├── routes/         # API routes
│   └── incidentRoutes.js
└── app.js         # Main application file
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=backend_db
   PORT=3000
   ```

4. Set up the database:
   ```bash
   npm run setup-db
   ```

5. Start the server:
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Documentation

### Get All Incidents
- **URL**: `/api/incidents`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 1,
      "title": "AI Model Bias Detection",
      "description": "An AI model showed significant bias in hiring recommendations...",
      "severity": "High",
      "reported_at": "2024-04-25T12:00:00.000Z"
    },
    // ... more incidents
  ]
  ```

### Get Incident by ID
- **URL**: `/api/incidents/:id`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "id": 1,
    "title": "AI Model Bias Detection",
    "description": "An AI model showed significant bias in hiring recommendations...",
    "severity": "High",
    "reported_at": "2024-04-25T12:00:00.000Z"
  }
  ```
- **Error Response**: `404 Not Found`
  ```json
  {
    "error": "Incident not found"
  }
  ```

### Create New Incident
- **URL**: `/api/incidents`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "title": "New Incident",
    "description": "Description of the incident",
    "severity": "Medium"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": 4,
    "title": "New Incident",
    "description": "Description of the incident",
    "severity": "Medium",
    "reported_at": "2024-04-25T12:00:00.000Z"
  }
  ```
- **Error Response**: `400 Bad Request`
  ```json
  {
    "error": "Missing required fields"
  }
  ```
  or
  ```json
  {
    "error": "Invalid severity level"
  }
  ```

### Delete Incident
- **URL**: `/api/incidents/:id`
- **Method**: `DELETE`
- **Response**: `204 No Content`
- **Error Response**: `404 Not Found`
  ```json
  {
    "error": "Incident not found"
  }
  ```

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Data Validation

- All fields (title, description, severity) are required
- Severity must be one of: "Low", "Medium", "High"
- Title and description cannot be empty strings

## Sample Data

The database comes pre-populated with sample incidents:
1. AI Model Bias Detection (High severity)
2. Data Privacy Breach (Medium severity)
3. Model Drift Detection (Low severity)

## Testing

You can test the API using tools like Postman or curl. Example curl commands:

```bash
# Get all incidents
curl http://localhost:3000/api/incidents

# Get specific incident
curl http://localhost:3000/api/incidents/1

# Create new incident
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"title":"New Incident","description":"Description","severity":"Medium"}'

# Delete incident
curl -X DELETE http://localhost:3000/api/incidents/1
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 