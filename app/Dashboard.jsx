import React from "react";
import ReadingList from "./ReadingList"
import Feed from "./Feed"


export default function Dashboard({ session }) {
  return (
    <div>
      Dashboard
      <ReadingList session={session} />
      <Feed session={session}/>
    </div>
  )
}