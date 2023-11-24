'use client';
import React, { useState, useEffect, } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ReadingListItem from "./ReadingListItem"

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
              url,
              created_at
            )
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

  return (
    <div className="w-1/3">
      <p>To Read:</p>
      <div id="reading-list-container" className="flex flex-col gap-4">
        {
          listSaves.map((save, i) =>  
            <ReadingListItem
              key={i}
              index={i}
              data={save}
              listSaves={listSaves}
              setListSaves={setListSaves}
            />
          )
        }
      </div>
    </div>
  )
}