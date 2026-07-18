const replacements: ReadonlyArray<readonly [string, string]> = [
  ['href="#demo-video">Produit', 'href="#demo-video">Démo'],
  ['href="#process-pronostics">Process', 'href="#modules">Analyses'],
  ['href="#resultats">Résultats', 'href="#resultats">Bénéfices'],
  ['>Essayer Xerius</a>', '>Commencer gratuitement</a>'],
  ['>Créer un compte</a>', '>Commencer gratuitement</a>'],

  ["Votre hub esport CS2", "Le cockpit de la scène CS2"],
  ["Tous les <em>matchs.</em>", "Suis le <em>match.</em>"],
  ["Tous les <em>résultats.</em>", "Comprends ce qui <em>se joue.</em>"],
  [
    'Suivez tous les matchs, résultats et statistiques<br class="cs-hero-desktop-break"> de la scène compétitive CS2.',
    'Le live, le score, le veto, le map pool et les infos d’équipe,<br class="cs-hero-desktop-break"> réunis au même endroit. Tu regardes le BO. Xerius t’aide à ne pas en perdre le fil.',
  ],
  [
    '<a class="cs-hero-action primary" href="#matchs"><span>Voir les matchs</span>',
    '<a class="cs-hero-action primary" href="#pricing"><span>Commencer gratuitement</span>',
  ],
  [
    '<a class="cs-hero-action secondary" href="#resultats"><span>Voir les résultats</span>',
    '<a class="cs-hero-action secondary" href="#demo-video"><span>Voir la démo</span>',
  ],

  ["Diagnostic de terrain", "Le problème"],
  ["Tu as les infos.", "Le match est lancé."],
  ["Mais elles arrivent", "Tes infos sont encore"],
  ["Dans le désordre.", "dans six onglets."],
  [
    "Sur CS2, le problème arrive au moment précis où tu dois décider :<br class=\"jsx-c9a006581ec2a711\">trop de sources, trop de signaux, pas assez de contexte relié.",
    "Le stream tourne, les stats sont ailleurs et Discord défile déjà.<br class=\"jsx-c9a006581ec2a711\">Quand le BO bascule en cinq rounds, tu recoles encore les morceaux.",
  ],
  ["Analyse active", "Pendant le live"],
  ["Diagnostic actuel", "Ce qui te fait décrocher"],
  ["Trop d’onglets ouverts", "Trop d’onglets à suivre"],
  ["Signaux non reliés", "Un score sans explication"],
  ["Timing difficile à lire", "L’explication arrive trop tard"],
  ["Lecture fragmentée", "Le fil du match se perd"],
  ["Sources dispersées", "Trop de sources"],
  ["Contexte incomplet", "Le score ne suffit pas"],
  ["Signal retardé", "L’info arrive trop tard"],
  ["Décision brouillée", "Trop de choses à suivre"],
  [
    "Tu ouvres</span><span class=\"jsx-c9a006581ec2a711\">trop d’onglets",
    "Tu jongles entre</span><span class=\"jsx-c9a006581ec2a711\">les onglets",
  ],
  [
    "Le score ne</span><span class=\"jsx-c9a006581ec2a711\">raconte pas la</span><span class=\"jsx-c9a006581ec2a711\">game",
    "Le score dit</span><span class=\"jsx-c9a006581ec2a711\">où on en est,</span><span class=\"jsx-c9a006581ec2a711\">pas pourquoi",
  ],
  [
    "Les signaux</span><span class=\"jsx-c9a006581ec2a711\">arrivent trop tard",
    "Tu comprends</span><span class=\"jsx-c9a006581ec2a711\">le tournant après coup",
  ],
  [
    "Tu ne sais pas</span><span class=\"jsx-c9a006581ec2a711\">quoi garder",
    "Tu ne sais plus</span><span class=\"jsx-c9a006581ec2a711\">quoi regarder",
  ],
  [
    "Stream, HLTV, Discord, stats, tweets, calendrier : tout existe, mais rien n'arrive dans le bon ordre quand le match commence.",
    "HLTV pour les stats, Twitch pour le stream, Discord pour les réactions, le calendrier à côté. Chaque source est utile, mais tout reste séparé.",
  ],
  [
    "Un 13-9 ne dit pas quelle éco a cassé, quel side a pris l'avantage, ni pourquoi une map a soudainement basculé.",
    "Un 13–9 ne te dit pas quelle économie a craqué, quel side a pris le dessus ni quel round a retourné la map.",
  ],
  [
    "Quand tout le monde parle déjà du spot, tu n'es plus en avance. Il te faut le contexte avant que le bruit explose.",
    "Le veto tombe, une line-up change, un joueur prend feu… Souvent, tu ne le vois qu’une fois que tout le monde en parle.",
  ],
  [
    "Forme récente, map pool, line-up, côté fort, momentum : les pièces sont là, mais elles ne forment pas encore une lecture claire.",
    "Forme, map pool, line-up, économie, momentum : tout compte, mais pas au même moment. Sans ordre clair, tu ne sais plus ce qui compte vraiment.",
  ],
  ["Notre promesse", "Ce que fait Xerius"],
  [
    "On connecte les bonnes données.<br class=\"jsx-c9a006581ec2a711\">Au bon moment. Pour les bonnes décisions.",
    "Le score te dit où en est le match.<br class=\"jsx-c9a006581ec2a711\">Xerius t’aide à comprendre comment il en est arrivé là.",
  ],
  ["Données fiables", "Le live, le score"],
  ["et centralisées", "et les stats réunis"],
  ["Analyse en temps réel", "Ce qui explique"],
  ["et contextualisée", "les rounds clés"],
  ["Lecture claire,", "Les moments clés"],
  ["action rapide", "faciles à retrouver"],

  ["Démo produit Xerius", "Comment ça marche"],
  ["Démo en action", "Un BO, de bout en bout"],
  ["Regarde Xerius ", "Avant le BO. "],
  ["lire un match ", "Pendant le live. "],
  ["de bout en bout.", "Après la série."],
  [
    "La démo montre comment la plateforme relie le prono, le live, le cast, les heatmaps et le suivi de décision sans transformer l’écran en tableur.",
    "La démo commence avant le premier round et se termine au débrief. Tu vois le map pool, le live et les moments clés au même endroit.",
  ],
  [
    "Favori, map pool, confiance et risque sont posés avant le live.",
    "Forme récente, map pool, line-up et veto : tu sais ce qu’il faut surveiller avant le premier round.",
  ],
  [
    "Le stream, le score et les signaux restent dans le même champ de vision.",
    "Le stream reste au centre. Le score, l’économie et les changements importants restent visibles autour.",
  ],
  [
    "Heatmaps, rounds clés et décisions restent consultables à froid.",
    "Les rounds clés, les heatmaps et le résumé restent disponibles sans te retaper toute la VOD.",
  ],

  ["03 / Résultats visibles", "03 / Ce que ça change"],
  ["Ce que tu gagnes, ce n'est pas une promesse. ", "Tu cherches moins. "],
  ["C'est une lecture plus propre.", "Tu comprends mieux ce que tu regardes."],
  [
    "Xerius ne decide pas a ta place. Il rend le contexte lisible assez tot pour que tu comprennes pourquoi un signal merite ton attention.",
    "Xerius ne remplace ni le stream ni ton jugement. Il remet simplement les stats, les infos d’équipe et les moments clés autour du match, au moment où tu en as besoin.",
  ],
  ["Lecture plus rapide", "Tu gardes le fil"],
  [
    "Les signaux importants remontent avant que tu te perdes dans les onglets.",
    "Line-up, économie, changement de map : tu as l’essentiel sous les yeux sans quitter le live.",
  ],
  ["Risque plus lisible", "Tu sais pourquoi"],
  [
    "Chaque prono affiche ce qui renforce ou fragilise la lecture.",
    "Un pronostic sans explication ne sert pas à grand-chose. Xerius montre ce qui va dans son sens, ce qui va contre et ce qui peut encore changer.",
  ],
  ["Analyse reutilisable", "Tu peux y revenir"],
  [
    "Les rounds cles, heatmaps et decisions restent disponibles apres la serie.",
    "Une fois le BO terminé, les rounds clés, les heatmaps et le résumé restent disponibles. Pratique pour débriefer sans revoir deux heures de replay.",
  ],

  ["04 / Modules principaux", "04 / Au cœur de Xerius"],
  ["Deux modules pour mieux comprendre", "Deux façons d’analyser"],
  ["chaque match.", "le même BO."],
  [
    "Analyse d’un côté. Pronostic expliqué de l’autre. Même logique, même cockpit, même contexte CS2.",
    "Le module Analyse raconte le match. Le module Pronostic montre le scénario le plus solide et ce qui peut le faire tomber.",
  ],
  ["Analyse complète du match", "Analyse du match"],
  [
    "Comprends rapidement la dynamique d’un BO : map pool, forme récente, face-à-face, côté fort, joueurs à surveiller et moments qui peuvent faire basculer la série.",
    "Avant le BO, retrouve la forme, le map pool, les face-à-face et les joueurs à surveiller. Pendant et après la série, repère les rounds clés.",
  ],
  ["Rounds pivot<", "Rounds clés<"],
  ["Pronostic expliqué", "Pronostic expliqué"],
  [
    "Lis un prono avec son niveau de confiance, son risque et les raisons concrètes : pick de map, momentum, line-up, value potentielle et signaux faibles.",
    "Un favori seul ne dit pas grand-chose. Xerius affiche le niveau de confiance, les arguments pour, les arguments contre et ce qui peut encore changer pendant le BO.",
  ],
  ["Prono principal", "Scénario étudié"],
  ["Score de confiance", "Niveau de confiance"],
  ["Explication IA", "Arguments pour et contre"],
  ["Avertissement clair", "Points de vigilance"],

  ["06 / Retours utilisateurs", "06 / Cas d’usage"],
  ["Des utilisateurs qui lisent mieux les matchs, ", "Chacun suit CS2 "],
  ["pas des slogans.", "à sa façon."],
  [
    "Les retours parlent de préparation, de clarté et de temps gagné quand tout ce qui compte autour du BO reste au même endroit.",
    "Tu peux venir pour regarder un live, préparer un contenu, revoir un BO ou étudier un adversaire. Tu n’as simplement pas besoin des mêmes infos dans chaque cas.",
  ],

  ["Choisis ton accès ", "Commence gratuitement. "],
  ["Xerius.</span>", "Passe à Pro quand tu en as besoin.</span>"],
  [
    "Gratuit pour suivre. Pro pour lire plus proprement. Expert pour débloquer toute la lecture CS2.",
    "Tu peux déjà suivre les matchs sans payer. Pro ajoute les pronostics expliqués, les analyses et ton historique. Expert va plus loin avec les heatmaps et les moments clés.",
  ],
  ["Pour suivre la scène et découvrir Xerius.", "Pour consulter les matchs, lancer les streams et prendre Xerius en main sans payer."],
  ["Accès découverte", "L’essentiel pour suivre la scène"],
  ["Actu CS2", "Actualités CS2"],
  ["Stats simples", "Statistiques essentielles"],
  ["Rejoindre Xerius", "Commencer gratuitement"],
  [
    "Pour débloquer les outils premium avec limites mensuelles.",
    "Pour suivre plusieurs BO chaque semaine avec les pronostics expliqués, les notifications et ton historique sous la main.",
  ],
  ["86 € / an · -20%", "86 € / an · soit 7,17 € par mois"],
  ["Tout le Gratuit", "Tout le plan Gratuit"],
  ["Pronostics limités", "Pronostics expliqués chaque mois"],
  ["Analyses simples limitées", "Analyses essentielles chaque mois"],
  ["Notifications matchs", "Notifications de match"],
  ["Portefeuille", "Historique personnel"],
  ["Passer Pro", "Choisir Pro"],
  ["Populaire", "Le plus complet"],
  ["Pour ceux qui veulent toute la lecture Xerius, sans limite.", "Pour préparer et débriefer les BO avec les analyses complètes, les heatmaps et les moments clés."],
  ["240 € / an · -20%", "240 € / an · soit 20 € par mois"],
  ["Tout le Pro", "Tout le plan Pro"],
  ["Pronostics illimités", "Pronostics sans limite"],
  ["Analyses complètes", "Analyses complètes"],
  ["Discord premium", "Discord premium"],
  [
    "Les pronostics sont des analyses d’aide à la décision. Aucun résultat n’est garanti.",
    "Une analyse peut se tromper : un changement de line-up, un veto inattendu ou un joueur en feu peuvent faire mentir les tendances. Aucun résultat n’est garanti.",
  ],

  ["Des réponses claires ", "Ce qu’il faut savoir "],
  ["avant de commencer.</span>", "avant de commencer.</span>"],
  [
    "Xerius parle de lecture CS2, de contexte et de suivi. Pas de promesse magique, pas de casino caché.",
    "Voici concrètement ce que fait Xerius, ce qu’il ne fait pas et ce que chaque offre inclut.",
  ],

  ["09 / Décision plus claire", "09 / Prochain BO"],
  ["Prêt à lire tes matchs CS2 avec ", "Ton prochain BO mérite mieux "],
  ["plus de précision ?", "que six onglets ouverts."],
  [
    "Centralise les infos, comprends les signaux et garde une trace propre de tes décisions.",
    "Commence gratuitement, ouvre le match qui t’intéresse et vois si Xerius te fait gagner du temps dès la première map.",
  ],
  [">Commencer maintenant</a>", ">Commencer gratuitement</a>"],
  [">Voir les modules</a>", ">Voir Xerius en action</a>"],
  [
    "Analyse CS2. Aucun dépôt, aucun retrait, aucune promesse de résultat.",
    "Xerius rassemble l’information et l’analyse CS2. Aucune mise, aucun dépôt, aucun retrait.",
  ],
];

export function rewriteLandingCopy(source: string) {
  return replacements.reduce((html, [currentText, nextText]) => html.replaceAll(currentText, nextText), source);
}
