import { useState } from 'react'
import { submitQuiz } from '../lib/quizApi'

function createAttemptId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

export function useQuiz(questions, language = 'ar') {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [attemptId, setAttemptId] = useState(createAttemptId)
  const [status, setStatus] = useState('answering')
  const [result, setResult] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  const currentQuestion = questions[index] ?? null
  const selectedOptionId = currentQuestion
    ? (answers[currentQuestion.id] ?? null)
    : null
  const isLast = questions.length > 0 && index === questions.length - 1
  const canAdvance = Boolean(selectedOptionId)
  const answeredCount = Object.keys(answers).length
  const allAnswered =
    questions.length > 0 && questions.every((question) => answers[question.id])

  function selectOption(optionId) {
    if (!currentQuestion) return
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId,
    }))
    setSubmitError(null)
  }

  function next() {
    if (!canAdvance || isLast) return
    setIndex((value) => Math.min(value + 1, questions.length - 1))
  }

  function previous() {
    setIndex((value) => Math.max(value - 1, 0))
  }

  async function submit() {
    if (status === 'submitting' || !allAnswered) return

    setStatus('submitting')
    setSubmitError(null)

    try {
      const payload = questions.map((question) => ({
        question_id: question.id,
        selected_option_id: answers[question.id],
      }))

      const data = await submitQuiz({ attemptId, language, answers: payload })
      setResult(data)
      setStatus('results')
    } catch (error) {
      setSubmitError(error.message || 'Submit failed')
      setStatus('answering')
    }
  }

  function restart() {
    setIndex(0)
    setAnswers({})
    setAttemptId(createAttemptId())
    setStatus('answering')
    setResult(null)
    setSubmitError(null)
  }

  return {
    index,
    answers,
    attemptId,
    status,
    result,
    submitError,
    currentQuestion,
    selectedOptionId,
    isLast,
    canAdvance,
    answeredCount,
    allAnswered,
    selectOption,
    next,
    previous,
    submit,
    restart,
  }
}
