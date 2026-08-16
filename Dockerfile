# Image de base Python optimisée
FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Empêcher Python d'écrire des fichiers .pyc
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Installer les dépendances système nécessaires (notamment pour PostgreSQL)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copier le fichier des dépendances
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copier le code source de l'application
COPY . .

# Rendre le script de démarrage exécutable
RUN chmod +x start.sh

# Exposer le port par défaut
EXPOSE 8000

# Commande de démarrage par défaut via start.sh
CMD ["./start.sh"]
