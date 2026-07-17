@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1 || (
  echo ERREUR: Node.js est introuvable. Installez Node.js 20 LTS ou plus recent.
  exit /b 1
)

where npm >nul 2>&1 || (
  echo ERREUR: npm est introuvable.
  exit /b 1
)

echo Installation des dependances verrouillees...
call npm ci
exit /b %errorlevel%

