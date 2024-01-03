import React from 'react'
import Link from 'next/link';
import { truncateUrl } from '@/utils/truncateUrl';
import { Card, CardBody } from '@nextui-org/card'
import { parseAndHumanizeDate } from "@/utils/parseAndHumanizeDate";

export default function FeedItem({ data }) {

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
