import React, { VFC, memo, useEffect, useState, useContext } from 'react'
import { getAllImages } from '../../api/post';

import { getUserProfile } from '../../api/profile';
import { LoginUserContext } from '../../App';
import { GroupUser, Post, Profile } from '../../types';

import { CompanyProfile } from '../organisms/template/CompanyProfile';
import { PlayerProfile } from '../organisms/template/PlayerProfile';

type Props = {
  id: string;
}

export const UserProfile: VFC<Props> = memo((props) => {
  const { id } = props;
  const [profile, setProfile]       = useState<Profile | undefined>()
  const [isOpen, setIsOpen]         = useState(false)
  const [posts, setPosts]           = useState<Array<Post>>([])
  const [groupUsers, setGroupUsers] = useState<Array<GroupUser>>([])

  const { currentUser }             = useContext(LoginUserContext)
  
  useEffect(() => {
    getUserProfile(id)
    .then((res) => {
      setProfile(res.data.profile)
      setGroupUsers(res.data.group_members)
    })
    .catch(() => alert('ユーザーを取得できませんでした'))
  }, [id])

  useEffect(() => {
    getAllImages(id)
    .then((res) => {
      setPosts(res.data)
    })
    .catch(() => alert('写真を取得できませんでした'))
  }, [id])
  
  const changeIsOpen = () => setIsOpen(true)
  
  const selectedGroupUser = groupUsers.find((groupUser) => groupUser.user_id === currentUser?.id)
  const groupId = selectedGroupUser?.group_id

  return (
    <>
      {profile?.job === "演者" ? (
        <PlayerProfile profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} changeIsOpen={changeIsOpen} groupId={groupId} />
      ) : (
        <CompanyProfile profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} changeIsOpen={changeIsOpen} groupId={groupId}/>
      )}
    </>
  )
})
