@echo off
title InfoDetective - Serveur de Jeu (FastAPI + Frontend)
chcp 65001 >nul
cd /d "%~dp0"

echo ==============================================================================
echo       INFO DETECTIVE — UNESCO YOUTH HACKATHON 2026
echo       Plateforme d'Investigation Contre la Désinformation
echo ==============================================================================
echo.

if not exist venv (
    echo [1/3] Création de l'environnement virtuel Python...
    python -m venv venv
    echo [2/3] Installation des dépendances...
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    echo [3/3] Initialisation de la base de données...
    python seed.py
) else (
    call venv\Scripts\activate.bat
)

echo.
echo [✓] Lancement du serveur sur http://localhost:8000 (et sur le réseau local 0.0.0.0:8000)...
echo [✓] Ouverture automatique de votre navigateur...
echo.

start http://localhost:8000

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause
