# TypeScript PostgreSQL Database Manager

A TypeScript-based database management tool for PostgreSQL, providing a robust interface for database operations.

## Features

- TypeScript support for type-safe database operations
- PostgreSQL database integration
- Docker containerization for easy setup and deployment
- Flyway for database migrations

## Prerequisites

- Node.js (Latest LTS version recommended)
- Docker and Docker Compose
- PostgreSQL client (optional, for direct database access)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd ts-postgres-db-manager
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The project uses the following default configuration:

- PostgreSQL:
  - Host: localhost
  - Port: 5432
  - User: postgres
  - Password: postgres
  - Database: mydb

You can modify these settings in the `docker-compose.yml` file.

## Getting Started

1. Start the PostgreSQL database using Docker Compose:
```bash
docker-compose up -d
```

2. Run database migrations (if any):
```bash
# Add migration commands here when implemented
```

## Project Structure

```
.
├── src/               # Source code
├── sql/              # SQL scripts and migrations
├── docker-compose.yml # Docker configuration
├── flyway.conf       # Flyway configuration
├── package.json      # Project dependencies
└── tsconfig.json     # TypeScript configuration
```

## Development

The project uses TypeScript for type safety and better development experience. Key dependencies include:

- `pg`: PostgreSQL client for Node.js
- `ts-node`: TypeScript execution engine
- `typescript`: TypeScript compiler
- `@types/pg`: TypeScript type definitions for pg