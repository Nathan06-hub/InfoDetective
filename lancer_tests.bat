@echo off
title InfoDetective - Validation des Tests Unitaires
chcp 65001 >nul
cd /d "%~dp0"

echo ==============================================================================
echo       INFO DETECTIVE — SUITE DE TESTS AUTOMATISÉS
echo ==============================================================================
echo.

if exist venv (
    call venv\Scripts\activate.bat
    python -m pytest -v
) else (
    pytest -v
)

echo.
pause
