import json
from typing import List, Dict, Tuple, Any
from sqlmodel import Session, select
from app.models.case import Case, ManipulationTechnique, CaseTechniqueLink
from app.models.user import User, UserProgress
from app.models.badge import Badge, UserBadge
from app.schemas.verdict import TechniqueFeedback, BadgeUnlocked

class ScoringService:
    @staticmethod
    def evaluate_verdict(
        session: Session,
        user: User,
        case: Case,
        selected_codes: List[str],
        user_verdict_decision: str = "fake",
        user_conclusion_text: str = "",
        lang: str = "fr"
    ) -> Tuple[int, List[TechniqueFeedback], List[BadgeUnlocked]]:
        
        # 1. Pertinence du verdict principal (VRAI vs FAUX) : 500 Points max
        is_user_saying_fake = user_verdict_decision.lower() in ["fake", "false"]
        decision_correct = (is_user_saying_fake == case.is_fake)
        decision_score = 500 if decision_correct else 0
        
        # 2. Détection des différentes techniques de manipulation : 500 Points max
        all_techniques = session.exec(select(ManipulationTechnique)).all()
        technique_map = {t.code: t for t in all_techniques}
        
        links = session.exec(select(CaseTechniqueLink).where(CaseTechniqueLink.case_id == case.id)).all()
        tech_ids = [l.technique_id for l in links]
        if tech_ids:
            tech_objs = session.exec(select(ManipulationTechnique).where(ManipulationTechnique.id.in_(tech_ids))).all()
            correct_codes = set(t.code for t in tech_objs)
        else:
            correct_codes = set(t.code for t in case.techniques)

        selected_set = set(selected_codes or [])
        
        if not case.is_fake and not correct_codes:
            correct_codes = {"information_verifiee"}

        true_positives = selected_set.intersection(correct_codes)
        false_positives = selected_set - correct_codes
        
        total_expected = len(correct_codes) if len(correct_codes) > 0 else 1
        technique_score = (len(true_positives) / total_expected) * 500
        penalty = len(false_positives) * 100
        detection_score = max(0, int(round(technique_score - penalty)))

        # 3. Bonus de pertinence d'argumentation rédigée : Jusqu'à +100 Points
        argumentation_bonus = 0
        if user_conclusion_text and len(user_conclusion_text.strip()) >= 15:
            argumentation_bonus = 100 if len(user_conclusion_text.strip()) >= 50 else 50
        
        # Calcul du score global
        raw_score = decision_score + detection_score + argumentation_bonus
        final_score = max(0, min(1000, raw_score))
        if decision_correct and final_score < 350:
            final_score = 350
        
        # Détail pédagogique par technique
        feedback_list: List[TechniqueFeedback] = []
        
        # Traiter les techniques attendues
        for code in correct_codes:
            tech = technique_map.get(code)
            name = (tech.name_fr if lang.startswith("fr") else tech.name_en) if tech else code
            desc = (tech.description_fr if lang.startswith("fr") else tech.description_en) if tech else ""
            
            if code in selected_set:
                status = "correct"
                explanation = (
                    f" Bravo ! Vous avez bien identifié '{name}'. {desc}"
                    if lang.startswith("fr") else
                    f" Great job! You correctly identified '{name}'. {desc}"
                )
            else:
                status = "missed"
                explanation = (
                    f" Manqué. Cette affaire contenait bien la technique '{name}'. {desc}"
                    if lang.startswith("fr") else
                    f" Missed. This case actually contained '{name}'. {desc}"
                )
            feedback_list.append(TechniqueFeedback(code=code, name=name, status=status, explanation=explanation))
            
        # Traiter les faux positifs (techniques sélectionnées à tort)
        for code in false_positives:
            tech = technique_map.get(code)
            name = (tech.name_fr if lang.startswith("fr") else tech.name_en) if tech else code
            explanation = (
                f" Incorrect. La technique '{name}' n'était pas présente dans ce dossier."
                if lang.startswith("fr") else
                f" Incorrect. The technique '{name}' was not present in this case."
            )
            feedback_list.append(TechniqueFeedback(code=code, name=name, status="wrong", explanation=explanation))

        # 2. Gestion des Séries de victoires (Streaks) et Multiplicateur de score
        if final_score >= 600:
            user.current_streak += 1
            user.best_streak = max(user.best_streak, user.current_streak)
            # Appliquer un bonus multiplicateur (ex: x1.1 pour streak 2, x1.2 pour streak 3, max x1.5)
            multiplier = 1.0 + min(0.5, (user.current_streak - 1) * 0.1)
            final_score = min(1000, int(round(final_score * multiplier)))
        else:
            user.current_streak = 0 # Réinitialisation de la série en cas d'échec

        # Enregistrer la progression : seuil de réussite fixé à 700 points (70%)
        is_passed = (final_score >= 700)
        
        existing_progress = session.exec(
            select(UserProgress).where(UserProgress.user_id == user.id, UserProgress.case_id == case.id)
        ).first()
        
        verdict_data = {
            "selected_codes": list(selected_set),
            "correct_codes": list(correct_codes),
            "score": final_score,
            "passed": is_passed,
            "streak": user.current_streak
        }
        
        if existing_progress:
            if final_score > existing_progress.score_obtained:
                user.score_total += (final_score - existing_progress.score_obtained)
                existing_progress.score_obtained = final_score
            if is_passed:
                existing_progress.completed = True
            existing_progress.verdict_json = json.dumps(verdict_data)
        else:
            new_progress = UserProgress(
                user_id=user.id,
                case_id=case.id,
                completed=is_passed,
                score_obtained=final_score,
                verdict_json=json.dumps(verdict_data)
            )
            session.add(new_progress)
            if is_passed:
                user.cases_completed_count += 1
            user.score_total += final_score

        session.add(user)
        session.commit()
        session.refresh(user)

        # Vérification des Badges à débloquer (seulement si palier de 70% atteint)
        newly_unlocked_badges = ScoringService._check_badges(session, user, case, final_score, len(true_positives), total_expected, lang) if is_passed else []
        
        return final_score, feedback_list, newly_unlocked_badges

    @staticmethod
    def _check_badges(session: Session, user: User, case: Case, current_score: int, true_positives: int, total_expected: int, lang: str) -> List[BadgeUnlocked]:
        unlocked: List[BadgeUnlocked] = []
        existing_badge_ids = set(b.badge_id for b in session.exec(select(UserBadge).where(UserBadge.user_id == user.id)).all())
        all_badges = session.exec(select(Badge)).all()

        case_tech_codes = set(t.code for t in case.techniques)

        for badge in all_badges:
            if badge.id in existing_badge_ids:
                continue

            should_unlock = False
            if badge.code == "first_case" and user.cases_completed_count >= 1:
                should_unlock = True
            elif badge.code == "perfect_verdict" and current_score >= 900:
                should_unlock = True
            elif badge.code == "fact_checker" and not case.is_fake and current_score >= 600:
                should_unlock = True
            elif badge.code == "source_expert" and case.is_fake and "source_absente" in case_tech_codes and current_score >= 600:
                should_unlock = True
            elif badge.code == "deepfake_hunter" and case.is_fake and "deepfake_truquage" in case_tech_codes and current_score >= 600:
                should_unlock = True
            elif badge.code == "truth_seeker" and user.cases_completed_count >= 5:
                should_unlock = True
            elif badge.code == "detective_master" and user.score_total >= 1000:
                should_unlock = True
            elif badge.code == "legendary_detective" and user.score_total >= 3000:
                should_unlock = True

            if should_unlock:
                user_badge = UserBadge(user_id=user.id, badge_id=badge.id)
                session.add(user_badge)
                unlocked.append(
                    BadgeUnlocked(
                        code=badge.code,
                        name=badge.name_fr if lang.startswith("fr") else badge.name_en,
                        description=badge.description_fr if lang.startswith("fr") else badge.description_en,
                        icon_name=badge.icon_name
                    )
                )

        if unlocked:
            session.commit()

        return unlocked
