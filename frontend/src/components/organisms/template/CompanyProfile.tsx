import React, { Dispatch, memo, VFC } from 'react'
import MediaQuery from 'react-responsive'

import { Post, Profile } from '../../../types'

import { PcResponsive } from '../../responsive/user/company/PcResponsive'
import { SmartPhoneResponsive } from '../../responsive/user/company/SmartPhoneResponsive'
import { ProfilePageHeader } from '../header/pcResponsive/ProfilePageHeader'
import { ProfileSmartPhoneHeader } from '../header/smartPhoneResponsive/ProfileSmartPhoneHeader'

type Props = {
  profile: Profile | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  posts: Array<Post>;
  setPosts: Dispatch<React.SetStateAction<Array<Post>>>;
  changeIsOpen: () => void;
}

export const CompanyProfile: VFC<Props> = memo((props) => {
  const { profile, isOpen, setIsOpen, posts, setPosts, changeIsOpen } = props;
  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <ProfilePageHeader changeIsOpen={changeIsOpen} />
        <PcResponsive profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts}/>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <ProfileSmartPhoneHeader />
        <SmartPhoneResponsive profile={profile} posts={posts}/>
      </MediaQuery>
    </>
  )
})
