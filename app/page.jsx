'use client'
import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import LandingPage from "../components/LandingPage"
import Dashboard from "../components/Dashboard"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Index() {
  const [session, setSession] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


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
