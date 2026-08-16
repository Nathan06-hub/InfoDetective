from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from app.database import get_session
from app.models.case import Case
from app.models.user import User
from app.models.chat import ChatSession, ChatMessage
from app.schemas.case import EvidenceRead
from app.schemas.chat import ChatMessageCreate, ChatResponse, ChatMessageRead
from app.services.gemini_service import GeminiService

router = APIRouter(prefix="/api/cases", tags=["Witness Chat (IA)"])

@router.post("/{case_id}/chat", response_model=ChatResponse)
def send_message_to_witness(
    case_id: int,
    body: ChatMessageCreate,
    session: Session = Depends(get_session)
):
    case = session.get(Case, case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Affaire non trouvée")

    user = None
    if isinstance(body.user_id, int) or (isinstance(body.user_id, str) and str(body.user_id).isdigit()):
        user = session.get(User, int(body.user_id))
    if not user and isinstance(body.user_id, str):
        user = session.exec(select(User).where(User.username == body.user_id)).first()
        if not user:
            user = User(username=body.user_id, is_guest=True)
            session.add(user)
            session.commit()
            session.refresh(user)

    if not user:
        user = User(username="Guest Detective", is_guest=True)
        session.add(user)
        session.commit()
        session.refresh(user)

    lang = body.lang or "fr"

    # Trouver ou créer la session de chat
    chat_sess = session.exec(
        select(ChatSession).where(
            ChatSession.user_id == user.id,
            ChatSession.case_id == case.id
        )
    ).first()

    if not chat_sess:
        chat_sess = ChatSession(user_id=user.id, case_id=case.id)
        session.add(chat_sess)
        session.commit()
        session.refresh(chat_sess)

    # Récupérer l'historique des messages passés
    past_messages = session.exec(
        select(ChatMessage).where(ChatMessage.session_id == chat_sess.id).order_by(ChatMessage.timestamp.asc())
    ).all()

    history_dict = [{"sender": m.sender, "content": m.content} for m in past_messages]

    # Enregistrer le nouveau message de l'utilisateur
    user_msg_db = ChatMessage(session_id=chat_sess.id, sender="user", content=body.message)
    session.add(user_msg_db)
    session.commit()

    # Choisir le system prompt et le résumé selon la langue
    sys_prompt = case.witness_system_prompt_fr if lang.startswith("fr") else case.witness_system_prompt_en
    summary = case.summary_fr if lang.startswith("fr") else case.summary_en

    # Appeler le service IA (Gemini ou Fallback Mock)
    reply_text, is_mock = GeminiService.generate_witness_reply(
        history=history_dict,
        user_message=body.message,
        system_prompt=sys_prompt,
        witness_name=case.witness_name,
        case_summary=summary,
        lang=lang
    )

    # Enregistrer la réponse du témoin
    witness_msg_db = ChatMessage(session_id=chat_sess.id, sender="witness", content=reply_text)
    session.add(witness_msg_db)
    session.commit()

    # Récupérer l'historique complet mis à jour
    updated_messages = session.exec(
        select(ChatMessage).where(ChatMessage.session_id == chat_sess.id).order_by(ChatMessage.timestamp.asc())
    ).all()

    history_read = [
        ChatMessageRead(
            id=m.id,
            sender=m.sender,
            content=m.content,
            timestamp=m.timestamp
        )
        for m in updated_messages
    ]

    # Vérifier si l'utilisateur demande une preuve/capture pendant la discussion
    unlocked_evidences_read = []
    message_lower = body.message.lower()
    keywords = ["capture", "photo", "preuve", "document", "étude", "etude", "étiquette", "etiquette", "image", "affiche", "post", "source", "reçu", "voir"]
    
    if any(k in message_lower for k in keywords):
        evidences = sorted(case.evidences, key=lambda x: x.order_index)
        unlocked_evidences_read = [
            EvidenceRead(
                id=e.id,
                title=e.title_fr if lang.startswith("fr") else e.title_en,
                evidence_type=e.evidence_type,
                content=e.content_fr if lang.startswith("fr") else e.content_en,
                image_url=e.image_url,
                clue_hint=e.clue_hint_fr if lang.startswith("fr") else e.clue_hint_en,
                order_index=e.order_index
            )
            for e in evidences
        ]

    return ChatResponse(
        reply=reply_text,
        witness_name=case.witness_name,
        typing_delay_ms=1200,
        is_mock=is_mock,
        unlocked_evidences=unlocked_evidences_read,
        messages_history=history_read
    )

@router.get("/{case_id}/chat/history", response_model=List[ChatMessageRead])
def get_chat_history(
    case_id: int,
    user_id: int = Query(...),
    session: Session = Depends(get_session)
):
    chat_sess = session.exec(
        select(ChatSession).where(
            ChatSession.user_id == user_id,
            ChatSession.case_id == case_id
        )
    ).first()

    if not chat_sess:
        return []

    past_messages = session.exec(
        select(ChatMessage).where(ChatMessage.session_id == chat_sess.id).order_by(ChatMessage.timestamp.asc())
    ).all()

    return [
        ChatMessageRead(
            id=m.id,
            sender=m.sender,
            content=m.content,
            timestamp=m.timestamp
        )
        for m in past_messages
    ]
