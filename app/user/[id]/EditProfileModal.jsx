'use client'
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import { Avatar } from "@nextui-org/avatar";

export default function EditProfile({ profile, setProfile }) {
  const supabase = createSupabaseFrontendClient();
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState();
  const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onOpenChange: onEditProfileOpenChange } = useDisclosure();

  useEffect(() => {
    setLoading(false);
  });

  function handleAvatarFileChange(e) {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files);
    setAvatarFile(e.target.files[0]);
  }

  async function updateProfile(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // catch new name can't be blank
    try {
      setLoading(true);
      let updateObj = {}
      if (avatarFile) {
        console.log('Changing avatar', {avatarFile});
        const avatarFilename = `${profile.id}/avatar`;
        // upsert into storage
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('avatars')
          .upload(avatarFilename, avatarFile, {
            upsert: true
          });
        if (storageError) {
          throw storageError;
        }
        console.log('Uploaded image to storage.', { storageData });
        updateObj.avatar_filename = avatarFilename;
      }
      if (formJson.name !== profile.full_name) {
        console.log('Changing name:', formJson.name);
        updateObj.full_name = formJson.name;
      }
      console.log(updateObj);
      if (updateObj) {
        const { data, error } = await supabase
          .from('profiles')
          .update(updateObj)
          .eq('id', profile.id)
          .select()
        if (error) {
          throw error
        }
        setProfile({
          ...profile,
          ...updateObj
        })
        console.log('Profile data updated.')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAvatarFile(null);
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
                  <div className="flex items-center gap-2">
                    <Avatar
                      showFallback
                      name={loading ? "" : profile?.full_name.split(' ').map(word => word.substring(0, 1)).join('')}
                      className="flex-none"
                      src={avatarFile ? URL.createObjectURL(avatarFile) : profile?.avatar_filename}
                      size="lg"
                      radius="full"
                    />
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="avatar"
                      onChange={handleAvatarFileChange}
                    />
                  </div>
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
                    onPress={() => {
                      onEditProfileClose();
                      setAvatarFile(null);
                    }}
                  >
                    Save and Close
                  </Button>
                  <Button color="danger" variant="light" onPress={() => {
                    onEditProfileClose();
                    setAvatarFile(null);
                  }}>
                    Cancel
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