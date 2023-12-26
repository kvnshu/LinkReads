'use client'
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardBody } from '@nextui-org/card';
import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";
import DeleteIcon from "@/app/public/delete_FILL0_wght400_GRAD0_opsz24.svg"
import { truncateUrl } from "@/services/truncateUrl"
import { useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function ProfileSaveItem({ index, data, profileSaves, setProfileSaves }) {
  const supabase = createClientComponentClient();
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    setIsChecked(data.read)
  }, [])

  function parseAndHumanizeDate(dateString) {
    const parsedDate = parseISO(dateString);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  async function deleteSave() {
    const save = profileSaves[index]
    console.log(`Deleting ${save.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', save.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = [...profileSaves.slice(0, index), ...profileSaves.slice(index + 1)];
    setProfileSaves(newListSaves)
  }

  async function toggleSave() {
    const save = profileSaves[index]
    const { error } = await supabase
      .from('saves')
      .update({
        read: !isChecked,
        read_at: new Date().toISOString()
      })
      .eq('id', save.id)
    if (error) {
      console.log(error);
    }
    setIsChecked(!isChecked)
  }

  return (
    <Card className="">
      <CardBody className='flex flex-row justify-between gap-2'>
        <div className="flex">
          { }
          <Checkbox
            isSelected={isChecked}
            onValueChange={toggleSave}
          ></Checkbox>
          <p>
            {truncateUrl(data.links.url, 36)}
          </p>
        </div>
        <Image
          onClick={deleteSave}
          src={DeleteIcon}
          alt="delete"
          className="justify-self-end hover:opacity-40"
        />
        <p className="text-xs text-slate-400">Created {parseAndHumanizeDate(data.created_at)}</p>
      </CardBody>
    </Card>
  )
}
