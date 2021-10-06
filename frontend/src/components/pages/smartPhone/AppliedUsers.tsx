import React, { memo, VFC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAudition } from '../../../api/audition'
import { Profile } from '../../../types'
import { AppliedUser } from '../../Molecules/audition/smartphoneResponsive/AppliedUser'
import { MessagePageSmartPhoneHeader } from '../../organisms/header/smartPhoneResponsive/MessagePageSmartPhoneHeader'

const AppliedUsersWrapper = styled.div`
  width: 340px;
  margin: 30px auto;
  padding: 20px 0;
  border-radius: 10px;
  box-shadow: 0 0 5px gray;
`
const UsersContainer = styled.div`
  padding: 10px;
  height: 600px;
  overflow: scroll;
`
const TitleText = styled.h2`
  margin: 0;
  text-align: center;
`
type Props = {
  id: string;
}
export const AppliedUsers: VFC<Props> = memo((props) => {
  const { id } = props;
  const [profiles, setProfiles] = useState<Array<Profile>>([])
  useEffect(() => {
    getAudition(id)
    .then((res) => {
      setProfiles(res.data.applied_profiles)
    })
  }, [id])

  return (
    <>
      <MessagePageSmartPhoneHeader />
      <AppliedUsersWrapper>
        <UsersContainer>
          <TitleText>応募リスト</TitleText>
          {profiles.map((profile) => (
            <AppliedUser profile={profile} key={profile.id}/>
          ))}
        </UsersContainer>
      </AppliedUsersWrapper>
    </>
  )
})
