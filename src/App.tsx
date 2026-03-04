import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header reveal
      gsap.from("header", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Hero content stagger
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-title span", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        })
        .from(
          ".hero-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-buttons button",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".hero-note",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2",
        );

      // Hero Grid Preview
      gsap.from(".hero-preview", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });

      // Features Stagger
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: "#features",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Showcase Parallax/Reveal
      gsap.from(".showcase-container", {
        scrollTrigger: {
          trigger: "#showcase",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Pricing Stagger
      gsap.from(".price-card", {
        scrollTrigger: {
          trigger: "#pricing",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // CTA Reveal
      gsap.from(".cta-container", {
        scrollTrigger: {
          trigger: "#cta",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-900/60 bg-[#0b0b0b]/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Adaptar" className="size-8" />
            <span className="text-lg font-semibold tracking-tight">
              Adaptar
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://docs.adaptar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-9 items-center rounded-md border border-zinc-800 px-3 text-sm text-zinc-300 hover:bg-zinc-900 transition-colors"
            >
              Docs
            </a>
            <a
              href="https://adaptar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-md bg-white px-4 text-sm font-medium text-black hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]"></div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="hero-title text-4xl md:text-6xl font-semibold tracking-tight">
                <span className="block">Design, build, and launch</span>
                <span className="block mt-2">
                  with{" "}
                  <span className="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Adaptar
                  </span>
                </span>
              </h1>
              <p className="hero-desc mt-6 text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
                Describe your vision once. Get production‑ready React, Tailwind,
                and accessible UI in seconds.
              </p>
              <div className="hero-buttons mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://adaptar.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-medium text-black hover:bg-zinc-200 transition-transform active:scale-95"
                >
                  Start for free
                </a>
              </div>
              <div className="hero-note mt-8 text-xs text-zinc-500">
                No credit card required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900/60 bg-[#0b0b0b]">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <a
            href="https://adaptar.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <img src="/logo.svg" alt="Adaptar" className="size-5" />
            <span className="font-medium text-zinc-300">Adaptar</span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span className="hidden md:inline">Build faster with AI</span>
          </a>
          <div className="flex items-center gap-6"></div>
        </div>
      </footer>
    </div>
  );
}
