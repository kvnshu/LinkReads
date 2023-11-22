import Header from "@/components/Header"
import LandingPage from "./LandingPage"
import Dashboard from "./Dashboard"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = supabase.auth.getSession()

  return (
    <div className="container min-h-screen flex items-center flex-col">
      <Header
        user={session?.user}
      />
      {session?.user ? (
        <Dashboard session={session} />
      ) : (
        <LandingPage />
      )
      }
    </div>
  )
}
