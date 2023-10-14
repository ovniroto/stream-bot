@echo off

title StreamBot v0.3.1

echo [StreamBot] Starting...

where deno.exe >nul 2>&1 || (
    echo [StreamBot] Deno not found! Installing...
    powershell -Command "irm https://deno.land/install.ps1 | iex"
    @deno.exe "--version"
    echo [StreamBot] Deno installed!
)

@deno.exe "run" "-A" "--unstable" "./src/main.ts"

pause