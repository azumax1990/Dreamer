import React, { VFC, memo, useContext, Dispatch, SetStateAction, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LoginUserContext } from '../../../../App'
import { useSelectUser } from '../../../../hooks/useSelectUser'
import { Post, Profile } from '../../../../types'
import { AddImageModal } from '../../../organisms/profile/pcResponsive/AddImageModal'
import { Images } from '../../../organisms/profile/pcResponsive/Images'
import { ModalImages } from '../../../organisms/profile/pcResponsive/ModalImages'


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
  profile: Profile | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  posts: Array<Post>;
  setPosts: Dispatch<React.SetStateAction<Array<Post>>>;
}
export const PcResponsive: VFC<Props> = memo((props) => {
  const { profile, isOpen, setIsOpen, posts, setPosts } = props;
  const { currentUser } = useContext(LoginUserContext)
  const { onSelectedPost, selectedPost, modalOpen, setModalOpen } = useSelectUser()

  const onClickOpen = useCallback((id: number | undefined) => {
    onSelectedPost({ id, posts })
  }, [posts, onSelectedPost])

  return (
    <>
      <ProfileWrapper>
        <ProfileNameContainer>
          { profile?.company ? (<CompanyName>{profile.company}</CompanyName>) : (<CompanyName>未設定</CompanyName>)}
          { currentUser?.id === profile?.user_id ? (
            <Link to={`/user/${currentUser?.id}/profile/edit`}>
              <EditButton>編集する</EditButton>
            </Link>
            ) : (null)
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
    </>
  )
})
