export default function App() {
  return (
    <div className="h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Adaptar" className="size-8" />
          <span className="text-lg font-semibold tracking-tight">Adaptar</span>
        </a>

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

      <section className="flex justify-center items-center h-[80vh]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]"></div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="hero-title text-4xl md:text-6xl font-semibold tracking-tight">
                <span className="block">Design, build, and launch</span>
                <span className="block mt-2">
                  with <span className="">Adaptar</span>
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
    </div>
  );
}
