Set-Location -LiteralPath "C:\Users\Antoine\OneDrive\Bureau\Xerius"
$env:NPM_CONFIG_CACHE = "C:\Users\Antoine\OneDrive\Bureau\Xerius\.npm-cache"
& "C:\Program Files\nodejs\npm.cmd" run dev *> "C:\Users\Antoine\OneDrive\Bureau\Xerius\.next-dev-live.log"
