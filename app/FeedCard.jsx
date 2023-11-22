import React from 'react'

export default function FeedCard({ data }) {
  return (
    <div>
      <p>{`${data.user_id} finished reading ${data.links.url}`}</p>
      <p>{`${data.read_at}`}</p>
    </div>
  )
}
