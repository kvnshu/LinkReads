'use client'
import { useEffect, useState } from "react";
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser"
import UserCard from "@/components/UserCard"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";


function Explore() {
  const supabase = createSupabaseFrontendClient();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
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
    <main className="h-full flex flex-col items-center">
      <Card
        shadow="none"
        className="w-96"
      >
        <CardHeader>
          <span className="w-full text-center font-bold">Explore users</span>
        </CardHeader>
        <CardBody>
          {
            loading ? (
              <></>
            ) : (
              users.length <= 0 ? (
                <span>No updates yet. <Link href="/explore">Follow readers</Link> to be updated when they finish reading an article!</span>
              ) : (
                <div id="users-container" className="flex flex-col gap-4 items-center">
                  {
                    loading ? (
                      <div>loading...</div>
                    ) : (
                      users.length != 0 ? (
                        <div id="profiles-container" className="w-5/6 flex flex-col gap-4 max-w-sm">
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
                </div>
              )
            )
          }
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>

    </main>
  )
}

export default Explore