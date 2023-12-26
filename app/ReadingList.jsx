'use client';
import React, { useState, useEffect, } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SaveItem from "@/components/SaveItem"

export default function ReadingList({ user, listSaves, setListSaves }) {
  const supabase = createClientComponentClient()

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
  }, [user])

  async function deleteSave(i, data) {
    console.log(`Deleting ${data.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', save.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = [...listSaves.slice(0, i), ...listSaves.slice(i + 1)];
    setListSaves(newListSaves)
  }

  async function updateIsRead(i, data, isRead) {
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
    const newListSaves = [...listSaves.slice(0, i), ...listSaves.slice(i + 1)];
    setListSaves(newListSaves)
  }

  return (
    <div className="w-1/3">
      <p className="text-center">To Read:</p>
      <div id="reading-list-container" className="flex flex-col gap-4">
        {
          listSaves.map((save, i) =>
            <SaveItem
              key={i}
              i={i}
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