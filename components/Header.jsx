import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
// import { Link } from '@nextui-org/link';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Header() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <Navbar position="static">
      <NavbarBrand>
        <a href="/">
          <p className="font-bold text-inherit">LinkReads</p>
        </a>
      </NavbarBrand>
      {(user) ? (
        <NavbarContent as="div" justify="end">
          <Link href={`/user/${user?.id}`}>
            Profile
          </Link>
          <Avatar
            isBordered
            // as="button"
            className="transition-transform"
            color="secondary"
            size="sm"
          />
          <LogoutButton />
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem>
            <LoginButton />
          </NavbarItem>
        </NavbarContent >
      )}
    </Navbar >
  )
}