'use client'
import { Link } from "@nextui-org/link"
import { Card, CardBody } from "@nextui-org/card"
import FollowButton from "@/components/FollowButton"

export default function UserCard({ logUser, user }) {
  return (
    <div className="w-96">
      <Card>
        <CardBody>
          <div className="flex flex-row justify-between">
            <Link href={`/user/${user.id}`}>{user.full_name}</Link>
            <FollowButton
              user={logUser}
              profileId={user.id}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}