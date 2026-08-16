import random
from typing import List, Dict, Optional

class MockService:
    @staticmethod
    def get_witness_reply(
        user_message: str = "",
        witness_name: str = "",
        case_summary: str = "",
        message_count: int = 0,
        lang: str = "fr"
    ) -> str:
        """
        Génère une réponse fictive hyper-naturelle basée sur 12 thématiques de mots-clés du prototype.
        """
        msg_lower = (user_message or "").lower()
        name_lower = (witness_name or "").lower()
        is_fr = lang.startswith("fr")

        # ── 0. HISTOIRE / CONTEXTE / RACONTE-MOI ────────────────────────────────────
        if any(k in msg_lower for k in ["histoire", "passé", "passer", "déroulé", "début", "commencé", "résumé", "contexte", "explication", "expliquer", "raconte", "racontes", "s'est-il", "qu'est-ce qui", "de quoi", "déroulement", "arrivé"]):
            if "morel" in name_lower or "solaria" in msg_lower or "eau" in msg_lower:
                return "Tout a commencé il y a 48h : des proches m'ont alerté sur une contamination de l'eau. J'ai vu les premiers chiffres inquiétants et j'ai immédiatement décidé d'informer le public !" if is_fr else "It started 48h ago: people alerted me about contaminated water. I saw rising numbers and shared it right away!"
            elif "chantal" in name_lower or "vaneck" in name_lower or "biovital" in msg_lower:
                return "C'est l'histoire de ma propre transformation ! Après des mois d'épuisement, j'ai essayé la cure BioVital. Voyant des résultats extraordinaires, j'ai voulu en faire profiter mes abonnés." if is_fr else "It's my own transformation story! After fatigue, I tried BioVital and shared the results with my community."
            elif "rossi" in name_lower or "maire" in msg_lower:
                return "Hier soir vers minuit, cette vidéo du Maire instaurant un couvre-feu total a débarqué sur nos groupes. En moins d'une heure, toute la ville ne parlait que de ça !" if is_fr else "Last night around midnight, the Mayor's curfew video landed on activist groups. In an hour, everyone was talking!"
            elif "kevin" in name_lower or "6g" in msg_lower:
                return "Mardi dernier, ils ont fini d'installer cette nouvelle antenne 6G en bas de chez moi. Deux jours plus tard, tous les moineaux du quartier ont mystérieusement disparu !" if is_fr else "Last Tuesday, they finished installing the 6G tower. Two days later, all local sparrows vanished!"
            elif case_summary:
                return f"En résumé : {case_summary} J'ai trouvé ça tellement grave et urgent que j'ai voulu en parler tout de suite !" if is_fr else f"In short: {case_summary} I thought it was so serious that I had to warn people!"
            else:
                return "Au départ, j'ai vu passer un message très alarmant que tout le monde partageait. J'ai voulu en savoir plus et j'ai relayé l'information pour prévenir les gens !" if is_fr else "At first, I saw an alarming post everyone was sharing. I wanted to warn people so I relayed it!"

        # ── Cas particuliers pour témoins d'informations authentiques/spécifiques ────
        if "vance" in name_lower or "grenouille" in msg_lower:
            return "Notre étude a été publiée dans Nature Ecology & Evolution (DOI: 10.1038/s41559-026-02311-5) après 3 cycles d'évaluation par des pairs." if is_fr else "Our paper was published in Nature Ecology & Evolution after peer review."
        elif "dupuis" in name_lower or "éclipse" in msg_lower:
            return "Les calculs d'orbite ont été validés indépendamment par l'Observatoire de Paris, l'ESA et la NASA." if is_fr else "Orbit calculations were independently validated by Paris Observatory, ESA, and NASA."
        elif "sang" in msg_lower or "254" in msg_lower:
            if any(k in msg_lower for k in ["254", "numéro", "kenya", "prefixe"]):
                return "Attendez... +254 c'est l'indicatif du Kenya ?! Oh non, j'ai partagé ça sans vérifier le préfixe !" if is_fr else "Wait... +254 is Kenya's code?! Oh no, I shared without checking!"

        # ── GRILLE COMPLÈTE DE MOTS-CLÉS (11 THÉMATIQUES) ───────────────────────────
        if is_fr:
            # 1. Preuve / Graphique
            if any(k in msg_lower for k in ["graphique", "statistique", "chiffre", "courbe", "logo", "%", "taux", "donnée"]):
                return "Je ne sais pas exactement qui l'a fait, mais il y a le logo d'un laboratoire en haut à droite. Les courbes montent en flèche, ça avait l'air super sérieux..."

            # 2. IA / Deepfake / Retouche
            if any(k in msg_lower for k in ["ia", "intelligence artificielle", "chatgpt", "photoshop", "filtre", "truqué", "généré", "fake", "deepfake", "voix", "visage"]):
                return "Une IA ? Franchement je ne pense pas, les mouvements du visage et la voix sont super naturels. De nos jours on accuse l'IA dès qu'une vérité dérange !"

            # 3. Argent / Business / Sponsor
            if any(k in msg_lower for k in ["argent", "payé", "pub", "sponsor", "vendre", "prix", "gagner", "commission", "code", "bénéfice"]):
                return "Pas du tout ! Enfin, ils m'ont envoyé un échantillon gratuit pour tester, mais je partage surtout parce que le produit a changé mon quotidien !"

            # 4. Anachronisme / Date
            if any(k in msg_lower for k in ["date", "quand", "aujourd'hui", "hier", "année", "ancien", "vieux", "2018", "2020", "2022", "récent"]):
                return "Elle est ré-apparue en haut de mon fil ce matin ! Je n'ai pas vérifié la date exacte de première publication, mais le sujet est super d'actualité."

            # 5. Fausse Expertise / Diplôme
            if any(k in msg_lower for k in ["expert", "docteur", "scientifique", "diplôme", "spécialiste", "chercheur", "étude", "professeur"]):
                return "C'est le compte d'un chercheur indépendant suivi par 50 000 personnes. De toute façon, les experts des plateaux télé sont tous payés par les labos !"

            # 6. Fact-Checkers / Médias / Démenti
            if any(k in msg_lower for k in ["fact-check", "afp", "décodeurs", "libération", "médias", "journaliste", "journal", "démenti", "intox"]):
                return "Les fact-checkers travaillent pour les grands médias ! Ils cherchent juste à discréditer les citoyens qui posent des questions dérangeantes."

            # 7. Photo / Image
            if any(k in msg_lower for k in ["photo", "image", "couleur", "bouteille", "robinet", "marron", "récente", "tuyau", "visuel"]):
                return "Le gars qui a posté disait que ça venait de son quartier ce matin. Après, je n'ai pas vérifié si la photo était récente, mais ça faisait peur."

            # 8. Vérification (Mairie, Officiel, Site)
            if any(k in msg_lower for k in ["vérifié", "officiel", "mairie", "gouvernement", "site", "ville", "ars"]):
                return "Pas vraiment... Quand tu lis que l'eau peut te rendre malade dans l'heure, tu n'as pas le temps de chercher un communiqué officiel, tu réagis vite !"

            # 9. Émotion / Peur
            if any(k in msg_lower for k in ["peur", "panique", "danger", "malade", "hôpital", "inquiète", "paniqué", "doute", "alerte"]):
                return "Peut-être, mais si c'était vrai ? Dans le doute, je préfère alerter mes proches plutôt que de laisser des gens tomber malades."

            # 10. Origine / Source (Général)
            if any(k in msg_lower for k in ["source", "qui", "d'où", "auteur", "trouvé", "vu", "sors", "envoyé", "partagé", "provenance"]):
                return "Franchement, j'ai vu ça tourner dans notre groupe de promo sur WhatsApp. Tout le monde relayait la capture d'écran, alors je me suis dit que c'était urgent de prévenir les autres !"

            # 11. Fallback par défaut
            return "Écoute, tout est allé très vite. Regarde bien les captures et les documents du dossier, c'est tout ce que j'ai reçu. À toi de voir si ça tient la route ou pas !"

        else:
            # Version anglaise équivalente
            if any(k in msg_lower for k in ["chart", "statistic", "number", "curve", "logo", "%", "rate", "data"]):
                return "I don't know exactly who made it, but there's a lab logo at the top right. The curve goes way up, it looked really official..."
            if any(k in msg_lower for k in ["ai", "deepfake", "fake", "filter", "photoshop", "voice", "generated"]):
                return "An AI? I doubt it, the voice and face movements look so real. People blame AI whenever the truth hurts!"
            if any(k in msg_lower for k in ["money", "paid", "ad", "sponsor", "sell", "price", "commission"]):
                return "Not at all! Well, they sent a free sample to test, but I share mainly because it really improved my life!"
            if any(k in msg_lower for k in ["date", "when", "today", "yesterday", "year", "old", "recent"]):
                return "It popped back up on my feed this morning! I didn't check the exact original date, but it's super relevant today."
            if any(k in msg_lower for k in ["expert", "doctor", "scientist", "degree", "specialist", "researcher", "study"]):
                return "It's an independent researcher's account with 50,000 followers. TV experts are all paid by big labs anyway!"
            if any(k in msg_lower for k in ["fact-check", "afp", "media", "journalist", "debunk", "fake news"]):
                return "Fact-checkers work for mainstream media! They just want to silence citizens who ask disturbing questions."
            if any(k in msg_lower for k in ["photo", "image", "color", "bottle", "tap", "brown", "recent"]):
                return "The guy who posted said it was from his neighborhood this morning. I didn't check if the photo was recent, but it looked scary."
            if any(k in msg_lower for k in ["verified", "official", "city", "government", "news", "site", "statement"]):
                return "Not really... When you read that water could make you sick in an hour, you don't take time for official statements, you react fast!"
            if any(k in msg_lower for k in ["fear", "panic", "danger", "sick", "hospital", "doubt", "worried", "panicked"]):
                return "Maybe, but what if it was true? In doubt, I'd rather warn my loved ones than let people get sick."
            if any(k in msg_lower for k in ["source", "who", "where", "author", "found", "saw", "send", "sent"]):
                return "Honestly, I saw this trending in our WhatsApp promo group. Everyone was sharing the screenshot, so I thought it was urgent to warn others!"
            return "Look, everything happened so fast. Check the screenshots and documents in the file, that's all I got. Up to you to see if it holds up!"

    @staticmethod
    def get_verdict_feedback(
        case_title: str = "Enquête",
        score: int = 800,
        user_verdict_decision: str = "fake",
        is_case_fake: bool = True,
        user_conclusion_text: str = "",
        lang: str = "fr"
    ) -> str:
        """
        Génère un bilan pédagogique personnalisé et structuré.
        """
        is_fr = lang.startswith("fr")
        correct_decision = (user_verdict_decision == "fake" and is_case_fake) or (user_verdict_decision == "true" and not is_case_fake)

        if is_fr:
            if correct_decision:
                header = f"### 🟢 Bilan de l'Enquête : {case_title}\n\n"
                eval_text = "**Félicitations Détective !** Vous avez rendu le bon verdict.\n\n"
                if is_case_fake:
                    details = (
                        "1. **Analyse des sources** : Vous avez identifié l'absence de sources vérifiables ou de publications officielles.\n"
                        "2. **Pièges de manipulation** : Les éléments visuels ou graphiques comportaient des biais évidents.\n"
                        "3. **Réflexe MIL** : Ne vous fiez pas au nombre de partages ou au ton alarmiste."
                    )
                else:
                    details = (
                        "1. **Sources certifiées** : L'information repose sur des données ouvertes et des institutions reconnues.\n"
                        "2. **Rigueur scientifique** : Les preuves présentées sont étayées par des méthodologies transparentes."
                    )
                tip = "\n\n**💡 Conseil UNESCO MIL :** *La vraie vérification repose sur la transparence de la preuve, pas sur l'émotion du message.*"
                return header + eval_text + details + tip
            else:
                header = f"### ⚠️ Bilan de l'Enquête : {case_title}\n\n"
                eval_text = "**Attention Détective !** Votre verdict diffère de la réalité du dossier.\n\n"
                if is_case_fake:
                    details = "Ce dossier était une **fausse rumeur**. Le témoin utilisait du jargon ou des sources anonymes sans preuve matérielle."
                else:
                    details = "Ce dossier était une **information authentique**. Elle était validée par des données scientifiques certifiées."
                tip = "\n\n**💡 Conseil UNESCO MIL :** *Vérifiez toujours si la source principale est identifiable et vérifiable indépendamment.*"
                return header + eval_text + details + tip
        else:
            if correct_decision:
                return f"### 🟢 Case Review: {case_title}\n\n**Great job Detective!** You reached the correct verdict.\n\n**MIL Tip:** *True verification relies on transparent evidence, not emotional messaging.*"
            else:
                return f"### ⚠️ Case Review: {case_title}\n\n**Caution Detective!** Your verdict differs from the verified facts.\n\n**MIL Tip:** *Always cross-check if the primary source is independently verifiable.*"
