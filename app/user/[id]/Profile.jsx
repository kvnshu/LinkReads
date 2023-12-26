'use client';
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FollowButton from "./FollowButton"
import SaveItem from "@/components/SaveItem";

export default function Profile({ user, profileId }) {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [profileSaves, setProfileSaves] = useState([])

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        // fetch profile Data
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
            links (
              url
            ),
            read,
            created_at
        `)
          .eq('user_id', profileId)
          .order('created_at', { ascending: true })
        if (profileSavesError) {
          throw profileSavesError
        }
        setProfileSaves(profileSavesData)
      } catch (error) {
        console.log('Error loading profile.')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getProfile()
  }, [])

  async function deleteSave(i, data) {
    console.log(`Deleting ${data.links.url} from reading list.`)
    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('id', save.id)
    if (error) {
      console.log(error);
    }
    const newListSaves = [...listSaves.slice(0, i), ...listSaves.slice(i + 1)];
    setListSaves(newListSaves)
  }

  async function updateIsRead(i, data, isRead) {
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
                key={i}
                index={i}
                data={save}
                deleteSave={deleteSave}
                updateIsRead={updateIsRead}
              />
            )
          )
        }
      </div>
    </div>
  )
}