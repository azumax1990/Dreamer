import React, { memo, useContext, VFC } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { LoginUserContext } from '../../../../App'
import { Message, Profile } from '../../../../types'

const CurrentUserMessageContainer = styled.div`
  max-width: 300px;
  margin-right: auto;
  padding: 10px 15px;
  box-shadow:  0 0 5px gray;
  border-radius: 10px;
  margin-bottom: 25px;
`
const MessageContainer = styled.div`
  max-width: 300px;
  margin-left: auto;
  padding: 10px 15px;
  box-shadow:  0 0 5px gray;
  border-radius: 10px;
  margin-bottom: 25px;
`
const UserNameText = styled.p`
  font-weight: bold;
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
  message:         Message;
  selectedProfile: Profile | undefined;
}
export const Messages: VFC<Props> = memo((props) => {
  const { message, selectedProfile } = props;
  const { currentUser } = useContext(LoginUserContext)

  return (
    message.user_id === currentUser?.id ? (
      <>
        <CurrentUserMessageContainer>
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
          <TimeText>{moment(message.created_at).format('YYYY年MM月DD日')}</TimeText>
        </CurrentUserMessageContainer>
      </>
    ) : (
      <>
        <MessageContainer>
        {selectedProfile?.name || selectedProfile?.company ? (
            <Link to={`/user/${selectedProfile?.user_id}/profile`} style={{ textDecoration: "none", color: "black" }} >
              <UserNameText>{selectedProfile?.name || selectedProfile?.company}</UserNameText>
            </Link>
          ) : (
            <Link to={`/user/${selectedProfile?.user_id}/profile`} style={{ textDecoration: "none", color: "black" }} >
              <UserNameText>ゲスト</UserNameText>
            </Link>
          )}
           <MessageText>{message.content}</MessageText>
           <TimeText>{moment(message.created_at).format('YYYY年MM月DD日')}</TimeText>
         </MessageContainer>
      </>
    )
  )
})
