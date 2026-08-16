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

        # ── 1. DOSSIER 1 : MOUSSA KABORÉ (COUVRE-FEU OUAGADOUGOU) ────────────────────
        if "moussa" in name_lower or "kaboré" in name_lower or "kabore" in name_lower or "ouagadougou" in msg_lower or "couvre-feu" in msg_lower or "sécurité" in msg_lower:
            if is_fr:
                if any(k in msg_lower for k in ["faute", "orthographe", "minestère", "nom", "bizarre", "lettre", "erreur"]):
                    return "Le nom de la page ? 'Minestère de la sécurité'... Attendez, un 'e' à Minestère au lieu d'un 'i' ?! Ah mince, je n'avais même pas fait attention avec la panique !"
                if any(k in msg_lower for k in ["sig", "gouvernement", "officiel", "démenti", "vrai", "faux", "télé", "confirmer", "vrai arrêté", "ministre"]):
                    return "Le Service d'Information du Gouvernement (SIG) vient de démentir formellement : aucun couvre-feu n'est en vigueur ! Le document a été falsifié."
                if any(k in msg_lower for k in ["source", "où", "vu", "trouvé", "publié", "page", "facebook", "post", "qui"]):
                    return "J'ai vu ça sur Facebook sur la page 'Minestère de la sécurité'. Tout le monde partageait en boucle au grand marché de Ouagadougou !"
                if any(k in msg_lower for k in ["panique", "peur", "fermé", "fermer", "marché", "boutique", "pourquoi", "vite", "urgence"]):
                    return "Quand on voit un communiqué avec le logo de la Primature disant 'Couvre-feu à 17h', on a peur de la police ! L'urgence nous a fait agir sans réfléchir."
                return "C'est la panique totale ! Regardez le communiqué officiel publié sur Facebook qui annonce un couvre-feu immédiat à 17h. On doit tout fermer !"
            else:
                if any(k in msg_lower for k in ["typo", "spelling", "minestère", "name", "mistake", "error"]):
                    return "The page name? 'Minestère de la sécurité'... Wait, an 'e' in Minestère instead of an 'i'?! Oh no, I didn't even notice during the panic!"
                if any(k in msg_lower for k in ["sig", "government", "official", "denial", "fake", "true", "confirm"]):
                    return "The Government Information Service (SIG) just issued an official denial: no curfew was ever declared! The document is a total forgery."
                if any(k in msg_lower for k in ["source", "where", "saw", "found", "published", "page", "facebook", "who"]):
                    return "I saw it on Facebook on the 'Minestère de la sécurité' page. Everyone in the central market was sharing it non-stop!"
                return "Everyone is panicking! Look at the official press release on Facebook announcing an immediate curfew at 5 PM. We have to shut down!"

        # ── 2. DOSSIER 2 : ELSA MBARGA (APPEL DON DE SANG LAQUINTINIE) ────────────────
        if "elsa" in name_lower or "mbarga" in name_lower or "laquintinie" in msg_lower or "sang" in msg_lower or "69689898" in msg_lower or "donneur" in msg_lower:
            if is_fr:
                if any(k in msg_lower for k in ["numéro", "69689898", "surtaxé", "arnaque", "crédit", "appeler", "téléphone", "contact"]):
                    return "Des amis ont essayé d'appeler ce numéro 69689898 : c'est un numéro surtaxé qui vide tout le forfait dès qu'on décroche ! C'est une arnaque."
                if any(k in msg_lower for k in ["hôpital", "hopital", "laquintinie", "banque", "médecin", "vérifié", "service", "appelé"]):
                    return "J'ai appelé le service de transfusion de l'hôpital Laquintinie : ils disent qu'ils n'ont JAMAIS émis cet appel et que leurs stocks sont stables !"
                if any(k in msg_lower for k in ["qui", "papa", "père", "envoyé", "transféré", "reçu", "message", "whatsapp", "source", "capture"]):
                    return "En fait c'est une capture d'écran transférée dans notre groupe d'étudiants avec la mention 'Transféré'. Ce n'est pas mon vrai père qui m'a écrit directement !"
                if any(k in msg_lower for k in ["mourir", "émotion", "peur", "pourquoi", "partage", "sentiment", "vite"]):
                    return "Quand on lit 'Ne me laisse pas mourir 🙏', la culpabilité est énorme ! On a peur de laisser mourir quelqu'un alors on partage par compassion."
                return "J'ai reçu ce message désespéré demandant d'urgence 4 donneurs de sang pour l'hôpital Laquintinie... Je dois vite le transférer partout !"
            else:
                if any(k in msg_lower for k in ["number", "69689898", "scam", "phone", "call", "credit"]):
                    return "Friends tried calling that 69689898 number: it's a premium-rate scam that drains mobile credit the moment it connects!"
                if any(k in msg_lower for k in ["hospital", "laquintinie", "blood", "bank", "doctor", "checked"]):
                    return "I called Laquintinie Hospital's blood transfusion service: they confirmed they NEVER issued this alert and their stocks are normal!"
                if any(k in msg_lower for k in ["who", "dad", "father", "sent", "forwarded", "whatsapp", "source"]):
                    return "Actually it's a screenshot forwarded into our student group with the 'Forwarded' tag. It wasn't my real dad messaging me directly!"
                return "I received this desperate message begging for 4 urgent blood donors for Laquintinie Hospital... I need to forward it everywhere fast!"

        # ── 3. QUESTIONS UNIVERSELLES SUR LES FAITS (TOUTES AFFAIRES) ─────────────────
        if is_fr:
            if any(k in msg_lower for k in ["source", "qui a", "d'où", "auteur", "trouvé", "vu où", "qui vous a", "page"]):
                return "J'ai vu passer ça sur les réseaux sociaux. Tout le monde relayait la capture d'écran, alors je me suis dit que c'était urgent de prévenir les autres !"
            if any(k in msg_lower for k in ["photo", "image", "capture", "visuel", "blouse", "labo", "décor"]):
                return "La photo semblait crédible au premier coup d'œil, mais si vous regardez bien l'arrière-plan ou les détails, il y a des choses bizarres..."
            if any(k in msg_lower for k in ["statistique", "chiffre", "pourcentage", "%", "étude", "scientifique", "preuve"]):
                return "Ce sont les chiffres impressionnants qui étaient mis en avant dans le post. Mais maintenant que vous le dites, aucune revue scientifique n'est citée !"
            if any(k in msg_lower for k in ["officiel", "vérifié", "gouvernement", "ministère", "police", "vrai"]):
                return "À vrai dire, je n'ai pas pensé à chercher un communiqué officiel au début. L'urgence et le ton dramatique m'ont fait réagir trop vite !"
            return f"Concernant cette affaire, j'ai agi sous le coup de l'émotion. Regardez bien les documents du dossier, ce sont tous les éléments que nous avons !"
        else:
            if any(k in msg_lower for k in ["source", "who", "where", "author", "found", "saw"]):
                return "I saw this spreading on social media. Everyone was forwarding the screenshot, so I thought it was urgent to warn others!"
            if any(k in msg_lower for k in ["photo", "image", "picture", "visual", "background"]):
                return "The picture looked believable at first glance, but if you inspect the background details closely, something seems off..."
            if any(k in msg_lower for k in ["statistic", "number", "percent", "%", "study", "proof"]):
                return "Those impressive numbers were highlighted in the viral post. But now that you mention it, no scientific journal was ever cited!"
            if any(k in msg_lower for k in ["official", "verified", "government", "ministry", "confirm"]):
                return "To be honest, I didn't think about checking official channels at first. The urgency and dramatic tone made me react without thinking!"
            return "Regarding this case, I reacted out of strong emotion. Look closely at the file documents, that's all the evidence we have!"

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
