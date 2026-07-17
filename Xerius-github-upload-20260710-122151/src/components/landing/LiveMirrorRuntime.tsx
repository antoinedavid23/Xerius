"use client";

import { useEffect } from "react";

type ProcessState = {
  html: string;
  dataStep: string;
  style: string;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function LiveMirrorRuntime() {
  useEffect(() => {
    const menuButton = document.querySelector<HTMLButtonElement>(".cs-hero-menu-button");
    const mobileNavigation = document.querySelector<HTMLElement>("#cs-hero-mobile-navigation");
    const processSection = document.querySelector<HTMLElement>("#matchs");
    const processPanel = processSection?.querySelector<HTMLElement>(".feature-scroll-bg");

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
      processPanel?.querySelectorAll<HTMLButtonElement>('button[aria-label^="Voir la feature"]').forEach((button) => {
        button.onclick = () => {
          const match = button.getAttribute("aria-label")?.match(/Voir la feature (\d+)/);
          if (match) scrollToProcessStep(Number(match[1]) - 1);
        };
      });
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
        processStates = states;
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
