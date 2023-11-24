'use client';
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FollowButton from "./FollowButton"

export default function Profile({ user, profileId }) {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        // fetch profile Data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select()
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
    getProfile()
  }, [])

  return (
    <div id="profile-container" className="flex flex-col content-center items-center gap-4">
      <div id="profile-name" className="w-4/5 text-center">
        {
          loading ? (
            <p>Loading Profile...</p>
          ) : (
            <div>
              <p>{profile.email}</p>
            </div>
          )
        }
      </div>
      <FollowButton
        user={user}
        profileId={profileId}
      />
    </div>
  )
}