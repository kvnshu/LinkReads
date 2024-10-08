"use client";
import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { createSupabaseFrontendClient } from "@/utils/supabaseBrowser";

function HeaderAvatarMenu() {
  const supabase = createSupabaseFrontendClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const {
          data: { user },
          authError,
        } = await supabase.auth.getUser();
        if (authError) {
          throw authError;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select(
            `
            id,
            email,
            full_name,
            avatar_url
            `
          )
          .eq("id", user.id)
          .single();
        setProfile(data);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  });

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          showFallback
          name={
            loading
              ? ""
              : profile?.full_name
                  ?.split(" ")
                  .map((word) => word.substring(0, 1))
                  .join("")
          }
          className="transition-transform"
          size="sm"
          src={loading ? "" : profile?.avatar_url}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" href={`/user/${profile?.id}`}>
          View Profile
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          <LogoutButton />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default HeaderAvatarMenu;
