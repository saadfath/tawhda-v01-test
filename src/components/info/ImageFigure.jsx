export function ImageFigure({
  src,
  alt,
  caption,
  credit,
  width = 1200,
  height = 800,
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-gold/40 bg-white shadow-card">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="h-auto w-full"
      />
      <figcaption className="flex flex-col gap-1 border-t border-gold/30 p-4 text-xs leading-6 text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <span>{caption}</span>
        <span className="shrink-0 text-ink-soft/70">{credit}</span>
      </figcaption>
    </figure>
  )
}
