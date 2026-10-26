import { useEffect, useRef } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { Button } from '../ui/Button'
import { quiz } from '../../content/texts.ar'

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function messageFor(percentage) {
  if (percentage === 100) return quiz.messages.perfect
  if (percentage >= 70) return quiz.messages.good
  if (percentage >= 40) return quiz.messages.fair
  return quiz.messages.low
}

export function ResultSummary({ result, onRestart }) {
  const headingRef = useRef(null)
  const percentage = Number(result.percentage) || 0
  const offset = CIRCUMFERENCE * (1 - Math.min(percentage, 100) / 100)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="rounded-[2rem] border border-gold/40 bg-white p-6 shadow-card sm:p-8 md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">
            {quiz.resultsKicker}
          </p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl"
          >
            {quiz.resultsTitle}
          </h1>
          <p className="mt-3 text-lg font-semibold text-green">
            {quiz.correctOf(result.score, result.total)}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-ink-soft">
            {messageFor(percentage)}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button onClick={onRestart}>
              <RotateCcw className="size-4" aria-hidden="true" />
              {quiz.restart}
            </Button>
            <Button to="/info" variant="secondary">
              {quiz.backToInfo}
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          className="relative mx-auto size-40 shrink-0 sm:size-44"
          role="img"
          aria-label={`${quiz.percentage}: ${percentage}%`}
        >
          <svg viewBox="0 0 140 140" className="size-full -rotate-90">
            <circle
              cx="70"
              cy="70"
              r={RADIUS}
              fill="none"
              stroke="rgba(27, 31, 35, 0.09)"
              strokeWidth="10"
            />
            <circle
              cx="70"
              cy="70"
              r={RADIUS}
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-latin text-3xl font-bold text-ink">
              {result.score}/{result.total}
            </span>
            <span className="mt-1 font-latin text-sm font-semibold text-green">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
