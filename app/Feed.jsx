'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import FeedItem from './FeedItem'

export default function Feed({ session }) {
  const [reads, setReads] = useState([])
  const supabase = createClientComponentClient()

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
              email,
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
      <div>Feed</div>
      <div className="flex flex-col gap-4">
        {
          reads.map((read, i) => <FeedItem key={i} data={read} />)
        }
      </div>
    </div>
  )
}
