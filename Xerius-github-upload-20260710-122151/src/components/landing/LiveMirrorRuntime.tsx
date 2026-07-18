"use client";

import { useEffect } from "react";

type ProcessState = {
  html: string;
  dataStep: string;
  style: string;
};

type ProcessFeatureDefinition = {
  sourceIndex: number;
  title: string;
  description: string;
  tag: string;
  detail: string;
  kind: "rows" | "wallet";
  rows: Array<{ title: string; meta: string; badge: string }>;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

const tickerItems = [
  {
    tone: "orange",
    status: "Veto publié",
    title: "Mirage ouvre le BO",
    detail: "Map pool et sides disponibles",
    href: "#matchs",
  },
  {
    tone: "blue",
    status: "Round clé",
    title: "Économie cassée au round 17",
    detail: "Le round qui a fait basculer la map",
    href: "#modules",
  },
  {
    tone: "green",
    status: "Line-up",
    title: "Changement confirmé",
    detail: "La fiche équipe est déjà à jour",
    href: "#resultats",
  },
  {
    tone: "blue",
    status: "Joueur clé",
    title: "Un joueur prend feu",
    detail: "Sa forme sur les cinq derniers matchs",
    href: "#modules",
  },
  {
    tone: "orange",
    status: "Agenda",
    title: "Les matchs du soir",
    detail: "Horaires, streams et formats réunis",
    href: "#matchs",
  },
];

const processFeatureDefinitions: ProcessFeatureDefinition[] = [
  {
    sourceIndex: 1,
    title: "Live & cast",
    description: "Lance le stream. Le score, l’économie et les infos utiles restent autour, sans recouvrir le match.",
    tag: "Tu regardes le BO, pas les onglets",
    detail:
      "Pause tactique, achat forcé, économie cassée : tu vois tout de suite ce que cela change, sans quitter le stream.",
    kind: "rows",
    rows: [
      { title: "Mirage · map 2", meta: "Round 15 · pause tactique", badge: "8–6" },
      { title: "Stream officiel FR", meta: "1080p · faible latence", badge: "Live" },
      { title: "Économie", meta: "NAVI en achat forcé", badge: "À surveiller" },
    ],
  },
  {
    sourceIndex: 0,
    title: "Feed",
    description: "Ouvre le Feed pour voir ce qui se joue aujourd’hui et ce qui a changé depuis hier.",
    tag: "L’essentiel avant le bruit",
    detail:
      "Matchs, changements de line-up et analyses utiles remontent d’abord. Tu vois l’essentiel sans fouiller le fil.",
    kind: "rows",
    rows: [
      { title: "Vitality — NAVI", meta: "Match · aujourd’hui, 19 h", badge: "À suivre" },
      { title: "Line-up G2 confirmée", meta: "Actualité d’équipe", badge: "Info" },
      { title: "Spirit solide sur Nuke", meta: "Point à vérifier dans le veto", badge: "Analyse" },
    ],
  },
  {
    sourceIndex: 2,
    title: "Search",
    description: "Tu cherches une équipe, un joueur ou un tournoi ? Tape son nom. Les résultats liés remontent ensemble.",
    tag: "Un nom suffit",
    detail:
      "Cherche Vitality : son prochain BO, sa forme et ses joueurs à suivre remontent ensemble.",
    kind: "rows",
    rows: [
      { title: "Équipes", meta: "Vitality · NAVI · Spirit", badge: "12" },
      { title: "Joueurs", meta: "ZywOo · donk · m0NESY", badge: "24" },
      { title: "Tournois", meta: "IEM Cologne · BLAST Premier", badge: "8" },
    ],
  },
  {
    sourceIndex: 4,
    title: "Wallet",
    description: "Revois ce que tu as suivi et repère les choix sur lesquels tu es allé trop vite.",
    tag: "Tes choix, avec du recul",
    detail:
      "Wallet ne déplace aucun argent. Il garde tes analyses et t’aide à voir les mêmes habitudes revenir.",
    kind: "wallet",
    rows: [
      { title: "Analyses sauvegardées", meta: "12 ce mois", badge: "Revoir" },
      { title: "Matchs suivis", meta: "8 sur 30 jours", badge: "Historique" },
      { title: "Habitude repérée", meta: "Favoris suivis trop vite", badge: "À revoir" },
    ],
  },
  {
    sourceIndex: 5,
    title: "Discord",
    description: "Ouvre le salon du match sans perdre le veto, le score ni la map en cours.",
    tag: "Le même match, les mêmes repères",
    detail:
      "Le chat reste vivant, mais les infos du BO restent épinglées. Tu peux rejoindre la discussion sans repartir de zéro.",
    kind: "rows",
    rows: [
      { title: "#vitality-navi", meta: "312 membres dans le salon", badge: "Actif" },
      { title: "Résumé épinglé", meta: "Veto, forme et line-up", badge: "Lire" },
      { title: "Alerte d’équipe", meta: "Changement de joueur", badge: "Info" },
    ],
  },
];

const audienceCases = [
  {
    mark: "01",
    title: "Fans de CS2",
    subtitle: "Le match, sans détour",
    body: "Tu vois ce qui se joue ce soir, tu ouvres le stream et tu suis le BO sans changer d’onglet pour retrouver le score ou le veto.",
    footer: "Agenda · live · score",
  },
  {
    mark: "02",
    title: "Joueurs",
    subtitle: "Préparation et débrief",
    body: "Avant un match, tu compares la forme et les maps fortes. Après, tu reviens sur les rounds qui ont fait basculer la série.",
    footer: "Forme · map pool · rounds",
  },
  {
    mark: "03",
    title: "Créateurs",
    subtitle: "Threads, vidéos et récaps",
    body: "Tu retrouves les séquences et les stats utiles à ton sujet, sans parcourir toute la VOD pour remettre la main sur un round.",
    footer: "Séquences · chiffres · résumé",
  },
  {
    mark: "04",
    title: "Équipes et managers",
    subtitle: "Préparation d’adversaire",
    body: "Tu regroupes les profils, les map pools et les tendances d’un adversaire. Tu passes moins de temps à copier-coller et plus de temps à préparer le match.",
    footer: "Profils · map pools · scouting",
  },
];

const faqItems = [
  {
    question: "Xerius, ça sert à quoi concrètement ?",
    answer:
      "À suivre et comprendre les matchs CS2 sans passer sans arrêt du stream au score, aux statistiques et aux analyses. Tu peux l’utiliser avant le BO, pendant le live et une fois la série terminée.",
  },
  {
    question: "Est-ce que je peux suivre un match en direct ?",
    answer:
      "Oui. Le module Live & cast garde le stream au centre, avec le score, la map en cours, l’économie et les informations importantes autour. Xerius ne remplace pas le stream : il t’évite les allers-retours.",
  },
  {
    question: "Qu’est-ce qui entre dans une analyse Xerius ?",
    answer:
      "La forme récente, le map pool, la line-up, le veto, les face-à-face et le déroulé du BO. Xerius montre aussi les éléments qui fragilisent l’analyse, pas seulement ceux qui vont dans son sens.",
  },
  {
    question: "Le score de confiance veut dire quoi ?",
    answer:
      "Il résume à quel point les facteurs affichés vont dans le même sens. Ce n’est ni une probabilité de gain, ni une certitude, ni une garantie sur le résultat du match.",
  },
  {
    question: "À quoi sert Wallet s’il n’y a pas d’argent sur Xerius ?",
    answer:
      "Wallet est ton historique personnel. Il conserve les matchs, les analyses et les choix que tu as suivis pour t’aider à repérer les habitudes qui reviennent. Il ne permet ni dépôt, ni retrait, ni transaction.",
  },
  {
    question: "Xerius est-il un site de paris ?",
    answer:
      "Non. Xerius n’accepte aucune mise, aucun dépôt et aucun retrait. C’est un outil d’information et d’analyse consacré à CS2.",
  },
  {
    question: "Quelle est la différence entre Gratuit, Pro et Expert ?",
    answer:
      "Gratuit couvre l’actualité, le calendrier, les streams et les statistiques essentielles. Pro ajoute les pronostics expliqués, les analyses, les notifications et l’historique. Expert ouvre aussi les heatmaps, les moments clés et les outils les plus avancés.",
  },
  {
    question: "Une analyse Xerius peut-elle se tromper ?",
    answer:
      "Oui. Une line-up peut changer, un veto peut surprendre et un joueur peut déjouer toutes les tendances. Xerius explique les éléments disponibles ; il ne garantit jamais l’issue du match.",
  },
];

const pricingPlanDetails = [
  {
    slug: "free",
    index: "01",
    eyebrow: "Suivre la scène",
    badge: "",
    fit: "Idéal pour découvrir Xerius",
    description: "Pour consulter les matchs, lancer les streams et prendre Xerius en main sans payer.",
    billing: "L’essentiel pour suivre la scène",
    saving: "",
    cta: "Commencer gratuitement",
  },
  {
    slug: "pro",
    index: "02",
    eyebrow: "Suivi régulier",
    badge: "Recommandé",
    fit: "Le bon équilibre pour suivre et analyser",
    description:
      "Pour suivre plusieurs BO chaque semaine avec les pronostics expliqués, les notifications et ton historique sous la main.",
    billing: "86 € / an · soit 7,17 € par mois",
    saving: "22 € économisés / an",
    cta: "Choisir Pro",
  },
  {
    slug: "expert",
    index: "03",
    eyebrow: "Analyse avancée",
    badge: "",
    fit: "Idéal pour préparer et débriefer",
    description:
      "Pour préparer et débriefer les BO avec les analyses complètes, les heatmaps et les moments clés.",
    billing: "240 € / an · soit 20 € par mois",
    saving: "60 € économisés / an",
    cta: "Choisir Expert",
  },
] as const;

const tickerArrow = `
  <svg class="x-ticker-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
`;

function renderTickerItems(isDuplicate = false) {
  return tickerItems
    .map(
      (item) => `
        <a
          class="x-ticker-card"
          data-tone="${item.tone}"
          href="${item.href}"
          ${isDuplicate ? 'tabindex="-1"' : ""}
        >
          <span class="x-ticker-status"><i aria-hidden="true"></i>${item.status}</span>
          <span class="x-ticker-copy">
            <strong>${item.title}</strong>
            <small>${item.detail}</small>
          </span>
          ${tickerArrow}
        </a>
      `,
    )
    .join("");
}

function renderAudienceCase(index: number) {
  const item = audienceCases[index];
  if (!item) return "";

  return `
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="grid size-10 place-items-center rounded-[2px] bg-[#FF7A18] font-data text-[11px] font-bold text-[#071426]">${item.mark}</div>
        <div>
          <p class="font-heading font-bold text-white">${item.title}</p>
          <p class="text-xs text-[#B9C9DC]">${item.subtitle}</p>
        </div>
      </div>
    </div>
    <p class="x-review-quote mt-5 text-sm leading-6 text-[#F4F7FB]">${item.body}</p>
    <div class="x-review-footer mt-6"><span>Cas d’usage</span><b>${item.footer}</b></div>
  `;
}

function renderFaqItems() {
  return faqItems
    .map(
      (item, index) => `
        <details ${index === 0 ? "open" : ""} class="group rounded-[2px] border border-white/[0.12] bg-[#050B16]/72 p-5 backdrop-blur-md">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-lg font-bold text-white">
            ${item.question}
            <span class="text-[#68B6FF] group-open:hidden">+</span>
            <span class="hidden text-[#68B6FF] group-open:block">−</span>
          </summary>
          <p class="mt-4 text-sm leading-7 text-[#9FB0CA]">${item.answer}</p>
        </details>
      `,
    )
    .join("");
}

export function LiveMirrorRuntime() {
  useEffect(() => {
    const menuButton = document.querySelector<HTMLButtonElement>(".cs-hero-menu-button");
    const mobileNavigation = document.querySelector<HTMLElement>("#cs-hero-mobile-navigation");
    const processSection = document.querySelector<HTMLElement>("#matchs");
    const processPanel = processSection?.querySelector<HTMLElement>(".feature-scroll-bg");
    const tickerStrip = document.querySelector<HTMLElement>(".cs-matches-strip");

    let processStates: ProcessState[] = [];
    let activeProcessIndex = -1;
    let animationFrame = 0;
    let disposed = false;

    const setMenuOpen = (open: boolean) => {
      if (!menuButton || !mobileNavigation) return;
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      mobileNavigation.classList.toggle("is-open", open);
    };

    const replaceText = (selector: string, nextText: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return;
      element.textContent = nextText;
    };

    if (tickerStrip) {
      tickerStrip.classList.add("xerius-insight-ticker");
      tickerStrip.setAttribute("aria-label", "Aperçu des signaux proposés par Xerius");
      tickerStrip.innerHTML = `
        <div class="cs-hero-container x-ticker-frame">
          <div class="x-ticker-label">
            <span class="x-ticker-label-dot" aria-hidden="true"></span>
            <span class="x-ticker-label-copy">
              <b>Aperçu Xerius</b>
              <small>Ce que tu peux retrouver</small>
            </span>
          </div>
          <div class="x-ticker-window">
            <div class="x-ticker-track">
              <div class="x-ticker-group">${renderTickerItems()}</div>
              <div class="x-ticker-group" aria-hidden="true">${renderTickerItems(true)}</div>
            </div>
          </div>
        </div>
      `;
    }

    document.querySelectorAll(".x-social-proof-quote").forEach((quote) => quote.remove());
    document.querySelectorAll("#resultats .x-result-map-tag").forEach((tag) => tag.remove());
    document.querySelectorAll(".x-review-map-card .x-review-verified").forEach((badge) => badge.remove());

    const ratingPanel = document.querySelector<HTMLElement>(".x-social-proof .x-social-rating");
    if (ratingPanel) {
      ratingPanel.innerHTML = `
        <div class="flex items-center justify-between gap-3">
          <p class="font-data text-[11px] font-bold uppercase tracking-[0.18em] text-[#68B6FF]">Un même point de départ</p>
        </div>
        <p class="mt-5 font-heading text-3xl font-black uppercase leading-tight text-white">Le match reste au centre.</p>
        <p class="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-[#9FB0CA]">Tu ajoutes ensuite le niveau d’analyse dont tu as besoin, sans repartir de zéro.</p>
      `;
    }

    document.querySelectorAll<HTMLElement>(".x-social-proof .x-review-map-card").forEach((card, index) => {
      card.innerHTML = renderAudienceCase(index);
    });

    const faqList = document.querySelector<HTMLElement>("#faq .space-y-4");
    if (faqList) faqList.innerHTML = renderFaqItems();

    const pricingGrid = document.querySelector<HTMLElement>("#pricing .mt-12.grid");
    if (pricingGrid) {
      pricingGrid.classList.add("x-pricing-grid");

      pricingGrid.querySelectorAll<HTMLElement>(":scope > .x-pricing-card").forEach((card, index) => {
        const plan = pricingPlanDetails[index];
        if (!plan) return;

        card.dataset.plan = plan.slug;
        card.classList.add(`x-pricing-card--${plan.slug}`);
        card.toggleAttribute("data-recommended", Boolean(plan.badge));
        card.querySelector<HTMLElement>(":scope > span.absolute")?.remove();

        const heading = card.querySelector<HTMLElement>(":scope > h3");
        if (!heading) return;

        heading.id = `x-pricing-title-${plan.slug}`;
        card.setAttribute("aria-labelledby", heading.id);

        let topline = card.querySelector<HTMLElement>(":scope > .x-pricing-topline");
        if (!topline) {
          topline = document.createElement("div");
          topline.className = "x-pricing-topline";
          card.insertBefore(topline, heading);
        }

        topline.replaceChildren();
        const marker = document.createElement("div");
        marker.className = "x-pricing-plan-marker";
        const markerIndex = document.createElement("span");
        markerIndex.textContent = plan.index;
        const markerLabel = document.createElement("b");
        markerLabel.textContent = plan.eyebrow;
        marker.append(markerIndex, markerLabel);
        topline.append(marker);

        if (plan.badge) {
          const badge = document.createElement("span");
          badge.className = "x-pricing-badge";
          badge.textContent = plan.badge;
          topline.append(badge);
        }

        const description = card.querySelector<HTMLElement>(":scope > h3 + p");
        if (description) {
          description.classList.add("x-pricing-description");
          description.textContent = plan.description;

          let fit = card.querySelector<HTMLElement>(":scope > .x-pricing-fit");
          if (!fit) {
            fit = document.createElement("p");
            fit.className = "x-pricing-fit";
            description.after(fit);
          }
          fit.textContent = plan.fit;
        }

        const price = card.querySelector<HTMLElement>(":scope > div.mt-6.flex");
        price?.classList.add("x-pricing-price");

        let billing = card.querySelector<HTMLElement>(":scope > .x-pricing-billing");
        if (!billing && price?.nextElementSibling instanceof HTMLParagraphElement) {
          const billingCopy = price.nextElementSibling;
          billing = document.createElement("div");
          billing.className = "x-pricing-billing";
          billingCopy.replaceWith(billing);
          billing.append(billingCopy);
        }

        if (billing) {
          const billingCopy = billing.querySelector<HTMLElement>(":scope > p");
          if (billingCopy) {
            billingCopy.classList.add("x-pricing-billing-copy");
            billingCopy.textContent = plan.billing;
          }

          billing.querySelector<HTMLElement>(":scope > .x-pricing-saving")?.remove();
          if (plan.saving) {
            const saving = document.createElement("span");
            saving.className = "x-pricing-saving";
            saving.textContent = plan.saving;
            billing.append(saving);
          }
        }

        card.querySelector<HTMLElement>(":scope > div.my-7.h-px")?.classList.add("x-pricing-divider");

        const features = card.querySelector<HTMLElement>(":scope > ul");
        if (features) {
          features.classList.add("x-pricing-features");

          let featuresLabel = card.querySelector<HTMLElement>(":scope > .x-pricing-features-label");
          if (!featuresLabel) {
            featuresLabel = document.createElement("p");
            featuresLabel.className = "x-pricing-features-label";
            features.before(featuresLabel);
          }
          featuresLabel.textContent = "Inclus dans ce plan";

          features.querySelectorAll<HTMLElement>(":scope > li").forEach((feature) => {
            if (feature.querySelector(":scope > .x-pricing-feature-copy")) return;
            const textNode = Array.from(feature.childNodes).find(
              (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
            );
            if (!textNode) return;
            const copy = document.createElement("span");
            copy.className = "x-pricing-feature-copy";
            copy.textContent = textNode.textContent?.trim() ?? "";
            feature.replaceChild(copy, textNode);
          });
        }

        const footer = card.querySelector<HTMLElement>(":scope > div.mt-auto");
        footer?.classList.add("x-pricing-footer");
        const cta = footer?.querySelector<HTMLAnchorElement>("a");
        cta?.setAttribute("aria-label", `${plan.cta} — plan ${heading.textContent?.trim() ?? plan.slug}`);
      });
    }

    const problemHeadings = [
      ["Tu jongles entre", "les onglets"],
      ["Le score dit", "où on en est, pas pourquoi"],
      ["Tu comprends", "le tournant après coup"],
      ["Tu ne sais plus", "quoi regarder"],
    ];

    const problemStatuses = ["Temps perdu", "Contexte manquant", "Info trop tardive", "Priorité floue"];

    document.querySelectorAll<HTMLElement>("#plateforme .problem-v2-item-body h3").forEach((heading, index) => {
      const lines = problemHeadings[index];
      if (!lines) return;
      heading.replaceChildren(
        ...lines.map((line) => {
          const span = document.createElement("span");
          span.textContent = line;
          return span;
        }),
      );
    });

    document.querySelectorAll<HTMLElement>("#plateforme .problem-v2-item footer span").forEach((status, index) => {
      const nextStatus = problemStatuses[index];
      if (nextStatus) status.textContent = nextStatus;
    });

    replaceText(".cs-hero-action.primary > span", "Commencer gratuitement");
    replaceText(".cs-hero-action.secondary > span", "Voir la démo");
    replaceText(".cs-hero-login", "Se connecter");
    replaceText(".cs-hero-signup", "Commencer gratuitement");
    replaceText('#cs-hero-mobile-navigation a[href="/inscription"]', "Commencer gratuitement");
    replaceText("#pricing .x-pricing-card:nth-of-type(1) a", "Commencer gratuitement");
    replaceText("#pricing .x-pricing-card:nth-of-type(2) a", "Choisir Pro");
    replaceText("#pricing .x-pricing-card:nth-of-type(3) a", "Choisir Expert");
    replaceText(".bg-cta a:first-of-type", "Commencer gratuitement");
    replaceText(".bg-cta a:nth-of-type(2)", "Voir Xerius en action");

    document.querySelector<HTMLAnchorElement>(".cs-hero-action.primary")?.setAttribute("href", "#pricing");
    document.querySelector<HTMLAnchorElement>(".cs-hero-action.secondary")?.setAttribute("href", "#demo-video");
    document.querySelector<HTMLAnchorElement>(".bg-cta a:nth-of-type(2)")?.setAttribute("href", "#demo-video");

    document.querySelectorAll(".x-unified-card-meta").forEach((meta) => meta.remove());
    document.querySelectorAll<HTMLElement>(".x-unified-card").forEach((card) => {
      Array.from(card.classList)
        .filter((className) => className === "x-unified-card" || className.startsWith("x-unified-card--"))
        .forEach((className) => card.classList.remove(className));
    });
    document.querySelectorAll(".x-review-avatar").forEach((avatar) => avatar.classList.remove("x-review-avatar"));

    const actionElements = Array.from(
      new Set(
        [
          ".cs-hero-action",
          ".cs-hero-login",
          ".cs-hero-signup",
          ".cs-hero-mobile-login",
          "#pricing .x-pricing-card a",
          ".bg-cta a",
        ].flatMap((selector) => Array.from(document.querySelectorAll<HTMLAnchorElement>(selector))),
      ),
    );

    actionElements.forEach((action) => {
      action.classList.add("xerius-action");
      action.classList.remove("xerius-action--primary", "xerius-action--outline");
      const isPrimary =
        action.matches(".primary, .cs-hero-signup, #pricing [data-plan='pro'] a, .bg-cta a:first-of-type");
      action.classList.add(isPrimary ? "xerius-action--primary" : "xerius-action--outline");

      const pricingPlan = action.closest<HTMLElement>("#pricing [data-plan]")?.dataset.plan;
      if (pricingPlan) action.classList.add(`xerius-action--pricing-${pricingPlan}`);

      Array.from(action.childNodes).forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) return;
        const label = document.createElement("span");
        label.className = "x-action-label";
        label.textContent = node.textContent.trim();
        action.replaceChild(label, node);
      });

      if (pricingPlan && !action.querySelector(":scope > .x-pricing-cta-icon")) {
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.classList.add("x-pricing-cta-icon");
        icon.setAttribute("viewBox", "0 0 24 24");
        icon.setAttribute("fill", "none");
        icon.setAttribute("aria-hidden", "true");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M5 12h13M14 7l5 5-5 5");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "1.6");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        icon.append(path);
        action.append(icon);
      }
    });

    const toggleMenu = () => {
      setMenuOpen(menuButton?.getAttribute("aria-expanded") !== "true");
    };

    const scrollToProcessStep = (index: number) => {
      if (!processSection) return;
      const scrollRange = Math.max(1, processSection.offsetHeight - window.innerHeight);
      const progress = processStates.length <= 1 ? 0 : index / (processStates.length - 1);
      window.scrollTo({ top: processSection.offsetTop + scrollRange * progress, behavior: "smooth" });
    };

    const bindProcessButtons = () => {
      processPanel?.querySelectorAll<HTMLButtonElement>("button[data-process-index]").forEach((button) => {
        button.onclick = () => {
          const index = Number(button.dataset.processIndex);
          if (Number.isInteger(index)) scrollToProcessStep(index);
        };
      });
    };

    const normalizeProcessNavigation = (activeIndex: number) => {
      if (!processPanel) return;
      const activeFeature = processFeatureDefinitions[activeIndex];
      if (!activeFeature) return;

      const root = processPanel.querySelector<HTMLElement>(".x-process-container");
      const grid = root?.querySelector<HTMLElement>(".x-process-grid");
      const intro = grid?.firstElementChild instanceof HTMLElement ? grid.firstElementChild : null;
      const heading = intro?.querySelector<HTMLElement>(".x-process-title");

      const sectionLabel = intro?.querySelector<HTMLElement>(":scope > p");
      if (sectionLabel) sectionLabel.textContent = "05 / Dans le cockpit";

      if (heading) {
        heading.textContent = activeFeature.title;
        const description = heading.nextElementSibling;
        if (description instanceof HTMLParagraphElement) description.textContent = activeFeature.description;
      }

      const featureTag = intro?.querySelector<HTMLElement>(":scope > span.mt-8");
      if (featureTag) featureTag.textContent = activeFeature.tag;

      root?.setAttribute("data-process-step", String(activeIndex + 1));

      const navigationBlock = intro?.querySelector<HTMLElement>(":scope > div.mt-12");
      const mobileButtons = navigationBlock?.querySelectorAll<HTMLButtonElement>(":scope > .flex > button") ?? [];
      const desktopButtons = navigationBlock?.querySelectorAll<HTMLButtonElement>(".space-y-6 > button") ?? [];

      mobileButtons.forEach((button, index) => {
        const feature = processFeatureDefinitions[index];
        if (!feature) {
          button.remove();
          return;
        }

        const isActive = index === activeIndex;
        button.textContent = String(index + 1).padStart(2, "0");
        button.dataset.processIndex = String(index);
        button.setAttribute("aria-label", `Afficher ${feature.title}`);
        button.toggleAttribute("aria-current", isActive);
        if (isActive) button.setAttribute("aria-current", "step");
        button.classList.remove("bg-white", "text-[#0b0b0c]", "bg-white/8", "text-white/45");
        button.classList.add(isActive ? "bg-white" : "bg-white/8", isActive ? "text-[#0b0b0c]" : "text-white/45");
      });

      desktopButtons.forEach((button, index) => {
        const feature = processFeatureDefinitions[index];
        if (!feature) {
          button.remove();
          return;
        }

        const isActive = index === activeIndex;
        button.dataset.processIndex = String(index);
        button.setAttribute("aria-label", `Afficher ${feature.title}`);
        const [number, label] = Array.from(button.querySelectorAll<HTMLElement>("span"));
        if (number) {
          number.textContent = String(index + 1).padStart(2, "0");
          number.classList.remove("text-white", "text-white/28", "group-hover:text-white/55");
          number.classList.add(isActive ? "text-white" : "text-white/28");
          if (!isActive) number.classList.add("group-hover:text-white/55");
        }
        if (label) {
          label.textContent = feature.title;
          label.classList.remove("text-white", "text-white/25", "group-hover:text-white/55");
          label.classList.add(isActive ? "text-white" : "text-white/25");
          if (!isActive) label.classList.add("group-hover:text-white/55");
        }
        button.toggleAttribute("aria-current", isActive);
        if (isActive) button.setAttribute("aria-current", "step");
      });

      const screen = root?.querySelector<HTMLElement>(".x-product-screen");
      const sidebarCodes = ["LC", "FD", "SR", "WL", "DC"];
      const sidebarItems = Array.from(screen?.querySelectorAll<HTMLElement>("span") ?? []).filter((item) =>
        /^(FV|LV|PR|HM|PF|DC)$/.test(item.textContent?.trim() ?? ""),
      );

      sidebarItems.forEach((item, index) => {
        const code = sidebarCodes[index];
        if (!code) {
          item.remove();
          return;
        }

        const isActive = index === activeIndex;
        item.textContent = code;
        item.classList.remove(
          "border-[#FF7A18]",
          "bg-[#FF7A18]/16",
          "shadow-[0_0_18px_rgba(255,122,24,0.18)]",
          "border-[#1C3555]",
          "bg-[#102744]",
        );
        item.classList.add(
          isActive ? "border-[#FF7A18]" : "border-[#1C3555]",
          isActive ? "bg-[#FF7A18]/16" : "bg-[#102744]",
        );
        if (isActive) item.classList.add("shadow-[0_0_18px_rgba(255,122,24,0.18)]");
      });

      const screenBody = screen?.lastElementChild instanceof HTMLElement ? screen.lastElementChild : null;
      if (!screenBody) return;

      const [syncBar, moduleHeader, progressCard, contentBlock, footerBlock] = Array.from(screenBody.children).filter(
        (element): element is HTMLElement => element instanceof HTMLElement,
      );

      const syncLabel = Array.from(syncBar?.querySelectorAll<HTMLElement>("div") ?? [])
        .reverse()
        .find((element) => element.textContent?.includes("Données synchronisées"));
      if (syncLabel) syncLabel.textContent = "Aperçu de l’outil · démo";

      const moduleCopy = moduleHeader?.firstElementChild instanceof HTMLElement ? moduleHeader.firstElementChild : null;
      if (moduleCopy) {
        const [eyebrow, title, tag] = Array.from(moduleCopy.children).filter(
          (element): element is HTMLElement => element instanceof HTMLElement,
        );
        if (eyebrow) eyebrow.textContent = "Dans Xerius";
        if (title) title.textContent = activeFeature.title;
        if (tag) tag.textContent = activeFeature.tag;
      }

      const stepBadge = moduleHeader?.lastElementChild;
      if (stepBadge instanceof HTMLElement) {
        stepBadge.textContent = `${String(activeIndex + 1).padStart(2, "0")} / 05`;
      }

      const progressLabel = progressCard?.querySelector<HTMLElement>(":scope > div:first-child > span:last-child");
      if (progressLabel) progressLabel.textContent = `MODULE ${String(activeIndex + 1).padStart(2, "0")}`;

      const progressFill = progressCard?.querySelector<HTMLElement>(":scope > div:last-child > div");
      if (progressFill) progressFill.style.width = `${((activeIndex + 1) / processFeatureDefinitions.length) * 100}%`;

      if (contentBlock) {
        if (activeFeature.kind === "wallet") {
          const summary = contentBlock.firstElementChild;
          const summaryTexts = summary?.querySelectorAll<HTMLElement>("p") ?? [];
          const summaryCopy = ["Historique récent", "30 jours", "Matchs et analyses suivis"];
          summaryTexts.forEach((element, index) => {
            const copy = summaryCopy[index];
            if (copy) element.textContent = copy;
          });

          const metricRows = contentBlock.querySelectorAll<HTMLElement>(":scope > div:nth-child(2) > div");
          metricRows.forEach((row, index) => {
            const copy = row.firstElementChild;
            const title = copy?.children[0];
            const meta = copy?.children[1];
            const badge = row.lastElementChild;
            const rowCopy = activeFeature.rows[index];
            if (!rowCopy) return;
            if (title instanceof HTMLElement) title.textContent = rowCopy.title;
            if (meta instanceof HTMLElement) meta.textContent = rowCopy.meta;
            if (badge instanceof HTMLElement) badge.textContent = rowCopy.badge;
          });
        } else {
          Array.from(contentBlock.children).forEach((row, index) => {
            if (!(row instanceof HTMLElement)) return;
            const copy = row.firstElementChild;
            const title = copy?.children[0];
            const meta = copy?.children[1];
            const badge = row.lastElementChild;
            const rowCopy = activeFeature.rows[index];
            if (!rowCopy) return;
            if (title instanceof HTMLElement) title.textContent = rowCopy.title;
            if (meta instanceof HTMLElement) meta.textContent = rowCopy.meta;
            if (badge instanceof HTMLElement) badge.textContent = rowCopy.badge;
          });
        }
      }

      const detail = footerBlock?.querySelector<HTMLElement>(".x-mockup-detail");
      if (detail) {
        detail.textContent = activeFeature.detail;
        const detailLabel = detail.previousElementSibling;
        if (detailLabel instanceof HTMLElement) detailLabel.textContent = "Concrètement";
      }
    };

    const renderProcess = () => {
      animationFrame = 0;
      if (!processSection || !processPanel || processStates.length === 0) return;

      const rect = processSection.getBoundingClientRect();
      const scrollRange = Math.max(1, processSection.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollRange, 0, 1);
      const index = Math.min(processStates.length - 1, Math.floor(progress * processStates.length));

      if (index !== activeProcessIndex) {
        const state = processStates[index];
        processPanel.innerHTML = state.html;
        processPanel.setAttribute("data-process-step", state.dataStep);
        processPanel.setAttribute("style", state.style);
        activeProcessIndex = index;
        normalizeProcessNavigation(index);
        bindProcessButtons();
      }

      const progressLine = processPanel.querySelector<HTMLElement>(".absolute.left-0.top-0.w-px.bg-\\[\\#FF9F43\\]");
      if (progressLine) progressLine.style.height = `${progress * 100}%`;
    };

    const scheduleProcessRender = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(renderProcess);
    };

    menuButton?.addEventListener("click", toggleMenu);
    mobileNavigation?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
    window.addEventListener("scroll", scheduleProcessRender, { passive: true });
    window.addEventListener("resize", scheduleProcessRender);

    fetch("/mirror/process-states.json")
      .then((response) => {
        if (!response.ok) throw new Error(`Impossible de charger les états du process (${response.status})`);
        return response.json() as Promise<ProcessState[]>;
      })
      .then((states) => {
        if (disposed) return;
        processStates = processFeatureDefinitions.flatMap((feature, index) => {
          const sourceState = states[feature.sourceIndex];
          return sourceState ? [{ ...sourceState, dataStep: String(index + 1) }] : [];
        });
        renderProcess();
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return () => {
      disposed = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      menuButton?.removeEventListener("click", toggleMenu);
      window.removeEventListener("scroll", scheduleProcessRender);
      window.removeEventListener("resize", scheduleProcessRender);
    };
  }, []);

  return null;
}
