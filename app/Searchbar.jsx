'use client'
import { useState } from "react";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import addIcon from "@/app/public/add_FILL0_wght400_GRAD0_opsz24.svg"
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser";
import { fetchPageMetadata } from "@/utils/fetchPageMetadata";

export default function SearchBar({ listSaves, setListSaves, user }) {
  const [searchText, setSearchText] = useState("");
  const supabase = createSupabaseFrontendClient();

  async function handleSubmit(event) {
    event.preventDefault();
    // fetch page title

    async function addSave() {
      let url = searchText;
      try {
        const urlObj = new URL(searchText);
        console.log({ urlObj });
        url = urlObj.origin + urlObj.pathname;
      } catch (error) {
        console.log(error); // => TypeError, "Failed to construct URL: Invalid URL"
        return;
      }

      // upsert links table
      const newLink = { url }
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
      setSearchText("");

      if (!dataSaves.links.page_title) {
        fetchPageMetadata(dataSaves)
          .then((pageTitle) => {
            dataSaves.links.page_title = pageTitle;
            setListSaves([...newListSaves]);
          })
          .catch((e) => { console.log(e.message) });
      }
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
            <AddSvgIcon />
          }
        />
      </form>
    </div>
  );
}

function AddSvgIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 -960 960 960"
      fill="#a0c6c6"
      {...props}
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240z"></path>
    </svg>
  );
}