export default function App() {
  return (
    <div className="h-screen bg-[#0b0b0b] text-white">
      <div className="flex justify-between items-center px-6 py-4 mx-auto max-w-7xl">
        <a href="/" className="flex gap-3 items-center">
          <img src="/logo.svg" alt="Adaptar" className="size-8" />
          <span className="text-lg font-semibold tracking-tight">Adaptar</span>
        </a>

        <div className="flex gap-3 items-center">
          <a
            href="https://docs.adaptar.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center px-3 h-9 text-sm rounded-md border transition-colors sm:inline-flex border-zinc-800 text-zinc-300 hover:bg-zinc-900"
          >
            Docs
          </a>
          <a
            href="https://adaptar.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 h-9 text-sm font-medium text-black bg-white rounded-md transition-colors hover:bg-zinc-200"
          >
            Get Started
          </a>
        </div>
      </div>

      <section className="flex justify-center items-center h-[80vh]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]"></div>
        <div className="px-6 mx-auto max-w-7xl">
          <div className="py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight hero-title md:text-6xl">
                <span className="block">Design, build, and launch</span>
                <span className="block mt-2">
                  with <span className="">Adaptar</span>
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base hero-desc text-zinc-400 md:text-lg">
                Describe your vision once. Get production‑ready React, Tailwind,
                and accessible UI in seconds.
              </p>
              <div className="flex flex-col gap-3 justify-center items-center mt-8 hero-buttons sm:flex-row">
                <a
                  href="https://adaptar.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 h-11 text-sm font-medium text-black bg-white rounded-md transition-transform hover:bg-zinc-200 active:scale-95"
                >
                  Start for free
                </a>
              </div>
              <div className="mt-8 text-xs hero-note text-zinc-500">
                No credit card required
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
