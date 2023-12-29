'use client';
import React, { useEffect } from "react";
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser";
import SaveItem from "@/components/SaveItem"

export default function ReadingList({ user, listSaves, setListSaves }) {
  const supabase = createSupabaseFrontendClient()

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
      <p className="text-center">To Read:</p>
      <div id="reading-list-container" className="flex flex-col gap-4">
        {
          listSaves.map((save, i) =>
            <SaveItem
              key={save.id}

              data={save}
              deleteSave={deleteSave}
              updateIsRead={updateIsRead}
            />
          )
        }
      </div>
    </div >
  )
}