'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/button";

export default function FollowButton({ user, profileId, supabase }) {
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function getIsFollowing() {
      try {
        // fetch if logUser is following user
        const { data: followingData, error: followingError } = await supabase
          .from('followings')
          .select()
          .eq('user_id1', user.id)
          .eq('user_id2', profileId)
          .maybeSingle()

        if (followingError) {
          throw followingError
        }
        setIsFollowing(followingData != null)
      } catch (error) {
        console.log('Error loading isFollowing.')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getIsFollowing()
  })

  async function handleFollowToggle() {
    try {
      setLoading(true);
      if (isFollowing) {
        const { data, error } = await supabase
          .from('followings')
          .delete()
          .eq('user_id1', user.id)
          .eq('user_id2', profileId)
        if (error) {
          throw error;
        }
      } else {
        const { error } = await supabase
          .from('followings')
          .upsert({
            user_id1: user.id,
            user_id2: profileId
          }, {
            onConflict: 'user_id1, user_id2',
            ignoreDuplicates: 'false  '
          })
        if (error) {
          throw error;
        }
      }

      setIsFollowing(prevState => !prevState);
    } catch (error) {
      console.log('Error following/unfollowing profile.')
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {
        loading ? (
          <></>
        ) : (
          <>
            {
              user.id !== profileId ? (
                <Button
                  onClick={handleFollowToggle}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              ) : (
                <></>
              )
            }
          </>
        )
      }
    </div>
  )
}

