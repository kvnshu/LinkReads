'use client'
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'


export default function EditProfile({ profile, setProfile }) {
  const [loading, setLoading] = useState(true);
  const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onOpenChange: onEditProfileOpenChange } = useDisclosure();
  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    setLoading(false);
  });

  async function updateProfile(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // new name can't be blank
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .update({ full_name: formJson.name })
        .eq('id', profile.id)
        .select()
      if (error) {
        throw error
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProfile({
        ...profile,
        "full_name": formJson.name
      })
      setLoading(false);
    }
    // onEditProfileClose();
  }

  return (
    <>
      <Link href="#" size="sm" onPress={onEditProfileOpen}>
        Edit Profile
      </Link>
      <Modal isOpen={isEditProfileOpen} onOpenChange={onEditProfileOpenChange}>
        <ModalContent>
          {(onEditProfileClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>Edit Profile</p>
              </ModalHeader>
              <form onSubmit={updateProfile}>
                <ModalBody>
                  <Input
                    name="name"
                    label="Name"
                    defaultValue={profile.full_name}
                    className="max-w-[200px]"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    variant="ghost"
                    isDisabled={loading}
                    onPress={onEditProfileClose}
                  >
                    Update and Close
                  </Button>
                  <Button color="danger" variant="light" onPress={onEditProfileClose}>
                    Close
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal >
    </>
  )
}