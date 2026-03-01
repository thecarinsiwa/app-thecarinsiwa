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

Site: http://localhost:3000  
Admin: http://localhost:3000/admin (connexion Google + OTP requis)

## Admin – Connexion Google + OTP

L’accès à `/admin` est protégé : connexion avec un compte Google, puis saisie d’un code à 6 chiffres envoyé par email.

### Configuration (server)

1. **Google OAuth** – [Google Cloud Console](https://console.cloud.google.com/apis/credentials) : créer des identifiants OAuth 2.0 (type « Application Web »), URI de redirection : `http://localhost:3001/auth/google/callback` (adapter en production).
2. **`.env`** (dans `server/`) :
   - `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`
   - `ADMIN_EMAILS` : adresses Gmail autorisées (séparées par des virgules), ex. `ton@gmail.com`
   - `JWT_SECRET` : secret pour les sessions (ex. `openssl rand -hex 32`)
   - **SMTP** (pour envoyer le code OTP) : `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc. (ex. Gmail : mot de passe d’application)

Sans SMTP configuré, le code OTP est affiché dans les logs du serveur (pour le dev).

## Env files

- **client**: `client/.env.local` – `NEXT_PUBLIC_API_URL=http://localhost:3001`
- **server**: `server/.env` – DB credentials, port, etc.

## Features

- **Client**: Home, Development, Design, Wildlife, Contact; dark mode; responsive; SEO.
- **Admin**: Connexion Google + OTP par email ; gestion projets, design, wildlife, messages (CRUD).
- **API**: REST endpoints for projects, designs, wildlife, contact messages.

## Design

- Accent: deep green / burnt orange
- Dark mode, minimalist layout, strong typography, smooth animations
