'use client'
import { useState } from "react";
import Searchbar from "./Searchbar"
import ReadingList from "./ReadingList"
import Feed from "./Feed"


export default function Dashboard({ session }) {
  const { user } = session;
  const [listSaves, setListSaves] = useState([])

  return (
    <div id="dashboard-container" className="w-screen h-full flex flex-col items-center">
      <div id="dashboard" className="flex-1 flex flex-col align-center items-center w-4/5 gap-2">
        <Searchbar
          user={user}
          listSaves={listSaves}
          setListSaves={setListSaves}
        />
        <div className="flex flex-row justify-center justify-items-center gap-8 w-full">
          <ReadingList
            user={user}
            listSaves={listSaves}
            setListSaves={setListSaves}
          />
          <Feed session={session} />
        </div>
      </div>
    </div>
  )
}