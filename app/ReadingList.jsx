'use client';
import { useEffect, useState } from "react";
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser";
import SaveItem from "@/components/SaveItem";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export default function ReadingList({ user, listSaves, setListSaves }) {
  const supabase = createSupabaseFrontendClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaves() {
      try {
        const { data, error } = await supabase
          .from('saves')
          .select(`
            id,
            links (
              url
            ),
            created_at
          `)
          .eq('user_id', user?.id)
          .eq('read', false)
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }
        setListSaves(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    loadSaves();
  }, [])

  async function deleteSave(data) {
    console.log(`Deleting ${data.links.url} from reading list.`)
    const newListSaves = listSaves.filter((save) => save.id !== data.id)
    setListSaves(newListSaves)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', data.id)
    if (error) {
      console.log(error);
    }
  }

  async function updateIsRead(data, isRead) {
    console.log(`Setting save ${data.links.url} to ${!isRead}`)
    const newListSaves = listSaves.filter((save) => save.id !== data.id)
    setListSaves(newListSaves)
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
    <div className="w-1/3">
      <Card
        shadow="none"
        className="bg-slate-100"
      >
        <CardHeader>
          <span className="w-full text-center font-bold">To Read</span>
        </CardHeader>
        <CardBody>
          {
            loading ? (
              <></>
            ) : (
              listSaves.length <= 0 ? (
                <span className="w-full text-center">All links read!🎊</span>
              ) : (
                <div id="reading-list-container" className="flex flex-col gap-4">
                  {
                    listSaves.map((save) =>
                      <SaveItem
                        key={save.id}
                        user={user.id}
                        data={save}
                        deleteSave={deleteSave}
                        updateIsRead={updateIsRead}
                      />
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
    </div >
  )
}