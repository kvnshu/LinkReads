'use client';
import { useEffect, useState } from "react";
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser";
import SaveItem from "@/components/SaveItem";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ReadingList({ user, listSaves, setListSaves }) {
  const supabase = createSupabaseFrontendClient();
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 8;

  async function fetchSaves() {
    try {
      const { data, error } = await supabase
        .from('saves')
        .select(`
          id,
          links (
            url,
            page_title
          ),
          created_at
        `)
        .eq('user_id', user?.id)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .range(from, from + pageSize);

      if (error) {
        throw error
      }
      setListSaves(listSaves.concat(data));
      if (data.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFrom(from + pageSize);
    }
  }

  useEffect(() => {
    fetchSaves();
  }, [])

  async function deleteSave(data) {
    const newListSaves = listSaves.filter((save) => save.id !== data.id)
    setListSaves(newListSaves)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', data.id)
    if (error) {
      console.log(error);
    }
  }

  async function updateIsRead(data, isRead) {
    const newListSaves = listSaves.filter((save) => save.id !== data.id)
    setListSaves(newListSaves)
    const { error } = await supabase
      .from('saves')
      .update({
        read: !isRead,
        read_at: isRead ? null : new Date().toISOString()
      })
      .eq('id', data.id)
    if (error) {
      console.log(error);
    }
  }

  return (
    <Card
      shadow="none"
      className="w-1/3 max-h-5/6"
    >
      <CardHeader>
        <span className="w-full text-center font-bold">To Read</span>
      </CardHeader>
      <CardBody
        id="readinglist-container"
        className="max-h-full"
      >
        <InfiniteScroll
          dataLength={listSaves.length}
          next={fetchSaves}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center">
              <span>Loading...</span>
            </div>
          }
          endMessage={
            <div className="flex flex-col justify-center items-center text-center">
              <span className="w-full text-center">
                All links read!🎊
              </span>
            </div>
          }
          scrollableTarget="readinglist-container"
        >
          <div className="flex flex-col gap-4">
            {
              listSaves.map((save) =>
                <SaveItem
                  key={save.id}
                  user={user.id}
                  data={save}
                  deleteSave={deleteSave}
                  updateIsRead={updateIsRead}
                />
              )
            }
          </div>
        </InfiniteScroll>
      </CardBody>
      <CardFooter>

      </CardFooter>
    </Card >
  )
}