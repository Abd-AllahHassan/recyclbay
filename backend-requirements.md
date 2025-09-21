# Backend Requirements for RecycleBay Project

This document outlines the detailed backend requirements for the RecycleBay project. The backend will be implemented using Express.js as the web framework, MongoDB as the database, and Cloudinary for media storage.

---

## 1. Technology Stack

- **Node.js** with **Express.js** for RESTful API development
- **MongoDB** for data persistence
- **Mongoose** for MongoDB object modeling
- **Cloudinary** for media (images, videos) storage and management
- **JWT (JSON Web Tokens)** for authentication and authorization
- **bcrypt** for password hashing
- **Cors** for cross-origin resource sharing
- **Helmet** for security headers
- **Winston or similar** for logging

---

## 2. Core Features and API Endpoints

### 2.1 User Management

- User registration with email, password, and profile details
- User login with JWT token issuance
- Password hashing and secure storage
- User roles: Admin, Manager, User
- User profile update and retrieval
- Password reset functionality

### 2.2 Product Management

- CRUD operations for products
- Product fields: name, description, category, price, quantity, images, status (active/inactive)
- Image upload and management via Cloudinary
- Stock management and low stock alerts
- Product search and filtering by category, price, availability

### 2.3 Donations Management

- CRUD operations for donation requests
- Donation fields: donor info, item description, status (pending, approved, rejected)
- Image upload for donation items via Cloudinary
- Admin approval workflow for donations

### 2.4 Orders Management

- CRUD operations for orders
- Order fields: user info, products ordered, quantities, total price, status (pending, processing, completed, cancelled)
- Order history retrieval for users and admins
- Order status updates and notifications

### 2.5 Reports and Analytics

- API endpoints to provide aggregated data for sales, users, donations, and products
- Support for monthly sales, user growth, product category distribution, donation statistics

### 2.6 Notifications

- System to send notifications for new orders, donations, low stock alerts
- API endpoints to retrieve and mark notifications as read

---

## 3. Media Management

- Use Cloudinary for storing and serving product and donation images
- Secure upload endpoints with validation for file types and sizes
- Store Cloudinary URLs in MongoDB documents

---

## 4. Security

- Use HTTPS for all API endpoints (handled at deployment)
- Implement JWT-based authentication and role-based access control
- Validate and sanitize all inputs to prevent injection attacks
- Rate limiting to prevent abuse
- Secure password storage with bcrypt

---

## 5. Database Schema Overview

- **Users**: _id, name, email, passwordHash, role, createdAt, updatedAt
- **Products**: _id, name, description, category, price, quantity, images[], status, createdAt, updatedAt
- **Donations**: _id, donorId, itemDescription, images[], status, createdAt, updatedAt
- **Orders**: _id, userId, products[{productId, quantity}], totalPrice, status, createdAt, updatedAt
- **Notifications**: _id, userId, type, message, read, createdAt

---

## 6. Additional Considerations

- Pagination and sorting support for list endpoints
- Comprehensive error handling and meaningful HTTP status codes
- API documentation using Swagger or similar tool
- Unit and integration tests for critical components

---

This document serves as a foundation for backend development and can be expanded as the project evolves.
