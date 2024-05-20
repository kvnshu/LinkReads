'use client'
import { useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";
import DeleteIcon from "@/app/public/delete_FILL0_wght400_GRAD0_opsz24.svg"
import { truncateUrl } from "@/utils/truncateUrl"
import { parseAndHumanizeDate } from '@/utils/parseAndHumanizeDate';

function SaveItem({ data, deleteSave, updateIsRead, user }) {
  const [isRead, setIsRead] = useState(data.read);
  const [url, setUrl] = useState({
    host: '',
    pathname: ''
  })

  // TODO: is this an anti-pattern?
  useEffect(() => {
    setIsRead(data.read);
    setUrl(new URL(data.links.url));
  }, [data])

  function handleCheck() {
    updateIsRead(data, isRead)
    setIsRead(!isRead)
  }

  return (
    <Card shadow="sm" className="bg-content2">
      <CardBody className='flex flex-row justify-between gap-2'>
        <div className="flex">
          {
            user && user.id === data.user_id ? (
              <Checkbox
                isSelected={isRead}
                onChange={handleCheck}
              >
              </Checkbox>
            ) : (null)
          }
          <div className="flex flex-col">
            <Link
              isExternal
              href={url.href}
            >
              {truncateUrl(data.links.page_title ? `${data.links.page_title} || ${url.host}` : url.host + url.pathname, 60)}
            </Link>
            <p className="text-xs text-slate-400">Created {parseAndHumanizeDate(data.created_at)}</p>
          </div>
        </div>
        {
          user && user.id === data.user_id ? (
            <Image
              onClick={() => deleteSave(data)}
              src={DeleteIcon}
              alt="delete"
              className="justify-self-end hover:opacity-40"
            />
          ) : (null)
        }
      </CardBody>
    </Card>
  )
};

export default SaveItem;