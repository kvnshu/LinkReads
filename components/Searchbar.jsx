import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SearchBar({ listSaves, setListSaves, user }) {
  const [searchText, setSearchText] = useState("");
  const supabase = createClientComponentClient();

  async function handleSubmit(event) {
    event.preventDefault();
    async function addSave() {

      // update links table
      const newLink = {
        url: searchText,
      }
      const { data: dataLinks, error: errorLinks } = await supabase
        .from('links')
        .upsert(newLink, {
          ignoreDuplicates: false,
          onConflict: 'url'
        })
        .select();

      if (errorLinks) {
        console.log('Failed to add link.')
        throw errorLinks;
      }

      // update saves table
      const newSave = {
        user_id: user.id,
        link_id: dataLinks[0].id,
      };
      const { data: dataSaves, error: errorSaves } = await supabase
        .from('saves')
        .insert(newSave)
        .select(`
          links (
            url,
            created_at
          )
        `)
        .limit(1)
        .single();

      if (errorSaves) {
        console.log(`Failed to add save.`)
        throw errorSaves;
      }

      const listItem = {
        url: dataLinks.url,
        created_at: dataSaves.created_at
      }


      const newListSaves = [dataSaves, ...listSaves]
      setListSaves(newListSaves);
      console.log(`Added ${searchText} to reading list.`);
      setSearchText("");
    }

    addSave();
  }

  return (
    <div >
      <div className="border">
        <form onSubmit={handleSubmit}>
          <input
            name="searchbar"
            type="text"
            placeholder="Add a new save..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}