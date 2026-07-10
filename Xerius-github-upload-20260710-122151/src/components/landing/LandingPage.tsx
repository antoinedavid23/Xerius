"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const navLinks = [
  ["Pronostics", "#pronostics"],
  ["Analyses", "#analyses"],
  ["Matchs", "#matchs"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

const tickerItems = [
  "Pronostics expliques",
  "Analyses post-match",
  "Heatmaps CS2",
  "Score de confiance",
  "Risque visible",
  "Portefeuille de decisions",
  "Live & casts",
  "Discord premium",
  "Aucun depot",
  "Aucun retrait",
];

const problems = [
  ["Tu ouvres trop d'onglets", "Stream, HLTV, Discord, stats, tweets, calendrier : tout existe, mais rien n'arrive dans le bon ordre quand le match commence."],
  ["Le score ne raconte pas la game", "Un 13-9 ne dit pas quelle eco a casse, quel side a pris l'avantage, ni pourquoi une map a soudainement bascule."],
  ["Les signaux arrivent trop tard", "Quand tout le monde parle deja du spot, tu n'es plus en avance. Il te faut le contexte avant que le bruit explose."],
  ["Tu ne sais pas quoi garder", "Forme recente, map pool, line-up, cote fort, momentum : les pieces sont la, mais elles ne forment pas encore une lecture claire."],
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

function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-[64px] w-full max-w-[1240px] items-center justify-between gap-6 rounded-[18px] border border-white/[0.1] bg-[#050B16]/42 px-5 shadow-[0_18px_55px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:px-7">
        <Brand />
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-semibold text-[#9FB0CA] transition hover:text-white">
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#login" className="hidden text-sm font-semibold text-[#9FB0CA] transition hover:text-white sm:block">
            Se connecter
          </a>
          <ButtonLink>S’inscrire</ButtonLink>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="section-bg bg-hero relative overflow-hidden">
      <div className="x-container relative flex min-h-[860px] items-center py-20 lg:py-24">
        <div className="max-w-[760px]">
          <h1 className="max-w-[760px] font-heading text-[clamp(4rem,8vw,6.4rem)] font-black leading-[0.86] tracking-[-0.055em] text-white">
            Toute l’analyse CS2 au même endroit.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#D2DEEF]">
            Pronostics, statistiques, live, actualités, portefeuille et Discord réunis dans une interface pensée pour lire le match avant, pendant et après.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink>S’inscrire</ButtonLink>
            <ButtonLink variant="secondary" href="#modules">Voir les modules</ButtonLink>
          </div>
        </div>
      </div>
      <TickerStrip />
    </section>
  );
}

function TickerStrip() {
  return (
    <div className="ticker-wrap border-y border-white/[0.035] bg-transparent">
      <div className="ticker-track py-3">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span key={`${item}-${index}`} className="mx-7 font-data text-[10px] font-bold uppercase tracking-[0.2em] text-white/76">
            {item}
          </span>
        ))}
      </div>
    </div>
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

function ProblemSection() {
  return (
    <section id="plateforme" className="section-shell section-bg bg-probleme">
      <div className="x-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-end">
          <SectionTitle
            eyebrow="Ce qui bloque la lecture"
            title="Tu as les infos. Mais elles arrivent dans le désordre."
            copy="Sur CS2, le problème arrive au moment précis où tu dois décider : trop de sources, trop de signaux, pas assez de contexte relié."
            tone="dark"
          />
          <div className="rounded-[14px] border border-[#1C3555] bg-[#071426] p-5">
            <p className="font-data text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF9F43]">Diagnostic actuel</p>
            {["Trop d'onglets ouverts", "Signaux non relies", "Timing difficile a lire"].map((item) => (
              <div key={item} className="mt-4 flex items-center gap-3 text-sm font-semibold text-[#DDE7F6]">
                <span className="size-2 rounded-full bg-[#FF9F43]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {problems.map(([title, copy]) => (
            <article key={title} className="soft-card rounded-[14px]">
              <div className="mb-5 h-1 w-14 rounded-full bg-gradient-to-r from-[#218BFF] to-[#FF9F43]" />
              <h3 className="font-heading text-xl font-black text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#9FB0CA]">{copy}</p>
              <span className="mt-5 inline-flex rounded-[6px] bg-[#FF9F43]/12 px-3 py-1 font-data text-[10px] font-bold uppercase text-[#FF9F43]">
                signal à clarifier
              </span>
            </article>
          ))}
        </div>
      </div>
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
    ["01", "Avant le BO", "Favori, map pool, confiance et risque sont poses avant le live."],
    ["02", "Pendant le match", "Le stream, le score et les signaux restent dans le meme champ de vision."],
    ["03", "Apres la serie", "Heatmaps, rounds cles et decisions restent consultables a froid."],
  ];

  return (
    <section id="pronostics" className="presentation-blue section-shell section-bg bg-demo">
      <div className="x-container">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="panel-glow overflow-hidden rounded-[30px] border border-[#1C3555] bg-[#071426] p-4">
            <div className="aspect-video rounded-[22px] border border-[#1C3555] bg-[radial-gradient(circle_at_22%_22%,rgba(33,139,255,0.28),transparent_20rem),linear-gradient(135deg,#08111F,#0B2440_58%,#071426)] p-5 tactical-grid">
              <div className="flex items-center justify-between border-b border-[#1C3555] pb-4">
                <p className="font-data text-[11px] font-bold uppercase tracking-[0.18em] text-[#68B6FF]">Demo produit Xerius</p>
                <span className="rounded-full bg-[#102744] px-3 py-1 font-data text-[10px] font-bold uppercase text-[#DDE7F6]">Round 18 · 03:21</span>
              </div>
              <div className="grid h-[calc(100%-56px)] gap-4 pt-5 md:grid-cols-[1fr_220px]">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050B16]/72">
                  <div className="absolute left-5 top-5 rounded-full border border-[#28D17C]/40 bg-[#28D17C]/12 px-3 py-1 font-data text-[10px] font-bold uppercase text-[#8DFFBE]">
                    Live analysis
                  </div>
                  <div className="absolute inset-x-8 bottom-8">
                    <div className="mb-3 flex items-center justify-between font-data text-[10px] uppercase tracking-[0.16em] text-[#9FB0CA]">
                      <span>0:00</span>
                      <span>Pattern detected</span>
                      <span>1:44</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#102744]">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#218BFF] via-[#68B6FF] to-[#FF9F43]" />
                    </div>
                  </div>
                  <div className="grid h-full place-items-center">
                    <div className="relative grid size-20 place-items-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_42px_rgba(33,139,255,0.32)]">
                      <span className="ml-1 block h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-white" />
                    </div>
                  </div>
                  <span className="absolute left-[34%] top-[38%] size-3 rounded-full bg-[#FF9F43] shadow-[0_0_18px_rgba(255,159,67,0.8)]" />
                  <span className="absolute right-[28%] top-[28%] size-2 rounded-full bg-[#68B6FF] shadow-[0_0_18px_rgba(104,182,255,0.8)]" />
                </div>
                <div className="hidden space-y-3 md:block">
                  {[
                    ["Entry timing", "B short", "hot"],
                    ["Retake weak", "Site A", "risk"],
                    ["Economy", "CT low buy", "flag"],
                  ].map(([label, value, state]) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-[#050B16]/70 p-3">
                      <p className="font-data text-[10px] uppercase tracking-[0.16em] text-[#6F829D]">{label}</p>
                      <p className="mt-1 font-heading text-base font-black text-white">{value}</p>
                      <p className="mt-2 font-data text-[10px] uppercase text-[#FF9F43]">{state}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionTitle
              eyebrow="Demo produit"
              title="Regarde Xerius lire un match de bout en bout."
              copy="La demo montre comment la plateforme relie le prono, le live, le cast, les heatmaps et le suivi de decision sans transformer l'ecran en tableur."
            />
            <div className="mt-8 space-y-3">
              {demoSteps.map(([number, title, body]) => (
                <div key={title} className="rounded-[16px] border border-[#1C3555] bg-[#071426] p-5">
                  <div className="flex gap-4">
                    <p className="font-data text-sm font-bold text-[#FF9F43]">{number}</p>
                    <div>
                      <h3 className="font-heading text-xl font-black text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#9FB0CA]">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
