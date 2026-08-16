import logging
import random
from typing import List, Dict, Tuple
from app.config import settings
from app.services.mock_service import MockService

logger = logging.getLogger(__name__)

class GeminiService:
    @staticmethod
    def generate_witness_reply(
        history: List[Dict[str, str]],
        user_message: str,
        system_prompt: str,
        witness_name: str,
        case_summary: str = "",
        lang: str = "fr"
    ) -> Tuple[str, bool]:
        """
        Génère une réponse du témoin IA.
        Retourne un tuple (reply_text, is_mock).
        """
        # Si le mode mock est activé explicitement ou pas de clé API
        if settings.MOCK_DEMO_MODE or not settings.GEMINI_API_KEY:
            logger.info("Utilisation du mode Mock pour le témoin IA.")
            reply = MockService.get_witness_reply(
                user_message=user_message,
                witness_name=witness_name,
                case_summary=case_summary,
                message_count=len(history),
                lang=lang
            )
            return reply, True

        try:
            from google import genai
            from google.genai import types

            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            
            is_en = lang.startswith("en")
            
            # Formater l'historique sous forme de texte pour le contexte
            context = f"SYSTEM INSTRUCTION: {system_prompt}\n"
            context += "CONVERSATION HISTORY:\n"
            for msg in history[-6:]: # garder les 6 derniers échanges
                sender_label = ("Detective" if is_en else "Enquêteur") if msg.get("sender") == "user" else witness_name
                context += f"{sender_label}: {msg.get('content')}\n"
            
            user_label = "Detective" if is_en else "Enquêteur"
            context += f"{user_label}: {user_message}\n{witness_name}:"

            TEMPERAMENTS_FR = [
                "Défensif et légèrement irrité (tu te sens remis en cause)",
                "Passionné et alarmiste (tu insistes sur l'urgence des faits)",
                "Méfiant et paranoïaque (tu soupçonnes une manœuvre ou une provocation)",
                "Évasif et théâtral (tu réponds avec dramatisme)",
                "Indigné et blessé (tu clames ton honnêteté)"
            ]
            TEMPERAMENTS_EN = [
                "Defensive and slightly irritated (you feel challenged)",
                "Passionate and alarming (you emphasize the urgency of the facts)",
                "Suspicious and paranoid (you suspect a trick or provocation)",
                "Evasive and dramatic (you respond theatrically)",
                "Indignant and hurt (you claim your absolute honesty)"
            ]
            chosen_temperament = random.choice(TEMPERAMENTS_EN if is_en else TEMPERAMENTS_FR)

            if is_en:
                sys_instruction = (
                    f"{system_prompt}\n"
                    f"CRITICAL BEHAVIOR & WITNESS RULES:\n"
                    f"1. YOU ARE THE WITNESS, NOT THE INVESTIGATOR. You genuinely believe the news or are reacting to what you experienced. You DO NOT know it is fake or manipulated, and you DO NOT point out mistakes or scams on your own unless the detective explicitly asks you about them!\n"
                    f"2. YOU MUST ANSWER ENTIRELY IN ENGLISH. DO NOT USE FRENCH.\n"
                    f"3. CURRENT MOOD: {chosen_temperament}.\n"
                    f"4. Direct answer: Answer the detective's question naturally in character (1 to 2 sentences max)."
                )
            else:
                sys_instruction = (
                    f"{system_prompt}\n"
                    f"CONSIGNES STRICTES DE JEU DE RÔLE (TÉMOIN) :\n"
                    f"1. TU ES LE TÉMOIN, PAS L'ENQUÊTEUR. Tu crois sincèrement à ce que tu as vu/entendu et tu réagis avec tes émotions. Tu ne sais PAS d'avance que c'est une infox et tu ne dois JAMAIS signaler spontanément d'anomalie, de faute ou de falsification sauf si l'enquêteur te pose précisément la question dessus !\n"
                    f"2. Quand on te demande ce qui se passe ou de raconter, décris simplement la panique ou ce que tu as vu sans donner la solution de l'enquête.\n"
                    f"3. TEMPÉRAMENT DU MOMENT : {chosen_temperament}.\n"
                    f"4. FORMAT : Style parlé direct et naturel (1 à 2 phrases simples maximum). Termine toujours complètement ta phrase."
                )

            models_to_try = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"]
            last_err = None

            for model_name in models_to_try:
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=context,
                        config=types.GenerateContentConfig(
                            system_instruction=sys_instruction,
                            temperature=0.7,
                            max_output_tokens=300
                        )
                    )
                    if response and response.text:
                        return response.text.strip(), False
                except Exception as err:
                    last_err = err
                    continue

            logger.warning(f"Erreur Gemini API ({str(last_err)}). Bascule sur MockService.")
            return MockService.get_witness_reply(
                user_message=user_message,
                witness_name=witness_name,
                case_summary=case_summary,
                message_count=len(history),
                lang=lang
            ), True

        except Exception as e:
            logger.warning(f"Erreur Gemini API ({str(e)}). Bascule sur MockService.")
            return MockService.get_witness_reply(
                user_message=user_message,
                witness_name=witness_name,
                case_summary=case_summary,
                message_count=len(history),
                lang=lang
            ), True

    @staticmethod
    def generate_verdict_feedback(
        case_title: str,
        score: int,
        feedback_details: List[Dict[str, str]],
        user_conclusion_text: str = None,
        user_verdict_decision: str = "fake",
        is_case_fake: bool = True,
        lang: str = "fr"
    ) -> Tuple[str, bool]:
        """
        Génère une analyse pédagogique personnalisée du verdict via Gemini.
        Analysant spécifiquement le texte de conclusion rédigé par le joueur.
        """
        if settings.MOCK_DEMO_MODE or not settings.GEMINI_API_KEY:
            return MockService.get_verdict_feedback(
                case_title=case_title,
                score=score,
                user_verdict_decision=user_verdict_decision,
                is_case_fake=is_case_fake,
                user_conclusion_text=user_conclusion_text,
                lang=lang
            ), True

        try:
            from google import genai
            from google.genai import types

            client = genai.Client(api_key=settings.GEMINI_API_KEY)

            prompt = f"""
            Tu es un expert pédagogique en Éducation aux Médias et à l'Information (MIL) pour l'UNESCO.
            L'utilisateur vient de terminer l'enquête '{case_title}' dans le jeu mobile InfoDetective.
            Statut réel de l'affaire: {"FAUSSE RUMEUR / MANIPULÉE" if is_case_fake else "INFORMATION AUTHENTIQUE ET VÉRIFIÉE"}.
            Décision soumise par le joueur: {"FAUSSE / MANIPULÉE" if user_verdict_decision == "fake" else "VRAIE / VÉRIFIÉE"}.
            Conclusion rédigée en texte libre par le joueur: "{user_conclusion_text or 'Aucune conclusion rédigée'}"
            Score calculé: {score}/1000.
            Langue demandée: {lang}.

            Rédige un bilan pédagogique bienveillant, formateur et concis (en Markdown, max 150 mots) qui :
            1. Évalue la qualité du raisonnement rédigé par le joueur (a-t-il bien repéré les vraies faiblesses ou la fiabilité des sources ?).
            2. Donne un conseil concret pour développer un réflexe d'auto-défense intellectuelle dans la vie réelle.
            """

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.5,
                    max_output_tokens=800,
                    thinking_config=types.ThinkingConfig(thinking_budget=0)
                )
            )

            if response and response.text:
                return response.text.strip(), False
            else:
                return MockService.get_verdict_feedback(
                    case_title=case_title,
                    score=score,
                    user_verdict_decision=user_verdict_decision,
                    is_case_fake=is_case_fake,
                    user_conclusion_text=user_conclusion_text,
                    lang=lang
                ), True

        except Exception as e:
            logger.warning(f"Erreur Gemini API pour le verdict ({str(e)}). Bascule sur MockService.")
            return MockService.get_verdict_feedback(
                case_title=case_title,
                score=score,
                user_verdict_decision=user_verdict_decision,
                is_case_fake=is_case_fake,
                user_conclusion_text=user_conclusion_text,
                lang=lang
            ), True
