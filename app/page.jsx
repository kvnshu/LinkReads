import Header from "@/components/Header"
import LandingPage from "./LandingPage"
import Dashboard from "./Dashboard"
import { createSupabaseServerComponentClient } from "@/utils/supabaseAppRouterServer"

export default async function Index() {
  const supabase = createSupabaseServerComponentClient();
  const { data: { session }, error } = await supabase.auth.getSession()

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
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
