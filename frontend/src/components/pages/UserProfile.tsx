import React, { VFC, memo, useEffect, useState, useContext } from 'react'
import MediaQuery from 'react-responsive'

import { LoginUserContext } from '../../App';
import { getAllImages } from '../../api/post';
import { getUserProfile } from '../../api/profile';
import { Group, GroupUser, Post, Profile, Message } from '../../types';

import { ProfilePageHeader } from '../organisms/header/pcResponsive/ProfilePageHeader'
import { ProfileSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/ProfileSmartPhoneHeader';
import { PcResponsive } from '../responsive/user/profile/PcResponsive'
import { SmartPhoneResponsive } from '../responsive/user/profile/SmartPhoneResponsive'
import { CompanyProfilePcResponsive } from '../responsive/user/company/CompanyProfilePcResponsive'
import { CompanyProfileSmartPhoneResponsive } from '../responsive/user/company/CompanyProfileSmartPhoneResponsive'


type Props = {
  id: string;
}

export const UserProfile: VFC<Props> = memo((props) => {
  const { id } = props;
  const [profile, setProfile]                   = useState<Profile | undefined>()
  const [isOpen, setIsOpen]                     = useState(false)
  const [posts, setPosts]                       = useState<Array<Post>>([])
  const [groups, setGroups]                     = useState<Array<Group>>([])
  const [profiles, setProfiles]                 = useState<Array<Profile>>([])
  const [messages, setMessage]                  = useState<Array<Message>>([])
  const [groupUsers, setGroupUsers]             = useState<Array<GroupUser>>([])
  const [messageModalOpen, setMessageModalOpen] = useState(false)

  const { currentUser } = useContext(LoginUserContext)
  
  useEffect(() => {
    getUserProfile(id)
    .then((res) => {
      setProfile(res.data.profile)
      setGroupUsers(res.data.group_members)
      setGroups(res.data.groups)
      setMessage(res.data.messages)
      setProfiles(res.data.profiles)
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
  const ChangeMessageModalTrue = () => setMessageModalOpen(true)
  const ChangeMessageModalFalse = () => setMessageModalOpen(false)
  const selectedGroupUser = groupUsers.find((groupUser) => groupUser.user_id === currentUser?.id)
  const groupId = selectedGroupUser?.group_id

  return (
    <>
      {profile?.job === "演者" ? (
        <>
          <MediaQuery query="(min-width: 768px)">
            <ProfilePageHeader changeIsOpen={changeIsOpen} profile={profile} ChangeMessageModalTrue={ChangeMessageModalTrue}/>
            <PcResponsive profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} groupId={groupId} messageModalOpen={messageModalOpen} ChangeMessageModalFalse={ChangeMessageModalFalse} groups={groups} messages={messages} profiles={profiles}/>
          </MediaQuery>
          <MediaQuery query="(max-width: 767px)">
            <ProfileSmartPhoneHeader profile={profile}/>
            <SmartPhoneResponsive profile={profile} posts={posts} groupId={groupId}/>
          </MediaQuery>
        </>
      ) : (
        <>
          <MediaQuery query="(min-width: 768px)">
            <ProfilePageHeader changeIsOpen={changeIsOpen} profile={profile} ChangeMessageModalTrue={ChangeMessageModalTrue}/>
            <CompanyProfilePcResponsive profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} groupId={groupId} messageModalOpen={messageModalOpen} ChangeMessageModalFalse={ChangeMessageModalFalse} groups={groups} messages={messages} profiles={profiles}/>
          </MediaQuery>
          <MediaQuery query="(max-width: 767px)">
            <ProfileSmartPhoneHeader profile={profile}/>
            <CompanyProfileSmartPhoneResponsive profile={profile} posts={posts} groupId={groupId}/>
          </MediaQuery>
        </>
      )}
    </>
  )
})
