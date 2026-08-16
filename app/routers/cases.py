from typing import List, Optional, Union
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from app.database import get_session
from app.models.case import Case, Evidence, ManipulationTechnique
from app.models.user import User, UserProgress
from app.schemas.case import CaseListRead, CaseDetailRead, EvidenceRead, TechniqueRead, WitnessRead

router = APIRouter(prefix="/api/cases", tags=["Cases & Evidence"])

from app.config import settings

@router.get("", response_model=List[CaseListRead])
def list_cases(
    user_id: Optional[Union[int, str]] = Query(None),
    category: Optional[str] = Query(None),
    mode: str = Query("adventure"), # "adventure" ou "category"
    lang: str = Query("fr"),
    session: Session = Depends(get_session)
):
    query = select(Case).where(Case.is_active == True)
    if category:
        query = query.where(Case.category == category.lower())
    
    cases = session.exec(query.order_by(Case.unlock_level.asc())).all()
    
    # Récupérer les progressions si user_id fourni
    user_progress_map = {}
    completed_case_ids = set()
    completed_count = 0
    if user_id:
        user_obj = None
        if isinstance(user_id, int) or (isinstance(user_id, str) and user_id.isdigit()):
            user_obj = session.get(User, int(user_id))
        if not user_obj and isinstance(user_id, str):
            user_obj = session.exec(select(User).where(User.username == user_id)).first()
            if not user_obj:
                user_obj = User(username=user_id, is_guest=True)
                session.add(user_obj)
                session.commit()
                session.refresh(user_obj)
        
        if user_obj:
            progresses = session.exec(select(UserProgress).where(UserProgress.user_id == user_obj.id)).all()
            user_progress_map = {p.case_id: p for p in progresses if p.completed}
            completed_case_ids = set(p.case_id for p in progresses if p.completed)
            completed_count = len(completed_case_ids)

    # Condition de déblocage du Mode Recherche / Thématique (seuil configurable)
    IS_CATEGORY_MODE_UNLOCKED = (completed_count >= settings.UNLOCK_SEARCH_MODE_THRESHOLD)

    result: List[CaseListRead] = []
    for idx, c in enumerate(cases):
        prog = user_progress_map.get(c.id)
        
        if mode == "adventure":
            if idx == 0:
                # SEULE la toute première affaire (Dossier #1) est débloquée au démarrage
                is_unlocked = True
            else:
                # L'affaire N est débloquée au fur et à mesure dès que l'affaire précédente (N-1) est complétée
                prev_case = cases[idx - 1]
                is_unlocked = prev_case.id in completed_case_ids
        else:
            # En Mode Recherche par Thématiques : verrouillé si moins du seuil d'affaires résolues
            if not IS_CATEGORY_MODE_UNLOCKED:
                is_unlocked = False
            else:
                is_unlocked = (c.unlock_level <= 1) or (c.id in completed_case_ids)

        witness_info = WitnessRead(
            name=c.witness_name,
            role=c.witness_role_fr if lang.startswith("fr") else c.witness_role_en,
            avatar=c.witness_avatar,
            intro=(
                f"Hello Detective! I am {c.witness_name}. What would you like to know about this case?"
                if lang.startswith("en")
                else f"Bonjour détective ! Je suis {c.witness_name}. Que souhaitez-vous savoir sur cette affaire ?"
            )
        )
        result.append(
            CaseListRead(
                id=c.id,
                title=c.title_fr if lang.startswith("fr") else c.title_en,
                summary=c.summary_fr if lang.startswith("fr") else c.summary_en,
                witness=witness_info,
                difficulty=c.difficulty,
                estimated_time_minutes=c.estimated_time_minutes,
                category=c.category,
                unlock_level=c.unlock_level,
                is_demo=c.is_demo,
                is_fake=c.is_fake,
                is_unlocked=is_unlocked,
                completed=prog.completed if prog else False,
                best_score=prog.score_obtained if prog else None
            )
        )
    return result

@router.get("/{case_id}", response_model=CaseDetailRead)
def get_case_detail(
    case_id: int,
    lang: str = Query("fr"),
    session: Session = Depends(get_session)
):
    case = session.get(Case, case_id)
    if not case or not case.is_active:
        raise HTTPException(status_code=404, detail="Affaire non trouvée ou inactive")

    witness_info = WitnessRead(
        name=case.witness_name,
        role=case.witness_role_fr if lang.startswith("fr") else case.witness_role_en,
        avatar=case.witness_avatar,
        intro=(
            f"Hello Detective! I am {case.witness_name}. What would you like to know about this case?"
            if lang.startswith("en")
            else f"Bonjour détective ! Je suis {case.witness_name}. Que souhaitez-vous savoir sur cette affaire ?"
        )
    )

    evidences_read = [
        EvidenceRead(
            id=e.id,
            title=e.title_fr if lang.startswith("fr") else e.title_en,
            evidence_type=e.evidence_type,
            content=e.content_fr if lang.startswith("fr") else e.content_en,
            image_url=e.image_url,
            clue_hint=e.clue_hint_fr if lang.startswith("fr") else e.clue_hint_en,
            order_index=e.order_index
        )
        for e in sorted(case.evidences, key=lambda x: x.order_index)
    ]

    all_techniques = session.exec(select(ManipulationTechnique)).all()
    available_techniques_read = [
        TechniqueRead(
            id=t.id,
            code=t.code,
            name=t.name_fr if lang.startswith("fr") else t.name_en,
            description=t.description_fr if lang.startswith("fr") else t.description_en,
            icon=t.icon,
            category=t.category
        )
        for t in all_techniques
    ]

    # Génération dynamique de questions spécifiques au dossier pour guider l'interrogatoire
    s_questions = []
    try:
        raw_sq = case.suggested_questions_fr if lang.startswith("fr") else case.suggested_questions_en
        if raw_sq:
            s_questions = json.loads(raw_sq)
    except Exception:
        s_questions = []

    if not s_questions:
        w_name = case.witness_name or ("Witness" if lang.startswith("en") else "Témoin")
        
        QUESTIONS_MAP_FR = {
            1: [
                "Avez-vous remarqué la faute d'orthographe dans le nom de la page Facebook ?",
                "Le tampon et la signature de la Primature sont-ils authentiques ?",
                "Le Service d'Information du Gouvernement (SIG) a-t-il émis un démenti ?",
                f"Expliquez-nous comment vous avez eu connaissance de ce couvre-feu, {w_name}."
            ],
            2: [
                "Avez-vous vérifié auprès de l'Hôpital Laquintinie ou de la Banque de Sang ?",
                "Pourquoi le message incitait-il à composer ou transférer le 69689898 ?",
                "Le contact 'Papa' était-il réellement votre proche ou une usurpation ?",
                f"Racontez-nous comment vous avez reçu cet appel au don du sang, {w_name}."
            ],
            3: [
                "Pourquoi cette offre d'emploi demande-t-elle un transfert de frais par Mobile Money ?",
                "La Banque Centrale a-t-elle publié un avis de recrutement officiel ?",
                "Où avez-vous déniché cette annonce ?",
                f"Racontez-nous comment vous avez failli postuler, {w_name}."
            ],
            4: [
                "Qui est l'auteur initial de ce message vocal sur WhatsApp ?",
                "La police ou les services de sécurité ont-ils confirmé ces enlèvements ?",
                "Y a-t-il une preuve précise de lieu ou de date dans l'enregistrement ?",
                f"Pouvez-vous nous expliquer pourquoi ce vocal vous a inquiété, {w_name} ?"
            ],
            5: [
                "D'où provient la capture d'écran de cet arrêté ministériel ?",
                "Le Ministère de l'Énergie a-t-il publié ce décret sur son site officiel ?",
                "Avez-vous repéré des erreurs d'orthographe ou de mise en page sur le document ?",
                f"Racontez-nous comment cette nouvelle s'est propagée, {w_name}."
            ],
            6: [
                "Où exactement ont été récoltées ces tomates difformes ?",
                "Un institut agricole a-t-il analysé ce phénomène de fasciation ?",
                "Est-ce une modification génétique OGM ou un phénomène naturel ?",
                f"Pouvez-vous nous raconter la récolte, {w_name} ?"
            ],
            7: [
                "Sur quoi vous basez-vous pour affirmer 99% d'efficacité contre le paludisme ?",
                "Ce remède a-t-il fait l'objet d'essais cliniques validés par l'OMS ?",
                "Touchez-vous une commission ou un pourcentage sur les ventes de flacons ?",
                f"Racontez-nous comment cette tisane guérit les malades, {w_name}."
            ],
            8: [
                "Avez-vous visionné la séquence vidéo intégrale non coupée ?",
                "La vidéo n'a-t-elle pas été tronquée pour manipuler l'opinion ?",
                "Que s'est-il passé juste avant l'altercation entre les politiciens ?",
                f"Pouvez-vous nous expliquer le contexte de cet extrait, {w_name} ?"
            ],
            9: [
                "Un laboratoire de criminalistique a-t-il analysé les fréquences de cet enregistrement audio ?",
                "Avez-vous décelé des artifices vocaux caractéristiques d'une synthèse par IA ?",
                "D'où provient le fichier audio original ?",
                f"Racontez-nous dans quelles circonstances cet audio s'est répandu, {w_name}."
            ],
            10: [
                "À quel pays appartient l'indicatif téléphonique +254 indiqué dans le message ?",
                "La Banque du Sang locale a-t-elle confirmé ce besoin urgent ?",
                "S'agit-il d'un numéro surtaxé qui débite le crédit d'appel ?",
                f"Racontez-nous comment vous avez reçu cet appel au don du sang, {w_name}."
            ]
        }

        QUESTIONS_MAP_EN = {
            1: [
                "Did you notice the spelling error in the Facebook page name?",
                "Are the seal and signature of the Primature authentic?",
                "Has the Government Information Service (SIG) issued an official denial?",
                f"Tell us how you learned about this curfew notice, {w_name}."
            ],
            2: [
                "Did you check with Laquintinie Hospital or the Blood Bank directly?",
                "Why did the message prompt users to call or forward the 69689898 number?",
                "Was the 'Papa' contact actually your relative or a spoofed identity?",
                f"Tell us how you received this urgent blood appeal, {w_name}."
            ],
            3: [
                "Why does this job offer require transferring fees via Mobile Money?",
                "Has the Central Bank published an official recruitment notice?",
                "Where did you find this announcement?",
                f"Tell us how you almost applied, {w_name}."
            ],
            4: [
                "Who is the original author of this WhatsApp voice message?",
                "Have the police or security services confirmed these abductions?",
                "Is there specific proof of location or date in the recording?",
                f"Can you explain why this voice message worried you, {w_name}?"
            ],
            5: [
                "Where does the screenshot of this ministerial decree come from?",
                "Did the Ministry of Energy publish this decree on its official website?",
                "Did you notice spelling or formatting errors on the document?",
                f"Tell us how this news spread, {w_name}."
            ],
            6: [
                "Where exactly were these deformed tomatoes harvested?",
                "Has an agricultural institute analyzed this fasciation phenomenon?",
                "Is this a GMO genetic modification or a natural phenomenon?",
                f"Can you tell us about the harvest, {w_name}?"
            ],
            7: [
                "What is your basis for claiming 99% effectiveness against malaria?",
                "Has this remedy undergone clinical trials validated by WHO?",
                "Do you receive a commission or percentage on bottle sales?",
                f"Tell us how this herbal tea cures patients, {w_name}."
            ],
            8: [
                "Have you watched the complete uncut video sequence?",
                "Was the video truncated to manipulate public opinion?",
                "What happened right before the argument between the politicians?",
                f"Can you explain the context of this clip to us, {w_name}?"
            ],
            9: [
                "Has a forensics laboratory analyzed the frequency of this audio recording?",
                "Did you detect vocal artifacts characteristic of AI synthesis?",
                "Where does the original audio file come from?",
                f"Tell us under what circumstances this audio spread, {w_name}."
            ],
            10: [
                "Which country does the +254 phone prefix in the message belong to?",
                "Has the local Blood Bank confirmed this urgent need?",
                "Is this a premium-rate number that drains call credit?",
                f"Tell us how you received this blood donation call, {w_name}."
            ]
        }
        
        if lang.startswith("en"):
            s_questions = QUESTIONS_MAP_EN.get(case.id, [
                f"Where does this information come from, {w_name}?",
                "Do you have direct proof or a certified document?",
                "Has this story been verified with official sources?",
                "Can you tell us what happened from the beginning?"
            ])
        else:
            s_questions = QUESTIONS_MAP_FR.get(case.id, [
                f"D'où provient précisément cette information, {w_name} ?",
                "Avez-vous une preuve directe, un document ou un graphique certifié ?",
                "Est-ce que cette histoire a été vérifiée auprès de sources officielles ?",
                "Pouvez-vous nous raconter le déroulé des faits ?"
            ])

    return CaseDetailRead(
        id=case.id,
        title=case.title_fr if lang.startswith("fr") else case.title_en,
        summary=case.summary_fr if lang.startswith("fr") else case.summary_en,
        brief=case.brief_fr if lang.startswith("fr") else case.brief_en,
        witness=witness_info,
        suggested_questions=s_questions,
        evidences=evidences_read,
        available_techniques=available_techniques_read,
        difficulty=case.difficulty,
        estimated_time_minutes=case.estimated_time_minutes,
        category=case.category,
        unlock_level=case.unlock_level,
        is_demo=case.is_demo,
        is_fake=case.is_fake
    )

@router.get("/{case_id}/evidence", response_model=List[EvidenceRead])
def get_case_evidence(
    case_id: int,
    lang: str = Query("fr"),
    session: Session = Depends(get_session)
):
    case = session.get(Case, case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Affaire non trouvée")

    return [
        EvidenceRead(
            id=e.id,
            title=e.title_fr if lang.startswith("fr") else e.title_en,
            evidence_type=e.evidence_type,
            content=e.content_fr if lang.startswith("fr") else e.content_en,
            image_url=e.image_url,
            clue_hint=e.clue_hint_fr if lang.startswith("fr") else e.clue_hint_en,
            order_index=e.order_index
        )
        for e in sorted(case.evidences, key=lambda x: x.order_index)
    ]

@router.get("/techniques/all", response_model=List[TechniqueRead])
def list_all_techniques(
    lang: str = Query("fr"),
    session: Session = Depends(get_session)
):
    all_techniques = session.exec(select(ManipulationTechnique)).all()
    return [
        TechniqueRead(
            id=t.id,
            code=t.code,
            name=t.name_fr if lang.startswith("fr") else t.name_en,
            description=t.description_fr if lang.startswith("fr") else t.description_en,
            icon=t.icon,
            category=t.category
        )
        for t in all_techniques
    ]
