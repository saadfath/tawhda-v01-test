import { useEffect, useRef } from 'react'
import { Card } from '../ui/Card'
import { OptionButton } from './OptionButton'
import { quiz } from '../../content/texts.ar'

export function QuestionCard({
  question,
  index,
  total,
  selectedOptionId,
  onSelect,
  disabled = false,
}) {
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [question.id])

  const categoryLabel = quiz.categories[question.category] ?? question.category

  return (
    <Card className="p-5 sm:p-7 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-ivory-dark px-3 py-1 text-xs font-semibold text-green">
          {categoryLabel}
        </span>
        <span className="font-latin text-xs font-semibold text-ink-soft">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 text-xl font-extrabold leading-9 text-ink sm:text-2xl sm:leading-10"
      >
        {question.question_ar}
      </h2>

      <fieldset className="mt-6">
        <legend className="sr-only">{question.question_ar}</legend>
        <div className="space-y-3">
          {question.options.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              name={`question-${question.id}`}
              checked={selectedOptionId === option.id}
              onChange={onSelect}
              disabled={disabled}
            />
          ))}
        </div>
      </fieldset>

      <p className="mt-4 text-xs text-ink-soft" aria-live="polite">
        {selectedOptionId ? '' : quiz.selectPrompt}
      </p>
    </Card>
  )
}
