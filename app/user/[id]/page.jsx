import Profile from "./Profile";
import { createSupabaseServerComponentClient } from '@/utils/supabaseAppRouterServer';

export default async function UserProfile({ params }) {
  const supabase = createSupabaseServerComponentClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <>
      <main className="flex flex-col items-center h-5/6">
        <Profile
          user={user}
          profileId={params.id}
        />
      </main>
    </>
  )
}

export async function generateMetadata({ params }) {

  // read route params then fetch data
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', params.id)
      .limit(1)
      .single()

  // using user's auth full name. Could be using field in profiles table
  return {
    title: `LinkReads | ${data.full_name  }`,
    description: 'Goodreads for the internet.',
    creator: 'Kevin Xu',
  };
}