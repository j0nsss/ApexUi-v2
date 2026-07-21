export function ComponentCardSkeleton() {
  return (
    <article className="component-card overflow-hidden" aria-hidden="true">
      {/* Preview area skeleton */}
      <div className="flex h-40 items-center justify-center bg-bg-base sm:h-48">
        <div className="h-8 w-8 animate-pulse rounded-full bg-border-default" />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-border-default" />
        <div className="mb-3 h-3 w-1/2 animate-pulse rounded bg-border-default" />

        {/* Creator row */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded-full bg-border-default" />
          <div className="h-3 w-20 animate-pulse rounded bg-border-default" />
        </div>
      </div>
    </article>
  )
}
