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
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a className="hover:text-zinc-200 transition" href="#features">
              Features
            </a>
            <a className="hover:text-zinc-200 transition" href="#showcase">
              Showcase
            </a>
            <a className="hover:text-zinc-200 transition" href="#pricing">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex h-9 items-center rounded-md border border-zinc-800 px-3 text-sm text-zinc-300 hover:bg-zinc-900 transition-colors">
              Docs
            </button>
            <button className="inline-flex h-9 items-center rounded-md bg-white px-4 text-sm font-medium text-black hover:bg-zinc-200 transition-colors">
              Get Started
            </button>
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
                <button className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-medium text-black hover:bg-zinc-200 transition-transform active:scale-95">
                  Start for free
                </button>
                <button className="inline-flex h-11 items-center rounded-md border border-zinc-800 px-5 text-sm text-zinc-300 hover:bg-zinc-900 transition-transform active:scale-95">
                  Watch demo
                </button>
              </div>
              <div className="hero-note mt-8 text-xs text-zinc-500">
                No credit card required
              </div>
            </div>

            {/* Prompt/Preview */}
            <div className="hero-preview mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 shadow-2xl shadow-black/50">
                <div className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wider">
                  Prompt
                </div>
                <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-4 min-h-[120px]">
                  <p className="text-zinc-300 text-sm leading-relaxed typing-effect">
                    Build a sleek SaaS landing page with a hero, feature grid of
                    four cards, testimonial, pricing, and a sticky header.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button className="inline-flex h-9 items-center rounded-md bg-white px-4 text-sm font-medium text-black hover:bg-zinc-200 transition-colors">
                    Generate
                  </button>
                  <button className="inline-flex h-9 items-center rounded-md border border-zinc-800 px-4 text-sm text-zinc-300 hover:bg-zinc-900 transition-colors">
                    Randomize
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 shadow-2xl shadow-black/50">
                <div className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wider">
                  Preview
                </div>
                <div className="rounded-lg border border-zinc-900 bg-linear-to-b from-zinc-900/30 to-zinc-950 p-6">
                  <div className="h-40 rounded-lg border border-zinc-800/60 bg-zinc-900/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="h-20 rounded-md border border-zinc-800/60 bg-zinc-900/40"></div>
                    <div className="h-20 rounded-md border border-zinc-800/60 bg-zinc-900/40"></div>
                    <div className="h-20 rounded-md border border-zinc-800/60 bg-zinc-900/40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-zinc-900/60 bg-zinc-950/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Everything you need to move fast
            </h2>
            <p className="mt-3 text-zinc-400">
              Production‑grade building blocks with sensible defaults and
              beautiful details.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              title="Accessible UI"
              desc="WCAG‑aware components out of the box"
              emoji="♿"
            />
            <FeatureCard
              title="Clean Code"
              desc="Readable React + Tailwind patterns"
              emoji="✨"
            />
            <FeatureCard
              title="Dark‑first"
              desc="Pristine dark UI with subtle depth"
              emoji="🌑"
            />
            <FeatureCard
              title="Ship fast"
              desc="From idea to deploy in minutes"
              emoji="⚡"
            />
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="border-t border-zinc-900/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="showcase-container rounded-xl border border-zinc-900 bg-zinc-950 shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-zinc-900 px-4 py-3 bg-zinc-900/50">
              <span className="size-3 rounded-full bg-zinc-700/50"></span>
              <span className="size-3 rounded-full bg-zinc-700/50"></span>
              <span className="size-3 rounded-full bg-zinc-700/50"></span>
            </div>
            <div className="p-6 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="h-64 md:h-80 w-full rounded-lg border border-zinc-800/60 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_60%)] shadow-inner"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="border-t border-zinc-900/60 bg-zinc-950/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-zinc-400">
              Start free. Upgrade when you are ready to scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PriceCard
              name="Free"
              price="$0"
              desc="Playground access and exports"
              highlight={false}
            />
            <PriceCard
              name="Pro"
              price="$19"
              desc="Unlimited projects and themes"
              highlight={true}
            />
            <PriceCard
              name="Team"
              price="$49"
              desc="Collaboration and roles"
              highlight={false}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="border-t border-zinc-900/60 pb-20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="cta-container relative overflow-hidden rounded-2xl border border-zinc-900 bg-linear-to-br from-zinc-900 to-zinc-950 p-8 md:p-16 text-center">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
                Turn ideas into polished interfaces
              </h3>
              <p className="mt-4 text-zinc-400 text-lg">
                Skip boilerplate. Keep the craft. Adaptar generates code you ll
                be proud to ship.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="inline-flex h-12 items-center rounded-md bg-white px-8 text-base font-medium text-black hover:bg-zinc-200 transition-transform hover:-translate-y-0.5">
                  Create your first project
                </button>
                <button className="inline-flex h-12 items-center rounded-md border border-zinc-800 px-8 text-base text-zinc-300 hover:bg-zinc-900 transition-transform hover:-translate-y-0.5">
                  Explore templates
                </button>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-white/5 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900/60 bg-[#0b0b0b]">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Adaptar" className="size-5" />
            <span className="font-medium text-zinc-300">Adaptar</span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span className="hidden md:inline">Build faster with AI</span>
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-zinc-300 transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-zinc-300 transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-zinc-300 transition-colors" href="#">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  desc: string;
  emoji: string;
};

function FeatureCard({ title, desc, emoji }: FeatureCardProps) {
  return (
    <div className="feature-card group rounded-xl border border-zinc-900 bg-zinc-950 p-6 hover:border-zinc-800 transition-colors duration-300">
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-xl group-hover:bg-zinc-900 transition-colors">
          <span>{emoji}</span>
        </div>
        <div>
          <div className="font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

type PriceCardProps = {
  name: string;
  price: string;
  desc: string;
  highlight?: boolean;
};

function PriceCard({ name, price, desc, highlight }: PriceCardProps) {
  return (
    <div
      className={[
        "price-card relative rounded-xl border p-8 transition-transform duration-300 hover:-translate-y-1",
        highlight
          ? "border-zinc-700 bg-zinc-900/20 ring-1 ring-zinc-700/50"
          : "border-zinc-900 bg-zinc-950",
      ].join(" ")}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black shadow-lg">
            Most Popular
          </span>
        </div>
      )}
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-sm font-medium text-zinc-400">{name}</div>
          <div className="mt-2 text-4xl font-bold text-white tracking-tight">
            {price}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{desc}</p>
      <ul className="mt-6 space-y-3 text-sm text-zinc-300">
        <li className="flex items-center gap-2">
          <span className="text-white">✓</span> Unlimited exports
        </li>
        <li className="flex items-center gap-2">
          <span className="text-white">✓</span> Access to all templates
        </li>
        {highlight && (
          <li className="flex items-center gap-2">
            <span className="text-white">✓</span> Priority support
          </li>
        )}
      </ul>
      <button
        className={[
          "mt-8 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-medium transition-colors",
          highlight
            ? "bg-white text-black hover:bg-zinc-200"
            : "border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800",
        ].join(" ")}
      >
        Choose {name}
      </button>
    </div>
  );
}
