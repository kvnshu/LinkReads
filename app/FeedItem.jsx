import React from 'react'
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from "date-fns";

export default function FeedItem({ data }) {
  function parseAndHumanizeDate(dateString) {
    const parsedDate = parseISO(dateString);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  return (
    <div>
      <p>
        <Link href={`/user/${data.user_id}`}>Someone you follow</Link>{` finished reading ${data.links.url}`}
      </p>
      <p>{`${parseAndHumanizeDate(data.read_at)}`}</p>
    </div>
  )
}
