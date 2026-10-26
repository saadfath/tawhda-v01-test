import { AlertTriangle, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Callout } from '../components/ui/Callout'
import { ProgressBar } from '../components/ui/ProgressBar'
import { QuestionCard } from '../components/quiz/QuestionCard'
import { ResultSummary } from '../components/quiz/ResultSummary'
import { ReviewList } from '../components/quiz/ReviewList'
import { QuizEmpty, QuizError, QuizLoading } from '../components/quiz/QuizStates'
import { quiz } from '../content/texts.ar'
import { usePageTitle } from '../hooks/usePageTitle'
import { useQuestions } from '../hooks/useQuestions'
import { useQuiz } from '../hooks/useQuiz'
import { isDemoMode } from '../lib/quizApi'

function QuizHeader() {
  return (
    <header className="relative overflow-hidden border-b border-gold/30">
      <div
        className="bg-star-pattern pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="container-site relative py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">
          {quiz.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
          {quiz.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-9 text-ink-soft">
          {quiz.lead}
        </p>

        {isDemoMode ? (
          <div className="mt-6 max-w-2xl">
            <Callout variant="warning" title={quiz.demoTitle}>
              <p>{quiz.demoNotice}</p>
            </Callout>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export function QuizPage() {
  usePageTitle(quiz.title)

  const { questions, status, reload } = useQuestions()
  const state = useQuiz(questions)
  const total = questions.length
  const hasResult = Boolean(state.result)
  const submitting = state.status === 'submitting'

  return (
    <>
      {!hasResult ? <QuizHeader /> : null}

      {hasResult ? (
        <div className="container-site py-10 md:py-14">
          <ResultSummary result={state.result} onRestart={state.restart} />

          <section className="mx-auto mt-12 max-w-3xl">
            <div className="flex flex-col gap-2 border-s-4 border-gold ps-4">
              <h2 className="text-2xl font-extrabold text-ink">
                {quiz.reviewTitle}
              </h2>
              <p className="text-sm leading-7 text-ink-soft">
                {quiz.reviewLead}
              </p>
            </div>
            <div className="mt-5">
              <ReviewList review={state.result.review} />
            </div>
          </section>
        </div>
      ) : (
        <div className="container-site py-10 md:py-14">
          {status === 'loading' ? <QuizLoading /> : null}
          {status === 'error' ? <QuizError onRetry={reload} /> : null}
          {status === 'ready' && questions.length === 0 ? <QuizEmpty /> : null}

          {status === 'ready' && questions.length > 0 ? (
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ink">
                  {quiz.questionOf} {state.index + 1} {quiz.of} {total}
                </p>
                <p className="font-latin text-xs font-semibold text-ink-soft">
                  {state.answeredCount}/{total}
                </p>
              </div>

              <ProgressBar
                value={state.index + 1}
                max={total}
                label={`${quiz.questionOf} ${state.index + 1} ${quiz.of} ${total}`}
                className="mt-3"
              />

              <div className="mt-6">
                <QuestionCard
                  question={state.currentQuestion}
                  index={state.index}
                  total={total}
                  selectedOptionId={state.selectedOptionId}
                  onSelect={state.selectOption}
                  disabled={submitting}
                />
              </div>

              {state.submitError ? (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 rounded-2xl border border-red/30 bg-red/5 p-4"
                >
                  <AlertTriangle
                    className="mt-0.5 size-5 shrink-0 text-error"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-bold text-error">
                      {quiz.submitErrorTitle}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-ink-soft">
                      {quiz.submitError}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="secondary"
                  onClick={state.previous}
                  disabled={state.index === 0 || submitting}
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                  {quiz.previous}
                </Button>

                {state.isLast ? (
                  <Button
                    onClick={state.submit}
                    disabled={!state.allAnswered || submitting}
                  >
                    {submitting ? (
                      <Loader2
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : null}
                    {submitting ? quiz.submitting : quiz.submit}
                  </Button>
                ) : (
                  <Button onClick={state.next} disabled={!state.canAdvance}>
                    {quiz.next}
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}
