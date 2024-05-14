import GoogleLoginButton from '@/components/GoogleLoginButton'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from '@nextui-org/link';
import LogoPrimary from './LogoPrimary';
import { createSupabaseServerComponentClient } from '@/utils/supabaseAppRouterServer';
import HeaderAvatarDropDown from '@/components/HeaderAvatarDropdown';

export default async function Header() {
  const supabase = createSupabaseServerComponentClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <Navbar
      position="static"
      className="py-4"
    >
      <NavbarBrand>
        <LogoPrimary />
      </NavbarBrand>
      {
        (user) ? (
          <NavbarContent as="div" justify="end">
            <Link href="/">
              Home
            </Link>
            <Link href="/explore/">
              Explore
            </Link>
            <HeaderAvatarDropDown />
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem>
              <GoogleLoginButton />
            </NavbarItem>
          </NavbarContent >
        )
      }
    </Navbar >
  )
}

