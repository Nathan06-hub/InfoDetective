#!/bin/bash
set -e

echo "=== Initialisation de la base de données et Seeding ==="
python seed.py

echo "=== Démarrage du serveur Uvicorn ==="
exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
