import React, { memo, useState, VFC } from 'react'
import styled from 'styled-components'
import { Profile, Group, Message } from '../../../../types'
import { ModalMessage } from '../../message/pcResponsive/ModalMessage'

const ModalWrapper = styled.div`
`
const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Modal = styled.div`
  background-color: #fff;
  width:40%;
  padding: 20px 20px;
  border-radius: 10px;
`
const UseName = styled.h2`
  margin: 0;
  text-align: center;
`
const MessagesContainer = styled.div`
  height: 500px;
  overflow: scroll;
`


type Props = {
  profile:                 Profile | undefined;
  groups:                  Array<Group>;
  messages:                Array<Message>;
  profiles:                Array<Profile>;
  ChangeMessageModalFalse: () => void;
}

export const ModalMessages: VFC<Props> = memo((props) => {
  const { ChangeMessageModalFalse, profile, groups, messages, profiles } = props;
  return (
    <>
      <ModalWrapper onClick={ChangeMessageModalFalse}>
        <OverLay>
          <Modal>
            <UseName>{profile?.name}</UseName>
            <MessagesContainer>
              {groups.map((group, index) => {
                const lastMessage = messages.find((message) => message.group_id === group.id)
                const selectedProfile = profiles.find((profile) => profile?.user_id === lastMessage?.user_id)
                return (
                  <ModalMessage group={group} selectedProfile={selectedProfile} lastMessage={lastMessage} index={index}/>
                )
              })}
            </MessagesContainer>
          </Modal>
        </OverLay>
      </ModalWrapper>
    </>
  )
})

