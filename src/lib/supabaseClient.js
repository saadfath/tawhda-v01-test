const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

// The anon/publishable key is public by design; RLS protects the data.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let clientPromise

// Supabase is loaded only when the quiz needs it, and only when the two public
// environment variables exist. This keeps the demo build free of the client.
export function getSupabase() {
  if (!isSupabaseConfigured) {
    return Promise.reject(new Error('Supabase is not configured'))
  }

  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      }),
    )
  }

  return clientPromise
}
