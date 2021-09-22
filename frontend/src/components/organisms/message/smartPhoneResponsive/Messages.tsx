import React, { memo, useContext, VFC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LoginUserContext } from '../../../../App'
import { Message, Profile } from '../../../../types'

const CurrentUserMessageContainer = styled.div`
  max-width: 200px;
  margin-right: auto;
  padding: 5px 15px;
  box-shadow:  0 0 5px gray;
  border-radius: 10px;
  margin-bottom: 25px;
`
const MessageContainer = styled.div`
  max-width: 200px;
  margin-left: auto;
  padding: 5px 15px;
  box-shadow:  0 0 5px gray;
  border-radius: 10px;
  margin-bottom: 25px;
`
const UserNameText = styled.p`
  font-weight: bold;
  padding-bottom: 5px;
  margin: 0;
`
const TimeText = styled.p`
  opacity: 0.5;
  font-size: 15px;
  text-align: right;
  margin-bottom: 0;
`
const MessageText = styled.p`
  margin: 0;
`
type Props = {
  index:           number;
  message:         Message;
  selectedProfile: Profile | undefined;
}
export const Messages: VFC<Props> = memo((props) => {
  const { message, selectedProfile, index } = props;
  const { currentUser } = useContext(LoginUserContext)

  return (
    message.user_id === currentUser?.id ? (
      <>
        <CurrentUserMessageContainer key={index}>
          {selectedProfile?.name || selectedProfile?.company ? (
            <Link to={`/user/${selectedProfile?.user_id}/profile`} style={{ textDecoration: "none", color: "black" }} >
              <UserNameText>{selectedProfile?.name || selectedProfile?.company}</UserNameText>
            </Link>
          ) : (
            <Link to={`/user/${currentUser.id}/profile`} style={{ textDecoration: "none", color: "black" }} >
              <UserNameText>ゲスト</UserNameText>
            </Link>
          )}
          <MessageText>{message.content}</MessageText>
          <TimeText>{message.created_at}</TimeText>
        </CurrentUserMessageContainer>
      </>
    ) : (
      <>
        <MessageContainer key={index}>
        {selectedProfile?.name || selectedProfile?.company ? (
            <Link to={`/user/${selectedProfile?.user_id}/profile`} style={{ textDecoration: "none", color: "black" }} >
              <UserNameText>{selectedProfile?.name || selectedProfile?.company}</UserNameText>
            </Link>
          ) : (
            <Link to={`/user/${selectedProfile?.id}/profile`} style={{ textDecoration: "none", color: "black" }} >
              <UserNameText>ゲスト</UserNameText>
            </Link>
          )}
           <MessageText>{message.content}</MessageText>
           <TimeText>{message.created_at}</TimeText>
         </MessageContainer>
      </>
    )
  )
})
