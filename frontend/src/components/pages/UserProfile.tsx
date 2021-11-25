import React, { VFC, memo, useEffect, useContext } from 'react'
import MediaQuery from 'react-responsive'
import { useProfile } from '../../hooks/useProfile';
import { LoginUserContext } from '../../App';

import { ProfilePageHeader } from '../organisms/header/pcResponsive/ProfilePageHeader'
import { ProfileSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/ProfileSmartPhoneHeader';
import { PcResponsive } from '../mediaQuery/user/profile/PcResponsive'
import { SmartPhoneResponsive } from '../mediaQuery/user/profile/SmartPhoneResponsive'
import { CompanyProfilePcResponsive } from '../mediaQuery/user/company/CompanyProfilePcResponsive'
import { CompanyProfileSmartPhoneResponsive } from '../mediaQuery/user/company/CompanyProfileSmartPhoneResponsive'
import { Loading } from '../organisms/loading/Loading';

type Props = {
  id: string;
}

export const UserProfile: VFC<Props> = memo((props) => {
  const { id } = props;
  const { loading } = useContext(LoginUserContext)
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
          ChangeMessageModalOpen,
          groupId,
          auditions,
          auditionModalOpen,
          ChangeAuditionModalOpen,
        } = useProfile()

  useEffect(() => getProfile(id), [getProfile, id])
  console.log(posts)
  console.log(profile)
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {profile?.job === "演者" ? (
            <>
              <MediaQuery query="(min-width: 768px)">
                <ProfilePageHeader changeIsOpen={changeIsOpen} profile={profile} ChangeMessageModalOpen={ChangeMessageModalOpen} ChangeAuditionModalOpen={ChangeAuditionModalOpen}/>
                <PcResponsive profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} groupId={groupId} messageModalOpen={messageModalOpen} ChangeMessageModalOpen={ChangeMessageModalOpen} groups={groups} messages={messages} profiles={profiles} groupUsers={groupUsers} auditions={auditions} auditionModalOpen={auditionModalOpen} ChangeAuditionModalOpen={ChangeAuditionModalOpen}/>
              </MediaQuery>
              <MediaQuery query="(max-width: 767px)">
                <ProfileSmartPhoneHeader profile={profile}/>
                <SmartPhoneResponsive profile={profile} posts={posts} setPosts={setPosts} groupId={groupId}/>
              </MediaQuery>
            </>
          ) : (
            <>
              <MediaQuery query="(min-width: 768px)">
                <ProfilePageHeader changeIsOpen={changeIsOpen} profile={profile} ChangeMessageModalOpen={ChangeMessageModalOpen} ChangeAuditionModalOpen={ChangeAuditionModalOpen}/>
                <CompanyProfilePcResponsive profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} groupId={groupId} messageModalOpen={messageModalOpen} ChangeMessageModalOpen={ChangeMessageModalOpen} groups={groups} messages={messages} profiles={profiles} groupUsers={groupUsers} auditions={auditions} auditionModalOpen={auditionModalOpen} ChangeAuditionModalOpen={ChangeAuditionModalOpen}/>
              </MediaQuery>
              <MediaQuery query="(max-width: 767px)">
                <ProfileSmartPhoneHeader profile={profile}/>
                <CompanyProfileSmartPhoneResponsive profile={profile} posts={posts} setPosts={setPosts} groupId={groupId}/>
              </MediaQuery>
            </>
          )}
        </>
      )}
    </>
  )
})
