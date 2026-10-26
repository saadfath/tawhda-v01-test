// supabase/functions/submit-quiz/index.ts
// Grades a quiz attempt server-side with the service role. The browser never
// receives answer keys before submitting.

import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2'

const ALLOWED_ORIGIN = Deno.env.get('SITE_ORIGIN') ?? '*'

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  Vary: 'Origin',
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type Option = { id: string; ar?: string; fr?: string }

type QuestionRow = {
  id: string
  question_ar: string
  options: Option[]
  source_url: string | null
  display_order: number
}

type KeyRow = {
  question_id: string
  correct_option_id: string
  explanation_ar: string
}

type AnswerInput = {
  question_id: string
  selected_option_id: string
}

type ResponseRow = {
  question_id: string
  selected_option_id: string
  is_correct: boolean
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function buildReview(
  responses: ResponseRow[],
  questions: QuestionRow[],
  keys: KeyRow[],
) {
  const questionById = new Map(questions.map((question) => [question.id, question]))
  const keyById = new Map(keys.map((key) => [key.question_id, key]))

  return responses
    .map((response) => {
      const question = questionById.get(response.question_id)
      const key = keyById.get(response.question_id)
      if (!question) return null

      const selected = question.options.find(
        (option) => option.id === response.selected_option_id,
      )
      const correct = question.options.find(
        (option) => option.id === key?.correct_option_id,
      )

      return {
        question_id: question.id,
        question_ar: question.question_ar,
        options: question.options,
        selected_option_id: response.selected_option_id,
        selected_option_ar: selected?.ar ?? null,
        correct_option_id: key?.correct_option_id ?? null,
        correct_option_ar: correct?.ar ?? null,
        is_correct: response.is_correct,
        explanation_ar: key?.explanation_ar ?? '',
        source_url: question.source_url,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => {
      const orderA = questionById.get(a.question_id)?.display_order ?? 0
      const orderB = questionById.get(b.question_id)?.display_order ?? 0
      return orderA - orderB
    })
}

async function loadStoredResult(
  db: SupabaseClient,
  attemptId: string,
) {
  const { data: submission, error: submissionError } = await db
    .from('quiz_submissions')
    .select('id, score, total_questions, percentage, language')
    .eq('attempt_id', attemptId)
    .maybeSingle()

  if (submissionError) throw submissionError
  if (!submission) return null

  const { data: responses, error: responsesError } = await db
    .from('quiz_responses')
    .select('question_id, selected_option_id, is_correct')
    .eq('submission_id', submission.id)

  if (responsesError) throw responsesError

  const questionIds = (responses ?? []).map((response) => response.question_id)
  if (questionIds.length === 0) {
    return {
      submissionId: submission.id,
      score: submission.score,
      total: submission.total_questions,
      percentage: Number(submission.percentage),
      language: submission.language,
      review: [],
    }
  }

  const { data: questions, error: questionsError } = await db
    .from('questions')
    .select('id, question_ar, options, source_url, display_order')
    .in('id', questionIds)

  if (questionsError) throw questionsError

  const { data: keys, error: keysError } = await db
    .from('answer_keys')
    .select('question_id, correct_option_id, explanation_ar')
    .in('question_id', questionIds)

  if (keysError) throw keysError

  return {
    submissionId: submission.id,
    score: submission.score,
    total: submission.total_questions,
    percentage: Number(submission.percentage),
    language: submission.language,
    review: buildReview(
      (responses ?? []) as ResponseRow[],
      (questions ?? []) as QuestionRow[],
      (keys ?? []) as KeyRow[],
    ),
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  if (!body || typeof body !== 'object') {
    return json({ error: 'Invalid input' }, 400)
  }

  const { attempt_id, language = 'ar', answers } = body as Record<
    string,
    unknown
  >

  if (
    typeof attempt_id !== 'string' ||
    !UUID_RE.test(attempt_id) ||
    typeof language !== 'string' ||
    !['ar', 'fr'].includes(language)
  ) {
    return json({ error: 'Invalid input' }, 400)
  }

  if (!Array.isArray(answers) || answers.length === 0 || answers.length > 20) {
    return json({ error: 'Invalid answers' }, 400)
  }

  const parsedAnswers: AnswerInput[] = []
  const answerIds = new Set<string>()

  for (const item of answers) {
    if (!item || typeof item !== 'object') {
      return json({ error: 'Invalid answers' }, 400)
    }

    const { question_id, selected_option_id } = item as Record<string, unknown>

    if (
      typeof question_id !== 'string' ||
      !UUID_RE.test(question_id) ||
      typeof selected_option_id !== 'string' ||
      !['a', 'b', 'c', 'd'].includes(selected_option_id) ||
      answerIds.has(question_id)
    ) {
      return json({ error: 'Invalid answers' }, 400)
    }

    answerIds.add(question_id)
    parsedAnswers.push({
      question_id,
      selected_option_id,
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase runtime environment variables')
    return json({ error: 'Server configuration error' }, 500)
  }

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  try {
    // Idempotency: a repeated attempt returns the result already stored.
    const stored = await loadStoredResult(db, attempt_id)
    if (stored) return json(stored)

    // The client must answer every active question, no more and no less.
    const { data: activeQuestions, error: activeError } = await db
      .from('questions')
      .select('id')
      .eq('is_active', true)

    if (activeError) throw activeError

    const activeIds = new Set(
      (activeQuestions ?? []).map((question) => question.id),
    )

    if (
      activeIds.size !== parsedAnswers.length ||
      [...activeIds].some((id) => !answerIds.has(id))
    ) {
      return json({ error: 'Answers do not match active questions' }, 400)
    }

    const questionIds = [...answerIds]

    const { data: questions, error: questionsError } = await db
      .from('questions')
      .select('id, question_ar, options, source_url, display_order')
      .in('id', questionIds)
      .eq('is_active', true)

    if (questionsError) throw questionsError

    const { data: keys, error: keysError } = await db
      .from('answer_keys')
      .select('question_id, correct_option_id, explanation_ar')
      .in('question_id', questionIds)

    if (keysError) throw keysError

    const questionRows = (questions ?? []) as QuestionRow[]
    const keyRows = (keys ?? []) as KeyRow[]

    if (
      questionRows.length !== questionIds.length ||
      keyRows.length !== questionIds.length
    ) {
      return json({ error: 'Quiz data is incomplete' }, 409)
    }

    const questionById = new Map(
      questionRows.map((question) => [question.id, question]),
    )
    const keyById = new Map(keyRows.map((key) => [key.question_id, key]))

    for (const answer of parsedAnswers) {
      const question = questionById.get(answer.question_id)
      if (
        !question ||
        !question.options.some(
          (option) => option.id === answer.selected_option_id,
        )
      ) {
        return json({ error: 'Unknown question or option' }, 400)
      }
    }

    const responses: ResponseRow[] = parsedAnswers.map((answer) => ({
      question_id: answer.question_id,
      selected_option_id: answer.selected_option_id,
      is_correct:
        keyById.get(answer.question_id)?.correct_option_id ===
        answer.selected_option_id,
    }))

    const total = questionRows.length
    const score = responses.filter((response) => response.is_correct).length
    const percentage = Math.round((score / total) * 10000) / 100

    const { data: submission, error: submissionError } = await db
      .from('quiz_submissions')
      .insert({
        attempt_id,
        score,
        total_questions: total,
        percentage,
        language,
      })
      .select('id')
      .single()

    if (submissionError) {
      // Concurrent duplicate: return the winner's stored result.
      if (submissionError.code === '23505') {
        const winner = await loadStoredResult(db, attempt_id)
        if (winner) return json(winner)
      }
      throw submissionError
    }

    const { error: responsesError } = await db.from('quiz_responses').insert(
      responses.map((response) => ({
        submission_id: submission.id,
        ...response,
      })),
    )

    if (responsesError) {
      await db.from('quiz_submissions').delete().eq('id', submission.id)
      throw responsesError
    }

    return json({
      submissionId: submission.id,
      score,
      total,
      percentage,
      language,
      review: buildReview(responses, questionRows, keyRows),
    })
  } catch (error) {
    console.error('submit-quiz failed', error)
    return json({ error: 'Could not process the submission' }, 500)
  }
})
