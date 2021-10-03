import React, { memo, VFC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Profile } from '../../../types'

const AppliedUserContainer = styled.div`
  display: flex;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`
const AvatarContainer = styled.div`
`
const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
`
const UserContainer = styled.div`
  padding-left: 15px;
  display: flex;
  align-items: center;
`
const UserName = styled.p`
  font-size: 18px;
  margin: 0;
  height: 24px;
  overflow: hidden;
`
type Props = {
  profile:                 Profile | undefined;
  ChangeAuditionModalOpen: () => void;
}
export const AppliedUser: VFC<Props> = memo((props) => {
  const { profile, ChangeAuditionModalOpen } = props;
  const history = useHistory()

  const moveToProfilePage = () => {
    ChangeAuditionModalOpen()
    history.push(`/user/${profile?.user_id}/profile`)
  }

  return (
    <AppliedUserContainer onClick={moveToProfilePage}>
      <AvatarContainer>
        {profile?.avatar_url ? (<UserAvatar src={profile.avatar_url} />) : (<UserAvatar src="https://source.unsplash.com/random"/>)}
      </AvatarContainer>
      <UserContainer>
        {profile?.name || profile?.company ? (<UserName>{profile.name || profile.company}</UserName>) : (<UserName>ゲスト</UserName>)}
      </UserContainer>
    </AppliedUserContainer>
  )
})
