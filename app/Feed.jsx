'use client'
import { useEffect, useState } from 'react'
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import FeedItem from './FeedItem'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from '@nextui-org/link';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Feed({ session }) {
  const [reads, setReads] = useState([]);
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createSupabaseFrontendClient();
  const pageSize = 5;

  async function fetchReads() {
    if (reads.length >= 100) {
      setHasMore(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('saves')
        .select(`
          id,
          links (
            url,
            page_title
          ),
          user_id,
          read_at,
          profiles (
            full_name,
            followings!followings_user_id2_fkey (
              user_id1,
              user_id2
            )
          )
        `)
        .not('profiles', 'is', null)
        .not('profiles.followings', 'is', null)
        .eq('profiles.followings.user_id1', session.user.id)
        .eq('read', true)
        .order('read_at', { ascending: false })
        .range(from, from + pageSize);

      if (error) {
        throw error
      }
      setReads(reads.concat(data));
      if (data.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setFrom(from + pageSize);
    }
  }

  useEffect(() => {
    console.log("useEffect");
    fetchReads();
  }, [])

  return (
    <Card
      shadow="none"
      className='w-1/3 max-h-5/6'
    >
      <CardHeader>
        <span className="w-full text-center font-bold">Feed</span>
      </CardHeader>
      <CardBody
        id="feed-container"
        className="max-h-full"
      >
        <InfiniteScroll
          dataLength={reads.length} //This is important field to render the next data
          next={fetchReads}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center">
              <span>Loading...</span>
            </div>
          }
          endMessage={
            <div className="flex flex-col justify-center items-center text-center">
              <span>No more updates, for now...</span>
              <span><Link href="/explore">Follow readers</Link> to be updated when they read an article!</span>
            </div>
          }
          scrollableTarget="feed-container"
        >
          {
            <div id="item-container" className="flex flex-col gap-4">
              {
                reads.map((read, i) => <FeedItem key={i} data={read} />)
              }
            </div>
          }
        </InfiniteScroll>

      </CardBody>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}
