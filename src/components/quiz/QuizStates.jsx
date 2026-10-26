import { AlertTriangle, HelpCircle, Loader2, RotateCcw } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { quiz } from '../../content/texts.ar'

export function QuizLoading() {
  return (
    <Card className="mx-auto max-w-xl p-8 text-center md:p-10">
      <Loader2
        className="mx-auto size-8 animate-spin text-green"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-bold text-ink">{quiz.loadingTitle}</h2>
      <p className="mt-2 text-sm text-ink-soft">{quiz.loadingBody}</p>
      <div className="mt-6 space-y-2" aria-hidden="true">
        <div className="h-2.5 w-full animate-pulse rounded-full bg-ivory-dark" />
        <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-ivory-dark" />
        <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-ivory-dark" />
      </div>
    </Card>
  )
}

export function QuizEmpty() {
  return (
    <Card className="mx-auto max-w-xl p-8 text-center md:p-10">
      <HelpCircle
        className="mx-auto size-8 text-gold"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-bold text-ink">{quiz.emptyTitle}</h2>
      <p className="mt-2 text-sm leading-7 text-ink-soft">{quiz.emptyBody}</p>
      <Button to="/info" variant="secondary" className="mt-6">
        {quiz.backToInfo}
      </Button>
    </Card>
  )
}

export function QuizError({ onRetry }) {
  return (
    <Card className="mx-auto max-w-xl p-8 text-center md:p-10">
      <AlertTriangle
        className="mx-auto size-8 text-error"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-bold text-ink">{quiz.errorTitle}</h2>
      <p className="mt-2 text-sm leading-7 text-ink-soft">{quiz.errorBody}</p>
      <Button onClick={onRetry} className="mt-6">
        <RotateCcw className="size-4" aria-hidden="true" />
        {quiz.retry}
      </Button>
    </Card>
  )
}
