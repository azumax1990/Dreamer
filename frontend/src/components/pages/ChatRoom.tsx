import React, { memo, useContext, useEffect, useState, useCallback, VFC } from 'react'
import MediaQuery from 'react-responsive'
import { LoginUserContext } from '../../App'
import { useMessage } from '../../hooks/useMessage'
import { MessageParams } from '../../types'
import { MassagePageHeader } from '../organisms/header/pcResponsive/MassagePageHeader'
import { MessagePageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/MessagePageSmartPhoneHeader'
import { PcResponsive } from '../mediaQuery/message/PcResponsive'
import { SmartPhoneResponsive } from '../mediaQuery/message/SmartPhoneResponsive'

type Props = {
  id: string;
}
export const ChatRoom: VFC<Props> = memo((props) => {
  const { id } = props;
  const [content, setContent]   = useState('')
  const { currentUser }         = useContext(LoginUserContext)
  const { getMessages,createMessage, messages, profiles} = useMessage()

  useEffect(() => getMessages(id), [getMessages, id])

  
  const params: MessageParams = {
    user_id: currentUser?.id,
    group_id: id,
    content: content
  }
  const onClickPostMessage = useCallback(() => {
    createMessage(params)
    setContent('')
  }, [createMessage, id])
  
  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <MassagePageHeader />
        <PcResponsive messages={messages} profiles={profiles} content={content} setContent={setContent} onCliCkPostMessage={onClickPostMessage} />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <MessagePageSmartPhoneHeader />
        <SmartPhoneResponsive messages={messages} profiles={profiles} content={content} setContent={setContent} onCliCkPostMessage={onClickPostMessage}/>
      </MediaQuery>
    </>
  )
})