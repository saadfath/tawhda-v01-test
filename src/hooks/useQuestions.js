import { useCallback, useEffect, useState } from 'react'
import { fetchQuestions } from '../lib/quizApi'

export function useQuestions() {
  const [questions, setQuestions] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [requestId, setRequestId] = useState(0)

  const reload = useCallback(() => {
    setStatus('loading')
    setError(null)
    setRequestId((value) => value + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    fetchQuestions()
      .then((data) => {
        if (cancelled) return
        setQuestions(data)
        setStatus('ready')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [requestId])

  return { questions, status, error, reload }
}
