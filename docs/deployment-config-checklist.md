# Configuration déploiement – suite

La base MySQL est importée sur Aiven. Voici ce qui reste à configurer pour que l’API (Render) et le site (Vercel) fonctionnent en production.

---

## 1. API NestJS sur Render

### 1.1 Code

- **SSL MySQL** : activé dans `server/src/app.module.ts` lorsque `DB_HOST` n’est pas localhost (connexion Aiven depuis Render).

### 1.2 Variables d’environnement (Render → Environment)

À renseigner dans le dashboard Render pour ton Web Service API.

**Base de données Aiven**

| Variable       | Exemple / valeur |
|----------------|------------------|
| `DB_HOST`      | `carin-portfolio-db-thecarinsiwa-8cd8.e.aivencloud.com` |
| `DB_PORT`      | `20156` |
| `DB_USER`      | `avnadmin` |
| `DB_PASSWORD`  | (mot de passe du service Aiven) |
| `DB_NAME`      | `carin_portfolio` |

**URLs et CORS** (adapter avec tes URLs réelles)

| Variable        | Valeur |
|-----------------|--------|
| `API_URL`       | `https://app-thecarinsiwa-api.onrender.com` (URL de ton service Render) |
| `CORS_ORIGIN`   | URL du front Vercel, ex. `https://ton-projet.vercel.app` |
| `FRONTEND_URL`  | Même URL Vercel que `CORS_ORIGIN` |

**Auth admin**

| Variable         | Exemple |
|------------------|---------|
| `JWT_SECRET`     | Chaîne aléatoire forte (ex. générée avec un outil type `openssl rand -hex 32`) |
| `JWT_COOKIE_NAME`| `admin_token` |
| `JWT_EXPIRES_IN` | `7d` |
| `ADMIN_EMAILS`   | `thecarinsiwa@gmail.com` (ou plusieurs adresses séparées par des virgules) |

**Google OAuth**

| Variable              | Valeur |
|-----------------------|--------|
| `GOOGLE_CLIENT_ID`    | (ton Client ID Google) |
| `GOOGLE_CLIENT_SECRET`| (ton Client Secret Google) |
| `GOOGLE_REDIRECT_URI` | `https://app-thecarinsiwa-api.onrender.com/auth/google/callback` (adapter avec l’URL Render de l’API) |

**SMTP (code OTP par email)**

Sur Render, la connexion SMTP (Gmail, etc.) peut être bloquée ou provoquer un timeout. Dans ce cas, utiliser l’option Resend ci-dessous.

| Variable     | Exemple |
|--------------|---------|
| `SMTP_HOST`  | `smtp.gmail.com` |
| `SMTP_PORT`  | `587` |
| `SMTP_SECURE`| `false` |
| `SMTP_USER`  | Ton adresse Gmail |
| `SMTP_PASS`  | Mot de passe d’application Gmail (voir `.env.example`) |
| `SMTP_FROM`  | Optionnel, ex. même que `SMTP_USER` |

**Option : Resend (recommandé pour Render)**

Envoi par API HTTPS (pas de blocage réseau). Si `RESEND_API_KEY` est défini, il est utilisé en priorité à la place du SMTP.

| Variable         | Valeur |
|------------------|--------|
| `RESEND_API_KEY` | Clé API créée sur [Resend → API Keys](https://resend.com/api-keys) |
| `EMAIL_FROM`     | Optionnel. Ex. `Carin Siwa <onboarding@resend.dev>` (domaine test Resend), ou après [vérification d’un domaine](https://resend.com/domains) : `noreply@ton-domaine.com` |

Ne pas définir `PORT` : Render l’injecte automatiquement.

### 1.3 Redéploiement

Après avoir ajouté/modifié les variables sur Render, lancer un **Manual Deploy** (ou faire un push sur la branche connectée) pour que l’API redémarre avec la bonne config.

---

## 2. Google OAuth en production

1. Aller sur [Google Cloud Console – Credentials](https://console.cloud.google.com/apis/credentials).
2. Ouvrir tes identifiants OAuth 2.0 (type « Application Web »).
3. **Authorized redirect URIs** : ajouter  
   `https://app-thecarinsiwa-api.onrender.com/auth/google/callback`  
   (remplacer par l’URL exacte de ton API sur Render).
4. **Authorized JavaScript origins** (si demandé) : ajouter l’URL du site Vercel, ex.  
   `https://ton-projet.vercel.app`
5. Enregistrer.

---

## 3. Frontend Next.js sur Vercel

### 3.1 Importer le projet

1. [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Choisir le dépôt Git du projet.
3. **Root Directory** : `client`.
4. **Framework** : Next.js (détecté automatiquement).
5. Ne pas déployer tout de suite si tu veux d’abord définir les variables.

### 3.2 Variables d’environnement (Vercel)

**Project → Settings → Environment Variables**

| Nom                     | Valeur |
|-------------------------|--------|
| `NEXT_PUBLIC_API_URL`   | `https://app-thecarinsiwa-api.onrender.com` (URL de ton API sur Render) |

### 3.3 Déploiement

Lancer le déploiement (ou laisser le premier déploiement se lancer). Chaque push sur la branche configurée déclenchera un nouveau déploiement.

---

## 4. Vérifications

- **API** : ouvrir `https://ton-api.onrender.com` (ou ta URL) : tu dois avoir une réponse (même une 404 ou une page JSON), pas une erreur de connexion.
- **Site** : ouvrir l’URL Vercel ; la page d’accueil doit se charger et les appels (projets, contact, etc.) doivent aller vers l’API Render.
- **Admin** : aller sur `https://ton-site.vercel.app/admin`, se connecter avec Google ; le redirect doit aller vers l’API Render, puis recevoir le code OTP par email si Resend ou SMTP est configuré.

---

## 5. Résumé ordre des actions

1. Renseigner toutes les variables d’environnement sur **Render** (section 1.2).
2. Redéployer l’API sur Render.
3. Mettre à jour **Google OAuth** (section 2).
4. Créer le projet **Vercel** avec Root Directory = `client`, ajouter `NEXT_PUBLIC_API_URL`, déployer.
5. Tester le site et l’admin.
