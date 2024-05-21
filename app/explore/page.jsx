'use client'
import { useEffect, useState } from "react";
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser"
import UserCard from "@/components/UserCard"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import InfiniteScroll from 'react-infinite-scroll-component';



function Explore() {
  const supabase = createSupabaseFrontendClient();
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 8;

  async function fetchNotFollowing() {
    console.log("fetch");
    const { data: { user: logUser } } = await supabase.auth.getUser();
    setLoggedInUser(logUser);

    const { data, error } = await supabase
      .rpc('get_unfollowed_profiles', { log_user_id: logUser.id })
      .range(from, from + pageSize);

    if (error) {
      throw error;
    }

    setUsers(users.concat(data));
    if (data.length < pageSize) {
      setHasMore(false);
    }

    setFrom(from + pageSize);
  }

  useEffect(() => {
    fetchNotFollowing();
  }, [])

  return (
    <main className="flex flex-col items-center h-5/6">
      <Card
        shadow="none"
        className="w-96 max-h-full"
      >
        <CardHeader>
          <span className="w-full text-center font-bold">Explore users</span>
        </CardHeader>
        <CardBody
          id="users-container"
        >
          <InfiniteScroll
            dataLength={users.length}
            next={fetchNotFollowing}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center">
                <span>Loading...</span>
              </div>
            }
            endMessage={
              <div className="flex flex-col justify-center items-center text-center">
                {
                  users.length == 0 ? (
                    <span className="w-full text-center">
                      Woah! You follow every person on LinkReads 👀
                    </span>
                  ) : (<></>)
                }
              </div>
            }
            scrollableTarget="users-container"
          >
            <div className="flex flex-col gap-4 items-center">
              <div id="profiles-container" className="w-5/6 flex flex-col gap-4 max-w-sm">
                {
                  users.map(u =>
                    <UserCard key={u.id} user={u} logUser={loggedInUser} />
                  )
                }
              </div>
            </div>
          </InfiniteScroll>
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>

    </main>
  )
}

export default Explore