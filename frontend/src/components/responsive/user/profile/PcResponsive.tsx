import React, { VFC, memo, useContext, Dispatch, SetStateAction, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { LoginUserContext } from '../../../../App'
import { Post, Profile } from '../../../../types'
import avatarImage from '../../../../images/no-avatar.jpeg'
import { AddImageModal } from '../../../organisms/profile/pcResponsive/AddImageModal'
import { Images } from '../../../organisms/profile/pcResponsive/Images'
import { useSelectUser } from '../../../../hooks/useSelectUser'
import { ModalImages } from '../../../organisms/profile/pcResponsive/ModalImages'

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
  profile: Profile;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  posts: Array<Post>;
  setPosts: Dispatch<SetStateAction<Array<Post>>>;
}

export const PcResponsive: VFC<Props> = memo((props) => {
  const { profile, isOpen, setIsOpen, posts, setPosts } = props

  const { currentUser } = useContext(LoginUserContext)
  const { onSelectedPost, selectedPost, modalOpen, setModalOpen } = useSelectUser()

  const onClickOpen = useCallback((id: number | undefined) => {
    onSelectedPost({ id, posts })
  }, [posts, onSelectedPost])
  
  return (
    <>
      <ProfileWrapper>
        <ProfileLeftWrapper>
        {profile.avatar_url ? (<ProfileAvatar src={profile.avatar_url} alt="プロフィール"/>)
         : (
          <ProfileAvatar src={avatarImage} alt="プロフィール"/>
          )
        }
        </ProfileLeftWrapper>
        <ProfileRightWrapper>
          <ProfileNameContainer>
            { profile.name ? (<UserName>{profile.name}</UserName>) : (<UserName>未設定</UserName>) }
            { currentUser?.id === profile?.user_id ? (
              <Link to={`/user/${currentUser?.id}/profile/edit`}>
                <EditButton>編集する</EditButton>
              </Link>
              ) : 
              (null)
            }
          </ProfileNameContainer>
          <ProfileInfoContainer>
            {profile.gender ? (<ProfileText>性別 : {profile.gender}</ProfileText>) : (<ProfileText>性別 : 未設定</ProfileText>)}
            {profile.age ? (<ProfileText>年齢 : {profile.age}歳</ProfileText>) : (<ProfileText>年齢 : 未設定</ProfileText>)}
            {profile.tall ? (<ProfileText>身長 : {profile.tall}cm</ProfileText>) : (<ProfileText>身長 : 未設定</ProfileText>)}
            {profile.prefecture ? (<ProfileText>出身地 : {profile.prefecture}</ProfileText>) : (<ProfileText>出身地 : 未設定</ProfileText>)}
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
        <ModalImages selectedPost={selectedPost} setModalOpen={setModalOpen}/>
      ) : (null)}
      {isOpen ? (
        <AddImageModal setIsOpen={setIsOpen} posts={posts} setPosts={setPosts}/>
      ) : (null)}
    </>
  )
})
