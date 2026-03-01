# Carin Siwa – Portfolio

Modern full-stack portfolio: **Next.js** (frontend + admin), **NestJS** (API), **MySQL** (database).

## Stack

| Layer    | Tech              | Path    |
|----------|-------------------|---------|
| Frontend | Next.js 14 (App Router), Tailwind CSS | `client/` |
| Backend  | NestJS, TypeORM   | `server/` |
| Database | MySQL             | (configure in `server`) |

## Quick start

### 1. Database

Create a MySQL database and set `DATABASE_URL` (or host/user/password) in `server/.env`.

### 2. Backend

```bash
cd server
npm install
npm run start:dev
```

API: http://localhost:3001 (or port in `server/.env`).

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

Site: http://localhost:3000  
Admin: http://localhost:3000/admin

## Env files

- **client**: `client/.env.local` – `NEXT_PUBLIC_API_URL=http://localhost:3001`
- **server**: `server/.env` – DB credentials, port, etc.

## Features

- **Client**: Home, Development, Design, Wildlife, Contact; dark mode; responsive; SEO.
- **Admin**: Manage projects, design works, wildlife media, messages (CRUD).
- **API**: REST endpoints for projects, designs, wildlife, contact messages.

## Design

- Accent: deep green / burnt orange
- Dark mode, minimalist layout, strong typography, smooth animations
