import React, { Dispatch, memo, VFC } from 'react'
import MediaQuery from 'react-responsive'
import { Post, Profile } from '../../../types'
import { PcResponsive } from '../../responsive/user/profile/PcResponsive'
import { SmartPhoneResponsive } from '../../responsive/user/profile/SmartPhoneResponsive'
import { ProfilePageHeader } from '../header/pcResponsive/ProfilePageHeader'
import { ProfileSmartPhoneHeader } from '../header/smartPhoneResponsive/ProfileSmartPhoneHeader'

type Props = {
  profile:      Profile;
  isOpen:       boolean;
  setIsOpen:    Dispatch<React.SetStateAction<boolean>>;
  posts:        Array<Post>;
  setPosts:     Dispatch<React.SetStateAction<Array<Post>>>;
  changeIsOpen: () => void;
  groupId:      number | undefined;
}
export const PlayerProfile: VFC<Props> = memo((props) => {
  const { profile, isOpen, setIsOpen, posts, setPosts, changeIsOpen, groupId } = props;
  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <ProfilePageHeader changeIsOpen={changeIsOpen} />
        <PcResponsive profile={profile} isOpen={isOpen} setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} groupId={groupId} />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <ProfileSmartPhoneHeader />
        <SmartPhoneResponsive profile={profile} posts={posts}/>
      </MediaQuery>
    </>
  )
})
