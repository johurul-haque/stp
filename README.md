## Getting Started
After installing all of the dependencies change the `.env.example` file `.env` and add the necessary variables.

```ini
DATABASE_URL="postgres://..."

NODE_ENV='development'
JWT_SECRET='secret'
```

Use the following scripts to spin up your app.

> ⚠️ Only use npm while building your app
```bash
# dev server
npm run dev

# production build
npm run build

# running in production
npm start
```

## Tech stack
- **TypeScript** - Static type checking
- **Express.js** - Route handling and middleware
- **MongoDB** - Storing and managing data
- **Mongoose** - Data modeling and query building
- **Zod** - Validating and parsing incoming and inferring types
- **JSON Web Token** - Authenticating users

## Models:

### User
- **id (String):** A distinctive identifier for each user.
- **name (String):** The name of the user.
- **email (String):** The email address of the user.
- **p*assword (St*ring):** The hashed password of the user.
- **createdAt (DateTime):** The timestamp indicates when the user was created.
- **updatedAt (DateTime):** The timestamp indicates when the user was last updated.

### Trip
- **id (String):** A distinctive identifier for each trip.
- **userId (String):** A reference to the user who created the trip.
- **destination (String):** The destination of the trip.
- **startDate (String):** The start date of the trip.
- **endDate (String):** The end date of the trip.
- **budget (Number):** The budget for the trip.
- **activities (String[]):** An array of activities planned for the trip.
- **createdAt (DateTime):** The timestamp indicates when the trip was created.
- **updatedAt (DateTime):** The timestamp indicates when the trip was last updated.

### Travel Buddy Request
- **id (String):** A distinctive identifier for each travel buddy pairing.
- **tripId (String):** A reference to the trip associated with the travel buddy pairing.
- **userId (String):** A reference to the user who is a potential travel buddy.
- **status (String):** The status of the travel buddy pairing (e.g., PENDING, APPROVED, REJECTED).
- **createdAt (DateTime):** The timestamp indicates when the travel buddy pairing was created.
- **updatedAt (DateTime):** The timestamp indicates when the travel buddy pairing was last updated.

### Profile
- **id (String):** A distinctive identifier for each user profile.
- **userId (String):** A reference to the user associated with the profile.
- **bio (String):** A brief bio or description of the user.
- **age (Integer):** Age of the user.
- **createdAt (Date):** The timestamp indicating when the user profile was created.
- **updatedAt (Date):** The timestamp indicating when the user profile was last updated.

## Relational Description: 

1. **User Model:**
   - One-to-One relationship with UserProfile (each user has one profile).
   - One-to-Many relationship with Trip (each user can create multiple trips).
   - One-to-Many relationship with Travel Buddy Request (each user can send or receive multiple buddy requests).

2. **Trip Model:**
   - Many-to-One relationship with User (each trip belongs to one user).
   - One-to-Many relationship with Travel Buddy Request (each trip can have multiple buddy requests).

3. **Travel Buddy Request Model:**
   - Many-to-One relationship with User (each request belongs to one user).
   - Many-to-One relationship with Trip (each request belongs to one trip).

4. **UserProfile Model:**
   - One-to-One relationship with User (each profile belongs to one user).

### **Sample Error Responses**

- For Validation Error (Zod):

```json
{
    "success": false,
    "message": "Name field is required. Email must be a valid email address.",
    "errorDetails": {
        "issues": [
            {
                "field": "name",
                "message": "Name field is required."
            },
            {
                "field": "email",
                "message": "Email must be a valid email address."
            }
        ]
    }
}
```

- For General or Generic Errors

```json
{
    "success": false,
    "message": "error mesage",
    "errorDetails": error
}
```

- Unauthorized Error Response

If an unauthorized access attempt is detected, the system will respond with the following error message:

```json
{
    "success": false,
    "message": "Unauthorized Access",
    "errorDetails": error
}
```

Error Scenarios: `JWT Expiry`, `Invalid JWT`, `Undefined JWT`, `Not Authorized User`, `Access Denied`, etc.

## **Endpoints:**

### **1. User Registration**

- **Endpoint:** **`POST /api/register`**

**Request Body:**

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password", // password should be stored as a hash
    "profile": {
        "bio": "Passionate about helping people find their lost items.",
        "age": 30
		}
}
```

**Response** (Response should not include the password):

```json
{
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bvf",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
    }
}
```

### **2. User Login**

`POST /api/login`

**Request Body:**

```json
{
    "email": "john@example.com",
    "password": "password"
}
```

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bvf",
        "name": "John Doe",
        "email": "john@example.com",
        "token": "<JWT token>",
    }
}
```

### **3. Create a Trip**

`POST /api/trips`

**Headers:** `Authorization: <JWT_TOKEN>`

**Request Body:**

```json
{
    "destination": "Paris, France",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "budget": 1500,
    "activities": ["Eiffel Tower visit", "Louvre Museum tour"],
}
```

**Response:**

```json
{
    "success": true,
    "statusCode": 201,
    "message": "Trip created successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016ghi",
        "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
        "destination": "Paris, France",
        "startDate": "2024-06-01",
        "endDate": "2024-06-07",
        "budget": 1500,
        "activities": ["Eiffel Tower visit", "Louvre Museum tour"],
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
		}
}
```

### **4. Get Paginated and Filtered Trips**

`GET /api/trips`

**Query Parameters**

- `destination`: Filter trips by destination.
  
- `startDate`: Filter trips by start date.
- `endDate`: Filter trips by end date.
- `budget`: Filter trips by budget range. Example: ?minBudget=100&maxBudget=10000
- `searchTerm`: Searches for trips based on a keyword or phrase. Only applicable to the following fields: `destination`, `budget`, etc.
- `page`: Specifies the page number for paginated results. Default is 1. Example: ?page=2
- `limit`: Sets the number of data per page. Default is 10. Example: ?limit=5
- `sortBy`: Specifies the field by which the results should be sorted. Only applicable to the following fields: `destination`, `budget`. Example: ?sortBy=budget
- `sortOrder`: Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc
  
**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Trips retrieved successfully",
    "meta": { // only for paginated result
      "page": 1,
      "limit": 10,
      "total": 20
	   },
    "data": [
        {
            "id": "b9964127-2924-42bb-9970-60f93c016ghi",
            "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
            "destination": "Paris, France",
            "startDate": "2024-06-01",
            "endDate": "2024-06-07",
            "budget": 1500,
            "activities": ["Eiffel Tower visit", "Louvre Museum tour"],
            "createdAt": "2024-03-24T12:00:00Z",
            "updatedAt": "2024-03-24T12:00:00Z"
        },
        // More trips
    ]
}
```

### **5. Send Travel Buddy Request**

`POST /api/trip/:tripId/request`

**Headers:** `Authorization: <JWT_TOKEN>`

**Request Body:**

```json
{
    "userId": "b9964127-2924-42bb-9970-60f93c016xyz"
}
```

**Response:**

```json
{
    "success": true,
    "statusCode": 201,
    "message": "Travel buddy request sent successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
        "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
        "status": "PENDING",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
    }
}
```

### **6. Get Potential Travel Buddies For a Specific Trip**

`GET /api/travel-buddies/:tripId`

**Headers:** `Authorization: <JWT_TOKEN>`

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Potential travel buddies retrieved successfully",
    "data": [
        {
            "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
            "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
            "userId": "b9964127-2924-42bb-9970-60f93c016xyz",
            "status": "PENDING",
            "createdAt": "2024-03-24T12:00:00Z",
            "updatedAt": "2024-03-24T12:00:00Z",
            "user": {
	            "name": "John Doe",
              "email": "john@example.com",
              // other user fields are optional
            }
        },
        // More potential travel buddies
    ]
}
```

### **7. Respond to Travel Buddy Request**

`PUT /api/travel-buddies/:buddyId/respond`

**Headers:** `Authorization: <JWT_TOKEN>`

**Request Body:**

```json
{
    "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
    "status": "APPROVED"
}
```

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Travel buddy request responded successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
        "userId": "b9964127-2924-42bb-9970-60f93c016xyz",
        "status": "APPROVED",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:05:00Z"
    }
}
```

### **8. Get User Profile**

`GET /api/profile`

**Headers:** `Authorization: <JWT_TOKEN>`

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "User profile retrieved successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
    }
}
```

### **9. Update User Profile**

`PUT /api/profile`

**Headers:** `Authorization: <JWT_TOKEN>`

**Request Body:**

```json
{
    "name": "John Sina",
    "email": "john.doe@example.com"
}
```

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "User profile updated successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "name": "John Sina",
        "email": "john.doe@example.com",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:05:00Z"
    }
}
```