import { getSupabase, isSupabaseConfigured } from './supabaseClient'

export const isDemoMode = !isSupabaseConfigured

let demoModulePromise

async function loadDemoQuestions() {
  if (!demoModulePromise) {
    demoModulePromise = import('@demo-questions').then((module) => module.default)
  }
  return demoModulePromise
}

function normalizeQuestion(row) {
  return {
    id: row.id,
    question_ar: row.question_ar,
    options: Array.isArray(row.options)
      ? row.options.filter((option) => option?.id && option?.ar)
      : [],
    category: row.category ?? 'context',
    display_order: row.display_order ?? 0,
    source_url: row.source_url ?? null,
  }
}

export async function fetchQuestions() {
  if (!isSupabaseConfigured) {
    const demo = await loadDemoQuestions()
    return demo.map(normalizeQuestion)
  }

  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('questions')
    .select('id, question_ar, options, category, display_order, source_url')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    throw new Error(error.message || 'Could not load questions')
  }

  return (data ?? []).map(normalizeQuestion)
}

function gradeLocally(demoQuestions, answers, language) {
  const answerMap = new Map(
    answers.map((answer) => [answer.question_id, answer.selected_option_id]),
  )

  const review = demoQuestions.map((question) => {
    const selectedId = answerMap.get(question.id) ?? null
    const selected = question.options.find((option) => option.id === selectedId)
    const correct = question.options.find(
      (option) => option.id === question.correct_option_id,
    )

    return {
      question_id: question.id,
      question_ar: question.question_ar,
      options: question.options,
      selected_option_id: selectedId,
      selected_option_ar: selected?.ar ?? null,
      correct_option_id: question.correct_option_id,
      correct_option_ar: correct?.ar ?? null,
      is_correct: selectedId === question.correct_option_id,
      explanation_ar: question.explanation_ar,
      source_url: question.source_url,
    }
  })

  const total = review.length
  const score = review.filter((item) => item.is_correct).length
  const percentage = total ? Math.round((score / total) * 10000) / 100 : 0

  return {
    score,
    total,
    percentage,
    language,
    review,
    demo: true,
  }
}

export async function submitQuiz({ attemptId, language = 'ar', answers }) {
  if (!isSupabaseConfigured) {
    const demo = await loadDemoQuestions()
    return gradeLocally(demo, answers, language)
  }

  const supabase = await getSupabase()
  const { data, error } = await supabase.functions.invoke('submit-quiz', {
    body: {
      attempt_id: attemptId,
      language,
      answers,
    },
  })

  if (error) {
    // supabase-js hides the response body on non-2xx responses; try to read it.
    let message = error.message || 'Could not submit the quiz'
    try {
      const body = await error.context?.json?.()
      if (body?.error) message = body.error
    } catch {
      // Keep the original message.
    }
    throw new Error(message)
  }

  if (!data || typeof data.score !== 'number' || !Array.isArray(data.review)) {
    throw new Error('Unexpected response from the grading function')
  }

  return data
}
