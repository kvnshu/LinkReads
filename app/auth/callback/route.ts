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
    const isNewUser = session?.user?.last_sign_in_at ? true : false;

    if (isNewUser) {
      const user = session?.user;
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: user?.user_metadata?.full_name,
          avatar_url: user?.user_metadata?.avatar_url
        })
        .eq('id', user?.id)

      if (!authError && !profileError) {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }

    if (!authError) {
      return NextResponse.redirect(`${origin}${next}`)
    }

  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}