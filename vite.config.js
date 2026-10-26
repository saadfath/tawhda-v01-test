import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseReady = Boolean(
    env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY,
  )

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // Answers are bundled ONLY for the local demo build. As soon as the
        // Supabase environment variables exist, the demo module is replaced by
        // an empty stub so no answer key can end up in the production bundle.
        '@demo-questions': fileURLToPath(
          new URL(
            supabaseReady
              ? './src/data/emptyQuestions.js'
              : './src/data/demoQuestions.js',
            import.meta.url,
          ),
        ),
      },
    },
  }
})
