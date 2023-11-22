import React from "react";
import ReadingList from "./ReadingList"

export default function Dashboard({ session }) {
  return (
    <div>
      Dashboard
      <ReadingList session={session} />
    </div>
  )
}