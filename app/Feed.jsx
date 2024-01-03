'use client'
import { useEffect, useState } from 'react'
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import FeedItem from './FeedItem'

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
      <div className="text-center">Updates:</div>
      <div className="flex flex-col gap-4">
        {
          reads.map((read, i) => <FeedItem key={i} data={read} />)
        }
      </div>
    </div>
  )
}
