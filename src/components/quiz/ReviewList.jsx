import { CheckCircle2, ExternalLink, XCircle } from 'lucide-react'
import { quiz } from '../../content/texts.ar'
import { cx } from '../../lib/cx'

export function ReviewList({ review }) {
  return (
    <div className="space-y-4">
      {review.map((item, index) => (
        <article
          key={item.question_id}
          className="rounded-2xl border border-gold/40 bg-white p-5 shadow-card md:p-6"
        >
          <div className="flex items-start gap-3">
            <span
              className={cx(
                'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
                item.is_correct
                  ? 'bg-green-soft text-green'
                  : 'bg-red/10 text-error',
              )}
              aria-hidden="true"
            >
              {item.is_correct ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <XCircle className="size-5" />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-latin text-[0.7rem] font-semibold text-ink-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={cx(
                    'rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold',
                    item.is_correct
                      ? 'bg-green-soft text-green'
                      : 'bg-red/10 text-error',
                  )}
                >
                  {item.is_correct ? quiz.correct : quiz.incorrect}
                </span>
              </div>

              <h3 className="mt-2 text-base font-bold leading-7 text-ink">
                {item.question_ar}
              </h3>

              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div
                  className={cx(
                    'rounded-xl border p-3',
                    item.is_correct
                      ? 'border-green/25 bg-green-soft/60'
                      : 'border-red/20 bg-red/5',
                  )}
                >
                  <dt className="text-[0.7rem] font-semibold text-ink-soft">
                    {quiz.yourAnswer}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {item.selected_option_ar ?? quiz.notAnswered}
                  </dd>
                </div>

                {!item.is_correct ? (
                  <div className="rounded-xl border border-green/25 bg-green-soft/60 p-3">
                    <dt className="text-[0.7rem] font-semibold text-ink-soft">
                      {quiz.correctAnswer}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">
                      {item.correct_option_ar}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-4 rounded-xl bg-ivory/80 p-4">
                <p className="text-xs font-bold text-green">{quiz.explanation}</p>
                <p className="mt-1 text-sm leading-7 text-ink-soft">
                  {item.explanation_ar}
                </p>
              </div>

              {item.source_url ? (
                <a
                  href={item.source_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-green underline decoration-gold/70 underline-offset-4 transition hover:text-green-dark"
                >
                  {quiz.source}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">(يفتح في نافذة جديدة)</span>
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
