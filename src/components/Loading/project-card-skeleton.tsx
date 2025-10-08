import { cn } from "@/lib/utils"

export function ProjectCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-xl border  p-4 md:p-5 shadow-sm", className)}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading project card"
    >
      {/* Header: title + small icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-6 w-2/3 rounded-md bg-card" />
          <div className="flex items-center gap-2">
            <span className="h-5 w-16 rounded-full bg-card" />
            <span className="h-5 w-24 rounded-full bg-card" />
          </div>
        </div>
        <div className="h-5 w-5 shrink-0 rounded-full bg-card" />
      </div>

      {/* Description lines */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-11/12 rounded-md bg-card" />
        <div className="h-4 w-10/12 rounded-md bg-card" />
        <div className="h-4 w-7/12 rounded-md bg-card" />
      </div>

      {/* Tech tags as pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="h-6 w-16 rounded-full bg-card" />
        <span className="h-6 w-20 rounded-full bg-card" />
        <span className="h-6 w-16 rounded-full bg-card" />
        <span className="h-6 w-24 rounded-full bg-card" />
        <span className="h-6 w-20 rounded-full bg-card" />
      </div>

      {/* Footer: coin + number on left, circular button on right */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-card" />
          <span className="h-4 w-10 rounded-md bg-card" />
        </div>
        <div className="h-10 w-10 rounded-full bg-card" />
      </div>

      <span className="sr-only">Loading content…</span>
    </div>
  )
}
