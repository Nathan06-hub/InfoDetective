# InfoDetective — Prompt technique ultra-détaillé pour outil de codage IA
*À copier-coller dans Claude Code / Cursor / v0 / Bolt pour générer le prototype rapidement.*

---

## Contexte à donner à l'IA de codage

```
Construis le prototype mobile-first "InfoDetective", une app web (PWA) de sensibilisation
à la désinformation pour un hackathon UNESCO (thème Media & Information Literacy).
Public : 18-30 ans. L'app doit fonctionner sur smartphone (responsive, tactile).
```

## Stack recommandée

- **Frontend** : React + Vite + TailwindCSS (PWA installable, un seul build web = déployable
  facilement pour la démo, pas besoin de compiler pour iOS/Android en quelques semaines).
- **Backend léger** : Node.js/Express *ou* Firebase Functions (pour ne pas exposer la clé API
  Gemini côté client).
- **Base de données** : Firestore (simple, temps réel, gratuit en tier hackathon) — stocke
  progression utilisateur, dossiers débloqués, scores.
- **IA générative** : API Gemini (modèle `gemini-2.5-flash` pour la rapidité/coût en démo,
  possibilité de `gemini-2.5-pro` pour la qualité narrative si le temps de réponse le permet).
- **Auth** : Firebase Auth anonyme (pas de friction à l'inscription pendant la démo/le test).
- **Déploiement** : Vercel ou Firebase Hosting.

*Justification pour le jury : stack 100% gratuite en tier hackathon, déployable en une commande,
pas de build natif à gérer avec 5-6 personnes en quelques semaines.*

---

## Modèle de données (Firestore)

```
/cases/{caseId}
  - title: string
  - country_variants: { fr: {...}, en: {...}, ... }  // localisation
  - difficulty: number (1-3)
  - brief: string
  - witness: { name, role, avatarSeed, personality_prompt }
  - evidence: [ { id, title, type: "screenshot"|"stat"|"image"|"document",
                  content, isManipulated: boolean, technique: string|null } ]
  - correctTechniques: string[]
  - unlockRequirement: caseId|null

/users/{userId}
  - displayName: string
  - completedCases: string[]
  - badges: string[]
  - scoreByCase: { [caseId]: number }
  - streak: number

/sessions/{sessionId}   // une partie en cours
  - userId, caseId
  - chatHistory: [ { role: "player"|"witness", text, timestamp } ]
  - evidenceRevealed: string[]
  - status: "in_progress"|"completed"
```

---

## Écrans à générer (voir maquette jointe `infodetective-mockup.jsx` pour le style exact)

1. **Home** — liste des dossiers (cartes avec numéro, titre, statut verrouillé/actif/terminé)
2. **Brief** — introduction narrative du cas + bouton "Ouvrir l'enquête"
3. **Chat/Interrogatoire** — bulles de chat avec le témoin IA, champ de saisie libre (pas de
   boutons prédéfinis pour laisser une vraie liberté de questionnement), bouton "voir les preuves"
4. **Carnet de preuves** — grille/liste des preuves collectées, chacune cliquable pour zoom + détail
5. **Verdict** — sélection multiple des techniques de manipulation identifiées
6. **Résultat** — score, explication pédagogique générée par IA, badge débloqué

**Direction artistique** (déjà implémentée dans la maquette) : thème "dossier d'enquête numérique",
fond quasi noir (#12141c), accent ambre (#E8A33D) façon ruban de scène de crime, police
`Space Mono` pour les éléments "système/dossier", `Inter` pour le texte courant. Réutilise
exactement cette palette et cette typo pour rester cohérent avec la maquette validée.

---

## Prompts Gemini à implémenter côté backend

### 1. Génération du témoin (dialogue dynamique)

```
SYSTEM PROMPT (à envoyer à chaque tour de conversation) :

Tu incarnes {witness.name}, {witness.role}, dans un jeu éducatif de sensibilisation
à la désinformation. Contexte de l'affaire : {case.brief}

Règles strictes :
- Réponds UNIQUEMENT en tant que ce personnage, jamais en tant qu'IA.
- Ne révèle jamais directement si une info est vraie ou fausse — reste dans ton rôle
  et laisse le joueur en déduire les éléments à travers tes réponses.
- Sois cohérent avec ces faits cachés que tu connais (ne les révèle que si on te
  pose la bonne question) : {case.hiddenFacts}
- Réponds en {langue de l'utilisateur}, dans un registre {registre défini par persona}.
- Limite tes réponses à 2-3 phrases maximum, ton naturel et humain (hésitations,
  émotions), jamais de ton robotique.
- Si le joueur pose une question hors-sujet, reste dans le personnage et ramène
  poliment à l'affaire.

Historique de la conversation :
{chatHistory}

Nouveau message du joueur : {playerMessage}
```

### 2. Génération d'un nouveau dossier (pour scaler à plusieurs pays/langues)

```
SYSTEM PROMPT :

Génère un cas fictif pour le jeu InfoDetective, dans le style JSON suivant :
{
  "title": "...",
  "brief": "... (150 mots max, situation ancrée dans un pays fictif inspiré de {région
             culturelle demandée}, sujet MIL réaliste : santé, environnement, économie
             locale, élection, technologie)",
  "witness": { "name": "...", "role": "...", "personality_prompt": "..." },
  "evidence": [
    { "title": "...", "type": "screenshot|stat|image|document",
      "isManipulated": true/false,
      "technique": "logo falsifié|stat sans source|image hors contexte|
                     appel à la peur|citation inventée|deepfake audio|null" }
  ],
  "correctTechniques": ["..."],
  "hiddenFacts": ["... faits que le témoin connaît mais ne révèle que si on l'interroge bien"]
}

Contraintes :
- Le cas doit être culturellement neutre et respectueux (aucune référence à un pays,
  une religion ou un groupe réel).
- Difficulté demandée : {niveau 1/2/3}.
- Langue de sortie : {langue}.
- Réponds UNIQUEMENT avec le JSON, sans texte autour.
```

### 3. Feedback pédagogique final

```
SYSTEM PROMPT :

Le joueur vient de terminer l'affaire "{case.title}". Il a identifié ces techniques :
{selectedTechniques}. Les techniques réellement présentes étaient : {correctTechniques}.

Génère un feedback pédagogique de 3-4 phrases maximum :
- Félicite ce qui a été correctement identifié.
- Explique simplement ce qui a été manqué, sans ton condescendant.
- Termine par une phrase mémorable et actionnable ("la prochaine fois, réflexe à avoir : ...").
- Ton chaleureux, jamais scolaire. Langue : {langue}.
```

---

## Découpage des tâches pour l'équipe (5-6 personnes)

| Rôle | Responsabilités | Livrables clés |
|---|---|---|
| **Lead technique / Backend** | API Gemini, endpoints chat + génération de cas, sécurité clé API | Backend fonctionnel + 1 affaire jouable de bout en bout |
| **Frontend mobile** | Intégration de la maquette en React réel, navigation, responsive | Les 6 écrans connectés au backend |
| **Game/Content designer** | Écriture des 2-3 premières affaires (brief, témoin, preuves, techniques) | Contenu FR + EN des dossiers |
| **Prompt engineer** | Rédaction/optimisation des prompts Gemini, tests de cohérence | Les 3 prompts système validés et stables |
| **Design/UX** | Cohérence visuelle, icônes, badges, micro-interactions | Charte graphique appliquée partout |
| **Pitch & démo** *(si 6e personne, sinon partagé)* | Script du pitch FR/EN, vidéo de démo, slides de secours | Pitch de 3-5 min rodé + captures d'écran |

**Ordre de développement conseillé (few weeks)** :
1. Semaine 1 : maquette validée (fait) → backend minimal + 1 seul dossier codé en dur pour tester le prompt Gemini.
2. Semaine 2 : intégration frontend réelle, connexion au backend, ajout du système de score/badges.
3. Semaine 3 : 2e et 3e dossier, génération dynamique de cas, polish visuel, tests utilisateurs.
4. Derniers jours : script de pitch, répétitions, vidéo de secours si la démo live échoue.

---

## Points de vigilance techniques à donner à l'IA de codage

- Ne jamais exposer la clé API Gemini côté client — toujours passer par un backend proxy.
- Prévoir un mode "démo hors-ligne" avec des réponses pré-générées en cache, au cas où le
  wifi de la compétition est instable pendant les 3-5 minutes de présentation.
- Gérer la latence de génération IA avec un indicateur de "frappe..." (typing indicator)
  pour que l'attente paraisse naturelle dans le chat.
- Prévoir la structure multilingue dès le départ (`country_variants`) même si seul le
  français et l'anglais sont livrés pour le hackathon — ça sert l'argument "scalable à
  plusieurs pays" devant le jury.
