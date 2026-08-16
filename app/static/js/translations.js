/* InfoDetective — Complete Multilingual Translation Dictionary (FR / EN) */

const UI_TRANSLATIONS = {
    'fr': {
        'brand-title': 'InfoDetective',
        'nav-investigations': 'Enquêtes',
        'nav-trophies': 'Trophées',
        'nav-profile': 'Profil',
        'header-dossiers-label': 'DOSSIERS',
        'hero-title': 'On ne vous dira pas si c\'est vrai.<br><span class="hero-title-muted">Vous allez le découvrir vous-même.</span>',
        'hero-subtitle': 'Dix affaires inspirées de mécanismes réels de désinformation. Interrogez le témoin, analysez les indices et démasquez les pièges.',
        'label-current-case': 'DOSSIER EN COURS',
        'label-next-cases': 'DOSSIERS SUIVANTS',
        'btn-open-investigation': 'Ouvrir l\'enquête',
        'status-locked': 'VERROUILLÉ',
        'status-completed': 'Complété',
        'btn-dossiers': 'Dossiers',
        'brief-situation-label': 'SITUATION',
        'brief-witness-label': 'TÉMOIN',
        'brief-warning-text': 'Le témoin s\'exprime selon ses propres convictions. Posez vos questions, examinez les indices et rendez votre verdict en identifiant la technique de manipulation présente.',
        'btn-start-investigation': 'Ouvrir l\'enquête',
        'chat-evidence-btn': 'Preuves',
        'chat-loading': 'Chargement de l\'interrogatoire...',
        'chat-all-asked': 'Vous avez posé toutes les questions principales ! Vous pouvez lui poser des questions libres.',
        'btn-go-evidence-chat': 'Voir les preuves et rendre le verdict',
        'btn-send': 'Envoyer',
        'placeholder-chat': 'Discuter avec le témoin...',
        'witness-status-online': 'En ligne',
        'witness-status-typing': 'écrit...',
        'evidence-title': 'CARNET DE PREUVES',
        'evidence-collected-suffix': 'preuve(s) collectée(s)',
        'evidence-new-badge': 'NOUVEAU',
        'evidence-undiscovered': 'Preuve non découverte',
        'btn-back-to-chat': '← Continuer l\'interrogatoire',
        'btn-go-verdict': 'Rendre mon verdict',
        'verdict-heading': 'Verdict',
        'verdict-subheading': 'Sélectionnez les techniques de manipulation réellement présentes dans ce dossier. Une accusation infondée coûte des points.',
        'btn-review-evidence': 'Revoir les preuves',
        'btn-submit-verdict': 'Valider',
        'verdict-evaluating': 'Évaluation en cours...',
        'lesson-header-title': 'Ce que cette enquête nous apprend',
        'btn-next-case': 'Dossier suivant →',
        'btn-result-home': 'Retour aux dossiers',
        'result-title-perfect': 'Enquête parfaite !',
        'result-title-good': 'Bon travail, détective !',
        'result-title-partial': 'Pas mal, mais il y a des oublis...',
        'result-title-poor': 'Vous êtes tombé dans le piège !',
        'result-good-title': 'Ce que vous avez bien fait',
        'result-improve-title': 'Ce qu\'il faut améliorer',
        'status-unlocked-success': '✓ Dossier validé ! (Palier 70% atteint — Niveau suivant débloqué)',
        'status-locked-fail': '🔒 Score insuffisant (< 70%). Recommencez pour débloquer la suite.',
        'btn-retry': '🔄 Réessayer l\'enquête',
        'analysis-good-empty': 'Aucune technique correcte repérée.',
        'analysis-improve-empty': 'Excellente analyse ! Aucun piège ni oubli commis.',
        'correct-technique-detected': 'Technique bien identifiée',
        'missed-technique-label': 'Technique manquée (présente dans le dossier)',
        'wrong-technique-label': 'Accusation infondée (non présente)',
        'trophies-title': 'Trophées & Distinctions',
        'trophies-subtitle': 'Collectionnez vos insignes de détective au fil des affaires résolues.',
        'stat-solved-label': 'Affaires Résolues',
        'stat-precision-label': 'Précision Moyenne',
        'stat-badges-label': 'Badges Débloqués',
        'section-badges-title': 'VOS BADGES DE DÉTECTIVE',
        'badge-unlocked-status': '✓ Badge Obtenu',
        'profile-title': 'Profil & Paramètres',
        'profile-subtitle': 'Gérez votre identité de détective et vos préférences.',
        'profile-card-title-id': 'Identité du Détective',
        'placeholder-profile-name': 'Votre nom de détective...',
        'btn-save-name': 'Enregistrer',
        'profile-name-saved': '✓ Pseudo enregistré',
        'profile-card-title-pref': 'Préférences de Jeu',
        'profile-lang-label': 'Langue de l\'interface'
    },
    'en': {
        'brand-title': 'InfoDetective',
        'nav-investigations': 'Cases',
        'nav-trophies': 'Trophies',
        'nav-profile': 'Profile',
        'header-dossiers-label': 'CASES',
        'hero-title': 'We won\'t tell you if it\'s true.<br><span class="hero-title-muted">You will find out for yourself.</span>',
        'hero-subtitle': 'Ten investigation cases inspired by real misinformation patterns. Question the witness, analyze clues, and unmask the traps.',
        'label-current-case': 'ACTIVE INVESTIGATION',
        'label-next-cases': 'NEXT CASES',
        'btn-open-investigation': 'Open Investigation',
        'status-locked': 'LOCKED',
        'status-completed': 'Completed',
        'btn-dossiers': 'Cases',
        'brief-situation-label': 'SITUATION',
        'brief-witness-label': 'WITNESS',
        'brief-warning-text': 'The witness speaks from their own convictions. Ask your questions, examine clues, and deliver your verdict by identifying the manipulation technique present.',
        'btn-start-investigation': 'Open Investigation',
        'chat-evidence-btn': 'Evidence',
        'chat-loading': 'Loading questioning...',
        'chat-all-asked': 'You have asked all the main questions! You can now ask open-ended questions.',
        'btn-go-evidence-chat': 'View evidence & render verdict',
        'btn-send': 'Send',
        'placeholder-chat': 'Talk to the witness...',
        'witness-status-online': 'Online',
        'witness-status-typing': 'typing...',
        'evidence-title': 'EVIDENCE NOTEBOOK',
        'evidence-collected-suffix': 'evidence collected',
        'evidence-new-badge': 'NEW',
        'evidence-undiscovered': 'Undiscovered evidence',
        'btn-back-to-chat': '← Continue questioning',
        'btn-go-verdict': 'Render my verdict',
        'verdict-heading': 'Verdict',
        'verdict-subheading': 'Select the manipulation techniques actually present in this file. An unfounded accusation costs points.',
        'btn-review-evidence': 'Review evidence',
        'btn-submit-verdict': 'Submit',
        'verdict-evaluating': 'Evaluating verdict...',
        'lesson-header-title': 'What this case teaches us',
        'btn-next-case': 'Next Case →',
        'btn-result-home': 'Back to cases',
        'result-title-perfect': 'Perfect investigation!',
        'result-title-good': 'Good job, detective!',
        'result-title-partial': 'Not bad, but some things were missed...',
        'result-title-poor': 'You fell into the trap!',
        'result-good-title': 'What you did well',
        'result-improve-title': 'What needs improvement',
        'status-unlocked-success': '✓ Investigation cleared! (70% threshold reached — Next level unlocked)',
        'status-locked-fail': '🔒 Insufficient score (< 70%). Retry to unlock next case.',
        'btn-retry': '🔄 Retry Investigation',
        'analysis-good-empty': 'No correct techniques identified.',
        'analysis-improve-empty': 'Outstanding analysis! Zero errors or missed techniques.',
        'correct-technique-detected': 'Correctly identified technique',
        'missed-technique-label': 'Missed technique (present in the case)',
        'wrong-technique-label': 'Unfounded accusation (not present)',
        'trophies-title': 'Trophies & Awards',
        'trophies-subtitle': 'Collect your detective badges as you solve cases.',
        'stat-solved-label': 'Cases Solved',
        'stat-precision-label': 'Average Accuracy',
        'stat-badges-label': 'Badges Unlocked',
        'section-badges-title': 'YOUR DETECTIVE BADGES',
        'badge-unlocked-status': '✓ Badge Unlocked',
        'profile-title': 'Profile & Settings',
        'profile-subtitle': 'Manage your detective identity and preferences.',
        'profile-card-title-id': 'Detective Identity',
        'placeholder-profile-name': 'Your detective name...',
        'btn-save-name': 'Save',
        'profile-name-saved': '✓ Handle saved',
        'profile-card-title-pref': 'Game Preferences',
        'profile-lang-label': 'Interface Language'
    }
};

const TECHNIQUE_TRANSLATIONS = {
    'en': {
        'source-anonyme': { name: 'Anonymous source', desc: 'The author or source of the information is not identifiable or verifiable.' },
        'stat-trompeuse': { name: 'Misleading statistic', desc: 'Numbers without source, taken out of context, or invented.' },
        'image-hors-contexte': { name: 'Image out of context', desc: 'Real photo or image used in a different context from the original.' },
        'appel-peur': { name: 'Appeal to fear', desc: 'Using fear to prevent critical thinking.' },
        'video-hors-contexte': { name: 'Video out of context', desc: 'Real video presented in a false context.' },
        'source-non-fiable': { name: 'Unreliable source', desc: 'Source lacking journalistic or scientific credibility.' },
        'appel-emotion': { name: 'Appeal to emotion', desc: 'Manipulating emotions to bypass critical analysis.' },
        'logo-falsifie': { name: 'Falsified logo/brand', desc: 'Fraudulent use of a well-known logo or brand.' },
        'urgence-fabriquee': { name: 'Manufactured urgency', desc: 'Creating a false sense of urgency to force action without thinking.' },
        'hameconnage': { name: 'Phishing', desc: 'Attempting to steal personal data via a fake website.' },
        'deepfake-audio': { name: 'Audio Deepfake', desc: 'AI-synthesized voice mimicking a real person.' },
        'fausse-causalite': { name: 'False causality', desc: 'Attributing a phenomenon to a cause with no proof of connection.' },
        'temoignage-anecdotique': { name: 'Anecdotal evidence', desc: 'Presenting individual cases as general proof.' },
        'etude-inventee': { name: 'Invented study', desc: 'Referencing a scientific study that does not exist.' },
        'conflit-interets': { name: 'Conflict of interest', desc: 'The recommending person profits financially.' },
        'cadrage-selectif': { name: 'Selective framing', desc: 'Showing only the elements that support a specific thesis.' },
        'mise-en-scene': { name: 'Narrative staging', desc: 'Constructing a structured narrative to give a false appearance of rigor.' },
        'appel-indignation': { name: 'Appeal to indignation', desc: 'Provoking anger to prevent rational analysis.' },
        'scepticisme-excessif': { name: 'Excessive skepticism', desc: 'Rejecting true info without verifying, out of automatic distrust.' },
        'theorie_complot': { name: 'Conspiracy theory', desc: '"They want to hide the truth" without evidence.' },
        'complot': { name: 'Conspiracy theory', desc: '"They want to hide the truth" without evidence.' },
        'aucune': { name: 'No manipulation detected', desc: 'The information is authentic and reliable.' },
        'information_verifiee': { name: 'Verified Information', desc: 'The information is proven and authentic.' }
    }
};

const CASE_TRANSLATIONS = {
    'en': {
        'case-1': {
            title: 'Professor Kanga\'s Miracle Vaccine',
            brief: 'A viral Facebook post claims that Professor Albert Kanga, a researcher at Bandawa University, has discovered a revolutionary vaccine that "eliminates 98.7% of known viruses". The post includes a photo of the professor in a lab coat and an impressive graph. Hundreds of shares in 24h.',
            witness: {
                role: 'Administrative secretary at the university',
                intro: 'Hello Detective. You wanted to ask me questions about this university story?'
            },
            questions: [
                { id: 'source', suggested: ['Where did you see this post?', 'Who posted this first?'],
                  responses: ['I saw it in the alumni WhatsApp group. Everyone was sharing, even the dean liked it!', 'It was published by an "InfoSanté Afrique" page. I don\'t know who runs it but it looked serious.'] },
                { id: 'chercheur', suggested: ['Do you know Pr. Kanga personally?', 'What field does the professor work in?'],
                  responses: ['Yes, I see him every day! Well... he teaches mathematics, not biology. But he is smart, right?', 'Professor Kanga? He is in the mathematics department. Wait... math, not medicine. Hm, now that you mention it...'] },
                { id: 'photo', suggested: ['Where does the photo of the professor come from?', 'Do you recognize the photo used?'],
                  responses: ['Oh, that photo! Yes, I recognize it — it\'s from last year\'s graduation ceremony! He was wearing a gown, not a lab coat.', 'Wait, that photo... it\'s from the year-end party! I was there, we were all dressed up. It\'s not a lab at all.'] },
                { id: 'stats', suggested: ['Where does the 98.7% figure come from?', 'Is there a scientific study behind it?'],
                  responses: ['98.7%? It\'s impressive, right? But... no, I\'ve never seen a scientific paper on it. The post doesn\'t cite anything actually.', 'Honestly, I don\'t know where that number comes from. I searched Google Scholar and found nothing. Strange.'] },
                { id: 'partage', suggested: ['Why did you share without verifying?', 'Do you usually verify before sharing?'],
                  responses: ['Well, everyone in the group was sharing it! When the dean likes it, you don\'t ask questions. Well... maybe I should have.', 'You know, when it\'s someone from your own university, you tend to trust them. But it\'s true I should have looked deeper.'] }
            ],
            lesson: 'Disinformation often uses a "combo": a vague source + impressive numbers + a misleading image. Independently, each element may look harmless. Together, they create fake credibility. Reflex: check each element independently.',
            badge: { name: 'Source Verifier' }
        },
        'case-2': {
            title: 'Water Poisoning Alert in Matadi',
            brief: 'A 45-second WhatsApp audio, shared thousands of times, claims that a "water company employee" revealed that tap water contains a dangerous chemical. The message accompanying the audio: "URGENT: Do not drink water tonight! Share to all your contacts ASAP!"',
            witness: {
                role: 'Merchant at the central market',
                intro: 'Ah my child, you come to ask me questions about this water story? I just forwarded it to protect people, that\'s all!'
            },
            questions: [
                { id: 'audio', suggested: ['Who recorded this audio?', 'Do you know the person speaking?'],
                  responses: ['The person in the audio? No, I don\'t know them. It was forwarded to me. It is "an employee" but I don\'t know which one.', 'Not at all! My nephew sent it to me, he received it from someone else. It is circulating everywhere!'] },
                { id: 'eau', suggested: ['Did your water look normal that day?', 'Did you notice any problem with the water?'],
                  responses: ['My water? Uh... it looked normal. But just because you don\'t see anything doesn\'t mean there is nothing!', 'I didn\'t dare taste it! But my neighbor drank it and is completely fine. Anyway, you never know.'] },
                { id: 'photo', suggested: ['Where does the photo of the turbid water come from?', 'Have you verified this photo?'],
                  responses: ['The photo? No, I haven\'t checked. But look how dirty the water is! It is scary, right?', 'My daughter told me this photo is from another country, 3 years ago. I don\'t know if it\'s true...'] },
                { id: 'verification', suggested: ['Did the water company confirm?', 'Did you call the water company?'],
                  responses: ['Call the water company? They will just deny it, of course! Those people always lie.', 'No, I didn\'t call. But when someone tells you not to drink water, you don\'t drink it! You ask questions later.'] },
                { id: 'urgence', suggested: ['Why is "URGENT" written everywhere?', 'Did this message scare you?'],
                  responses: ['When it\'s urgent, you don\'t think, you share! People\'s health first! You verify later.', '"URGENT" and capital letters make you want to react fast, it\'s true. Better safe than sorry, right?'] }
            ],
            lesson: 'Fake health alerts always follow the same pattern: an anonymous source "for security", an URGENT message in caps, and a call to share immediately. This combo exploits our protective instincts. Reflex: if it is truly urgent, official authorities will communicate.',
            badge: { name: 'Anti-Panic' }
        },
        'case-3': {
            title: 'Live Earthquake on TikTok',
            brief: 'During a live stream on TikTok (12K viewers), a popular influencer suddenly screams: « EARTHQUAKE! Look outside! » and shows a video of collapsing buildings with sirens. Comments flood in with panic and prayer emojis.',
            witness: {
                role: 'TikTok Influencer',
                intro: 'Hey Detective! Why are people attacking me? I was just live sharing what was happening, I didn\'t invent anything!'
            },
            questions: [
                { id: 'direct', suggested: ['Were you really live on TikTok?', 'Did you feel the shaking yourself?'],
                  responses: ['Yes I was live! Well, the video clip was recorded earlier, but I went live to comment on it for my followers!', 'The shaking? Uh... I was in my studio, but look at the video, you can clearly see the buildings shake!'] },
                { id: 'seisme', suggested: ['Did an earthquake observatory confirm this?', 'Where did the footage come from?'],
                  responses: ['An observatory? Who checks observatories when you have a viral video? Everyone in the chat was freaking out!', 'The footage was sent to me on Telegram by a fan. It had sirens and everything, looked super dramatic.'] },
                { id: 'sirenes', suggested: ['Where do the siren sound effects come from?', 'Did you add dramatic sounds to the video?'],
                  responses: ['The sound? Oh... well, maybe I added an audio effect to make the live stream more engaging. It\'s just content creation!', 'You know how TikTok works, you need good sound design so people don\'t scroll past. It was just a sound filter.'] },
                { id: 'lieu', suggested: ['Where was this video actually filmed?', 'Is this even in this city?'],
                  responses: ['Someone commented that it was an old earthquake in Chile from 2010... but it looked so similar to our downtown!', 'I didn\'t check the location coordinates. When something trends, you jump on it fast to get views.'] },
                { id: 'foule', suggested: ['Why did you tell people to evacuate?', 'Do you realize this caused street panic?'],
                  responses: ['I told my chat "Get out of your houses guys!" because I wanted to keep them safe! I didn\'t mean to cause chaos.', 'I was just trying to get views, honestly. I didn\'t think people would actually panic in the streets.'] }
            ],
            lesson: 'Dramatic live streams often recycle old foreign disaster footage with added sound effects for views. Always verify seismic events on national geological websites.',
            badge: { name: 'Buzz Debunker' }
        },
        'case-4': {
            title: 'The €1 Samsung Birthday Promo',
            brief: 'A sponsored Facebook post announces: « For its 50th anniversary, Samsung is offering the Galaxy S24 for €1 to the first 1,000 participants! ». A link leads to a page with the official Samsung logo and a countdown timer.',
            witness: {
                role: 'High school student',
                intro: 'Detective! I only wanted a new phone for school... I paid the €2 shipping fee and now money is disappearing from my card!'
            },
            questions: [
                { id: 'lien', suggested: ['Where did the link send you?', 'Did you check the website address?'],
                  responses: ['The link was something like samsung-promo-birthday.xyz. It had the official blue Samsung logo on top!', 'I clicked and it showed a countdown timer: "Only 3 phones left!" so I rushed to enter my details.'] },
                { id: 'samsung', suggested: ['Did Samsung officially announce this promo?', 'Did you check Samsung\'s verified page?'],
                  responses: ['Samsung\'s page? No, but the website looked completely real with customer reviews saying "I got mine today!"', 'Why would Samsung sell a $1,000 phone for 1 dollar? When you say it like that, it sounds crazy, but I believed it.'] },
                { id: 'frais', suggested: ['Did they ask for your credit card details?', 'What were the "shipping fees"?'],
                  responses: ['They asked for 2 dollars in shipping fees. I typed my card number... and then $80 was charged the next day!', 'Just 2 dollars for shipping! But then my bank called me for suspicious recurring subscription charges.'] },
                { id: 'reception', suggested: ['Did you ever receive the smartphone?', 'Did anyone you know get the phone?'],
                  responses: ['Never received anything! The tracking number they sent was completely fake.', 'No one received a phone. It was just a phishing trap to steal debit cards.'] },
                { id: 'partage', suggested: ['Why did you forward the link to 10 friends?', 'Were you forced to share to win?'],
                  responses: ['The site said: "Share to 10 WhatsApp contacts to claim your gift!" That\'s how they trick everyone.', 'I forwarded it to my family and friends because the screen was blocked until I clicked share.'] }
            ],
            lesson: 'Phishing scams mimic brand logos and manufacture urgency to steal banking data. Real companies never sell flagships for €1.',
            badge: { name: 'Scam Hunter' }
        },
        'case-5': {
            title: 'Dr. Vance\'s Secret Remedy',
            brief: 'A sponsored video shows a doctor claiming to have found the ultimate cellular cure in Amazonian roots, citing an independent study and offering bottles online.',
            witness: {
                role: 'Alternative medicine advocate',
                intro: 'Detective, orthodox doctors suppress natural cures because they cannot patent plants!'
            },
            questions: [
                { id: 'decouverte', suggested: ['How was this molecule discovered?', 'What is the origin of this remedy?'],
                  responses: ['While researching deep Amazonian plants! This molecule neutralizes cell aging in 48 hours.', 'Nature holds secrets that modern medicine ignores. My formula restores natural biological harmony.'] },
                { id: 'etude', suggested: ['Where was your study published?', 'Was this peer-reviewed in a recognized journal?'],
                  responses: ['Published in the International Journal of Alternative Cellular Science! A pioneering independent journal.', 'Peer review is controlled by big pharmaceutical corporations who want to suppress natural cures!'] },
                { id: 'video', suggested: ['Who produced the video with lab actors?', 'Are the technicians real scientists?'],
                  responses: ['The video illustrates our laboratory methodology. The visual staging helps the general public understand.', 'Actors? Those are visual demonstrators portraying the microscopic action of the compound.'] },
                { id: 'naturel', suggested: ['Is this product certified by health agencies?', 'Has it undergone toxicity testing?'],
                  responses: ['It is 100% natural, so conventional pharmaceutical authorization is not required.', 'Ancient traditions have used these plants for centuries without health agency paperwork.'] },
                { id: 'prix', suggested: ['Why does a bottle cost $150?', 'Do you profit directly from sales?'],
                  responses: ['Rare active ingredients require costly extraction. My life\'s work deserves fair compensation.', 'We offer subscription packages. Quality scientific research cannot give away products for free.'] }
            ],
            lesson: 'Unproven remedies promoted with emotional staging and fake studies profit from vulnerable patients. Consult certified healthcare providers.',
            badge: { name: 'Fact Checker' }
        },
        'case-6': {
            title: 'GMOs: The Photo That Changed Everything',
            brief: 'A viral post displays strange fused tomatoes captioned: « This is what GMOs do to our food! BOYCOTT! ». The photo seems fake, but the botanical phenomenon (fasciation) is completely natural and scientifically documented.',
            witness: {
                role: 'Market vendor',
                intro: 'I took the photo of those weird tomatoes at my market stall! They are 100% real. But the text about GMOs was not written by me...'
            },
            questions: [
                { id: 'photo', suggested: ['Did you really take this photo yourself?', 'Do these strange tomatoes actually exist?'],
                  responses: ['Yes, it was me! I saw them at the market, thought it was funny and snapped a photo.', 'Of course they exist! My vegetable grower told me it\'s called fasciation, it\'s completely natural.'] },
                { id: 'ogm', suggested: ['Do you think this is caused by GMOs?', 'Who added the text about GMOs?'],
                  responses: ['GMOs? I don\'t even know what that is! Someone stole my picture and slapped the boycott text on it.', 'The text saying "BOYCOTT SUPERMARKETS" wasn\'t me. Someone added that caption to make people panic.'] },
                { id: 'maraicher', suggested: ['What did your grower say about these tomatoes?', 'Is this abnormal shape common in crops?'],
                  responses: ['He said it happens every year on a few plants, it\'s a harmless botanical anomaly called fasciation.', 'It\'s genetics and nature, nothing to do with toxic chemicals or secret laboratories.'] },
                { id: 'virale', suggested: ['How did your photo become viral?', 'Were you surprised by the social media storm?'],
                  responses: ['I posted it on Facebook for a laugh, a friend shared it, and suddenly it was on thousands of conspiracy pages.', 'I feel embarrassed. My photo is being used to frighten people when I just wanted to show something funny.'] },
                { id: 'sentiment', suggested: ['How do you feel about your photo being used like this?', 'What would you like the public to know?'],
                  responses: ['It bothers me. People are afraid to eat fresh tomatoes now! Nature just makes weird shapes sometimes.', 'I want everyone to know: the tomatoes are real and safe. The lie is the GMO story glued on top!'] }
            ],
            lesson: 'A photo can be 100% real while the explanation attached to it is 100% false. This is false causality. Always separate the fact from the narrative.',
            badge: { name: 'Master of Nuance' }
        },
        'case-7': {
            title: 'The Healer and Malaria',
            brief: 'A YouTube video (45K views) shows a traditional healer claiming to cure malaria with papaya leaf infusion, showing 3 "cured patients" and citing a fake Japanese study while selling bottles.',
            witness: {
                role: 'Pharmacist',
                intro: 'Ever since that video, mothers have refused antimalarial pills for their children. I saw two hospitalizations. What he is doing is dangerous.'
            },
            questions: [
                { id: 'etude', suggested: ['Does the cited Japanese study actually exist?', 'Did you search medical databases for it?'],
                  responses: ['I searched PubMed, Google Scholar, everywhere. That 89% study? Zero results. It does not exist.', 'No Japanese study supports this. Papaya leaves are studied, but nothing proves it cures malaria.'] },
                { id: 'temoins', suggested: ['Are the 3 recovered witnesses credible?', 'Is anecdotal evidence valid medical proof?'],
                  responses: ['3 people saying "I feel better" is not clinical proof. Malaria symptoms can fluctuate without cure.', 'Individual testimonials are anecdotes, not science. Real trials require hundreds of monitored patients.'] },
                { id: 'vente', suggested: ['How much does he sell the herbal tea for?', 'Is there a financial profit behind this?'],
                  responses: ['5,000 FCFA per bag! With an order link in the YouTube description. It\'s an unregulated business.', 'He recommends a product that he directly sells for cash. That is a textbook conflict of interest.'] },
                { id: 'danger', suggested: ['Is it dangerous to follow his advice?', 'Have you seen patients hospitalized?'],
                  responses: ['Two children were hospitalized in critical condition after their parents stopped antimalarials. Untreated malaria kills.', 'Patients tell me "Doctor, you just want to sell pills!" This fake healer destroys public trust in medicine.'] },
                { id: 'papaye', suggested: ['Does papaya have beneficial properties?', 'Is everything he claims completely false?'],
                  responses: ['Papaya has interesting antioxidant properties, but that does not replace antimalarial medicine.', 'Nature is fascinating, but miracle cure claims during life-threatening infections are deadly.'] }
            ],
            lesson: 'Health disinformation is dangerous. Red flags: 1) Anecdotes presented as proof, 2) Unverifiable studies, 3) The speaker sells the product. Always seek medical guidance.',
            badge: { name: 'Health Guardian' }
        },
        'case-8': {
            title: 'The Lake Turned Pink',
            brief: 'Spectacular photos of a vivid pink lake circulate with the headline: « ECOLOGICAL DISASTER: African lake turns pink due to toxic industrial waste! » sparking outrage.',
            witness: {
                role: 'Fisherman at Pink Lake (Senegal)',
                intro: 'Pink? It has been pink since my grandfather fished here! City people know nothing about our lake.'
            },
            questions: [
                { id: 'lac', suggested: ['Is the lake really bright pink?', 'How long has it looked like this?'],
                  responses: ['Pink for generations! My grandfather fished here, it was already pink. Salt and micro-algae cause the color.', 'I\'ve lived here over 50 years. The pink color is completely natural, not industrial pollution!'] },
                { id: 'pollution', suggested: ['Are there chemical factories around the lake?', 'Could this be toxic waste?'],
                  responses: ['Factories? There are none around the lake! We harvest salt here. If it were toxic, we\'d know.', 'No industrial plants for miles. Water quality tests show it\'s pure natural biology.'] },
                { id: 'scientifiques', suggested: ['Have scientists studied the water?', 'What is this micro-alga called?'],
                  responses: ['Yes, university biologists identified Dunaliella salina, an alga that produces pink beta-carotene in high salinity.', 'The alga is Dunaliella salina. Lake Hillier in Australia has the exact same natural phenomenon!'] },
                { id: 'touristes', suggested: ['Do tourists visit the lake?', 'Is the lake internationally famous?'],
                  responses: ['Visitors come from all over the world! It was a famous stage of the Dakar Rally.', 'Calling our lake an "ecological disaster" is clickbait that harms local tourism.'] },
                { id: 'texte', suggested: ['Who wrote "ECOLOGICAL DISASTER"?', 'Why sensationalize a natural lake?'],
                  responses: ['Someone saw the pink pictures, knew nothing about biology, and fabricated a pollution scandal for views.', 'Scandals generate clicks. The only real disaster here is lack of verification before posting.'] }
            ],
            lesson: 'A phenomenon can be spectacular AND natural. Sensationalist framing turns natural biology into manufactured outrage for clicks.',
            badge: { name: 'Nuanced Mind' }
        },
        'case-9': {
            title: 'The Ghost Hospital',
            brief: 'A viral Twitter/X thread with sharp photos shows a brand-new hospital apparently empty: « Hospital opened 6 months ago: ZERO doctors, ZERO patients. YOUR TAXES. Thread ⬇️ ».',
            witness: {
                role: 'Hospital nurse',
                intro: 'I work there EVERY DAY! We have patients! But that man came on a Sunday morning at 7 AM and took photos of closed outpatient corridors!'
            },
            questions: [
                { id: 'photos', suggested: ['Are the photos of the empty hospital real?', 'When were these photos taken?'],
                  responses: ['The photos are real, yes! But he came on a SUNDAY MORNING at 7 AM when outpatient clinics are closed!', 'Sunday at 7 AM. Only emergency rooms run at that hour. Photographing an empty hallway proves nothing.'] },
                { id: 'patients', suggested: ['Do you actually treat patients there?', 'How many consultations do you handle weekly?'],
                  responses: ['847 consultations last week alone! The hospital registry proves our staff is overworked.', 'We have so many patients that nurses do overtime. Our challenge is understaffing, not emptiness!'] },
                { id: 'thread', suggested: ['Did the author of the viral thread contact you?', 'Did they speak with any hospital doctor?'],
                  responses: ['Never! He spoke to zero medical staff. He just walked through early Sunday and posted his story.', 'If he had asked, we would have shown him patient registries and invited him during open clinic hours.'] },
                { id: 'problemes', suggested: ['Does the hospital face real challenges?', 'Is everything running smoothly?'],
                  responses: ['Of course we have real challenges like supply delays, but lying about a "ghost hospital" solves nothing.', 'Legitimate criticism is necessary, but fabricated viral threads discredit genuine healthcare needs.'] },
                { id: 'motivation', suggested: ['Why would someone publish a misleading thread?', 'Was there political timing involved?'],
                  responses: ['His profile is packed with partisan political campaigns right before elections.', 'Selective framing: taking photos at the quietest hour of the week to pretend it\'s always abandoned.'] }
            ],
            lesson: 'Well-structured threads with numbers and photos can fake journalistic rigor. Selective framing picks one misleading moment to claim it is always true.',
            badge: { name: 'Framing Analyst' }
        },
        'case-10': {
            title: 'The Meteor Video',
            brief: 'A viral video shows a fireball streaking across the night sky. The post says: « INCREDIBLE! Giant meteor seen tonight over Lagos! ️ ». Comments unanimously yell « FAKE! CGI! Photoshop! ».',
            witness: {
                role: 'Physics student',
                intro: 'I recorded this video from my terrace! It is a real bolide. But everyone calls me a liar because "it is too good to be true"...'
            },
            questions: [
                { id: 'video', suggested: ['Did you really record this meteor video yourself?', 'Do you have the original raw file?'],
                  responses: ['Yes! I have the raw unedited MP4 file with intact GPS coordinates and timestamp.', 'I filmed it from my rooftop terrace at 10:43 PM. The file metadata proves it\'s untouched.'] },
                { id: 'verification', suggested: ['Did an astronomical observatory confirm the event?', 'Is there scientific proof?'],
                  responses: ['Yes! The American Meteor Society cataloged the fireball the next morning with over 200 eyewitness reports.', 'The American Meteor Society official report confirms a magnitude -8 fireball over Lagos.'] },
                { id: 'autres', suggested: ['Did other people record the fireball?', 'Are there other video angles?'],
                  responses: ['At least 5 other people posted videos from across the city. Faking multiple coordinated angles is impossible.', 'Different angles from different neighborhoods confirmed the exact same trajectory in the sky.'] },
                { id: 'commentaires', suggested: ['Why are comments claiming it\'s fake CGI?', 'Does the flood of "FAKE" comments bother you?'],
                  responses: ['People are so used to deepfakes that they reject even genuine phenomena. That is excessive skepticism.', 'It makes me sad. When people refuse to check evidence and scream "fake" by reflex, truth loses.'] },
                { id: 'bolide', suggested: ['What is a fireball meteor?', 'Are bright meteors rare?'],
                  responses: ['A fireball (bolide) is an exceptionally bright meteor that blazes through the upper atmosphere.', 'Thousands of meteors hit Earth daily, but capturing a brilliant fireball on camera is a rare lucky shot.'] }
            ],
            lesson: 'Being a good detective is not rejecting everything or accepting everything. Excessive skepticism — automatically dismissing anything extraordinary without checking — is also a bias.',
            badge: { name: 'Master Detective' }
        }
    }
};
