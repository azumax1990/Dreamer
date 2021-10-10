import React, { Dispatch, memo, SetStateAction, useContext, VFC } from 'react'
import styled from 'styled-components'
import { FaLocationArrow } from "react-icons/fa";
import { Message, Profile } from '../../../types';
import { LoginUserContext } from '../../../App';

import { Messages } from '../../organisms/message/smartPhoneResponsive/Messages';
import { Loading } from '../../organisms/loading/Loading';


const MessagesWrapper = styled.div`
  padding: 20px;
`
const MessageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing:border-box;
  box-shadow:  0 0 5px gray;
`
const MessagesContainer = styled.div`
  height: 90vh;
  padding: 20px 20px 0 20px;
  overflow: scroll;
`
const FormContainer = styled.div`
  width: 100%;
  height: 10vh;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  box-shadow:  0 0 3px gray;
  box-sizing:border-box;
`
const TextareaTag = styled.textarea`
  border-radius: 10px;
  height: 45px;
  width: 100%;
  padding: 7px 9px;
  font-size: 18px;
  box-sizing:border-box;
  background-color: #F5F5F5;
  border: none;
  outline: none;
`
const SubmitButton = styled.button`
  border: none;
  background-color: #fff;
  padding-left: 10px;
`
type Props = {
  messages:           Array<Message>;
  profiles:           Array<Profile>;
  content:            string;
  setContent:         Dispatch<SetStateAction<string>>;
  onCliCkPostMessage: () => void;
}

export const SmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { messages, profiles, content, setContent, onCliCkPostMessage } = props;
  const { loading } = useContext(LoginUserContext)
  return (
    <>
      <MessagesWrapper>
        <MessageWrapper>
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
            <TextareaTag value={content} placeholder="メッセージを入力してください" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}/>
            <SubmitButton onClick={onCliCkPostMessage} disabled={content ? false : true}><FaLocationArrow style={{ fontSize: "28px"}}/></SubmitButton>
          </FormContainer>
        </MessageWrapper>
      </MessagesWrapper>
    </>
  )
})
