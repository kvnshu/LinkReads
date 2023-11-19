"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// import { Input } from "@nextui-org/input";

// import { useRouter } from "next/navigation";


export default function SearchBar({ listSaves, setListSaves }) {
  const [loading, setLoading] = useState(false);
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
        throw errorLinks;
      }

      // update saves table
      // how to get user_id of current user?
      const newSave = {
        user_id: '9fb37e67-f61b-43e8-9023-6d067caad344',
        link_id: dataLinks[0].id,
      };
      const { data: dataSaves, error: errorSaves } = await supabase
        .from('saves')
        .insert(newSave)
        .select();

      if (errorSaves) {
        throw errorSaves;
      }

      const listItem = {
        url: dataLinks.url
      }

      const newListSaves = [newSave, ...listSaves]
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