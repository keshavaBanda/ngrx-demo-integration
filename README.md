# User Management CRUD – Assessment

A User Management CRUD application built using **Angular, NgRx, RxJS, Angular Material, Reactive Forms, and JSON Server**.

The application demonstrates state management, REST API integration, form validation, authentication, routing, and CRUD operations.

## Features

* Login with route guard
* User listing using Angular Material table
* Add user
* Edit user
* Delete user
* Reactive form validation
* Duplicate email validation
* Username validation
* Pagination with serial numbers
* Latest users displayed first
* NgRx Store, Actions, Reducer, Effects, and Selectors
* REST API integration using JSON Server
* Environment-based API URL configuration

## Tech Stack

* **Angular**
* **TypeScript**
* **NgRx**
* **RxJS**
* **Angular Material**
* **Reactive Forms**
* **SCSS**
* **JSON Server**

## Project Structure

```text
src/
├── app/
│   ├── core/
│   │   └── guards/
│   │       └── auth.guard.ts
│   │
│   ├── features/
│   │   ├── login/
│   │   └── user/
│   │       ├── user-list/
│   │       ├── user-add/
│   │       ├── user-edit/
│   │       └── user.service.ts
│   │
│   ├── store/
│   │   └── user/
│   │       ├── user.actions.ts
│   │       ├── user.reducer.ts
│   │       ├── user.effects.ts
│   │       └── user.selectors.ts
│   │
│   ├── app.routes.ts
│   └── app.config.ts
│
├── environments/
│   ├── environment.ts
│   └── environment.development.ts
│
├── db/
│   └── db.json
│
└── styles.scss
```

## Environment Configuration

The API base URL is maintained in Angular environment files instead of being hardcoded in the service.

### Development

`src/environments/environment.development.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### Production

`src/environments/environment.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000'
};
```

The User API URL is constructed in the service:

```typescript
private readonly apiUrl = `${environment.apiUrl}/users`;
```

## How to Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Start JSON Server

Run the following command from the project root:

```bash
json-server --watch src/db/db.json --port 3000
```

The API will be available at:

```text
http://localhost:3000/users
```

### 3. Start Angular Application

Open another terminal and run:

```bash
ng serve
```

Application URL:

```text
http://localhost:4200
```

## API Endpoints

| Operation   | Method | Endpoint     |
| ----------- | ------ | ------------ |
| Get Users   | GET    | `/users`     |
| Get User    | GET    | `/users/:id` |
| Add User    | POST   | `/users`     |
| Update User | PUT    | `/users/:id` |
| Delete User | DELETE | `/users/:id` |

Base URL:

```text
http://localhost:3000
```

## NgRx Flow

The application follows the standard NgRx data flow:

```text
Component
    ↓
Action
    ↓
Effect
    ↓
Service
    ↓
JSON Server API
    ↓
Success / Failure Action
    ↓
Reducer
    ↓
Store
    ↓
Selector
    ↓
Component
```

NgRx is used for managing the user state and handling API-related operations.

## User CRUD Flow

### Create

User details are submitted through a Reactive Form and sent to the API using a POST request.

### Read

Users are loaded from JSON Server and stored in the NgRx Store.

### Update

Existing user information can be edited and updated using a PUT request.

### Delete

Users can be deleted using a DELETE request.

## Pagination

The user list uses Angular Material pagination.

The table displays a **serial number** instead of the backend ID.

The serial number is calculated based on the current page and page size:

```text
Serial Number = (Page Index × Page Size) + Row Index + 1
```

The actual backend ID is retained for update and delete operations.

## Routes

```text
/login
/user
/user/add
/user/edit/:id
```

User routes are protected using the authentication guard.

## Assessment Coverage

* [x] Angular application
* [x] User CRUD operations
* [x] JSON Server REST API
* [x] NgRx Store
* [x] NgRx Actions
* [x] NgRx Reducer
* [x] NgRx Effects
* [x] NgRx Selectors
* [x] Reactive Forms
* [x] Form validation
* [x] Duplicate email validation
* [x] Authentication
* [x] Route Guard
* [x] Angular Material
* [x] Pagination
* [x] Environment-based API configuration
* [x] REST API integration

## Unit Testing Status

> **Unit testing is pending and currently in progress.**


## Author

**Keshava Banda**

Full Stack Developer | Angular | Node.js | NestJS
