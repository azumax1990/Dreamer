import React, { VFC, memo, useEffect, useState } from 'react'
import MediaQuery from "react-responsive";

import { getUserProfile } from '../../api/profile';
import { Profile } from '../../types';

import { HeaderProfile } from '../organisms/HeaderProfile'
import { PcResponsive } from '../responsives/profiles/PcResponsive'; 
import { SmartPhoneResponsive } from '../responsives/profiles/SmartPhoneResponsive';


type Props = {
  id: string;
}

const initialProfile = {
  age: 1,
  gender: "",
  id: 1,
  introduction: "",
  name: "",
  prefecture: "",
  tall: 0,  
  user_id: 1,
  avatar_url: "",
}

export const UserProfile: VFC<Props> = memo((props) => {
  const { id } = props;
  const [profile, setProfile] = useState<Profile>(initialProfile)
  
  useEffect(() => {
    getUserProfile(id)
    .then((res) => {
     setProfile(res.data)
     console.log(res)
    })
  }, [setProfile])
  console.log(profile)
  return (
    <>
      <HeaderProfile />
      <MediaQuery query="(min-width: 768px)">
        <PcResponsive profile={profile} />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <SmartPhoneResponsive profile={profile} />
      </MediaQuery>
    </>
  )
})
