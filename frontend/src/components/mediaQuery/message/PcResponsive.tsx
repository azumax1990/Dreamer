import React, { SetStateAction, VFC, Dispatch, useContext } from 'react'
import styled from 'styled-components'
import { Message, Profile } from '../../../types'
import { LoginUserContext } from '../../../App'

import { Messages } from '../../organisms/message/pcResponsive/Messages'
import { Loading } from '../../organisms/loading/Loading'

const MessagesWrapper = styled.div`
  padding: 40px;
  display: flex;
  background-color: #F5F5F5;
`
const MessagesContainer = styled.div`
  background-color: #fff;
  width: 60%;
  height: 600px;
  box-sizing:border-box;
  padding: 40px 40px 0 40px;
  box-shadow:  0 0 5px gray;
  overflow: scroll;
`
const FormContainer = styled.div`
  width: 40%;
  height: 600px;
  padding: 20px 30px 0 30px;
  background-color: #fff;
  box-sizing:border-box;
  box-shadow:  0 0 5px gray;
`
const InputTag = styled.textarea`
  width: 100%;
  height: 500px;
  font-size: 16px;
  box-sizing:border-box;
  padding: 10px 8px;
  border-color: #f5f5f5;
  outline: none;
  box-shadow:  0 0 3px gray;
  border-radius: 10px;
` 
const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  box-shadow:  0 0 3px gray;
  border: none;
  cursor: pointer;
  background-color: #fff;
  border-radius: 10px;
`
type Props = {
  messages:           Array<Message>;
  profiles:           Array<Profile>;
  content:            string;
  setContent:         Dispatch<SetStateAction<string>>;
  onCliCkPostMessage: () => void;
}
export const PcResponsive: VFC<Props> = (props) => {
  const { messages, profiles, content, setContent, onCliCkPostMessage } = props;
  const { loading } = useContext(LoginUserContext)
  return (
    <>
      <MessagesWrapper>
        <MessagesContainer>
          {loading ? (
            <Loading />
          ) : (
            <>
              {messages.map((message) => {
                const selectedProfile = profiles.find((profile) => profile?.user_id === message.user_id)
                return (
                  <Messages selectedProfile={selectedProfile} message={message} key={message.id} />
                )
              })}
            </>
          )}
        </MessagesContainer>
        <FormContainer>
          <InputTag value={content} placeholder="???????????????????????????????????????????????????" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}/>
          <SubmitButton onClick={onCliCkPostMessage} disabled={content ? false : true} >??????</SubmitButton>
        </FormContainer>
      </MessagesWrapper>
    </>
  )
}
