import { useCallback, useContext, useState } from 'react'
import { getAllMessages, postMessage } from '../api/message'
import { LoginUserContext } from '../App'
import { Message, MessageParams, Profile } from '../types'

export const useMessage = () => {
  const [messages, setMessages] = useState<Array<Message>>([])
  const [profiles, setProfiles] = useState<Array<Profile>>([])
  const { setLoading }          = useContext(LoginUserContext)

  
  const getMessages = useCallback((id: string) => {
    setLoading(true)
    getAllMessages(id)
    .then((res) => {
      setMessages(res.data.messages)
      setProfiles(res.data.profiles)
    })
    .catch(() => alert('メッセージを読み込めませんでした'))
    .finally(() => setLoading(false))
  }, [setLoading])

  const createMessage = (params: MessageParams) => {   
    postMessage(params)
    .then((res) => {   
      setMessages([...messages, res.data.message])
      setProfiles([...profiles, res.data.profile])
    })
    .catch(() => alert('メッセージを送信出来ませんでした'))
  }

  return { getMessages, createMessage, messages, setMessages, profiles, setProfiles }
}
