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
              id,
              followings!followings_user_id2_fkey (
                user_id1,
                user_id2
              )
            )
          `)
        .eq('profiles.followings.user_id1', session.user.id)
        .eq('read', true)
        .order('read_at', { ascending: false })
        if (error) {
          throw error
        }
        setReads(data)
      } catch (error) {
        console.log(error)
      }
    }

    getReads()
  }, [])

  return (
    <div>
      <div>Feed</div>
      {
        reads.map((read, i) => <FeedItem key={i} data={read} />)
      }
    </div>
  )
}
