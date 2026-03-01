# Folder structure

```
app-thecarinsiwa/
├── client/                 # Next.js frontend (App Router)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout + theme
│   │   │   ├── page.tsx         # Home
│   │   │   ├── globals.css
│   │   │   ├── development/
│   │   │   │   └── page.tsx
│   │   │   ├── design/
│   │   │   │   └── page.tsx
│   │   │   ├── wildlife/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── admin/
│   │   │       ├── page.tsx     # Admin dashboard
│   │   │       └── projects/
│   │   │           └── page.tsx
│   │   └── components/
│   │       ├── layout/
│   │       │   ├── Layout.tsx   # Wraps app with Navbar
│   │       │   └── Navbar.tsx   # Sticky nav + dark mode
│   │       ├── theme/
│   │       │   └── ThemeProvider.tsx
│   │       ├── home/
│   │       │   ├── Hero.tsx
│   │       │   ├── AboutSection.tsx
│   │       │   ├── SkillsSection.tsx
│   │       │   ├── FeaturedProjectsSection.tsx
│   │       │   └── ContactCTA.tsx
│   │       ├── development/
│   │       │   ├── ProjectCard.tsx
│   │       │   └── ProjectCard.types.ts
│   │       └── gallery/
│   │           └── Gallery.tsx  # Reusable grid + lightbox
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── tsconfig.json
│
├── server/                 # NestJS backend
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── contact/
│   │   ├── projects/
│   │   ├── designs/
│   │   ├── wildlife/
│   │   └── common/ (entities, DTOs)
│   ├── package.json
│   └── .env.example
│
├── README.md
├── .gitignore
└── FOLDER-STRUCTURE.md (this file)
```

## Design tokens

- **Accent**: deep green `#1a4d3e` / burnt orange `#c2410c`
- **Fonts**: Inter (sans), JetBrains Mono (display) via Next.js Google Fonts
- **Dark mode**: `class` on `html`, toggled in ThemeProvider

## SEO

- Metadata in `layout.tsx` and per-page `metadata` export where needed.
- OpenGraph fields set in root layout.
