import React, { VFC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Message, Profile, Group } from '../../../../types'

const MessageContainer = styled.div`
  display: flex;
  padding: 5px 0;
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
  padding-left: 15px;
`
const MessageAccount = styled.p`
  font-weight: bold;
  margin: 0;
`
const MessageText = styled.p`
  margin: 0;
  opacity: 0.7;
  height: 24px;
  overflow: hidden;
`
type Props = {
  group:           Group;
  selectedProfile: Profile | undefined;
  lastMessage:     Message | undefined;
  index:           number;
}
export const ModalMessage: VFC<Props> = (props) => {
  const { group, lastMessage, selectedProfile, index } = props
  const history = useHistory()
  const moveToMessageGroup = () => (history.push(`/group/${group.id}`))
  return (
    <>
      <MessageContainer key={index} onClick={moveToMessageGroup}>
        <AvatarContainer>
          {selectedProfile?.avatar_url ? (
            <UserAvatar src={`${selectedProfile?.avatar_url}`} />
          ) : (
            <UserAvatar src="https://source.unsplash.com/random" />
          )}
        </AvatarContainer>
        <ContentContainer>
          <MessageAccount>{selectedProfile?.company || selectedProfile?.name}</MessageAccount>
          {lastMessage ? (
            <MessageText>{lastMessage.content}</MessageText>
          ) : (
            <MessageText>メッセージがありません</MessageText>
          )}
        </ContentContainer>
      </MessageContainer>
    </>
  )
}
