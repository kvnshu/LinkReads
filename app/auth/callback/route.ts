import { NextResponse } from 'next/server'
import { createSupabaseAppServerClient } from '@/utils/supabaseAppRouterServer'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'
  if (code) {
    const supabase = createSupabaseAppServerClient();
    const { error: authError } = await supabase.auth.exchangeCodeForSession(code)

    // update profiles database 
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    const user = session?.user

    // TODO: to optimize, implement conditional logic to check if full_name is already added off of user.last_sign_in_at
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: user?.user_metadata?.full_name })
      .eq('id', user?.id)

    if (!authError && !profileError) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}