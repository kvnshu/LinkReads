import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Header from "@/components/Header"
import LandingPage from "./LandingPage"
import Dashboard from "./Dashboard"

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session }, error } = await supabase.auth.getSession()

  return (
    <div className="container min-h-screen flex items-center flex-col">
      <Header
        user={session?.user}
      />
      {
        session ? (
          <Dashboard session={session} />
        ) : (
          <div>
            <LandingPage />
          </div>
        )
      }
    </div>
  )
}
