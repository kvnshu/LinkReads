'use client'
import { useEffect, useState } from "react";
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser"
import UserCard from "@/components/UserCard"

function Explore() {
  const supabase = createSupabaseFrontendClient();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
    // TODO: How to get session user in client components?
    supabase.auth.getUser()
      .then(({ data: { user: logUser } }) => {
        setLoggedInUser(logUser);
        supabase
          .rpc('get_unfollowed_profiles', { log_user_id: logUser.id })
          .then(({ data, error }) => {
            setUsers(data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          })
      })
  }, [])

return (
  <>
    <main className="h-full flex flex-col items-center">
      <h1>Explore users</h1>
      {
        loading ? (
          <div>loading...</div>
        ) : (
          users.length != 0 ? (
            <div id="profiles-container" className="w-5/6 flex flex-col gap-2">
              {
                users.map(u =>
                  <UserCard key={u.id} user={u} logUser={loggedInUser} />
                )
              }
            </div>
          ) : (
            <p>Woah! You follow every person on LinkReads 👀</p>
          )
        )
      }
    </main>
  </>
)
}

export default Explore