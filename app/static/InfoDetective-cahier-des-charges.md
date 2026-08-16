# Cahier des charges — InfoDetective
UNESCO Youth Hackathon 2026 · Thème : Media & Information Literacy

---

## 1. Présentation du projet

**InfoDetective** est un jeu mobile de sensibilisation à la désinformation. L'utilisateur
incarne un·e détective chargé·e d'enquêter sur de fausses rumeurs fictives (mais réalistes),
en interrogeant un témoin et en analysant des preuves, pour apprendre à reconnaître les
**techniques de manipulation** plutôt que de simplement recevoir une réponse "vrai/faux".

**Public cible** : jeunes de 18 à 30 ans, tous pays, toutes langues.

**Objectif du prototype** : une démonstration jouable de bout en bout (au moins 1 affaire
complète), présentable en 3 à 5 minutes devant un jury.

---

## 2. Objectifs pédagogiques

- Apprendre à identifier des techniques de manipulation concrètes (source falsifiée,
  statistique sans origine, image sortie de son contexte, appel à l'émotion, etc.),
  et pas seulement "c'est vrai" ou "c'est faux".
- Développer un réflexe de questionnement (qui parle ? d'où vient l'info ? qu'est-ce qui
  est vérifiable ?) plutôt que de délivrer un jugement tout fait.
- Donner envie de revenir régulièrement grâce à une mécanique de jeu (progression,
  badges, classement).

---

## 3. Principe de fonctionnement général

L'application s'articule autour d'**"affaires"** (niveaux). Chaque affaire suit toujours
la même structure en 5 étapes :

1. **Brief de mission** — présentation de la rumeur/situation fictive à élucider.
2. **Interrogatoire** — l'utilisateur discute librement avec un témoin. Le témoin n'est
   pas un menu à choix fixes : il doit **comprendre et répondre à des questions posées
   librement**, de façon naturelle et cohérente avec son personnage, sans jamais révéler
   directement si l'information est vraie ou fausse.
3. **Carnet de preuves** — l'utilisateur consulte les éléments recueillis (captures
   d'écran, statistiques, images, documents) et peut les examiner en détail.
4. **Verdict** — l'utilisateur ne dit pas simplement "vrai" ou "faux" : il doit **sélectionner
   les techniques de manipulation** qu'il a identifiées dans le dossier.
5. **Résultat** — un score, un retour pédagogique personnalisé qui explique ce qui a été
   bien vu et ce qui a été manqué, et éventuellement un badge débloqué.

L'application comporte donc 6 écrans principaux :

1. **Accueil** — liste des dossiers disponibles, avec leur statut (verrouillé,
   disponible, terminé).
2. **Brief de mission** — présentation narrative de l'affaire à résoudre, avec un
   bouton pour démarrer l'enquête.
3. **Interrogatoire** — conversation en langage libre avec le témoin.
4. **Carnet de preuves** — liste des éléments recueillis, consultables en détail.
5. **Verdict** — sélection des techniques de manipulation identifiées.
6. **Résultat** — score, retour pédagogique personnalisé et badge débloqué.

---

## 4. Fonctionnalités attendues

### 4.1 Côté joueur

- Voir la liste des affaires disponibles, avec leur statut : verrouillée, disponible,
  terminée.
- Lire le brief d'une affaire avant de commencer.
- Discuter en langage libre (pas de simples boutons de réponse) avec un témoin dont
  les réponses sont générées dynamiquement et restent cohérentes tout au long de la
  conversation.
- Accéder à tout moment au carnet de preuves recueillies pendant l'enquête.
- Sélectionner une ou plusieurs techniques de manipulation au moment du verdict.
- Recevoir un score, un retour pédagogique personnalisé, et un badge en fin d'affaire.
- Conserver sa progression d'une session à l'autre (affaires terminées, badges obtenus,
  scores).

### 4.2 Côté contenu / génération

- Chaque affaire doit pouvoir être **générée ou adaptée** selon la langue et,
  idéalement, le contexte culturel de l'utilisateur — c'est un argument central pour
  un hackathon international.
- Le contenu généré (dialogues du témoin, preuves, feedback final) doit toujours rester
  cohérent avec l'affaire en cours et ne jamais "sortir du personnage".
- Le système doit pouvoir distinguer clairement, en interne, quelles preuves sont
  authentiques et lesquelles sont manipulées, ainsi que la ou les techniques concernées,
  pour pouvoir noter le joueur correctement.

### 4.3 Fonctionnalités transverses

- Système de progression (affaires débloquées progressivement).
- Système de badges/récompenses.
- Support d'au moins deux langues pour le prototype (français, anglais).
- Interface pensée mobile en priorité (utilisation tactile, écran vertical).

---

## 5. Exigences non-fonctionnelles

- **Performance perçue** : les réponses du témoin doivent apparaître avec un délai
  acceptable pour une conversation fluide ; prévoir un signal visuel ("en train
  d'écrire...") pendant la génération pour ne pas donner une impression de blocage.
- **Fiabilité pendant la démonstration** : le prototype doit pouvoir fonctionner de
  façon stable pendant une présentation de 3 à 5 minutes, y compris en cas de réseau
  instable (prévoir une solution de secours si la génération en direct échoue).
- **Accessibilité/Inclusion** : peu de texte imposé à l'écran, contenu compréhensible
  rapidement, adapté à des utilisateurs ayant des niveaux de lecture ou de connectivité
  variables.
- **Cohérence visuelle** : respecter la direction artistique déjà validée (thème
  "dossier d'enquête numérique", voir maquette de référence transmise séparément).

---

## 6. Approche technique (généralités uniquement)

- Le projet reposera sur une **application mobile/web fonctionnant sur smartphone**,
  sans exigence de technologie précise à ce stade — le choix du framework est laissé
  à l'équipe technique selon les compétences disponibles et les contraintes de délai.
- La génération des dialogues, des preuves et du feedback pédagogique reposera sur
  **une API d'intelligence artificielle générative** (le choix retenu pour ce projet
  est une API de type Gemini), appelée depuis le serveur de l'application — jamais
  directement depuis l'appareil de l'utilisateur, pour des raisons de sécurité.
- Une base de données simple suffira pour stocker : le contenu des affaires, la
  progression de chaque utilisateur, les scores et les badges.
- Aucune contrainte d'hébergement particulière n'est fixée ; l'objectif est un
  déploiement simple et rapide, accessible par lien pendant la démonstration.

---

## 7. Contraintes du projet

- **Délai** : prototype fonctionnel à livrer en quelques semaines.
- **Équipe** : 5 à 6 personnes, rôles à répartir (contenu/scénario, intégration
  technique, génération IA, design, présentation finale).
- **Portée du prototype** : il n'est pas nécessaire de livrer un produit complet —
  une affaire jouable de bout en bout, stable et bien présentée, suffit à démontrer
  le concept.

---

## 8. Critères de réussite du prototype

- Un jury peut jouer (ou voir jouer) une affaire complète en moins de 5 minutes et
  comprendre immédiatement le principe sans explication supplémentaire.
- Le joueur ne reçoit jamais un simple "vrai/faux" — il doit toujours raisonner sur
  les techniques utilisées.
- L'expérience donne envie de continuer (affaire suivante visible, badge à débloquer).
- Le concept est présentable comme adaptable à plusieurs langues/pays sans refonte
  du système.
