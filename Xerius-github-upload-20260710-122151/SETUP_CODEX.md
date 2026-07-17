# Installation locale de Xerius

## Stack technique

Xerius est une landing page frontend statique construite avec Next.js 15 (App Router), React 19, TypeScript 5 et Tailwind CSS 4. Le projet utilise npm et son fichier `package-lock.json`.

La route `/` reproduit localement la version de reference `xerius-cs2.grizz802.chatgpt.site`. La structure de page, les styles deployes, la police Barlow Condensed et les six etats du module Process sont stockes dans le depot. Le rendu ne charge ni iframe, ni CSS, ni police depuis le site distant.

Il ne contient actuellement ni backend, ni base de donnees, ni migration, ni service externe. Aucune variable d'environnement n'est lue par le code.

## Prerequis Windows

- Windows 10 ou 11
- Git
- Node.js 20 LTS ou une version plus recente compatible avec Next.js 15
- npm, fourni avec Node.js

Versions utilisees pendant la verification Codex : Git 2.53.0, Node.js 24.14.1 et npm 11.11.0.

## Installation depuis une nouvelle machine (CMD)

```cmd
cd /d "C:\Users\VOTRE_NOM\Documents\Codex"
git clone https://github.com/antoinedavid23/Xerius.git Xerius
cd Xerius\Xerius-github-upload-20260710-122151
setup.cmd
```

`setup.cmd` execute `npm ci` et respecte donc exactement le verrouillage des dependances.

## Variables d'environnement

Aucune variable n'est necessaire. Aucun fichier `.env` n'a ete cree. Si des integrations sont ajoutees plus tard, conserver les secrets dans `.env.local` et l'ajouter aux exclusions Git avant utilisation.

## Commandes

```cmd
start-dev.cmd
build.cmd
npm run lint
npx tsc --noEmit
```

Le depot ne definit actuellement aucun test automatise.

## Lancement et ports

Le serveur de developpement ecoute sur le port 3001 :

```text
http://localhost:3001
```

Pour un lancement manuel :

```cmd
npm run dev
```

## Base de donnees et services

Sans objet dans la version actuelle : aucune base, migration, seed, API ou configuration Docker n'a ete detectee.

## Verification Codex

- Installation : `npm ci` reussie (328 paquets installes).
- Lint : reussi.
- Types : `npx tsc --noEmit` reussi.
- Build de production : reussi ; la route `/` est prerendue statiquement.
- Comparaison visuelle : geometrie identique sur les 15 285 px de la page en 1569 x 920 ; rendu strictement identique en 390 x 844 et 768 x 1024.
- Interactions : menu mobile et changement des six etapes du Process verifies.
- Tests : non executes, car aucun script ni framework de test n'est configure.
- Audit npm : 2 alertes moderees liees a PostCSS embarque par Next.js ; npm ne propose aucune correction compatible automatique (`fixAvailable: false`).

## Problemes rencontres et corrections

- Le backend TLS Windows de Git a refuse le premier clonage. Le depot a ete clone sans changer la configuration globale avec `git -c http.sslBackend=openssl clone ...`.
- La copie Git locale et le site deploye ne correspondaient plus. Le DOM et les styles de la version de reference ont donc ete reconstruits dans `public/mirror`, avec le runtime d'interaction dans `src/components/landing/LiveMirrorRuntime.tsx`.
- Les fichiers de police Barlow Condensed utilises par le deploiement ont ete rapatries dans `public/mirror/fonts` pour conserver exactement la metrique du logo, des titres et des boutons.
- Les scripts Windows et ce guide ont ete ajoutes pour rendre l'installation reproductible.

## Fichiers de la copie visuelle

- `public/mirror/main.html` : structure complete de la landing page.
- `public/mirror/process-states.json` : contenu des six etapes de la section Process.
- `public/mirror/fonts/` : polices Barlow Condensed locales.
- `src/app/xerius-mirror.css` : feuille de style exacte de la reference.
- `src/app/barlow-mirror.css` : declarations de police locales.
- `src/components/landing/LiveMirrorRuntime.tsx` : menu mobile et comportement du Process au scroll.

## Build de production

`build.cmd` genere le dossier `.next`. Pour servir ensuite le build avec Next.js, utilisez :

```cmd
npx next start -p 3001
```
