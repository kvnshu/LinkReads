'use client';
import React, { useState, useEffect, } from "react";
import Searchbar from "./Searchbar"
import { Button } from "@nextui-org/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ReadingList({ session }) {
  const { user } = session;
  const [listSaves, setListSaves] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadSaves() {
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
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }
      setListSaves(data);
    }
    loadSaves();
  }, [session])

  async function deleteSave(index) {
    const save = listSaves[index]
    console.log(`Deleting ${save.links.id} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', save.id)
    if (error){
      throw error;
    }
    const newListSaves = [...listSaves.slice(0, index), ...listSaves.slice(index + 1)];
    setListSaves(newListSaves)
  }

  return (
    <div>
      <Searchbar
        listSaves={listSaves}
        setListSaves={setListSaves}
        user={user}
      />
      <div id="list-container">
        {
          listSaves.map((save, i) =>
            <div key={i}>
              <p>
                {save.links.url}
              </p>
              <Button
                onClick={() => deleteSave(i)}
              >
                Delete
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}