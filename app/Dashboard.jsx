'use client'
import { useState } from "react";
import Searchbar from "./Searchbar"
import ReadingList from "./ReadingList"
import Feed from "./Feed"


export default function Dashboard({ session }) {
  const { user } = session;
  const [listSaves, setListSaves] = useState([])

  return (
    <div id="dashboard" className="flex-1 flex flex-col align-center items-center gap-2">
      <Searchbar
        user={user}
        listSaves={listSaves}
        setListSaves={setListSaves}
      />
      <div className="flex-1 flex flex-row gap-2">
        <ReadingList
          user={user}
          listSaves={listSaves}
          setListSaves={setListSaves}
        />
        <Feed session={session} />
      </div>
    </div>
  )
}