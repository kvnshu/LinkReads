'use client'
import { Button } from "@nextui-org/button"
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser"

export default function GoogleLoginButton() {
  const supabase = createSupabaseFrontendClient()
  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_OAUTH_CALLBACK_URL,
      },
    })
  }

  return (
    <div>
      <Button
        color="primary"
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>
    </div>
  )
}
