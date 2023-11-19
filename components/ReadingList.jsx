'use client'
import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar"
import { Button } from "@nextui-org/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ReadingList() {
  const [listSaves, setListSaves] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadSaves() {
      const { data, error } = await supabase
        .from('saves')
        .select()
        
      if (error) {
        throw error
      }
      setListSaves(data)
    }

    loadSaves();
  }, [])

  function deleteSave(index) {
    const newListSaves = [...listSaves.slice(0, index), ...listSaves.slice(index + 1)];
    setListSaves(newListSaves)
  }

  return (
    <div>
      <Searchbar
        listSaves={listSaves}
        setListSaves={setListSaves}
      />
      <div id="list-container">
        {
          listSaves.map((save, i) =>
            <div key={i}>
              <p>
                {save.url}
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