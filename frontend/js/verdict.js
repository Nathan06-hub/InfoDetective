/* InfoDetective — Verdict Module */

const Verdict = (() => {
    let currentCase = null;
    let selectedTechniques = [];

    function init(caseData) {
        currentCase = caseData;
        selectedTechniques = [];
        renderTechniques();
    }

    function renderTechniques() {
        const list = document.getElementById('techniques-list');
        if (!list || !currentCase) return;
        const choices = currentCase.techniqueChoices || [];
        const lang = localStorage.getItem('info_detective_lang') || 'fr';

        list.innerHTML = choices.map(techId => {
            const tech = ALL_TECHNIQUES.find(t => t.id === techId);
            if (!tech) return '';
            
            let name = tech.name;
            if (lang === 'en' && typeof TECHNIQUE_TRANSLATIONS !== 'undefined' && TECHNIQUE_TRANSLATIONS['en'][tech.id]) {
                name = TECHNIQUE_TRANSLATIONS['en'][tech.id].name;
            }

            const isSelected = selectedTechniques.includes(tech.id);
            return `
                <div class="technique-chip ${isSelected ? 'selected' : ''}" data-tech-id="${tech.id}" onclick="Verdict.toggle('${tech.id}')">
                    ${name}
                </div>`;
        }).join('');
    }

    function toggle(techId) {
        const idx = selectedTechniques.indexOf(techId);
        if (idx >= 0) selectedTechniques.splice(idx, 1);
        else selectedTechniques.push(techId);

        document.querySelectorAll('.technique-chip').forEach(chip => {
            chip.classList.toggle('selected', selectedTechniques.includes(chip.dataset.techId));
        });
    }

    function calculateResult() {
        const correct = currentCase.correctTechniques || [];
        const selected = selectedTechniques || [];

        const correctlyIdentified = selected.filter(t => correct.includes(t));
        const missed = correct.filter(t => !selected.includes(t));
        const wronglySelected = selected.filter(t => !correct.includes(t));

        // Score formula:
        // Base reward for detection, penalty for false accusations
        const maxPoints = Math.max(1, correct.length) * 40 + 20;
        const earnedPoints = correctlyIdentified.length * 40;
        const penalty = wronglySelected.length * 20;
        const raw = Math.max(0, 20 + earnedPoints - penalty);
        const score = Math.min(100, Math.round((raw / maxPoints) * 100));

        const passed = score >= 70;

        let tier;
        if (score >= 90) tier = 'perfect';
        else if (score >= 70) tier = 'good';
        else if (score >= 40) tier = 'partial';
        else tier = 'poor';

        let stars = 0;
        if (score >= 90) stars = 3;
        else if (score >= 70) stars = 2;
        else if (score >= 40) stars = 1;

        return {
            score,
            passed,
            stars,
            tier,
            correctlyIdentified,
            missed,
            wronglySelected,
            feedback: currentCase.feedback ? currentCase.feedback[tier] : ''
        };
    }

    function getStarsSvg(count) {
        let html = '';
        for (let i = 1; i <= 3; i++) {
            const fill = i <= count ? 'var(--accent-amber)' : 'none';
            const stroke = i <= count ? 'var(--accent-amber)' : 'var(--border-color)';
            html += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; margin: 0 4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        }
        return html;
    }

    function renderResult(result) {
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const isEn = lang === 'en';

        // Score
        const scoreEl = document.getElementById('score-value');
        if (scoreEl) {
            scoreEl.textContent = '0';
            animateScore(scoreEl, result.score);
        }

        // Score circle color
        const circle = document.getElementById('score-circle');
        if (circle) {
            if (result.score >= 70) circle.style.borderColor = 'var(--success-green)';
            else if (result.score >= 40) circle.style.borderColor = 'var(--accent-amber)';
            else circle.style.borderColor = '#EF4444';
        }

        // Stars
        const starsEl = document.getElementById('score-stars');
        if (starsEl) starsEl.innerHTML = getStarsSvg(result.stars);

        // Title
        const frTitles = {
            perfect: 'Enquête parfaite !',
            good: 'Bon travail, détective !',
            partial: 'Pas mal, mais il y a des oublis...',
            poor: 'Vous êtes tombé dans le piège !'
        };
        const enTitles = {
            perfect: 'Perfect investigation!',
            good: 'Good job, detective!',
            partial: 'Not bad, but some errors...',
            poor: 'You fell into the trap!'
        };
        const titles = isEn ? enTitles : frTitles;
        const scoreTitleEl = document.getElementById('score-title');
        if (scoreTitleEl) scoreTitleEl.textContent = titles[result.tier];

        // Status banner (70% threshold)
        const statusBanner = document.getElementById('result-status-banner');
        if (statusBanner) {
            if (result.score >= 70) {
                statusBanner.className = 'result-status-banner status-success';
                statusBanner.innerHTML = isEn
                    ? '<span>✓ Investigation cleared! (70% reached — Next level unlocked)</span>'
                    : '<span>✓ Dossier validé ! (Palier 70% atteint — Niveau suivant débloqué)</span>';
            } else {
                statusBanner.className = 'result-status-banner status-fail';
                statusBanner.innerHTML = isEn
                    ? '<span>🔒 Score below 70%. Retry to unlock next case.</span>'
                    : '<span>🔒 Score inférieur à 70%. Recommencez pour débloquer la suite.</span>';
            }
        }

        // 1. Ce que vous avez bien fait
        const goodListEl = document.getElementById('result-good-list');
        if (goodListEl) {
            goodListEl.innerHTML = '';
            if (result.correctlyIdentified && result.correctlyIdentified.length > 0) {
                result.correctlyIdentified.forEach(id => {
                    const t = ALL_TECHNIQUES.find(x => x.id === id);
                    let name = t ? t.name : id;
                    let desc = t ? t.desc : '';
                    if (isEn && typeof TECHNIQUE_TRANSLATIONS !== 'undefined' && TECHNIQUE_TRANSLATIONS['en'][id]) {
                        name = TECHNIQUE_TRANSLATIONS['en'][id].name;
                        desc = TECHNIQUE_TRANSLATIONS['en'][id].desc;
                    }
                    goodListEl.innerHTML += `
                        <div class="analysis-item-pill item-good">
                            <div class="item-pill-header">
                                <span class="item-pill-title">${name}</span>
                                <span class="item-pill-tag tag-good">${isEn ? 'Identified' : 'Bien repéré'}</span>
                            </div>
                            <p class="item-pill-desc">${desc}</p>
                        </div>
                    `;
                });
            } else {
                goodListEl.innerHTML = `<p class="analysis-empty-text">${isEn ? 'No correct manipulation technique identified.' : 'Aucune technique correcte repérée.'}</p>`;
            }
        }

        // 2. Ce qu'il faut améliorer
        const improveListEl = document.getElementById('result-improve-list');
        if (improveListEl) {
            improveListEl.innerHTML = '';
            let hasImprovements = false;

            if (result.wronglySelected && result.wronglySelected.length > 0) {
                hasImprovements = true;
                result.wronglySelected.forEach(id => {
                    const t = ALL_TECHNIQUES.find(x => x.id === id);
                    let name = t ? t.name : id;
                    if (isEn && typeof TECHNIQUE_TRANSLATIONS !== 'undefined' && TECHNIQUE_TRANSLATIONS['en'][id]) {
                        name = TECHNIQUE_TRANSLATIONS['en'][id].name;
                    }
                    improveListEl.innerHTML += `
                        <div class="analysis-item-pill item-wrong">
                            <div class="item-pill-header">
                                <span class="item-pill-title">${name}</span>
                                <span class="item-pill-tag tag-wrong">${isEn ? 'False accusation' : 'Accusation infondée'}</span>
                            </div>
                            <p class="item-pill-desc">${isEn ? 'This technique was not present in the evidence (-15 pts).' : 'Cette technique n\'était pas présente dans les preuves du dossier (-15 pts).'}</p>
                        </div>
                    `;
                });
            }

            if (result.missed && result.missed.length > 0) {
                hasImprovements = true;
                result.missed.forEach(id => {
                    const t = ALL_TECHNIQUES.find(x => x.id === id);
                    let name = t ? t.name : id;
                    let desc = t ? t.desc : '';
                    if (isEn && typeof TECHNIQUE_TRANSLATIONS !== 'undefined' && TECHNIQUE_TRANSLATIONS['en'][id]) {
                        name = TECHNIQUE_TRANSLATIONS['en'][id].name;
                        desc = TECHNIQUE_TRANSLATIONS['en'][id].desc;
                    }
                    improveListEl.innerHTML += `
                        <div class="analysis-item-pill item-missed">
                            <div class="item-pill-header">
                                <span class="item-pill-title">${name}</span>
                                <span class="item-pill-tag tag-missed">${isEn ? 'Missed technique' : 'Technique manquée'}</span>
                            </div>
                            <p class="item-pill-desc">${desc}</p>
                        </div>
                    `;
                });
            }

            if (!hasImprovements) {
                improveListEl.innerHTML = `<p class="analysis-empty-text">${isEn ? 'Flawless analysis! Zero errors or missed clues.' : 'Excellente analyse ! Aucun piège ni oubli commis.'}</p>`;
            }
        }

        // Lesson & Feedback
        const lessonTextEl = document.getElementById('lesson-text');
        if (lessonTextEl) {
            lessonTextEl.textContent = currentCase.lesson;
        }

        // Badge
        const badgeEl = document.getElementById('result-badge');
        if (badgeEl) {
            if (result.score >= 70 && currentCase.badge) {
                badgeEl.hidden = false;
                document.getElementById('result-badge-icon').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--accent-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px;"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
                document.getElementById('result-badge-name').textContent = currentCase.badge.name;
            } else {
                badgeEl.hidden = true;
            }
        }

        return result;
    }

    function animateScore(el, target) {
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(interval);
        }, 25);
    }

    async function submitVerdictAsync(caseObj, conclusionText = '') {
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const caseNum = caseObj.number || (typeof caseObj.id === 'string' ? parseInt(caseObj.id.replace(/\D/g, ''), 10) : caseObj.id) || 1;
        const userDecision = (selectedTechniques.length === 1 && selectedTechniques[0] === 'aucune') ? 'true' : 'fake';

        // 1. Tenter l'évaluation via le backend FastAPI
        if (typeof API !== 'undefined' && API.submitVerdict) {
            try {
                const apiRes = await API.submitVerdict(caseNum, userDecision, selectedTechniques, conclusionText, lang);
                if (apiRes && apiRes.score !== undefined) {
                    const scorePct = apiRes.score_percentage !== undefined ? apiRes.score_percentage : Math.round(apiRes.score / 10);
                    const passed = scorePct >= 70;
                    let stars = 0;
                    if (scorePct >= 90) stars = 3;
                    else if (scorePct >= 70) stars = 2;
                    else if (scorePct >= 40) stars = 1;

                    let tier = 'poor';
                    if (scorePct >= 90) tier = 'perfect';
                    else if (scorePct >= 70) tier = 'good';
                    else if (scorePct >= 40) tier = 'partial';

                    const correctlyIdentified = [];
                    const missed = [];
                    const wronglySelected = [];

                    if (apiRes.techniques_feedback && apiRes.techniques_feedback.length > 0) {
                        apiRes.techniques_feedback.forEach(t => {
                            if (t.status === 'correct') correctlyIdentified.push(t.code);
                            else if (t.status === 'missed') missed.push(t.code);
                            else if (t.status === 'wrong') wronglySelected.push(t.code);
                        });
                    } else {
                        const correct = caseObj.correctTechniques || [];
                        selectedTechniques.forEach(t => {
                            if (correct.includes(t)) correctlyIdentified.push(t);
                            else wronglySelected.push(t);
                        });
                        correct.forEach(t => {
                            if (!selectedTechniques.includes(t)) missed.push(t);
                        });
                    }

                    const result = {
                        score: scorePct,
                        passed: passed,
                        stars: stars,
                        tier: tier,
                        correctlyIdentified: correctlyIdentified,
                        missed: missed,
                        wronglySelected: wronglySelected,
                        feedback: apiRes.ai_pedagogical_feedback || (caseObj.feedback && caseObj.feedback[tier]) || '',
                        unlockedBadges: apiRes.unlocked_badges || []
                    };
                    return result;
                }
            } catch (err) {
                console.log('[Verdict] Backend indisponible pour le verdict, bascule sur calcul local:', err.message);
            }
        }

        // 2. Mode local de secours
        return calculateResult();
    }

    return { init, toggle, calculateResult, submitVerdictAsync, renderResult, getSelected: () => selectedTechniques };
})();
