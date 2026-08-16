/* InfoDetective — Main App Controller */

const App = (() => {
    let currentCase = null;
    let currentCaseIndex = -1;

    function getLocalizedCase(c) {
        if (!c) return null;
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        if (lang !== 'en') return c;
        
        if (typeof CASE_TRANSLATIONS === 'undefined' || !CASE_TRANSLATIONS['en'] || !CASE_TRANSLATIONS['en']['case-' + c.number]) {
            return c;
        }
        
        const enTrans = CASE_TRANSLATIONS['en']['case-' + c.number];
        const localized = JSON.parse(JSON.stringify(c));
        
        localized.title = enTrans.title || c.title;
        localized.brief = enTrans.brief || c.brief;
        localized.lesson = enTrans.lesson || c.lesson;
        if (enTrans.badge && localized.badge) {
            localized.badge.name = enTrans.badge.name || c.badge.name;
        }
        if (enTrans.feedback) {
            localized.feedback = { ...c.feedback, ...enTrans.feedback };
        }
        if (enTrans.witness && localized.witness) {
            localized.witness.role = enTrans.witness.role || c.witness.role;
            localized.witness.intro = enTrans.witness.intro || c.witness.intro;
        }
        if (enTrans.questions && localized.questions) {
            enTrans.questions.forEach(qTrans => {
                const origQ = localized.questions.find(x => x.id === qTrans.id);
                if (origQ) {
                    origQ.suggested = qTrans.suggested;
                    origQ.responses = qTrans.responses;
                }
            });
        }
        if (enTrans.evidence && localized.evidence) {
            enTrans.evidence.forEach(eTrans => {
                const origE = localized.evidence.find(x => x.id === eTrans.id);
                if (origE) {
                    origE.title = eTrans.title;
                    origE.content = eTrans.content;
                    origE.description = eTrans.description;
                }
            });
        }
        return localized;
    }

    function updatePageLanguage() {
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang][key]) {
                const val = UI_TRANSLATIONS[lang][key];
                if (val.includes('<') && val.includes('>')) {
                    el.innerHTML = val;
                } else if (el.children.length === 0) {
                    el.textContent = val;
                } else {
                    Array.from(el.childNodes).forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
                            node.nodeValue = val;
                        }
                    });
                }
            }
        });

        // Header Language Pill
        const headerFlag = document.getElementById('header-lang-flag');
        const headerLabel = document.getElementById('header-lang-label');
        if (headerFlag) headerFlag.textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
        if (headerLabel) headerLabel.textContent = lang === 'fr' ? 'FR' : 'EN';

        // Profile Lang Button
        const langBtnProfile = document.getElementById('btn-lang-toggle-profile');
        if (langBtnProfile) {
            langBtnProfile.textContent = lang === 'en' ? 'English (EN)' : 'Français (FR)';
        }

        // Chat Input placeholder
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.placeholder = UI_TRANSLATIONS[lang]['placeholder-chat'] || (lang === 'en' ? 'Talk to the witness...' : 'Discuter avec le témoin...');
        }

        // Profile Name placeholder
        const profileInput = document.getElementById('profile-name-input');
        if (profileInput) {
            profileInput.placeholder = UI_TRANSLATIONS[lang]['placeholder-profile-name'] || (lang === 'en' ? 'Your detective name...' : 'Votre nom de détective...');
        }
    }

    function init() {
        Progress.load();
        updatePageLanguage();
        renderCaseGrid();
        updateStats();
        bindNavigation();

        if (typeof API !== 'undefined' && API.initUser) {
            API.initUser().then(user => {
                if (user && user.username) {
                    const saved = localStorage.getItem('info_detective_player_name');
                    if (!saved) {
                        localStorage.setItem('info_detective_player_name', user.username);
                        const nameInput = document.getElementById('profile-name-input');
                        if (nameInput) nameInput.value = user.username;
                    }
                }
            }).catch(e => console.log('[App] Mode autonome actif'));
        }
    }

    function updateStats() {
        document.getElementById('badge-count').textContent = Progress.getBadgeCount();
        document.getElementById('case-completed-count').textContent = Progress.getCompletedCount();
    }

    /* ---- Render Active Card & Locked Cases List (Lovable Style) ---- */
    function renderCaseGrid() {
        const activeContainer = document.getElementById('active-case-container');
        const lockedContainer = document.getElementById('locked-cases-container');
        const lang = localStorage.getItem('info_detective_lang') || 'fr';

        if (!activeContainer || !lockedContainer) return;

        // Find active unlocked case index
        let activeIdx = 0;
        for (let i = 0; i < CASES.length; i++) {
            if (!Progress.isCaseCompleted(CASES[i].id)) {
                activeIdx = i;
                break;
            }
        }

        const activeCaseObj = getLocalizedCase(CASES[activeIdx]);
        const diffValue = lang === 'en' ? (activeCaseObj.difficulty === 1 ? 'BEGINNER' : (activeCaseObj.difficulty === 2 ? 'INTERMEDIATE' : 'HARD')) : (activeCaseObj.difficulty === 1 ? 'DÉBUTANT' : (activeCaseObj.difficulty === 2 ? 'INTERMÉDIAIRE' : 'DIFFICILE'));
        const avatarSrc = activeCaseObj.witness.avatar || 'assets/witnesses/nadege.webp';

        // Render Active Case
        activeContainer.innerHTML = `
            <div class="active-dossier-card" onclick="App.openBrief(${activeIdx})">
                <div class="dossier-card-top">
                    <img src="${avatarSrc}" alt="${activeCaseObj.witness.name}" class="dossier-card-avatar" />
                    <div class="dossier-card-details">
                        <div class="dossier-badge-row">DOSSIER #${activeCaseObj.number} · ${diffValue}</div>
                        <h2 class="dossier-card-title">${activeCaseObj.title}</h2>
                    </div>
                </div>
                <p class="dossier-card-preview">${activeCaseObj.brief.substring(0, 100)}...</p>
                <div class="dossier-card-cta">
                    <span>Ouvrir l'enquête</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
            </div>
        `;

        // Render Locked / Other Cases List
        lockedContainer.innerHTML = CASES.map((c, i) => {
            if (i === activeIdx) return '';
            const localized = getLocalizedCase(c);
            const isCompleted = Progress.isCaseCompleted(localized.id);
            const isUnlocked = Progress.isCaseUnlocked(i);
            const diffTag = lang === 'en' ? (localized.difficulty === 1 ? 'BEGINNER' : 'INTERMEDIATE') : (localized.difficulty === 1 ? 'DÉBUTANT' : 'INTERMÉDIAIRE');

            if (isUnlocked && isCompleted) {
                return `
                    <div class="locked-dossier-card" style="opacity:0.9; filter:none; cursor:pointer;" onclick="App.openBrief(${i})">
                        <div class="locked-dossier-info">
                            <span class="locked-number">DOSSIER #${localized.number} · ${diffTag}</span>
                            <h3 class="locked-title">${localized.title}</h3>
                        </div>
                        <div class="locked-badge-chip completed-chip">
                            <span>✓ Complété ${Progress.getScore(localized.id)}%</span>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="locked-dossier-card">
                    <div class="locked-dossier-info">
                        <span class="locked-number">DOSSIER #${localized.number} · ${diffTag}</span>
                        <h3 class="locked-title">${localized.title}</h3>
                    </div>
                    <div class="locked-badge-chip">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        <span>VERROUILLÉ</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const activeScreen = document.getElementById(screenId);
        if (activeScreen) activeScreen.classList.add('active');

        // Hide main header & bottom navigation bar on full screen gameplay views (chat, brief, evidence)
        const mainHeader = document.getElementById('main-header');
        const bottomNav = document.getElementById('bottom-nav');
        const chatInputBar = document.querySelector('.chat-input-bar');

        if (screenId === 'screen-chat') {
            if (chatInputBar) chatInputBar.style.display = 'flex';
        } else {
            if (chatInputBar) chatInputBar.style.display = 'none';
        }

        if (screenId === 'screen-chat' || screenId === 'screen-brief' || screenId === 'screen-evidence') {
            if (mainHeader) mainHeader.style.display = 'none';
            if (bottomNav) bottomNav.style.display = 'none';
        } else {
            if (mainHeader) mainHeader.style.display = '';
            if (bottomNav) bottomNav.style.display = 'flex';
        }
    }

    function openBrief(index) {
        const c = CASES[index];
        if (!c || !Progress.isCaseUnlocked(index)) return;

        currentCase = getLocalizedCase(c);
        currentCaseIndex = index;

        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const diffTag = lang === 'en' ? (currentCase.difficulty === 1 ? 'BEGINNER' : 'INTERMEDIATE') : (currentCase.difficulty === 1 ? 'DÉBUTANT' : 'INTERMÉDIAIRE');
        document.getElementById('brief-category-badge').textContent = `DOSSIER #${currentCase.number} · ${diffTag}`;
        document.getElementById('brief-title').textContent = currentCase.title;
        document.getElementById('brief-narrative').textContent = currentCase.brief;

        const avatarImg = document.getElementById('brief-witness-avatar-img');
        if (avatarImg) avatarImg.src = currentCase.witness.avatar || '';

        document.getElementById('brief-witness-name').textContent = currentCase.witness.name;
        const yearsLabel = lang === 'en' ? 'years old' : 'ans';
        document.getElementById('brief-witness-role').textContent = `${currentCase.witness.age} ${yearsLabel} · ${currentCase.witness.role}`;

        updatePageLanguage();
        showScreen('screen-brief');
    }

    function startInvestigation() {
        if (!currentCase) return;

        const chatAvatar = document.getElementById('chat-witness-avatar');
        if (chatAvatar && currentCase.witness.avatar) {
            chatAvatar.innerHTML = `<img src="${currentCase.witness.avatar}" alt="${currentCase.witness.name}">`;
        }

        document.getElementById('chat-witness-name').textContent = currentCase.witness.name;

        Evidence.init(currentCase);
        Chat.init(currentCase);

        showScreen('screen-chat');
    }

    function showEvidence() {
        Evidence.renderGrid();
        showScreen('screen-evidence');
    }

    function showVerdict() {
        if (!currentCase) return;
        Verdict.init(currentCase);
        showScreen('screen-verdict');
    }

    async function submitVerdict() {
        const btn = document.getElementById('btn-submit-verdict');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Évaluation en cours...';
        }

        const result = await Verdict.submitVerdictAsync(currentCase);
        
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Valider';
        }

        const isPassed = result.score >= 70;
        const badgeName = (isPassed && currentCase.badge) ? currentCase.badge.name : null;
        Progress.completeCase(currentCase.id, result.score, badgeName);

        Verdict.renderResult(result);

        const nextBtn = document.getElementById('btn-next-case');
        const retryBtn = document.getElementById('btn-retry-case');
        const nextIndex = currentCaseIndex + 1;
        const lang = localStorage.getItem('info_detective_lang') || 'fr';

        if (isPassed) {
            if (retryBtn) retryBtn.style.display = 'none';
            if (nextBtn) {
                if (nextIndex < CASES.length) {
                    nextBtn.style.display = '';
                    const btnLabel = lang === 'en' ? 'Next Case' : 'Dossier suivant';
                    nextBtn.textContent = `${btnLabel} #${CASES[nextIndex].number} →`;
                } else {
                    nextBtn.style.display = 'none';
                }
            }
        } else {
            // Score < 70% : niveau bloqué, afficher réessayer
            if (nextBtn) nextBtn.style.display = 'none';
            if (retryBtn) {
                retryBtn.style.display = '';
                retryBtn.textContent = lang === 'en' ? '🔄 Retry Investigation' : '🔄 Réessayer l\'enquête';
            }
        }

        showScreen('screen-result');
    }

    function retryInvestigation() {
        if (currentCaseIndex >= 0) {
            openBrief(currentCaseIndex);
        } else {
            switchTab('home');
        }
    }

    function goHome() {
        currentCase = null;
        currentCaseIndex = -1;
        renderCaseGrid();
        updateStats();
        showScreen('screen-home');
    }

    function nextCase() {
        const nextIndex = currentCaseIndex + 1;
        if (nextIndex < CASES.length) {
            openBrief(nextIndex);
        } else {
            goHome();
        }
    }

    function toggleLanguage() {
        const current = localStorage.getItem('info_detective_lang') || 'fr';
        const next = current === 'fr' ? 'en' : 'fr';
        localStorage.setItem('info_detective_lang', next);
        
        updatePageLanguage();
        renderCaseGrid();
        updateStats();
        
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen) {
            const id = activeScreen.id;
            if (id === 'screen-brief' && currentCaseIndex >= 0) {
                openBrief(currentCaseIndex);
            } else if (id === 'screen-chat' && currentCaseIndex >= 0) {
                currentCase = getLocalizedCase(CASES[currentCaseIndex]);
                if (typeof Chat !== 'undefined') Chat.init(currentCase);
            } else if (id === 'screen-evidence' && currentCaseIndex >= 0) {
                currentCase = getLocalizedCase(CASES[currentCaseIndex]);
                if (typeof Evidence !== 'undefined') Evidence.init(currentCase);
            } else if (id === 'screen-verdict' && currentCaseIndex >= 0) {
                currentCase = getLocalizedCase(CASES[currentCaseIndex]);
                if (typeof Verdict !== 'undefined') Verdict.init(currentCase);
            } else if (id === 'screen-trophies') {
                updateTrophiesAndStats();
            } else if (id === 'screen-profile') {
                loadProfileScreenData();
            }
        }
    }

    function switchTab(tabName) {
        document.querySelectorAll('.bottom-nav-bar .nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        document.querySelectorAll('.desktop-header-nav .desktop-nav-link').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        if (tabName === 'home') {
            showScreen('screen-home');
            updatePageLanguage();
            renderCaseGrid();
        } else if (tabName === 'trophies') {
            showScreen('screen-trophies');
            updatePageLanguage();
            try { updateTrophiesAndStats(); } catch(e) { console.error(e); }
        } else if (tabName === 'profile') {
            showScreen('screen-profile');
            updatePageLanguage();
            try { loadProfileScreenData(); } catch(e) { console.error(e); }
        }
    }

    function initSplashScreen() {
        const splash = document.getElementById('splash-screen');
        if (!splash) return;

        const dismiss = () => {
            splash.classList.add('fade-out');
            splash.style.pointerEvents = 'none';
            splash.style.display = 'none';
        };

        const btn = document.getElementById('btn-skip-splash');
        if (btn) btn.addEventListener('click', dismiss);

        // Auto dismiss after 1.8s
        setTimeout(dismiss, 1800);
    }

    function updateTrophiesAndStats() {
        const stats = Progress.getStats();
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const isEn = lang === 'en';

        // Solved count
        const solvedCountEl = document.getElementById('stat-solved-count');
        if (solvedCountEl) solvedCountEl.textContent = `${stats.completedCount}/10`;
        
        // Precision score
        const precisionEl = document.getElementById('stat-precision-score');
        if (precisionEl) precisionEl.textContent = `${stats.avgScore}%`;

        // Badges Catalog (10 Case Badges + 4 Challenge Badges = 14 Badges)
        const allBadges = [
            { 
                id: 'case_1', 
                icon: '📜', 
                name: isEn ? 'Decree Verifier' : 'Vérificateur d\'Arrêtés', 
                desc: isEn ? 'Solve Case #1 (Ouagadougou Curfew)' : 'Résolvez le Dossier #1 (Couvre-feu Ouaga)', 
                caseNum: 1,
                check: () => stats.completedCount >= 1
            },
            { 
                id: 'case_2', 
                icon: '❤️', 
                name: isEn ? 'Fake SOS Detector' : 'Détecteur de Faux SOS', 
                desc: isEn ? 'Solve Case #2 (Laquintinie Hospital)' : 'Résolvez le Dossier #2 (Hôpital Laquintinie)', 
                caseNum: 2,
                check: () => stats.completedCount >= 2
            },
            { 
                id: 'case_3', 
                icon: '⚡', 
                name: isEn ? 'Buzz Hunter' : 'Chasseur de Buzz', 
                desc: isEn ? 'Solve Case #3 (Earthquake Video)' : 'Résolvez le Dossier #3 (Séisme TikTok)', 
                caseNum: 3,
                check: () => stats.completedCount >= 3
            },
            { 
                id: 'case_4', 
                icon: '🛡️', 
                name: isEn ? 'Anti-Phishing Shield' : 'Bouclier Anti-Phishing', 
                desc: isEn ? 'Solve Case #4 (Samsung 1€ Promo)' : 'Résolvez le Dossier #4 (Promo Samsung 1€)', 
                caseNum: 4,
                check: () => stats.completedCount >= 4
            },
            { 
                id: 'case_5', 
                icon: '🎙️', 
                name: isEn ? 'Deepfake Expert' : 'Expert Anti-Deepfake', 
                desc: isEn ? 'Solve Case #5 (Minister Audio)' : 'Résolvez le Dossier #5 (Audio du Ministre)', 
                caseNum: 5,
                check: () => stats.completedCount >= 5
            },
            { 
                id: 'case_6', 
                icon: '🧪', 
                name: isEn ? 'Pseudo-Science Tracker' : 'Traqueur de Pseudo-Science', 
                desc: isEn ? 'Solve Case #6 (BioVital Miracle)' : 'Résolvez le Dossier #6 (BioVital Miracle)', 
                caseNum: 6,
                check: () => stats.completedCount >= 6
            },
            { 
                id: 'case_7', 
                icon: '🏛️', 
                name: isEn ? 'Heritage Protector' : 'Protecteur du Patrimoine', 
                desc: isEn ? 'Solve Case #7 (Foumban Excavations)' : 'Résolvez le Dossier #7 (Fouilles Foumban)', 
                caseNum: 7,
                check: () => stats.completedCount >= 7
            },
            { 
                id: 'case_8', 
                icon: '💉', 
                name: isEn ? 'Health Guard' : 'Gardien de la Santé', 
                desc: isEn ? 'Solve Case #8 (WHO Vaccination)' : 'Résolvez le Dossier #8 (Vaccination OMS)', 
                caseNum: 8,
                check: () => stats.completedCount >= 8
            },
            { 
                id: 'case_9', 
                icon: '🗺️', 
                name: isEn ? 'Fact Inspector' : 'Contrôleur de Faits', 
                desc: isEn ? 'Solve Case #9 (Matadi Bridge Alert)' : 'Résolvez le Dossier #9 (Pont de Matadi)', 
                caseNum: 9,
                check: () => stats.completedCount >= 9
            },
            { 
                id: 'case_10', 
                icon: '📊', 
                name: isEn ? 'Data Debunker' : 'Démystificateur de Données', 
                desc: isEn ? 'Solve Case #10 (Goma Eruption Stats)' : 'Résolvez le Dossier #10 (Stats Éruption Goma)', 
                caseNum: 10,
                check: () => stats.completedCount >= 10
            },
            { 
                id: 'eagle_eye', 
                icon: '🎯', 
                name: isEn ? 'Eagle Eye' : 'Œil de Lynx', 
                desc: isEn ? 'Solve any case without using hints' : 'Résolvez une enquête sans indice Piste', 
                check: () => stats.completedCount >= 1 
            },
            { 
                id: 'perfect_detective', 
                icon: '💯', 
                name: isEn ? 'Flawless Detective' : 'Sans-Faute Absolu', 
                desc: isEn ? 'Achieve 100% score on any dossier' : 'Obtenez 100% de score sur un dossier', 
                check: () => Object.values(stats.scores || {}).some(s => s >= 100) 
            },
            { 
                id: 'veteran_investigator', 
                icon: '🚀', 
                name: isEn ? 'Seasoned Investigator' : 'Enquêteur Chevronné', 
                desc: isEn ? 'Solve at least 5 investigation cases' : 'Résolvez au moins 5 dossiers d\'enquête', 
                check: () => stats.completedCount >= 5 
            },
            { 
                id: 'master_detective', 
                icon: '🎓', 
                name: isEn ? 'Master Detective (UNESCO MIL)' : 'Maître Détective (UNESCO MIL)', 
                desc: isEn ? 'Complete all 10 investigation cases' : 'Terminez l\'intégralité des 10 dossiers', 
                check: () => stats.completedCount >= 10 
            }
        ];

        let unlockedCount = 0;
        allBadges.forEach(b => {
            const isUnlocked = (b.check && b.check()) || stats.badges.includes(b.name) || (b.caseNum && stats.completedCount >= b.caseNum);
            if (isUnlocked) unlockedCount++;
        });

        // Badges count in overview card
        const badgesUnlockedEl = document.getElementById('stat-badges-unlocked');
        if (badgesUnlockedEl) badgesUnlockedEl.textContent = `${unlockedCount}/${allBadges.length}`;

        // Render Badges Gallery
        const container = document.getElementById('badges-gallery-container');
        if (!container) return;

        const unlockedStatus = isEn ? '✓ Badge Unlocked' : '✓ Badge Obtenu';

        container.innerHTML = allBadges.map(b => {
            const isUnlocked = (b.check && b.check()) || stats.badges.includes(b.name) || (b.caseNum && stats.completedCount >= b.caseNum);
            return `
                <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="badge-card-icon">${b.icon}</div>
                    <div class="badge-card-name">${b.name}</div>
                    <div class="badge-card-desc">${isUnlocked ? unlockedStatus : b.desc}</div>
                </div>`;
        }).join('');
    }

    function loadProfileScreenData() {
        const name = localStorage.getItem('info_detective_player_name') || '';
        const nameInput = document.getElementById('profile-name-input');
        if (nameInput) nameInput.value = name;

        const langBtn = document.getElementById('btn-lang-toggle-profile');
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        if (langBtn) langBtn.textContent = lang === 'en' ? 'English (EN)' : 'Français (FR)';

        updatePageLanguage();
    }

    function saveProfileName() {
        const inputEl = document.getElementById('profile-name-input');
        if (!inputEl) return;
        const name = inputEl.value.trim();
        if (name) {
            localStorage.setItem('info_detective_player_name', name);
            if (typeof API !== 'undefined' && API.updateUsername) {
                API.updateUsername(name).catch(() => {});
            }
            const msg = document.getElementById('profile-name-msg');
            if (msg) {
                msg.hidden = false;
                setTimeout(() => { msg.hidden = true; }, 2500);
            }
        } else {
            localStorage.removeItem('info_detective_player_name');
        }
    }

    function saveGeminiKey() {
        const inputEl = document.getElementById('gemini-key-input');
        if (!inputEl) return;
        const key = inputEl.value.trim();
        if (key) {
            localStorage.setItem('info_detective_gemini_key', key);
        } else {
            localStorage.removeItem('info_detective_gemini_key');
        }
        const msg = document.getElementById('gemini-key-msg');
        if (msg) {
            msg.textContent = key ? '✓ Clé API Gemini sauvegardée' : 'Clé effacée (Mode Standard active)';
            msg.style.color = key ? 'var(--success-green)' : 'var(--accent-amber)';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        }
        loadProfileScreenData();
    }

    function on(id, event, handler) {
        const el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
    }

    function bindNavigation() {
        on('brand-home-link', 'click', () => switchTab('home'));

        // Header Language Button
        on('btn-lang-toggle-header', 'click', toggleLanguage);
        on('btn-lang-toggle', 'click', toggleLanguage);

        // Bottom Nav Bar Tabs
        document.querySelectorAll('.bottom-nav-bar .nav-tab').forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        // Desktop Top Nav Tabs
        document.querySelectorAll('.desktop-header-nav .desktop-nav-link').forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        // Brief
        on('brief-back', 'click', () => switchTab('home'));
        on('btn-start-investigation', 'click', startInvestigation);

        // Chat
        on('chat-back', 'click', () => openBrief(currentCaseIndex));
        on('btn-open-evidence-top', 'click', showEvidence);
        on('btn-show-evidence', 'click', showEvidence);
        on('btn-go-evidence-from-chat', 'click', showEvidence);

        // Evidence
        on('evidence-back', 'click', () => showScreen('screen-chat'));
        on('btn-back-to-chat', 'click', () => showScreen('screen-chat'));
        on('btn-go-verdict', 'click', showVerdict);

        // Verdict
        on('verdict-back', 'click', showEvidence);
        on('btn-back-to-evidence-from-verdict', 'click', showEvidence);
        on('btn-submit-verdict', 'click', submitVerdict);

        // Result
        on('btn-next-case', 'click', nextCase);
        on('btn-retry-case', 'click', retryInvestigation);
        on('btn-result-home', 'click', () => switchTab('home'));

        // Profile & Settings
        on('btn-save-profile-name', 'click', saveProfileName);
        on('btn-save-gemini-key', 'click', saveGeminiKey);
        on('btn-lang-toggle-profile', 'click', () => {
            toggleLanguage();
            loadProfileScreenData();
        });
    }

    function enhancedInit() {
        try { initSplashScreen(); } catch(e) { console.error("Splash init error:", e); }
        try { init(); } catch(e) { console.error("Main init error:", e); }
        try { loadProfileScreenData(); } catch(e) { console.error("Profile init error:", e); }
    }

    return { init: enhancedInit, openBrief, showScreen, goHome: () => switchTab('home'), switchTab };
})();

document.addEventListener('DOMContentLoaded', App.init);
