import { NextResponse } from 'next/server'
import { createSupabaseAppServerClient } from '@/utils/supabaseAppRouterServer'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  try {
    if (!code) {
      throw new Error("Code not found.");
    }
    const supabase = createSupabaseAppServerClient();
    const { error: authError } = await supabase.auth.exchangeCodeForSession(code)
    if (authError) {
      throw authError;
    }
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError){
      throw sessionError;
    }
    const user = session.user;
    const isNewUser = user.last_sign_in_at ? false : true;

    if (isNewUser) {
      const updateProfileObj = {};
      updateProfileObj.full_name = user.user_metadata.full_name;
      updateProfileObj.avatar_url = user.user_metadata.avatar_url;
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update(updateProfileObj)
        .eq('id', user.id)
      if (profileUpdateError) {
        throw profileUpdateError;
      }
      console.log('Updated profile information.')
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }
  return NextResponse.redirect(`${origin}${next}`)
}