import React, { memo, VFC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getAudition } from '../../../api/audition'
import { Audition, Profile } from '../../../types'
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
  padding: 0 10px 10px 10px;
  height: 600px;
  overflow: scroll;
`
const AuditionTitle = styled.h2`
  height: 36px;
  overflow: hidden;
  margin: 0;
  text-align: center;
  
`
type Props = {
  id: string;
}
export const AppliedUsers: VFC<Props> = memo((props) => {
  const { id } = props;
  const [profiles, setProfiles] = useState<Array<Profile>>([])
  const [audition, setAudition] = useState<Audition>()
  const history = useHistory()
  const moveToAuditionPage = () => history.push(`/audition/${audition?.id}`)
  useEffect(() => {
    getAudition(id)
    .then((res) => {
      setProfiles(res.data.applied_profiles)
      setAudition(res.data.audition)
    })
  }, [id])

  return (
    <>
      <MessagePageSmartPhoneHeader />
      <AppliedUsersWrapper>
        <UsersContainer>
          <AuditionTitle onClick={moveToAuditionPage}>{audition?.title}</AuditionTitle>
          {profiles.map((profile) => (
            <AppliedUser profile={profile} key={profile.id}/>
          ))}
        </UsersContainer>
      </AppliedUsersWrapper>
    </>
  )
})
