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
        id: 'case-1', number: 1, title: 'Alerte Couvre-feu à Ouagadougou',
        difficulty: 1, isTrue: false,
        brief: 'Sur Facebook, une page nommée "Minestère de la sécurité" a publié la capture d\'un communiqué officiel estampillé Primature du Burkina Faso déclarant un couvre-feu immédiat de 17h à 4h du matin. Les marchés ferment précipitamment, mais une faute d\'orthographe sur le nom de la page attire votre attention.',
        witness: {
            name: 'Moussa Kaboré', age: 36, role: 'Commerçant à Ouagadougou',
            avatar: 'assets/witnesses/serge.webp', initials: 'MK', color: '#E8A33D',
            personality: 'Paniqué, pressé de fermer sa boutique et d\'avertir ses voisins, n\'a pas pris le temps d\'analyser les détails du document.',
            knows: [
                'La publication vient de la page Facebook "Minestère de la sécurité", partagée massivement sur Facebook et WhatsApp.',
                'Tout le monde au grand marché de Ouagadougou a commencé à ranger ses marchandises en panique.',
                'Il n\'avait pas remarqué la faute d\'orthographe dans le nom de la page : "Minestère" avec un "e" au lieu de "Ministère".',
                'Le Service d\'Information du Gouvernement (SIG) a démenti tout couvre-feu et annoncé des poursuites.'
            ],
            opening: 'Bonjour Détective ! C\'est la panique ici, ils annoncent un couvre-feu à 17h sur Facebook ! On doit tout fermer !',
            intro: 'Bonjour Détective ! C\'est la panique ici, ils annoncent un couvre-feu à 17h sur Facebook ! On doit tout fermer !'
        },
        questions: [
            { id: 'source', suggested: ['Où avez-vous vu cette publication ?', 'Qui a publié ce communiqué ?'],
              keywords: ['où', 'vu', 'source', 'trouvé', 'publié', 'page', 'facebook', 'premier', 'origine'],
              responses: ['J\'ai vu ça sur Facebook sur la page "Minestère de la sécurité". Tout le monde partageait en boucle !', 'C\'est apparu sur mon fil d\'actualité avec le logo du pays et la signature de la Primature, ça avait l\'air officiel.'],
              revealsEvidence: 0 },
            { id: 'faute', suggested: ['Avez-vous remarqué le nom exact de la page ?', 'Y a-t-il une faute dans le nom ?'],
              keywords: ['nom', 'page', 'faute', 'orthographe', 'minestère', 'e', 'bizarre'],
              responses: ['Le nom ? "Minestère de la sécurité"... Attendez, un "e" à Minestère ? Ah mince, je n\'avais même pas fait attention avec la panique !', 'Maintenant que vous le dites... un vrai ministère ne ferait jamais une faute pareille dans son propre nom !'],
              revealsEvidence: 1 },
            { id: 'dementi', suggested: ['Le gouvernement a-t-il confirmé ?', 'Qu\'en dit le Service d\'Information du Gouvernement (SIG) ?'],
              keywords: ['sig', 'gouvernement', 'officiel', 'démenti', 'vrai', 'confirmer', 'télévision'],
              responses: ['Le SIG vient de publier un communiqué : aucun couvre-feu n\'a été décrété ! C\'est un faux document fabriqué.', 'La télévision nationale vient de démentir ! Le document a été falsifié pour semer la peur.'],
              revealsEvidence: 2 },
            { id: 'panique', suggested: ['Pourquoi les commerçants ont-ils fermé si vite ?', 'Pourquoi avoir paniqué sans vérifier ?'],
              keywords: ['panique', 'marché', 'fermer', 'vite', 'pourquoi', 'peur', 'urgence'],
              responses: ['Quand on voit "Couvre-feu à 17h" et "Toute information contraire est une infox", la peur prend le dessus ! On n\'a pas réfléchi.', 'L\'heure tournait, on avait peur d\'avoir des ennuis avec la police. L\'urgence nous a fait oublier de vérifier.'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Communiqué officiel de la Primature — Facebook', type: 'image', typeLabel: 'Capture d\'écran',
              imageUrl: 'images/couvre_feu_bf.png', content_url: '/static/images/couvre_feu_bf.png',
              content: 'images/couvre_feu_bf.png',
              description: 'Document estampillé de la Primature du Burkina Faso publié sur la page suspecte "Minestère de la sécurité" avec un "e".' },
            { id: 'e2', title: 'Analyse du nom de la page Facebook', type: 'document', typeLabel: 'Document',
              content: 'PAGE FACEBOOK : "Minestère de la sécurité"\n━━━━━━━━━━━━━━━━━━\n• Nom falsifié : "Minestère" au lieu de "Ministère"\n• Absence de badge de certification bleu\n• Compte récent non répertorié sur le portail gouvernemental',
              description: 'Une page officielle d\'un ministère d\'État ne comporte jamais de faute d\'orthographe dans son titre principal et possède un badge de certification.' },
            { id: 'e3', title: 'Démenti officiel du Service d\'Information du Gouvernement (SIG)', type: 'document', typeLabel: 'Document',
              content: 'COMMUNIQUÉ DU SIG DU BURKINA FASO\n━━━━━━━━━━━━━━━━━━\n« Aucun couvre-feu n\'est en vigueur. Le document circulant sur les réseaux sociaux est un faux. Une plainte a été déposée pour falsification de documents publics. »',
              description: 'Le Service d\'Information du Gouvernement (SIG) confirme formellement la manipulation et annonce des poursuites pénales.' }
        ],
        correctTechniques: ['logo-falsifie', 'source-non-fiable', 'urgence-fabriquee', 'appel-peur'],
        techniqueChoices: ['logo-falsifie', 'source-non-fiable', 'urgence-fabriquee', 'appel-peur', 'stat-trompeuse', 'deepfake-audio', 'aucune'],
        feedback: {
            perfect: 'Enquête exemplaire, détective ! Vous avez démasqué l\'usurpation d\'identité gouvernementale : faux logo, faute dans le nom ("Minestère"), urgence artificielle et appel à la peur.',
            good: 'Bien joué ! L\'essentiel a été repéré. Devant un prétendu arrêté d\'urgence, vérifiez TOUJOURS l\'orthographe de la source et les canaux certifiés du gouvernement.',
            partial: 'Vous avez vu certains pièges, mais n\'oubliez pas la falsification du logo officiel et l\'exploitation de la peur.',
            poor: 'L\'urgence vous a trompé ! Ne partagez jamais un ordre de couvre-feu sans vous référer aux canaux officiels du SIG.'
        },
        lesson: 'Les faussaires utilisent souvent les armoiries nationales et un ton autoritaire pour tromper la population. Réflexe d\'hygiène informationnelle : repérez les fautes d\'orthographe dans le nom de l\'émetteur et vérifiez sur les canaux officiels certifiés.',
        badge: { name: 'Vérificateur d\'Arrêtés', icon: 'tag' }
    },

    // ======== DOSSIER 2 ========
    {
        id: 'case-2', number: 2, title: 'Appel d\'Urgence Hôpital Laquintinie',
        difficulty: 1, isTrue: false,
        brief: 'Elsa a reçu une capture d\'écran WhatsApp dramatique d\'un supposé proche suppliant : "J\'ai besoin de 4 donneurs de sang urgemment pour l\'hôpital laquintinie... Ne me laisse pas mourir". Le message incite au partage massif avec le numéro 69689898. Véritable détresse ou arnaque téléphonique ?',
        witness: {
            name: 'Elsa Mbarga', age: 21, role: 'Étudiante à Douala',
            avatar: 'assets/witnesses/amina.webp', initials: 'EM', color: '#6B8E23',
            personality: 'Très émue et bouleversée, a failli transférer le message dans tous ses groupes par peur qu\'une personne meure.',
            knows: [
                'Elle a reçu la capture d\'écran d\'un message de "Papa" suppliant pour 4 donneurs de sang à l\'hôpital Laquintinie.',
                'Le message utilise des formules tragiques ("Ne me laisse pas mourir") pour forcer le partage immédiat.',
                'Elle n\'a pas vérifié le numéro de téléphone 69689898 qui s\'avère être un numéro surtaxé.',
                'La banque de sang de l\'hôpital Laquintinie a confirmé qu\'aucun appel d\'urgence de ce type n\'a été lancé.'
            ],
            opening: 'Bonjour Détective ! J\'ai reçu ce message désespéré demandant du sang pour l\'hôpital Laquintinie... Je dois vite le transférer partout !',
            intro: 'Bonjour Détective ! J\'ai reçu ce message désespéré demandant du sang pour l\'hôpital Laquintinie... Je dois vite le transférer partout !'
        },
        questions: [
            { id: 'message', suggested: ['Qui vous a transféré cette capture ?', 'Avez-vous parlé directement à votre père ?'],
              keywords: ['qui', 'transféré', 'père', 'papa', 'parlé', 'appelé', 'contacté', 'reçu'],
              responses: ['En fait c\'est une capture d\'écran transférée dans un groupe promo ! Ce n\'est pas mon vrai père qui m\'a écrit directement.', 'C\'est une capture qui circule d\'écran en écran avec la mention "Transféré". On ne sait même pas qui est l\'auteur original.'],
              revealsEvidence: 0 },
            { id: 'hopital', suggested: ['Avez-vous contacté l\'hôpital Laquintinie ?', 'La banque du sang est-elle au courant ?'],
              keywords: ['hôpital', 'laquintinie', 'banque', 'sang', 'don', 'contacté', 'appelé', 'vérifié'],
              responses: ['J\'ai appelé la banque de sang de Laquintinie : ils disent qu\'ils n\'ont jamais émis ce message et que leurs stocks sont stables !', 'L\'hôpital a mis en garde : c\'est une arnaque virale récurrente pour faire appeler un numéro surtaxé.'],
              revealsEvidence: 1 },
            { id: 'numero', suggested: ['Que sait-on sur le numéro 69689898 ?', 'Avez-vous essayé d\'appeler le numéro ?'],
              keywords: ['numéro', '69689898', 'téléphone', 'appeler', 'surtaxé', 'arnaque', 'argent'],
              responses: ['Des amis ont essayé : c\'est un numéro surtaxé qui facture du crédit dès qu\'on décroche !', 'Le numéro en bas de la capture n\'appartient à aucun service médical, c\'est un piège pour siphonner le forfait.'],
              revealsEvidence: null },
            { id: 'emotion', suggested: ['Pourquoi avoir failli partager sans vérifier ?', 'La formule "Ne me laisse pas mourir" vous a-t-elle influencée ?'],
              keywords: ['mourir', 'émotion', 'peur', 'culpabilité', 'partage', 'vite', 'sentiment'],
              responses: ['Quand on lit "Ne me laisse pas mourir", on ressent une culpabilité immense ! On veut aider immédiatement.', 'L\'urgence vitale et les emojis en pleurs empêchent de réfléchir. On transfère par réflexe de compassion.'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Capture WhatsApp — Appel au Don de Sang Urgent', type: 'image', typeLabel: 'Capture d\'écran',
              imageUrl: 'images/don_sang_whatsapp.png', content_url: '/static/images/don_sang_whatsapp.png',
              content: 'images/don_sang_whatsapp.png',
              description: 'Message WhatsApp alarmiste avec formules tragiques ("Ne me laisse pas mourir") et incitation au partage massif avec le numéro 69689898.' },
            { id: 'e2', title: 'Vérification Banque du Sang Hôpital Laquintinie', type: 'document', typeLabel: 'Document',
              content: 'HÔPITAL LAQUINTINIE DE DOUALA — SERVICE TRANSFUSION SANGUINE\n━━━━━━━━━━━━━━━━━━\n« Aucun appel d\'urgence au don de sang n\'a été émis. Les messages viraux WhatsApp mentionnant des numéros privés sont des escroqueries aux numéros surtaxés. »',
              description: 'Les structures hospitalières disposent de protocoles officiels et ne demandent jamais de relayer des numéros privés sur les réseaux sociaux.' }
        ],
        correctTechniques: ['appel-emotion', 'urgence-fabriquee', 'source-non-fiable', 'hameconnage'],
        techniqueChoices: ['appel-emotion', 'urgence-fabriquee', 'source-non-fiable', 'hameconnage', 'logo-falsifie', 'stat-trompeuse', 'aucune'],
        feedback: {
            perfect: 'Déduction parfaite ! Vous avez identifié le piège de la fausse urgence médicale : culpabilisation émotionnelle, source inconnue et hameçonnage téléphonique.',
            good: 'Bien joué ! La manipulation par l\'empathie a été déjouée. Avant de relayer un appel de sang, contactez toujours l\'hôpital concerné.',
            partial: 'Vous avez senti le danger, mais notez bien la combinaison : urgence fabriquée + appel à l\'émotion + hameçonnage.',
            poor: 'L\'émotion a pris le dessus ! C\'est précisément sur la peur de laisser mourir quelqu\'un que comptent les fraudeurs pour propager leurs messages.'
        },
        lesson: 'Les chaînes virales de santé exploitent notre compassion en créant une fausse urgence vitale. Ne relayez JAMAIS un appel au don de sang sans avoir vérifié directement auprès de l\'établissement hospitalier.',
        badge: { name: 'Détecteur de Faux SOS', icon: 'heart' }
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
