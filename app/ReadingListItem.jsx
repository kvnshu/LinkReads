import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardBody } from '@nextui-org/card';
import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";
import DeleteIcon from "@/app/public/delete_FILL0_wght400_GRAD0_opsz24.svg"
import { truncateUrl } from "@/services/truncateUrl"


export default function ReadingListItem({ index, data, listSaves, setListSaves }) {
  const supabase = createClientComponentClient()

  async function deleteSave() {
    const save = listSaves[index]
    console.log(`Deleting ${save.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', save.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = [...listSaves.slice(0, index), ...listSaves.slice(index + 1)];
    setListSaves(newListSaves)
  }

  async function completeSave() {
    const save = listSaves[index]
    console.log(`Completed ${save.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .update({
        read: true,
        read_at: new Date().toISOString()
      })
      .eq('id', save.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = [...listSaves.slice(0, index), ...listSaves.slice(index + 1)];
    setListSaves(newListSaves)
  }

  return (
    <Card className="">
      <CardBody className='flex flex-row justify-between gap-2'>
        <div className="flex">
          <Checkbox
            onValueChange={completeSave}
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
      </CardBody>
    </Card>
  )
}
