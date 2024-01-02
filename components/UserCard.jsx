'use client'
import { Link } from "@nextui-org/link"
import { Card, CardBody } from "@nextui-org/card"
import FollowButton from "@/components/FollowButton"

export default function UserCard({ logUser, user }) {
  // console.log(logUser, user)
  return (
    <div className="w-96">
      <Card>
        <CardBody>
          <Link href={`/user/${user.id}`}>{user.full_name}</Link>
          <FollowButton
            user={logUser}
            profileId={user.id}
          />
        </CardBody>
      </Card>
    </div>
  )
}