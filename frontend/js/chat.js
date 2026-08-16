/* InfoDetective — Chat Module (Lovable Server-Style Architecture + Gemini 1.5 Flash + Conversational Context & Typewriter) */

const Chat = (() => {
    let currentCase = null;
    let askedCategories = [];
    let typewriterInterval = null;
    let messagesHistory = []; // Stores { role: 'user'|'assistant', content: string }

    function init(caseData) {
        currentCase = caseData;
        askedCategories = [];
        messagesHistory = [];

        // Set witness portrait (default variation 1)
        setWitnessExpression(1);

        // Set witness header info
        const witnessNameEl = document.getElementById('chat-witness-name');
        if (witnessNameEl) witnessNameEl.textContent = caseData.witness.name;

        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const isEn = lang === 'en';
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.placeholder = isEn ? `Ask ${caseData.witness.name} a question...` : `Posez votre question à ${caseData.witness.name}...`;
        }

        // Add opening assistant message to conversation history
        const openingMessage = caseData.witness.intro || caseData.witness.opening || (isEn ? "Hello Detective." : "Bonjour Détective.");
        messagesHistory.push({ role: 'assistant', content: openingMessage });

        // Initial intro text animation
        setBubbleText(openingMessage, true);
        updateClueTracker();

        // Wire hint button
        const hintBtn = document.getElementById('btn-request-hint');
        if (hintBtn) {
            hintBtn.onclick = () => requestWitnessHint();
        }
    }

    function setWitnessExpression(variation = 1) {
        const witnessImg = document.getElementById('comic-witness-img');
        if (!witnessImg || !currentCase || !currentCase.witness) return;

        const witness = currentCase.witness;
        const defaultAvatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%231E293B"/><circle cx="50" cy="38" r="18" fill="%23F59E0B"/><path d="M20,88 C20,64 34,54 50,54 C66,54 80,64 80,88 Z" fill="%23F59E0B"/></svg>';

        let targetSrc = witness.avatar || defaultAvatar;

        if (witness.avatar && witness.avatar.endsWith('.webp')) {
            const basePath = witness.avatar.replace('.webp', '');
            targetSrc = `${basePath}_${variation}.webp`;
        }

        witnessImg.src = targetSrc;
        witnessImg.onerror = () => {
            witnessImg.src = witness.avatar || defaultAvatar;
            witnessImg.onerror = () => { witnessImg.src = defaultAvatar; };
        };
    }

    function setBubbleText(text, animate = true) {
        const bubbleTextEl = document.getElementById('comic-bubble-text');
        if (!bubbleTextEl) return;

        if (typewriterInterval) {
            clearInterval(typewriterInterval);
            typewriterInterval = null;
        }

        if (!animate || text === "..." || text.length < 5) {
            bubbleTextEl.textContent = text;
            return;
        }

        const words = text.split(" ");
        bubbleTextEl.textContent = "";
        let index = 0;

        typewriterInterval = setInterval(() => {
            if (index < words.length) {
                bubbleTextEl.textContent += (index === 0 ? "" : " ") + words[index];
                index++;
            } else {
                clearInterval(typewriterInterval);
                typewriterInterval = null;
            }
        }, 40);
    }

    function showTyping() {
        setBubbleText("...", false);
        const status = document.querySelector('.chat-header-status');
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        if (status) status.textContent = lang === 'en' ? 'typing...' : 'écrit...';
    }

    function removeTyping() {
        const status = document.querySelector('.chat-header-status');
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        if (status) status.textContent = lang === 'en' ? 'Online' : 'En ligne';
    }

    function updateClueTracker() {
        const textEl = document.getElementById('chat-clue-text');
        const badgeChip = document.getElementById('chat-evidence-count');
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const isEn = lang === 'en';

        const revealedCount = typeof Evidence !== 'undefined' ? Evidence.getRevealedCount() : 1;
        const totalCount = currentCase && currentCase.evidence ? currentCase.evidence.length : 3;

        if (badgeChip) badgeChip.textContent = revealedCount;

        if (textEl) {
            if (revealedCount >= totalCount) {
                textEl.textContent = isEn ? `All clues discovered (${revealedCount}/${totalCount})` : `Tous les indices découverts (${revealedCount}/${totalCount})`;
            } else {
                textEl.textContent = isEn ? `Clues discovered: ${revealedCount}/${totalCount}` : `Indices découverts : ${revealedCount}/${totalCount}`;
            }
        }
    }

    function showEvidenceToast(evidenceTitle) {
        const toast = document.getElementById('evidence-toast');
        const textEl = document.getElementById('evidence-toast-text');
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const isEn = lang === 'en';

        if (!toast) return;

        const prefix = isEn ? '+1 Evidence unlocked: ' : '+1 Preuve découverte : ';
        if (textEl) {
            textEl.textContent = `${prefix}${evidenceTitle || ''}`;
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    function requestWitnessHint() {
        if (!currentCase) return;
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const isEn = lang === 'en';

        // Find unasked question categories
        const unasked = currentCase.questions.filter(q => !askedCategories.includes(q.id));
        let hintText = "";

        if (unasked.length === 0) {
            hintText = isEn 
                ? "You have already asked about all the main points! Review your evidence notebook and render your verdict when you're ready."
                : "Vous avez déjà creusé tous les points essentiels ! Consultez votre carnet de preuves et rendez votre verdict quand vous êtes prêt.";
        } else {
            const targetQ = unasked[0];
            if (isEn) {
                const enHints = {
                    'source': `You haven't asked me where I saw this post originally... maybe that's a good place to start?`,
                    'faute': `Have you looked very carefully at the exact name and spelling of the page that published this?`,
                    'dementi': `You could check if the official authorities or Government Information Service have responded to this.`,
                    'message': `Look at the screenshot formatting... did I receive it directly, or was it forwarded from a group?`,
                    'hopital': `Have you asked whether anyone called the hospital or blood transfusion service to verify?`,
                    'numero': `There is a phone number listed at the bottom of the screen... what do we really know about it?`,
                    'chercheur': `You haven't asked about the professor's actual academic field of research yet.`,
                    'photo': `Look closely at the background of that picture... does it look like a real lab?`,
                    'stats': `Where do those huge percentage numbers come from? Is there any published study?`,
                    'audio': `Listen closely: does the speaker in the audio state their identity or position?`
                };
                hintText = enHints[targetQ.id] || `Think about the source, the authenticity of the documents, and whether official channels confirmed this.`;
            } else {
                const frHints = {
                    'source': `Vous ne m'avez pas encore demandé d'où vient cette publication exactement... vous devriez commencer par là !`,
                    'faute': `Avez-vous bien regardé le nom exact et l'orthographe de la page qui a partagé cette alerte ?`,
                    'dementi': `Vous devriez vous demander si le gouvernement ou les canaux officiels ont confirmé ou démenti cette histoire.`,
                    'message': `Regardez la capture WhatsApp... vous êtes sûr que c'est un message direct et pas un transfert anonyme ?`,
                    'hopital': `Avez-vous pensé à vérifier si l'hôpital ou le centre de transfusion sanguine a réellement lancé cet appel ?`,
                    'numero': `Il y a un numéro de téléphone affiché en bas de la capture... avez-vous cherché qui se cache derrière ?`,
                    'chercheur': `Vous ne m'avez pas demandé quelle est la vraie spécialité du professeur à l'université.`,
                    'photo': `Observez bien le décor de la photo... est-ce que ça ressemble vraiment à un laboratoire ?`,
                    'stats': `Ces chiffres spectaculaires, d'où sortent-ils au juste ? Y a-t-il une vraie étude ?`,
                    'audio': `Dans cet enregistrement, la personne donne-t-elle son vrai nom et sa fonction ?`
                };
                hintText = frHints[targetQ.id] || `Posez-moi des questions sur la source, la véracité des documents ou les réactions officielles.`;
            }
        }

        setWitnessExpression(2);
        setBubbleText(hintText, true);
    }

    async function handlePlayerQuestion(text, categoryId) {
        let category = null;
        if (categoryId) {
            category = currentCase.questions.find(q => q.id === categoryId);
        } else {
            category = matchByKeywords(text);
        }

        if (category && !askedCategories.includes(category.id)) {
            askedCategories.push(category.id);
        }

        // Add user question to conversation history
        messagesHistory.push({ role: 'user', content: text });

        // Cycle character expression variation (1, 2, 3)
        const nextExpr = Math.floor(Math.random() * 3) + 1;
        setWitnessExpression(nextExpr);

        showTyping();

        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const caseNum = currentCase.number || (typeof currentCase.id === 'string' ? parseInt(currentCase.id.replace(/\D/g, ''), 10) : currentCase.id) || 1;

        // 1. Tenter l'appel au Backend FastAPI sécurisé
        let serverReply = null;
        if (typeof API !== 'undefined' && API.sendChatMessage) {
            try {
                const apiRes = await API.sendChatMessage(caseNum, text, messagesHistory.slice(0, -1), lang);
                if (apiRes && (apiRes.reply || apiRes.message)) {
                    serverReply = apiRes.reply || apiRes.message;

                    // Débloquer dynamiquement les preuves notifiées par le backend
                    if (apiRes.unlocked_evidences && apiRes.unlocked_evidences.length > 0) {
                        apiRes.unlocked_evidences.forEach(ev => {
                            const newlyUnlocked = Evidence.revealEvidence(ev.order_index || 0);
                            if (newlyUnlocked) {
                                showEvidenceToast(ev.title);
                            }
                        });
                    }
                }
            } catch (err) {
                console.log('[Chat] Backend non joignable, bascule sur le moteur client local...');
            }
        }

        // 2. Si le serveur a répondu, afficher la réponse
        if (serverReply) {
            removeTyping();
            messagesHistory.push({ role: 'assistant', content: serverReply });
            setBubbleText(serverReply, true);
            updateClueTracker();
            return;
        }

        // 3. Mode de secours local (fallback intelligent)
        if (category) {
            const delay = 350 + Math.random() * 200;
            setTimeout(() => {
                removeTyping();
                const response = category.responses[Math.floor(Math.random() * category.responses.length)];
                messagesHistory.push({ role: 'assistant', content: response });
                setBubbleText(response, true);

                if (category.revealsEvidence !== null && category.revealsEvidence !== undefined) {
                    const newlyUnlocked = Evidence.revealEvidence(category.revealsEvidence);
                    if (newlyUnlocked) {
                        const evTitle = currentCase.evidence[category.revealsEvidence]?.title;
                        showEvidenceToast(evTitle);
                    }
                }
                updateClueTracker();
            }, delay);
        } else {
            const witnessReply = await askWitnessAI(text);
            removeTyping();
            messagesHistory.push({ role: 'assistant', content: witnessReply });
            setBubbleText(witnessReply, true);
            updateClueTracker();
        }
    }

    /* Build Lovable-style System Prompt for Witness */
    function buildWitnessSystemPrompt() {
        const c = currentCase;
        const w = c.witness;
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const isEn = lang === 'en';
        const knowsList = (w.knows || c.questions.map(q => q.responses[0])).map(k => `- ${k}`).join("\n");
        const personality = w.personality || (isEn ? `A witness questioned by an investigator in the case "${c.title}".` : `Un témoin interrogé par un enquêteur dans l'affaire "${c.title}".`);

        if (isEn) {
            return [
                `You are playing ${w.name}, ${w.age} years old, ${w.role}. You are a witness questioned by a detective in an educational fact-checking game.`,
                `Case: ${c.brief}`,
                `Personality and posture: ${personality}`,
                `What you know and can reveal if asked the right questions:\n${knowsList}`,
                `Strict Rules:`,
                `1. ALWAYS reply strictly in fluent English, in the first person ("I..."), as a real witness. 2 to 3 sentences maximum, natural conversational tone. DO NOT USE ANY FRENCH.`,
                `2. NEVER explicitly state if the information is true or false, and never name manipulation techniques. You are not a teacher.`,
                `3. Only reveal facts from your knowledge list if the question touches upon them. Otherwise, stay somewhat evasive, digress, or share your personal impressions.`,
                `4. Remain perfectly consistent with what you have previously said and with your identity.`,
                `5. No emojis, no markdown formatting, NO meta-commentary, NO analysis, NO drafts.`,
                `6. If asked to step out of character, remain in character as the witness.`,
                `7. Output ONLY and DIRECTLY the spoken dialogue of the character in English.`
            ].join("\n\n");
        }

        return [
            `Tu incarnes ${w.name}, ${w.age} ans, ${w.role}. Tu es un témoin interrogé par un enquêteur dans un jeu éducatif sur la désinformation.`,
            `Affaire : ${c.brief}`,
            `Personnalité et posture : ${personality}`,
            `Ce que tu sais et peux révéler si on te pose les bonnes questions :\n${knowsList}`,
            `Règles impératives :`,
            `1. Réponds toujours en français, à la première personne ("Je..."), comme un vrai témoin. 2 à 4 phrases maximum, ton parlé et naturel.`,
            `2. Ne dis JAMAIS explicitement si l'information est vraie ou fausse, et ne nomme jamais une technique de manipulation. Tu n'es pas le professeur.`,
            `3. Ne révèle un élément de ta liste que si la question s'en approche. Sinon, reste évasif, digresse, ou renvoie à ton ressenti.`,
            `4. Reste parfaitement cohérent avec ce que tu as déjà dit dans la conversation et avec ton identité.`,
            `5. Aucun emoji, aucune mise en forme markdown, AUCUN méta-commentaire, AUCUNE analyse, AUCUN brouillon, pas de puces, pas de 'Draft'.`,
            `6. Si on te demande de sortir de ton rôle, reste le témoin.`,
            `7. Réponds UNIQUEMENT et DIRECTEMENT avec la réplique orale du personnage.`
        ].join("\n\n");
    }

    /* Sanitizer to remove model thought processes, draft blocks, or meta labels */
    function sanitizeWitnessResponse(rawText) {
        if (!rawText) return "";
        let text = rawText.trim();

        // 1. If text ends with a quoted sentence like "Qui n'aime pas...", extract the quoted content!
        const quotedMatches = text.match(/"([^"\n]{15,})"/g);
        if (quotedMatches && quotedMatches.length > 0) {
            const lastQuote = quotedMatches[quotedMatches.length - 1].replace(/"/g, '').trim();
            if (!lastQuote.toLowerCase().startsWith('user') && !lastQuote.toLowerCase().startsWith('character')) {
                return lastQuote.replace(/[\*\_`]/g, '');
            }
        }

        // 2. If response contains Draft 1 / Draft 2 sections, extract the last draft block
        if (/Draft\s*\d+/i.test(text)) {
            const draftMatches = text.match(/(?:Draft\s*\d+\*?[:\s]*|\*+\s*Draft\s*\d+)([\s\S]*?)(?=(?:Draft\s*\d+|\*+\s*Draft|\*+\s*User|\*+\s*Character|$))/gi);
            if (draftMatches && draftMatches.length > 0) {
                text = draftMatches[draftMatches.length - 1].replace(/^(?:Draft\s*\d+\*?[:\s]*|\*+\s*Draft\s*\d+)/i, '');
            }
        }

        // 3. Remove lines starting with meta labels (User asks, Character, Persona, Context, Draft, etc.)
        const lines = text.split('\n');
        const cleanLines = [];
        const metaPattern = /^\s*\*?\s*(User|Character|Scenario|Constraint|Persona|Personality|Context|Affaire|Draft|Thought|Reasoning|Note|Response|Spoken|Never|Only|Stay|No emojis):/i;

        for (const line of lines) {
            const stripped = line.trim();
            if (!stripped) continue;
            if (metaPattern.test(stripped)) continue;
            if (/^(Yes|No)\.?$/i.test(stripped) || stripped.endsWith(': Yes.') || stripped.endsWith('? Yes.')) continue;
            
            const cleaned = stripped.replace(/^[\*\-\•]\s*/, '').replace(/[\*\_`"]/g, '').trim();
            if (cleaned) cleanLines.push(cleaned);
        }

        const result = cleanLines.join(' ').trim();
        return result || rawText.replace(/[\*\_`"]/g, '').trim();
    }

    const DEFAULT_GEMINI_KEY = '';

    async function askWitnessAI(userQuestion) {
        const apiKey = localStorage.getItem('info_detective_gemini_key') || window.GEMINI_API_KEY || '';

        if (apiKey) {
            try {
                const systemPrompt = buildWitnessSystemPrompt();
                const lang = localStorage.getItem('info_detective_lang') || 'fr';
                const isEn = lang === 'en';
                const w = currentCase ? currentCase.witness : { opening: isEn ? "Hello Detective." : "Bonjour détective." };
                
                // Format multi-turn conversation history with systemInstruction and witness opening
                const contents = [
                    { role: 'model', parts: [{ text: w.intro || w.opening || (isEn ? "Hello Detective, what do you want to ask?" : "Bonjour détective, que voulez-vous savoir ?") }] }
                ];

                messagesHistory.forEach(msg => {
                    contents.push({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }]
                    });
                });

                const requestBody = {
                    systemInstruction: {
                        parts: [{ text: systemPrompt }]
                    },
                    contents: contents
                };

                const modelsToTry = [
                    'gemini-2.5-flash-native',
                    'gemini-2.5-flash',
                    'gemma-4-26b-a4b-it',
                    'gemma-2-9b-it',
                    'gemini-2.0-flash',
                    'gemini-1.5-flash'
                ];
                for (const modelName of modelsToTry) {
                    try {
                        const cleanModel = modelName.startsWith('models/') ? modelName : `models/${modelName}`;
                        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/${cleanModel}:generateContent?key=${apiKey}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(requestBody)
                        });

                        if (res.ok) {
                            const json = await res.json();
                            const replyText = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
                            if (replyText) {
                                return sanitizeWitnessResponse(replyText);
                            }
                        }
                    } catch (e) {
                        console.warn(`Model ${modelName} fetch failed:`, e);
                    }
                }
            } catch (err) {
                console.warn('Gemini API call error, relying on persona fallback engine:', err);
            }
        }

        return generateCharacterPersonaFallback(userQuestion);
    }

    function generateCharacterPersonaFallback(questionText) {
        const norm = questionText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const w = currentCase ? currentCase.witness : { name: 'Witness', role: 'Unknown', age: 30 };
        const lang = localStorage.getItem('info_detective_lang') || 'fr';
        const isEn = lang === 'en';

        // Check identity direct questions
        if (norm.includes('nom') || norm.includes('appelles') || norm.includes('name') || norm.includes('who are you') || norm.includes('identite')) {
            return isEn ? `My name is ${w.name}. I work as a ${w.role.toLowerCase()}.` : `Je m'appelle ${w.name}. Je suis ${w.role.toLowerCase()}.`;
        }
        if (norm.includes('job') || norm.includes('travail') || norm.includes('work') || norm.includes('metier') || norm.includes('profession') || norm.includes('role')) {
            return isEn ? `I work as a ${w.role}. I am ${w.age} years old.` : `Je travaille comme ${w.role}. J'ai ${w.age} ans.`;
        }

        // Case-specific in-character dynamic responses
        if (currentCase && currentCase.number === 1) { // Case 1: Couvre-feu Ouagadougou
            if (isEn) {
                if (norm.includes('source') || norm.includes('facebook') || norm.includes('page') || norm.includes('where') || norm.includes('who')) {
                    return "I saw it on Facebook on the page 'Minestère de la sécurité'. It had the Prime Ministry seal on it, so everyone in Ouagadougou believed it immediately!";
                }
                if (norm.includes('spelling') || norm.includes('typo') || norm.includes('name') || norm.includes('error')) {
                    return "Wait... now that you point it out, 'Minestère' has an 'e' in it?! A real government ministry would never misspell its own name!";
                }
                if (norm.includes('sig') || norm.includes('government') || norm.includes('official') || norm.includes('true') || norm.includes('fake')) {
                    return "The SIG (Government Information Service) announced on national TV that no curfew was ever decreed! The document is a fake!";
                }
                return "We closed all market stalls in total panic when we saw the 5 PM curfew order. We just didn't want any trouble with the police!";
            } else {
                if (norm.includes('source') || norm.includes('facebook') || norm.includes('page') || norm.includes('ou') || norm.includes('qui')) {
                    return "J'ai vu ça sur Facebook sur la page 'Minestère de la sécurité'. Il y avait le logo de la Primature, alors tout le monde au grand marché l'a cru immédiatement !";
                }
                if (norm.includes('orthographe') || norm.includes('faute') || norm.includes('nom') || norm.includes('erreur') || norm.includes('e')) {
                    return "Attendez... maintenant que vous le montrez, 'Minestère' a un 'e' au lieu d'un 'i' ?! Un vrai ministère d'État ne ferait jamais une faute pareille !";
                }
                if (norm.includes('sig') || norm.includes('gouvernement') || norm.includes('officiel') || norm.includes('vrai') || norm.includes('faux') || norm.includes('dementi')) {
                    return "Le SIG vient d'annoncer à la télévision nationale qu'aucun couvre-feu n'existe ! Ce document est un faux fabriqué pour semer la terreur.";
                }
                return "On a couru pour fermer nos boutiques au marché dès qu'on a vu l'heure de 17h. On avait trop peur d'avoir des problèmes avec la police !";
            }
        }

        if (currentCase && currentCase.number === 2) { // Case 2: Don de sang Laquintinie
            if (isEn) {
                if (norm.includes('number') || norm.includes('69689898') || norm.includes('phone') || norm.includes('call') || norm.includes('credit')) {
                    return "Friends tried calling that 69689898 number: it's a premium-rate number that drains mobile credit the moment you dial! It's a scam.";
                }
                if (norm.includes('hospital') || norm.includes('laquintinie') || norm.includes('blood') || norm.includes('bank') || norm.includes('checked')) {
                    return "I called Laquintinie Hospital's blood bank: they confirmed they NEVER sent out this SOS and their blood reserves are normal!";
                }
                if (norm.includes('who') || norm.includes('dad') || norm.includes('father') || norm.includes('whatsapp') || norm.includes('sent') || norm.includes('received')) {
                    return "Actually, it was a screenshot forwarded into our promo WhatsApp group. It wasn't my real dad messaging me directly!";
                }
                return "When you read 'Don't let me die 🙏' with crying emojis, you just want to help right away without questioning the post!";
            } else {
                if (norm.includes('numero') || norm.includes('69689898') || norm.includes('telephone') || norm.includes('appeler') || norm.includes('surtaxe') || norm.includes('argent')) {
                    return "Des amis ont vérifié le numéro 69689898 : c'est un numéro surtaxé qui siphonne tout le crédit dès qu'on appelle ! C'est une arnaque virale.";
                }
                if (norm.includes('hopital') || norm.includes('laquintinie') || norm.includes('sang') || norm.includes('banque') || norm.includes('verifie') || norm.includes('appele')) {
                    return "J'ai appelé la banque de sang de l'hôpital Laquintinie : ils disent qu'ils n'ont JAMAIS émis cet appel et que leurs stocks sont stables !";
                }
                if (norm.includes('qui') || norm.includes('papa') || norm.includes('pere') || norm.includes('whatsapp') || norm.includes('recu') || norm.includes('envoye') || norm.includes('transfere')) {
                    return "En réalité c'est une capture d'écran transférée dans notre groupe de promo avec la mention 'Transféré'. Ce n'est pas mon vrai père qui m'a écrit directement !";
                }
                return "Quand on lit 'Ne me laisse pas mourir 🙏' avec les émojis en larmes, on veut sauver une vie immédiatement sans penser à vérifier !";
            }
        }

        // Generic character fallback for other cases
        if (isEn) {
            const genericEn = [
                `Regarding your question, I shared this because it looked extremely alarming. Look closely at the clues in the case file!`,
                `I am telling you honestly what happened. If you check the case documents, you'll see why everyone reacted so fast.`,
                `That's everything I experienced firsthand. Question the sources and examine the evidence notebook!`
            ];
            return genericEn[Math.floor(Math.random() * genericEn.length)];
        }

        const genericLines = [
            `Concernant votre question, j'ai relayé cette information parce qu'elle semblait urgente. Regardez bien les indices dans le dossier !`,
            "Je vous dis sincèrement ce que j'ai vécu. Examinez les pièces du dossier pour voir d'où vient le piège.",
            "C'est tout ce que j'ai vu passer. Interrogez les sources et vérifiez le carnet de preuves !"
        ];
        return genericLines[Math.floor(Math.random() * genericLines.length)];
    }

    function matchByKeywords(text) {
        if (!currentCase || !currentCase.questions) return null;

        const normalized = text.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, ' ');
        const words = normalized.split(/\s+/).filter(w => w.length >= 2);

        let bestMatch = null;
        let bestScore = 0;

        for (const q of currentCase.questions) {
            let score = 0;
            // 1. Check keyword overlap
            for (const word of words) {
                for (const kw of (q.keywords || [])) {
                    const kwNorm = kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    if (word === kwNorm) {
                        score += 3;
                    } else if (word.length >= 4 && (word.includes(kwNorm) || kwNorm.includes(word))) {
                        score += 2;
                    }
                }
            }

            // 2. Check overlap with suggested questions
            for (const sug of (q.suggested || [])) {
                const sugNorm = sug.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                for (const word of words) {
                    if (word.length >= 4 && sugNorm.includes(word)) {
                        score += 1;
                    }
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = q;
            }
        }

        return bestScore >= 2 ? bestMatch : null;
    }

    function handleFreeTextInput() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        handlePlayerQuestion(text, null);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const sendBtn = document.getElementById('btn-send');
        if (sendBtn) sendBtn.addEventListener('click', handleFreeTextInput);

        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleFreeTextInput();
            });
        }
    });

    return { init, handlePlayerQuestion, setWitnessExpression, getAskedCount: () => askedCategories.length };
})();
