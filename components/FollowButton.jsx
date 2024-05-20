'use client'
import { useState, useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { createSupabaseFrontendClient } from '@/utils/supabaseBrowser';

export default function FollowButton({ user, profileId }) {
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    async function getIsFollowing() {
      try {
        // fetch if logUser is following user
        if (!user) {
          return
        }
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
            ignoreDuplicates: 'false'
          })
        if (error) {
          throw error;
        }
      }

      setIsFollowing(prevState => !prevState);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {
        user && user?.id !== profileId ? (
          <Button
            className={isFollowing ? "bg-transparent text-foreground border-default-200" : ""}
            size="sm"
            variant={isFollowing ? "bordered" : 'solid'}
            color="primary"
            onClick={handleFollowToggle}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        ) : (
          <></>
        )
      }
    </div>
  )
}

