@echo off
setlocal
cd /d "%~dp0"

if not exist "node_modules\" (
  echo Les dependances sont absentes. Lancement de setup.cmd...
  call "%~dp0setup.cmd" || exit /b 1
)

call npm run lint || exit /b 1
call npx tsc --noEmit || exit /b 1
call npm run build
exit /b %errorlevel%

