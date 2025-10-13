# Scholarship Website Backend

This is the backend for the Scholarship Website, built with Node.js and Express. It follows an MVC-like architecture and uses MongoDB as the database.

## Tech Stack

- **Node.js:** JavaScript runtime environment.
- **Express:** Web framework for Node.js.
- **MongoDB:** NoSQL database.
- **Mongoose:** ODM library for MongoDB.

## Project Structure

The project follows an MVC-like pattern and is organized into the following main directories:

-   **`src/controllers`**: Handles all incoming request logic and sends appropriate responses.
-   **`src/models`**: Contains all the Mongoose data models and schemas.
-   **`src/routes`**: Defines all the API routes and endpoints for the application.
-   **`src/services`**: Holds the business logic and handles database interactions.
-   **`src/utils`**: Contains utility functions used across the application.

Each of these directories contains an `index.js` file to simplify and structure the exports.

## Coding Conventions

To maintain a clean and consistent codebase, please adhere to the following conventions:

-   **Modular Imports**: When importing modules from within the `src` directory, always import from the corresponding `index.js` file. This helps to keep imports clean and centralized.
-   **Service Layer**: All database interactions and business logic must be placed within the `services` folder. Controllers should only be responsible for handling the request and response cycle.
-   **Clean Code**: Strive to write clean, readable, and maintainable code. AI-powered tools can be used for refactoring and improving the code structure.

## Note on Security

As requested, this project currently does not implement advanced security features like password hashing. The focus is on core features. The `bcryptjs` library is included in the dependencies but is not currently used.