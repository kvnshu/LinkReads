import React from 'react'
import { Link } from '@nextui-org/link';
import { truncateUrl } from '@/utils/truncateUrl';
import { Card, CardBody } from '@nextui-org/card'
import { parseAndHumanizeDate } from "@/utils/parseAndHumanizeDate";

export default function FeedItem({ data }) {

  return (
    <Card className="max-w-5xl" shadow="sm">
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
