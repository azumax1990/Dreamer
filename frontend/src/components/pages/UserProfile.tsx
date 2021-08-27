import React, { VFC, memo, useEffect, useState } from 'react'

import { getUserProfile } from '../../api/profile';
import { Profile } from '../../types';

import { HeaderProfile } from '../organisms/HeaderProfile'
import { CompanyProfile } from '../organisms/profile/CompanyProfile';
import { PlayerProfile } from '../organisms/profile/PlayerProfile';


type Props = {
  id: string;
}

export const UserProfile: VFC<Props> = memo((props) => {
  const { id } = props;
  const [profile, setProfile] = useState<Profile | undefined>()
  
  useEffect(() => {
    getUserProfile(id)
    .then((res) => {
      setProfile(res.data)
    })
  }, [setProfile])
  
  return (
    <>
      <HeaderProfile id={id}/>
      {profile?.job === "演者" ? (
        <>
          <PlayerProfile profile={profile}/>
        </>
      ) : (
        <CompanyProfile profile={profile}/>
      )}
    </>
  )
})
