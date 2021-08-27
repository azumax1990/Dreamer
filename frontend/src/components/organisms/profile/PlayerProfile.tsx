import React, { memo, VFC } from 'react'
import MediaQuery from 'react-responsive'
import { Profile } from '../../../types'
import { PcResponsive } from '../../responsive/user/profile/PcResponsive'
import { SmartPhoneResponsive } from '../../responsive/user/profile/SmartPhoneResponsive'

type Props = {
  profile: Profile;
}
export const PlayerProfile: VFC<Props> = memo((props) => {
  const { profile } = props;
  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <PcResponsive profile={profile} />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <SmartPhoneResponsive profile={profile} />
      </MediaQuery>
    </>
  )
})
