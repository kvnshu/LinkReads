import Profile from "./Profile";
import { createSupabaseServerComponentClient } from '@/utils/supabaseAppRouterServer';

export default async function UserProfile({ params }) {
  const supabase = createSupabaseServerComponentClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <main className="flex flex-col items-center pt-6 h-5/6">
      <Profile
        user={user}
        profileId={params.id}
      />
    </main>
  )
}