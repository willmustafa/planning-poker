import { createClient } from '@supabase/supabase-js'

export const fetchClient = createClient(
  import.meta.env.VITE_DB_PROJECT_URL,
  import.meta.env.VITE_DB_ANON_KEY
)
