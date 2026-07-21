import Link from 'next/link'

export function HeroSection({ componentCount }: { componentCount: number }) {
  return (
    <section className="relative overflow-hidden border-b border-border-default bg-bg-base py-20 lg:py-28">
      {/* Dot grid background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Component count badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-pill border border-border-default bg-bg-surface px-4 py-1.5 text-small text-text-secondary">
          <span className="h-2 w-2 rounded-full bg-accent-emerald" />
          {componentCount}+ Components
        </div>

        {/* Headline */}
        <h1 className="text-display font-extrabold text-text-primary">
          Beautiful UI Components,
          <br />
          Free Forever.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-4 max-w-2xl text-body text-text-secondary">
          Discover, preview, and copy production-ready UI components built with Tailwind CSS.
          Community-driven, curated, and always free.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#components"
            className="rounded-md bg-accent-violet px-6 py-3 text-label font-semibold text-white transition-colors hover:bg-accent-violet-hover"
          >
            Browse Components
          </a>
          <Link
            href="/submit"
            className="rounded-md border border-border-default bg-bg-surface px-6 py-3 text-label font-medium text-text-primary transition-colors hover:bg-bg-elevated"
          >
            Submit a Component
          </Link>
        </div>
      </div>
    </section>
  )
}
