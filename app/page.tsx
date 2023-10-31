import React from "react"
import Header from "../components/Header"
import LandingPage from "../components/LandingPage"
import Dashboard from "../components/Dashboard"

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


// export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()
  return (
    <div className="container min-h-screen flex items-center flex-col">
      <Header
        user={user}
      />
      {user ? (
        <Dashboard />
      ) : (
        <LandingPage />
      )
      }
    </div>
  )
}
