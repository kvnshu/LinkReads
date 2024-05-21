import { useState, useEffect } from "react";
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import SaveItem from "@/components/SaveItem";

function SavesViewer({ user, profileId }) {
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseFrontendClient();
  const [profileSaves, setProfileSaves] = useState([]);

  async function fetchSaves() {

    try {
      // fetch user's saves
      setLoading(true);
      const { data: profileSavesData, error: profileSavesError } = await supabase
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
      if (profileSavesError) {
        throw profileSavesError
      }
      setProfileSaves(profileSavesData)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        id="saves-container"
        shadow="none"
        className="w-full sm:w-3/5 max-h-full"
      >
        <CardHeader>
          <span className="w-full text-center font-bold">All links</span>
        </CardHeader>
        <CardBody>
          {
            loading ? (
              <></>
            ) : (
              profileSaves.length <= 0 ? (
                <span className="w-full text-center">No links added.</span>
              ) : (
                <div id="saves-item-container" className="flex flex-col gap-4">
                  {
                    loading ? (
                      <p>Loading saves...</p>
                    ) : (
                      profileSaves.map((save, i) =>
                        <SaveItem
                          key={save.id}
                          data={save}
                          deleteSave={deleteSave}
                          updateIsRead={updateIsRead}
                          user={user}
                        />
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
    </>
  )
}

export default SavesViewer