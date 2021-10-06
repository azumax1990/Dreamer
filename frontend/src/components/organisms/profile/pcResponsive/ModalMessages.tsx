import React, { memo, useContext, VFC } from 'react'
import styled from 'styled-components'
import { LoginUserContext } from '../../../../App'
import { Profile, Group, Message, GroupUser } from '../../../../types'
import { ModalMessage } from '../../../Molecules/message/ModalMessage'

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
  groupUsers:              Array<GroupUser>;
  ChangeMessageModalOpen: () => void;
}

export const ModalMessages: VFC<Props> = memo((props) => {
  const { ChangeMessageModalOpen, profile, groups, messages, profiles, groupUsers } = props;
  const { currentUser } = useContext(LoginUserContext)
  
  return (
    <>
      <ModalWrapper onClick={ChangeMessageModalOpen}>
        <OverLay>
          <Modal>
            {profile?.name === null && profile?.company === null ? (
              <UseName>ゲスト</UseName>
            ) : profile?.job === '演者' ? (
              <UseName>{profile?.name}</UseName> 
            ) : (
              <UseName>{profile?.company}</UseName>
            )}
            <MessagesContainer>
              {groups.map((group) => {
                const selectedUser    = groupUsers.find((groupUser) => groupUser.group_id === group.id && groupUser.user_id !== currentUser?.id)
                const lastMessage     = messages.find((message) => message?.group_id === group.id)
                const selectedProfile = profiles.find((profile) => profile?.user_id === selectedUser?.user_id)
                return (
                  <ModalMessage group={group} selectedProfile={selectedProfile} lastMessage={lastMessage} key={group.id}/>
                )
              })}
            </MessagesContainer>
          </Modal>
        </OverLay>
      </ModalWrapper>
    </>
  )
})

