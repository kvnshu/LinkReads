import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseAppServerClient(serverComponent = false) {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          if (serverComponent) return;
          cookieStore.set(name, value, options)
        },
        delete(name, options) {
          if (serverComponent) return;
          cookieStore.set(name, "", options)
        }
      },
    }
  )
}

export function createSupabaseServerComponentClient() {
  return createSupabaseAppServerClient(true);
}