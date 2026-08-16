/* InfoDetective — Evidence Module */

const Evidence = (() => {
    let revealedEvidence = [];
    let currentCase = null;

    function init(caseData) {
        currentCase = caseData;
        revealedEvidence = [];
        // Reveal first evidence by default (always available)
        if (caseData.evidence.length > 0) {
            revealEvidence(0);
        }
    }

    function revealEvidence(index) {
        if (index !== null && index !== undefined && !revealedEvidence.includes(index)) {
            revealedEvidence.push(index);
            updateBadge();
            return true; // newly revealed
        }
        return false;
    }

    function getRevealedEvidence() {
        return revealedEvidence.map(i => ({ ...currentCase.evidence[i], _index: i }));
    }

    function getRevealedCount() { return revealedEvidence.length; }
    function getTotalCount() { return currentCase ? currentCase.evidence.length : 0; }

    function updateBadge() {
        const badge = document.getElementById('evidence-count-badge');
        if (badge) badge.textContent = revealedEvidence.length;
    }
    function getEvidenceIcon(ev) {
        const typeL = (ev.typeLabel || '').toLowerCase();
        if (typeL.includes('audio')) return SVG_ICONS['mic'] || '';
        if (typeL.includes('capt') || typeL.includes('screen')) return SVG_ICONS['image'] || '';
        if (typeL.includes('stat')) return SVG_ICONS['bar-chart'] || '';
        if (typeL.includes('imag')) return SVG_ICONS['image'] || '';
        if (typeL.includes('doc')) return SVG_ICONS['file-text'] || '';
        if (typeL.includes('vid')) return SVG_ICONS['video'] || '';
        return SVG_ICONS['file-text'] || '';
    }

    function renderGrid() {
        const grid = document.getElementById('evidence-grid');
        const revealed = getRevealedEvidence();
        document.getElementById('evidence-found-count').textContent = revealed.length;

        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const newText = lang === 'en' ? 'NEW' : 'NOUVEAU';

        grid.innerHTML = revealed.map((ev, i) => `
            <div class="evidence-card" data-evidence-index="${ev._index}" onclick="Evidence.showDetail(${ev._index})">
                <span class="evidence-type-icon" style="display:-webkit-inline-box;width:18px;height:18px;">${getEvidenceIcon(ev)}</span>
                <span class="evidence-card-title">${ev.title}</span>
                ${i === revealed.length - 1 ? `<span class="evidence-new-badge">${newText}</span>` : ''}
            </div>
        `).join('');

        // Show unrevealed slots
        const remaining = currentCase.evidence.length - revealed.length;
        const undiscoveredText = lang === 'en' ? 'Undiscovered evidence' : 'Preuve non découverte';
        for (let i = 0; i < remaining; i++) {
            grid.innerHTML += `
                <div class="evidence-card" style="opacity:0.3;cursor:default;">
                    <span class="evidence-type-icon" style="display:-webkit-inline-box;width:18px;height:18px;">${SVG_ICONS['lock']}</span>
                    <span class="evidence-card-title">${undiscoveredText}</span>
                </div>`;
        }
    }

    function showDetail(index) {
        const ev = currentCase.evidence[index];
        if (!ev) return;

        let typeLabel = ev.typeLabel;
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        if (lang === 'en') {
            const types = {
                "Capture d'écran": "Screenshot",
                "Statistique": "Statistic",
                "Image": "Image",
                "Audio": "Audio",
                "Document": "Document",
                "Vidéo": "Video"
            };
            typeLabel = types[ev.typeLabel] || typeLabel;
        }

        document.getElementById('modal-evidence-type').innerHTML = `<span class="modal-type-icon" style="display:-webkit-inline-box;width:18px;height:18px;vertical-align:middle;margin-right:6px;">${getEvidenceIcon(ev)}</span> <span style="vertical-align:middle;">${typeLabel}</span>`;
        document.getElementById('modal-evidence-title').textContent = ev.title;
        document.getElementById('modal-evidence-image').innerHTML = ev.content.replace(/\n/g, '<br>');
        document.getElementById('modal-evidence-description').textContent = ev.description;

        const modal = document.getElementById('evidence-modal');
        modal.hidden = false;
    }

    function closeModal() {
        document.getElementById('evidence-modal').hidden = true;
    }

    // Modal close handlers
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('modal-close').addEventListener('click', closeModal);
        document.getElementById('modal-backdrop').addEventListener('click', closeModal);
    });

    return { init, revealEvidence, getRevealedEvidence, getRevealedCount, getTotalCount, renderGrid, showDetail, closeModal };
})();
