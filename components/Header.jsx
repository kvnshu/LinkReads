import LogoutButton from './LogoutButton'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from '@nextui-org/link';
import LogoPrimary from './LogoPrimary';
import { createSupabaseServerComponentClient } from '@/utils/supabaseAppRouterServer'

export default async function Header() {
  const supabase = createSupabaseServerComponentClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <Navbar position="static">
      <NavbarBrand>
        <LogoPrimary />
      </NavbarBrand>
      {(user) ? (
        <NavbarContent as="div" justify="end">
          <Link href="/explore/">
            Explore
          </Link>
          <Link href={`/user/${user?.id}`}>
            Profile
          </Link>
          <LogoutButton />
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem>
            <GoogleLoginButton />
          </NavbarItem>
        </NavbarContent >
      )}
    </Navbar >
  )
}