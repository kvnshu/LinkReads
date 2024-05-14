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

/**
 * 
 * @returns 
 * 
 * Generates dynamic metadata for homepage or dashboard
 */
export async function generateMetadata({ params }) {

  // read route params then fetch data
  const supabase = createSupabaseServerComponentClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  // using user's auth full name. Could be using field in profiles table
  return {
    title: session ? 'LinkReads | Home' : 'LinkReads',
    description: 'Goodreads for the internet.',
    creator: 'Kevin Xu',
  };
}