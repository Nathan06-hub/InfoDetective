/* InfoDetective — Game Data (Cases 1-5) */

const SVG_ICONS = {
    'user-x': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>`,
    'bar-chart': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    'image': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    'alert-triangle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    'video': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
    'shield-off': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M19.69 14.1L12 19.8l-7.69-5.7A9.41 9.41 0 0 1 3 9.27V5.5l5.5-2.06m8.22-.64L21 4.2v5.07a9.47 9.47 0 0 1-1.31 4.83"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`,
    'heart': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    'tag': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`,
    'zap': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    'lock': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    'unlock': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>`,
    'mic': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
    'link-2': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
    'message-square': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    'file-text': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    'dollar-sign': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    'crop': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path></svg>`,
    'film': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`,
    'flame': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
    'help-circle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    'eye': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    'check-circle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    'arrow-right': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    'check': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>`
};

const ALL_TECHNIQUES = [
    { id: 'source-anonyme', name: 'Source anonyme', icon: 'user-x', desc: 'L\'auteur ou la source de l\'information n\'est pas identifiable ou vérifiable.' },
    { id: 'stat-trompeuse', name: 'Statistique trompeuse', icon: 'bar-chart', desc: 'Chiffres sans source, sortis de leur contexte ou inventés.' },
    { id: 'image-hors-contexte', name: 'Image hors contexte', icon: 'image', desc: 'Photo ou image réelle utilisée dans un contexte différent de l\'original.' },
    { id: 'appel-peur', name: 'Appel à la peur', icon: 'alert-triangle', desc: 'Utilisation de la peur pour empêcher la réflexion critique.' },
    { id: 'video-hors-contexte', name: 'Vidéo hors contexte', icon: 'video', desc: 'Vidéo réelle présentée dans un faux contexte.' },
    { id: 'source-non-fiable', name: 'Source non fiable', icon: 'shield-off', desc: 'Source sans crédibilité journalistique ou scientifique.' },
    { id: 'appel-emotion', name: 'Appel à l\'émotion', icon: 'heart', desc: 'Manipulation des émotions pour court-circuiter l\'analyse.' },
    { id: 'logo-falsifie', name: 'Logo/marque falsifié', icon: 'tag', desc: 'Utilisation frauduleuse d\'un logo ou d\'une marque connue.' },
    { id: 'urgence-fabriquee', name: 'Urgence fabriquée', icon: 'zap', desc: 'Création d\'un sentiment d\'urgence pour pousser à l\'action sans réfléchir.' },
    { id: 'hameconnage', name: 'Hameçonnage (phishing)', icon: 'lock', desc: 'Tentative de voler des données personnelles via un faux site.' },
    { id: 'deepfake-audio', name: 'Deepfake audio', icon: 'mic', desc: 'Voix synthétisée par IA imitant une personne réelle.' },
    { id: 'fausse-causalite', name: 'Fausse causalité', icon: 'link-2', desc: 'Attribuer un phénomène à une cause sans preuve de lien.' },
    { id: 'temoignage-anecdotique', name: 'Témoignage anecdotique', icon: 'message-square', desc: 'Présenter des cas individuels comme preuve générale.' },
    { id: 'etude-inventee', name: 'Étude inventée', icon: 'file-text', desc: 'Référence à une étude scientifique qui n\'existe pas.' },
    { id: 'conflit-interets', name: 'Conflit d\'intérêts', icon: 'dollar-sign', desc: 'La personne qui recommande profite financièrement.' },
    { id: 'cadrage-selectif', name: 'Cadrage sélectif', icon: 'crop', desc: 'Montrer uniquement les éléments qui soutiennent une thèse.' },
    { id: 'mise-en-scene', name: 'Mise en scène narrative', icon: 'film', desc: 'Construction d\'un récit structuré pour donner une apparence de rigueur.' },
    { id: 'appel-indignation', name: 'Appel à l\'indignation', icon: 'flame', desc: 'Provoquer la colère pour empêcher l\'analyse rationnelle.' },
    { id: 'scepticisme-excessif', name: 'Scepticisme excessif', icon: 'help-circle', desc: 'Rejeter une info vraie sans vérification, par méfiance automatique.' },
    { id: 'complot', name: 'Théorie du complot', icon: 'eye', desc: '« Ils veulent cacher la vérité » sans preuve.' },
    { id: 'aucune', name: 'Aucune manipulation détectée', icon: 'check-circle', desc: 'L\'information est authentique et fiable.' }
];

const CASES = [
    // ======== DOSSIER 1 ========
    {
        id: 'case-1', number: 1, title: 'Le Vaccin Miracle du Professeur Kanga',
        difficulty: 1, isTrue: false,
        brief: 'Une publication Facebook devenue virale affirme que le Professeur Albert Kanga, chercheur à l\'Université de Bandawa, a découvert un vaccin qui « élimine 98,7% des virus connus ». La publication inclut une photo du professeur en blouse blanche et un graphique impressionnant. Des centaines de partages en 24h.',
        witness: {
            name: 'Nadège Mbala', age: 34, role: 'Secrétaire administrative à l\'université',
            avatar: 'assets/witnesses/nadege.webp', initials: 'NM', color: '#E8A33D',
            personality: 'Enthousiaste, fière de son université, crédule et un peu naïve face aux partages WhatsApp. Elle défend fermement ses collègues.',
            knows: [
                'La publication vient de la page Facebook "InfoSanté Afrique", partagée dans le groupe WhatsApp des anciens de la fac.',
                'Le Professeur Albert Kanga enseigne les mathématiques à l\'université, et NON la médecine ou la biologie.',
                'La photo utilisée a été prise lors de la cérémonie de remise des diplômes 2024 où il portait une toge académique, pas une blouse de laboratoire.',
                'Aucune étude scientifique n\'a été publiée pour soutenir le chiffre de 98,7% d\'efficacité.'
            ],
            opening: 'Bonjour Détective. Vous vouliez me poser des questions sur cette histoire à l\'université ?',
            intro: 'Bonjour Détective. Vous vouliez me poser des questions sur cette histoire à l\'université ?'
        },
        questions: [
            { id: 'source', suggested: ['Où avez-vous vu cette publication ?', 'Qui a publié ça en premier ?'],
              keywords: ['où', 'vu', 'source', 'trouvé', 'publié', 'page', 'facebook', 'premier', 'origine'],
              responses: ['J\'ai vu ça dans le groupe WhatsApp des anciens de la fac. Tout le monde partageait, même le doyen a liké !', 'C\'est une page "InfoSanté Afrique" qui a publié. Je ne sais pas qui gère cette page mais ça avait l\'air sérieux.'],
              revealsEvidence: 0 },
            { id: 'chercheur', suggested: ['Vous connaissez personnellement le Pr. Kanga ?', 'Le professeur travaille dans quel domaine ?'],
              keywords: ['kanga', 'professeur', 'chercheur', 'connais', 'domaine', 'spécialité', 'enseigne', 'cours'],
              responses: ['Oui je le croise tous les jours ! Enfin... il enseigne les mathématiques, pas la biologie. Mais bon, il est intelligent, non ?', 'Le Professeur Kanga ? Il est au département de mathématiques. Attendez... des maths, pas de la médecine. Hm, maintenant que vous le dites...'],
              revealsEvidence: null },
            { id: 'photo', suggested: ['La photo du professeur en blouse, elle vient d\'où ?', 'Vous reconnaissez la photo utilisée ?'],
              keywords: ['photo', 'image', 'blouse', 'laboratoire', 'labo', 'portrait'],
              responses: ['Oh cette photo ! Mais oui je la reconnais — c\'est la cérémonie de remise des diplômes de l\'an dernier ! Il portait une toge, pas une blouse de labo.', 'Attendez, cette photo... c\'est celle de la fête de fin d\'année ! J\'y étais, on avait tous nos beaux habits. C\'est pas un laboratoire du tout ça.'],
              revealsEvidence: 2 },
            { id: 'stats', suggested: ['Le chiffre de 98,7%, ça vient d\'où ?', 'Il y a une étude scientifique derrière ?'],
              keywords: ['chiffre', 'statistique', '98', 'pourcentage', 'étude', 'preuve', 'scientifique', 'article'],
              responses: ['98,7% ? C\'est impressionnant, non ? Mais... non, je n\'ai jamais vu d\'article scientifique là-dessus. Le post ne cite rien en fait.', 'Honnêtement, je ne sais pas d\'où vient ce chiffre. J\'ai cherché sur Google Scholar et j\'ai rien trouvé. Bizarre quand même.'],
              revealsEvidence: 1 },
            { id: 'partage', suggested: ['Pourquoi avoir partagé sans vérifier ?', 'Vous vérifiez d\'habitude avant de partager ?'],
              keywords: ['partagé', 'pourquoi', 'vérifié', 'vérifier', 'partage', 'confiance'],
              responses: ['Bah tout le monde partageait dans le groupe ! Quand le doyen like, tu te poses pas de questions. Enfin... peut-être que j\'aurais dû.', 'Vous savez, quand c\'est quelqu\'un de votre propre université, on a tendance à faire confiance. Mais c\'est vrai que j\'aurais dû chercher plus.'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Publication Facebook — "InfoSanté Afrique"', type: 'screenshot', typeLabel: 'Capture d\'écran',
              content: 'InfoSanté Afrique\n━━━━━━━━━━━━━━━━━━\n« DÉCOUVERTE HISTORIQUE\nLe Pr. Albert Kanga a mis au point un vaccin révolutionnaire éliminant 98,7% des virus connus ! La fierté africaine ! »\n\n2.4K likes · 892 commentaires · 1.1K partages\n\nPage non vérifiée · 3 200 abonnés · Créée il y a 2 mois',
              description: 'La page "InfoSanté Afrique" n\'est pas vérifiée par Facebook. Elle n\'a que 3 200 abonnés et a été créée très récemment. Aucun lien vers une institution reconnue.' },
            { id: 'e2', title: 'Graphique "98,7% d\'efficacité"', type: 'statistic', typeLabel: 'Statistique',
              content: 'EFFICACITÉ DU VACCIN KANGA\n━━━━━━━━━━━━━━━━━━\n98,7%\n\nSource : aucune mentionnée\nMéthodologie : non précisée\nPublié dans : aucune revue citée',
              description: 'Le graphique affiche un chiffre impressionnant mais ne cite aucune source, aucune méthodologie, aucune revue scientifique. Un vrai résultat serait publié dans une revue à comité de lecture.' },
            { id: 'e3', title: 'Photo du Pr. Kanga "en laboratoire"', type: 'image', typeLabel: 'Image',
              content: 'Photo montrant un homme en tenue académique dans une salle de cérémonie.\n\nLégende originale : « Pr. Kanga lors de la remise des diplômes 2024 »\nLégende modifiée : « Pr. Kanga dans son laboratoire de recherche »\n\nLe décor visible (chaises, estrade, drapeaux) ne correspond pas à un laboratoire.',
              description: 'La photo a été prise lors d\'une cérémonie officielle, pas dans un laboratoire. La légende a été modifiée pour donner une fausse impression de contexte scientifique.' }
        ],
        correctTechniques: ['source-anonyme', 'stat-trompeuse', 'image-hors-contexte'],
        techniqueChoices: ['source-anonyme', 'stat-trompeuse', 'image-hors-contexte', 'deepfake-audio', 'appel-emotion', 'fausse-causalite', 'aucune'],
        feedback: {
            perfect: 'Excellent travail, détective ! Vous avez identifié les 3 techniques clés : une source anonyme non vérifiable, une statistique sans fondement, et une image sortie de son contexte. Le trio classique de la désinformation virale.',
            good: 'Bien joué ! Vous avez repéré l\'essentiel. Gardez toujours le réflexe : qui publie ? quelles preuves ? la photo montre-t-elle vraiment ce qu\'on prétend ?',
            partial: 'Pas mal pour un début ! Vous avez vu certaines manipulations mais d\'autres vous ont échappé. Astuce : vérifiez TOUJOURS la source, les chiffres ET les images séparément.',
            poor: 'Ce dossier était piégé ! La prochaine fois, posez-vous 3 questions : 1) Qui parle ? 2) D\'où viennent les chiffres ? 3) La photo est-elle dans son contexte original ?'
        },
        lesson: 'La désinformation utilise souvent un « combo » : une source vague + des chiffres impressionnants + une image trompeuse. Séparément, chaque élément peut paraître anodin. Ensemble, ils créent une fausse crédibilité. Réflexe : vérifiez chaque élément indépendamment.',
        badge: { name: 'Vérificateur de Sources', icon: 'search' }
    },

    // ======== DOSSIER 2 ========
    {
        id: 'case-2', number: 2, title: 'Alerte Eau Empoisonnée à Matadi',
        difficulty: 1, isTrue: false,
        brief: 'Un audio WhatsApp de 45 secondes, partagé des milliers de fois, affirme qu\'un « employé de la société des eaux » a révélé que l\'eau du robinet contient un produit chimique dangereux. Le message accompagnant l\'audio : « URGENT ️️️ Ne buvez pas l\'eau ce soir ! Partagez à tous vos contacts SVP !!! »',
        witness: {
            name: 'Oncle René', age: 58, role: 'Commerçant au marché central',
            avatar: 'assets/witnesses/rene.webp', initials: 'OR', color: '#6B8E23',
            intro: 'Ah mon petit, tu viens me poser des questions sur cette histoire d\'eau ? Moi j\'ai juste transféré pour protéger les gens, c\'est tout !'
        },
        questions: [
            { id: 'audio', suggested: ['Qui a enregistré cet audio ?', 'Vous connaissez la personne qui parle ?'],
              keywords: ['audio', 'enregistré', 'voix', 'personne', 'parle', 'qui'],
              responses: ['La personne dans l\'audio ? Non, je ne la connais pas. On m\'a transféré ça. C\'est "un employé" mais je ne sais pas lequel.', 'Connais pas du tout ! Mon neveu m\'a envoyé ça, lui aussi l\'a reçu de quelqu\'un d\'autre. Ça circule partout !'],
              revealsEvidence: 0 },
            { id: 'eau', suggested: ['Votre eau avait l\'air normale ce jour-là ?', 'Vous avez constaté un problème avec l\'eau ?'],
              keywords: ['eau', 'robinet', 'goût', 'couleur', 'normal', 'bu', 'constaté'],
              responses: ['Mon eau ? Euh... elle avait l\'air normale en fait. Mais c\'est pas parce qu\'on voit rien qu\'y a rien, hein !', 'J\'ai pas osé goûter ! Mais ma voisine a bu et elle va très bien. Enfin bon, on sait jamais.'],
              revealsEvidence: null },
            { id: 'photo', suggested: ['La photo de l\'eau trouble, vous savez d\'où elle vient ?', 'Vous avez vérifié cette photo ?'],
              keywords: ['photo', 'image', 'trouble', 'sale', 'robinet'],
              responses: ['La photo ? Non j\'ai pas vérifié. Mais regardez comme l\'eau est sale dessus ! Ça fait peur, non ?', 'Ma fille m\'a dit que cette photo vient d\'un autre pays, y a 3 ans. Je sais pas si c\'est vrai...'],
              revealsEvidence: 2 },
            { id: 'verification', suggested: ['La société des eaux a confirmé ?', 'Vous avez appelé la société des eaux ?'],
              keywords: ['société', 'eaux', 'confirmé', 'officiel', 'appelé', 'vérifié', 'démenti'],
              responses: ['Appeler la société des eaux ? Ils vont nier, c\'est sûr ! Ils mentent toujours ces gens-là.', 'Non, j\'ai pas appelé. Mais quand quelqu\'un te dit de pas boire l\'eau, tu bois pas l\'eau, tu poses des questions après !'],
              revealsEvidence: null },
            { id: 'urgence', suggested: ['Pourquoi c\'est marqué "URGENT" partout ?', 'Ce message vous a fait peur ?'],
              keywords: ['urgent', 'peur', 'panique', 'partager', 'vite', 'danger'],
              responses: ['Quand c\'est urgent, on réfléchit pas, on partage ! La santé des gens d\'abord ! On vérifie après.', '"URGENT" et les émojis rouge, ça donne envie de réagir vite, c\'est vrai. Mieux vaut prévenir que guérir, non ?'],
              revealsEvidence: 1 }
        ],
        evidence: [
            { id: 'e1', title: 'Transcription de l\'audio WhatsApp', type: '️', typeLabel: 'Audio',
              content: '️ TRANSCRIPTION AUDIO (45s)\n━━━━━━━━━━━━━━━━━━\n« Bonsoir à tous. Je suis un employé de la société des eaux. Je ne peux pas donner mon nom pour des raisons de sécurité. Ce soir, ne buvez SURTOUT PAS l\'eau du robinet. Un produit a été déversé par erreur. Prévenez vos proches. Partagez ce message. »\n\n️ Locuteur : non identifié\n️ Entreprise : non confirmée\n️ Aucun numéro de rapport cité',
              description: 'L\'audio provient d\'une source totalement anonyme. Aucun nom, aucun poste, aucun numéro de rapport. Une vraie alerte sanitaire passerait par les canaux officiels.' },
            { id: 'e2', title: 'Message d\'accompagnement', type: '', typeLabel: 'Capture d\'écran',
              content: ' MESSAGE WHATSAPP\n━━━━━━━━━━━━━━━━━━\n️️️ URGENT ️️️\n\n NE BUVEZ PAS L\'EAU DU ROBINET CE SOIR !!!\n\nPartagez à TOUS vos contacts SVP !!!\nOn nous cache la vérité !!!\n\n PARTAGEZ AVANT QU\'ILS CENSURENT \n\nTransféré >50 fois',
              description: 'Le message multiplie les signaux d\'urgence (émojis, majuscules, répétitions) pour provoquer une réaction émotionnelle immédiate et empêcher la réflexion.' },
            { id: 'e3', title: 'Photo de l\'eau "contaminée"', type: '️', typeLabel: 'Image',
              content: ' Photo d\'un robinet laissant couler une eau brunâtre.\n\n Recherche d\'image inversée :\n→ Photo publiée en 2021 au Bangladesh\n→ Contexte original : inondation saisonnière\n→ Aucun lien avec Matadi ni avec un empoisonnement',
              description: 'La photo est réelle mais date de 2021 et vient d\'un autre pays (Bangladesh, lors d\'inondations). Elle a été réutilisée hors contexte pour illustrer une fausse alerte.' }
        ],
        correctTechniques: ['source-anonyme', 'appel-peur', 'image-hors-contexte'],
        techniqueChoices: ['source-anonyme', 'appel-peur', 'image-hors-contexte', 'urgence-fabriquee', 'stat-trompeuse', 'hameconnage', 'aucune'],
        feedback: {
            perfect: 'Bravo, détective ! Source anonyme, appel à la peur et image hors contexte : vous maîtrisez le trio de la fausse alerte virale.',
            good: 'Bien vu ! Les fausses alertes sanitaires utilisent toujours l\'urgence et l\'anonymat. Réflexe : si c\'est "URGENT", c\'est rarement vérifié.',
            partial: 'Vous y êtes presque ! Les audios WhatsApp anonymes qui demandent de "partager vite" sont presque toujours des manipulation émotionnelles.',
            poor: 'Ce dossier montre le schéma classique : source anonyme + panique + image volée = fausse alerte. Prochaine fois, cherchez la source officielle avant de transférer.'
        },
        lesson: 'Les fausses alertes sanitaires suivent toujours le même schéma : une source anonyme « pour sa sécurité », un message URGENT en majuscules, et une demande de partager immédiatement. Ce combo exploite notre instinct de protection. Réflexe : si c\'est vraiment urgent, les autorités officielles communiqueront.',
        badge: { name: 'Anti-Panique', icon: '️' }
    },

    // ======== DOSSIER 3 ========
    {
        id: 'case-3', number: 3, title: 'Le Tremblement de Terre en Direct',
        difficulty: 1, isTrue: false,
        brief: 'Un influenceur TikTok (150K abonnés) a posté une vidéo spectaculaire d\'un immeuble qui s\'effondre avec le texte : «  SÉISME DÉVASTATEUR ce matin à Douala !!! Priez pour nous  ». 2 millions de vues en 3 heures. Les commentaires paniquent, des familles appellent leurs proches.',
        witness: {
            name: 'Kevin "KevBuzz" Fotso', age: 22, role: 'Influenceur TikTok · 150K abonnés',
            avatar: 'assets/witnesses/kevin.webp', initials: 'KF', color: '#E040FB',
            intro: 'Yo ! Ouais c\'est moi KevBuzz. La vidéo c\'est moi qui l\'ai postée. Pourquoi ? Pour informer ma communauté, c\'est mon devoir !'
        },
        questions: [
            { id: 'video', suggested: ['Cette vidéo, tu l\'as filmée toi-même ?', 'D\'où vient la vidéo exactement ?'],
              keywords: ['vidéo', 'filmé', 'tourné', 'caméra', 'propre', 'origine', 'trouvé'],
              responses: ['Filmée moi-même ? Euh non, je l\'ai trouvée sur X, enfin Twitter là. Quelqu\'un l\'avait postée. Mais c\'est un vrai immeuble qui tombe !', 'J\'ai vu la vidéo sur Twitter et je l\'ai repostée sur TikTok. Fallait que les gens sachent !'],
              revealsEvidence: 0 },
            { id: 'lieu', suggested: ['Tu étais à Douala ce matin-là ?', 'Tu as senti le séisme toi-même ?'],
              keywords: ['douala', 'étais', 'présent', 'senti', 'séisme', 'terrain', 'entendu'],
              responses: ['Euh... non, j\'étais à Yaoundé en fait. Mais un pote m\'a dit qu\'il avait senti quelque chose ! Enfin je crois.', 'À Douala ? Non j\'y étais pas. Mais la vidéo parle d\'elle-même, non ? Un immeuble qui tombe, c\'est un séisme !'],
              revealsEvidence: null },
            { id: 'verification', suggested: ['Tu as vérifié auprès des autorités ?', 'Les services sismologiques ont confirmé ?'],
              keywords: ['vérifié', 'confirmé', 'autorités', 'officiel', 'sismolog', 'institut'],
              responses: ['Vérifier auprès des autorités ? Frère, les autorités mettent 3 jours à communiquer ! Moi j\'informe en temps réel.', 'Non j\'ai pas vérifié. Mais avec 2 millions de vues, les gens me font confiance !'],
              revealsEvidence: 2 },
            { id: 'abonnes', suggested: ['Cette vidéo t\'a rapporté combien d\'abonnés ?', 'C\'est pas juste du buzz ça ?'],
              keywords: ['abonnés', 'buzz', 'vues', 'followers', 'gagné', 'clout', 'likes'],
              responses: ['J\'ai pris 20K abonnés en une journée, c\'est vrai. Mais c\'est pas la question ! Je fais du service public moi.', 'Du buzz ? Non, de l\'information citoyenne ! ...Bon ok, j\'ai gagné pas mal d\'abonnés, mais c\'est parce que les gens me font confiance.'],
              revealsEvidence: 1 },
            { id: 'consequences', suggested: ['Des familles ont paniqué à cause de ta vidéo ?', 'Tu regrettes d\'avoir posté ça ?'],
              keywords: ['familles', 'paniqué', 'regret', 'regrettes', 'conséquences', 'peur'],
              responses: ['Des gens ont paniqué ? Ah... oui on m\'a dit que des gens ont appelé leur famille en pleurant. C\'était peut-être pas Douala exactement mais ça aurait pu arriver !', 'Regretter ? Un peu... un médecin m\'a dit qu\'une dame a fait une crise d\'angoisse en voyant ma vidéo. Mais moi je savais pas que c\'était pas Douala !'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Capture de la vidéo TikTok', type: '', typeLabel: 'Capture d\'écran',
              content: ' TIKTOK — @KevBuzz\n━━━━━━━━━━━━━━━━━━\n SÉISME DÉVASTATEUR ce matin à Douala !!!\nPriez pour nous \n\n️ 340K ·  12K ·  89K\n\n Recherche inversée de la vidéo :\n→ Vidéo originale : séisme en Turquie, février 2023\n→ Filmée à Antakya, publiée par Reuters\n→ Aucun séisme signalé à Douala',
              description: 'La vidéo montre un vrai effondrement, mais en Turquie en 2023. Elle a été réattribuée à Douala sans aucune vérification.' },
            { id: 'e2', title: 'Profil TikTok de KevBuzz', type: '', typeLabel: 'Document',
              content: ' @KevBuzz · 150K abonnés\n━━━━━━━━━━━━━━━━━━\nBio : « BUZZ · HUMOUR · ACTU  »\nCatégorie : Divertissement\n\nContenu habituel : pranks, danses, challenges\nAucune formation journalistique\nAucune vérification des contenus\nMonétisation activée ',
              description: 'Le compte est un compte de divertissement, pas d\'information. Son auteur n\'a aucune crédibilité journalistique et profite financièrement du buzz.' },
            { id: 'e3', title: 'Registre sismologique national', type: '', typeLabel: 'Document',
              content: '️ INSTITUT DE RECHERCHE GÉOLOGIQUE\n━━━━━━━━━━━━━━━━━━\nRapport du jour :\n\nActivité sismique détectée : AUCUNE\nZone Douala : 0 événement\nZone Cameroun : 0 événement significatif\n\n« Nous démentons formellement les rumeurs circulant sur les réseaux sociaux. »',
              description: 'L\'institut de recherche géologique n\'a enregistré aucune activité sismique. Le démenti officiel est formel.' }
        ],
        correctTechniques: ['video-hors-contexte', 'source-non-fiable', 'appel-emotion'],
        techniqueChoices: ['video-hors-contexte', 'source-non-fiable', 'appel-emotion', 'deepfake-audio', 'source-anonyme', 'cadrage-selectif', 'aucune'],
        feedback: {
            perfect: 'Parfait ! Vidéo sortie de son contexte, source non fiable et appel à l\'émotion : le kit du buzz à sensation.',
            good: 'Bien joué ! N\'oubliez pas : un compte TikTok de divertissement n\'est PAS une source d\'information fiable, même avec 150K abonnés.',
            partial: 'Vous avez repéré certains signaux. Réflexe : quand une vidéo choquante circule, faites une recherche d\'image inversée AVANT de partager.',
            poor: 'Ce cas illustre comment une vidéo virale peut créer une fausse catastrophe. Réflexe : le nombre de vues ne garantit JAMAIS la véracité d\'une info.'
        },
        lesson: 'Les influenceurs ne sont pas des journalistes. Le nombre d\'abonnés ou de vues ne garantit absolument pas la véracité d\'une information. Réflexe : avant de paniquer devant une vidéo choquante, faites une recherche d\'image inversée (Google Images) pour vérifier son origine réelle.',
        badge: { name: 'Chasseur de Buzz', icon: '' }
    },

    // ======== DOSSIER 4 ========
    {
        id: 'case-4', number: 4, title: 'La Promo Samsung à 1€',
        difficulty: 2, isTrue: false,
        brief: 'Un lien circule massivement sur WhatsApp : «  SAMSUNG FÊTE SES 30 ANS ! Galaxy S25 Ultra à 1€ pour les 500 premiers ! Clique vite avant qu\'il soit trop tard ! ». Le lien mène vers un site qui ressemble trait pour trait au site officiel Samsung.',
        witness: {
            name: 'Amina Diallo', age: 26, role: 'Étudiante en commerce',
            avatar: 'assets/witnesses/amina.webp', initials: 'AD', color: '#42A5F5',
            intro: 'Alors oui, j\'ai partagé ce lien dans 15 groupes WhatsApp. Le site avait l\'air tellement officiel ! J\'ai failli donner mon numéro de carte bancaire...'
        },
        questions: [
            { id: 'url', suggested: ['L\'adresse du site, c\'était quoi exactement ?', 'L\'URL ressemblait au vrai site Samsung ?'],
              keywords: ['url', 'adresse', 'site', 'lien', 'samsung.com', 'domaine', 'web'],
              responses: ['L\'URL ? Euh... c\'était un truc genre "samsung-anniversary-promo.xyz". C\'est pas samsung.com maintenant que j\'y pense...', 'Mon copain a regardé l\'adresse et m\'a dit "Depuis quand Samsung a un site en .xyz ?" Là j\'ai commencé à douter.'],
              revealsEvidence: 0 },
            { id: 'compteur', suggested: ['Le compteur "Plus que X téléphones", il bougeait vraiment ?', 'L\'offre avait une limite de temps ?'],
              keywords: ['compteur', 'limite', 'temps', 'stock', 'reste', 'dépêche', 'vite'],
              responses: ['Oui il y avait un compteur : "Plus que 23 téléphones !". Mais quand j\'ai rechargé la page, il est revenu à 47. Bizarre non ?', 'Ça disait "Offre valable 10 minutes !!" avec un chrono. Mais si tu rafraîchis la page, le chrono repart. C\'est pas normal ça.'],
              revealsEvidence: 1 },
            { id: 'paiement', suggested: ['On te demandait quoi pour "acheter" ?', 'Tu devais entrer tes données bancaires ?'],
              keywords: ['paiement', 'carte', 'bancaire', 'données', 'personnel', 'numéro', 'acheter', 'commander'],
              responses: ['Avant même de choisir la couleur du téléphone, on me demandait ma carte bancaire et mon code ! C\'est là que j\'ai hésité.', 'Carte bancaire, numéro de sécurité sociale, adresse complète... tout ça pour un téléphone à 1€ ? En y repensant, c\'est beaucoup trop.'],
              revealsEvidence: 2 },
            { id: 'officiel', suggested: ['Samsung a annoncé cette promo sur ses réseaux ?', 'Tu as vérifié sur le vrai site Samsung ?'],
              keywords: ['officiel', 'samsung', 'réseaux', 'annoncé', 'vrai', 'vérifié', 'instagram', 'twitter'],
              responses: ['J\'ai cherché sur le vrai Instagram de Samsung après... rien. Pas de promo à 1€ nulle part. Ça n\'existe que via ce lien WhatsApp.', 'Sur samsung.com il n\'y a rien du tout. Et Samsung a 30 ans ? Même pas, ils ont été fondés en 1938 !'],
              revealsEvidence: null },
            { id: 'trop-beau', suggested: ['Un Galaxy S25 à 1€, ça te semblait pas bizarre ?', 'Comment tu as pu y croire ?'],
              keywords: ['bizarre', 'croire', 'possible', 'trop beau', 'arnaque', 'naïf'],
              responses: ['Mon copain m\'a dit "Amina, depuis quand Samsung vend des téléphones à 1€ ?" et là j\'ai tilté. Des fois l\'envie prend le dessus sur la logique.', 'Sur le moment, c\'est le design du site qui m\'a piégée. Quand ça ressemble au vrai site, on baisse sa garde.'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Capture du faux site Samsung', type: '', typeLabel: 'Capture d\'écran',
              content: ' samsung-anniversary-promo.xyz\n━━━━━━━━━━━━━━━━━━\n SAMSUNG FÊTE SES 30 ANS !\nGalaxy S25 Ultra à 1€ !\n\n Logo Samsung (copié)\n Couleurs identiques au vrai site\n URL : samsung-anniversary-promo.xyz (pas samsung.com)\n Certificat SSL : Let\'s Encrypt (gratuit)\n Whois : domaine créé il y a 3 jours\n Samsung fondé en 1938, pas 1995',
              description: 'Le site copie l\'apparence de Samsung mais l\'URL est complètement différente. Le domaine a été créé 3 jours avant et les informations sont fausses.' },
            { id: 'e2', title: 'Faux compteur de stock', type: '', typeLabel: 'Capture d\'écran',
              content: '⏱️ COMPTEUR DU SITE\n━━━━━━━━━━━━━━━━━━\n Plus que 23 téléphones disponibles !\n⏰ Offre expire dans : 09:47\n\nTest : après rechargement de la page\n Plus que 47 téléphones disponibles !\n⏰ Offre expire dans : 10:00\n\n️ Le compteur est un script qui se réinitialise.',
              description: 'Le compteur de "stock restant" et le chronomètre se réinitialisent quand on recharge la page — c\'est un faux sentiment d\'urgence programmé.' },
            { id: 'e3', title: 'Formulaire de données personnelles', type: '', typeLabel: 'Document',
              content: ' DONNÉES DEMANDÉES PAR LE SITE\n━━━━━━━━━━━━━━━━━━\n• Nom complet\n• Adresse postale\n• Numéro de téléphone\n• Numéro de carte bancaire\n• Code de sécurité (CVV)\n• Date d\'expiration\n\n️ Demandé AVANT le choix du produit\n️ Aucune mention de paiement sécurisé\n️ Aucune politique de confidentialité',
              description: 'Un vrai site e-commerce ne demande jamais le CVV avant le choix du produit. L\'absence de paiement sécurisé et de politique de confidentialité sont des signaux d\'alerte majeurs.' }
        ],
        correctTechniques: ['logo-falsifie', 'urgence-fabriquee', 'hameconnage'],
        techniqueChoices: ['logo-falsifie', 'urgence-fabriquee', 'hameconnage', 'appel-emotion', 'source-anonyme', 'stat-trompeuse', 'aucune'],
        feedback: {
            perfect: 'Excellent ! Logo falsifié, urgence fabriquée et phishing : les 3 piliers de l\'arnaque en ligne. Vous ne tomberez plus dans le piège !',
            good: 'Bien vu ! Les arnaques au phishing misent sur l\'imitation visuelle et l\'urgence. Vérifiez TOUJOURS l\'URL.',
            partial: 'Vous avez détecté certains signaux. Le réflexe numéro 1 contre le phishing : regarder l\'URL AVANT de cliquer.',
            poor: 'C\'est une arnaque classique au phishing. Règle d\'or : si c\'est trop beau pour être vrai, c\'est que ça ne l\'est pas. Vérifiez toujours l\'URL !'
        },
        lesson: 'Le phishing imite parfaitement l\'apparence d\'un site officiel. Ne faites JAMAIS confiance au design seul. Vérifiez l\'URL (domaine .xyz ≠ .com), méfiez-vous des compteurs d\'urgence (ils se réinitialisent), et ne donnez jamais vos données bancaires via un lien WhatsApp.',
        badge: { name: 'Anti-Phishing', icon: '' }
    },

    // ======== DOSSIER 5 ========
    {
        id: 'case-5', number: 5, title: 'L\'Audio du Ministre',
        difficulty: 2, isTrue: false,
        brief: 'Un enregistrement audio circule où une voix ressemblant au Ministre de l\'Éducation dit : « Les diplômes, ça ne vaut rien. Moi-même j\'ai acheté le mien ! ». Indignation générale sur les réseaux sociaux. Des manifestations étudiantes sont annoncées.',
        witness: {
            name: 'Serge Ndongo', age: 31, role: 'Admin du groupe Facebook "Étudiants en Colère"',
            avatar: 'assets/witnesses/serge.webp', initials: 'SN', color: '#EF5350',
            intro: 'Oui j\'ai posté l\'audio avec le commentaire "LA PREUVE !!!". Un ami journaliste me l\'a envoyé, il a ses sources.'
        },
        questions: [
            { id: 'journaliste', suggested: ['C\'est qui cet ami journaliste ?', 'Tu peux me mettre en contact avec ta source ?'],
              keywords: ['ami', 'journaliste', 'source', 'contact', 'envoyé', 'qui'],
              responses: ['Mon ami journaliste ? En fait c\'est... un contact Facebook. On s\'est jamais vus en vrai. Enfin, il dit qu\'il est journaliste.', 'Le mettre en contact ? Euh... en fait le numéro qui m\'a envoyé l\'audio, c\'était un numéro inconnu. Le "journaliste" m\'a envoyé ça par message privé.'],
              revealsEvidence: null },
            { id: 'audio-origine', suggested: ['Tu as vérifié l\'origine de cet audio ?', 'Comment tu sais que c\'est vraiment le Ministre ?'],
              keywords: ['vérifié', 'origine', 'vraiment', 'ministre', 'authentique', 'prouvé'],
              responses: ['On entend clairement sa voix ! Enfin... ça y ressemble. Mais non, j\'ai pas fait vérifier par un expert.', 'Je l\'ai pas vérifié, non. Mais ça sonne comme lui ! Et puis pourquoi quelqu\'un fabriquerait ça ?'],
              revealsEvidence: 0 },
            { id: 'anomalies', suggested: ['L\'audio a des défauts sonores ?', 'Tu as écouté attentivement la qualité du son ?'],
              keywords: ['qualité', 'son', 'défaut', 'bizarre', 'anomalie', 'artificiel', 'robot'],
              responses: ['Un ami ingénieur du son m\'a dit que les transitions entre les mots étaient bizarres. Genre des micro-coupures pas naturelles.', 'Maintenant que tu le dis... y a un moment où l\'intonation change brusquement, comme si c\'était collé. J\'y avais pas fait attention.'],
              revealsEvidence: 2 },
            { id: 'reaction', suggested: ['Tu as contacté le Ministère avant de publier ?', 'Le Ministre a réagi ?'],
              keywords: ['ministère', 'réagi', 'démenti', 'contacté', 'réponse', 'officiel'],
              responses: ['Contacter le Ministère ? Ils vont juste nier ! C\'est toujours comme ça, ils protègent les leurs.', 'Le Ministère a publié un démenti officiel mais personne le croit. « Ils mentent toujours » disent les gens dans mon groupe.'],
              revealsEvidence: null },
            { id: 'partage', suggested: ['Pourquoi "partagez avant censure" ?', 'Tu crois vraiment qu\'ils vont censurer ?'],
              keywords: ['censure', 'partage', 'avant', 'cacher', 'vérité', 'complot'],
              responses: ['Faut partager vite sinon ils font supprimer ! C\'est déjà arrivé que des trucs disparaissent des réseaux !', '"Partagez avant censure"... oui bon, c\'est un peu dramatique. Mais ça fait réagir les gens, ça crée du mouvement !'],
              revealsEvidence: 1 }
        ],
        evidence: [
            { id: 'e1', title: 'Transcription de l\'audio "du Ministre"', type: '️', typeLabel: 'Audio',
              content: '️ TRANSCRIPTION AUDIO (32s)\n━━━━━━━━━━━━━━━━━━\n« Les diplômes, ça ne vaut rien dans ce pays. Moi-même, entre nous, j\'ai acheté le mien. Ce système est pourri depuis le début. »\n\n Voix : ressemblance estimée 85% avec le Ministre\n️ Aucun contexte (lieu, date, interlocuteur)\n️ Phrases courtes et découpées\n️ Aucune réaction d\'interlocuteur audible',
              description: 'L\'audio contient des phrases courtes sans contexte conversationnel. Aucun interlocuteur ne réagit, aucun bruit de fond, ce qui est inhabituel pour un enregistrement "fuité".' },
            { id: 'e2', title: 'Post Facebook de Serge Ndongo', type: '', typeLabel: 'Capture d\'écran',
              content: ' FACEBOOK — Serge Ndongo\n━━━━━━━━━━━━━━━━━━\n LA PREUVE !!! \n\nÉCOUTEZ CETTE AUDIO DU MINISTRE !!!\n\nPARTAGEZ AVANT QU\'ILS CENSURENT !!!\n\n#MinastreDémasqué #ÉtudiantsEnColère\n#LaVéritéVaTriompher\n\n 4.2K ·  3.1K ·  8.7K',
              description: 'Le post utilise l\'urgence ("avant qu\'ils censurent"), l\'appel à la théorie du complot ("ils"), et les majuscules/émojis pour maximiser l\'engagement émotionnel.' },
            { id: 'e3', title: 'Analyse audio par un expert', type: '', typeLabel: 'Document',
              content: ' RAPPORT D\'ANALYSE AUDIO\n━━━━━━━━━━━━━━━━━━\nExpert : Laboratoire d\'acoustique forensique\n\nRésultats :\n• ️ Artefacts spectraux typiques d\'une synthèse vocale IA\n• ️ Absence de bruit de fond naturel\n• ️ Micro-coupures entre les phrases (assemblage)\n• ️ Prosodie anormalement régulière\n\nConclusion : forte probabilité de deepfake audio (confiance : 92%)',
              description: 'L\'analyse acoustique révèle des signatures typiques d\'un audio généré par intelligence artificielle : pas de bruit de fond, transitions artificielles, prosodie trop régulière.' }
        ],
        correctTechniques: ['deepfake-audio', 'urgence-fabriquee', 'appel-emotion'],
        techniqueChoices: ['deepfake-audio', 'urgence-fabriquee', 'appel-emotion', 'complot', 'source-anonyme', 'cadrage-selectif', 'aucune'],
        feedback: {
            perfect: 'Impressionnant ! Deepfake audio, urgence fabriquée et appel à l\'émotion : vous avez tout identifié. Les deepfakes sont la nouvelle frontière de la désinformation.',
            good: 'Bien vu ! Les deepfakes audio sont de plus en plus convaincants. N\'oubliez pas : "partager avant censure" est presque toujours un red flag.',
            partial: 'Vous avez repéré certaines techniques. La clé ici est le deepfake audio — la technologie permet aujourd\'hui de cloner n\'importe quelle voix.',
            poor: 'Les deepfakes audio sont redoutables car notre oreille nous trompe. Réflexe : méfiez-vous des audios sans contexte, surtout quand ils sont "urgents".'
        },
        lesson: 'Les deepfakes audio et vidéo sont de plus en plus sophistiqués. Une voix qui « ressemble à » quelqu\'un ne prouve rien. Réflexes : 1) Y a-t-il un contexte (lieu, date, interlocuteurs) ? 2) L\'audio a-t-il été vérifié par un expert ? 3) Le message appelle-t-il à la « peur de la censure » ? Si oui, c\'est un signal d\'alerte.',
        badge: { name: 'Détecteur de Deepfakes', icon: '' }
    }
];
