/* InfoDetective — Progress & LocalStorage */

const Progress = (() => {
    const STORAGE_KEY = 'infodetective_progress';

    const defaultState = () => ({
        completedCases: [],
        scores: {},
        badges: [],
        currentCaseId: null
    });

    let state = defaultState();

    function load() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) state = { ...defaultState(), ...JSON.parse(saved) };
        } catch (e) { state = defaultState(); }
        return state;
    }

    function save() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    }

    function isCaseCompleted(caseId) { return state.completedCases.includes(caseId); }

    function isCaseUnlocked(caseIndex) {
        if (caseIndex === 0) return true;
        return state.completedCases.includes(CASES[caseIndex - 1].id);
    }

    function completeCase(caseId, score, badgeName) {
        state.scores[caseId] = Math.max(state.scores[caseId] || 0, score);
        if (score >= 70) {
            if (!state.completedCases.includes(caseId)) {
                state.completedCases.push(caseId);
            }
            if (badgeName && !state.badges.includes(badgeName)) {
                state.badges.push(badgeName);
            }
        }
        save();
    }

    function getCompletedCount() { return state.completedCases.length; }
    function getBadgeCount() { return (state.badges || []).length; }
    function getScore(caseId) { return state.scores[caseId] || 0; }
    function hasBadge(badgeName) { return (state.badges || []).includes(badgeName); }
    function reset() { state = defaultState(); save(); }

    function getStats() {
        const completedCount = state.completedCases.length;
        const scoreValues = Object.values(state.scores);
        const avgScore = scoreValues.length > 0 ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length) : 0;
        return {
            completedCount,
            avgScore,
            badges: state.badges || [],
            scores: state.scores || {}
        };
    }

    return { load, save, isCaseCompleted, isCaseUnlocked, completeCase, getCompletedCount, getBadgeCount, getScore, hasBadge, reset, getState: () => state, getStats };
})();
