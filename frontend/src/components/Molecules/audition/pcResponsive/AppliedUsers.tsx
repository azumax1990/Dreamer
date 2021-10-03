import React, { VFC, memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaAngleDoubleLeft } from "react-icons/fa"
import { getAudition } from '../../../../api/audition'
import { Profile } from '../../../../types'
import { AppliedUser } from './AppliedUser'


const AuditionNameContainer = styled.div`
  display: flex;
  aline-items: center;
`
const AuditionName = styled.h2`
  height: 36px;
  overflow: hidden;
  padding-left: 205px;
  margin: 0;
`
const AppliedUsersContainer = styled.div`
  height: 500px;
  padding-top: 20px;
  overflow: scroll;
`

type Props = {
  id:                      number | undefined;
  onChangeAppliedModal:    () => void;
  ChangeAuditionModalOpen: () => void;
} 
export const AppliedUsers: VFC<Props> = memo((props) => {
  const {id, onChangeAppliedModal, ChangeAuditionModalOpen} = props
  const [profiles, setProfiles] = useState<Array<Profile>>()
  
  useEffect(() => {
    getAudition(id as number)
    .then((res) => {
      setProfiles(res.data.applied_profiles)
      console.log(res.data)
    })
  }, [])
  return (
    <>
      <AuditionNameContainer>
        <FaAngleDoubleLeft style={{ fontSize: "30px", cursor: "pointer" }} onClick={onChangeAppliedModal}/>
        <AuditionName>応募リスト</AuditionName>
      </AuditionNameContainer>
      <AppliedUsersContainer>
        {profiles?.map((profile) => (
          <AppliedUser profile={profile} ChangeAuditionModalOpen={ChangeAuditionModalOpen}/>
        ))}
      </AppliedUsersContainer>
    </>
  )
})
