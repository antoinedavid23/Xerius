# Xerius

Xerius est une landing page Next.js pour une plateforme d'analyse CS2. Le site presente une experience marketing immersive autour des pronostics, analyses de match, modules produit, pricing, FAQ et sections de confiance.

## Fonctionnalites

- Hero visuel avec navigation flottante.
- Sections de presentation pour les problemes utilisateurs et les modules Xerius.
- Experience de features avec scroll epingle.
- Sections resultats, social proof, pricing, FAQ et CTA final.
- Interface responsive desktop, tablette et mobile.
- Styling Tailwind CSS avec une direction artistique sombre et esport.

## Technologies

- Next.js avec App Router
- React
- TypeScript
- Tailwind CSS
- ESLint

## Installation

```bash
npm install
```

## Lancer le projet en developpement

```bash
npm run dev
```

Le site est disponible sur :

```bash
http://localhost:3001
```

## Verification

```bash
npm run lint
npm run build
```

## Structure principale

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    landing/
public/
  assets/
```

## Notes de securite

Les fichiers d'environnement, logs, caches, dependances installees et documents de travail locaux sont ignores par Git via `.gitignore`.
