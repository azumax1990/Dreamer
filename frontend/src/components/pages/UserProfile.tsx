import React, { VFC, memo, useEffect } from 'react'
import MediaQuery from 'react-responsive'
import { useProfile } from '../../hooks/useProfile';

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

  const { getProfile,
          profile,
          isOpen,
          setIsOpen,
          posts,
          setPosts,
          groups,
          profiles,
          messages,
          groupUsers,
          messageModalOpen,
          changeIsOpen,
          ChangeMessageModalTrue,
          ChangeMessageModalFalse,
          groupId
        } = useProfile()

  useEffect(() => getProfile(id), [id])
  
  return (
    <>
      {profile?.job === "演者" ? (
        <>
          <MediaQuery query="(min-width: 768px)">
            <ProfilePageHeader changeIsOpen={changeIsOpen} profile={profile} ChangeMessageModalTrue={ChangeMessageModalTrue}/>
            <PcResponsive profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} groupId={groupId} messageModalOpen={messageModalOpen} ChangeMessageModalFalse={ChangeMessageModalFalse} groups={groups} messages={messages} profiles={profiles} groupUsers={groupUsers}/>
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
            <CompanyProfilePcResponsive profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} groupId={groupId} messageModalOpen={messageModalOpen} ChangeMessageModalFalse={ChangeMessageModalFalse} groups={groups} messages={messages} profiles={profiles} groupUsers={groupUsers}/>
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
