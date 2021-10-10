import React, { memo, useContext, useEffect, useState, VFC } from 'react'
import styled from 'styled-components';
import { getUserProfile } from '../../../api/profile';
import { LoginUserContext } from '../../../App';
import { Group, Profile, Message, GroupUser } from '../../../types';

import { MessagePageSmartPhoneHeader } from '../../organisms/header/smartPhoneResponsive/MessagePageSmartPhoneHeader';
import { Loading } from '../../organisms/loading/Loading';
import { GroupMessages } from '../../organisms/message/smartPhoneResponsive/GroupMessages';

const MessageWrapper = styled.div`
  width: 80%;
  margin: 30px auto;
  padding: 20px 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px gray;
`
const UseName = styled.h2`
  margin: 0;
  text-align: center;
`
const MessagesContainer = styled.div`
  padding: 10px 0;
  height: 600px;
  overflow: scroll;
`

type Props = {
  id: string;
}
export const MessageIndex: VFC<Props> = memo((props) => {
  const { id } = props;
  const [groups, setGroups]         = useState<Array<Group>>([])
  const [profiles, setProfiles]     = useState<Array<Profile>>([])
  const [messages, setMessages]     = useState<Array<Message>>([])
  const [groupUsers, setGroupUsers] = useState<Array<GroupUser>>([])

  const { loading, setLoading, currentUser } = useContext(LoginUserContext)

  useEffect(() => {
    setLoading(true)
    getUserProfile(id)
    .then((res) => {
      setGroups(res.data.groups)
      setProfiles(res.data.profiles)
      setMessages(res.data.messages)
      setGroupUsers(res.data.group_members)
    })
    .catch(() => alert("メッセージを取得出来ませんでした"))
    .finally(() => setLoading(false))
  }, [id, setLoading])

  return (
    <>
      <MessagePageSmartPhoneHeader />
      <MessageWrapper>
        <UseName>メッセージ一覧</UseName>
        <MessagesContainer>
          {loading ? (
            <Loading />
          ) : (
            <>
              {groups.map((group) => {
                const selectedUser    = groupUsers.find((groupUser) => groupUser.group_id === group.id && groupUser.user_id !== currentUser?.id)
                const lastMessage     = messages.find((message) => message?.group_id === group.id)
                const selectedProfile = profiles.find((profile) => profile?.user_id === selectedUser?.user_id)
                return (
                  <GroupMessages group={group} selectedProfile={selectedProfile} lastMessage={lastMessage} key={group.id}/>
                )
              })}
            </>
          )}
        </MessagesContainer>
      </MessageWrapper>
    </>
  )
})
