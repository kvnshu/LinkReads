import React from 'react'
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from "date-fns";
import { truncateUrl } from '@/utils/truncateUrl';
import { Card, CardBody } from '@nextui-org/card'

export default function FeedItem({ data }) {
  function parseAndHumanizeDate(dateString) {
    const parsedDate = parseISO(dateString);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  return (
    <Card className="max-w-5xl">
      <CardBody>
        <span>
          <Link href={`/user/${data.user_id}`}>{data.profiles.email} </Link>
          finished reading
        </span>
        <p className="font-semibold">{truncateUrl(data.links.url, 36)}</p>
        <p className="text-xs text-slate-400">{parseAndHumanizeDate(data.read_at)}</p>
      </CardBody>
    </Card>
  )
}
