'use client';
import { useState, useEffect } from "react";
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import FollowButton from "@/components/FollowButton"
import UserCard from "@/components/UserCard";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { parseAndHumanizeDate } from "@/utils/parseAndHumanizeDate";
import { Link } from "@nextui-org/link";
import EditProfileModal from "@/app/user/[id]/EditProfileModal";
import { Avatar } from "@nextui-org/avatar";
import SavesViewer from "@/app/user/[id]/SavesViewer";

export default function Profile({ user, profileId }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { isOpen: isFollowingOpen, onOpen: onFollowingOpen, onOpenChange: onFollowingOpenChange } = useDisclosure();
  const { isOpen: isFollowersOpen, onOpen: onFollowersOpen, onOpenChange: onFollowersOpenChange } = useDisclosure();
  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        // fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select(`
            id,
            email,
            full_name,
            created_at,
            avatar_url
          `)
          .eq('id', profileId)
          .single()
        if (profileError) {
          throw profileError
        }
        setProfile(profileData)
      } catch (error) {
        console.log('Error loading profile.')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    async function fetchFollowings() {
      try {
        // fetch following
        const { data: followingsData, error: followingsError } = await supabase
          .from('followings')
          .select(`
            user_id2,
            profiles!followings_user_id2_fkey (
              id,
              full_name,
              avatar_url
            )
          `)
          .eq('user_id1', profileId)
        if (followingsError) {
          throw followingsError
        }

        // fetch followers
        setLoading(true);
        const { data: followersData, error: followersError } = await supabase
          .from('followings')
          .select(`
            user_id1,
            profiles!followings_user_id1_fkey (
              id,
              full_name,
              avatar_url
            )
          `)
          .eq('user_id2', profileId)
        if (followersError) {
          throw followersError
        }
        setFollowings(followingsData);
        setFollowers(followersData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
    fetchFollowings();
  }, []);

  return (
    <div id="profile-container" className="w-4/5 h-full flex flex-col sm:flex-row content-center justify-center gap-12">
      <div className="w-full sm:w-64">
        <Card
          id="profile-info"
          className="max-w-[340px] px-2 py-1"
        >
          <CardHeader
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-3.5 items-center">
                <Avatar
                  showFallback
                  name={loading ? "" : profile?.full_name?.split(' ').map(word => word.substring(0, 1)).join('')}
                  className="flex-none"
                  src={loading ? "" : profile?.avatar_url}
                  size="md"
                  radius="full"
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  {
                    loading | profile ? (
                      <div className="h-6 w-2/5 rounded-lg bg-default-200"></div>
                    ) : (
                      <span className="text-small font-semibold leading-none text-default-600">{profile?.full_name}</span>
                    )
                  }
                </div>
              </div>
              {
                user?.id === profileId ? (
                  <>
                    <EditProfileModal
                      profile={profile}
                      setProfile={setProfile}
                    />
                  </>
                ) : (
                  <FollowButton
                    user={user}
                    profileId={profileId}
                  />
                )
              }
            </div>

          </CardHeader>
          <CardBody className="px-3 pt-0 text-small text-default-400">
            <div id="follow-modals" className="flex flex-row gap-3 pb-2">
              <div id="following">
                <Link href="#" size="sm" onPress={onFollowingOpen}>{followings.length} Following</Link>
                <Modal
                  isOpen={isFollowingOpen}
                  onOpenChange={onFollowingOpenChange}
                  scrollBehavior={"inside"}
                >
                  <ModalContent>
                    {(onFollowingClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          <p>{followings.length} Following</p>
                        </ModalHeader>
                        <ModalBody>
                          {
                            loading ? (
                              <p>loading following...</p>
                            ) : (
                              <div className="flex flex-col gap-4">
                                {
                                  followings.map((data) =>
                                    <UserCard
                                      key={data.profiles.id}
                                      user={data.profiles}
                                      logUser={user}
                                      loading={loading}
                                    />
                                  )
                                }
                              </div>
                            )
                          }
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="light" onPress={onFollowingClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
              <div id="followers">
                <Link href="#" size="sm" onPress={onFollowersOpen}>{followers.length} Followers</Link>
                <Modal
                  isOpen={isFollowersOpen}
                  onOpenChange={onFollowersOpenChange}
                  scrollBehavior={"inside"}
                >
                  <ModalContent>
                    {(onFollowersClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          <p>{followers.length} Followers</p>
                        </ModalHeader>
                        <ModalBody>
                          {
                            loading ? (
                              <p>loading followers...</p>
                            ) : (
                              <div className="flex flex-col gap-4">
                                {
                                  followers.map((data) =>
                                    <UserCard
                                      key={data.profiles.id}
                                      user={data.profiles}
                                      logUser={user}
                                      loading={loading}
                                    />
                                  )
                                }
                              </div>
                            )
                          }
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="light" onPress={onFollowersClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>
            <p className="min-w-full text-xs text-slate-400 text-center">Joined {parseAndHumanizeDate(profile?.created_at)}</p>
          </CardBody>
        </Card>
      </div>
      <SavesViewer
        user={user}
        profileId={profileId}
      />
    </div>
  )
}