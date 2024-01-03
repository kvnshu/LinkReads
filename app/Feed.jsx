'use client'
import { useEffect, useState } from 'react'
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import FeedItem from './FeedItem'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from '@nextui-org/link';

export default function Feed({ session }) {
  const [reads, setReads] = useState([])
  const supabase = createSupabaseFrontendClient()

  useEffect(() => {
    async function getReads() {
      try {
        const { data, error } = await supabase
          .from('saves')
          .select(`
            links (
              url
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
          .order('read_at', { ascending: false });

        if (error) {
          throw error
        }
        setReads(data);
      } catch (error) {
        console.log(error)
      }
    }
    getReads()
  }, [])

  return (
    <div className='w-1/3'>
      <Card
        shadow="none"
        className="bg-slate-100"
      >
        <CardHeader>
          <span className="w-full text-center font-bold">Feed</span>
        </CardHeader>
        <CardBody>
          {
            reads.length <= 0 ? (
              <span>No updates yet. <Link href="/explore">Follow readers</Link> to be updated when they finish reading an article!</span>
            ) : (
              <div id="item-container" className="flex flex-col gap-4">
                {
                  reads.map((read, i) => <FeedItem key={i} data={read} />)
                }
              </div>
            )
          }
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>
    </div>
  )
}
