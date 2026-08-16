from sqlmodel import SQLModel, Session, select
from app.database import engine, init_db
from app.models.case import Case, Evidence, ManipulationTechnique, CaseTechniqueLink
from app.models.badge import Badge

def seed_database(engine_override=None):
    target_engine = engine_override if engine_override is not None else engine
    SQLModel.metadata.drop_all(target_engine)
    init_db(target_engine)
    with Session(target_engine) as session:
        # 1. CATALOGUE DES TECHNIQUES
        techniques_data = [
            {
                "code": "aucune",
                "name_fr": "Information Vérifiée & Authentique",
                "name_en": "Verified & Authentic Information",
                "description_fr": "L'information repose sur des faits réels et vérifiés.",
                "description_en": "Information is genuine and verified.",
                "icon": "check-circle",
                "category": "source"
            },
            {
                "code": "source-anonyme",
                "name_fr": "Source anonyme",
                "name_en": "Anonymous source",
                "description_fr": "L'auteur ou la source de l'information n'est pas identifiable.",
                "description_en": "Author or source is unknown.",
                "icon": "user-x",
                "category": "source"
            },
            {
                "code": "stat-trompeuse",
                "name_fr": "Statistique trompeuse",
                "name_en": "Misleading statistic",
                "description_fr": "Chiffres sans source ou inventés.",
                "description_en": "Numbers without source or fabricated.",
                "icon": "bar-chart",
                "category": "visual"
            },
            {
                "code": "image-hors-contexte",
                "name_fr": "Image hors contexte",
                "name_en": "Out of context image",
                "description_fr": "Photo réelle dans un faux contexte.",
                "description_en": "Real photo in fake context.",
                "icon": "image",
                "category": "visual"
            },
            {
                "code": "appel-peur",
                "name_fr": "Appel à la peur",
                "name_en": "Appeal to fear",
                "description_fr": "Utilisation de la peur pour empêcher la réflexion.",
                "description_en": "Using fear to stop reasoning.",
                "icon": "alert-triangle",
                "category": "emotion"
            },
            {
                "code": "video-hors-contexte",
                "name_fr": "Vidéo hors contexte",
                "name_en": "Out of context video",
                "description_fr": "Vidéo réelle présentée dans un faux contexte.",
                "description_en": "Real video presented in fake context.",
                "icon": "video",
                "category": "visual"
            },
            {
                "code": "source-non-fiable",
                "name_fr": "Source non fiable",
                "name_en": "Unreliable source",
                "description_fr": "Source sans crédibilité.",
                "description_en": "Source without credibility.",
                "icon": "shield-off",
                "category": "source"
            },
            {
                "code": "appel-emotion",
                "name_fr": "Appel à l'émotion",
                "name_en": "Appeal to emotion",
                "description_fr": "Manipulation des émotions.",
                "description_en": "Emotional manipulation.",
                "icon": "heart",
                "category": "emotion"
            },
            {
                "code": "logo-falsifie",
                "name_fr": "Logo/marque falsifié",
                "name_en": "Falsified logo",
                "description_fr": "Usurpation de visuel officiel.",
                "description_en": "Impersonation of official branding.",
                "icon": "tag",
                "category": "visual"
            },
            {
                "code": "urgence-fabriquee",
                "name_fr": "Urgence fabriquée",
                "name_en": "Manufactured urgency",
                "description_fr": "Fausse alerte urgente.",
                "description_en": "Manufactured panic.",
                "icon": "zap",
                "category": "emotion"
            },
            {
                "code": "hameconnage",
                "name_fr": "Hameçonnage (phishing)",
                "name_en": "Phishing",
                "description_fr": "Tentative de vol de données.",
                "description_en": "Data theft attempt.",
                "icon": "lock",
                "category": "fraud"
            },
            {
                "code": "deepfake-audio",
                "name_fr": "Deepfake audio",
                "name_en": "Audio deepfake",
                "description_fr": "Voix imité par IA.",
                "description_en": "AI synthetic voice.",
                "icon": "mic",
                "category": "ai"
            },
            {
                "code": "fausse-causalite",
                "name_fr": "Fausse causalité",
                "name_en": "False causality",
                "description_fr": "Faux lien de cause à effet.",
                "description_en": "False cause and effect link.",
                "icon": "link-2",
                "category": "logic"
            },
            {
                "code": "temoignage-anecdotique",
                "name_fr": "Témoignage anecdotique",
                "name_en": "Anecdotal evidence",
                "description_fr": "Témoignage individuel sans valeur générale.",
                "description_en": "Individual claims without proof.",
                "icon": "message-square",
                "category": "logic"
            },
            {
                "code": "etude-inventee",
                "name_fr": "Étude inventée",
                "name_en": "Fabricated study",
                "description_fr": "Référence scientifique fictive.",
                "description_en": "Fake scientific citation.",
                "icon": "file-text",
                "category": "source"
            },
            {
                "code": "conflit-interets",
                "name_fr": "Conflit d'intérêts",
                "name_en": "Conflict of interest",
                "description_fr": "Intérêt financier dissimulé.",
                "description_en": "Hidden financial interest.",
                "icon": "dollar-sign",
                "category": "fraud"
            }
        ]

        tech_map = {}
        for t_dict in techniques_data:
            t_obj = ManipulationTechnique(**t_dict)
            session.add(t_obj)
            session.commit()
            session.refresh(t_obj)
            tech_map[t_obj.code] = t_obj.id

        # 2. SEED DES AFFAIRES FRONTEND (ALIGNÉES AVEC LES PREUVES VISUELLES RÉELLES)
        cases_data = [
            # DOSSIER 1 : Alerte Couvre-feu à Ouagadougou
            {
                "id": 1,
                "unlock_level": 1,
                "category": "societe",
                "title_fr": "Alerte Couvre-feu à Ouagadougou",
                "title_en": "Ouagadougou Curfew Alert",
                "is_fake": True,
                "summary_fr": "Un communiqué officiel de la Primature instaurant un couvre-feu à 17h à Ouagadougou circule sur Facebook.",
                "summary_en": "An official press release claiming a 5 PM curfew in Ouagadougou spreads on Facebook.",
                "brief_fr": "Sur les réseaux sociaux, la capture d'un prétendu communiqué officiel de la Primature du Burkina Faso annonce l'instauration d'un couvre-feu immédiat de 17h à 4h du matin. Dans les rues et sur les marchés de Ouagadougou, la panique s'installe et les commerces ferment précipitamment. Info authentique ou fausse alerte ?",
                "brief_en": "A screenshot of an alleged official press release from the Prime Minister's Office of Burkina Faso is circulating on social media, announcing an immediate curfew from 5 PM to 4 AM. In the streets and markets of Ouagadougou, panic spreads and businesses rush to close. Verified news or manipulation?",
                "witness_name": "Moussa Kaboré",
                "witness_role_fr": "Commerçant à Ouagadougou",
                "witness_role_en": "Merchant in Ouagadougou",
                "witness_avatar": "/static/assets/witnesses/serge.webp",
                "witness_system_prompt_fr": """Tu incarnes Moussa Kaboré, 36 ans, commerçant au grand marché de Ouagadougou. Tu es paniqué car la page Facebook 'Minestère de la sécurité' a publié un arrêté de la Primature instaurant un couvre-feu à 17h. Tu dois fermer ta boutique précipitamment et tu veux avertir tout le monde, mais tu n'as pas remarqué que le nom de la page comporte une faute d'orthographe ('Minestère' avec un e).""",
                "witness_system_prompt_en": """You play Moussa Kaboré, 36, shopkeeper in Ouagadougou. You panic because a Facebook page 'Minestère de la sécurité' posted a 5 PM curfew notice.""",
                "techniques": ["logo-falsifie", "source-non-fiable", "urgence-fabriquee", "appel-peur"],
                "evidences": [
                    {
                        "title_fr": "Communiqué officiel de la Primature — Facebook",
                        "title_en": "Official Press Release — Facebook Post",
                        "type": "image",
                        "content_url": "/static/images/couvre_feu_bf.png",
                        "description_fr": "Document estampillé de la Primature du Burkina Faso publié sur la page suspecte 'Minestère de la sécurité'.",
                        "description_en": "Forged document posted on suspicious page 'Minestère de la sécurité'.",
                        "is_unlocked_by_default": True
                    },
                    {
                        "title_fr": "Analyse du nom de la page Facebook",
                        "title_en": "Facebook Page Name Analysis",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Le nom de la page contient une faute d'orthographe ('Minestère' avec un 'e') et n'a pas le badge bleu de vérification gouvernementale.",
                        "description_en": "The page name contains a typo ('Minestère') and lacks official verification.",
                        "is_unlocked_by_default": False
                    },
                    {
                        "title_fr": "Démenti officiel du Service d'Information du Gouvernement (SIG)",
                        "title_en": "Official SIG Government Denial",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Le SIG confirme qu'aucun couvre-feu n'est en vigueur et qu'une plainte a été déposée contre la falsification.",
                        "description_en": "The SIG confirms no curfew is enacted and legal action is being taken.",
                        "is_unlocked_by_default": False
                    }
                ]
            },
            # DOSSIER 2 : Appel d'Urgence Hôpital Laquintinie
            {
                "id": 2,
                "unlock_level": 1,
                "category": "sante",
                "title_fr": "Appel d'Urgence Hôpital Laquintinie",
                "title_en": "Laquintinie Hospital Emergency Appeal",
                "is_fake": True,
                "summary_fr": "Un message WhatsApp tragique suppliant pour un don de sang d'urgence pour un proche à l'Hôpital Laquintinie circule en masse.",
                "summary_en": "A tragic WhatsApp message begging for urgent blood donors at Laquintinie Hospital spreads rapidly.",
                "brief_fr": "Elsa a reçu une capture d'écran WhatsApp d'un supposé proche suppliant : 'J'ai besoin de 4 donneurs de sang urgemment pour l'hôpital Laquintinie... Ne me laisse pas mourir'. Le message demande d'appeler ou de repartager un numéro 69689898. S'agit-il d'un véritable appel de détresse ou d'une arnaque téléphonique ?",
                "brief_en": "Elsa received a WhatsApp screenshot begging for 4 blood donors at Laquintinie Hospital. Is this a genuine emergency or a premium-rate phone number scam?",
                "witness_name": "Elsa Mbarga",
                "witness_role_fr": "Étudiante à Douala",
                "witness_role_en": "Student in Douala",
                "witness_avatar": "/static/assets/witnesses/amina.webp",
                "witness_system_prompt_fr": """Tu incarnes Elsa Mbarga, 21 ans, étudiante à Douala. Tu as reçu la capture d'écran d'un message WhatsApp dramatique de 'Papa' demandant 4 donneurs de sang d'urgence à l'Hôpital Laquintinie. Prise par l'émotion et la peur, tu t'apprêtes à diffuser le message dans tous tes groupes WhatsApp, sans vérifier auprès de la banque de sang officielle de l'hôpital.""",
                "witness_system_prompt_en": """You play Elsa Mbarga, 21, student in Douala. You received a dramatic WhatsApp screenshot begging for blood donors at Laquintinie Hospital.""",
                "techniques": ["appel-emotion", "urgence-fabriquee", "source-non-fiable", "hameconnage"],
                "evidences": [
                    {
                        "title_fr": "Capture WhatsApp — Appel au Don de Sang Urgent",
                        "title_en": "WhatsApp Screenshot — Urgent Blood Appeal",
                        "type": "image",
                        "content_url": "/static/images/don_sang_whatsapp.png",
                        "description_fr": "Message WhatsApp alarmiste incitant au partage massif et demandant de joindre le 69689898.",
                        "description_en": "Alarmist WhatsApp message prompting mass sharing and calling 69689898.",
                        "is_unlocked_by_default": True
                    },
                    {
                        "title_fr": "Vérification Banque du Sang Hôpital Laquintinie",
                        "title_en": "Laquintinie Hospital Blood Bank Check",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "L'hôpital confirme qu'aucun don d'urgence de ce type n'a été émis et met en garde contre les chaînes WhatsApp surtaxées.",
                        "description_en": "Hospital confirms no emergency alert was issued and warns against WhatsApp scam chains.",
                        "is_unlocked_by_default": False
                    }
                ]
            },
            # DOSSIER 3
            {
                "id": 3,
                "unlock_level": 1,
                "category": "arnaque",
                "title_fr": "Offre de Recrutement Banque Centrale",
                "title_en": "Central Bank Job Offer Announcement",
                "is_fake": True,
                "summary_fr": "Un message WhatsApp propose des recrutements sans diplôme à la Banque Centrale avec frais de dossier.",
                "summary_en": "WhatsApp message promises jobs at Central Bank with dossier fees.",
                "brief_fr": "Un message WhatsApp promet des embauches immédiates à la Banque Centrale avec des salaires mirobolants, sans diplôme. Il demande d'envoyer 15 000 FCFA par Mobile Money pour 'valider les frais de dossier'.",
                "brief_en": "WhatsApp message offers jobs at Central Bank asking for upfront fees.",
                "witness_name": "Kevin Vane",
                "witness_role_fr": "Étudiant chercheur d'emploi",
                "witness_role_en": "Job hunting student",
                "witness_avatar": "/static/assets/witnesses/kevin.webp",
                "witness_system_prompt_fr": """Tu incarnes Kevin Vane, 22 ans, étudiant impatient de trouver un emploi. Tu as failli payer les 15 000 FCFA parce que le message utilisait le logo officiel de la Banque Centrale.""",
                "witness_system_prompt_en": """You play Kevin Vane, 22, student searching for a job who almost got scammed.""",
                "techniques": ["hameconnage", "logo-falsifie", "urgence-fabriquee"],
                "evidences": [
                    {
                        "title_fr": "Capture WhatsApp du message de recrutement",
                        "title_en": "WhatsApp Job Message Screenshot",
                        "type": "image",
                        "content_url": "/static/assets/witnesses/kevin.webp",
                        "description_fr": "Message demandant un paiement Mobile Money à un numéro personnel.",
                        "description_en": "Message asking for Mobile Money fee to personal number.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 4
            {
                "id": 4,
                "unlock_level": 2,
                "category": "rumeur",
                "title_fr": "Vocal WhatsApp : Alerte Sécurité Écoles",
                "title_en": "WhatsApp Voice Note: School Security Alert",
                "is_fake": True,
                "summary_fr": "Un vocal paniqué signale une camionnette blanche enlevant des enfants devant les écoles.",
                "summary_en": "Panicked voice message warns of a white van abducting school children.",
                "brief_fr": "Un message vocal d'une femme en larmes prévient qu'une camionnette blanche rode devant les écoles de la ville pour enlever des enfants. Aucun signalement n'a été enregistré par la police.",
                "brief_en": "Viral audio voice note claims a white van is abducting children.",
                "witness_name": "Serge Ndong",
                "witness_role_fr": "Chauffeur de taxi et père de famille",
                "witness_role_en": "Taxi driver and father",
                "witness_avatar": "/static/assets/witnesses/serge.webp",
                "witness_system_prompt_fr": """Tu incarnes Serge Ndong, 45 ans, père de trois enfants. Tu as paniqué en entendant le vocal et tu l'as transféré à tout ton répertoire par sécurité.""",
                "witness_system_prompt_en": """You play Serge Ndong, 45, father of three who panicked after hearing the voice note.""",
                "techniques": ["appel-peur", "source-anonyme", "urgence-fabriquee"],
                "evidences": [
                    {
                        "title_fr": "Message vocal — 'Camionnette blanche'",
                        "title_en": "Voice note — 'White van'",
                        "type": "audio",
                        "content_url": "/static/assets/witnesses/serge.webp",
                        "description_fr": "Vocal réutilisé dans plusieurs pays depuis 2019 sans lieu précisé.",
                        "description_en": "Voice note reused in multiple countries since 2019.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 5
            {
                "id": 5,
                "unlock_level": 2,
                "category": "politique",
                "title_fr": "Arrêté N°409 : Taxe sur l'Énergie Solaire",
                "title_en": "Decree No. 409: Solar Energy Tax",
                "is_fake": True,
                "summary_fr": "Un document PDF officiel annonce une taxe de 50 000 FCFA sur les panneaux solaires.",
                "summary_en": "A PDF decree announces a 50,000 FCFA tax on private solar panels.",
                "brief_fr": "Un document PDF avec sceau républicain annonce l'instauration d'une taxe annuelle de 50 000 FCFA sur chaque panneau solaire domestique. C'est un faux document avec des fautes d'orthographe et une fausse signature.",
                "brief_en": "PDF decree claims a 50,000 FCFA tax on home solar panels.",
                "witness_name": "Oncle René",
                "witness_role_fr": "Retraité et propriétaire",
                "witness_role_en": "Retired homeowner",
                "witness_avatar": "/static/assets/witnesses/rene.webp",
                "witness_system_prompt_fr": """Tu incarnes Oncle René, 58 ans, retraité en colère contre les taxes. Tu as reçu le PDF et tu es furieux contre le ministère.""",
                "witness_system_prompt_en": """You play Oncle René, 58, angry retired homeowner.""",
                "techniques": ["logo-falsifie", "source-non-fiable"],
                "evidences": [
                    {
                        "title_fr": "Document PDF 'Arrêté N°409'",
                        "title_en": "PDF Document 'Decree N°409'",
                        "type": "document",
                        "content_url": "/static/assets/witnesses/rene.webp",
                        "description_fr": "Contient des fautes de frappe grossières et une fausse signature ministérielle.",
                        "description_en": "Contains typos and counterfeit signature.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 6 (VRAI / PIÈGE)
            {
                "id": 6,
                "unlock_level": 2,
                "category": "science",
                "title_fr": "Récolte Inquiétante au Champ d'Ananas",
                "title_en": "Unusual Harvest at Pineapple Field",
                "is_fake": False,
                "summary_fr": "Une photo réelle de tomates difformes (fasciation naturelle) réutilisée avec un faux texte anti-OGM.",
                "summary_en": "Genuine photo of deformed tomatoes (natural fasciation) used with fake anti-GMO text.",
                "brief_fr": "Un post viral montre une photo de tomates énormes et difformes avec le texte : « Voilà ce que les OGM font à nos aliments — BOYCOTTEZ ! ». La photo est 100% VRAIE (phénomène naturel de fasciation), mais le lien avec les OGM est totalement FAUX.",
                "brief_en": "Genuine photo of deformed tomatoes used with false anti-GMO claims.",
                "witness_name": "Mariam Konaté",
                "witness_role_fr": "Vendeuse au marché",
                "witness_role_en": "Market vendor",
                "witness_avatar": "/static/assets/witnesses/mariam.webp",
                "witness_system_prompt_fr": """Tu incarnes Mariam Konaté, 42 ans, commerçante. C'est toi qui as pris la photo des tomates au marché pour rigoler. Tu sais que le phénomène s'appelle la fasciation et que c'est naturel, mais quelqu'un a rajouté le texte OGM sur ta photo.""",
                "witness_system_prompt_en": """You play Mariam Konaté, 42. You took the real tomato photo, but someone added the fake anti-GMO text.""",
                "techniques": ["fausse-causalite"],
                "evidences": [
                    {
                        "title_fr": "Photo originale des tomates difformes",
                        "title_en": "Original Deformed Tomatoes Photo",
                        "type": "image",
                        "content_url": "/static/assets/witnesses/mariam.webp",
                        "description_fr": "Photo authentique de fasciation végétale naturelle.",
                        "description_en": "Genuine photo of natural botanical fasciation.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 7
            {
                "id": 7,
                "unlock_level": 3,
                "category": "sante",
                "title_fr": "Tisane Miracle Anti-Paludisme",
                "title_en": "Miracle Anti-Malaria Herbal Tea",
                "is_fake": True,
                "summary_fr": "Un YouTuber prétend guérir le paludisme avec de la papaye et vend ses sachets en lien.",
                "summary_en": "YouTuber claims to cure malaria with papaya tea and sells sachets.",
                "brief_fr": "Une vidéo YouTube affirme guérir le paludisme avec des infusions de papaye et montre 3 témoins 'guéris'. L'auteur vend ses sachets à 5 000 FCFA en lien dans la description.",
                "brief_en": "YouTube video claims papaya cures malaria while selling products.",
                "witness_name": "Dr. Patrice Obiang",
                "witness_role_fr": "Pharmacien",
                "witness_role_en": "Pharmacist",
                "witness_avatar": "/static/assets/witnesses/obiang.webp",
                "witness_system_prompt_fr": """Tu incarnes le Dr Patrice Obiang, 39 ans, pharmacien inquiet. Tu expliques que des patients ont arrêté leur traitement antipaludique pour suivre ce guérisseur YouTube.""",
                "witness_system_prompt_en": """You play Dr Patrice Obiang, 39, pharmacist concerned about malaria cure scams.""",
                "techniques": ["etude-inventee", "temoignage-anecdotique", "conflit-interets"],
                "evidences": [
                    {
                        "title_fr": "Extrait vidéo YouTube — Infusion Papaye",
                        "title_en": "YouTube Video Clip — Papaya Tea",
                        "type": "video",
                        "content_url": "/static/assets/witnesses/obiang.webp",
                        "description_fr": "Lien commercial direct vers la vente de sachets à 5 000 FCFA.",
                        "description_en": "Direct store link selling sachets for 5,000 FCFA.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 8
            {
                "id": 8,
                "unlock_level": 3,
                "category": "politique",
                "title_fr": "Vidéo Virale : Incident au Parlement",
                "title_en": "Viral Video: Parliamentary Incident",
                "is_fake": True,
                "summary_fr": "Une vidéo tronquée de 10 secondes montre un député poussant un opposant.",
                "summary_en": "A cropped 10-second video shows a deputy pushing an opponent.",
                "brief_fr": "Une séquence vidéo de 10 secondes montre un député poussant violemment un membre de l'opposition. La vidéo intégrale de 3 minutes montre qu'il s'agissait d'un trébuchement accidentel lors d'une bousculade.",
                "brief_en": "Cropped 10s video misrepresents an accidental trip as an assault.",
                "witness_name": "Amina Diallo",
                "witness_role_fr": "Militante associative",
                "witness_role_en": "Association activist",
                "witness_avatar": "/static/assets/witnesses/amina.webp",
                "witness_system_prompt_fr": """Tu incarnes Amina Diallo. Tu as partagé la vidéo courte de 10 secondes sans savoir qu'elle était tronquée.""",
                "witness_system_prompt_en": """You play Amina Diallo. You shared the cropped video without watching the full version.""",
                "techniques": ["video-hors-contexte"],
                "evidences": [
                    {
                        "title_fr": "Vidéo originale intégrale (3 minutes)",
                        "title_en": "Full Original Video (3 minutes)",
                        "type": "video",
                        "content_url": "/static/assets/witnesses/amina.webp",
                        "description_fr": "La vidéo complète montre le mouvement de foule et le trébuchement.",
                        "description_en": "Full video shows crowd movement and accidental trip.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 9
            {
                "id": 9,
                "unlock_level": 3,
                "category": "tech",
                "title_fr": "Enregistrement Audio Confidentiel",
                "title_en": "Confidential Audio Recording",
                "is_fake": True,
                "summary_fr": "Un enregistrement audio attribué au candidat à la mairie contient des propos racistes générés par IA.",
                "summary_en": "Audio recording of a mayoral candidate contains AI synthetic racist comments.",
                "brief_fr": "Un fichier MP3 circule la veille des élections. On y entend la voix du candidat prononcer des insultes racistes. L'analyse acoustique prouve qu'il s'agit d'une voix de synthèse clonée par IA.",
                "brief_en": "A cloned AI voice recording targets a mayoral candidate before elections.",
                "witness_name": "Kevin Vane",
                "witness_role_fr": "Étudiant en journalisme",
                "witness_role_en": "Journalism student",
                "witness_avatar": "/static/assets/witnesses/kevin.webp",
                "witness_system_prompt_fr": """Tu incarnes Kevin Vane, étudiant en journalisme. Tu as fait analyser l'audio par un laboratoire qui a détecté la signature numérique d'un modèle vocal IA.""",
                "witness_system_prompt_en": """You play Kevin Vane, journalism student who sent the audio for spectral analysis.""",
                "techniques": ["deepfake-audio", "source-anonyme"],
                "evidences": [
                    {
                        "title_fr": "Rapport d'analyse spectrale audio",
                        "title_en": "Audio Spectral Analysis Report",
                        "type": "document",
                        "content_url": "/static/assets/witnesses/kevin.webp",
                        "description_fr": "Présence de fréquences synthétiques et régularité vocale artificielle.",
                        "description_en": "Presence of synthetic frequencies and artificial cadence.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 10
            {
                "id": 10,
                "unlock_level": 3,
                "category": "humanitaire",
                "title_fr": "Appel au Don de Sang Groupe O-",
                "title_en": "Group O- Blood Donation Appeal",
                "is_fake": True,
                "summary_fr": "Un appel urgent au don du sang donne un numéro surtaxé au Kenya (+254).",
                "summary_en": "Urgent blood donation plea directs calls to a premium Kenyan number (+254).",
                "brief_fr": "Un message d'alerte rouge demande de donner d'urgence son sang pour une petite fille hospitalisée. Le numéro indiqué (+254...) est un numéro surtaxé basé au Kenya qui débite du crédit dès l'appel.",
                "brief_en": "Viral blood request redirects calls to a premium-rate number in Kenya (+254).",
                "witness_name": "Serge Ndong",
                "witness_role_fr": "Bénévole secouriste",
                "witness_role_en": "First aid volunteer",
                "witness_avatar": "/static/assets/witnesses/serge.webp",
                "witness_system_prompt_fr": """Tu incarnes Serge Ndong, secouriste généreux. Tu as partagé l'appel au don sans réaliser que le numéro avec l'indicatif +254 était un numéro surtaxé à l'étranger.""",
                "witness_system_prompt_en": """You play Serge Ndong. You shared the blood request without checking the +254 country code.""",
                "techniques": ["hameconnage", "appel-emotion", "urgence-fabriquee"],
                "evidences": [
                    {
                        "title_fr": "Fiche indicatif téléphonique international",
                        "title_en": "International Calling Code Sheet",
                        "type": "document",
                        "content_url": "/static/assets/witnesses/serge.webp",
                        "description_fr": "L'indicatif +254 appartient au Kenya. Numéro surtaxé frauduleux.",
                        "description_en": "Country code +254 belongs to Kenya. Fraudulent premium number.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 11
            {
                "id": 11,
                "unlock_level": 3,
                "category": "sante",
                "title_fr": "La rumeur du vaccin & eau de Solaria",
                "title_en": "Solaria Water & Vaccine Rumor",
                "is_fake": True,
                "summary_fr": "Un blogueur affirme que l'eau de ville contient des toxines altérant l'ADN des adolescents.",
                "summary_en": "A blogger claims tap water contains DNA-altering toxins.",
                "brief_fr": "Un blogueur militant affirme sur les réseaux sociaux que l'eau de la ville de Solaria contient des micro-toxines altérant l'ADN des adolescents et accuse la mairie de couvrir l'affaire.",
                "brief_en": "A blogger claims city water contains DNA-altering toxins.",
                "witness_name": "Dr. Marc Morel",
                "witness_role_fr": "Blogueur indépendant",
                "witness_role_en": "Independent blogger",
                "witness_avatar": "/static/assets/witnesses/obiang.webp",
                "witness_system_prompt_fr": """Tu incarnes le Dr. Marc Morel, 42 ans, blogueur convaincu d'une contamination de l'eau de Solaria. Tu es passionné, dramatique et tu accuses la mairie sans preuves certifiées.""",
                "witness_system_prompt_en": """You play Dr Marc Morel, 42, independent blogger claiming water contamination.""",
                "techniques": ["source-anonyme", "stat-trompeuse", "appel-peur"],
                "evidences": [
                    {
                        "title_fr": "Graphique sans axe — Toxines Solaria",
                        "title_en": "No-axis Chart — Solaria Toxins",
                        "type": "statistic",
                        "content_url": "",
                        "description_fr": "Graphique montrant des courbes alarmistes sans échelle ni valeurs mesurables.",
                        "description_en": "Alarmist chart lacking scale or units.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 12
            {
                "id": 12,
                "unlock_level": 4,
                "category": "sante",
                "title_fr": "Remède Miraculeux BioVital",
                "title_en": "BioVital Miracle Cure",
                "is_fake": True,
                "summary_fr": "Une influenceuse vante une cure miracle contre la fatigue et vend les flacons avec commission.",
                "summary_en": "An influencer promotes a miracle fatigue cure for affiliate commission.",
                "brief_fr": "Chantal Vaneck publie des vidéos affirmant que la cure BioVital guérit l'épuisement chronique et régénère les cellules. Elle gagne une commission sur chaque vente.",
                "brief_en": "Influencer promotes miracle cure while earning sales commission.",
                "witness_name": "Chantal Vaneck",
                "witness_role_fr": "Influencer bien-être",
                "witness_role_en": "Wellness influencer",
                "witness_avatar": "/static/assets/witnesses/nadege.webp",
                "witness_system_prompt_fr": """Tu incarnes Chantal Vaneck, 41 ans, enthousiaste pour son produit BioVital. Tu nies les conflits d'intérêts et insistes sur les bienfaits d'échantillons reçus.""",
                "witness_system_prompt_en": """You play Chantal Vaneck, wellness influencer promoting BioVital.""",
                "techniques": ["conflit-interets", "temoignage-anecdotique"],
                "evidences": [
                    {
                        "title_fr": "Contrat d'affiliation BioVital (15% commission)",
                        "title_en": "BioVital Affiliate Contract (15% commission)",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Preuve d'un intérêt financier direct par commission d'affiliation.",
                        "description_en": "Proof of direct financial conflict of interest.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 13
            {
                "id": 13,
                "unlock_level": 4,
                "category": "politique",
                "title_fr": "Deepfake vidéo du Maire & Couvre-feu",
                "title_en": "Mayor Deepfake & Curfew Video",
                "is_fake": True,
                "summary_fr": "Une vidéo tronquée montre le Maire instaurant un couvre-feu total sans préavis.",
                "summary_en": "A deepfake video shows Mayor announcing sudden total curfew.",
                "brief_fr": "Une vidéo circule à minuit montrant le Maire déclarer un couvre-feu immédiat. C'est une vidéo truquée créée par manipulation visuelle IA.",
                "brief_en": "Fake video claims Mayor declared an emergency curfew.",
                "witness_name": "Julien Rossi",
                "witness_role_fr": "Porte-parole municipal",
                "witness_role_en": "City spokesperson",
                "witness_avatar": "/static/assets/witnesses/serge.webp",
                "witness_system_prompt_fr": """Tu incarnes Julien Rossi. Tu expliques que la vidéo du Maire est un deepfake et que la mairie a déposé plainte.""",
                "witness_system_prompt_en": """You play Julien Rossi, official city spokesperson.""",
                "techniques": ["deepfake-audio", "urgence-fabriquee"],
                "evidences": [
                    {
                        "title_fr": "Démenti officiel de la Mairie",
                        "title_en": "Official City Denial",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Communiqué confirmant la falsification numérique de la vidéo.",
                        "description_en": "Statement confirming digital video falsification.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 14
            {
                "id": 14,
                "unlock_level": 4,
                "category": "tech",
                "title_fr": "L'Antenne 6G et la Disparition des Oiseaux",
                "title_en": "6G Tower & Vanishing Birds",
                "is_fake": True,
                "summary_fr": "Un riverain accuse une antenne relais 6G d'avoir fait fuir tous les oiseaux du quartier.",
                "summary_en": "Resident blames 6G tower for birds disappearing.",
                "brief_fr": "Kevin affirme qu'après l'installation d'une antenne relais 6G, tous les moineaux ont disparu du jour au lendemain. La migration saisonnière en est la cause réelle.",
                "brief_en": "Resident correlates 6G installation with bird migration.",
                "witness_name": "Kevin Vane",
                "witness_role_fr": "Riverain inquiet",
                "witness_role_en": "Concerned neighbor",
                "witness_avatar": "/static/assets/witnesses/kevin.webp",
                "witness_system_prompt_fr": """Tu incarnes Kevin Vane. Tu es persuadé que l'antenne 6G perturbe la faune locale.""",
                "witness_system_prompt_en": """You play Kevin Vane, convinced 6G towers scare away local birds.""",
                "techniques": ["fausse-causalite", "temoignage-anecdotique"],
                "evidences": [
                    {
                        "title_fr": "Rapport LPO — Migration saisonnière",
                        "title_en": "LPO Report — Seasonal Migration",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Confirme le départ migratoire naturel des moineaux chaque automne.",
                        "description_en": "Confirms natural autumn bird migration pattern.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 15 (VRAI)
            {
                "id": 15,
                "unlock_level": 4,
                "category": "science",
                "title_fr": "Mutations chez les Grenouilles (Vrai)",
                "title_en": "Frog Mutation Discovery (Genuine)",
                "is_fake": False,
                "summary_fr": "Une étude publiée dans Nature documente l'adaptation génétique des grenouilles d'une zone industrielle.",
                "summary_en": "Nature study documents genuine frog genetic adaptation.",
                "brief_fr": "Le Dr Vance a publié une étude scientifique vérifiée dans Nature Ecology & Evolution démontrant des variations de couleur chez les grenouilles pour résister aux métaux lourds.",
                "brief_en": "Peer-reviewed Nature study documents frog evolutionary adaptation.",
                "witness_name": "Dr. Éléonore Vance",
                "witness_role_fr": "Chercheuse en Biologie",
                "witness_role_en": "Biology Researcher",
                "witness_avatar": "/static/assets/witnesses/mariam.webp",
                "witness_system_prompt_fr": """Tu incarnes le Dr Éléonore Vance, chercheuse rigoureuse. Ton étude a été évaluée par des pairs avec DOI officiel.""",
                "witness_system_prompt_en": """You play Dr Éléonore Vance, peer-reviewed biology researcher.""",
                "techniques": ["aucune"],
                "evidences": [
                    {
                        "title_fr": "Publication Nature (DOI 10.1038/s41559-026)",
                        "title_en": "Nature Paper (DOI 10.1038/s41559-026)",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Article scientifique revu par les pairs avec méthodologie ouverte.",
                        "description_en": "Peer-reviewed paper with open data methodology.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 16 (VRAI)
            {
                "id": 16,
                "unlock_level": 5,
                "category": "science",
                "title_fr": "Éclipse Solaire et Calculs d'Orbite (Vrai)",
                "title_en": "Solar Eclipse Orbit Calculations (Genuine)",
                "is_fake": False,
                "summary_fr": "L'Observatoire de Paris confirme l'alignement orbital d'une éclipse rare.",
                "summary_en": "Paris Observatory confirms rare orbital eclipse trajectory.",
                "brief_fr": "L'ESA, la NASA et l'Observatoire de Paris confirment l'horaire exact d'une éclipse solaire totale grâce à la mécanique céleste.",
                "brief_en": "ESA and NASA validate total solar eclipse precise timing.",
                "witness_name": "Prof. Jean Dupuis",
                "witness_role_fr": "Astrophysicien",
                "witness_role_en": "Astrophysicist",
                "witness_avatar": "/static/assets/witnesses/rene.webp",
                "witness_system_prompt_fr": """Tu incarnes le Professeur Jean Dupuis, astrophysicien à l'Observatoire. Tu réponds avec rigueur scientifique.""",
                "witness_system_prompt_en": """You play Professor Jean Dupuis, astrophysicist.""",
                "techniques": ["aucune"],
                "evidences": [
                    {
                        "title_fr": "Bulletin ESA / NASA / Observatoire de Paris",
                        "title_en": "ESA / NASA / Paris Observatory Bulletin",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Données astronomiques croisées et validées internationalement.",
                        "description_en": "Internationally cross-validated astronomical data.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 17
            {
                "id": 17,
                "unlock_level": 5,
                "category": "tech",
                "title_fr": "Piratage Informatique du Réseau Électrique",
                "title_en": "Power Grid Cyberattack Claim",
                "is_fake": True,
                "summary_fr": "Un message alarmiste affirme qu'un piratage va couper l'électricité pendant 3 semaines.",
                "summary_en": "Alarmist claim predicts 3-week nationwide blackout from cyberattack.",
                "brief_fr": "Une rumeur virale prétend qu'une cyberattaque d'envergure va couper le courant national pendant 3 semaines. L'ANSSI dément formellement tout risque de blackout généralisé.",
                "brief_en": "Viral rumor falsely predicts 3-week blackout due to cyberattack.",
                "witness_name": "Lucile Bertrand",
                "witness_role_fr": "Experte en Cybersécurité",
                "witness_role_en": "Cybersecurity expert",
                "witness_avatar": "/static/assets/witnesses/amina.webp",
                "witness_system_prompt_fr": """Tu incarnes Lucile Bertrand, experte ANSSI. Tu calmes les esprits et démens le message alarmiste.""",
                "witness_system_prompt_en": """You play Lucile Bertrand, cybersecurity expert.""",
                "techniques": ["appel-peur", "urgence-fabriquee"],
                "evidences": [
                    {
                        "title_fr": "Bulletin CERT-FR — État du réseau",
                        "title_en": "CERT-FR Bulletin — Grid Status",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Aucune menace critique pesant sur la distribution électrique.",
                        "description_en": "No critical threat facing the power distribution network.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 18
            {
                "id": 18,
                "unlock_level": 5,
                "category": "environnement",
                "title_fr": "Faux Tweet de la Préfecture sur la Sécheresse",
                "title_en": "Fake Prefecture Drought Tweet",
                "is_fake": True,
                "summary_fr": "Une capture d'un faux tweet de la préfecture annonce l'interdiction de douche en semaine.",
                "summary_en": "Fake tweet screenshot announces weekday shower ban.",
                "brief_fr": "Une image modifiée sous Photoshop prétend montrer un tweet officiel de la Préfecture interdisant l'utilisation des douches du lundi au vendredi.",
                "brief_en": "Photoshopped tweet claims prefecture banned weekday showers.",
                "witness_name": "Dr. Sophie Germain",
                "witness_role_fr": "Directrice de cabinet",
                "witness_role_en": "Cabinet Director",
                "witness_avatar": "/static/assets/witnesses/nadege.webp",
                "witness_system_prompt_fr": """Tu incarnes le Dr Sophie Germain. Tu expliques que le tweet est un montage et que le compte préfectoral n'a jamais publié ça.""",
                "witness_system_prompt_en": """You play Dr Sophie Germain, confirming the tweet is photoshopped.""",
                "techniques": ["logo-falsifie", "image-hors-contexte"],
                "evidences": [
                    {
                        "title_fr": "Analyse médico-légale du tweet Photoshop",
                        "title_en": "Forensic Photoshop Tweet Analysis",
                        "type": "image",
                        "content_url": "",
                        "description_fr": "Polices de caractères mal alignées et métadonnées d'édition d'image.",
                        "description_en": "Misaligned fonts and image editing metadata detected.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 19
            {
                "id": 19,
                "unlock_level": 5,
                "category": "arnaque",
                "title_fr": "Arnaque à la Fausse Cagnotte Caritative",
                "title_en": "Fake Charity Crowdfunding Scam",
                "is_fake": True,
                "summary_fr": "Une cagnotte Leetchi prétend récolter des fonds pour un orphelinat fictif.",
                "summary_en": "Fake crowdfunding campaign raises funds for imaginary orphanage.",
                "brief_fr": "Une cagnotte en ligne montre des photos d'enfants et demande des dons. L'association n'est pas déclarée en préfecture et l'argent est viré sur un compte offshore.",
                "brief_en": "Fake online fundraiser redirects donations to an offshore account.",
                "witness_name": "Marc Vaneck",
                "witness_role_fr": "Enquêteur financier",
                "witness_role_en": "Financial investigator",
                "witness_avatar": "/static/assets/witnesses/serge.webp",
                "witness_system_prompt_fr": """Tu incarnes Marc Vaneck, enquêteur financier. Tu as tracé le compte receveur vers un paradis fiscal.""",
                "witness_system_prompt_en": """You play Marc Vaneck, financial investigator.""",
                "techniques": ["hameconnage", "conflit-interets", "source-non-fiable"],
                "evidences": [
                    {
                        "title_fr": "Registre RNA des associations — Introuvable",
                        "title_en": "National Registry of Associations — Not Found",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "L'association n'a aucune existence légale ou fiscale.",
                        "description_en": "The association has no legal or tax registration.",
                        "is_unlocked_by_default": True
                    }
                ]
            },
            # DOSSIER 20
            {
                "id": 20,
                "unlock_level": 5,
                "category": "tech",
                "title_fr": "Intox sur les Compteurs d'Électricité Intelligents",
                "title_en": "Smart Meter Radiation Myth",
                "is_fake": True,
                "summary_fr": "Un message affirme que les nouveaux compteurs diffusent des ondes espionnes.",
                "summary_en": "Claim alleges smart meters emit spying radiation.",
                "brief_fr": "Un post affirme que les compteurs électriques enregistrent les voix dans les maisons et diffusent des ondes nocives. L'ANSES et l'ANFR ont certifié la conformité des ondes radio CPL.",
                "brief_en": "Rumor claims electric meters record home conversations.",
                "witness_name": "Sarah Ndong",
                "witness_role_fr": "Ingénieure ANFR",
                "witness_role_en": "ANFR Engineer",
                "witness_avatar": "/static/assets/witnesses/mariam.webp",
                "witness_system_prompt_fr": """Tu incarnes Sarah Ndong, ingénieure à l'ANFR. Tu expliques la technologie CPL et rassures sur les normes de santé.""",
                "witness_system_prompt_en": """You play Sarah Ndong, radiofrequency engineer.""",
                "techniques": ["stat-trompeuse", "appel-peur", "theorie_complot"],
                "evidences": [
                    {
                        "title_fr": "Rapport ANSE/ANFR sur l'exposition aux ondes",
                        "title_en": "ANSE/ANFR Radiofrequency Exposure Report",
                        "type": "document",
                        "content_url": "",
                        "description_fr": "Niveaux d'émissions des centaines de fois inférieurs aux limites légales.",
                        "description_en": "Emission levels hundreds of times below legal safety limits.",
                        "is_unlocked_by_default": True
                    }
                ]
            }
        ]

        for c_dict in cases_data:
            tech_codes = c_dict.pop("techniques")
            ev_data = c_dict.pop("evidences")
            c_obj = Case(**c_dict)
            session.add(c_obj)
            session.commit()
            session.refresh(c_obj)

            # Liens techniques
            for code in tech_codes:
                if code in tech_map:
                    link = CaseTechniqueLink(case_id=c_obj.id, technique_id=tech_map[code])
                    session.add(link)
            session.commit()

            # Evidences
            for idx, ev in enumerate(ev_data):
                ev_type = ev.get("type", "image")
                desc_fr = ev.get("description_fr", "")
                desc_en = ev.get("description_en", "")
                content_url = ev.get("content_url", "")
                ev_obj = Evidence(
                    case_id=c_obj.id,
                    title_fr=ev["title_fr"],
                    title_en=ev["title_en"],
                    evidence_type=ev_type,
                    content_fr=desc_fr,
                    content_en=desc_en,
                    image_url=content_url,
                    order_index=idx + 1
                )
                session.add(ev_obj)

            session.commit()

        # 3. BADGES
        badges_data = [
            {"code": "verificateur_sources", "name_fr": "Vérificateur de Sources", "name_en": "Source Checker", "description_fr": "Résolvez le Dossier #1", "description_en": "Solve Case #1", "icon_name": "[SRC]"},
            {"code": "demasqueur_buzz", "name_fr": "Démasqueur de Buzz", "name_en": "Buzz Debunker", "description_fr": "Résolvez le Dossier #2", "description_en": "Solve Case #2", "icon_name": "[BUZZ]"},
            {"code": "chasseur_arnaques", "name_fr": "Chasseur d'Arnaques", "name_en": "Scam Hunter", "description_fr": "Résolvez le Dossier #3", "description_en": "Solve Case #3", "icon_name": "[SCAM]"},
            {"code": "maitre_nuance", "name_fr": "Maître de la Nuance", "name_en": "Master of Nuance", "description_fr": "Déjouez le piège du Dossier #6", "description_en": "Survive Case #6 trap", "icon_name": "[NUANCE]"},
            {"code": "detective_elite", "name_fr": "Détective d'Élite", "name_en": "Elite Detective", "description_fr": "Terminez les 10 dossiers", "description_en": "Complete all 10 cases", "icon_name": "[ELITE]"}
        ]

        for b_dict in badges_data:
            b_obj = Badge(**b_dict)
            session.add(b_obj)
        session.commit()

if __name__ == "__main__":
    print("Re-seeding database avec les 10 affaires alignées sur le Frontend...")
    seed_database()
    print("Base de données ré-alimentée avec succès !")
