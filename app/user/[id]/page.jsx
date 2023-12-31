import Profile from "./Profile";
import { createSupabaseServerComponentClient } from '@/utils/supabaseAppRouterServer';

export default async function UserProfile({ params }) {
  const supabase = createSupabaseServerComponentClient()
  const {data: { user }, error} = await supabase.auth.getUser()

  return (
    <>
      <main className="h-full">
        <Profile
          user={user}
          profileId={params.id}
        />
      </main>
    </>
  )
}