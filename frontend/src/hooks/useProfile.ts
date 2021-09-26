import { useCallback, useContext, useState } from 'react'
import { getAllImages } from '../api/post';
import { getUserProfile } from '../api/profile';
import { LoginUserContext } from '../App';
import { Group, GroupUser, Post, Profile, Message } from '../types';

export const useProfile = () => {
  const [profile, setProfile]                   = useState<Profile | undefined>()
  const [isOpen, setIsOpen]                     = useState(false)
  const [posts, setPosts]                       = useState<Array<Post>>([])
  const [groups, setGroups]                     = useState<Array<Group>>([])
  const [profiles, setProfiles]                 = useState<Array<Profile>>([])
  const [messages, setMessage]                  = useState<Array<Message>>([])
  const [groupUsers, setGroupUsers]             = useState<Array<GroupUser>>([])
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const { currentUser } = useContext(LoginUserContext)

  const getProfile = useCallback(((id: string) => {
    getUserProfile(id)
    .then((res) => {
      setProfile(res.data.profile)
      setGroupUsers(res.data.group_members)
      setGroups(res.data.groups)
      setMessage(res.data.messages)
      setProfiles(res.data.profiles)
      getAllImages(id)
      .then((res) => {
        setPosts(res.data)
      })
      .catch(() => alert('写真を取得できませんでした'))
    })
    .catch(() => alert('ユーザーを取得できませんでした'))
  }), [])

  const changeIsOpen            = useCallback(() => setIsOpen(true), [])
  const ChangeMessageModalTrue  = useCallback(() => setMessageModalOpen(true), [])
  const ChangeMessageModalFalse = useCallback(() => setMessageModalOpen(false), [])
  const selectedGroupUser = groupUsers.find((groupUser) => groupUser.user_id === currentUser?.id)
  const groupId = selectedGroupUser?.group_id

  return { getProfile, profile, isOpen, setIsOpen,posts, setPosts, groups, profiles, messages, groupUsers, messageModalOpen, changeIsOpen, ChangeMessageModalTrue, ChangeMessageModalFalse, groupId }
}
