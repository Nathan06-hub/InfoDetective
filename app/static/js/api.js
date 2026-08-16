/* InfoDetective — API Client Module
   Permet la communication avec le Backend FastAPI tout en préservant le fallback local.
*/

const API = (() => {
    // Détection automatique de l'URL du Backend (même hôte ou port 8000 par défaut)
    const getBaseUrl = () => {
        const customUrl = localStorage.getItem('infodetective_api_url');
        if (customUrl) return customUrl.replace(/\/$/, '');
        
        if (window.location.port === '8000') {
            return window.location.origin;
        }
        // Si servi depuis un autre serveur local (ex: Live Server 5500 ou file://)
        return 'http://localhost:8000';
    };

    let currentUserId = localStorage.getItem('infodetective_user_id') || null;

    async function request(endpoint, options = {}) {
        const url = `${getBaseUrl()}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        };

        try {
            const res = await fetch(url, { ...options, headers });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.detail || `HTTP error ${res.status}`);
            }
            return await res.json();
        } catch (err) {
            console.warn(`[API] Requête échouée (${url}):`, err.message);
            throw err;
        }
    }

    /* ---- Gestion de l'utilisateur Détective ---- */
    async function initUser(username = null) {
        try {
            if (currentUserId) {
                const profile = await getUserProfile(currentUserId);
                return profile;
            }
        } catch (e) {
            console.log('[API] Création d\'un nouveau compte invité...');
        }

        try {
            const payload = username ? { username } : {};
            const res = await request('/api/users/guest', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            currentUserId = res.id;
            localStorage.setItem('infodetective_user_id', currentUserId);
            return res;
        } catch (e) {
            console.warn('[API] Impossible de contacter le backend pour initUser, mode hors-ligne actif.');
            return null;
        }
    }

    function getUserId() {
        return currentUserId || localStorage.getItem('infodetective_user_id');
    }

    async function getUserProfile(userId = null) {
        const uid = userId || getUserId();
        if (!uid) return null;
        return await request(`/api/users/${uid}/profile`);
    }

    async function updateUsername(username, userId = null) {
        const uid = userId || getUserId();
        if (!uid) return null;
        return await request(`/api/users/${uid}/name`, {
            method: 'PUT',
            body: JSON.stringify({ username })
        });
    }

    /* ---- Gestion des Dossiers d'Enquête ---- */
    async function fetchCases(lang = 'fr', mode = 'adventure', search = '') {
        const uid = getUserId();
        const params = new URLSearchParams({ lang, mode });
        if (uid) params.append('user_id', uid);
        if (search) params.append('search', search);

        return await request(`/api/cases?${params.toString()}`);
    }

    async function fetchCaseDetail(caseId, lang = 'fr') {
        return await request(`/api/cases/${caseId}?lang=${lang}`);
    }

    /* ---- Interrogatoire du Témoin ---- */
    async function sendChatMessage(caseId, message, conversationHistory = [], lang = 'fr') {
        const uid = getUserId();
        const formattedHistory = conversationHistory.map(m => ({
            sender: m.role === 'user' ? 'user' : 'witness',
            content: m.content
        }));

        const payload = {
            user_id: uid ? parseInt(uid, 10) : null,
            message: message,
            conversation_history: formattedHistory,
            lang: lang
        };

        return await request(`/api/cases/${caseId}/chat`, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }

    /* ---- Soumission du Verdict ---- */
    async function submitVerdict(caseId, userVerdictDecision, selectedTechniqueCodes, userConclusionText = '', lang = 'fr') {
        const uid = getUserId();
        const payload = {
            user_id: uid ? parseInt(uid, 10) : 1,
            user_verdict_decision: userVerdictDecision, // "true" ou "fake"
            selected_technique_codes: selectedTechniqueCodes,
            user_conclusion_text: userConclusionText,
            lang: lang
        };

        return await request(`/api/cases/${caseId}/verdict`, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }

    /* ---- Classement Détectives ---- */
    async function fetchLeaderboard() {
        return await request('/api/users/leaderboard');
    }

    return {
        getBaseUrl,
        initUser,
        getUserId,
        getUserProfile,
        updateUsername,
        fetchCases,
        fetchCaseDetail,
        sendChatMessage,
        submitVerdict,
        fetchLeaderboard
    };
})();
