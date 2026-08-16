/* InfoDetective — Game Data (Cases 6-10) */

CASES.push(
    // ======== DOSSIER 6 — PIÈGE (VRAI) ========
    {
        id: 'case-6', number: 6, title: 'OGM : La Photo qui a Tout Changé',
        difficulty: 2, isTrue: true, isTrap: true,
        brief: 'Une publication virale montre la photo de tomates géantes et difformes accompagnée d\'une alerte : « Voilà ce que les OGM font à nos aliments ! BOYCOTTEZ les supermarchés ! ». L\'aspect inhabituel des fruits suscite une vague d\'indignation sur les réseaux sociaux.',
        witness: {
            name: 'Mariam Konaté', age: 42, role: 'Vendeuse au marché',
            avatar: 'assets/witnesses/mariam.webp', initials: 'MK', color: '#66BB6A',
            intro: 'Les tomates bizarres, c\'est moi qui les ai photographiées au marché ! Elles existent vraiment. Mais le texte sur les OGM, ça c\'est pas moi qui l\'ai écrit...'
        },
        questions: [
            { id: 'photo', suggested: ['C\'est vraiment vous qui avez pris la photo ?', 'Ces tomates existent réellement ?'],
              keywords: ['photo', 'prise', 'vraie', 'réelle', 'tomates', 'existe'],
              responses: ['Oui c\'est moi ! Je les ai vues au marché, j\'ai trouvé ça marrant et j\'ai pris une photo. Mon maraîcher dit que ça arrive parfois.', 'Bien sûr qu\'elles existent ! Mon maraîcher m\'a expliqué : ça s\'appelle la "fasciation", c\'est naturel. Ça arrive dans la nature.'],
              revealsEvidence: 0 },
            { id: 'ogm', suggested: ['Vous pensez que c\'est vraiment les OGM ?', 'Qui a ajouté le texte sur les OGM ?'],
              keywords: ['ogm', 'texte', 'ajouté', 'modifié', 'écrit', 'boycott'],
              responses: ['Les OGM ? Je ne sais même pas ce que c\'est exactement ! Moi j\'ai juste partagé la photo. Quelqu\'un d\'autre a rajouté le texte dessus.', 'Le texte "BOYCOTTEZ", ça c\'est pas moi. Quelqu\'un a pris ma photo, a ajouté le texte, et ça a été partagé des milliers de fois.'],
              revealsEvidence: 1 },
            { id: 'maraicher', suggested: ['Votre maraîcher a dit quoi sur ces tomates ?', 'C\'est normal des tomates comme ça ?'],
              keywords: ['maraîcher', 'normal', 'naturel', 'explication', 'pourquoi', 'forme'],
              responses: ['Mon maraîcher dit que ça arrive des fois, c\'est la nature. Il m\'a dit un mot scientifique... "fasciation" je crois.', 'Il m\'a dit "Ça arrive tous les ans sur quelques tomates, c\'est génétique mais naturel." Rien à voir avec des produits chimiques.'],
              revealsEvidence: 2 },
            { id: 'virale', suggested: ['Comment votre photo est devenue virale ?', 'Vous avez été surprise par le buzz ?'],
              keywords: ['virale', 'buzz', 'surprise', 'partage', 'comment'],
              responses: ['J\'ai posté la photo sur Facebook pour rigoler, un ami l\'a prise, a mis le texte OGM dessus, et BOUM ça a explosé.', 'Je suis gênée en fait. Ma photo sert à faire peur aux gens. Moi je voulais juste montrer un truc rigolo du marché !'],
              revealsEvidence: null },
            { id: 'sentiment', suggested: ['Ça vous fait quoi que votre photo serve à ça ?', 'Vous aimeriez que les gens sachent la vérité ?'],
              keywords: ['sentiment', 'ressent', 'vérité', 'mal', 'gêne'],
              responses: ['Ça me gêne beaucoup. Les gens ont peur de manger des tomates maintenant ! Alors que c\'est juste la nature qui fait des formes bizarres.', 'J\'aimerais que tout le monde sache : ces tomates sont normales, c\'est la nature. Le problème c\'est le texte qu\'on a mis dessus, pas les tomates.'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Photo originale des tomates difformes', type: '️', typeLabel: 'Image',
              content: ' Photo de tomates avec des formes inhabituelles (bosses, excroissances)\n\n Photo authentique, non retouchée\n Prise par Mariam Konaté au marché\n Le phénomène de fasciation est documenté scientifiquement\n\nLa fasciation est une mutation naturelle qui affecte la croissance des plantes.',
              description: 'La photo est AUTHENTIQUE. Les tomates difformes sont un phénomène naturel bien documenté appelé fasciation. Ce n\'est pas un montage.' },
            { id: 'e2', title: 'Post viral avec texte ajouté', type: '', typeLabel: 'Capture d\'écran',
              content: ' POST VIRAL\n━━━━━━━━━━━━━━━━━━\n[Photo de Mariam avec texte superposé]\n\n« VOILÀ CE QUE LES OGM FONT À NOS ALIMENTS \nBOYCOTTEZ LES SUPERMARCHÉS !!!\nPARTAGEZ POUR INFORMER !!! »\n\n️ Le texte a été ajouté PAR UNE AUTRE PERSONNE\n️ Aucune preuve de lien entre OGM et fasciation\n️ Mariam n\'a jamais mentionné les OGM',
              description: 'Le texte incriminant les OGM a été ajouté par un tiers sur la photo de Mariam. C\'est une FAUSSE CAUSALITÉ : les tomates sont réelles mais la raison invoquée (OGM) est inventée.' },
            { id: 'e3', title: 'Article scientifique sur la fasciation', type: '', typeLabel: 'Document',
              content: ' FASCIATION — Encyclopédie botanique\n━━━━━━━━━━━━━━━━━━\nDéfinition : croissance anormale des tissus végétaux, donnant des formes aplaties ou en crête.\n\nCauses : mutation génétique spontanée, stress environnemental, infection bactérienne.\n\n Aucun lien avec les OGM\n Phénomène naturel observé depuis des siècles\n Sans danger pour la consommation',
              description: 'La fasciation est un phénomène naturel connu depuis des siècles, sans aucun lien avec les OGM. Les tomates affectées sont comestibles et sans danger.' }
        ],
        correctTechniques: ['fausse-causalite'],
        techniqueChoices: ['fausse-causalite', 'image-hors-contexte', 'source-anonyme', 'appel-peur', 'stat-trompeuse', 'aucune'],
        feedback: {
            perfect: 'Brillant ! Vous avez résisté au piège. La photo est VRAIE, le phénomène est RÉEL, mais la conclusion « c\'est les OGM » est une fausse causalité. Bravo pour la nuance !',
            good: 'Bien joué ! Vous avez vu que le problème n\'est pas la photo (authentique) mais l\'explication inventée. C\'est exactement ça, la fausse causalité.',
            partial: 'Attention ! La photo est vraie, les tomates sont réelles. La seule manipulation ici est la FAUSSE CAUSALITÉ : attribuer le phénomène aux OGM sans preuve.',
            poor: 'Ce dossier était un piège ! Tout n\'est pas fake. La photo est authentique, le phénomène est naturel. La seule manipulation est d\'avoir attribué ça aux OGM sans aucune preuve.'
        },
        lesson: 'Tout n\'est pas noir ou blanc. Une photo peut être VRAIE mais l\'explication qui l\'accompagne FAUSSE. C\'est la fausse causalité : « A existe, donc B en est la cause ». Réflexe : séparez toujours le FAIT (photo, événement) de l\'INTERPRÉTATION (explication, cause). Vérifiez chacun indépendamment.',
        badge: { name: 'Maître de la Nuance', icon: '️' }
    },

    // ======== DOSSIER 7 ========
    {
        id: 'case-7', number: 7, title: 'Le Guérisseur et la Malaria',
        difficulty: 2, isTrue: false,
        brief: 'Une vidéo YouTube (45K vues) montre un homme en tenue traditionnelle qui affirme guérir le paludisme avec une infusion de papaye. Il présente 3 « témoins guéris » devant la caméra et cite « une étude japonaise prouvant l\'efficacité à 89% ». Il vend ses infusions en lien dans la description.',
        witness: {
            name: 'Dr. Patrice Obiang', age: 39, role: 'Pharmacien',
            avatar: 'assets/witnesses/obiang.webp', initials: 'PO', color: '#26A69A',
            intro: 'Depuis cette vidéo, des mères refusent les antipaludéens pour leurs enfants. J\'ai vu deux hospitalisations. C\'est dangereux ce qu\'il fait.'
        },
        questions: [
            { id: 'etude', suggested: ['L\'étude japonaise, elle existe vraiment ?', 'Vous avez cherché cette étude ?'],
              keywords: ['étude', 'japonaise', 'recherché', 'scientifique', 'existe', 'pubmed', 'preuve'],
              responses: ['J\'ai cherché sur PubMed, Google Scholar, partout. Cette étude à 89% d\'efficacité ? Elle n\'existe pas. Aucune trace nulle part.', 'Aucune étude japonaise ne confirme ça. La papaye a des propriétés étudiées, oui, mais rien de concluant contre la malaria.'],
              revealsEvidence: 1 },
            { id: 'temoins', suggested: ['Les 3 témoins dans la vidéo, ils sont crédibles ?', 'Des témoignages individuels, ça suffit comme preuve ?'],
              keywords: ['témoins', 'guéris', 'personnes', 'individuel', 'anecdote', 'preuve'],
              responses: ['3 personnes qui disent "je suis guéri" ne prouvent rien scientifiquement. La malaria peut se résorber temporairement sans traitement, ça ne veut pas dire qu\'on est guéri.', '3 témoignages sur des millions de malades ? Ce n\'est pas de la science, c\'est de l\'anecdote. Un vrai test nécessite des centaines de patients et un groupe contrôle.'],
              revealsEvidence: 0 },
            { id: 'vente', suggested: ['Il vend ses infusions combien ?', 'Il gagne de l\'argent avec ça ?'],
              keywords: ['vend', 'argent', 'prix', 'gagne', 'commerce', 'business', 'lien'],
              responses: ['5 000 FCFA le sachet ! Et dans la description YouTube il y a le lien pour commander. C\'est un business, pas de la médecine.', 'La description de sa vidéo contient un lien pour acheter ses infusions. Il recommande un produit qu\'il VEND. Ça s\'appelle un conflit d\'intérêts.'],
              revealsEvidence: 2 },
            { id: 'danger', suggested: ['C\'est dangereux de suivre ses conseils ?', 'Vous avez eu des patients qui ont suivi ce guérisseur ?'],
              keywords: ['danger', 'dangereux', 'patients', 'hôpital', 'conséquences', 'risque'],
              responses: ['Deux enfants de mes clients ont été hospitalisés après que leurs mères ont arrêté le traitement pour suivre le guérisseur. Le paludisme non traité peut être mortel.', 'Un de mes patients m\'a dit "Docteur, vous dites ça parce que vous voulez vendre vos médicaments !" C\'est terrible. On perd la confiance envers la médecine.'],
              revealsEvidence: null },
            { id: 'papaye', suggested: ['La papaye a quand même des vertus, non ?', 'C\'est 100% faux ce qu\'il dit ?'],
              keywords: ['papaye', 'vertus', 'vrai', 'propriétés', 'naturel', 'traditionnel'],
              responses: ['La papaye a des propriétés intéressantes, oui, c\'est vrai. Mais "intéressant à étudier" ne veut pas dire "guérit la malaria". La science ça prend du temps.', 'Ce n\'est pas tout noir ou tout blanc. La papaye est étudiée, mais aucun résultat ne justifie de remplacer un antipaludéen prouvé. Le guérisseur, lui, prétend que c\'est un remède miracle.'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Extrait vidéo — Les "témoins guéris"', type: '', typeLabel: 'Capture d\'écran',
              content: ' YOUTUBE — « Guérir la malaria NATURELLEMENT »\n━━━━━━━━━━━━━━━━━━\nTémoin 1 : « J\'ai bu l\'infusion et en 3 jours j\'étais guéri ! »\nTémoin 2 : « Ma fille avait la fièvre, l\'infusion a tout réglé ! »\nTémoin 3 : « Les médicaments chimiques sont du poison ! »\n\n️ 3 témoignages individuels ≠ preuve scientifique\n️ Aucun diagnostic médical confirmé\n️ La malaria peut donner des rémissions temporaires',
              description: 'Des témoignages individuels ne constituent pas une preuve scientifique. La malaria peut sembler s\'améliorer puis rechuter dangereusement.' },
            { id: 'e2', title: '"Étude japonaise" citée (89%)', type: '', typeLabel: 'Statistique',
              content: ' VÉRIFICATION DE L\'ÉTUDE\n━━━━━━━━━━━━━━━━━━\nAffirmation : « Étude japonaise — 89% d\'efficacité »\n\nRecherche dans :\n PubMed : 0 résultat\n Google Scholar : 0 résultat\n WHO Database : 0 résultat\n JAMA : 0 résultat\n\nConclusion : cette étude n\'existe pas.',
              description: 'L\'étude citée est introuvable dans toutes les bases de données scientifiques mondiales. Elle a été inventée pour donner une apparence de crédibilité.' },
            { id: 'e3', title: 'Lien commercial dans la description', type: '', typeLabel: 'Document',
              content: ' DESCRIPTION DE LA VIDÉO YOUTUBE\n━━━━━━━━━━━━━━━━━━\n« COMMANDEZ votre infusion miracle ici → [lien]\n Livraison rapide\n 5 000 FCFA / sachet (lot de 3 : 12 000 FCFA)\nPaiement Mobile Money accepté ! »\n\n️ Le guérisseur VEND ce qu\'il recommande\n️ Conflit d\'intérêts évident\n️ Aucune autorisation de mise sur le marché',
              description: 'Le guérisseur vend directement le produit qu\'il recommande via sa vidéo. C\'est un conflit d\'intérêts flagrant : il a un intérêt financier à convaincre les gens.' }
        ],
        correctTechniques: ['temoignage-anecdotique', 'etude-inventee', 'conflit-interets'],
        techniqueChoices: ['temoignage-anecdotique', 'etude-inventee', 'conflit-interets', 'appel-emotion', 'deepfake-audio', 'fausse-causalite', 'aucune'],
        feedback: {
            perfect: 'Parfait ! Témoignage anecdotique, étude inventée, conflit d\'intérêts : le trio de la fausse médecine. Vous pouvez sauver des vies avec ces réflexes !',
            good: 'Bien joué ! La fausse médecine tue. Vérifier les études citées et chercher les conflits d\'intérêts sont des réflexes essentiels.',
            partial: 'Vous avez vu certaines techniques mais pas toutes. En santé, les 3 questions sont : l\'étude existe-t-elle ? Combien de patients ? Qui vend le produit ?',
            poor: 'Ce dossier est critique car la désinformation en santé peut être mortelle. Réflexes : vérifiez les études, méfiez-vous des témoignages individuels, cherchez qui profite.'
        },
        lesson: 'La désinformation en santé est la plus dangereuse. Trois signaux d\'alerte : 1) Des témoignages individuels présentés comme des preuves (l\'anecdote ne vaut pas la science), 2) Une étude « impressionnante » qu\'on ne peut pas vérifier, 3) La personne qui recommande est celle qui vend. En cas de doute, consultez un professionnel de santé.',
        badge: { name: 'Gardien de la Santé', icon: '' }
    },

    // ======== DOSSIER 8 — PIÈGE (VRAI) ========
    {
        id: 'case-8', number: 8, title: 'Le Lac Devenu Rose',
        difficulty: 3, isTrue: true, isTrap: true,
        brief: 'Des photos spectaculaires d\'un lac devenu entièrement rose circulent avec le titre : « CATASTROPHE ÉCOLOGIQUE : un lac africain devient rose à cause des déchets industriels ! ». Les commentaires crient au scandale et demandent des comptes au gouvernement.',
        witness: {
            name: 'Boubacar Sy', age: 50, role: 'Pêcheur au Lac Rose (Sénégal)',
            avatar: 'assets/witnesses/boubacar.webp', initials: 'BS', color: '#EC407A',
            intro: 'Rose ? Mais il est rose depuis que mon grand-père pêchait ici ! C\'est les gens de la ville qui ne connaissent rien.'
        },
        questions: [
            { id: 'lac', suggested: ['Le lac est vraiment rose ?', 'Depuis quand il est comme ça ?'],
              keywords: ['rose', 'vraiment', 'couleur', 'depuis', 'quand', 'toujours'],
              responses: ['Rose depuis des générations ! Mon père m\'a emmené pêcher ici quand j\'étais enfant, c\'était déjà rose. C\'est le sel et les algues qui font ça.', 'Ça fait plus de 50 ans que je vis ici. Le lac est rose, c\'est normal. C\'est une algue microscopique, pas de la pollution !'],
              revealsEvidence: 0 },
            { id: 'pollution', suggested: ['Y a des usines ou industries autour ?', 'Ça pourrait être de la pollution ?'],
              keywords: ['pollution', 'usine', 'industrie', 'déchets', 'chimique', 'toxique'],
              responses: ['Des usines ? Il n\'y en a aucune autour du lac ! On pêche ici, on récolte le sel. Si c\'était pollué, on serait tous malades depuis 50 ans, non ?', 'Aucune industrie à des kilomètres. Les scientifiques sont venus, ils ont analysé l\'eau. C\'est naturel, point.'],
              revealsEvidence: 2 },
            { id: 'scientifiques', suggested: ['Des scientifiques ont étudié le lac ?', 'C\'est quoi cette algue exactement ?'],
              keywords: ['scientifiques', 'étudié', 'algue', 'analyse', 'prouvé', 'dunaliella'],
              responses: ['Oui, des chercheurs de l\'université sont venus ! Ils ont dit que c\'est une algue, "Dunaliella salina", qui produit un pigment rose dans l\'eau très salée.', 'L\'algue s\'appelle Dunaliella salina. Même en Australie il y a un lac comme ça, le Lac Hillier. C\'est un phénomène naturel connu.'],
              revealsEvidence: null },
            { id: 'touristes', suggested: ['Les touristes viennent voir le lac ?', 'Le lac est connu ?'],
              keywords: ['touristes', 'connu', 'visiteurs', 'célèbre', 'attraction'],
              responses: ['Des touristes viennent du monde entier ! C\'est une attraction touristique. On en est fiers ! Et là on nous dit que c\'est de la pollution...', 'Le Lac Rose est même un site célèbre du Rallye Dakar ! Tout le monde le connaît. Dire que c\'est de la pollution, c\'est insultant.'],
              revealsEvidence: null },
            { id: 'texte', suggested: ['Qui a écrit "CATASTROPHE ÉCOLOGIQUE" ?', 'Le titre de l\'article vous choque ?'],
              keywords: ['catastrophe', 'titre', 'article', 'écrit', 'auteur', 'choque'],
              responses: ['Quelqu\'un qui ne connaît rien au lac a vu les photos et a inventé une histoire de pollution. Ça fait des clics, les scandales.', '"Catastrophe écologique" ! Pfff. La seule catastrophe, c\'est l\'ignorance. Venez voir par vous-mêmes avant d\'écrire n\'importe quoi.'],
              revealsEvidence: 1 }
        ],
        evidence: [
            { id: 'e1', title: 'Photos du lac rose', type: '️', typeLabel: 'Image',
              content: ' Photos du Lac Rose (Lac Retba), Sénégal\n\n Photos AUTHENTIQUES\n Le lac est naturellement rose\n Phénomène causé par l\'algue Dunaliella salina\n Documenté scientifiquement depuis des décennies\n Site touristique mondialement connu',
              description: 'Les photos sont authentiques. Le Lac Rose (Lac Retba) au Sénégal est naturellement rose. C\'est un phénomène biologique, pas une catastrophe.' },
            { id: 'e2', title: 'Article viral "CATASTROPHE ÉCOLOGIQUE"', type: '', typeLabel: 'Capture d\'écran',
              content: ' ARTICLE VIRAL\n━━━━━━━━━━━━━━━━━━\n CATASTROPHE ÉCOLOGIQUE :\nUn lac africain devient ROSE à cause des déchets industriels !\n\n 12K réactions · 8K partages\n\n️ Le titre est ALARMISTE\n️ Aucune preuve de pollution citée\n️ Le lac est naturellement rose depuis des décennies\n️ « Devient rose » est faux : il est DÉJÀ rose',
              description: 'Le titre crée une fausse causalité (« à cause des déchets ») et un faux sentiment d\'urgence (« CATASTROPHE »). Le lac est naturellement rose.' },
            { id: 'e3', title: 'Article Wikipedia — Dunaliella salina', type: '', typeLabel: 'Document',
              content: ' DUNALIELLA SALINA\n━━━━━━━━━━━━━━━━━━\nAlgue microscopique halophile qui se développe dans les eaux très salées.\n\nProduit du bêta-carotène en grande quantité, donnant une coloration rose/rouge.\n\nExemples de lacs colorés :\n• Lac Retba (Sénégal) — rose\n• Lac Hillier (Australie) — rose\n• Laguna Colorada (Bolivie) — rouge\n\n Phénomène 100% naturel\n Sans danger pour la faune et les humains',
              description: 'Dunaliella salina est une algue connue qui colore naturellement les lacs salés en rose. Ce phénomène est documenté partout dans le monde.' }
        ],
        correctTechniques: ['fausse-causalite', 'appel-emotion'],
        techniqueChoices: ['fausse-causalite', 'appel-emotion', 'image-hors-contexte', 'source-non-fiable', 'cadrage-selectif', 'aucune'],
        feedback: {
            perfect: 'Excellent ! Vous avez vu à travers le piège. Les photos sont vraies, le lac est vraiment rose — mais la CAUSE invoquée (pollution) est fausse. Fausse causalité + appel à l\'émotion.',
            good: 'Bien vu ! Le piège ici est de tout rejeter alors que le phénomène est réel. La seule manipulation est l\'attribution à la pollution.',
            partial: 'Attention ! Ce dossier est un piège. Le lac est VRAIMENT rose, les photos sont AUTHENTIQUES. La seule technique est la fausse causalité (attribuer ça à la pollution).',
            poor: 'Vous êtes tombé dans le piège ! Le lac est réellement rose depuis des décennies. Seul le titre alarmiste est faux. Tout n\'est pas fake — et ça, c\'est la leçon.'
        },
        lesson: 'Un phénomène peut être spectaculaire ET naturel. Ce n\'est pas parce qu\'une photo semble incroyable qu\'elle est fausse. La manipulation ici est dans le CADRAGE : transformer un phénomène naturel en « catastrophe écologique » pour générer de l\'indignation et des clics.',
        badge: { name: 'Esprit Nuancé', icon: '' }
    },

    // ======== DOSSIER 9 ========
    {
        id: 'case-9', number: 9, title: 'L\'Hôpital Fantôme',
        difficulty: 3, isTrue: false,
        brief: 'Un thread Twitter/X viral avec photos montre un hôpital flambant neuf apparemment vide : « L\'hôpital inauguré par le gouvernement il y a 6 mois : AUCUN médecin, AUCUN patient, AUCUN médicament. VOS IMPÔTS.  Thread ⬇️ ». Le thread est bien structuré, les photos nettes.',
        witness: {
            name: 'Aïcha Traoré', age: 29, role: 'Infirmière à l\'hôpital en question',
            avatar: 'assets/witnesses/aicha.webp', initials: 'AT', color: '#AB47BC',
            intro: 'Je travaille là-bas CHAQUE JOUR ! On a des patients ! Mais ce monsieur est venu un dimanche matin à 7h et a pris des photos des couloirs vides !'
        },
        questions: [
            { id: 'photos', suggested: ['Les photos de l\'hôpital vide, elles sont vraies ?', 'Quand est-ce que ces photos ont été prises ?'],
              keywords: ['photos', 'vide', 'quand', 'prises', 'moment', 'heure', 'jour'],
              responses: ['Les photos sont vraies, oui ! Mais il est venu un DIMANCHE MATIN à 7h ! Évidemment c\'est vide ! Venez un lundi à 10h, vous verrez.', 'Un dimanche matin très tôt. Les consultations externes sont fermées le dimanche. C\'est comme photographier un restaurant à 6h du matin et dire qu\'il n\'a pas de clients.'],
              revealsEvidence: 0 },
            { id: 'patients', suggested: ['Vous avez vraiment des patients ?', 'Combien de patients par semaine ?'],
              keywords: ['patients', 'combien', 'consultations', 'monde', 'fréquentation'],
              responses: ['847 consultations la semaine dernière ! J\'ai le registre. On est débordés du lundi au vendredi.', 'Tellement de patients qu\'on fait parfois des heures supplémentaires. Le problème c\'est le sous-effectif, pas le vide !'],
              revealsEvidence: 2 },
            { id: 'thread', suggested: ['L\'auteur du thread vous a contactée ?', 'Il a interrogé le personnel ?'],
              keywords: ['auteur', 'contacté', 'interrogé', 'personnel', 'demandé', 'journaliste'],
              responses: ['Jamais ! Il n\'a contacté personne. Ni moi, ni le directeur, ni aucun médecin. Il a fait son "enquête" tout seul un dimanche à 7h.', 'Aucun contact avec le personnel. S\'il avait demandé, on lui aurait montré les registres, fait visiter pendant les heures normales.'],
              revealsEvidence: 1 },
            { id: 'problemes', suggested: ['L\'hôpital a quand même des vrais problèmes ?', 'Tout est parfait alors ?'],
              keywords: ['problèmes', 'parfait', 'équipement', 'manque', 'réalité'],
              responses: ['Bien sûr qu\'on a des problèmes ! On manque de personnel, certains équipements sont en retard. Mais inventer qu\'on est vide, ça ne résout rien.', 'Ah non, tout n\'est pas parfait. On a des vrais défis. Mais mentir en disant qu\'il n\'y a personne, ça décrédibilise même les vraies critiques.'],
              revealsEvidence: null },
            { id: 'motivation', suggested: ['Pourquoi quelqu\'un ferait un faux thread ?', 'L\'auteur avait des motivations politiques ?'],
              keywords: ['pourquoi', 'motivation', 'politique', 'raison', 'intérêt'],
              responses: ['Son profil est plein de contenus anti-gouvernement. Je ne sais pas s\'il ment exprès ou s\'il est juste malhonnête dans sa méthode.', 'Hashtags politiques, timing avant les élections... Je n\'accuse personne mais la coïncidence est frappante.'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Photos de l\'hôpital "vide"', type: '️', typeLabel: 'Image',
              content: ' 3 photos de couloirs et salles d\'attente vides\n\n Photos authentiques (non retouchées)\n️ Prises un DIMANCHE MATIN à 7h\n️ Consultations externes fermées le dimanche\n️ Seules les urgences fonctionnent le weekend\n\nAnalogie : photographier un bureau vide le samedi et conclure que personne ne travaille.',
              description: 'Les photos sont réelles mais prises au moment le plus calme de la semaine. C\'est du cadrage sélectif : choisir délibérément le moment qui soutient sa thèse.' },
            { id: 'e2', title: 'Thread Twitter structuré avec hashtags', type: '', typeLabel: 'Capture d\'écran',
              content: ' THREAD TWITTER — @CitoyenVigilant\n━━━━━━━━━━━━━━━━━━\n1/6 L\'hôpital inauguré il y a 6 mois : VIDE.\n2/6 [Photo couloir vide]\n3/6 [Photo salle d\'attente vide]\n4/6 Pas UN médecin. Pas UN patient.\n5/6 VOS IMPÔTS servent à construire des bâtiments fantômes.\n6/6 RT si vous en avez assez. #HôpitalFantôme #VosImpôts\n\n️ Thread structuré = apparence d\'enquête rigoureuse\n️ Aucun témoignage du personnel\n️ Hashtags politiques orientés',
              description: 'Le thread est construit comme une enquête rigoureuse (numérotation, photos, conclusion) mais c\'est une mise en scène narrative : l\'apparence de rigueur masque l\'absence de vérification.' },
            { id: 'e3', title: 'Registre des patients (semaine)', type: '', typeLabel: 'Document',
              content: ' REGISTRE HOSPITALIER\n━━━━━━━━━━━━━━━━━━\nSemaine du 4-10 août 2026 :\n\nConsultations externes : 847\nUrgences : 124\nHospitalisations : 38\nPersonnel présent : 42 (dont 8 médecins)\n\n Document officiel vérifié\n Données conformes aux rapports mensuels',
              description: 'Le registre officiel montre une activité soutenue avec 847 consultations en une semaine. L\'hôpital est loin d\'être vide.' }
        ],
        correctTechniques: ['cadrage-selectif', 'mise-en-scene', 'appel-indignation'],
        techniqueChoices: ['cadrage-selectif', 'mise-en-scene', 'appel-indignation', 'image-hors-contexte', 'source-anonyme', 'stat-trompeuse', 'aucune'],
        feedback: {
            perfect: 'Brillant ! Cadrage sélectif, mise en scène narrative et appel à l\'indignation. Vous avez vu à travers la technique du "cherry-picking temporel".',
            good: 'Bien vu ! Un thread bien structuré n\'est pas toujours une bonne enquête. La structure peut masquer l\'absence de vérification.',
            partial: 'Le piège ici est la structure du thread qui donne une fausse impression de rigueur. Les photos sont vraies mais le MOMENT choisi est trompeur.',
            poor: 'Ce thread illustre le cadrage sélectif : choisir le moment le plus vide pour "prouver" que c\'est toujours vide. L\'apparence d\'enquête sérieuse est une mise en scène.'
        },
        lesson: 'Un contenu bien structuré (thread numéroté, photos nettes, hashtags) peut donner une fausse impression de rigueur journalistique. Le cadrage sélectif consiste à choisir UN moment ou UN angle qui soutient sa thèse en ignorant tout le reste. Réflexe : qui a fait cette « enquête » ? A-t-il contacté les personnes concernées ?',
        badge: { name: 'Analyste de Cadrage', icon: '' }
    },

    // ======== DOSSIER 10 — PIÈGE (VRAI) ========
    {
        id: 'case-10', number: 10, title: 'La Vidéo du Météore',
        difficulty: 3, isTrue: true, isTrap: true,
        brief: 'Une vidéo spectaculaire montre une boule de feu traversant le ciel nocturne, filmée par plusieurs téléphones. Le post dit : « INCROYABLE ! Un météore géant vu ce soir au-dessus de Lagos !!! ️ ». Les commentaires crient unanimement « FAKE ! CGI ! Encore un montage ! ».',
        witness: {
            name: 'Grace Okafor', age: 25, role: 'Étudiante en physique',
            avatar: 'assets/witnesses/grace.webp', initials: 'GO', color: '#FF7043',
            intro: 'J\'ai filmé cette vidéo depuis ma terrasse ! C\'est un vrai bolide. Mais tout le monde me traite de menteuse parce que « c\'est trop beau pour être vrai »...'
        },
        questions: [
            { id: 'video', suggested: ['C\'est vraiment vous qui avez filmé ça ?', 'Vous avez la vidéo originale ?'],
              keywords: ['filmé', 'originale', 'caméra', 'tournée', 'brute'],
              responses: ['Oui ! J\'ai la vidéo brute, non éditée, avec les métadonnées GPS et l\'heure. Mon téléphone a tout enregistré.', 'J\'ai filmé depuis ma terrasse à 22h43. La vidéo brute est sur mon téléphone avec toutes les métadonnées intactes.'],
              revealsEvidence: 0 },
            { id: 'verification', suggested: ['Un observatoire a confirmé ce météore ?', 'Il y a des preuves scientifiques ?'],
              keywords: ['observatoire', 'confirmé', 'vérifié', 'scientifique', 'officiel', 'AMS'],
              responses: ['Oui ! L\'American Meteor Society a enregistré le bolide dans sa base de données le lendemain matin. Avec l\'heure et les coordonnées.', 'J\'ai vérifié sur le site de l\'American Meteor Society : le bolide est référencé avec plus de 200 signalements de témoins différents.'],
              revealsEvidence: 2 },
            { id: 'autres', suggested: ['D\'autres personnes ont filmé la même chose ?', 'Il y a d\'autres vidéos ?'],
              keywords: ['autres', 'vidéos', 'personnes', 'filmé', 'témoins', 'différents'],
              responses: ['Au moins 5 autres vidéos ont été postées par des gens à différents endroits de Lagos. Des angles complètement différents, impossible à truquer.', 'Plusieurs vidéos sous des angles différents. Un trucage nécessiterait de coordonner des dizaines de personnes dans toute la ville !'],
              revealsEvidence: null },
            { id: 'commentaires', suggested: ['Pourquoi les gens disent que c\'est fake ?', 'Les commentaires "FAKE" vous affectent ?'],
              keywords: ['commentaires', 'fake', 'faux', 'cgi', 'montage', 'croient'],
              responses: ['Les gens sont tellement habitués aux fakes qu\'ils ne croient plus rien, même quand c\'est vrai. C\'est ironique et un peu triste.', 'Ça me rend triste. Tout le monde est devenu tellement méfiant qu\'on refuse même de croire ses propres yeux.'],
              revealsEvidence: 1 },
            { id: 'bolide', suggested: ['C\'est quoi exactement un bolide ?', 'Les météores, c\'est fréquent ?'],
              keywords: ['bolide', 'météore', 'étoile filante', 'fréquent', 'commun', 'naturel'],
              responses: ['Un bolide c\'est un météore très brillant. Plus brillant que Vénus. C\'est rare de les filmer mais ça arrive régulièrement, plusieurs fois par an dans le monde.', 'Des météores, il en tombe chaque nuit ! Mais les bolides (les très brillants), c\'est plus rare. On en répertorie quelques centaines par an dans le monde.'],
              revealsEvidence: null }
        ],
        evidence: [
            { id: 'e1', title: 'Vidéo du bolide (métadonnées)', type: '', typeLabel: 'Vidéo',
              content: ' VIDÉO BRUTE — Grace Okafor\n━━━━━━━━━━━━━━━━━━\nDurée : 8 secondes\nDate : 12/08/2026, 22:43:17 UTC+1\nGPS : 6.4541°N, 3.3947°E (Lagos)\nAppareil : Samsung Galaxy A54\nFormat : MP4 original, non édité\n\n Métadonnées cohérentes et intactes\n Pas de trace d\'édition\n GPS correspond à Lagos',
              description: 'La vidéo originale contient des métadonnées complètes et cohérentes (GPS, heure, appareil). Aucune trace d\'édition n\'a été détectée.' },
            { id: 'e2', title: 'Commentaires "FAKE" sous la vidéo', type: '', typeLabel: 'Capture d\'écran',
              content: ' COMMENTAIRES SÉLECTIONNÉS\n━━━━━━━━━━━━━━━━━━\n@SkepticPro : « LOL fake 100%. CGI basique. »\n@TruthHunter : « ENCORE un montage. Internet est rempli de menteurs. »\n@WakeUp2026 : « On se fait manipuler, RIEN n\'est réel de nos jours. »\n@RealTalkNg : « Les gens partagent n\'importe quoi pour le buzz. »\n\n️ AUCUN de ces commentaires n\'apporte de PREUVE que c\'est fake\n️ Le rejet est basé sur un « sentiment » pas sur une vérification\n️ Dire « c\'est fake » sans preuve = aussi un biais',
              description: 'Les commentaires crient au fake SANS AUCUNE PREUVE. Dire « c\'est faux » par réflexe, sans vérifier, est aussi une forme de biais — le scepticisme excessif.' },
            { id: 'e3', title: 'Rapport American Meteor Society', type: '', typeLabel: 'Document',
              content: ' AMERICAN METEOR SOCIETY — Rapport #4892-2026\n━━━━━━━━━━━━━━━━━━\nÉvénement : Bolide sur le Nigeria\nDate : 12/08/2026, 21:43 UTC\nMagnitude estimée : -8 (très brillant)\nSignalements : 214 témoins\nZone : Lagos et environs\n\nStatut :  CONFIRMÉ\n\n« Bolide de grande magnitude observé par plus de 200 témoins indépendants. »',
              description: 'L\'American Meteor Society, organisme scientifique reconnu, a confirmé l\'observation du bolide avec 214 signalements indépendants.' }
        ],
        correctTechniques: ['scepticisme-excessif'],
        techniqueChoices: ['scepticisme-excessif', 'video-hors-contexte', 'source-non-fiable', 'appel-emotion', 'mise-en-scene', 'aucune'],
        feedback: {
            perfect: 'Bravo, détective ! C\'est le dossier le plus difficile. La vidéo est VRAIE, confirmée par un observatoire. La seule « manipulation » ici vient des gens qui crient FAKE sans vérifier. Le scepticisme excessif est aussi un biais !',
            good: 'Bien vu ! Ce dernier dossier renverse tout. Être critique ne veut pas dire tout rejeter. Le scepticisme excessif est aussi dangereux que la crédulité.',
            partial: 'Attention ! Ce dossier est un piège final. La vidéo est AUTHENTIQUE. Le seul biais ici est le scepticisme excessif des commentateurs.',
            poor: 'Vous êtes tombé dans le piège final ! La vidéo est vraie, confirmée scientifiquement. Crier « FAKE » sans preuve est AUSSI de la désinformation. C\'est la leçon ultime.'
        },
        lesson: ' LEÇON FINALE : Être un bon détective de l\'info, ce n\'est pas TOUT rejeter ni TOUT accepter. C\'est VÉRIFIER avant de juger. Le scepticisme excessif — rejeter automatiquement ce qui paraît « trop beau » ou « trop spectaculaire » — est AUSSI un biais cognitif. La vérité mérite le même effort de vérification que le mensonge.',
        badge: { name: 'Maître Détective', icon: '' }
    }
);
