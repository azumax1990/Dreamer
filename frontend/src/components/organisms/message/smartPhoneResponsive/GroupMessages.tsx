import React, { VFC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Group, Message, Profile } from '../../../../types'

const MessageContainer = styled.div`
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
  padding-left: 15px;
`
const MessageAccount = styled.p`
  font-weight: bold;
  padding-top: 5px;
  margin: 0;
`
const MessageText = styled.p`
  padding-top: 5px;
  margin: 0;
  opacity: 0.7;
  height: 24px;
  overflow: hidden;
`
type Props = {
  group:           Group;
  selectedProfile: Profile | undefined;
  lastMessage:     Message | undefined;
}
  
export const GroupMessages: VFC<Props> = (props) => {
  const { group, lastMessage, selectedProfile } = props
  const history = useHistory()
  const moveToMessageGroup = () => (history.push(`/group/${group.id}`))
  return (
    <>
      <MessageContainer onClick={moveToMessageGroup}>
        <AvatarContainer>
          {selectedProfile?.avatar_url ? (
            <UserAvatar src={`${selectedProfile?.avatar_url}`} />
          ) : (
            <UserAvatar src="https://source.unsplash.com/random" />
          )}
        </AvatarContainer>
        <ContentContainer>
          {!selectedProfile?.name && !selectedProfile?.company ? (
            <MessageAccount>ゲスト</MessageAccount>
          ) : selectedProfile?.job === '演者' ? (
            <MessageAccount>{selectedProfile?.name}</MessageAccount>
          ) : (
            <MessageAccount>{selectedProfile?.company}</MessageAccount>
          )}
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
