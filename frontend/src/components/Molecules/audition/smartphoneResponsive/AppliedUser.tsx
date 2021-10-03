import React, { memo, VFC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Profile } from '../../../../types'

const UserContainer = styled.div`
  display: flex;
  padding: 7px 0;
  cursor: pointer;
`
const AvatarContainer = styled.div`
`
const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
`
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
`
const UserName = styled.p`
  margin: 0;
  opacity: 0.7;
  height: 24px;
  overflow: hidden;
`
type Props = {
  profile: Profile;
}
export const AppliedUser: VFC<Props> = memo((props) => {
  const { profile } = props;
  const history = useHistory()
  const MoveToProfilePage = () => history.push(`/user/${profile.user_id}/profile`)
  return (
    <UserContainer onClick={MoveToProfilePage}>
      <AvatarContainer>
        {profile.avatar_url ? (
          <UserAvatar src={profile.avatar_url}/>
        ) : (
          <UserAvatar src="https://source.unsplash.com/random"/>
        )}
      </AvatarContainer>
      <ContentContainer>
        {profile.name || profile.company ? (
          <UserName>{profile.name || profile.company}</UserName>
        ) : (
          <UserName>ゲスト</UserName>
        )}
      </ContentContainer>
    </UserContainer>
  )
})
