import LandingPage from "./LandingPage"
import Dashboard from "./Dashboard"
import { createSupabaseServerComponentClient } from "@/utils/supabaseAppRouterServer"

export default async function Index() {
  const supabase = createSupabaseServerComponentClient();
  const { data: { session }, error } = await supabase.auth.getSession()

  return (
    <div className="bg-background h-5/6 flex flex-col">
      <main className="h-full">
        {
          session ? (
            <Dashboard session={session} />
          ) : (
            <LandingPage />
          )
        }
      </main>
    </div>
  )
}
