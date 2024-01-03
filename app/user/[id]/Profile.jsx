'use client';
import { useState, useEffect } from "react";
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser'
import FollowButton from "@/components/FollowButton"
import SaveItem from "@/components/SaveItem";
import UserCard from "@/components/UserCard";

export default function Profile({ user, profileId }) {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [profileSaves, setProfileSaves] = useState([])
  const [followings, setFollowings] = useState([])
  const [followers, setFollowers] = useState([])

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
            full_name
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
    async function fetchSaves() {
      try {
        // fetch user's saves
        setLoading(true);
        const { data: profileSavesData, error: profileSavesError } = await supabase
          .from('saves')
          .select(`
                  id,
                  user_id,
                  links (
                    url
                  ),
                  read,
                  created_at
                `)
          .eq('user_id', profileId)
          .order('created_at', { ascending: false })
        if (profileSavesError) {
          throw profileSavesError
        }
        setProfileSaves(profileSavesData)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
              full_name
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
              full_name
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
    fetchSaves();
    fetchFollowings();
  }, [])

  async function deleteSave(data) {
    console.log(`Deleting ${data.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', data.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = profileSaves.filter((save) => save.id !== data.id)
    setProfileSaves(newListSaves)
  }

  async function updateIsRead(data, isRead) {
    console.log(`Setting save ${data.links.url} to ${!isRead}`)
    const { error } = await supabase
      .from('saves')
      .update({
        read: !isRead,
        read_at: isRead ? null : new Date().toISOString()
      })
      .eq('id', data.id)
    if (error) {
      console.log(error);
    }
  }

  return (
    <div id="profile-container" className="w-4/5 h-full flex content-center justify-center gap-24">
      <div className="w-64">
        <div id="profile-details" className="w-full flex flex-col text-center align-center">
          {
            loading | profile ? (
              <p>Loading Profile...</p>
            ) : (
              <p className="font-bold">{profile?.full_name}</p>
            )
          }
          <FollowButton
            user={user}
            profileId={profileId}
          />
        </div>
        <div id="following" className="min-h-12 pb-6">
          <p>Following:</p>
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
                    />
                  )
                }
              </div>
            )
          }
        </div>
        <div id="followers" className="min-h-12 pb-6">
          <p>Followers:</p>
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
                    />
                  )
                }
              </div>
            )
          }
        </div>
      </div>
      <div id="saves-container" className="w-96 flex flex-col gap-4">
        {
          loading ? (
            <p>Loading saves...</p>
          ) : (
            profileSaves.map((save, i) =>
              <SaveItem
                key={save.id}
                data={save}
                deleteSave={deleteSave}
                updateIsRead={updateIsRead}
                user={user}
              />
            )
          )
        }
      </div>

    </div >
  )
}