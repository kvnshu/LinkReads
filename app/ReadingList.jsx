'use client';
import React, { useState, useEffect, } from "react";
import Searchbar from "./Searchbar"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ReadingListItem from "./ReadingListItem"

export default function ReadingList({ session }) {
  const { user } = session;
  const [listSaves, setListSaves] = useState([])
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
  }, [session])

  return (
    <div>
      <Searchbar
        listSaves={listSaves}
        setListSaves={setListSaves}
        user={user}
      />
      <div id="reading-list-container">
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