import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseReady = Boolean(
    env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY,
  )
  const demoBuild = mode === 'demo'

  // A normal production build must never contain the demo answer keys. Fail
  // loudly instead of silently deploying a quiz with its answers in the bundle.
  if (command === 'build' && !supabaseReady && !demoBuild) {
    throw new Error(
      'Refusing to build: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required ' +
        'for a production build. For a local demo build with browser-side grading, ' +
        'run "npm run build:demo" instead.',
    )
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // Answers are bundled ONLY for the local demo build. As soon as the
        // Supabase environment variables exist, the demo module is replaced by
        // an empty stub so no answer key can end up in the production bundle.
        '@demo-questions': fileURLToPath(
          new URL(
            supabaseReady && !demoBuild
              ? './src/data/emptyQuestions.js'
              : './src/data/demoQuestions.js',
            import.meta.url,
          ),
        ),
      },
    },
  }
})
