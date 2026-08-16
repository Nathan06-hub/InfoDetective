import logging
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database import init_db
from app.routers import health, users, cases, chat, verdict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Créer le répertoire statique pour les images de preuves
os.makedirs("app/static/images", exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Démarrage du serveur InfoDetective Backend...")
    init_db()
    logger.info("Base de données initialisée avec succès.")
    yield
    logger.info("Arrêt du serveur InfoDetective Backend.")

app = FastAPI(
    title="InfoDetective API - UNESCO Youth Hackathon 2026",
    description="API REST Backend pour le jeu mobile de sensibilisation à la désinformation InfoDetective.",
    version="1.1",
    lifespan=lifespan
)

# Monter les dossiers statiques pour servir l'application PWA, les scripts, styles, images et témoins
if os.path.exists("app/static/css"):
    app.mount("/css", StaticFiles(directory="app/static/css"), name="css")
if os.path.exists("app/static/js"):
    app.mount("/js", StaticFiles(directory="app/static/js"), name="js")
if os.path.exists("app/static/assets"):
    app.mount("/assets", StaticFiles(directory="app/static/assets"), name="assets")
if os.path.exists("app/static/images"):
    app.mount("/images", StaticFiles(directory="app/static/images"), name="images")
if os.path.exists("app/static/Personnages"):
    app.mount("/Personnages", StaticFiles(directory="app/static/Personnages"), name="Personnages")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Configuration CORS pour autoriser la PWA React
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routers API
app.include_router(health.router)
app.include_router(users.router)
app.include_router(cases.router)
app.include_router(chat.router)
app.include_router(verdict.router)

from fastapi.responses import RedirectResponse, FileResponse

# Servir l'application Frontend sur la racine /
@app.api_route("/", methods=["GET", "HEAD"])
def root_app():
    if os.path.exists("app/static/index.html"):
        return FileResponse("app/static/index.html")
    return RedirectResponse(url="/docs")

@app.get("/sw.js")
def service_worker():
    if os.path.exists("app/static/sw.js"):
        return FileResponse("app/static/sw.js", media_type="application/javascript")
    from fastapi import Response
    return Response(content="// sw dummy", media_type="application/javascript")

@app.get("/favicon.ico")
def favicon():
    if os.path.exists("app/static/favicon.ico"):
        return FileResponse("app/static/favicon.ico")
    elif os.path.exists("app/static/assets/icon-192.png"):
        return FileResponse("app/static/assets/icon-192.png")
    from fastapi import Response
    return Response(status_code=204)

@app.api_route("/api", methods=["GET", "HEAD"])
def api_info():
    return {
        "message": "Bienvenue sur l'API InfoDetective (UNESCO Youth Hackathon 2026)",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }
