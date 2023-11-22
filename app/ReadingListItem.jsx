import React from 'react'
import { Button } from "@nextui-org/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// Popover
import { truncateUrl } from "@/services/truncateUrl"

export default function ReadingListItem({ index, data, listSaves, setListSaves }) {
  const supabase = createClientComponentClient()


  async function deleteSave(index) {
    const save = listSaves[index]
    console.log(`Deleting ${save.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', save.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = [...listSaves.slice(0, index), ...listSaves.slice(index + 1)];
    setListSaves(newListSaves)
  }

  async function completeSave(index) {
    const save = listSaves[index]
    console.log(`Completed ${save.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .update({
        read: true,
        read_at: new Date().toISOString()
      })
      .eq('id', save.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = [...listSaves.slice(0, index), ...listSaves.slice(index + 1)];
    setListSaves(newListSaves)
  }



  return (
    <div >
      <p>
        {truncateUrl(data.links.url, 40)}
      </p>
      <Button
        onClick={() => deleteSave(index)}
      >
        Delete
      </Button>
      <Button
        onClick={() => completeSave(index)}
      >
        Done
      </Button>
    </div>
  )
}
