"use client";
import { Button } from "@nextui-org/button";
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser";

export default function GoogleLoginButton() {
  const supabase = createSupabaseFrontendClient();

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    url = `${url}auth/callback`;
    return url;
  };

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getURL(),
      },
    });
  }

  return (
    <div>
      <Button color="primary" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </div>
  );
}
