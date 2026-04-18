# API Documentation

Complete API reference for the Event Management Dashboard.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer <token>
```

Tokens are obtained from the login or register endpoints and stored in the response.

---

## Authentication Endpoints

### Register User

Creates a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Responses:**

- `400 Bad Request` - Missing required fields or user already exists
- `500 Internal Server Error` - Server error

---

### Login User

Authenticates a user and returns a token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Responses:**

- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid credentials
- `500 Internal Server Error` - Server error

---

## Event Endpoints

### List Events

Retrieves a paginated list of published events.

**Endpoint:** `GET /events`

**Query Parameters:**

```
page=1              # Page number (default: 1)
limit=10            # Items per page (default: 10)
category=Workshop   # Filter by category (optional)
search=React        # Search in title/description (optional)
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Events retrieved successfully",
  "data": {
    "events": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "title": "React Workshop",
        "description": "Learn React from scratch",
        "slug": "react-workshop",
        "category": "Workshop",
        "startDate": "2024-05-15T10:00:00Z",
        "endDate": "2024-05-15T14:00:00Z",
        "location": {
          "venue": "Tech Hub",
          "address": "123 Main St",
          "city": "New York",
          "state": "NY",
          "country": "USA"
        },
        "registeredCount": 45,
        "capacity": 100,
        "status": "published",
        "image": "https://example.com/image.jpg"
      }
    ],
    "pagination": {
      "current": 1,
      "total": 5,
      "limit": 10,
      "totalRecords": 45
    }
  }
}
```

---

### Get Event Details

Retrieves detailed information about a specific event.

**Endpoint:** `GET /events/:id`

**URL Parameters:**

```
:id - Event ID (MongoDB ObjectId)
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Event retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "React Workshop",
    "description": "Learn React fundamentals, hooks, and state management",
    "slug": "react-workshop",
    "organizerId": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com"
    },
    "category": "Workshop",
    "startDate": "2024-05-15T10:00:00Z",
    "endDate": "2024-05-15T14:00:00Z",
    "timezone": "America/New_York",
    "location": {
      "venue": "Tech Hub",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA",
      "coordinates": {
        "latitude": 40.7128,
        "longitude": -74.006
      }
    },
    "registeredCount": 45,
    "capacity": 100,
    "totalRevenue": 4500,
    "status": "published",
    "visibility": "public",
    "tags": ["react", "javascript", "web-development"],
    "image": "https://example.com/image.jpg",
    "createdAt": "2024-04-01T12:00:00Z",
    "updatedAt": "2024-04-15T12:00:00Z"
  }
}
```

**Error Responses:**

- `404 Not Found` - Event does not exist
- `500 Internal Server Error` - Server error

---

### Create Event

**⚠️ Requires Authentication - Organizer Role**

Creates a new event.

**Endpoint:** `POST /events`

**Request Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "React Workshop",
  "description": "Learn React from scratch",
  "category": "Workshop",
  "startDate": "2024-05-15T10:00:00Z",
  "endDate": "2024-05-15T14:00:00Z",
  "capacity": 100,
  "timezone": "America/New_York",
  "location": {
    "venue": "Tech Hub",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "tags": ["react", "javascript"]
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "React Workshop",
    "slug": "react-workshop",
    "status": "draft",
    "registeredCount": 0
  }
}
```

---

### Update Event

**⚠️ Requires Authentication**

Updates an existing event.

**Endpoint:** `PUT /events/:id`

**Request Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (Same as Create Event)

**Response (200 OK):** Updated event object

---

### Delete Event

**⚠️ Requires Authentication**

Deletes an event.

**Endpoint:** `DELETE /events/:id`

**Request Headers:**

```
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

## Ticket Endpoints

### List Event Tickets

Retrieves all tickets for an event.

**Endpoint:** `GET /events/:eventId/tickets`

**URL Parameters:**

```
:eventId - Event ID (MongoDB ObjectId)
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Tickets retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "eventId": "507f1f77bcf86cd799439012",
      "name": "General Admission",
      "description": "Access to full workshop",
      "type": "paid",
      "price": 99.99,
      "currency": "USD",
      "quantity": 100,
      "quantitySold": 45,
      "saleStartDate": "2024-04-01T00:00:00Z",
      "saleEndDate": "2024-05-14T23:59:59Z"
    },
    {
      "_id": "507f1f77bcf86cd799439021",
      "eventId": "507f1f77bcf86cd799439012",
      "name": "Early Bird",
      "description": "50% off for early registrations",
      "type": "paid",
      "price": 49.99,
      "currency": "USD",
      "quantity": 50,
      "quantitySold": 50,
      "saleStartDate": "2024-04-01T00:00:00Z",
      "saleEndDate": "2024-04-30T23:59:59Z"
    }
  ]
}
```

---

### Create Ticket

**⚠️ Requires Authentication - Event Organizer**

Creates a new ticket type for an event.

**Endpoint:** `POST /events/:eventId/tickets`

**Request Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "VIP Admission",
  "description": "Premium access with lunch included",
  "type": "paid",
  "price": 199.99,
  "currency": "USD",
  "quantity": 30,
  "saleStartDate": "2024-04-01T00:00:00Z",
  "saleEndDate": "2024-05-14T23:59:59Z"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Ticket created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439022",
    "eventId": "507f1f77bcf86cd799439012",
    "name": "VIP Admission",
    "price": 199.99,
    "quantity": 30,
    "quantitySold": 0
  }
}
```

---

## Registration Endpoints

### List Registrations

**⚠️ Requires Authentication**

Retrieves registrations for the authenticated user or event.

**Endpoint:** `GET /registrations`

**Query Parameters:**

```
userId=<userId>     # Filter by user (optional)
eventId=<eventId>   # Filter by event (optional)
page=1              # Page number (default: 1)
limit=10            # Items per page (default: 10)
```

**Request Headers:**

```
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Registrations retrieved successfully",
  "data": {
    "registrations": [
      {
        "_id": "507f1f77bcf86cd799439030",
        "eventId": {
          "_id": "507f1f77bcf86cd799439012",
          "title": "React Workshop"
        },
        "userId": {
          "_id": "507f1f77bcf86cd799439011",
          "email": "user@example.com",
          "firstName": "John",
          "lastName": "Doe"
        },
        "ticketId": "507f1f77bcf86cd799439020",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "phone": "+1234567890",
        "status": "confirmed",
        "paidAmount": 99.99,
        "paymentStatus": "completed",
        "createdAt": "2024-04-20T12:00:00Z"
      }
    ],
    "pagination": {
      "current": 1,
      "total": 1,
      "limit": 10,
      "totalRecords": 1
    }
  }
}
```

---

### Create Registration

**⚠️ Requires Authentication**

Registers a user for an event.

**Endpoint:** `POST /registrations`

**Request Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "eventId": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "ticketId": "507f1f77bcf86cd799439020",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "customFields": {
    "company": "Tech Corp",
    "dietaryRestrictions": "Vegetarian"
  }
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Registration created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "eventId": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "ticketId": "507f1f77bcf86cd799439020",
    "status": "confirmed",
    "paidAmount": 99.99,
    "paymentStatus": "completed",
    "createdAt": "2024-04-20T12:00:00Z"
  }
}
```

**Error Responses:**

- `400 Bad Request` - Missing fields or invalid data
- `401 Unauthorized` - User not authenticated
- `404 Not Found` - Event not found
- `409 Conflict` - User already registered for this event
- `500 Internal Server Error` - Server error

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**

- `200 OK` - Successful GET/PUT request
- `201 Created` - Successful POST request
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication required or invalid
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `500 Internal Server Error` - Server error

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production, consider:

```javascript
// Example implementation
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

---

## Pagination

List endpoints return pagination information:

```json
{
  "pagination": {
    "current": 1, // Current page
    "total": 5, // Total number of pages
    "limit": 10, // Items per page
    "totalRecords": 45 // Total records
  }
}
```

**Navigation:**

- First page: `page=1`
- Next page: `page=2`
- Specific page: `page=5`
- Items per page: `limit=20`

---

## Examples

### Register a user and create an event

```bash
# 1. Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"organizer@test.com",
    "password":"Test123!",
    "firstName":"Jane",
    "lastName":"Organizer"
  }'

# Response contains token

# 2. Create event with token
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title":"Webinar",
    "description":"Learn React",
    "category":"Webinar",
    "startDate":"2024-06-01T10:00:00Z",
    "endDate":"2024-06-01T12:00:00Z",
    "capacity":100,
    "location":{"venue":"Online","city":"New York","state":"NY","country":"USA"}
  }'

# 3. Create ticket
curl -X POST http://localhost:3000/api/events/507f1f77bcf86cd799439012/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name":"General Admission",
    "type":"free",
    "quantity":100,
    "saleStartDate":"2024-05-01T00:00:00Z",
    "saleEndDate":"2024-05-31T23:59:59Z"
  }'
```

---

For more information, see the [DEVELOPMENT.md](./DEVELOPMENT.md) file.
