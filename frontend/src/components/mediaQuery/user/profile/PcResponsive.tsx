import React, { VFC, memo, useContext, Dispatch, SetStateAction, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { LoginUserContext } from '../../../../App'
import { Group, GroupUserParams, Post, Profile, Message, GroupUser, Audition } from '../../../../types'
import avatarImage from '../../../../images/no-avatar.jpeg'
import { useSelectPost } from '../../../../hooks/useSelectPost'

import { AddImageModal } from '../../../organisms/profile/pcResponsive/AddImageModal'
import { Images } from '../../../organisms/profile/pcResponsive/Images'
import { ModalImages } from '../../../organisms/profile/pcResponsive/ModalImages'
import { PostGroup } from '../../../../api/group'
import { ModalMessages } from '../../../organisms/profile/pcResponsive/ModalMessages'
import { ModalAuditions } from '../../../organisms/profile/pcResponsive/ModalAuditions'

const ProfileWrapper = styled.div`
  padding: 100px 170px;
  display: flex;
`
const ProfileLeftWrapper = styled.div`
  width: 50%;
`
const ProfileAvatar = styled.img`
  width: 90%;
  height: 600px;
  padding-left: 30px;
`
const ProfileRightWrapper = styled.div`
  width: 47%;
  margin-left: auto;
`
const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #DCDCDC;
`
const UserName = styled.h2`
  font-size: 35px;
  font-weight: lighter;
  margin: 0;
`
const EditButton = styled.button`
  cursor: pointer;
`
const ProfileInfoContainer = styled.div`
  padding-right: 10px;
  border-bottom: solid 1px #DCDCDC;
`
const ProfileText = styled.p`
  font-size: 18px;
  font-weight: bold;
  opacity: 0.7;
  text-align: right;
`
const IntroductionContainer = styled.div`
`
const IntroductionText= styled.p`
  letter-spacing: 8px;
`
const ImagesWrapper = styled.div`
  padding: 50px 170px;
  display: flex;
  flex-wrap: wrap;
`

type Props = {
  profile:          Profile;
  isOpen:           boolean;
  setIsOpen:        Dispatch<SetStateAction<boolean>>;
  posts:            Array<Post>;
  setPosts:         Dispatch<SetStateAction<Array<Post>>>;
  groupId:          number | undefined;
  groups:           Array<Group>;
  messages:         Array<Message>;
  profiles:         Array<Profile>;
  groupUsers:       Array<GroupUser>;
  messageModalOpen: boolean;
  ChangeMessageModalOpen: () => void;
  auditions:        Array<Audition>;
  auditionModalOpen:boolean;
  ChangeAuditionModalOpen: () => void
}

export const PcResponsive: VFC<Props> = memo((props) => {
  const { profile, isOpen, setIsOpen, posts, setPosts, groupId, groups, messageModalOpen, ChangeMessageModalOpen, messages, groupUsers, profiles, auditions, auditionModalOpen, ChangeAuditionModalOpen } = props

  const { currentUser } = useContext(LoginUserContext)
  const history = useHistory()
  const { onSelectedPost, selectedPost, modalOpen, setModalOpen } = useSelectPost()
  
  const onClickOpen = useCallback((id: number | undefined) => {
    onSelectedPost({ id, posts })
  }, [posts, onSelectedPost])

  const params: GroupUserParams = {
    userId: currentUser?.id,
    profileId: profile.user_id
  }

  const onClickPostGroup = () => {
    PostGroup(params)
    .then((res) => {
      const groupId = res.data.id
      history.push(`/group/${groupId}`)
    })
    .catch(() => alert('?????????????????????????????????????????????????????????????????????'))
  }
  const moveToMessageGroup = () => history.push(`/group/${groupId}`)
  return (
    <>
      <ProfileWrapper>
        <ProfileLeftWrapper>
        {profile.avatar_url ? (<ProfileAvatar src={profile.avatar_url} alt="??????????????????"/>)
         : (
          <ProfileAvatar src={avatarImage} alt="??????????????????"/>
          )
        }
        </ProfileLeftWrapper>
        <ProfileRightWrapper>
          <ProfileNameContainer>
            { profile.name ? (<UserName>{profile.name}</UserName>) : (<UserName>?????????</UserName>) }
            { !currentUser ? (null) : currentUser.id === profile.user_id ? (
                <Link to={`/user/${currentUser?.id}/profile/edit`}>
                  <EditButton>????????????</EditButton>
                </Link> 
                ) : groupId ? (
                  <EditButton onClick={moveToMessageGroup}>??????????????????</EditButton>)
                  : (
                  <EditButton onClick={onClickPostGroup}>??????????????????</EditButton>
                  )
             }
          </ProfileNameContainer>
          <ProfileInfoContainer>
            {profile.gender ? (<ProfileText>?????? : {profile.gender}</ProfileText>) : (<ProfileText>?????? : ?????????</ProfileText>)}
            {profile.age ? (<ProfileText>?????? : {profile.age}???</ProfileText>) : (<ProfileText>?????? : ?????????</ProfileText>)}
            {profile.tall ? (<ProfileText>?????? : {profile.tall}cm</ProfileText>) : (<ProfileText>?????? : ?????????</ProfileText>)}
            {profile.prefecture ? (<ProfileText>????????? : {profile.prefecture}</ProfileText>) : (<ProfileText>????????? : ?????????</ProfileText>)}
          </ProfileInfoContainer>
          <IntroductionContainer>
            <IntroductionText>{profile.introduction}</IntroductionText>
          </IntroductionContainer>
        </ProfileRightWrapper>
      </ProfileWrapper>
      <ImagesWrapper>
        {posts.map((post) => (
          <Images imageUrl={post.image_url} id={post.id} onClickOpen={onClickOpen} key={post.id}/>
        ))}
      </ImagesWrapper>
      {modalOpen ? (
        <ModalImages selectedPost={selectedPost} setModalOpen={setModalOpen} posts={posts} setPosts={setPosts}/>
      ) : (null)}
      {isOpen ? (
        <AddImageModal setIsOpen={setIsOpen} posts={posts} setPosts={setPosts}/>
      ) : (null)}
      {messageModalOpen ? (
        <ModalMessages ChangeMessageModalOpen={ChangeMessageModalOpen} groups={groups}  messages={messages} profiles={profiles} groupUsers={groupUsers}/>
      ) : (null)}
      {auditionModalOpen ? (
        <ModalAuditions auditions={auditions} ChangeAuditionModalOpen={ChangeAuditionModalOpen}/>
      ) : (null)}
    </>
  )
})