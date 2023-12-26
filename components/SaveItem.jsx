'use client'
import { useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";
import DeleteIcon from "@/app/public/delete_FILL0_wght400_GRAD0_opsz24.svg"
import { truncateUrl } from "@/services/truncateUrl"
import { formatDistanceToNow, parseISO } from "date-fns";

export default function SaveItem({ id, data, deleteSave, updateIsRead }) {
  const [isRead, setIsRead] = useState(data.read)

  // TODO: is this an anti-pattern?
  useEffect(() => {
    setIsRead(data.read)
  }, [])

  function parseAndHumanizeDate(dateString) {
    const parsedDate = parseISO(dateString);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  function handleCheck() {
    updateIsRead(data, isRead)
    setIsRead(!isRead)
  }

  return (
    <Card>
      <CardBody className='flex flex-row justify-between gap-2'>
        <div className="flex">
          <Checkbox
            isSelected={isRead}
            onChange={handleCheck}
        >
          </Checkbox>
          <Link href={data.links.url}>
            {truncateUrl(data.links.url, 36)}
          </Link>
        </div>
        <Image
          onClick={() => deleteSave(data)}
          src={DeleteIcon}
          alt="delete"
          className="justify-self-end hover:opacity-40"
        />
        <p className="text-xs text-slate-400">Created {parseAndHumanizeDate(data.created_at)}</p>
      </CardBody>
    </Card>
  )
}

