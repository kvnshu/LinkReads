import React from 'react'
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from "date-fns";
import { truncateUrl } from '@/services/truncateUrl';

export default function FeedItem({ data }) {
  function parseAndHumanizeDate(dateString) {
    const parsedDate = parseISO(dateString);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  return (
    <div>
      <p>
        <Link href={`/user/${data.user_id}`}>{data.profiles.email}</Link>
        {` finished reading ${truncateUrl(data.links.url, 40)}`}
      </p>
      <p>{`${parseAndHumanizeDate(data.read_at)}`}</p>
    </div>
  )
}
