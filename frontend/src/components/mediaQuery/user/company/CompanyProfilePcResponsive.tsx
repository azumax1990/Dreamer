import React, { VFC, memo, useContext, useState, Dispatch, SetStateAction, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PostGroup } from '../../../../api/group'
import { LoginUserContext } from '../../../../App'
import { useSelectPost } from '../../../../hooks/useSelectPost'

import { Group, GroupUser, GroupUserParams, Message, Post, Profile, Audition } from '../../../../types'
import { AddImageModal } from '../../../organisms/profile/pcResponsive/AddImageModal'
import { Images } from '../../../organisms/profile/pcResponsive/Images'
import { ModalAuditions } from '../../../organisms/profile/pcResponsive/ModalAuditions'
import { ModalImages } from '../../../organisms/profile/pcResponsive/ModalImages'
import { ModalMessages } from '../../../organisms/profile/pcResponsive/ModalMessages'


const ProfileWrapper = styled.div`
padding: 100px 170px;
`
const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #DCDCDC;
`
const CompanyName = styled.h2`
  font-size: 35px;
  font-weight: lighter;
  margin: 0;
  padding-bottom: 10px;
`
const EditButton = styled.button`
  cursor: pointer;
`
const IntroductionContainer = styled.div`
  padding: 30px 20px;
`
const IntroductionText = styled.p`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 8px;
`
const ImagesWrapper = styled.div`
  padding: 0 170px;
  display: flex;
  flex-wrap: wrap;
`
type Props ={
  profile:          Profile | undefined;
  isOpen:           boolean;
  setIsOpen:        Dispatch<SetStateAction<boolean>>;
  posts:            Array<Post>;
  setPosts:         Dispatch<React.SetStateAction<Array<Post>>>;
  groupId:          number | undefined;
  groups:           Array<Group>;
  messages:         Array<Message>;
  profiles:         Array<Profile>;
  groupUsers:       Array<GroupUser>;
  auditions:        Array<Audition>;
  messageModalOpen: boolean;
  auditionModalOpen:boolean;
  ChangeMessageModalOpen: () => void;
  ChangeAuditionModalOpen: () => void;
}
export const CompanyProfilePcResponsive: VFC<Props> = memo((props) => {
  const { profile, isOpen, setIsOpen, posts, setPosts, groupId, groups, messageModalOpen, ChangeMessageModalOpen, messages, profiles, groupUsers, auditions, auditionModalOpen, ChangeAuditionModalOpen } = props;

  const history = useHistory()
  const { currentUser } = useContext(LoginUserContext)
  const { onSelectedPost, selectedPost, modalOpen, setModalOpen } = useSelectPost()

  const onClickOpen = useCallback((id: number | undefined) => {
    onSelectedPost({ id, posts })
  }, [posts, onSelectedPost])

  const params: GroupUserParams = {
    userId: currentUser?.id,
    profileId: profile?.user_id
  }

  const onClickPostGroup = () => {
    PostGroup(params)
    .then((res) => {
      const groupId = res.data.id
      history.push(`/group/${groupId}`)
    })
    .catch(() => alert('エラーが発生しました。もう一度お試しください。'))
  }

  const moveToMessageGroup = () => history.push(`/group/${groupId}`)
  
  return (
    <>
      <ProfileWrapper>
        <ProfileNameContainer>
          { profile?.company ? (<CompanyName>{profile.company}</CompanyName>) : (<CompanyName>未設定</CompanyName>)}
          { !currentUser ? (null) : currentUser.id === profile?.user_id ? (
            <Link to={`/user/${currentUser?.id}/profile/edit`}>
              <EditButton>編集する</EditButton>
            </Link> 
            ) : groupId ? (
              <EditButton onClick={moveToMessageGroup}>メールをする</EditButton>
             ) : (
              <EditButton onClick={onClickPostGroup}>メールをする</EditButton>
              )
          }
        </ProfileNameContainer>
        <IntroductionContainer>
          { profile?.description ? (<IntroductionText>{profile.description}</IntroductionText>) : (<IntroductionText></IntroductionText>) }
        </IntroductionContainer>
      </ProfileWrapper>
      <ImagesWrapper>
        {posts.map((post) => (
          <Images imageUrl={post.image_url} id={post.id} onClickOpen={onClickOpen} key={post.id}/>
        ))}
      </ImagesWrapper>
      {modalOpen ? (
        <ModalImages selectedPost={selectedPost} setModalOpen={setModalOpen}/>
      ) : (null)}
      {isOpen ? (
        <AddImageModal setIsOpen={setIsOpen} posts={posts} setPosts={setPosts}/>
      ) : (null)}
      {messageModalOpen ? (
        <ModalMessages ChangeMessageModalOpen={ChangeMessageModalOpen} groups={groups} profile={profile} messages={messages} profiles={profiles} groupUsers={groupUsers}/>
      ) : (null)}
      {auditionModalOpen ? (
        <ModalAuditions auditions={auditions} ChangeAuditionModalOpen={ChangeAuditionModalOpen}/>
      ) : (null)}
      
    </>
  )
})
