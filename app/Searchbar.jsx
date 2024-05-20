'use client'
import { useState } from "react";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import addIcon from "@/app/public/add_FILL0_wght400_GRAD0_opsz24.svg"
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser";
import { fetchOpengraph } from "@/utils/fetchOpengraph";

export default function SearchBar({ listSaves, setListSaves, user }) {
  const [searchText, setSearchText] = useState("");
  const supabase = createSupabaseFrontendClient();

  async function handleSubmit(event) {
    event.preventDefault();
    // fetch page title

    async function addSave() {
      let url = searchText;
      try {
        url = new URL(searchText);
        url = url.href;
      } catch (error) {
        console.log(error); // => TypeError, "Failed to construct URL: Invalid URL"
        return;
      }

      const fetchData = await fetchOpengraph(url);
      const page_title = fetchData['og:title'];

      // update links table
      const newLink = {
        url: url,
        page_title: page_title
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
          id,
          links (
            url,
            created_at,
            page_title
          ),
          created_at
        `)
        .limit(1)
        .single();

      if (errorSaves) {
        console.log(`Failed to add save.`)
        throw errorSaves;
      }

      const newListSaves = [dataSaves, ...listSaves]
      setListSaves(newListSaves);
      console.log(`Added ${url} to reading list.`);
      setSearchText("");
    }

    addSave();
  }

  return (
    <div className="w-[40%] py-4">
      <form onSubmit={handleSubmit}>
        <Input
          name="searchbar"
          radius="full"
          type="text"
          placeholder="Save a link for later..."
          value={searchText}
          onValueChange={setSearchText}
          startContent={
            <SearchIcon />
          }
        />
      </form>
    </div>
  );
}

function SearchIcon() {
  return (
    <Image
      src={addIcon}
      alt="search"
      height={20}
      width={20}
    />
  )
}