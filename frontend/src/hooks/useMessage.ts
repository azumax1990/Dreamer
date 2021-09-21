import { useCallback, useState } from 'react'
import { getAllMessages, postMessage } from '../api/message'
import { Message, MessageParams, Profile } from '../types'

export const useMessage = () => {
  const [messages, setMessages] = useState<Array<Message>>([])
  const [profiles, setProfiles] = useState<Array<Profile>>([])
  
  const getMessages = useCallback((id: string) => {
    getAllMessages(id)
    .then((res) => {
      setMessages(res.data.messages)
      setProfiles(res.data.profiles)
    })
  }, [])

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