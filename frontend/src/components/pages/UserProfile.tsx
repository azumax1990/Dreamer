import React, { VFC, memo, useEffect, useState } from 'react'
import { getAllImages } from '../../api/post';

import { getUserProfile } from '../../api/profile';
import { Post, Profile } from '../../types';

import { CompanyProfile } from '../organisms/template/CompanyProfile';
import { PlayerProfile } from '../organisms/template/PlayerProfile';

type Props = {
  id: string;
}

export const UserProfile: VFC<Props> = memo((props) => {
  const { id } = props;
  const [profile, setProfile] = useState<Profile | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [posts, setPosts]  = useState<Array<Post>>([])

  useEffect(() => {
    getUserProfile(id)
    .then((res) => {
      setProfile(res.data)
    })
    .catch(() => alert('ユーザーを取得できませんでした'))
  }, [setProfile, id])

  useEffect(() => {
    getAllImages(id)
    .then((res) => {
      setPosts(res.data)
    })
    .catch(() => alert('写真を取得できませんでした'))
  }, [setPosts, setIsOpen, id])
  
  const changeIsOpen = () => setIsOpen(true)
  return (
    <>
      {profile?.job === "演者" ? (
        <PlayerProfile profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} changeIsOpen={changeIsOpen}/>
      ) : (
        <CompanyProfile profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} changeIsOpen={changeIsOpen}/>
      )}
    </>
  )
})
