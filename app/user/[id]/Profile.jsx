'use client';
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FollowButton from "./FollowButton"
import SaveItem from "@/components/SaveItem";

export default function Profile({ user, profileId }) {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [profileSaves, setProfileSaves] = useState([])
  const [followings, setFollowings] = useState([])
  const [followers, setFollowers] = useState([])

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        // fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select(`
            id,
            email
          `)
          .eq('id', profileId)
          .single()
        if (profileError) {
          throw profileError
        }
        setProfile(profileData)

        // fetch user's saves
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

        // fetch following
        const { data: followingsData, error: followingsError } = await supabase
          .from('followings')
          .select(`
            user_id2
          `)
          .eq('user_id1', profileId)
        if (followingsError) {
          throw followingsError
        }
        setFollowings(followingsData)

        // fetch followers
        const { data: followersData, error: followersError } = await supabase
          .from('followings')
          .select(`
            user_id1
          `)
          .eq('user_id2', profileId)
        if (followersError) {
          throw followersError
        }
        setFollowers(followersData)
      } catch (error) {
        console.log('Error loading profile.')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getProfile()
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
    <div id="profile-container" className="flex flex-col content-center items-center gap-4">
      <div id="profile-details" className="w-4/5 text-center">
        {
          loading ? (
            <p>Loading Profile...</p>
          ) : (
            <div>
              <p>{profile.email}</p>
            </div>
          )
        }
        <FollowButton
          user={user}
          profileId={profileId}
        />
      </div>
      <div id="profile-saves-container" className="flex flex-col gap-4">
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
      <div id="following" className="min-h-12">
        <p>Following:</p>
        {
          loading ? (
            <p>loading following...</p>
          ) : (
            followings.map((data, i) =>
              <div> {data.user_id2}</div>
            )
          )
        }
      </div>
      <div id="followers" className="min-h-12">
        <p>Followers:</p>
        {
          loading ? (
            <p>loading followers...</p>
          ) : (
            followers.map((data, i) =>
              <div> {data.user_id1}</div>
            )
          )
        }
      </div>
    </div >
  )
}