'use client';
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FollowButton from "./FollowButton"
import ProfileSaveItem from "./ProfileSaveItem";

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
          .order('created_at', {ascending: true})
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
              <ProfileSaveItem
                key={i}
                index={i}
                data={save}
                profileSaves={profileSaves}
              setProfileSaves={setProfileSaves}
              />
            )
          )
        }
      </div>
    </div>
  )
}