import React, { VFC, memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaAngleDoubleLeft } from "react-icons/fa"
import { getAudition } from '../../../../api/audition'
import { Audition, Profile } from '../../../../types'
import { AppliedUser } from './AppliedUser'
import { useHistory } from 'react-router-dom'


const AuditionNameContainer = styled.div`
  display: flex;
  aline-items: center;
`
const AuditionName = styled.h2`
  font-size: 26px;
  height: 36px;
  overflow: hidden;
  padding-left: 15px;
  padding-bottom: 5px;
  margin: 0;
  cursor: pointer;
`
const AppliedUsersContainer = styled.div`
  height: 500px;
  padding-top: 20px;
  overflow: scroll;
`

type Props = {
  id:                      number | undefined;
  audition:                Audition | undefined;
  onChangeAppliedModal:    () => void;
  ChangeAuditionModalOpen: () => void;
} 
export const AppliedUsers: VFC<Props> = memo((props) => {
  const {id, audition, onChangeAppliedModal, ChangeAuditionModalOpen} = props
  const [profiles, setProfiles] = useState<Array<Profile>>()
  const history = useHistory()
  const moveToAuditionPage = () => history.push(`/audition/${audition?.id}`)
  useEffect(() => {
    getAudition(id as number)
    .then((res) => {
      setProfiles(res.data.applied_profiles)
    })
  }, [id])
  return (
    <>
      <AuditionNameContainer>
        <FaAngleDoubleLeft style={{ fontSize: "30px", cursor: "pointer" }} onClick={onChangeAppliedModal}/>
        <AuditionName onClick={moveToAuditionPage}>{audition?.title}</AuditionName>
      </AuditionNameContainer>
      <AppliedUsersContainer>
        {profiles?.map((profile) => (
          <AppliedUser profile={profile} ChangeAuditionModalOpen={ChangeAuditionModalOpen} key={profile.id}/>
        ))}
      </AppliedUsersContainer>
    </>
  )
})
