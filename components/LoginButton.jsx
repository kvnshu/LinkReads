'use client'
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function LoginButton() {
  return (
    <div>
      <Button href="/login" as={Link} color="primary" variant="flat">
        Login
      </Button>
    </div>
  )
}