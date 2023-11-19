import React from "react";
import ReadingList from "../components/ReadingList"

export default function Dashboard({ session }) {
  return (
    <div>
      Dashboard
      <ReadingList session={session}/>
    </div>
  )
}