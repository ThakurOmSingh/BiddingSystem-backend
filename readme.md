# Bidding System

## Description

This is a Node.js based bidding system project using Express.js, Prisma ORM, and other essential libraries. The server handles backend functionalities such as authentication, real-time bidding, file uploads, and more.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ThakurOmSingh/BiddingSystem-backend.git
   cd BiddingSystem-backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root of your project and add the necessary variables:

   ```env
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   ```

## Usage

### Development

To apply database migrations and start the server in development mode with hot reloading, run:

```sh
npm run start
```

### Production

For production, ensure all migrations are applied and start the server with:

```sh
npx prisma migrate deploy
node index.js
```

## Scripts

- `start`: Applies Prisma migrations and starts the server with `nodemon`.
- `test`: Placeholder for test script.

## Dependencies

### Core Dependencies

- **@prisma/client**: Auto-generated client for Prisma.
- **@types/node**: TypeScript definitions for Node.js.
- **bcrypt**: Library to hash passwords.
- **cors**: Middleware to enable CORS.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web framework for Node.js.
- **express-rate-limit**: Middleware to limit repeated requests to public APIs.
- **generate-password**: Library to generate random passwords.
- **http**: Node.js HTTP module.
- **jsonwebtoken**: Library to handle JWTs.
- **multer**: Middleware for handling file uploads.
- **nodemon**: Tool to automatically restart the server on file changes.
- **prisma**: Next-generation ORM for Node.js.
- **socket.io**: Library for real-time web applications.
- **ts-node**: TypeScript execution environment for Node.js.



## Author

Om Singh Jadon
## Keywords
