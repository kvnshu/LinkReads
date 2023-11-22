import React from 'react'
import Link from 'next/link';

export default function FeedItem({ data }) {
  return (
    <div>
      <p>
        <Link href={`/user/${data.user_id}`}>Someone you follow</Link>{` finished reading ${data.links.url}`}
      </p>
      <p>{`${data.read_at}`}</p>
    </div>
  )
}
