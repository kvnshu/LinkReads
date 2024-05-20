import { Link } from '@nextui-org/link';
import { truncateUrl } from '@/utils/truncateUrl';
import { Card, CardBody } from '@nextui-org/card'
import { parseAndHumanizeDate } from "@/utils/parseAndHumanizeDate";
import { Chip } from "@nextui-org/chip";

export default function FeedItem({ data }) {

  return (
    <Card className="max-w-5xl bg-content2" shadow="sm">
      <CardBody>
        <span>
          <Link
            href={`/user/${data.user_id}`}
          >
            {data.profiles.full_name}
          </Link> finished reading</span>
        <div className="w-full flex flex-row justify-between items-center">
          <Link
            href={data.links.url}
          >
            <span className="font-semibold">{data.links.page_title ? truncateUrl(data.links.page_title, 60) : truncateUrl(data.links.url, 60)}</span>
          </Link>
          <Chip size="sm">{new URL(data.links.url).host}</Chip>
        </div>
        <span className="text-xs text-slate-400">{parseAndHumanizeDate(data.read_at)}</span>
      </CardBody>
    </Card>
  )
}
