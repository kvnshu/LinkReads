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
            read_at 
          `);

        if (error) {
          throw error
        }
        setReads(data)
      } catch (error) {
        console.log(error)
      }
    }

    getReads()
  })

  return (
    <div>
      <div>Feed</div>
      {
        reads.map((read, i) => <FeedItem key={i} data={read} />)
      }
    </div>
  )
}
