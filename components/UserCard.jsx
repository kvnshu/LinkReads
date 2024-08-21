"use client";
import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import FollowButton from "@/components/FollowButton";
import { Avatar } from "@nextui-org/avatar";

export default function UserCard({ logUser, user, loading }) {
  return (
    <div className="">
      <Card className="bg-content2">
        <CardBody>
          <div className="flex flex-row items-center justify-between">
            <Link href={`/user/${user.id}`}>
              <div className="flex gap-3.5 items-center">
                <Avatar
                  className="flex-none"
                  showFallback
                  name={
                    loading
                      ? ""
                      : user?.full_name
                          ?.split(" ")
                          .map((word) => word.substring(0, 1))
                          .join("")
                  }
                  src={user?.avatar_url}
                  size="md"
                  radius="full"
                />
                {user.full_name}
              </div>
            </Link>
            <FollowButton user={logUser} profileId={user.id} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
