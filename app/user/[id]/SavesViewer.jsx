import { useState, useEffect } from "react";
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import SaveItem from "@/components/SaveItem";
import InfiniteScroll from 'react-infinite-scroll-component';

function SavesViewer({ user, profileId }) {
  const supabase = createSupabaseFrontendClient();
  const [profileSaves, setProfileSaves] = useState([]);
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 12;

  async function fetchSaves() {
    try {
      // fetch user's saves
      const { data, error } = await supabase
        .from('saves')
        .select(`
                id,
                user_id,
                links (
                  url
                ),
                read,
                created_at
              `)
        .eq('user_id', profileId)
        .order('created_at', { ascending: false })
        .range(from, from + pageSize);


      if (error) {
        throw error;
      }
      setProfileSaves(profileSaves.concat(data));
      if (data.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFrom(from + pageSize);
    }
  }

  useEffect(() => {
    fetchSaves();
  }, [])

  async function deleteSave(data) {
    console.log(`Deleting ${data.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', data.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = profileSaves.filter((save) => save.id !== data.id)
    setProfileSaves(newListSaves)
  }

  async function updateIsRead(data, isRead) {
    console.log(`Setting save ${data.links.url} to ${!isRead}`)
    const { error } = await supabase
      .from('saves')
      .update({
        read: !isRead,
        read_at: isRead ? null : new Date().toISOString()
      })
      .eq('id', data.id)
    if (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card
        shadow="none"
        className="w-full sm:w-3/5 max-h-full"
      >
        <CardHeader>
          <span className="w-full text-center font-bold">All links</span>
        </CardHeader>
        <CardBody
          id="saves-container"
        >
          <InfiniteScroll
            dataLength={profileSaves.length}
            next={fetchSaves}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center">
                <span>Loading...</span>
              </div>
            }
            endMessage={
              <div className="flex flex-col justify-center items-center text-center">
                {
                  profileSaves.length == 0 ? (
                    <span className="w-full text-center">
                      Add links to read!
                    </span>
                  ) : (<></>)
                }
              </div>
            }
            scrollableTarget="saves-container"
          >
            <div id="saves-item-container" className="flex flex-col gap-4">
              {
                profileSaves.map((save, i) =>
                  <SaveItem
                    key={save.id}
                    data={save}
                    deleteSave={deleteSave}
                    updateIsRead={updateIsRead}
                    user={user}
                  />
                )
              }
            </div>
          </InfiniteScroll>
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>
    </>
  )
}

export default SavesViewer