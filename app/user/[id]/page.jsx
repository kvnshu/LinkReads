import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import Header from "@/components/Header";
import Profile from "./Profile";

export default async function UserProfile({ params }) {
  const supabase = createServerComponentClient({ cookies })
  // const [userIsFollowing, setUserIsFollowing] = useState(false);
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <Header
        user={user}
      />
      <Profile
        user={user}
        profileId={params.id}
      />
    </div>
  )
}