import LandingPage from "./LandingPage"
import Dashboard from "./Dashboard"
import { createSupabaseServerComponentClient } from "@/utils/supabaseAppRouterServer"

export default async function Index() {
  const supabase = createSupabaseServerComponentClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  return (
    <main className="h-5/6 flex flex-col items-center">
      {
        session ? (
          <Dashboard session={session} />
        ) : (
          <LandingPage />
        )
      }
    </main>
  )
}
