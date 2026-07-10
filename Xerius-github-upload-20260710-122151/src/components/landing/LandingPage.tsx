"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const navLinks = [
  ["Accueil", "#"],
  ["Matchs", "#matchs"],
  ["Équipes", "#modules"],
  ["Classements", "#resultats"],
  ["Tournois", "#analyses"],
  ["Actualités", "#faq"],
];

const upcomingMatches = [
  {
    first: { name: "FaZe", mark: "FZ", tone: "red" },
    second: { name: "NAVI", mark: "NV", tone: "yellow" },
    day: "Auj.",
    time: "17:00",
  },
  {
    first: { name: "G2", mark: "G2", tone: "white" },
    second: { name: "Vitality", mark: "VT", tone: "yellow" },
    day: "Auj.",
    time: "20:30",
  },
  {
    first: { name: "ENCE", mark: "EN", tone: "gold" },
    second: { name: "MOUZ", mark: "MZ", tone: "red" },
    day: "Demain",
    time: "15:00",
  },
];

const problems = [
  {
    code: "01",
    category: "Sources dispersées",
    title: ["Tu ouvres", "trop d’onglets"],
    copy: "Stream, HLTV, Discord, stats, tweets, calendrier : tout existe, mais rien n'arrive dans le bon ordre quand le match commence.",
    status: "Signal à clarifier",
    image: "/assets/xerius/card1.PNG",
  },
  {
    code: "02",
    category: "Contexte incomplet",
    title: ["Le score ne", "raconte pas la", "game"],
    copy: "Un 13-9 ne dit pas quelle éco a cassé, quel side a pris l'avantage, ni pourquoi une map a soudainement basculé.",
    status: "Signal à clarifier",
    image: "/assets/xerius/card2.PNG",
  },
  {
    code: "03",
    category: "Signal retardé",
    title: ["Les signaux", "arrivent trop tard"],
    copy: "Quand tout le monde parle déjà du spot, tu n'es plus en avance. Il te faut le contexte avant que le bruit explose.",
    status: "Signal à clarifier",
    image: "/assets/xerius/card3.PNG",
  },
  {
    code: "04",
    category: "Décision brouillée",
    title: ["Tu ne sais pas", "quoi garder"],
    copy: "Forme récente, map pool, line-up, côté fort, momentum : les pièces sont là, mais elles ne forment pas encore une lecture claire.",
    status: "Priorité floue",
    image: "/assets/xerius/card4.PNG",
  },
];

const testimonials = [
  ["RK", "Romain K.", "Joueur Faceit 10", "Je check les matchs à venir sans ouvrir quinze onglets. Le niveau de confiance m’aide surtout à savoir quand ne rien tenter."],
  ["MS", "Maya S.", "Créatrice contenu CS2", "Les analyses après match sont parfaites pour retrouver les rounds clés et préparer mes threads sans raconter n’importe quoi."],
  ["NL", "Nico L.", "Manager d’équipe amateur", "Pour suivre nos adversaires, les maps fortes et les profils joueurs, c’est beaucoup plus propre qu’un tableur éclaté."],
  ["AD", "Alex D.", "Fan esport", "J’aime le côté cockpit : stream, contexte, prono et portefeuille dans le même endroit. C’est lisible."],
];

const featureSteps = [
  {
    step: "01 / 06",
    title: "Favoris",
    body: "Sauvegarde les matchs CS2 importants et retrouve-les avant le BO sans fouiller le calendrier.",
    detail:
      "Les favoris servent à préparer ta soirée CS2. Tu marques les rencontres qui comptent, Xerius les remonte avec leur priorité, leur niveau de confiance et les signaux déjà disponibles. L’objectif est simple : ne plus rater une game intéressante parce qu’elle était noyée dans le calendrier.",
    benefit: "Prioriser les games à suivre",
    rows: [["Vitality vs NAVI", "Priorité haute", "82%"], ["G2 vs FaZe", "Risque modéré", "71%"], ["Spirit vs MOUZ", "À surveiller", "64%"]],
  },
  {
    step: "02 / 06",
    title: "Live & casts",
    body: "Retrouve le stream, le score, la map en cours et les infos utiles pendant le match.",
    detail:
      "Pendant le match, tu gardes le cast, la map en cours, le score et les signaux de momentum dans le même champ de vision. Xerius ne remplace pas le stream : il donne le contexte autour, pour comprendre pourquoi un round pèse plus qu’un autre.",
    benefit: "Suivre sans courir partout",
    rows: [["Map live", "Mirage - CT side", "8-6"], ["Cast FR", "Disponible", "Live"], ["Momentum", "Eco cassée", "T"]],
  },
  {
    step: "03 / 06",
    title: "Pronostics",
    body: "Lis le favori, la confiance, le risque et les raisons concrètes avant de prendre une décision.",
    detail:
      "Le prono n’est pas juste un nom d’équipe. Il affiche le favori, la confiance, le risque, la value potentielle et les facteurs qui pèsent vraiment : map pool, forme récente, line-up, côté fort, dynamique du BO. Tu comprends le raisonnement avant de décider.",
    benefit: "Comprendre le signal",
    rows: [["Prono principal", "Vitality ML", "82%"], ["Risque", "Moyen", "A"], ["Value", "Active", "+"]],
  },
  {
    step: "04 / 06",
    title: "Heatmaps",
    body: "Visualise les zones qui reviennent : entry, retakes, timings, couloirs fragiles et positions fortes.",
    detail:
      "Les heatmaps rendent visibles les habitudes que le score ne raconte pas. Tu vois où une équipe prend l’entry, quels sites tiennent mal, quels couloirs se répètent et où les retakes deviennent coûteux. C’est la partie visuelle de l’analyse.",
    benefit: "Voir ce que le score cache",
    rows: [["Entry T", "Mid / B short", "Fort"], ["Retakes", "A faible", "42%"], ["Clutches", "B site", "3"]],
  },
  {
    step: "05 / 06",
    title: "Portefeuille",
    body: "Suis tes décisions passées, ton hit rate, ton ROI fictif et les spots où tu forces trop.",
    detail:
      "Le portefeuille sert à garder une trace froide. Tu vois tes décisions passées, ton hit rate, tes séries, tes erreurs fréquentes et les spots où tu suis trop la hype. Même sans mise sur Xerius, tu peux mesurer la qualité de ta lecture.",
    benefit: "Garder une trace froide",
    rows: [["Hit rate", "61%", "+4"], ["ROI suivi", "+7.4%", "30j"], ["Erreur type", "Overbet favoris", "!"]],
  },
  {
    step: "06 / 06",
    title: "Discord",
    body: "Rejoins les discussions utiles autour des matchs, sans mélanger hype, troll et vraie analyse.",
    detail:
      "Discord garde la partie communautaire, mais Xerius la relie au contexte. Tu arrives dans les discussions avec la map, le prono, les signaux et les limites déjà sous les yeux. Moins de bruit, plus de lecture partagée.",
    benefit: "Parler avec du contexte",
    rows: [["Channel", "#mirage-live", "Actif"], ["Votes", "184 avis", "82%"], ["Signal", "Line-up OK", "✓"]],
  },
];

const plans = [
  {
    name: "Gratuit",
    description: "Pour suivre la scène et découvrir Xerius.",
    price: "0 €",
    cta: "Rejoindre Xerius",
    features: ["Actu CS2", "Calendrier des matchs", "Streams et casts", "Stats simples", "Discord public"],
  },
  {
    name: "Pro",
    description: "Pour débloquer les outils premium avec limites mensuelles.",
    price: "9 €",
    year: "86 € / an · -20%",
    cta: "Passer Pro",
    features: ["Tout le Gratuit", "Pronostics limités", "Analyses simples limitées", "Notifications matchs", "Portefeuille"],
  },
  {
    name: "Expert",
    description: "Pour ceux qui veulent toute la lecture Xerius, sans limite.",
    price: "25 €",
    year: "240 € / an · -20%",
    cta: "Choisir Expert",
    popular: true,
    features: ["Tout le Pro", "Pronostics illimités", "Analyses complètes", "Heatmaps", "Moments clés", "Discord premium"],
  },
];

const faqs = [
  ["Xerius prend des paris ?", "Non. Xerius ne prend aucune mise, aucun dépôt et aucun retrait. C’est une plateforme d’analyse et de suivi."],
  ["Les pronostics sont garantis ?", "Non. Un prono reste une lecture de contexte : forme, maps, line-up, niveau de confiance et risque."],
  ["À quoi sert le portefeuille ?", "Il sert à suivre tes décisions, repérer tes erreurs récurrentes et garder une lecture plus froide dans le temps."],
  ["C’est fait pour les débutants ?", "Oui. Les écrans restent lisibles, mais tu peux aller plus loin avec les stats, heatmaps et analyses complètes."],
  ["Pourquoi Discord ?", "Parce qu’une partie de la lecture CS2 se construit en communauté, mais Xerius garde les signaux structurés."],
];

function ButtonLink({
  children,
  variant = "primary",
  href = "#pricing",
}: Readonly<{ children: ReactNode; variant?: "primary" | "secondary"; href?: string }>) {
  return (
    <a
      href={href}
      className={
        variant === "primary"
          ? "inline-flex h-12 items-center justify-center rounded-[7px] bg-[#218BFF] px-5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(33,139,255,0.29)] transition hover:-translate-y-0.5 hover:bg-[#39A0FF]"
          : "inline-flex h-12 items-center justify-center rounded-[7px] border border-[#1C3555] bg-[#0B1B31] px-5 text-sm font-extrabold text-[#DDE7F6] transition hover:border-[#68B6FF]/70 hover:text-white"
      }
    >
      {children}
    </a>
  );
}

function Eyebrow({ children }: Readonly<{ children: ReactNode }>) {
  void children;
  return null;
}

function SectionTitle({
  eyebrow,
  title,
  copy,
  tone = "light",
}: Readonly<{ eyebrow: string; title: string; copy?: string; tone?: "light" | "dark" }>) {
  const titleColor = tone === "dark" ? "text-[#06111F] [text-shadow:none]" : "text-white";
  const copyColor = tone === "dark" ? "text-[#334155] [text-shadow:none]" : "text-[#C4D2E6]";

  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`font-heading text-[clamp(2.6rem,5vw,4.6rem)] font-black leading-[0.94] tracking-[-0.045em] ${titleColor}`}>
        {title}
      </h2>
      {copy ? <p className={`mt-5 max-w-2xl text-base leading-8 md:text-lg ${copyColor}`}>{copy}</p> : null}
    </div>
  );
}

function Brand() {
  return (
    <a href="#" className="flex items-center gap-2">
      <span className="font-heading text-2xl font-black tracking-[-0.04em]">
        <span className="text-[#FF7A18]">X</span>erius
      </span>
    </a>
  );
}

function HeroArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  );
}

function HeroSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function HeroBrand() {
  return (
    <a className="cs-hero-brand" href="#" aria-label="Xerius — accueil">
      <span className="cs-hero-brand-word" aria-hidden="true">
        <span className="cs-hero-brand-x">X</span>
        <span className="cs-hero-brand-rest">ERIUS</span>
      </span>
    </a>
  );
}

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="cs-hero-header">
      <div className="cs-hero-container cs-hero-header-grid">
        <HeroBrand />
        <nav className="cs-hero-desktop-nav" aria-label="Navigation principale">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className={label === "Accueil" ? "active" : undefined}>{label}</a>
          ))}
        </nav>
        <div className="cs-hero-header-actions">
          <button className="cs-hero-search" type="button" aria-label="Rechercher"><HeroSearchIcon /></button>
          <a className="cs-hero-login" href="#login">Se connecter</a>
          <button
            className="cs-hero-menu-button"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="cs-hero-mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav
        id="cs-hero-mobile-navigation"
        className={`cs-hero-mobile-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="Navigation mobile"
      >
        <div className="cs-hero-container">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className={label === "Accueil" ? "active" : undefined}>{label}</a>
          ))}
          <a className="cs-hero-mobile-login" href="#login">Se connecter</a>
        </div>
      </nav>
    </header>
  );
}

function HeroAction({ children, secondary = false, href }: Readonly<{ children: ReactNode; secondary?: boolean; href: string }>) {
  return (
    <a className={`cs-hero-action ${secondary ? "secondary" : "primary"}`} href={href}>
      <span>{children}</span>
      <HeroArrow />
    </a>
  );
}

function Hero() {
  return (
    <section className="cs-hero-shell bg-hero" aria-labelledby="cs-hero-title">
      <div className="cs-hero-background" aria-hidden="true" />
      <div className="cs-hero-overlay-horizontal" aria-hidden="true" />
      <div className="cs-hero-overlay-vertical" aria-hidden="true" />
      <div className="cs-hero-main">
        <div className="cs-hero-container cs-hero-content">
          <p className="cs-hero-kicker">Votre hub esport CS:GO</p>
          <h1 id="cs-hero-title">
            <span>Tous les <em>matchs.</em></span>
            <span>Tous les <em>résultats.</em></span>
          </h1>
          <p className="cs-hero-copy">
            Suivez tous les matchs, résultats et statistiques<br className="cs-hero-desktop-break" /> de la scène compétitive CS:GO.
          </p>
          <div className="cs-hero-actions">
            <HeroAction href="#matchs">Voir les matchs</HeroAction>
            <HeroAction href="#resultats" secondary>Voir les résultats</HeroAction>
          </div>
        </div>
      </div>
      <div className="cs-hero-side-marker" aria-hidden="true">
        <i className="marker-dot" />
        <i className="marker-line marker-line-light" />
        <span>CSGO Esport</span>
        <i className="marker-line marker-line-orange" />
      </div>
      <TickerStrip />
    </section>
  );
}

function TeamLogo({ mark, tone }: Readonly<{ mark: string; tone: string }>) {
  return <span className={`cs-team-logo ${tone}`} aria-hidden="true">{mark}</span>;
}

function MatchCard({ match }: Readonly<{ match: (typeof upcomingMatches)[number] }>) {
  return (
    <article className="cs-match-card" aria-label={`${match.first.name} contre ${match.second.name}, ${match.day} à ${match.time}`}>
      <div className="cs-match-teams">
        <div className="cs-team"><TeamLogo mark={match.first.mark} tone={match.first.tone} /><span>{match.first.name}</span></div>
        <span className="cs-versus">VS</span>
        <div className="cs-team cs-team-away"><TeamLogo mark={match.second.mark} tone={match.second.tone} /><span>{match.second.name}</span></div>
      </div>
      <time className="cs-match-time"><span>{match.day}</span><strong>{match.time}</strong></time>
    </article>
  );
}

function TickerStrip() {
  return (
    <section className="cs-matches-strip" aria-label="Prochains matchs">
      <div className="cs-hero-container cs-matches-scroll">
        <div className="cs-matches-label"><span>Prochains matchs</span><i aria-hidden="true" /></div>
        {upcomingMatches.map((match) => <MatchCard key={`${match.first.name}-${match.second.name}`} match={match} />)}
        <a className="cs-all-matches" href="#matchs"><span>Voir tous les matchs</span><HeroArrow /></a>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-shell section-bg bg-social-proof">
      <div className="x-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-end">
          <SectionTitle
            eyebrow="Social proof"
            title="Des utilisateurs qui lisent mieux les matchs, pas des slogans."
            copy="Les retours parlent de préparation, de clarté et de temps gagné quand tout ce qui compte autour du BO reste au même endroit."
            tone="dark"
          />
          <div className="rounded-[14px] border border-[#1C3555] bg-[#0B1B31] p-5">
            <p className="font-data text-[11px] font-bold uppercase tracking-[0.18em] text-[#68B6FF]">Note moyenne</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="font-data text-4xl font-bold text-white">4.7</p>
              <p className="pb-1 text-sm font-semibold text-[#9FB0CA]">/ 5</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#9FB0CA]">128 avis issus de joueurs, viewers et créateurs CS2.</p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map(([initials, name, role, quote]) => (
            <article key={name} className="review-card">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-[#218BFF] font-data text-[11px] font-bold text-white">{initials}</div>
                <div>
                  <p className="font-heading font-bold text-[#071426]">{name}</p>
                  <p className="text-xs text-[#475569]">{role}</p>
                </div>
              </div>
              <p className="mt-4 text-[#FF9F43]">★★★★★</p>
              <p className="mt-4 text-sm leading-6 text-[#0A1220]">“{quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type ProblemIconName = "alert" | "chart" | "clock" | "crosshair" | "chevrons" | "zap" | "shield";

function ProblemIcon({ name, className = "" }: Readonly<{ name: ProblemIconName; className?: string }>) {
  const paths: Record<ProblemIconName, ReactNode> = {
    alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5" /><path d="M12 16.5h.01" /></>,
    chart: <><path d="M4 19V9" /><path d="M9 19V5" /><path d="M14 19v-7" /><path d="M19 19V3" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    crosshair: <><circle cx="12" cy="12" r="5" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></>,
    chevrons: <><path d="m7 7 5 5-5 5" /><path d="m13 7 5 5-5 5" /></>,
    zap: <path d="M13 2 5 14h7l-1 8 8-12h-7l1-8Z" />,
    shield: <><path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function ProblemSection() {
  const diagnosticItems: Array<{ icon: ProblemIconName; label: string }> = [
    { icon: "alert", label: "Trop d’onglets ouverts" },
    { icon: "chart", label: "Signaux non reliés" },
    { icon: "clock", label: "Timing difficile à lire" },
  ];

  const benefits: Array<{ icon: ProblemIconName; lines: [string, string] }> = [
    { icon: "crosshair", lines: ["Données fiables", "et centralisées"] },
    { icon: "zap", lines: ["Analyse en temps réel", "et contextualisée"] },
    { icon: "shield", lines: ["Lecture claire,", "action rapide"] },
  ];

  return (
    <section id="plateforme" className="problem-v2-section presentation-blue">
      <div className="problem-v2-container">
        <div className="problem-v2-intro-grid">
          <div className="problem-v2-intro-copy">
            <div className="problem-v2-index">
              <i aria-hidden="true"><span /></i>
              <strong>01</strong>
              <span aria-hidden="true" />
              <p>Diagnostic de terrain</p>
            </div>

            <h2>
              <span>Tu as les infos.</span>
              <span>Mais elles arrivent</span>
              <span>Dans le désordre.</span>
            </h2>

            <div className="problem-v2-lead">
              <i aria-hidden="true" />
              <p>
                Sur CS2, le problème arrive au moment précis où tu dois décider :<br />
                trop de sources, trop de signaux, pas assez de contexte relié.
              </p>
            </div>
          </div>

          <aside className="problem-v2-diagnostic" aria-label="Diagnostic actuel">
            <header>
              <div><span aria-hidden="true" />Analyse active</div>
              <p>STS / <strong>01</strong></p>
            </header>
            <div className="problem-v2-diagnostic-body">
              <h3>Diagnostic actuel</h3>
              <div className="problem-v2-diagnostic-list">
                {diagnosticItems.map((item) => (
                  <div key={item.label} className="problem-v2-diagnostic-row">
                    <div><ProblemIcon name={item.icon} /><span>{item.label}</span></div>
                    <i aria-hidden="true" />
                  </div>
                ))}
              </div>
              <footer><span>État</span><strong>Lecture fragmentée</strong></footer>
            </div>
          </aside>
        </div>

        <div className="problem-v2-grid">
          {problems.map((problem, index) => (
            <article
              key={problem.code}
              className="problem-v2-item"
              style={{ animationDelay: `${120 + index * 55}ms`, backgroundImage: `url(${problem.image})` }}
            >
              <header>
                <strong>{problem.code}</strong>
                <p>{problem.category}</p>
              </header>
              <div className="problem-v2-item-body">
                <h3>{problem.title.map((line) => <span key={line}>{line}</span>)}</h3>
                <i aria-hidden="true" />
                <p>{problem.copy}</p>
              </div>
              <footer className={index === 3 ? "is-emphasis" : undefined}>
                <ProblemIcon name="crosshair" />
                <span>{problem.status}</span>
              </footer>
            </article>
          ))}
        </div>

        <div className="problem-v2-promise">
          <div className="problem-v2-promise-main">
            <p><ProblemIcon name="chevrons" />Notre promesse</p>
            <h3>On connecte les bonnes données.<br />Au bon moment. Pour les bonnes décisions.</h3>
          </div>
          {benefits.map((benefit) => (
            <div key={benefit.lines[0]} className="problem-v2-benefit">
              <ProblemIcon name={benefit.icon} />
              <p><span>{benefit.lines[0]}</span><span>{benefit.lines[1]}</span></p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .problem-v2-section {
          --ink: #111b25;
          --ink-soft: #2b343e;
          --muted: #626b73;
          --orange: #ff681c;
          --line: rgba(17, 27, 37, 0.15);
          --line-light: rgba(17, 27, 37, 0.08);
          position: relative;
          overflow: hidden;
          padding: 112px 0 96px;
          background-color: #f8f7f4 !important;
          background-image: url("/assets/xerius/fondsection1.PNG") !important;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          color: var(--ink) !important;
        }

        .problem-v2-container {
          width: min(1420px, calc(100% - 96px));
          margin-inline: auto;
        }

        .problem-v2-intro-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(360px, 0.75fr);
          align-items: start;
          gap: 80px;
        }

        .problem-v2-intro-copy {
          animation: problem-copy-in 420ms ease-out both;
        }

        .problem-v2-index {
          display: flex;
          height: 24px;
          align-items: center;
          gap: 12px;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          text-transform: uppercase;
        }

        .problem-v2-index > i {
          display: grid;
          width: 18px;
          height: 18px;
          place-items: center;
          background: var(--ink);
        }

        .problem-v2-index > i span {
          width: 4px;
          height: 4px;
          background: var(--orange);
        }

        .problem-v2-index > strong {
          color: var(--orange) !important;
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
        }

        .problem-v2-index > span {
          width: 28px;
          height: 1px;
          background: var(--orange);
        }

        .problem-v2-index p {
          margin: 0;
          color: var(--muted) !important;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2.4px;
        }

        .problem-v2-intro-copy h2 {
          max-width: 780px;
          margin: 30px 0 0;
          color: var(--ink) !important;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: clamp(64px, 5.3vw, 84px);
          font-weight: 700;
          letter-spacing: -1px;
          line-height: 0.94;
          text-shadow: none !important;
          text-transform: uppercase;
        }

        .problem-v2-intro-copy h2 span {
          display: block;
          color: inherit !important;
        }

        .problem-v2-intro-copy h2 span:last-child {
          color: var(--orange) !important;
        }

        .problem-v2-lead {
          display: flex;
          max-width: 650px;
          gap: 20px;
          margin-top: 28px;
        }

        .problem-v2-lead > i {
          width: 2px;
          flex: 0 0 2px;
          background: var(--orange);
        }

        .problem-v2-lead p {
          margin: 0;
          color: #4b555f !important;
          font-family: var(--font-body), "Inter", sans-serif;
          font-size: 15px;
          line-height: 1.7;
          text-shadow: none !important;
        }

        .problem-v2-diagnostic {
          width: 100%;
          max-width: 380px;
          justify-self: end;
          border: 1px solid var(--line);
          background: #fbfaf7;
          animation: problem-panel-in 440ms 80ms ease-out both;
        }

        .problem-v2-diagnostic > header {
          display: flex;
          height: 50px;
          align-items: center;
          justify-content: space-between;
          padding-inline: 20px;
          background: var(--ink);
          color: #eef0f2;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .problem-v2-diagnostic > header div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .problem-v2-diagnostic > header div span {
          width: 7px;
          height: 7px;
          border: 1px solid var(--orange);
          transform: rotate(45deg);
        }

        .problem-v2-diagnostic > header p {
          margin: 0;
          color: #aab0b5 !important;
        }

        .problem-v2-diagnostic > header strong {
          color: var(--orange) !important;
          font-weight: 700;
        }

        .problem-v2-diagnostic-body {
          padding: 28px 22px 20px;
        }

        .problem-v2-diagnostic-body h3 {
          margin: 0 0 20px;
          color: var(--ink) !important;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 30px;
          font-weight: 700;
          line-height: 1;
          text-transform: uppercase;
        }

        .problem-v2-diagnostic-list {
          border-top: 1px solid var(--line);
        }

        .problem-v2-diagnostic-row {
          display: flex;
          min-height: 48px;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line);
        }

        .problem-v2-diagnostic-row > div {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .problem-v2-diagnostic-row :global(svg) {
          width: 21px;
          height: 21px;
          color: var(--orange);
        }

        .problem-v2-diagnostic-row span {
          color: var(--ink-soft) !important;
          font-family: var(--font-body), "Inter", sans-serif;
          font-size: 14px;
        }

        .problem-v2-diagnostic-row > i {
          width: 14px;
          height: 1px;
          background: #9da4aa;
        }

        .problem-v2-diagnostic-body footer {
          display: flex;
          justify-content: space-between;
          margin-top: 18px;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .problem-v2-diagnostic-body footer span {
          color: var(--muted) !important;
        }

        .problem-v2-diagnostic-body footer strong {
          color: var(--orange) !important;
        }

        .problem-v2-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
          margin-top: 78px;
          border: 1px solid var(--line);
        }

        .problem-v2-item {
          position: relative;
          min-height: 315px;
          border: 0 !important;
          border-radius: 0 !important;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          padding: 0 !important;
          box-shadow: none !important;
        }

        .problem-v2-item > header {
          display: flex;
          min-height: 50px;
          align-items: center;
          gap: 22px;
          padding-right: 20px;
        }

        .problem-v2-item > header strong {
          display: grid;
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          place-items: center;
          margin-left: 16px;
          background: var(--ink);
          color: var(--orange) !important;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 17px;
          font-weight: 700;
        }

        .problem-v2-item > header p {
          margin: 0;
          color: var(--muted) !important;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .problem-v2-item-body {
          padding: 18px 28px 66px;
        }

        .problem-v2-item-body h3 {
          max-width: 255px;
          margin: 0;
          color: var(--ink) !important;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 31px;
          font-weight: 700;
          line-height: 0.94;
          text-transform: uppercase;
        }

        .problem-v2-item-body h3 span {
          display: block;
          color: inherit !important;
        }

        .problem-v2-item-body > i {
          display: block;
          width: 20px;
          height: 2px;
          margin-top: 18px;
          background: var(--orange);
        }

        .problem-v2-item-body > p {
          max-width: 245px;
          margin: 20px 0 0;
          color: var(--muted) !important;
          font-family: var(--font-body), "Inter", sans-serif;
          font-size: 13.5px;
          line-height: 1.5;
        }

        .problem-v2-item > footer {
          position: absolute;
          right: 28px;
          bottom: 20px;
          left: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--orange) !important;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .problem-v2-item > footer :global(svg) {
          width: 17px;
          height: 17px;
          color: var(--orange);
          stroke: var(--orange);
        }

        .problem-v2-item > footer span {
          color: inherit !important;
        }

        .problem-v2-promise {
          display: grid;
          grid-template-columns: 1.55fr repeat(3, 0.85fr);
          min-height: 145px;
          margin-top: 24px;
          border: 0;
          background: transparent;
          box-shadow: none;
        }

        .problem-v2-promise-main {
          padding: 28px 42px;
          border: 0;
          background: transparent;
        }

        .problem-v2-promise-main > p {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 13px;
          color: var(--muted) !important;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .problem-v2-promise-main > p :global(svg) {
          width: 18px;
          color: var(--orange);
        }

        .problem-v2-promise-main h3 {
          max-width: 520px;
          margin: 0;
          color: var(--ink) !important;
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
          font-size: 29px;
          font-weight: 700;
          line-height: 0.98;
          text-transform: uppercase;
        }

        .problem-v2-benefit {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-inline: 34px;
          border-left: 1px solid var(--line);
          background: transparent;
        }

        .problem-v2-benefit :global(svg) {
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          color: var(--ink-soft);
          stroke-width: 1.25;
        }

        .problem-v2-benefit p {
          margin: 0;
          color: var(--ink-soft) !important;
          font-family: var(--font-body), "Inter", sans-serif;
          font-size: 13.5px;
          line-height: 1.55;
        }

        .problem-v2-benefit p span {
          display: block;
          color: inherit !important;
        }

        @keyframes problem-copy-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes problem-panel-in {
          from { opacity: 0; transform: translateX(14px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes problem-item-in {
          from { opacity: 0; transform: translateY(9px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1350px) {
          .problem-v2-intro-grid { gap: 54px; }
          .problem-v2-intro-copy h2 { font-size: clamp(60px, 5vw, 76px); }
          .problem-v2-item-body { padding-inline: 22px; }
          .problem-v2-item > footer { right: 22px; left: 22px; }
          .problem-v2-benefit { gap: 18px; padding-inline: 24px; }
          .problem-v2-benefit :global(svg) { width: 40px; height: 40px; flex-basis: 40px; }
        }

        @media (max-width: 1023px) {
          .problem-v2-section { padding-top: 88px; }
          .problem-v2-intro-grid { grid-template-columns: 1fr; }
          .problem-v2-diagnostic { max-width: 440px; justify-self: start; }
          .problem-v2-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 64px; }
          .problem-v2-promise { grid-template-columns: repeat(2, 1fr); }
          .problem-v2-promise-main { grid-column: 1 / -1; border-bottom: 1px solid var(--line); }
          .problem-v2-benefit { min-height: 130px; }
          .problem-v2-benefit:nth-child(4) { border-top: 1px solid var(--line); }
        }

        @media (max-width: 640px) {
          .problem-v2-section { padding: 72px 0 80px; }
          .problem-v2-container { width: calc(100% - 32px); }
          .problem-v2-index p { font-size: 11px; letter-spacing: 1.8px; }
          .problem-v2-intro-copy h2 { font-size: 48px; line-height: 0.94; }
          .problem-v2-lead p { font-size: 15px; }
          .problem-v2-lead p br { display: none; }
          .problem-v2-diagnostic { max-width: none; }
          .problem-v2-grid { grid-template-columns: 1fr; margin-top: 52px; }
          .problem-v2-item { min-height: 300px; }
          .problem-v2-promise { grid-template-columns: 1fr; }
          .problem-v2-promise-main { grid-column: auto; padding: 26px 24px; }
          .problem-v2-promise-main h3 { font-size: 27px; }
          .problem-v2-benefit {
            min-height: 112px;
            padding-inline: 24px;
            border-top: 1px solid var(--line);
            border-left: 0;
          }
          .problem-v2-benefit :global(svg) { width: 42px; height: 42px; flex-basis: 42px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .problem-v2-intro-copy,
          .problem-v2-diagnostic,
          .problem-v2-item { animation: none; }
        }
      `}</style>
    </section>
  );
}

function ModulesSection() {
  return (
    <section id="modules" className="presentation-blue section-shell section-bg bg-features-main">
      <div className="x-container">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Modules principaux</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl font-black leading-[0.94] tracking-[-0.045em] text-white md:text-5xl">
            Deux modules pour mieux comprendre chaque match.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#9FB0CA]">
            Analyse d’un côté. Pronostic expliqué de l’autre. Même logique, même cockpit, même contexte CS2.
          </p>
        </div>
        <div className="mt-14 space-y-20">
          <ModuleRow
            eyebrow="Module 01"
            title="Analyse complète du match"
            copy="Comprends rapidement la dynamique d’un BO : map pool, forme récente, face-à-face, côté fort, joueurs à surveiller et moments qui peuvent faire basculer la série."
            bullets={["Map pool", "Forme récente", "Face-à-face", "Joueurs clés", "Rounds pivot", "Contexte du BO"]}
          />
          <ModuleRow
            reverse
            eyebrow="Module 02"
            title="Pronostic expliqué"
            copy="Lis un prono avec son niveau de confiance, son risque et les raisons concrètes : pick de map, momentum, line-up, value potentielle et signaux faibles."
            bullets={["Prono principal", "Score de confiance", "Niveau de risque", "Facteurs clés", "Explication IA", "Avertissement clair"]}
          />
        </div>
      </div>
    </section>
  );
}

function ModuleRow({
  eyebrow,
  title,
  copy,
  bullets,
  reverse = false,
}: Readonly<{ eyebrow: string; title: string; copy: string; bullets: string[]; reverse?: boolean }>) {
  return (
    <div className={`grid gap-10 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <MockupPanel variant={reverse ? "prediction" : "analysis"} />
      <div className="max-w-xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-4 font-heading text-3xl font-black leading-tight text-white">{title}</h3>
        <p className="mt-4 text-base leading-8 text-[#9FB0CA]">{copy}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {bullets.map((bullet) => (
            <div key={bullet} className="flex items-center gap-3 text-sm font-semibold text-[#DDE7F6]">
              <span className="grid size-5 place-items-center rounded-full bg-[#218BFF] text-[10px] text-white">✓</span>
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupPanel({ variant }: Readonly<{ variant: "analysis" | "prediction" }>) {
  return (
    <div className="rounded-[18px] border border-[#DDE7F6]/70 bg-white p-4 shadow-[0_28px_62px_rgba(0,0,0,0.35)]">
      <div className="rounded-[14px] border border-slate-200 bg-white p-4 text-[#0A1220]">
        <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="h-3 w-28 rounded-full bg-[#218BFF]/25" />
          <span className="font-data text-[10px] font-bold text-[#218BFF]">{variant === "analysis" ? "ANALYSE" : "PRONO"}</span>
        </div>
        {variant === "analysis" ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="h-28 rounded-xl bg-[#0B1B31]" />
            <div className="h-28 rounded-xl bg-[#EAF2FF]" />
            <div className="h-28 rounded-xl bg-[#0B1B31]" />
            <div className="h-20 rounded-xl bg-[#EAF2FF] sm:col-span-2" />
            <div className="h-20 rounded-xl bg-[#0B1B31]" />
          </div>
        ) : (
          <div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="font-data text-[10px] font-bold uppercase text-[#475569]">Notre recommandation</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="font-heading text-3xl font-black text-[#0A1220]">Vitality ML</p>
                <p className="rounded-full bg-[#218BFF] px-3 py-1 font-data text-xs font-bold text-white">82%</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="h-20 rounded-xl bg-[#EAF2FF]" />
              <div className="h-20 rounded-xl bg-[#0B1B31]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MatchFlowSection() {
  const demoSteps = [
    {
      number: "01",
      title: "Avant le BO",
      body: "Favori, map pool, confiance et risque sont posés avant le live.",
      icon: "crosshair",
    },
    {
      number: "02",
      title: "Pendant le match",
      body: "Le stream, le score et les signaux restent dans le même champ de vision.",
      icon: "audio",
    },
    {
      number: "03",
      title: "Après la série",
      body: "Heatmaps, rounds clés et décisions restent consultables à froid.",
      icon: "snowflake",
    },
  ];

  return (
    <section id="pronostics" className="demo-section presentation-blue section-bg bg-demo">
      <div className="demo-section__container">
        <div className="demo-section__eyebrow">
          <span className="demo-section__eyebrow-number">02</span>
          <span className="demo-section__eyebrow-line" aria-hidden="true" />
          <span className="demo-section__eyebrow-label">Démo produit Xerius</span>
        </div>

        <div className="demo-section__grid">
          <div className="demo-section__media">
            <div className="demo-video">
              <video
                className="demo-video__element"
                src="/videos/xerius-demo.mp4"
                controls
                preload="metadata"
                playsInline
                aria-label="Démonstration de la plateforme Xerius"
              />
            </div>
          </div>

          <div className="demo-section__content">
            <p className="demo-section__content-label">Démo en action</p>

            <h2 className="demo-section__title">
              <span>{"Regarde Xerius "}</span>
              <span>{"lire un match "}</span>
              <span className="demo-section__title-accent">de bout en bout.</span>
            </h2>

            <p className="demo-section__description">
              La démo montre comment la plateforme relie le prono, le live, le cast, les heatmaps et le suivi de décision sans transformer l’écran en tableur.
            </p>
          </div>
        </div>

        <div className="demo-steps">
          {demoSteps.map((step) => (
            <article key={step.number} className="demo-step">
              <p className="demo-step__number">{step.number}</p>

              <div className="demo-step__icon" aria-hidden="true">
                {step.icon === "crosshair" ? (
                  <svg viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="9" />
                    <path d="M18 3v7M18 26v7M3 18h7M26 18h7" />
                    <circle cx="18" cy="18" r="2.2" className="demo-step__icon-accent" />
                  </svg>
                ) : null}
                {step.icon === "audio" ? (
                  <svg viewBox="0 0 36 36" fill="none">
                    <path d="M6 21v-6M12 26V10M18 30V6M24 25V11M30 21v-6" />
                    <path d="M18 6v4" className="demo-step__icon-accent" />
                  </svg>
                ) : null}
                {step.icon === "snowflake" ? (
                  <svg viewBox="0 0 36 36" fill="none">
                    <path d="M18 3v30M5 10.5l26 15M5 25.5l26-15M13.5 5.5 18 10l4.5-4.5M13.5 30.5 18 26l4.5 4.5M5.5 15.5l6.1-1.6-1.6-6M30.5 20.5l-6.1 1.6 1.6 6M5.5 20.5l6.1 1.6-1.6 6M30.5 15.5l-6.1-1.6 1.6-6" />
                    <circle cx="18" cy="18" r="2" className="demo-step__icon-accent" />
                  </svg>
                ) : null}
              </div>

              <div className="demo-step__copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>

              <span className="demo-step__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M14 7l5 5-5 5" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .demo-section {
          position: relative;
          padding: 68px 0 92px;
          overflow: hidden;
          background-color: #071426 !important;
          background-image: url("/assets/xerius/fondsection2.png") !important;
          background-position: center !important;
          background-size: cover !important;
          background-repeat: no-repeat !important;
        }

        .demo-section__container {
          position: relative;
          z-index: 1;
          width: min(1410px, calc(100% - 96px));
          margin-inline: auto;
        }

        .demo-section__eyebrow {
          display: flex;
          align-items: center;
          gap: 16px;
          min-height: 28px;
          margin-bottom: 70px;
        }

        .demo-section__eyebrow-number,
        .demo-section__eyebrow-label,
        .demo-section__content-label,
        .demo-section__title,
        .demo-step__number,
        .demo-step__copy h3 {
          font-family: var(--font-hero-heading), "Barlow Condensed", sans-serif;
        }

        .demo-section__eyebrow-number {
          font-size: 22px;
          line-height: 1;
          font-weight: 700;
          color: #ff681c;
        }

        .demo-section__eyebrow-line {
          width: 48px;
          height: 1px;
          background: #ff681c;
        }

        .demo-section__eyebrow-label {
          font-size: 13px;
          line-height: 1;
          font-weight: 600;
          letter-spacing: 2.4px;
          text-transform: uppercase;
          color: #aab3bd;
        }

        .demo-section__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(460px, 0.88fr);
          gap: clamp(56px, 5vw, 84px);
          align-items: start;
        }

        .demo-section__media {
          min-width: 0;
          animation: demo-media-in 520ms ease-out both;
        }

        .demo-video {
          position: relative;
          width: 100%;
          overflow: hidden;
          border: 1px solid rgba(80, 112, 148, 0.48);
          border-radius: 16px;
          background: #02060b;
        }

        .demo-video__element {
          display: block;
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          background: #02060b;
        }

        .demo-section__content {
          max-width: 590px;
          padding-top: 28px;
          animation: demo-content-in 560ms 80ms ease-out both;
        }

        .demo-section__content-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 28px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2.4px;
          text-transform: uppercase;
          color: #ff681c;
          text-shadow: none;
        }

        .demo-section__content-label::before,
        .demo-section__content-label::after {
          color: rgba(255, 104, 28, 0.72);
        }

        .demo-section__content-label::before {
          content: "[";
        }

        .demo-section__content-label::after {
          content: "]";
        }

        .demo-section__title {
          display: flex;
          flex-direction: column;
          max-width: 580px;
          margin: 0;
          font-size: clamp(64px, 5.3vw, 84px);
          line-height: 0.94;
          font-weight: 700;
          letter-spacing: -1px;
          text-transform: uppercase;
          color: #f2f3f4;
          text-shadow: none;
        }

        .demo-section__title-accent {
          color: #ff681c;
        }

        .demo-section__description {
          max-width: 555px;
          margin: 28px 0 0;
          font-family: var(--font-body), "Inter", sans-serif;
          font-size: 15px;
          line-height: 1.7;
          font-weight: 400;
          color: #aeb8c4;
          text-shadow: none;
        }

        .demo-steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 16px;
          margin-top: 52px;
        }

        .demo-step {
          min-height: 150px;
          height: 100%;
          display: grid;
          grid-template-columns: 36px 56px minmax(0, 1fr) 24px;
          align-items: center;
          gap: 14px;
          padding: 20px;
          border: 1px solid rgba(72, 105, 140, 0.48);
          border-radius: 13px;
          background: transparent;
          animation: demo-step-in 440ms ease-out both;
          transition:
            border-color 180ms ease,
            transform 180ms ease;
        }

        .demo-step:nth-child(1) {
          animation-delay: 180ms;
        }

        .demo-step:nth-child(2) {
          animation-delay: 280ms;
        }

        .demo-step:nth-child(3) {
          animation-delay: 380ms;
        }

        .demo-step:hover {
          transform: translateX(3px);
          border-color: rgba(255, 104, 28, 0.46);
        }

        .demo-step__number {
          margin: 0;
          font-size: 17px;
          line-height: 1;
          font-weight: 700;
          color: #ff681c;
          text-shadow: none;
        }

        .demo-step__icon {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(65, 98, 132, 0.42);
          border-radius: 50%;
          color: #f0f2f4;
        }

        .demo-step__icon svg {
          width: 34px;
          height: 34px;
          stroke: currentColor;
          stroke-width: 1.4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .demo-step__icon :global(.demo-step__icon-accent) {
          stroke: #ff681c;
        }

        .demo-step__copy h3 {
          margin: 0;
          font-size: 31px;
          line-height: 0.94;
          font-weight: 700;
          text-transform: uppercase;
          color: #f0f2f4;
        }

        .demo-step__copy p {
          max-width: none;
          margin: 8px 0 0;
          font-family: var(--font-body), "Inter", sans-serif;
          font-size: 13.5px;
          line-height: 1.5;
          color: #a6b0bc;
          text-shadow: none;
        }

        .demo-step__arrow {
          display: grid;
          place-items: center;
          color: #8190a0;
          transition:
            color 180ms ease,
            transform 180ms ease;
        }

        .demo-step__arrow svg {
          width: 24px;
          height: 24px;
          stroke: currentColor;
          stroke-width: 1.3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .demo-step:hover .demo-step__arrow {
          color: #ff681c;
          transform: translateX(4px);
        }

        @keyframes demo-media-in {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes demo-content-in {
          from {
            opacity: 0;
            transform: translateX(28px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes demo-step-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1350px) {
          .demo-section__title {
            font-size: clamp(60px, 5vw, 76px);
          }
        }

        @media (max-width: 1100px) {
          .demo-section__grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
            gap: 42px;
          }

          .demo-step {
            grid-template-columns: 30px 48px minmax(0, 1fr);
            gap: 12px;
            padding: 18px;
          }

          .demo-step__icon {
            width: 48px;
            height: 48px;
          }

          .demo-step__arrow {
            display: none;
          }

          .demo-step__copy h3 {
            font-size: 27px;
          }
        }

        @media (max-width: 900px) {
          .demo-section__grid {
            grid-template-columns: 1fr;
            gap: 52px;
          }

          .demo-section__content {
            max-width: 680px;
            padding-top: 0;
          }

          .demo-steps {
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 44px;
          }

          .demo-step {
            min-height: 122px;
            grid-template-columns: 44px 58px minmax(0, 1fr) 28px;
          }

          .demo-step__icon {
            width: 58px;
            height: 58px;
          }

          .demo-step__arrow {
            display: grid;
          }

          .demo-step__copy h3 {
            font-size: 31px;
          }
        }

        @media (max-width: 640px) {
          .demo-section {
            padding: 56px 0 72px;
          }

          .demo-section__container {
            width: calc(100% - 32px);
          }

          .demo-section__eyebrow {
            gap: 12px;
            margin-bottom: 44px;
          }

          .demo-section__eyebrow-line {
            width: 32px;
          }

          .demo-section__eyebrow-label {
            font-size: 11px;
            letter-spacing: 1.8px;
          }

          .demo-section__title {
            font-size: 48px;
            line-height: 0.94;
          }

          .demo-section__description {
            font-size: 15px;
          }

          .demo-step {
            grid-template-columns: 38px 48px 1fr;
            gap: 12px;
            padding: 16px;
          }

          .demo-step__arrow {
            display: none;
          }

          .demo-step__icon {
            width: 48px;
            height: 48px;
          }

          .demo-step__icon svg {
            width: 28px;
            height: 28px;
          }

          .demo-step__copy h3 {
            font-size: 31px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .demo-section__media,
          .demo-section__content,
          .demo-step {
            opacity: 1;
            transform: none;
            animation: none;
          }

          .demo-step,
          .demo-step__arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

function ResultsSection() {
  const results = [
    ["Lecture plus rapide", "Les signaux importants remontent avant que tu te perdes dans les onglets."],
    ["Risque plus lisible", "Chaque prono affiche ce qui renforce ou fragilise la lecture."],
    ["Analyse reutilisable", "Les rounds cles, heatmaps et decisions restent disponibles apres la serie."],
  ];

  return (
    <section className="section-shell section-bg bg-resultats">
      <div className="x-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionTitle
            eyebrow="Resultats visibles"
            title="Ce que tu gagnes, ce n'est pas une promesse. C'est une lecture plus propre."
            copy="Xerius ne decide pas a ta place. Il rend le contexte lisible assez tot pour que tu comprennes pourquoi un signal merite ton attention."
            tone="dark"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["6", "modules relies"],
              ["0", "mise sur Xerius"],
              ["1", "cockpit CS2"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[18px] border border-[#1C3555] bg-[#071426] p-6">
                <p className="font-data text-4xl font-bold text-[#FF9F43]">{value}</p>
                <p className="mt-2 font-data text-[11px] font-bold uppercase tracking-[0.16em] text-[#9FB0CA]">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {results.map(([title, copy]) => (
            <article key={title} className="soft-card rounded-[18px] p-7">
              <div className="mb-5 h-1 w-14 rounded-full bg-gradient-to-r from-[#218BFF] to-[#FF9F43]" />
              <h3 className="font-heading text-2xl font-black text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#9FB0CA]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(nextProgress);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const activeIndex = Math.min(
    featureSteps.length - 1,
    Math.floor(progress * featureSteps.length),
  );
  const activeFeature = featureSteps[activeIndex];
  const scrollToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const targetProgress = featureSteps.length === 1 ? 0 : index / (featureSteps.length - 1);
    window.scrollTo({
      top: section.offsetTop + scrollable * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="matchs"
      ref={sectionRef}
      className="presentation-blue dark-showcase section-bg bg-features relative py-20"
      style={{ height: `${featureSteps.length * 100 + 145}vh` }}
    >
      <div className="feature-scroll-bg sticky top-0 flex min-h-screen overflow-hidden py-[92px]">
        <div className="x-container flex min-h-0 flex-1 flex-col justify-center">
          <div className="grid min-h-0 gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="min-w-0">
              <p className="font-data text-sm font-bold uppercase tracking-[0.2em] text-white/45">
                Process Xerius
              </p>
              <p className="mt-5 font-data text-sm font-bold uppercase tracking-[0.2em] text-white/72">
                {activeFeature.step}
              </p>
              <h2
                key={activeFeature.title}
                className="mt-7 max-w-[500px] font-heading text-[clamp(3rem,5.4vw,4.7rem)] font-black leading-[0.9] tracking-[-0.055em] text-white transition duration-500"
              >
                {activeFeature.title}
              </h2>
              <p className="mt-6 max-w-[460px] text-base font-semibold leading-8 text-white/58 md:text-lg">
                {activeFeature.body}
              </p>

              <div className="mt-12 max-w-[360px]">
                <div className="flex gap-2 overflow-x-auto pb-4 sm:hidden">
                  {featureSteps.map((feature, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={feature.title}
                        type="button"
                        onClick={() => scrollToStep(index)}
                        className={`shrink-0 rounded-full px-4 py-2 font-data text-xs font-bold transition ${
                          isActive ? "bg-white text-[#0b0b0c]" : "bg-white/8 text-white/45"
                        }`}
                        aria-label={`Voir la feature ${index + 1}: ${feature.title}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>

                <div className="relative hidden py-1 pl-8 sm:block">
                  <div className="absolute left-0 top-0 h-full w-px bg-white/28" />
                  <div
                    className="absolute left-0 top-0 w-px bg-[#FF9F43] transition-[height] duration-150 ease-out"
                    style={{ height: `${progress * 100}%` }}
                  />
                  <div className="space-y-6">
                    {featureSteps.map((feature, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <button
                          key={feature.title}
                          type="button"
                          onClick={() => scrollToStep(index)}
                          className="group flex w-full items-baseline gap-4 text-left transition"
                          aria-current={isActive ? "step" : undefined}
                        >
                          <span
                            className={`font-data text-sm font-bold transition ${
                              isActive ? "text-white" : "text-white/28 group-hover:text-white/55"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-heading text-base font-black transition ${
                              isActive ? "text-white" : "text-white/25 group-hover:text-white/55"
                            }`}
                          >
                            {feature.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <span className="mt-8 inline-flex rounded-full bg-white/8 px-4 py-2 text-sm font-bold text-white/62 sm:ml-8">
                {activeFeature.benefit}
              </span>
            </div>

            <FeatureMockup feature={activeFeature} activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureMockup({
  feature,
  activeIndex,
}: Readonly<{ feature: (typeof featureSteps)[number]; activeIndex: number }>) {
  const completion = Math.round(((activeIndex + 1) / featureSteps.length) * 100);
  const isHeatmap = feature.title === "Heatmaps";
  const isPortfolio = feature.title === "Portefeuille";
  const isPrediction = feature.title === "Pronostics";
  const isLive = feature.title === "Live & casts";
  const isDiscord = feature.title === "Discord";

  return (
    <div className="panel-glow relative rounded-[30px] border border-white/10 bg-[#071426]/72 p-5 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_34%,rgba(33,139,255,0.09))]" />
      <div className="relative grid min-h-[min(540px,calc(100vh-220px))] grid-cols-[78px_1fr] overflow-hidden rounded-[24px] border border-[#1C3555] bg-[#050B16]">
        <aside className="border-r border-[#1C3555] bg-[#071426] p-5">
          <p className="font-data text-sm font-black text-[#68B6FF]">XR</p>
          <div className="mt-10 space-y-4">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <span
                key={item}
                className={`block size-8 rounded-xl transition duration-300 ${
                  item === activeIndex ? "bg-[#218BFF] shadow-[0_0_22px_rgba(33,139,255,0.45)]" : "bg-[#102744]"
                }`}
              />
            ))}
          </div>
        </aside>
        <div key={feature.title} className="flex min-w-0 flex-col p-6 transition duration-500">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-data text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF9F43]">
                Xerius module
              </p>
              <p className="mt-2 font-heading text-3xl font-black text-white">{feature.title}</p>
              <p className="mt-2 text-sm text-[#9FB0CA]">{feature.benefit}</p>
            </div>
            <span className="rounded-full border border-[#218BFF]/50 bg-[#102744] px-3 py-1 font-data text-[11px] font-bold uppercase text-[#68B6FF]">
              {feature.step}
            </span>
          </div>

          <div className="mt-7 rounded-2xl border border-[#1C3555] bg-[#071426] p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="font-data text-[10px] font-bold uppercase tracking-[0.18em] text-[#9FB0CA]">
                Progression
              </span>
              <span className="font-data text-xs font-bold text-[#DDE7F6]">{completion}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#102744]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#218BFF] to-[#FF9F43] transition-[width] duration-300"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {isHeatmap ? (
            <div className="relative mt-6 min-h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-[#071426] tactical-grid">
              <div className="absolute left-6 top-5 rounded border border-[#68B6FF]/40 px-2 py-1 font-data text-[10px] uppercase text-[#68B6FF]">Site A</div>
              <div className="absolute bottom-6 right-7 rounded border border-[#FF9F43]/40 px-2 py-1 font-data text-[10px] uppercase text-[#FF9F43]">Site B</div>
              <div className="absolute left-[22%] top-[44%] h-px w-56 rotate-[-22deg] bg-[#68B6FF]/30" />
              <div className="absolute right-[24%] top-[25%] h-px w-44 rotate-[31deg] bg-[#68B6FF]/24" />
              <span className="absolute left-[32%] top-[43%] size-28 rounded-full bg-[#FF9F43]/22 blur-2xl" />
              <span className="absolute right-[24%] top-[28%] size-24 rounded-full bg-[#218BFF]/24 blur-2xl" />
              <span className="absolute left-[39%] top-[47%] size-3 rounded-full bg-[#FF9F43] shadow-[0_0_18px_rgba(255,159,67,0.9)]" />
              <span className="absolute right-[30%] top-[34%] size-3 rounded-full bg-[#68B6FF] shadow-[0_0_18px_rgba(104,182,255,0.9)]" />
              {["Entry", "Retake", "Mid", "B short"].map((label, index) => (
                <span
                  key={label}
                  className="absolute rounded-full border border-white/10 bg-[#050B16]/75 px-3 py-1 font-data text-[10px] uppercase tracking-[0.14em] text-[#DDE7F6]"
                  style={{ left: `${18 + index * 17}%`, top: `${68 - index * 12}%` }}
                >
                  {label}
                </span>
              ))}
            </div>
          ) : isPortfolio ? (
            <div className="mt-6 grid gap-4 md:grid-cols-[0.78fr_1.22fr]">
              <div className="rounded-2xl border border-white/10 bg-[#071426] p-4">
                <p className="font-data text-[10px] uppercase tracking-[0.16em] text-[#9FB0CA]">30 derniers choix</p>
                <p className="mt-3 font-data text-4xl font-bold text-[#28D17C]">61%</p>
                <p className="mt-1 text-sm text-[#9FB0CA]">hit rate suivi</p>
                <div className="mt-5 h-24 rounded-xl border border-white/10 bg-[linear-gradient(160deg,transparent_20%,rgba(40,209,124,0.2)_21%,transparent_22%),linear-gradient(35deg,transparent_45%,rgba(255,159,67,0.16)_46%,transparent_47%)]" />
              </div>
              <div className="space-y-3">
                {feature.rows.map(([teams, risk, confidence]) => (
                  <div key={teams} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0B1B31]/70 p-4">
                    <div>
                      <p className="font-heading font-bold text-white">{teams}</p>
                      <p className="mt-1 text-sm text-[#9FB0CA]">{risk}</p>
                    </div>
                    <span className="rounded-full bg-[#102744] px-3 py-1 font-data text-xs font-bold text-[#68B6FF]">{confidence}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {feature.rows.map(([teams, risk, confidence], index) => (
                <div key={teams} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0B1B31]/74 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div>
                    <p className="font-heading font-bold text-white">{teams}</p>
                    <p className="mt-1 text-sm text-[#9FB0CA]">{risk}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-data text-xs font-bold text-white ${
                      isPrediction && index === 1
                        ? "bg-[#FF9F43]"
                        : isLive && index === 1
                          ? "bg-[#28D17C]"
                          : isDiscord
                            ? "bg-[#102744] text-[#68B6FF]"
                            : "bg-[#218BFF]"
                    }`}
                  >
                    {confidence}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-6">
            <div className="rounded-2xl border border-[#1C3555] bg-[#071426] p-4">
              <p className="font-data text-[10px] font-bold uppercase tracking-[0.18em] text-[#68B6FF]">
                Aperçu actif
              </p>
              <p className="mt-2 text-sm leading-6 text-[#DDE7F6]">{feature.detail}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button type="button" className="rounded-[7px] bg-[#218BFF] px-4 py-2 text-sm font-extrabold text-white">
                Ouvrir
              </button>
              <button type="button" className="rounded-[7px] border border-[#1C3555] bg-[#0B1B31] px-4 py-2 text-sm font-extrabold text-[#DDE7F6]">
                Détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="presentation-blue section-shell section-bg bg-pricing">
      <div className="x-container">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle
            eyebrow="Pricing"
            title="Choisis ton accès Xerius."
            copy="Gratuit pour suivre. Pro pour lire plus proprement. Expert pour débloquer toute la lecture CS2."
          />
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex min-h-[540px] flex-col overflow-hidden rounded-[22px] border p-7 backdrop-blur-md ${
                plan.popular
                  ? "border-[#218BFF]/75 bg-[#071426]/82 shadow-[0_0_34px_rgba(33,139,255,0.2)]"
                  : "border-white/[0.12] bg-[#050B16]/72"
              }`}
            >
              {plan.popular ? (
                <span className="absolute right-[-62px] top-9 rotate-45 bg-[#FF9F43] px-16 py-2 font-data text-xs font-bold uppercase text-white">
                  Populaire
                </span>
              ) : null}
              <h3 className="font-heading text-3xl font-black text-white">{plan.name}</h3>
              <p className="mt-3 text-[#9FB0CA]">{plan.description}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="font-data text-4xl font-bold text-[#FF9F43]">{plan.price}</span>
                <span className="pb-1 text-[#9FB0CA]">/ mois</span>
              </div>
              {plan.year ? <p className="mt-2 text-sm text-[#9FB0CA]">{plan.year}</p> : <p className="mt-2 text-sm text-[#9FB0CA]">Accès découverte</p>}
              <div className="my-7 h-px bg-[#1C3555]" />
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-semibold text-[#DDE7F6]">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#218BFF] text-[10px] text-white">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <ButtonLink>{plan.cta}</ButtonLink>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-[#9FB0CA]">Les pronostics sont des analyses d’aide à la décision. Aucun résultat n’est garanti.</p>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="presentation-blue section-shell section-bg bg-faq flex min-h-[540px] items-center">
      <div className="x-container grid max-w-[1080px] items-center gap-10 lg:grid-cols-[0.78fr_minmax(380px,520px)]">
        <div>
          <SectionTitle
            eyebrow="FAQ"
            title="Des réponses claires avant de commencer."
            copy="Xerius parle de lecture CS2, de contexte et de suivi. Pas de promesse magique, pas de casino caché."
          />
        </div>
        <div className="mx-auto w-full max-w-[520px] space-y-4">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index < 2} className="group rounded-[18px] border border-white/[0.12] bg-[#050B16]/72 p-5 backdrop-blur-md">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-lg font-bold text-white">
                {question}
                <span className="text-[#68B6FF] group-open:hidden">+</span>
                <span className="hidden text-[#68B6FF] group-open:block">−</span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#9FB0CA]">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-bg bg-cta relative overflow-hidden py-24">
      <div className="absolute left-1/2 top-20 h-1 w-[70vw] -translate-x-1/2 rotate-[-6deg] bg-[#FF7A18] opacity-20 blur-2xl" />
      <div className="x-container relative text-center">
        <Eyebrow>Décision plus claire</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-4xl font-heading text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
          Prêt à lire tes matchs CS2 avec plus de précision ?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#C4D2E6]">
          Centralise les infos, comprends les signaux et garde une trace propre de tes décisions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink>Commencer maintenant</ButtonLink>
          <ButtonLink variant="secondary" href="#modules">Voir les modules</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = ["Pronostics", "Analyses", "Matchs", "Pricing", "FAQ", "Discord", "Contact"];

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050B16] py-8">
      <div className="x-container">
        <div className="flex flex-col gap-6 rounded-[18px] border border-white/[0.1] bg-[#050B16]/42 px-5 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:flex-row md:items-center md:justify-between md:px-7">
          <div className="flex flex-col gap-2">
            <Brand />
            <p className="text-xs font-semibold text-[#9FB0CA]">
              Analyse CS2. Aucun dépôt, aucun retrait, aucune promesse de résultat.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-center">
            {footerLinks.map((link) => (
              <a key={link} href="#" className="text-sm font-semibold text-[#9FB0CA] transition hover:text-white">
                {link}
              </a>
            ))}
          </nav>
          <p className="font-data text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A18]">
            © 2026 Xerius
          </p>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050B16] text-[#F8FAFC]">
      <NavBar />
      <Hero />
      <ProblemSection />
      <MatchFlowSection />
      <ResultsSection />
      <ModulesSection />
      <StorySection />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
