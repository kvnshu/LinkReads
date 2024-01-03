import React from 'react'
import { Link } from '@nextui-org/link';
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
          <Link
            href={`/user/${data.user_id}`}
          >
            {data.profiles.full_name}
          </Link> finished reading</span>
        <span className="font-semibold">{truncateUrl(data.links.url, 36)}</span>
        <span className="text-xs text-slate-400">{parseAndHumanizeDate(data.read_at)}</span>
      </CardBody>
    </Card>
  )
}
