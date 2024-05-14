import { createSupabaseRouteHandlerClient } from '@/utils/supabaseRouteHandler'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const supabase = createSupabaseRouteHandlerClient()

  await supabase.auth.signOut()

  return NextResponse.redirect(`${requestUrl.origin}`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
}
